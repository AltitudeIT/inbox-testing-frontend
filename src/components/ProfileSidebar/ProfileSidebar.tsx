import styles from "./ProfileSidebar.module.css";
import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router";

const ProfileSidebar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const location = useLocation();

  function getCurrentPageFromPath(pathname: string): string {
    if (pathname.includes("/integrations")) return "integrations";
    if (pathname.includes("/domain-ip")) return "domain-ip";
    return "";
  }

  useEffect(() => {
    const currentPage = getCurrentPageFromPath(location.pathname);
    setSelectedMenuItem(currentPage);
  }, [location.pathname]);

  const handleOnMenuItemPress = (clickedItem: string) => {
    setSelectedMenuItem(clickedItem);
  };

  const getMenuItemClassName = (itemName: string) => {
    const isSelected = selectedMenuItem === itemName;
    return `${styles.optionWrapper} ${isSelected ? styles.selected : ""} `;
  };

  const getLinkDestination = (itemName: string) => {
    switch (itemName) {
      case "integrations":
        return `integrations`;
      case "domain-ip":
        return `domain-ip`;

      default:
        return itemName;
    }
  };

  return (
    <aside className={styles.rootDiv}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <NavLink
            to={getLinkDestination("integrations")}
            className={getMenuItemClassName("integrations")}
            onClick={() => handleOnMenuItemPress("integrations")}
          >
            <p className={styles.optionText}>Integrations</p>
          </NavLink>

          <NavLink
            to={getLinkDestination("domain-ip")}
            className={getMenuItemClassName("domain-ip")}
            onClick={() => handleOnMenuItemPress("domain-ip")}
          >
            <p className={styles.optionText}>Domain & IP</p>
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
