import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

const LayoutLogin = () => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <div className={styles.leftTextContainer}>
          <img src="/logo.png" />
          <p>
            Truly caring <br /> about your <br />
            <span className={styles.textDecoration}>
              digital <br /> relationship
            </span>
          </p>
        </div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutLogin;
