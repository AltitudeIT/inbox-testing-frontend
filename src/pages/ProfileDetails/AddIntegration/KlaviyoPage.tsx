import { Box } from "@mui/material";
import styles from "./AddIntegrationPage.module.css";
import KlaviyoForm from "../../../components/Forms/KlaviyoForm/KlaviyoForm";

const KlaviyoPage = () => {
  return (
    <Box className={styles.rootBox}>
      <KlaviyoForm />
    </Box>
  );
};

export default KlaviyoPage;
