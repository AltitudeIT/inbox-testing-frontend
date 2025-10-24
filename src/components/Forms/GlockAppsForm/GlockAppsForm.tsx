import { Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { AddGlockApps } from "../../../services/User/UserService";
import type { GlockAppsRequest } from "../../../models/UserModels";
import styles from "./GlockAppsForm.module.css";

const GlockAppsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<GlockAppsRequest>({
    apiKey: "",
    projectId: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof GlockAppsRequest) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "projectId" ? Number(event.target.value) : event.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await AddGlockApps(formData);
      toast.success("GlockApps integration added successfully!");
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
      <Typography className={styles.title}>GlockApps Integration</Typography>

      <Box className={styles.formCard}>
        <Box className={styles.leftSection}>
          <Box className={styles.iconContainer}>
            <img
              className={styles.integrationIcon}
              src="/gmail-icon.png"
              alt="GlockApps"
            />
          </Box>

          <Typography className={styles.integrationName}>GlockApps</Typography>

          <Typography className={styles.description}>
            Connect your GlockApps account to enable inbox testing integration.
          </Typography>
        </Box>

        <Box className={styles.rightSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Box className={styles.inputGroup}>
              <Typography className={styles.label}>API Key</Typography>
              <TextField
                fullWidth
                placeholder="Enter your GlockApps API Key"
                value={formData.apiKey}
                onChange={handleChange("apiKey")}
                required
                className={styles.input}
                variant="outlined"
              />
            </Box>

            <Box className={styles.inputGroup}>
              <Typography className={styles.label}>Project ID</Typography>
              <TextField
                fullWidth
                type="number"
                placeholder="Enter your GlockApps Project ID"
                value={formData.projectId || ""}
                onChange={handleChange("projectId")}
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

export default GlockAppsForm;
