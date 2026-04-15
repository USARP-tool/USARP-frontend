import { Input } from "../../components/Input/indes";
import { InputTextarea } from "../../components/InputTextarea/indes";
import { TooltipInfo } from "../../components/TooltipInfo";
import { templateCard, templateConfirmation, templateConversation } from "../../utils/templateText";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

export function UserStoryFormFields({
  index,
  register,
  errors,
  control,
  setValue,
}) {
  return (
    <div className={styles.generaldata__container}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <fieldset style={{ width: "30%" }}>
          <h6>Número da História de Usuário</h6>
          <Input.Root
            placeholder="001"
            type="number"
            name={`userStory[${index}].userStorieNumber`}
            {...register(`userStory.${index}.userStorieNumber`)}
            id={`userStory[${index}].userStorieNumber`}
          >
            {errors.userStory?.[index]?.userStorieNumber && (
              <Input.Error>
                {errors.userStory[index].userStorieNumber.message}
              </Input.Error>
            )}
          </Input.Root>
        </fieldset>
        <fieldset style={{ width: "70%" }}>
          <h6>Título da História de Usuário</h6>
          <Input.Root
            type="text"
            placeholder="Cadastro de usuário no sistema"
            name={`userStory[${index}].userStoriesTitle`}
            id={`userStory[${index}].userStoriesTitle`}
            {...register(`userStory.${index}.userStoriesTitle`)}
          >
            {errors.userStory?.[index]?.userStoriesTitle && (
              <Input.Error>
                {errors.userStory[index].userStoriesTitle.message}
              </Input.Error>
            )}
          </Input.Root>
        </fieldset>
      </div>

      <fieldset>
        <TooltipInfo.Root
          text="Copia Template"
          onClick={() =>
            setValue(`userStory.${index}.card`, templateCard, {
              shouldValidate: true,
            })
          }
        >
          <h6>Cartão</h6>
        </TooltipInfo.Root>
        <InputTextarea.Root
          name={`userStory.${index}.card`}
          id={`userStory.${index}.card`}
          control={control}
        >
          {errors.userStory?.[index]?.card && (
            <InputTextarea.Error>
              {errors.userStory[index].card.message}
            </InputTextarea.Error>
          )}
        </InputTextarea.Root>
      </fieldset>

      <fieldset>
        <TooltipInfo.Root
          text="Copia Template"
          onClick={() =>
            setValue(`userStory.${index}.conversation`, templateConversation, {
              shouldValidate: true,
            })
          }
        >
          <h6>Conversa</h6>
        </TooltipInfo.Root>
        <InputTextarea.Root
          name={`userStory.${index}.conversation`}
          id={`userStory.${index}.conversation`}
          control={control}
        >
          {errors.userStory?.[index]?.conversation && (
            <InputTextarea.Error>
              {errors.userStory[index].conversation.message}
            </InputTextarea.Error>
          )}
        </InputTextarea.Root>
      </fieldset>

      <fieldset>
        <TooltipInfo.Root
          text="Copia Template"
          onClick={() =>
            setValue(`userStory.${index}.confirmation`, templateConfirmation, {
              shouldValidate: true,
            })
          }
        >
          <h6>Confirmação</h6>
        </TooltipInfo.Root>
        <InputTextarea.Root
          name={`userStory.${index}.confirmation`}
          id={`userStory.${index}.confirmation`}
          control={control}
        >
          {errors.userStory?.[index]?.confirmation && (
            <InputTextarea.Error>
              {errors.userStory[index].confirmation.message}
            </InputTextarea.Error>
          )}
        </InputTextarea.Root>
      </fieldset>
    </div>
  );
}

UserStoryFormFields.propTypes = {
  index: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
};