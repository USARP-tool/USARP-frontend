import { useState } from "react";
import { Text } from "../../../../components/Text";
import { Button } from "../../../../components/Button";
import styles from "../../styles.module.scss";

export function CardSelection({ checkedItems, accordionItems, onBackToChecklist, onSelectCard }) {
  const [selectedCard, setSelectedCard] = useState(null);

  // Get all cards that match the checked items
  const getSelectedCards = () => {
    const selectedCards = [];
    accordionItems.groups.forEach((group) => {
      group.cardsGroup.forEach((cardGroup) => {
        cardGroup.cards.forEach((card) => {
          if (checkedItems.includes(card.id)) {
            selectedCards.push(card);
          }
        });
      });
    });
    return selectedCards;
  };

  const selectedCards = getSelectedCards();

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
    onSelectCard(cardId);
  };

  const handleBack = () => {
    onBackToChecklist();
  };

  return (
    <div className={styles.checklist__container}>
      <Text.Root>
        <Text.Headline as="h6">Preencher Cartas</Text.Headline>
      </Text.Root>
      <div className={styles.card__selection}>
        {selectedCards.map((card) => (
          <div key={card.id} className={styles.card__option}>
            <input
              type="radio"
              id={card.id}
              name="card-selection"
              value={card.id}
              checked={selectedCard === card.id}
              onChange={() => handleCardSelect(card.id)}
            />
            <label htmlFor={card.id} className={styles.card__label}>
              <div className={styles.card__category}>{card.category}</div>
              <div className={styles.card__description}>{card.description}</div>
            </label>
          </div>
        ))}
      </div>

      <Button.Root
        data-type="primary"
        className={`${styles.submit__checklist} ${styles.backToChecklistButton}`}
        onClick={handleBack}
      >
        <Button.Text>Voltar para Checklist</Button.Text>
      </Button.Root>
    </div>
  );
}
