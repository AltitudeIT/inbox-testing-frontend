import React from "react";
import styles from "./InboxTesting.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";

const InboxTestingPage: React.FC = () => {
  return (
    <div className={styles.rootDiv}>
      <PageTitle title="InboxTesting" />
    </div>
  );
};

export default InboxTestingPage;
