import { IconChoice } from "../../../../utils/IconChoice";
import styles from "../../styles.module.scss";
export function Avatar({ icon }) {
  return (
    <div className={styles.avatar}>
      <IconChoice icon={icon} className={styles.avatar__icon} />
    </div>
  );
}
