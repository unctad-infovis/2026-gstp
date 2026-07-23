import CircleFlag from '@unctad-infovis/general-tools/components/CircleFlag.jsx';
import Tooltip from '@unctad-infovis/general-tools/components/Tooltip.jsx';
import './Members.css';

const CATEGORY_COLOR_VAR = {
  ratifying: '--un-color-green-brand',
  signatory: '--un-color-yellow',
  participant: '--un-color-blue-brand'
};
const MERCOSUR_MEMBERS = 'Argentina, Bolivia, Brazil, Paraguay and Uruguay';

export default function Members({ data = [], legend = [] }) {
  const countries = data.filter(d => d.name !== 'MERCOSUR').sort((a, b) => a.name.localeCompare(b.name));
  const mercosur = data.find(d => d.name === 'MERCOSUR');
  const members = mercosur ? [...countries, mercosur] : countries;

  return (
    <div className="mb_container">
      <details className="mb_details">
        <summary className="mb_summary">
          <span className="mb_summary_text mb_summary_text--closed">Show member countries</span>
          <span className="mb_summary_text mb_summary_text--open">Hide member countries</span>
          <svg className="mb_chevron" viewBox="0 0 12 8" aria-hidden="true">
            <path d="M1 1l5 5 5-5" />
          </svg>
        </summary>
        <div className="mb_content">
          <div className="mb_legend">
            {legend.map(item => (
              <div className="mb_legend_item" key={item.category}>
                <span className="mb_legend_swatch" style={{ background: `var(${CATEGORY_COLOR_VAR[item.category]})` }} />
                {item.label}
              </div>
            ))}
          </div>
          <div className="mb_grid">
            {members.map(item =>
              item.name === 'MERCOSUR' ? (
                <Tooltip className="mb_tooltip" content={`MERCOSUR: ${MERCOSUR_MEMBERS}`} key={item.name}>
                  <span className="mb_chip_bloc">+ MERCOSUR</span>
                </Tooltip>
              ) : (
                <Tooltip className="mb_tooltip" content={item.name} key={item.name}>
                  <span className="mb_chip_ring" style={{ borderColor: `var(${CATEGORY_COLOR_VAR[item.category]})` }}>
                    <CircleFlag className="mb_chip_flag" countryCode={item.code} height={42} />
                  </span>
                </Tooltip>
              )
            )}
          </div>
        </div>
      </details>
    </div>
  );
}
