import styles from "./Feature.module.css";

const Feature = () => {
  return (
    <>
      <div className={styles.rootDiv}>
        <div className={styles.featureImg}>
          <img src="/Dashboard/lightbulb.png" />
        </div>
        <p className={styles.title}>Feature Request</p>
        <p className={styles.subtitle}>Request a function</p>
        <p className={styles.text}>
          Use the form to request a function within one minute. <br />
          If we implement it, we will inform you.
        </p>
        <button type="submit" className={styles.featureButton}>
          Request feature
        </button>
      </div>
    </>
  );
};

export default Feature;
