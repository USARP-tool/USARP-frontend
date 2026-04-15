import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const SidebarProfile = ({ label, link, icon, ...buttonProps }) => {
  const location = useLocation();
  const path = link.split("/").pop();
  const isSelected = location.pathname.includes(path);

  return (
    <Link to={link} className={styles.sidebarLink}>
      <div {...buttonProps} className={`${styles.sidebarItem} ${isSelected ? styles.selected : ""}`}>
        {/* <IconChoice
          icon={icon}
          color={isSelected ? "var(--th-button-sidebar-text-selected)" : "var(--th-button-sidebar-background)"}
        /> */}
        {icon}
        <span className={styles.label}>{label}</span>
      </div>
    </Link>
  );
};





SidebarProfile.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default SidebarProfile;
