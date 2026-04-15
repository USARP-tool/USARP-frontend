import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export function PaginationRoot({ children }) {
  return <div className={styles.paginationContainer}>{children}</div>;
}

PaginationRoot.propTypes = {
  children: PropTypes.node.isRequired,
};
