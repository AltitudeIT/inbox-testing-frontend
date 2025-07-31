import React from "react";
import styles from "./PageTitle.module.css";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className={styles.rootDiv}>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default PageTitle;
