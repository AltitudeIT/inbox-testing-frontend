import React from "react";
import styles from "./DashboardPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import Dashboard from "../../components/Dashboard/Dashboard";

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.rootDiv}>
      <PageTitle title="Dashboard" />
      {/* <Feature /> */}
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
