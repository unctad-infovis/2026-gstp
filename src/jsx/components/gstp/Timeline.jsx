import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import './Timeline.css';

export default function Timeline({ description, milestones = [], title }) {
  const [trackRef, trackInView] = useIsVisible(0.3);

  return (
    <div className="tl_container">
      <div className="tl_intro">
        <div className="tl_eyebrow">
          <span className="tl_eyebrow_line" />
          Timeline
        </div>
        <h2 className="tl_title">{title}</h2>
        {description && <p className="tl_desc">{description}</p>}
      </div>

      {milestones.length > 0 && (
        <div className={`tl_track${trackInView ? ' tl_track--inview' : ''}`} ref={trackRef}>
          {milestones.map((m, idx) => (
            <div className={`tl_item${m.current ? ' tl_item--current' : ''}`} key={m.year} style={{ transitionDelay: `${idx * 180}ms` }}>
              <span className="tl_year">{m.year}</span>
              <div className="tl_marker_row">
                <span className="tl_marker" />
              </div>
              <p className="tl_label">{m.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
