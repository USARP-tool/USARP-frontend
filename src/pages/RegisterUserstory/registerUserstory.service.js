import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import { api } from "../../utils/api";
import { formatProjectDataSelection } from "../../utils/formatProjectDataSelection";

const RegisterUserstoryService = () => {
  const [projectList, setProjectList] = useState([]);
  const [error, setError] = useState(null);

  const { open, close } = useAlert();
  const navigate = useNavigate();
  const handleBackBackCloseALert = () => {
    close();
    navigate(-1);
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
  const registerUserstory = (body, success, error, warning) => {
    api
      .post("/userstories/register", body)
      .then(() => {
        open(success);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          // handleOpenAlertError();
        }
        // handleOpenToastError();
      });
  };

  useEffect(() => {
    const fetchListProject = async () => {
      try {
        const { data } = await api.get("/project/owned-projects");
        setProjectList(formatProjectDataSelection(data.projects));
      } catch (error) {
        setError(error);
      }
    };

    fetchListProject();
  }, []);

  return {
    registerUserstory,
    handleBackButton,
    projectList,
    error,
    handleBackBackCloseALert,
  };
};

export default RegisterUserstoryService;
