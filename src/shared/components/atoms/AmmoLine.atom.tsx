import React from 'react';
import styles from './AmmoLine.module.scss';
import { AmmoData } from '@/data/ammoData';
import { FaStar } from 'react-icons/fa';
import { useGoogleAnalytics } from '@/shared/hooks/ga4';

interface AmmoLineProps extends AmmoData {
  isFavorite: boolean;
  toggleFavorite: () => void;
  showFullName: boolean;
}

export const AmmoLine: React.FC<AmmoLineProps> = (props) => {
  const { sendEvent } = useGoogleAnalytics();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.toggleFavorite();
    sendEvent('toggle_favorite', {
      ammo_name: props.Name,
      caliber: props.Caliber,
      is_favorite: !props.isFavorite,
    });
  };

  return (
    <tr className={styles.ammoLine}>
      <td className={`${styles.cell} ${styles.name} ${styles.stickyColumn}`}>
        <div className={styles.nameContainer}>
          <FaStar
            className={
              props.isFavorite ? styles.favoriteIcon : styles.notFavoriteIcon
            }
            onClick={handleToggleFavorite}
          />
          <span className={styles.ammoName}>
            {props.showFullName ? `${props.Caliber} ${props.Name}` : props.Name}
          </span>
        </div>
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>{props.Damage}</td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props.Penetration}
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props['Pierce Level']}
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props['Armor Damage']}
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props['Velocity (m/s)']}
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>{props.Accuracy}</td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props['V.Recoil Control']}
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props['H.Recoil Control']}
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props['Wound Chance']}
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props['Extra Range']}
      </td>
      <td className={`${styles.cell} ${styles.statValue}`}>
        {props['Stamina Drain']}
      </td>
    </tr>
  );
};
