import { Box, Typography } from "@mui/material";
import styles from "./SubscriberInsights.module.css";
import type { SubscriberInsight } from "../../../models/InboxTestingModels";

interface SubscriberInsightsProps {
  data: SubscriberInsight;
}

const SubscriberInsights = ({ data }: SubscriberInsightsProps) => {
  return (
    <Box className={styles.rootBox}>
      <Box className={styles.countBox}>
        <Box className={styles.imageBox}>
          <img src="/InboxTesting/SubscriberInsights/mail-icon.png" />
        </Box>
        <Box className={styles.contentBox}>
          <Typography className={styles.inboxText}> Inbox </Typography>
          <Typography className={styles.countText}>
            {data.inbox_count}
          </Typography>
          <Typography className={styles.percentageText}>
            {data.inbox_percentage.toFixed(2)}%
          </Typography>
        </Box>
      </Box>
      <Box className={styles.countBox}>
        <img
          src="/InboxTesting/SubscriberInsights/bulk-count.png"
          className={styles.bulkImage}
        />
        <Box className={styles.contentBox}>
          <Typography className={styles.inboxText}> Spam</Typography>
          <Typography className={styles.countText}>
            {data.spam_count}{" "}
          </Typography>
          <Typography className={styles.percentageText}>
            {data.spam_percentage.toFixed(2)}%{" "}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.countBox}>
        <Box className={styles.imageBox}>
          <img src="/InboxTesting/SubscriberInsights/warning-icon.png" />
        </Box>
        <Box className={styles.contentBox}>
          <Typography className={styles.inboxText}> Missing</Typography>
          <Typography className={styles.countText}>
            {data.blocked_count}{" "}
          </Typography>
          <Typography className={styles.percentageText}>
            {data.blocked_percentage.toFixed(2)}%{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriberInsights;
