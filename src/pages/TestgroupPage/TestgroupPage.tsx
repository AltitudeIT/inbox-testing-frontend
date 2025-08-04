import React from "react";
import styles from "./TestgroupPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import Testgroup from "../../components/Testgroup/Testgroup";

const TestgroupPage: React.FC = () => {
  return (
    <div className={styles.rootDiv}>
      <PageTitle title="Testgroup" />
      <Testgroup />
    </div>
  );
};

export default TestgroupPage;
