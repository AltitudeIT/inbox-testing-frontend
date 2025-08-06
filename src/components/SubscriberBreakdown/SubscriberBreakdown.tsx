import styles from "./SubscriberBreakdown.module.css";
import SubscriberBreakdownList from "./SubscriberBreakdownList/SubscriberBreakdownList";

const SubscriberBreakdown = () => {
  return (
    <>
      <div className={styles.rootDiv}>
        <SubscriberBreakdownList />
      </div>
      <div className={styles.titleDiv}>
        <p className={styles.title}>Details</p>
        <p className={styles.subtitle}>
          Please select a upload to see more details.
        </p>
      </div>
    </>
  );
};

export default SubscriberBreakdown;
