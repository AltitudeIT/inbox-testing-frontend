import { Box } from "@mui/material";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ inbox, spam, blocked }: any) => {
  const segments = [];

  if (inbox > 0) {
    segments.push({
      type: "inbox",
      value: inbox,
      className: styles.inboxSegment,
    });
  }
  if (spam > 0) {
    segments.push({ type: "spam", value: spam, className: styles.spamSegment });
  }
  if (blocked > 0) {
    segments.push({
      type: "blocked",
      value: blocked,
      className: styles.blockedSegment,
    });
  }

  return (
    <Box className={styles.progressBarContainer}>
      {segments.map((segment, index) => {
        const isFirst = index === 0;
        const isLast = index === segments.length - 1;
        const isOnly = segments.length === 1;

        let borderRadius = "";
        if (isOnly) {
          borderRadius = "15px";
        } else if (isFirst) {
          borderRadius = "15px 0 0 15px";
        } else if (isLast) {
          borderRadius = "0 15px 15px 0";
        }

        return (
          <Box
            key={segment.type}
            className={segment.className}
            sx={{
              width: `${segment.value}%`,
              borderRadius: borderRadius,
            }}
          />
        );
      })}
    </Box>
  );
};

export default ProgressBar;
