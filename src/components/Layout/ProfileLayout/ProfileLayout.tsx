import { Outlet } from "react-router";
import { Box } from "@mui/material";
import styles from "./ProfileLayout.module.css";
import ProfileSidebar from "../../ProfileSidebar/ProfileSidebar";
import PageTitle from "../../PageTitle/PageTitle";

const ProfileLayout = () => {
  return (
    <Box>
      <Box className={styles.titleBox}>
        <PageTitle title="Account" />
      </Box>
      <Box className={styles.rootDiv}>
        <ProfileSidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </Box>
    </Box>
  );
};

export default ProfileLayout;
