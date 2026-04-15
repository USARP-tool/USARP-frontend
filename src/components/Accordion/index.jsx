import { AccordionRoot } from "./AccordionRoot";
import { AccordionContent } from "./AccordionContent";
import { AccordionItem } from "./AccordionItem";
import { AccordionHeader } from "./AccordionHeader";

/**
 *
 * @returns {Object} Retorna um objeto com os subcomponentes:
 * - Root: Container principal para accordion
 * - Item: Wrapper do header e do content do accordion
 * - Header: Título do accordion
 * - Content: Conteúdo principal do accordion
 */
export const Accordion = {
  Root: AccordionRoot,
  Content: AccordionContent,
  Item: AccordionItem,
  Header: AccordionHeader,
};
