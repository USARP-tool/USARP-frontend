import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { IconChoice } from "../../../../utils/IconChoice";
import styles from "./index.module.scss";
import PropTypes from "prop-types";

/**
 * CardMeansurement Component
 *
 * @param {string} line - Cor da borda do card.
 * @param {string} color - Cor do valor exibido no card.
 * @param {string} button - Tipo do botão (usado para estilização dinâmica).
 * @param {string} title - Título descritivo do card.
 * @param {number} value - Valor numérico exibido no card.
 * @param {string} icon - Nome do ícone a ser exibido no card.
 * @param {boolean} permission - Define se o botão "Novo" deve ser exibido (padrão: true).
 * @param {string} btnSeeAll - Define a rota de navagação do botão "Ver todos".
 * @param {string} btnNew - Define a rota de navagação do botão "Novo".
 * @returns {JSX.Element} - Retorna o componente CardMeansurement.
 */
export default function CardMeansurement({
  line = "#ccc", // Valor padrão para a borda
  color = "#000", // Valor padrão para a cor do valor
  button = "default", // Valor padrão para o tipo do botão
  title = "Título Padrão", // Valor padrão para o título
  value = 0, // Valor padrão para o valor numérico
  icon = "defaultIcon", // Valor padrão para o ícone
  permission = true, // Valor padrão para a permissão
  btnSeeAll = "/see-all", // Rota padrão para o botão "Ver todos"
  btnNew = "/new", // Rota padrão para o botão "Novo"
}) {
  const navigate = useNavigate();
  return (
    <div
      style={{ border: "1px solid " + line }}
      className={styles.card_membros}
    >
      <div className={styles.card_membro_header}>
        <IconChoice icon={icon} />
        <div>
          <h5
            style={{ color: color, "--valor-final": value }}
            className={styles.counter}
          ></h5>
          <p>{title}</p>
        </div>
      </div>
      <div className={styles.card_membro_body}>
        <Button.Root
          data-type={`menber-${button}-primary`}
          onClick={() => navigate(btnSeeAll)}
        >
          <Button.Icon icon="eyeOn" />
          <Button.Text>Ver todos</Button.Text>
        </Button.Root>

        {permission && (
          <Button.Root
            data-type={`menber-${button}-outline`}
            onClick={() => navigate(btnNew)}
          >
            <Button.Icon icon="plus" />
            <Button.Text>Novo</Button.Text>
          </Button.Root>
        )}
      </div>
    </div>
  );
}

// Validação das propriedades
CardMeansurement.propTypes = {
  line: PropTypes.string, // Cor da borda do card
  color: PropTypes.string, // Cor do valor exibido
  button: PropTypes.string, // Tipo do botão (para estilização dinâmica)
  title: PropTypes.string, // Título descritivo do card
  value: PropTypes.number, // Valor numérico exibido
  icon: PropTypes.string, // Nome do ícone a ser exibido
  permission: PropTypes.bool, // Define se o botão "Novo" deve ser exibido
  btnSeeAll: PropTypes.string, // Define a rota de navagação do botão "Ver todos"
  btnNew: PropTypes.string, // Define a rota de navagação do botão "Novo"
};
