import RollingNumber from '@unctad-infovis/general-tools/components/RollingNumber.jsx';
import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import './TileRow.css';

export default function TileRow({ groups = [] }) {
  const [groupsRef, groupsInView] = useIsVisible(0.3);

  return (
    <div className="tr_container">
      <div className="tr_eyebrow">
        <span className="tr_eyebrow_line" />
        Key figures
      </div>
      <div className={`tr_groups${groupsInView ? ' tr_groups--inview' : ''}`} ref={groupsRef}>
        {groups.map(group => {
          const isFeature = group.tiles.length === 1;
          return (
            <div className="tr_group" key={group.title}>
              <h2 className="tr_title">{group.title}</h2>
              {group.description && <p className="tr_desc">{group.description}</p>}
              <div className={`tr_grid${isFeature ? ' tr_grid--feature' : ''}`}>
                {group.tiles.map((tile, idx) => (
                  <div className={`tr_tile${isFeature ? ' tr_tile--feature' : ''}`} key={tile.label} style={{ transitionDelay: `${idx * 150}ms` }}>
                    <p className="tr_tile_label">{tile.label}</p>
                    <p className="tr_tile_value">
                      {tile.prefix}
                      <RollingNumber target={tile.value} decimals={tile.decimals ?? 0} inView={groupsInView} />
                      {tile.suffix}
                    </p>
                    {tile.unit && <p className="tr_tile_unit">{tile.unit}</p>}
                    {tile.description && <p className="tr_tile_desc">{tile.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
