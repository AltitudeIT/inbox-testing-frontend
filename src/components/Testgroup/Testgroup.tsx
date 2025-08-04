import styles from "./Testgroup.module.css";

const Testgroup = () => {
  return (
    <div className={styles.rootDiv}>
      <p className={styles.text}>
        To check if your emails are getting delivered, add the email addresses
        from this export to your campaigns <br />
        This helps you see if your emails are reaching people's inboxes
        effectively.
      </p>
      <button type="submit" className={styles.csvButton}>
        Download as csv
      </button>
    </div>
  );
};

export default Testgroup;
