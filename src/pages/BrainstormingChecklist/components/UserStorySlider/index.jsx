import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import styles from "./styles.module.scss";

export function UserStorySlider({ userStory }) {
  return (
    <div className={styles.us_header}>
      <button className={styles.nav_button}>
        <ChevronLeftIcon />
      </button>
      <h2 className={styles.title}>{userStory.title}</h2>
      <button className={styles.nav_button}>
        <ChevronRightIcon />
      </button>
    </div>
  );
}
