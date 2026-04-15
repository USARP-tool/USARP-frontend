import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

const OrdemUserstoryService = () => {
  const initialUserStories = [
    { id: 'us001', title: 'US001 - Cadastro de usuário no sistema' },
    { id: 'us002', title: 'US002 - Login de usuário no sistema' },
    { id: 'us003', title: 'US003 - Recuperação de senha do usuário' },
    { id: 'us004', title: 'US004 - Edição de perfil' },
    { id: 'us005', title: 'US005 - Visualização de projetos' },
    { id: 'us006', title: 'US006 - Exclusão de conta' },
  ];

  const [userStories, setUserStories] = useState(initialUserStories);

  const initialDefaultValues = {};
  const priorityFieldNames = userStories.map(us => {
    const fieldName = `prioridade_${us.id}`;
    initialDefaultValues[fieldName] = null;
    return fieldName;
  });

  const {
    control,
    handleSubmit,
    formState,
    watch,
  } = useForm({
    defaultValues: initialDefaultValues,
    mode: 'onChange'
  });

  const allWatchedValues = watch();

  useEffect(() => {
    const reorderedStories = [...initialUserStories].sort((a, b) => {
      const priorityA = allWatchedValues[`prioridade_${a.id}`]?.value;
      const priorityB = allWatchedValues[`prioridade_${b.id}`]?.value;

      if (priorityA && priorityB) {
        return parseInt(priorityA) - parseInt(priorityB);
      }
      if (priorityA) {
        return -1;
      }
      if (priorityB) {
        return 1;
      }
      return 0;
    });

    setUserStories(reorderedStories);
  }, [allWatchedValues]);

  const onSubmit = (data) => {
    console.log("Dados do formulário (objetos de opção):", data);
    const simpleData = Object.keys(data).reduce((acc, key) => {
      acc[key] = data[key] ? data[key].value : null;
      return acc;
    }, {});
    console.log("Dados simplificados (apenas valores):", simpleData);
  };

  const opcoesDePrioridadeCompleta = userStories.map((us, index) => ({
    value: (index + 1).toString(),
    label: (index + 1).toString(),
  }));

  const getFilteredOptions = (currentFieldName) => {
    const selectedValuesInOtherFields = [];
    priorityFieldNames.forEach(fieldName => {
      if (fieldName !== currentFieldName) {
        const selectedOptionObject = allWatchedValues[fieldName];
        if (selectedOptionObject && selectedOptionObject.value) {
          selectedValuesInOtherFields.push(selectedOptionObject.value);
        }
      }
    });
    const currentValueForThisField = allWatchedValues[currentFieldName];
    return opcoesDePrioridadeCompleta.filter(option => {
      if (currentValueForThisField && option.value === currentValueForThisField.value) {
        return true;
      }
      return !selectedValuesInOtherFields.includes(option.value);
    });
  };

  return {
    userStories,
    control,
    handleSubmit,
    formState,
    onSubmit,
    getFilteredOptions,
  };
};

export default OrdemUserstoryService;