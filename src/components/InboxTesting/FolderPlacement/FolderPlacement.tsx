import { Box, Typography } from "@mui/material";
import styles from "./FolderPlacement.module.css";
import type { FolderType } from "../../../models/InboxTestingModels";

interface FolderPlacementProps {
  data: FolderType;
}

const FolderPlacement = ({ data }: FolderPlacementProps) => {
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
          <Typography className={styles.text}>{data.gmail} </Typography>
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
          <Typography className={styles.text}>{data.outlook} </Typography>
        </Box>
        <img src="/InboxTesting/info.png" className={styles.infoIcon} />
      </Box>
    </Box>
  );
};

export default FolderPlacement;
