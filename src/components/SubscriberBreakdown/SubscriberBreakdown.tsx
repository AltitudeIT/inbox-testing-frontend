import { useState } from "react";
import styles from "./SubscriberBreakdown.module.css";
import SubscriberBreakdownList from "./SubscriberBreakdownList/SubscriberBreakdownList";
import SubscriberDetails from "./SubscriberDetails/SubscriberDetails";
import { Divider } from "@mui/material";

interface SubscriberResponse {
  id: number;
  name: string;
  date: string;
  totalSubscribers: string;
}

const SubscriberBreakdown = () => {
  const [selectedSubscriber, setSelectedSubscriber] =
    useState<SubscriberResponse | null>(null);

  const handleSubscriberSelect = (subscriber: SubscriberResponse) => {
    setSelectedSubscriber((prev) =>
      prev?.id === subscriber.id ? null : subscriber
    );
  };

  const handleCloseDetails = () => {
    setSelectedSubscriber(null);
  };

  return (
    <>
      <div className={styles.rootDiv}>
        <SubscriberBreakdownList
          onSubscriberSelect={handleSubscriberSelect}
          selectedSubscriberId={selectedSubscriber?.id || null}
        />
      </div>
      <Divider className={styles.divider} />
      <div className={styles.titleDiv}>
        <p className={styles.title}>Details</p>
        <p className={styles.subtitle}>
          Please select a upload to see more details.
        </p>
        {selectedSubscriber && (
          <SubscriberDetails
            subscriber={selectedSubscriber}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </>
  );
};

export default SubscriberBreakdown;
