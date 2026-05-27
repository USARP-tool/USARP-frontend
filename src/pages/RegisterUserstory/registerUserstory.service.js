import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import { api } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import { formatProjectDataSelection } from "../../utils/formatProjectDataSelection";

const RegisterUserstoryService = () => {
  const { token } = useAuth();

  const [projectList, setProjectList] = useState([]);
  const [error, setError] = useState(null);

  const { open, close } = useAlert();
  const navigate = useNavigate();
  const handleBackBackCloseALert = (projectId) => {
    close();
    
    if(projectId){
      navigate(`/userstories/${projectId}`);
      return;
    }
    navigate(-1);
  };

  const handleBackButton = (
    formValues, 
    contentAlert,
    projectId
  ) => {
    const hasDataLoss = Object.values(formValues).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) => Object.values(item).some((val) => val));
      }
      return Boolean(value);
    });

    hasDataLoss 
    ? open(contentAlert) 
    : handleBackBackCloseALert(projectId);
  };
  const registerUserstory = (
    body, 
    success, 
    serverError, 
    connectionError
  ) => {
    api
      .post("/userstories/register", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        open(success);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          open(connectionError);
          return;
        }
        if (err.response?.status >= 500){
          open(serverError);
          return;
        }
        open(serverError);
      });
  };

  useEffect(() => {
    const fetchListProject = async () => {
      try {
        console.log("TOKEN:", token);
        const { data } = await api.get("/project/owned-projects",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
