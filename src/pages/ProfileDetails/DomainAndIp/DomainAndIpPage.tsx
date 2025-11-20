import { Box } from "@mui/material";
import styles from "./DomainAndIpPage.module.css";
import DomainAndIp from "../../../components/DomainAndIp/DomainAndIp";

const DomainAndIpPage = () => {
  return (
    <Box className={styles.rootBox}>
      <DomainAndIp />
    </Box>
  );
};

export default DomainAndIpPage;
