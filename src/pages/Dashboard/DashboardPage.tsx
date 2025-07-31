import React from "react";
import styles from "./DashboardPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.rootDiv}>
      <PageTitle title="Dashboard" />
    </div>
  );
};

export default DashboardPage;
