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
  CircularProgress,
} from "@mui/material";
import styles from "./UploadSubscriberModal.module.css";
import { toast } from "react-toastify";
import { uploadSubscriberList } from "../../../services/SubscriberList/SubscriberList";
import { isAxiosError } from "axios";

interface UploadSubscriberModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const UploadSubscriberModal: React.FC<UploadSubscriberModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [listName, setListName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("name", listName);
      if (file) formData.append("file", file);

      const response = await uploadSubscriberList(formData);

      toast.success(
        `Successfully uploaded ${response.data.total_count} subscribers to "${listName}"`
      );

      setListName("");
      setFile(null);
      onSuccess?.();
      onClose();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to upload subscriber list");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setListName("");
    setFile(null);
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
            <Button component="span" className={styles.uploadButton}>
              {file ? file.name : "Upload file"}
            </Button>
          </label>
        </Box>
      </DialogContent>

      <Divider className={styles.divider} />

      <DialogActions>
        <Button
          onClick={handleCancel}
          variant="outlined"
          className={styles.cancelButton}
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className={styles.submitButton}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <CircularProgress size={16} sx={{ mr: 1 }} />
              Uploading...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadSubscriberModal;
