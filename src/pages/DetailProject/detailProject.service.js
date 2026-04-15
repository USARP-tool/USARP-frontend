import { useEffect, useState } from "react";
import { api } from "../../utils/api";

const DetailProjectService = () => {
  const [projects, setProject] = useState();
  const [projectsId, setProjectId] = useState([]);

  useEffect(() => {
    const fetchListProject = async () => {
      try {
        const { data } = await api.get(`projects-details?id=${projectsId}`);
        if (data.projects.length === 1) {
          setProject(data.projects[0]);
        }
        console.log(data.projects);
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro ao buscar projetos";
        console.log(errorMessage);
      }
    };

    fetchListProject();
  }, [projectsId]);
  return {
    projects,
    setProjectId,
  };
};

export default DetailProjectService;
