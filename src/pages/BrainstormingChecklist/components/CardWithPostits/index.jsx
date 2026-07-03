import { useState } from "react";
import Card from "../Card";
import { PostIt } from "../PostIt";
import styles from "./styles.module.scss";

export function CardWithPostits({ subcard }) {
  const [postits, setPostits] = useState([]);

  const handleAddPostit = () => {
    setPostits([...postits, { id: Date.now(), text: "" }]);
  };

  const handleUpdatePostit = (id, newText) => {
    setPostits(postits.map((postit) => (postit.id === id ? { ...postit, text: newText } : postit)));
  };

  const handleDeletePostit = (id) => {
    setPostits(postits.filter((postit) => postit.id !== id));
  };

  return (
    <div className={styles.card__with__postits}>
      <Card
        id={subcard.id}
        category={subcard.category}
        description={subcard.description}
        context={subcard.context}
        cardType={subcard.type}
        descriptionLabel="Questão"
        contextLabel={
          subcard.type === "Requisitos"
            ? "Guia de Especificação do Requisito de Usabilidade"
            : "Guia de Especificação do Complemento de Prototipação"
        }
      />
      <div className={styles.postits__section}>
        <div className={styles.postits__container}>
          {postits.map((postit) => (
            <PostIt
              key={postit.id}
              text={postit.text}
              color={subcard.type}
              onUpdate={(newText) => handleUpdatePostit(postit.id, newText)}
              onDelete={() => handleDeletePostit(postit.id)}
            />
          ))}
        </div>
        <button className={styles.add__postit__btn} onClick={handleAddPostit} title="Adicionar post-it">
          +
        </button>
      </div>
    </div>
  );
}
