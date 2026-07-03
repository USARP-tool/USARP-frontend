import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import styles from "./styles.module.scss";

const Layout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isBrainstormingChecklistPage = pathSegments[0] === "brainstorming" && pathSegments.length > 1;

  return (
    <div className={styles.container}>
      {!isBrainstormingChecklistPage && <Sidebar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
