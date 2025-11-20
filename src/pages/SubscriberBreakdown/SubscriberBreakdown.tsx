import React, { useState, useRef } from "react";
import styles from "./SubscriberBreakdown.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import SubscriberBreakdown from "../../components/SubscriberBreakdown/SubscriberBreakdown";
import UploadSubscriberModal from "../../components/SubscriberBreakdown/UploadSubscriberModal/UploadSubscriberModal";

const SubscriberBreakdownPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const subscriberBreakdownRef = useRef<{ refreshList: () => void }>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUploadSuccess = () => {
    subscriberBreakdownRef.current?.refreshList();
  };

  return (
    <div className={styles.rootDiv}>
      <div className={styles.headerSection}>
        <PageTitle title="Subscriber Breakdown" />
        <button className={styles.buttonTop} onClick={handleOpenModal}>
          Upload subscriber list
        </button>
      </div>
      <SubscriberBreakdown ref={subscriberBreakdownRef} />
      <UploadSubscriberModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default SubscriberBreakdownPage;
