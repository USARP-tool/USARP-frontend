import styles from "./styles.module.scss";

export function UserStorySlider({ userStory }) {
  return (
    <div className={styles.us_header}>
      <button>Prev</button>
      <h2 className={styles.title}>{userStory.title}</h2>
      <button>Next</button>
    </div>
  );
}
