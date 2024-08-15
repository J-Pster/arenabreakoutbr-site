// AmmoTable.tsx
import React from 'react';
import { AmmoLine } from '../atoms/AmmoLine.atom';
import styles from './AmmoTable.module.scss';
import { AmmoData } from '@/data/ammoData';

interface AmmoTableProps {
  caliber: string;
  ammoData: AmmoData[];
}

export const AmmoTable: React.FC<AmmoTableProps> = ({ caliber, ammoData }) => {
  return (
    <table className={styles.ammoTable}>
      <thead>
        <tr>
          <th colSpan={13} className={styles.tableHeader}>
            <span className={styles.caliber}>{caliber}</span>
          </th>
        </tr>
        <tr>
          <th className={styles.tableHeaderCell}>Nome</th>
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
          <AmmoLine key={index} {...ammo} />
        ))}
      </tbody>
    </table>
  );
};
