import { Box } from "@mui/material";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ inbox, spam, blocked }: any) => {
  const inboxWidth = (inbox / 100) * 100;
  const spamWidth = (spam / 100) * 100;
  const blockedWidth = (blocked / 100) * 100;

  return (
    <Box className={styles.progressBarContainer}>
      <Box className={styles.inboxSegment} sx={{ width: `${inboxWidth}%` }} />
      <Box className={styles.spamSegment} sx={{ width: `${spamWidth}%` }} />
      <Box
        className={styles.blockedSegment}
        sx={{ width: `${blockedWidth}%` }}
      />
    </Box>
  );
};

export default ProgressBar;
