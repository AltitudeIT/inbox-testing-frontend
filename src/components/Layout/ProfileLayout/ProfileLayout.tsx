import { Outlet } from "react-router";
import styles from "./ProfileLayout.module.css";
import ProfileSidebar from "../../ProfileSidebar/ProfileSidebar";

const ProfileLayout = () => {
  return (
    <div className={styles.rootDiv}>
      <ProfileSidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
