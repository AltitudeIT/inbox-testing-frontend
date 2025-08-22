import { Box, Typography } from "@mui/material";
import InboxTestingDetails from "../../../components/InboxTesting/InboxTestingDetails/InboxTestingDetails";
import styles from "./InboxTestingDetailsPage.module.css";
import { useNavigate } from "react-router";

const InboxTestingDetailsPage = () => {
  const navigate = useNavigate();

  const handleInboxClick = () => {
    navigate("/inbox-testing", { replace: true });
  };

  return (
    <Box className={styles.rootBox}>
      <Box className={styles.box}>
        <Typography
          className={styles.navTextClickable}
          onClick={handleInboxClick}
        >
          InboxTesting
        </Typography>
        <Typography className={styles.arrow}>&#8250;</Typography>
        <Typography className={styles.navText}>Detailed Report</Typography>
      </Box>

      <InboxTestingDetails />
    </Box>
  );
};
export default InboxTestingDetailsPage;
