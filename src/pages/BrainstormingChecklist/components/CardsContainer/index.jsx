import Card from "../Card";
import styles from "./styles.module.scss";

export default function CardsContainer({ displayedCards, checkedItems }) {
  if (!displayedCards || displayedCards.length === 0) {
    return;
  }
  // TODO: Implementar lógica para exibir ícones
  return (
    <main className={styles.cardsContainer}>
      <div className={styles.cardsContainer__content}>
        {displayedCards.map((cardsGroup) =>
          cardsGroup.cards.map((card) => (
            <Card
              key={card.id}
              category={card.category}
              description={card.description}
              context={card.context}
              id={card.id}
              isChecked={checkedItems.includes(card.id)}
            />
          ))
        )}
      </div>
    </main>
  );
}
