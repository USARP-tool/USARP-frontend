import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Pagination,
  Select,
  MenuItem,
  Box,
  Typography,
  Avatar,
  TableSortLabel,
} from "@mui/material";
import { Eye, EyeOff, Star, Pencil, Trash2, User } from "lucide-react";

import Link from "../ui/Link/Link";
import { formatDateToDMY } from "../../utils/formatDate";
import styles from "./styles.module.scss";

const ProjectTable = ({ rows = [], onToggleFavorite, onHideProject, onDeleteProject, filter }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const visibleRows = useMemo(() => {
    const sortedRows = [...rows].sort((a, b) => {
      let valueA, valueB;

      if (orderBy === "date") {
        valueA = a.date;
        valueB = b.date;
      } else {
        valueA = (a[orderBy] || "").toString().toLowerCase();
        valueB = (b[orderBy] || "").toString().toLowerCase();
      }

      if (valueA < valueB) {
        return order === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return sortedRows.slice(startIndex, endIndex);
  }, [rows, order, orderBy, page, rowsPerPage]);

  const pageCount = Math.ceil(rows.length / rowsPerPage);

  return (
    <Paper elevation={0} className={styles.paper}>
      <TableContainer className={styles.tableContainer}>
        <Table stickyHeader aria-label="tabela de projetos" className={styles.table}>
          <TableHead>
            <TableRow className={styles.tableHeadRow}>
              <TableCell className={styles.tableHeadCell}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                >
                  NOME
                </TableSortLabel>
              </TableCell>
              <TableCell className={styles.tableHeadCell}>CRIADO POR</TableCell>
              <TableCell className={styles.tableHeadCell}>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleRequestSort("date")}
                >
                  DATA DE CRIAÇÃO
                </TableSortLabel>
              </TableCell>
              <TableCell className={styles.tableHeadCell}>STATUS</TableCell>
              <TableCell align="right" className={styles.tableHeadCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id} hover className={styles.row}>
                <TableCell
                  component="th"
                  scope="row"
                  className={styles.nameCell}
                  onClick={() => navigate(`/project/${row.id}`)}
                  style={{
                    cursor: "pointer",
                    color: "var(--primary-600)",
                    fontWeight: "bold",
                  }}
                  title="Ver detalhes do projeto" 
                >
                  {row.name}
                </TableCell>

                <TableCell>
                  <Box className={styles.creatorWrapper}>
                    <Avatar className={styles.avatar}>
                      <User size={14} color="var(--white)" />
                    </Avatar>
                    <span className={styles.creatorName}>{row.creator}</span>
                  </Box>
                </TableCell>

                <TableCell className={styles.dateCell}>{formatDateToDMY(row.date)}</TableCell>

                <TableCell>
                  <Chip label={row.status} size="small" className={styles.statusChip} />
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => onHideProject(row.id)}
                    title={row.isHidden ? "Restaurar projeto" : "Ocultar projeto"}
                  >
                    {row.isHidden ? (
                      <Eye size={20} color="var(--primary-600)" />
                    ) : (
                      <EyeOff size={20} color="var(--primary-600)" />
                    )}
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => onToggleFavorite(row.id)}
                    title={row.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    <Star
                      size={20}
                      color="var(--tertiary-500)"
                      fill={row.isFavorite ? "var(--tertiary-500)" : "none"}
                    />
                  </IconButton>

                  <IconButton size="small" onClick={() => navigate(`/editProject/${row.id}`)} title="Editar Projeto">
                    <Pencil size={20} color="var(--primary-600)" />
                  </IconButton>

                  <IconButton size="small" onClick={() => onDeleteProject(row.id)} title="Excluir Projeto">
                    <Trash2 size={20} color="var(--error)" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {visibleRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" className={styles.emptyStateCell}>
                  {rows.length === 0 && filter !== "Todos" ? (
                    "Nenhum projeto encontrado neste filtro."
                  ) : (
                    <>
                      Ainda não há projetos cadastrados.{" "}
                      <Link to="/registerProject" bold color="primary">
                        Criar meu primeiro projeto agora.
                      </Link>
                    </>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className={styles.footer}>
        <Box className={styles.rowsPerPageWrapper}>
          <Typography variant="body2">Linhas por página:</Typography>
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            variant="standard"
            disableUnderline
            className={styles.select}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </Box>

        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, v) => setPage(v)}
          shape="rounded"
          color="primary"
          className={styles.pagination}
        />
      </Box>
    </Paper>
  );
};

ProjectTable.propTypes = {
  onToggleFavorite: PropTypes.func,
  onHideProject: PropTypes.func,
  onDeleteProject: PropTypes.func,
  filter: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      creator: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      isFavorite: PropTypes.bool,
    })
  ),
};

export default ProjectTable;
