import { Box } from "@mui/material";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import styles from "./ProfileDetailsPage.module.css";

const ProfileDetailsPage = () => {
  return (
    <Box className={styles.rootBox}>
      <ProfileDetails />
    </Box>
  );
};
export default ProfileDetailsPage;
