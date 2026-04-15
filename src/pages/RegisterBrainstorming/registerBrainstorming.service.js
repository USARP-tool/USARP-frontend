import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
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
  const navigate = useNavigate();

  const handleBackBackCloseALert = () => {
    close(null);
    navigate(-1);
  };

  const RegisterBrainstorming = (body, success, error, warning) => {
    const formattedBody = {
      brainstormingTitle: body.title,
      project: body.project.value,
      brainstormingDate: formatDateToDDMMYYYY(body.date),
      brainstormingTime: body.hours,
      userStories: body.userStory.map((item) => item.value),
    };
    api
      .post(url + "/brainstorming/create", formattedBody)
      .then(() => {
        open(success);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          open(warning);
        }
        open(error);
      });
  };

  const handleBackButton = (formValues, contentAlert) => {
    const hasDataLoss = Object.values(formValues).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) => Object.values(item).some((val) => val));
      }
      return Boolean(value);
    });

    hasDataLoss ? open(contentAlert) : handleBackBackCloseALert();
  };

  useEffect(() => {
    const fetchListProject = async () => {
      try {
        const { data } = await api.get("/project/owned-projects");
        setListProjects(formatProjectDataSelection(data.projects));
      } catch (error) {
        setError(error);
      }
    };

    fetchListProject();
  }, []);

  useEffect(() => {
    const fetchListUserStoriesByProject = async () => {
      try {
        const { data } = await api.get(`/userstories/${projectId}/user-stories`);
        setListUserStoriesByProject(formatUserStoriesDataSelection(data.userStories));
      } catch (error) {
        setError(error);
      }
    };

    fetchListUserStoriesByProject();
  }, [projectId]);

  return {
    listProjects,
    listUserStoriesByProject,
    error,
    setProjectId,
    RegisterBrainstorming,
    handleBackButton,
    handleBackBackCloseALert,
  };
};

export default RegisterBrainstormingService;
