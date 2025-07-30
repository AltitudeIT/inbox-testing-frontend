import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { NavLink, useLocation } from "react-router";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

const Sidebar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  function getCurrentPageFromPath(pathname: string): string {
    if (pathname.includes("/dashboard")) return "dashboard";
    if (pathname.includes("/inbox-testing")) return "inbox-testing";
    if (pathname.includes("/test-group")) return "test-group";
    if (pathname.includes("/subscriber-breakdown"))
      return "subscriber-breakdown";
    return "";
  }

  useEffect(() => {
    const currentPage = getCurrentPageFromPath(location.pathname);
    setSelectedMenuItem(currentPage);
  }, [location.pathname]);

  const handleOnMenuItemPress = (clickedItem: string) => {
    setSelectedMenuItem(clickedItem);
    if (clickedItem === "logout") {
      handleLogout();
    }
  };

  const getMenuItemClassName = (itemName: string) => {
    const isSelected = selectedMenuItem === itemName;
    return `${styles.optionWrapper} ${isSelected ? styles.selected : ""} `;
  };

  const getLinkDestination = (itemName: string) => {
    switch (itemName) {
      case "inbox-testing":
        return `inbox-testing`;
      case "test-group":
        return `test-group`;
      case "subscriber-breakdown":
        return `subscriber-breakdown`;

      default:
        return itemName;
    }
  };

  const currentUser = {
    name: "Mailody",
    email: "thomas@mailody.de",
    avatar: "",
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {};

  return (
    <aside className={styles.rootDiv}>
      <nav className={styles.nav}>
        <div>
          <img src="test" />
        </div>
        <div className={styles.logo} />
        <ul className={styles.ul}>
          <NavLink
            to="dashboard"
            className={getMenuItemClassName("dashboard")}
            onClick={() => handleOnMenuItemPress("dashboard")}
          >
            <img
              className={styles.optionIcon}
              src={
                selectedMenuItem === "dashboard"
                  ? "/Dashboard/menu.png"
                  : "/Dashboard/menu_white.png"
              }
            />
            <p className={styles.optionText}>Dashboard</p>
          </NavLink>

          <NavLink
            to={getLinkDestination("inbox-testing")}
            className={getMenuItemClassName("inbox-testing")}
            onClick={() => handleOnMenuItemPress("inbox-testing")}
          >
            <img
              className={styles.optionIcon}
              src={
                selectedMenuItem === "inbox-testing"
                  ? "/Dashboard/letter.png"
                  : "/Dashboard/letter_white.png"
              }
            />
            <p className={styles.optionText}>InboxTesting</p>
          </NavLink>

          <NavLink
            to={getLinkDestination("test-group")}
            className={getMenuItemClassName("test-group")}
            onClick={() => handleOnMenuItemPress("test-group")}
          >
            <img
              className={styles.optionIcon}
              src={
                selectedMenuItem === "test-group"
                  ? "/Dashboard/connect.png"
                  : "/Dashboard/connect_white.png"
              }
            />
            <p className={styles.optionText}>Testgroup</p>
          </NavLink>

          <NavLink
            to={getLinkDestination("subscriber-breakdown")}
            className={getMenuItemClassName("subscriber-breakdown")}
            onClick={() => handleOnMenuItemPress("subscriber-breakdown")}
          >
            <img
              className={styles.optionIcon}
              src={
                selectedMenuItem === "subscriber-breakdown"
                  ? "/Dashboard/notification.png"
                  : "/Dashboard/notification_white.png"
              }
            />
            <p className={styles.optionText}>
              Subscriber <br />
              Breakdown
            </p>
          </NavLink>
        </ul>

        <div className={styles.profileWrapper}>
          <div
            className={`${styles.profileOption} ${
              selectedMenuItem === "profile" ? styles.selected : ""
            }`}
            onClick={toggleMenu}
          >
            <img
              className={styles.avatar}
              src={currentUser.avatar || "/default-avatar.png"}
            />
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>{currentUser.name}</p>
              <p className={styles.profileEmail}>{currentUser.email}</p>
            </div>
            <UnfoldMoreIcon
              className={styles.dropdownIcon}
              sx={{
                color: "white",
                transition: "color 0.2s ease",
                fontWeight: "100",
              }}
            />
          </div>

          {isMenuOpen && (
            <div className={styles.profileMenu}>
              <div className={styles.profileHeader}>
                <img src="/default-avatar.png" alt="Logout" />
                <div className={styles.profileHeaderInfo}>
                  <p className={styles.profileHeaderName}>{currentUser.name}</p>
                  <p className={styles.profileHeaderEmail}>
                    {currentUser.email}
                  </p>
                </div>
              </div>
              <hr />
              <NavLink
                to={getLinkDestination("profile")}
                className={styles.profileMenuItem}
                onClick={() => handleOnMenuItemPress("profile")}
              >
                <img src="/personal-icon.jpg" />
                <span>Personal</span>
              </NavLink>

              <NavLink
                to={getLinkDestination("settings")}
                className={styles.profileMenuItem}
                onClick={() => handleOnMenuItemPress("settings")}
              >
                <img src="/Dashboard/settings.png" />
                <span>Organisation</span>
              </NavLink>

              <NavLink
                to={getLinkDestination("settings")}
                className={styles.profileMenuItem}
                onClick={() => handleOnMenuItemPress("settings")}
              >
                <img src="/Dashboard/settings.png" />
                <span>Integrations</span>
              </NavLink>

              <NavLink
                to={getLinkDestination("settings")}
                className={styles.profileMenuItem}
                onClick={() => handleOnMenuItemPress("settings")}
              >
                <img src="/Dashboard/settings.png" />
                <span>Billing</span>
              </NavLink>
              <hr />

              <div
                className={styles.profileMenuItem}
                onClick={() => handleOnMenuItemPress("logout")}
              >
                <img src="/logout.png" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
