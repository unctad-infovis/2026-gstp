import basePath from './../../helpers/BasePath';
import useIsVisible from './../../helpers/UseIsVisible';
import ButtonShare from './../general/ButtonShare.jsx';
import RollingNumber from './../general/RollingNumber.jsx';
import Nav from './Nav.jsx';
import './Header.css';

export default function Header({ hero_image, nav, stats, subtitle, title, title_highlight }) {
  const [statsRef, statsInView] = useIsVisible(0.3);

  function renderTitle() {
    if (!title_highlight || !title.includes(title_highlight)) return title;
    const [before, after] = title.split(title_highlight);
    return (
      <>
        {before && <span className="header_title_lead">{before}</span>}
        <span className="header_title_highlight">{title_highlight}</span>
        {after}
      </>
    );
  }

  return (
    <div className="header_container" style={{ '--hero-bg-url': `url(${basePath()}${hero_image})` }}>
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <filter id="hero-photo-grade" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1.00 0.00 0.00 0 0  0.00 0.97 0.00 0 0  0.00 0.00 1.13 0 0  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>

      <div className="header_content">
        <h1 className="header_title">{renderTitle()}</h1>
        <ButtonShare url={typeof window !== 'undefined' ? window.location.href : ''} defaultOpen position="static" iconBg="rgba(0,0,0,0.45)" iconHoverBg="rgba(251, 175, 23, 0.75)" iconColor="#fff" iconHoverColor="#000" size={36} />
        <p className="header_subtitle">{subtitle}</p>

        {stats?.length > 0 && (
          <div className="header_stats" ref={statsRef}>
            {stats.map(s =>
              'value' in s ? (
                <div className="header_stat" key={s.label}>
                  <div className="header_stat_value">
                    {s.prefix}
                    <RollingNumber target={s.value} decimals={s.decimals ?? 0} inView={statsInView} />
                    {s.suffix}
                  </div>
                  <span className="header_stat_label">{s.label}</span>
                </div>
              ) : (
                <div className="header_stat header_stat--text" key={s.highlight}>
                  <p className="header_stat_text">
                    {s.text_lines.map(line => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                    <span className="header_stat_highlight">{s.highlight}</span>
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {nav?.length > 0 && <Nav items={nav} />}
      </div>
    </div>
  );
}
