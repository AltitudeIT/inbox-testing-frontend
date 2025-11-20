import { Box } from "@mui/material";
import styles from "./IntegrationsPage.module.css";
import Integration from "../../../components/Integration/Integration";

const IntegrationsPage = () => {
  return (
    <Box className={styles.rootBox}>
      <Integration />
    </Box>
  );
};
export default IntegrationsPage;
