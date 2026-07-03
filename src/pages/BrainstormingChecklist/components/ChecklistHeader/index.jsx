import { useNavigate } from "react-router-dom";
import styles from "../../styles.module.scss";
import { Text } from "../../../../components/Text";
import { Button } from "../../../../components/Button";
import { Avatar } from "./avatar";
import { images } from "../../../../assets/images/images";

export function ChecklistHeader({ avatarList, handleSignOutSession, brainstormingTitle }) {
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    if (typeof handleSignOutSession === "function") {
      handleSignOutSession();
    }
    navigate("/brainstorming");
  };

  return (
    <header className={styles.header}>
      <div className={styles.brainstorming__header__info__container}>
        <img src={images.logo3} alt="Usarp Logo" className={styles.smallLogo} />
        <div className={styles.title__container}>
          <Text.Root>
            <Text.Headline as="h6">{brainstormingTitle}</Text.Headline>
            <Text.Caption>
              <span className={styles.subtitle}>Exportar requisitos</span>
            </Text.Caption>
          </Text.Root>
        </div>
      </div>
      <div className={styles.actions__container}>
        <div className={styles.avatar_container}>
          {avatarList.map((avatar) => (
            <Avatar icon={avatar.icon} />
          ))}
        </div>
        <div>
          <Button.Root data-type="primary" className={styles.button__outline} onClick={handleSignOutClick}>
            <Button.Text>Sair da sessão</Button.Text>
          </Button.Root>
        </div>
      </div>
    </header>
  );
}
