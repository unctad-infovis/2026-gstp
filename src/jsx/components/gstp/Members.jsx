import CircleFlag from '@unctad-infovis/general-tools/components/CircleFlag.jsx';
import Tooltip from '@unctad-infovis/general-tools/components/Tooltip.jsx';
import './Members.css';

const CATEGORY_COLOR_VAR = {
  ratifying: '--un-color-blue-darkest',
  signatory: '--un-color-yellow',
  participant: '--un-color-blue'
};

export default function Members({ chip_label, data = [], eyebrow, legend = [], mercosur_members, mercosur_prefix, title }) {
  const countries = data.filter(d => d.name !== 'MERCOSUR').sort((a, b) => a.name.localeCompare(b.name));
  const mercosur = data.find(d => d.name === 'MERCOSUR');
  const members = mercosur ? [...countries, mercosur] : countries;

  return (
    <div className="mb_container">
      <div className="mb_intro">
        <div className="mb_eyebrow">
          <span className="mb_eyebrow_line" />
          {eyebrow}
        </div>
        <h2 className="mb_title">{title}</h2>
      </div>
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
              <Tooltip className="mb_tooltip" content={`${mercosur_prefix} ${mercosur_members}`} key={item.name}>
                <span className="mb_chip_bloc">{chip_label}</span>
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
    </div>
  );
}
