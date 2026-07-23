import { max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './TradeShareChart.css';

const CATEGORY_COLOR_VAR = {
  ratifying: '--un-color-blue-darkest',
  signatory: '--un-color-yellow',
  participant: '--un-color-blue'
};

export default function TradeShareChart({ data = [], legend = [], note, source, subtitle, title }) {
  const plotRef = useRef(null);
  const labelRefs = useRef([]);
  const [plotSize, setPlotSize] = useState({ width: 0, height: 320 });
  const [fitsLabel, setFitsLabel] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [barsSettled, setBarsSettled] = useState(false);
  const [chartInView, setChartInView] = useState(false);
  const hideTimerRef = useRef(null);

  function showTooltip(idx) {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setHoveredIndex(idx);
  }

  function scheduleHideTooltip() {
    hideTimerRef.current = setTimeout(() => setHoveredIndex(null), 250);
  }

  useEffect(() => {
    const el = plotRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setPlotSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = plotRef.current;
    if (!el) return;
    // .tc_plot has a bounded CSS height (clamp(280px, 32vw, 420px)), so unlike the shared
    // useIsVisible hook's width-based clamp (meant for arbitrarily tall sections), this
    // element always comfortably fits within any real viewport at a 0.4 ratio.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChartInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => hideTimerRef.current && clearTimeout(hideTimerRef.current), []);

  useEffect(() => {
    if (!chartInView) return;
    const timer = setTimeout(() => setBarsSettled(true), data.length * 27 + 600);
    return () => clearTimeout(timer);
  }, [chartInView, data.length]);

  const xScale = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, plotSize.width])
    .padding(0.15);
  const yScale = scaleLinear()
    .domain([0, max(data, d => d.value) ?? 0])
    .nice()
    .range([plotSize.height, 0]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: plotSize triggers remeasurement after resize, not read directly
  useLayoutEffect(() => {
    let lastRight = Number.NEGATIVE_INFINITY;
    const fits = data.map((d, idx) => {
      const el = labelRefs.current[idx];
      if (!el) return false;
      const center = xScale(d.name) + xScale.bandwidth() / 2;
      const halfWidth = el.scrollWidth / 2;
      if (center - halfWidth < lastRight + 6) return false;
      lastRight = center + halfWidth;
      return true;
    });
    setFitsLabel(fits);
  }, [plotSize]);

  return (
    <div className="tc_container">
      <div className="tc_title_row">
        <span className="tc_title_icon" />
        <h2 className="tc_title">{title}</h2>
      </div>
      {subtitle && <p className="tc_subtitle">{subtitle}</p>}

      {legend?.length > 0 && (
        <div className="tc_legend">
          {legend.map(item => (
            <div className="tc_legend_item" key={item.category}>
              <span className="tc_legend_swatch" style={{ background: `var(${CATEGORY_COLOR_VAR[item.category]})` }} />
              {item.label}
            </div>
          ))}
        </div>
      )}

      <div className="tc_plot" ref={plotRef}>
        {plotSize.width > 0 && (
          <>
            <svg aria-label={title} className="tc_svg" height={plotSize.height} role="img" width={plotSize.width}>
              {yScale.ticks(5).map(tick => (
                <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                  <line className="tc_gridline" x2={plotSize.width} />
                  <text className="tc_tick_label" x={-8} y={4}>
                    {tick}
                  </text>
                </g>
              ))}
              {data.map((d, idx) => {
                const targetY = yScale(d.value);
                const targetHeight = plotSize.height - targetY;
                return <rect className="tc_bar" fill={`var(${CATEGORY_COLOR_VAR[d.category]})`} height={chartInView ? targetHeight : 0} key={d.name} style={{ transitionDelay: `${idx * 27}ms` }} width={xScale.bandwidth()} x={xScale(d.name)} y={chartInView ? targetY : plotSize.height} />;
              })}
            </svg>

            <div className="tc_overlay">
              {data.map((d, idx) => {
                const isHovered = hoveredIndex === idx;
                const visible = isHovered || (hoveredIndex === null && fitsLabel[idx]);
                const targetY = yScale(d.value);
                const targetHeight = plotSize.height - targetY;
                return (
                  <button
                    aria-label={`${d.name}: ${Math.round(d.value)}%`}
                    className="tc_col"
                    key={d.name}
                    onBlur={scheduleHideTooltip}
                    onFocus={() => showTooltip(idx)}
                    onMouseEnter={() => showTooltip(idx)}
                    onMouseLeave={scheduleHideTooltip}
                    style={{ height: chartInView ? targetHeight : 0, left: xScale(d.name), top: chartInView ? targetY : plotSize.height, transitionDelay: `${idx * 27}ms`, width: xScale.bandwidth() }}
                    type="button"
                  >
                    {visible && <span className="tc_value">{Math.round(d.value)}%</span>}
                    <span className={`tc_label${isHovered ? ' tc_label--hover' : ''}${visible ? '' : ' tc_label--hidden'}`} ref={el => (labelRefs.current[idx] = el)}>
                      {d.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {source && (
        <p className="tc_source">
          <em>Source:</em> {source}
        </p>
      )}
      {note && (
        <p className="tc_note">
          <em>Note:</em> {note}
        </p>
      )}

      <div className="tc_links">
        <a className={`tc_link tc_link--primary${barsSettled ? ' tc_link--visible' : ''}`} href="https://unctadstat.unctad.org/datacentre/dataviewer/US.GSTP_TradeMatrix" rel="noreferrer" style={{ transitionDelay: '0ms' }} target="_blank">
          GSTP Database (UNCTADstat Data Centre)
        </a>
        <a className={`tc_link${barsSettled ? ' tc_link--visible' : ''}`} href="https://unctadstat.unctad.org/insights/theme/320" rel="noreferrer" style={{ transitionDelay: '225ms' }} target="_blank">
          See more data insights
        </a>
      </div>
    </div>
  );
}
