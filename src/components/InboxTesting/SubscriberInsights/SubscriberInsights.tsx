import { Box, Typography } from "@mui/material";
import styles from "./SubscriberInsights.module.css";

const SubscriberInsights = () => {
  return (
    <Box className={styles.rootBox}>
      <Box className={styles.countBox}>
        <Box className={styles.imageBox}>
          <img src="/InboxTesting/SubscriberInsights/mail-icon.png" />
        </Box>
        <Box className={styles.contentBox}>
          <Typography className={styles.inboxText}> Inbox Count</Typography>
          <Typography className={styles.countText}>21886 </Typography>
          <Typography className={styles.percentageText}>97,45% </Typography>
        </Box>
      </Box>
      <Box className={styles.countBox}>
        <img
          src="/InboxTesting/SubscriberInsights/bulk-count.png"
          className={styles.bulkImage}
        />
        <Box className={styles.contentBox}>
          <Typography className={styles.inboxText}> Bulk Count</Typography>
          <Typography className={styles.countText}>569 </Typography>
          <Typography className={styles.percentageText}>2,53% </Typography>
        </Box>
      </Box>
      <Box className={styles.countBox}>
        <Box className={styles.imageBox}>
          <img src="/InboxTesting/SubscriberInsights/warning-icon.png" />
        </Box>
        <Box className={styles.contentBox}>
          <Typography className={styles.inboxText}> Inbox Count</Typography>
          <Typography className={styles.countText}>4 </Typography>
          <Typography className={styles.percentageText}>0,02% </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriberInsights;
