import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import ProfileDropdown from "../../components/ProfileDropdown/ProfileDropdown";
import { NavLink } from "react-router-dom";
import { images } from "../../assets/images/images";

const Navbar = ({ avatarUrl }) => {
  return (
    <nav className={styles.navbar}>
      <figure>
        <NavLink to="/home">
          <img src={images.logo} alt="logo da usarp" />
        </NavLink>
      </figure>
      <ProfileDropdown avatarUrl={avatarUrl} />
    </nav>
  );
};

Navbar.propTypes = {
  avatarUrl: PropTypes.string,
};

Navbar.defaultProps = {
  avatarUrl: null,
};

export default Navbar;
