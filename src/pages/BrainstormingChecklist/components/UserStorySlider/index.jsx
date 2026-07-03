import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import styles from "./styles.module.scss";

export function UserStorySlider({ userStories = [], brainstormingName = "Brainstorming" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentUserStory = userStories[currentIndex];
  const hasMultipleStories = userStories.length > 1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < userStories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const displayTitle = currentUserStory
    ? `${currentUserStory.userStorieNumber}. ${currentUserStory.userStoriesTitle}`
    : "Sem histórias de usuário";

  return (
    <div className={styles.us_header}>
      <div className={styles.slider_inner}>
        <button
          className={styles.nav_button}
          onClick={handlePrevious}
          disabled={!hasMultipleStories || currentIndex === 0}
        >
          <ChevronLeftIcon />
        </button>
        <div className={styles.slider_title_wrap}>
          <h2 className={styles.title}>{displayTitle}</h2>
          {hasMultipleStories && (
            <span className={styles.slider_count}>
              {currentIndex + 1} de {userStories.length}
            </span>
          )}
        </div>
        <button
          className={styles.nav_button}
          onClick={handleNext}
          disabled={!hasMultipleStories || currentIndex === userStories.length - 1}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
