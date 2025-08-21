import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import styles from "./UploadSubscriberModal.module.css";

interface UploadSubscriberModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (listName: string, file: File | null) => void;
}

const UploadSubscriberModal: React.FC<UploadSubscriberModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [listName, setListName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    setListName("");
    setSelectedFile(null);
    onClose();
  };

  const handleCancel = () => {
    setListName("");
    setSelectedFile(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className={styles.customDialog}>
      <DialogTitle className={styles.dialogTitle}>
        Upload Subscriber List
      </DialogTitle>

      <DialogContent>
        <Typography className={styles.dialogSubtitle}>
          Here you can see an example of how the csv file must be formatted.
        </Typography>

        <Typography className={styles.textLink}>Example</Typography>

        <Box className={styles.box}>
          <Typography className={styles.inputLabel}>List name</Typography>
          <TextField
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className={styles.input}
          />
        </Box>

        <Box>
          <Typography variant="body2" className={styles.instructionText}>
            Upload Content: You can upload csv file
          </Typography>

          <input
            accept=".csv"
            className={styles.hiddenFileInput}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button className={styles.uploadButton}>Upload file</Button>
          </label>
        </Box>
      </DialogContent>

      <Divider className={styles.divider} />

      <DialogActions>
        <Button
          onClick={handleCancel}
          variant="outlined"
          className={styles.cancelButton}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} className={styles.submitButton}>
          Generate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadSubscriberModal;
