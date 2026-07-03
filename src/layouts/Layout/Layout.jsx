import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import styles from "./styles.module.scss";

const Layout = () => {
  const location = window.location.pathname;

  return (
    <div className={styles.container}>
      {!location.includes("/brainstormingChecklist") && <Sidebar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
