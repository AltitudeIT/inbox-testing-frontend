import styles from "./ProfileSidebar.module.css";
import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router";

const ProfileSidebar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const location = useLocation();

  function getCurrentPageFromPath(pathname: string): string {
    if (pathname.includes("/profile")) return "profile";
    if (pathname.includes("/organisation")) return "organisation";
    if (pathname.includes("/integrations")) return "integrations";
    if (pathname.includes("/billing")) return "billing";
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
      case "organisation":
        return `organisation`;
      case "integrations":
        return `integrations`;
      case "billing":
        return `billing`;
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
            to="profile"
            className={getMenuItemClassName("profile")}
            onClick={() => handleOnMenuItemPress("profile")}
          >
            <p className={styles.optionText}>Personal</p>
          </NavLink>

          <NavLink
            to={getLinkDestination("organisation")}
            className={getMenuItemClassName("organisation")}
            onClick={() => handleOnMenuItemPress("organisation")}
          >
            <p className={styles.optionText}>Organisation</p>
          </NavLink>

          <NavLink
            to={getLinkDestination("integrations")}
            className={getMenuItemClassName("integrations")}
            onClick={() => handleOnMenuItemPress("integrations")}
          >
            <p className={styles.optionText}>Integrations</p>
          </NavLink>

          <NavLink
            to={getLinkDestination("billing")}
            className={getMenuItemClassName("billing")}
            onClick={() => handleOnMenuItemPress("billing")}
          >
            <p className={styles.optionText}>Billing</p>
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
