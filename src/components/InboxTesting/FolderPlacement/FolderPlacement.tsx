import { Box, Typography } from "@mui/material";
import styles from "./FolderPlacement.module.css";

const FolderPlacement = () => {
  return (
    <Box className={styles.rootBox}>
      <Box className={styles.folderPlacementBox}>
        <Box className={styles.imageBox}>
          <img src="/InboxTesting/FolderPlacement/folder-icon.png" />
        </Box>
        <Box className={styles.contentBox}>
          <Typography className={styles.placementText}>
            Gmail Folder Placement
          </Typography>
          <Typography className={styles.text}>Promotions </Typography>
        </Box>
        <img src="/InboxTesting/info.png" className={styles.infoIcon} />
      </Box>
      <Box className={styles.folderPlacementBox}>
        <Box className={styles.imageBox}>
          <img src="/InboxTesting/FolderPlacement/folder-icon.png" />
        </Box>
        <Box className={styles.contentBox}>
          <Typography className={styles.placementText}>
            Outlook Folder Placement
          </Typography>
          <Typography className={styles.text}>Other </Typography>
        </Box>
        <img src="/InboxTesting/info.png" className={styles.infoIcon} />
      </Box>
    </Box>
  );
};

export default FolderPlacement;
