import React from 'react';
import styles from './AmmoLine.module.scss';
import { AmmoData } from '@/data/ammoData';
import { FaStar } from 'react-icons/fa';

interface AmmoLineProps extends AmmoData {
  isFavorite: boolean;
  toggleFavorite: () => void;
  showFullName: boolean;
}

const getValueClass = (value: number, max: number) => {
  const percentage = (value / max) * 100;
  if (percentage < 33) return styles.lowValue;
  if (percentage < 66) return styles.mediumValue;
  return styles.highValue;
};

const getStaminaDrainClass = (value: number | string) => {
  if (value === 0 || value === '0' || value === '') return styles.neutralValue;
  if (typeof value === 'number') {
    return value < 0 ? styles.positiveValue : styles.negativeValue;
  }
  if (typeof value === 'string') {
    return value.startsWith('-') ? styles.positiveValue : styles.negativeValue;
  }
  return '';
};

const getAccuracyClass = (value: string) => {
  if (value === '0' || value === '') return styles.neutralValue;
  return value.startsWith('+') ? styles.positiveValue : styles.negativeValue;
};

const getRecoilClass = (value: number | string) => {
  if (value === 0 || value === '0' || value === '') return styles.neutralValue;
  if (typeof value === 'number') {
    return value < 0 ? styles.positiveValue : styles.negativeValue;
  }
  if (typeof value === 'string') {
    return value.startsWith('-') ? styles.positiveValue : styles.negativeValue;
  }
  return '';
};

export const AmmoLine: React.FC<AmmoLineProps> = (props) => {
  return (
    <tr className={styles.ammoLine}>
      <td className={`${styles.cell} ${styles.name}`}>
        <FaStar
          className={
            props.isFavorite ? styles.favoriteIcon : styles.notFavoriteIcon
          }
          onClick={props.toggleFavorite}
        />
        {props.showFullName ? `${props.Caliber} ${props.Name}` : props.Name}
      </td>
      <td
        className={`${styles.cell} ${styles.statValue} ${getValueClass(
          Number(props.Damage),
          100
        )}`}
      >
        {props.Damage}
      </td>
      <td
        className={`${styles.cell} ${styles.statValue} ${getValueClass(
          props.Penetration,
          70
        )}`}
      >
        {props.Penetration}
      </td>
      <td
        className={`${styles.cell} ${styles.statValue} ${getValueClass(
          props['Pierce Level'],
          7
        )}`}
      >
        {props['Pierce Level']}
      </td>
      <td
        className={`${styles.cell} ${styles.statValue} ${getValueClass(
          props['Armor Damage'],
          55
        )}`}
      >
        {props['Armor Damage']}
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props['Velocity (m/s)']}
      </td>
      <td
        className={`${styles.cell} ${styles.statValue} ${getAccuracyClass(
          props.Accuracy
        )}`}
      >
        {props.Accuracy}
      </td>
      <td
        className={`${styles.cell} ${styles.statValue} ${getRecoilClass(
          props['V.Recoil Control']
        )}`}
      >
        {props['V.Recoil Control']}
      </td>
      <td
        className={`${styles.cell} ${styles.statValue} ${getRecoilClass(
          props['H.Recoil Control']
        )}`}
      >
        {props['H.Recoil Control']}
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props['Wound Chance']}
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props['Extra Range']}
      </td>
      <td
        className={`${styles.cell} ${styles.statValue} ${getStaminaDrainClass(
          props['Stamina Drain']
        )}`}
      >
        {props['Stamina Drain']}
      </td>
    </tr>
  );
};
