import React from "react";
import styles from "./SubscriberBreakdown.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";

const SubscriberBreakdown: React.FC = () => {
  return (
    <div className={styles.rootDiv}>
      <PageTitle title="Subscriber Breakdown" />
    </div>
  );
};

export default SubscriberBreakdown;
