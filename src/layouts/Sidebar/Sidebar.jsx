import { NavLink } from "react-router-dom";
import { House, FolderClosed, Lightbulb } from "lucide-react";
import { images } from "../../assets/images/images";
import styles from "./styles.module.scss";

const Sidebar = () => {
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? styles.active : undefined;
  };

  return (
    <nav className={styles.container}>
      <figure>
        <img src={images.logo} alt="logo USARP tools" />
      </figure>
      <ul>
        <li>
          <NavLink to="/home" end className={getNavLinkClass}>
            <House />
            <span>Inicio</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="project" className={getNavLinkClass}>
            <FolderClosed />
            <span>Projetos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="brainstorming" className={getNavLinkClass}>
            <Lightbulb />
            <span>Brainstormings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
