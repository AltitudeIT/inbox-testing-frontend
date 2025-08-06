import { Outlet } from "react-router";
import Sidebar from "../../Sidebar/Sidebar";
import styles from "./LayoutDashboard.module.css";

const LayoutDashboard = () => {
  return (
    <div className={styles.rootDiv}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutDashboard;
