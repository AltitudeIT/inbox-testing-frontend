import { Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { AddKlaviyo } from "../../../services/User/UserService";
import type { KlaviyoRequest } from "../../../models/UserModels";
import styles from "./KlaviyoForm.module.css";

const KlaviyoForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<KlaviyoRequest>({
    apiKey: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await AddKlaviyo(formData);
      toast.success("Klaviyo integration added successfully!");
      navigate("/integrations");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/add-integration");
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>Klaviyo Integration</Typography>

      <Box className={styles.formCard}>
        <Box className={styles.leftSection}>
          <Box className={styles.iconContainer}>
            <img
              className={styles.integrationIcon}
              src="/klaviyo-icon.png"
              alt="Klaviyo"
            />
          </Box>

          <Typography className={styles.integrationName}>Klaviyo</Typography>

          <Typography className={styles.description}>
            Connect your Klaviyo account to enable email marketing integration.
          </Typography>
        </Box>

        <Box className={styles.rightSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Box className={styles.inputGroup}>
              <Typography className={styles.label}>API Key</Typography>
              <TextField
                fullWidth
                placeholder="Enter your Klaviyo API Key"
                value={formData.apiKey}
                onChange={(e) => setFormData({ apiKey: e.target.value })}
                required
                className={styles.input}
                variant="outlined"
              />
            </Box>

            <Box className={styles.buttonGroup}>
              <Button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "SAVING..." : "SAVE INTEGRATION"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default KlaviyoForm;
