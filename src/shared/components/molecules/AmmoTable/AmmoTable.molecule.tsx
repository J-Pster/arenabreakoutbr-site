import React from 'react';
import { AmmoLine } from '../../atoms/AmmoLine/AmmoLine.atom';
import styles from './AmmoTable.module.scss';
import { AmmoData } from '@/data/ammoData';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface AmmoTableProps {
  caliber: string;
  ammoData: AmmoData[];
  favorites: string[];
  toggleFavorite: (ammoName: string) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const AmmoTable: React.FC<AmmoTableProps> = ({
  caliber,
  ammoData,
  favorites,
  toggleFavorite,
  isCollapsed,
  toggleCollapse,
}) => {
  return (
    <div className={styles.ammoTableContainer}>
      <div className={styles.tableHeader} onClick={toggleCollapse}>
        <span className={styles.caliber}>{caliber}</span>
        {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
      </div>
      {!isCollapsed && (
        <div className={styles.tableWrapper}>
          <table className={styles.ammoTable}>
            <thead>
              <tr>
                <th
                  className={`${styles.tableHeaderCell} ${styles.stickyColumn}`}
                >
                  Nome
                </th>
                <th className={styles.tableHeaderCell}>Dano</th>
                <th className={styles.tableHeaderCell}>Penetração</th>
                <th className={styles.tableHeaderCell}>Nível de Perfuração</th>
                <th className={styles.tableHeaderCell}>Dano à Armadura</th>
                <th className={styles.tableHeaderCell}>Velocidade (m/s)</th>
                <th className={styles.tableHeaderCell}>Precisão</th>
                <th className={styles.tableHeaderCell}>Recuo V.</th>
                <th className={styles.tableHeaderCell}>Recuo H.</th>
                <th className={styles.tableHeaderCell}>Chance de Ferimento</th>
                <th className={styles.tableHeaderCell}>Alcance Extra</th>
                <th className={styles.tableHeaderCell}>Dreno de Stamina</th>
              </tr>
            </thead>
            <tbody>
              {ammoData.map((ammo, index) => (
                <AmmoLine
                  key={index}
                  {...ammo}
                  isFavorite={favorites.includes(
                    `${ammo.Caliber} ${ammo.Name}`
                  )}
                  toggleFavorite={() =>
                    toggleFavorite(`${ammo.Caliber} ${ammo.Name}`)
                  }
                  showFullName={caliber === 'Favoritos'}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
