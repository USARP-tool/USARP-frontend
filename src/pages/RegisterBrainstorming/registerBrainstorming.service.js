import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import { useAuth } from "../../hooks/useAuth";

import { formatProjectDataSelection } from "../../utils/formatProjectDataSelection";
import { api } from "../../utils/api";
import { formatUserStoriesDataSelection } from "../../utils/formatUserStoriesDataSelection";
import { formatDateToDDMMYYYY } from "../../utils/formatDate";

const RegisterBrainstormingService = (url) => {
  const [listProjects, setListProjects] = useState([]);
  const [listUserStoriesByProject, setListUserStoriesByProject] = useState([]);
  const [projectId, setProjectId] = useState();
  const [error, setError] = useState(null);

  const { open, close } = useAlert();
  const { token } = useAuth();

  const navigate = useNavigate();

  const handleBackBackCloseALert = () => {
    close(null);
    navigate(-1);
  };

  const RegisterBrainstorming = (
    body,
    success,
    error,
    warning
  ) => {
    const formattedBody = {
      brainstormingTitle: body.title,
      project: body.project.value,
      brainstormingDate: formatDateToDDMMYYYY(body.date),
      brainstormingTime: body.hours,
      userStories: body.userStory?.map(
        (item) => item.value
      ) || [],
    };

    api
      .post(
        "/brainstorming/create",
        formattedBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        open(success);
      })
      .catch((err) => {
        console.log(err);

        if (err.code === "ERR_NETWORK") {
          open(warning);
        }

        open(error);
      });
  };

  const updateBrainstormingStatus = async (
    brainstormingId,
    status
  ) => {
    try {
      const { data } = await api.patch(
        `/brainstorming/${brainstormingId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      open({
        type: "success",
        message: "Status atualizado com sucesso",
      });

      return data;
    } catch (error) {
      console.log(error);

      open({
        type: "error",
        message:
          error.response?.data?.message ||
          "Erro ao atualizar status",
      });

      setError(error);
    }
  };

  const handleBackButton = (
    formValues,
    contentAlert
  ) => {
    const hasDataLoss = Object.values(
      formValues
    ).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) =>
          Object.values(item).some((val) => val)
        );
      }

      return Boolean(value);
    });

    hasDataLoss
      ? open(contentAlert)
      : handleBackBackCloseALert();
  };

  useEffect(() => {
    const fetchListProject = async () => {
      try {
        const { data } = await api.get(
          "/project/owned-projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setListProjects(
          formatProjectDataSelection(data.projects)
        );
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    if (token) {
      fetchListProject();
    }
  }, [token]);

  useEffect(() => {
    if (!projectId) return;

    const fetchListUserStoriesByProject =
      async () => {
        try {
          const { data } = await api.get(
            `/userstories/${projectId}/user-stories`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setListUserStoriesByProject(
            formatUserStoriesDataSelection(
              data.userStories
            )
          );
        } catch (error) {
          if (
            error.response?.status === 404
          ) {
            setListUserStoriesByProject([]);
            return;
          }

          console.log(error);
          setError(error);
        }
      };

    fetchListUserStoriesByProject();
  }, [projectId, token]);

  return {
    listProjects,
    listUserStoriesByProject,
    error,
    setProjectId,
    RegisterBrainstorming,
    updateBrainstormingStatus,
    handleBackButton,
    handleBackBackCloseALert,
  };
};

export default RegisterBrainstormingService;