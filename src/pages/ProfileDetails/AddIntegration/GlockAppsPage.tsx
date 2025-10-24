import { Box } from "@mui/material";
import styles from "./AddIntegrationPage.module.css";
import GlockAppsForm from "../../../components/Forms/GlockAppsForm/GlockAppsForm";

const GlockAppsPage = () => {
  return (
    <Box className={styles.rootBox}>
      <GlockAppsForm />
    </Box>
  );
};

export default GlockAppsPage;
