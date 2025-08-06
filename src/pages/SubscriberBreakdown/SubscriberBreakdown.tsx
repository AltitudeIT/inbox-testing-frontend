import React, { useState } from "react";
import styles from "./SubscriberBreakdown.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import SubscriberBreakdown from "../../components/SubscriberBreakdown/SubscriberBreakdown";
import UploadSubscriberModal from "../../components/SubscriberBreakdown/UploadSubscriberModal/UploadSubscriberModal";

const SubscriberBreakdownPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.rootDiv}>
      <div className={styles.headerSection}>
        <PageTitle title="Subscriber Breakdown" />
        <button className={styles.buttonTop} onClick={handleOpenModal}>
          Upload subscriber list
        </button>
      </div>
      <SubscriberBreakdown />
      <UploadSubscriberModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default SubscriberBreakdownPage;
