import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import styles from "./styles.module.scss";

const Layout = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
