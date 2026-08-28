import './NarrativeIntro.css';

export default function NarrativeIntro({ def_attribution, def_badge, def_description, def_statement_prefix, def_statement_suffix, def_title, description, description2, eyebrow_bigpicture, eyebrow_concepts, link1_href, link1_text, link2_href, link2_text, title }) {
  const hasDefinition = !!(def_title && def_badge);

  return (
    <div className="ni_container">
      <div className={`ni_hero${hasDefinition ? ' ni_hero--split' : ''}`}>
        <div className="ni_hero_inner">
          {/* Left — definition */}
          {hasDefinition && (
            <div className="ni_def">
              <div className="ni_def_eyebrow">
                <span className="ni_def_eyebrow_line" />
                {eyebrow_concepts}
              </div>
              <h3 className="ni_def_title">{def_title}</h3>
              <p className="ni_def_statement">
                {def_statement_prefix} <span className="ni_def_badge">{def_badge}</span> {def_statement_suffix}
              </p>
              {def_description && <p className="ni_def_description">{def_description}</p>}
              {def_attribution && <p className="ni_def_attribution">{def_attribution}</p>}
              <div className="ni_def_links">
                <a className="ni_def_link" href={link1_href} rel="noreferrer" target="_blank">
                  {link1_text}
                </a>
                <a className="ni_def_link" href={link2_href} rel="noreferrer" target="_blank">
                  {link2_text}
                </a>
              </div>
            </div>
          )}

          {/* Right — big picture */}
          <div className="ni_hero_content">
            <div className="ni_section_label">
              <span className="ni_section_label_line" />
              {eyebrow_bigpicture}
            </div>
            <h2 className="ni_title">{title}</h2>
            <p className="ni_desc">{description}</p>
            {description2 && <p className="ni_desc">{description2}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
