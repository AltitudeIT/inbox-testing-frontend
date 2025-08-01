import React from "react";
import styles from "./DashboardPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import Feature from "../../components/Feature/Feature";

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.rootDiv}>
      <PageTitle title="Dashboard" />
      <Feature />
    </div>
  );
};

export default DashboardPage;
