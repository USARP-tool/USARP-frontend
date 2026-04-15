  const formatProjectDataSelection = (data) => {
    return data.map(({ id, projectName }) => ({ 
      value: id,
      label: projectName,
    }));

  }

  export { formatProjectDataSelection };