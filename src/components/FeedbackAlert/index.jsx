import { FeedbackAlertButton } from "./FeedbackAlertButton";
import { FeedbackAlertDescription } from "./FeedbackAlertDescription";
import { FeedbackAlertIcon } from "./FeedbackAlertIcon";
import { FeedbackAlertRoot } from "./FeedbackAlertRoot";
import { FeedbackAlertTitle } from "./FeedbackAlertTitle";

/**
 * FeedbackAlert Component
 *
 * @returns {Object} - Retorna um objeto com os subcomponentes:
 * - Root: Container principal do FeedbackAlert.
 * - Icon: Ícone do FeedbackAlert.
 * - Title: Título do FeedbackAlert.
 * - Description: Descrição do FeedbackAlert.
 * - Button: Botão do FeedbackAlert.
 */
export const FeedbackAlert = {
  Root: FeedbackAlertRoot,
  Icon: FeedbackAlertIcon,
  Title: FeedbackAlertTitle,
  Description: FeedbackAlertDescription,
  Button: FeedbackAlertButton,
};
