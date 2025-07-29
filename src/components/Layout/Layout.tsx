import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

const LayoutLogin = () => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <span className={styles.leftText}>
          <h1>
            Truly caring <br /> about your <br />
            <span className={styles.textDecoration}>
              digital <br /> relationship
            </span>
          </h1>
        </span>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutLogin;
