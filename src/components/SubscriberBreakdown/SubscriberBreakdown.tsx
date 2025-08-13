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
      <Divider
        sx={{
          margin: "0px 60px 0px 0px",
          borderColor: "#707070",
          opacity: "0.4",
          width: 1400,
        }}
      />
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
