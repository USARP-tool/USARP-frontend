import { Accordion } from "../../../../components/Accordion";
import { Checkbox } from "../../../../components/Checkbox";
import { Text } from "../../../../components/Text";
import { CheckboxGroup } from "../../../../components/CheckboxGroup";
import styles from "../../styles.module.scss";
import { Button } from "../../../../components/Button";

export default function Checklist({
  accordionItems,
  checkedItems,
  handleCheck,
  onSelectedAccordionItem,
  handleSubmitChecklist
}) {
  return (
    <div className={styles.checklist__container}>
      <Text.Root>
        <Text.Headline as="h6">Checklist</Text.Headline>
      </Text.Root>
      <Accordion.Root defaultIndex={0}>
        {accordionItems.groups.map((group) => (
          <Accordion.Item index={group.id} key={group.id} onClick={() => onSelectedAccordionItem(group.id)}>
            <Accordion.Header>{group.title}</Accordion.Header>
            <Accordion.Content>
              <div className={styles.checklist__accordion}>
                {group.cardsGroup.map((cardGroup) => (
                  <CheckboxGroup.Root key={cardGroup.id}>
                    <CheckboxGroup.Caption>
                      {cardGroup.caption}
                    </CheckboxGroup.Caption>
                    {cardGroup.cards.map((card) => (
                      <Checkbox.Root
                        key={card.id}
                        checked={checkedItems.includes(card.id)}
                        onChange={() => handleCheck(card.id)}
                      >
                        <Checkbox.Text>
                          {card.category} ({card.id})
                        </Checkbox.Text>
                      </Checkbox.Root>
                    ))}
                  </CheckboxGroup.Root>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <Button.Root data-type="primary">
        <div className={styles.submit__checklist}>
          <Button.Text>Preencher Cartas</Button.Text>
          <Button.Icon iconName={"arrowRightShort"} />
        </div>
      </Button.Root>
    </div>
  );
}
