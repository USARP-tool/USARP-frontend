  const formatUserStoriesDataSelection = (data) => {
    return data.map(({ id, userStoriesTitle, userStorieNumber }) => ({
      value: id,
      label: `US${userStorieNumber} - ${userStoriesTitle}`,
    }));
  };

  export { formatUserStoriesDataSelection };