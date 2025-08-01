import React from "react";
import styles from "./TestgroupPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";

const TestgroupPage: React.FC = () => {
  return (
    <div className={styles.rootDiv}>
      <PageTitle title="Testgroup" />
    </div>
  );
};

export default TestgroupPage;
