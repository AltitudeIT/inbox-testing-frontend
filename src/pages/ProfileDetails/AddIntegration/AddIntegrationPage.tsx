import { Box } from "@mui/material";
import styles from "./AddIntegrationPage.module.css";
import AddIntegrationForm from "../../../components/Forms/AddIntegrationForm/AddIntegrationForm";

const AddIntegrationPage = () => {
  return (
    <Box className={styles.rootBox}>
      <AddIntegrationForm />
    </Box>
  );
};
export default AddIntegrationPage;
