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
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "845px",
          height: "498px",
          maxWidth: "none",
          maxHeight: "none",
          borderRadius: "18px",
          padding: "30px 46px 24px 26px",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "25px",
          color: "#050e21",
          fontFamily:
            '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
        }}
      >
        Upload Subscriber List
      </DialogTitle>

      <DialogContent>
        <Typography
          sx={{
            fontWeight: "400",
            color: "#050e21",
            fontSize: "20px",
            fontFamily:
              '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
            marginTop: "-4px",
          }}
        >
          Here you can see an example of how the csv file must be formatted.
        </Typography>

        <Typography
          sx={{
            fontFamily:
              '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
            fontWeight: "400",
            fontSize: "20px",
            color: "#050e21",
            textDecoration: "underline",
            marginTop: "6px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Example
        </Typography>

        <Box sx={{ marginTop: "10px" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#050E21",
              fontFamily:
                '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
            }}
          >
            List name
          </Typography>
          <TextField
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            sx={{
              marginBottom: "16px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#050E21",
                },
                width: "454px",
                height: "44px",
              },
            }}
          />
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{
              fontSize: "15px",
              fontWeight: "300",
              color: "#050E21",
              fontFamily:
                '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
            }}
          >
            Upload Content: You can upload csv file
          </Typography>

          <input
            accept=".csv"
            style={{ display: "none" }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              sx={{
                color: "#FFFFFF",
                width: "226px",
                height: "47px",
                borderRadius: "50px",
                background: "#050E21",
                fontWeight: 700,
                fontSize: "15px",
                fontFamily:
                  '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
                textDecoration: "uppercase",
                marginTop: "18px",
              }}
            >
              Upload file
            </Button>
          </label>
        </Box>
      </DialogContent>

      <Divider sx={{ margin: "0px 10px 20px 26px" }} />

      <DialogActions>
        <Button
          onClick={handleCancel}
          variant="outlined"
          sx={{
            color: "#050E21",
            width: "154px",
            height: "47px",
            borderRadius: "50px",
            borderColor: "#050E21",
            fontWeight: 700,
            fontSize: "15px",
            fontFamily:
              '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
            "&:hover": {
              borderColor: "#050E21",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            color: "#FFFFFF",
            width: "185px",
            height: "47px",
            borderRadius: "50px",
            backgroundColor: "#050E21",
            fontWeight: 700,
            fontSize: "15px",
            fontFamily:
              '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
          }}
        >
          Generate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadSubscriberModal;
