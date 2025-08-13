import React from "react";
import styles from "./InboxTesting.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import InboxTesting from "../../components/InboxTesting/InboxTesting";

const InboxTestingPage: React.FC = () => {
  return (
    <div className={styles.rootDiv}>
      <PageTitle title="InboxTesting" />
      <InboxTesting />
    </div>
  );
};

export default InboxTestingPage;
