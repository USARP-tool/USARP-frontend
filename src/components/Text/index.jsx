import { TextRoot } from "./TextRoot";
import { TextButton } from "./TextButton";
import { TextHeadline } from "./TextHeadline";
import { TextBody } from "./TextBody";
import { TextCaption } from "./TextCaption";

/**
 * 
 * @returns {Object} Retorna um objeto com os subcomponentes:
 * - Root: Container principal para textos
 * - Button: Texto estilizado para botões
 * - Headline: Títulos em diferentes níveis
 * - Body: Texto para corpo/conteúdo
 * - Caption: Texto de legenda ou auxiliar
 */
export const Text = {
  Root: TextRoot,
  Button: TextButton,
  Headline: TextHeadline,
  Body: TextBody,
  Caption: TextCaption,
};