import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";
import { InputCombobox } from "../../components/InputCombobox";
import OrdemUserstoryService from './ordemUserstory.service';

export function OrdemUserstory() {
  const navigate = useNavigate();
  const {
    userStories,
    control,
    handleSubmit,
    formState,
    onSubmit,
    getFilteredOptions,
  } = OrdemUserstoryService();
  const { errors } = formState;

  return (
    <div className={styles.ordemUserstory__container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.ordemUserstory__box_form_wrapper}>
        <div className={styles.ordemUserstory__box}>
          <div className={styles.top}>
            <Text.Root className={styles.textRootContainer}>
              <Text.Headline as="h6">Ordem das Histórias de Usuário</Text.Headline>
              <Text.Caption data-type="regular">Defina a ordem em que as Histórias de Usuário serão discutidas no Brainstorming</Text.Caption>
            </Text.Root>
            <div className={styles.iconeSair}>
              <Button.Root data-type="tertiary">
                <Button.Icon iconName="close" />
              </Button.Root>
            </div>
          </div>
          <div className={styles.mid}>
            {userStories.map((us) => {
              const fieldName = `prioridade_${us.id}`;
              const currentOptions = getFilteredOptions(fieldName);
              const [ titleParts1, titleParts2 ] = us.title.split(" - ", 2);
              const usPrefix = titleParts1;
              const usSuffix = titleParts1.length > 1 ? ` - ${titleParts2}` : "";

              return (
                <div key={us.id} className={styles.comboboxWrapperPequeno}>
                  <Text.Root className={styles.textRootContainer}>
                    <Text.Body data-type="medium">
                      <strong>{usPrefix}</strong>{usSuffix}
                    </Text.Body>
                  </Text.Root>
                  <InputCombobox.Root>
                    <InputCombobox.Select
                      name={fieldName}
                      control={control}
                      options={currentOptions}
                      error={errors[fieldName]}
                      rules={{ required: true }}
                      placeholder="Prioridade"
                    />
                  </InputCombobox.Root>
                </div>
              );
            })}
          </div>
          <div className={styles.bot_error}>
            {Object.keys(errors).length > 0 && !formState.isValid && (
              <span className={styles.single__error}>Por favor, selecione uma prioridade para todas as histórias.</span>
            )}
          </div>
          <div className={styles.bot}>
            <Button.Root data-type="secondary" type="button" onClick={() => navigate(-1)}>
              <Button.Text>cancelar</Button.Text>
            </Button.Root>
            <Button.Root data-type="primary" type="submit" disabled={!formState.isValid}>
              <Button.Text>Prosseguir para sessão</Button.Text>
            </Button.Root>
          </div>
        </div>
      </form>
    </div>
  );
}