import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { formatDateToDDMMYYYY } from "../../utils/formatDate";

const ViewProjectService = (url) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    pagination: {
      offset: 0,
      limit: 5,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatProjectsData(projects) {
    // Garante que vamos trabalhar com um array, mesmo que venha um único objeto
    const arrayOfProjects = Array.isArray(projects) ? projects : [projects];

    return arrayOfProjects.map((project) => {
      return {
        id: project.id,
        creatorFullName: project.creator?.fullName || "",
        projectName: project.projectName,
        status: project.status,
        createdAt: formatDateToDDMMYYYY(project.createdAt),
        updatedAt: formatDateToDDMMYYYY(project.updatedAt),
      };
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `${url}?offset=${pagination.pagination.offset}&limit=${pagination.pagination.limit}${filters.join("")}`
        );
        setPagination({
          count: response.data.count,
          pagination: {
            offset: response.data.pagination.offset,
            limit: response.data.pagination.limit,
          },
        });
        const formatted = formatProjectsData(response.data.projects);
        setData(formatted);
      } catch (error) {
        setError(error?.message || "Ocorreu um erro");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, pagination.pagination.offset, pagination.pagination.limit, filters]);

  return { data, pagination, setPagination, setFilters, loading, error };
};

export default ViewProjectService;
