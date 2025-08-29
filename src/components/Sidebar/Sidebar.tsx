import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { NavLink, useLocation } from "react-router";

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

    if (
      pathname.includes("/profile") ||
      pathname.includes("/integrations") ||
      pathname.includes("/domain-ip") ||
      pathname.includes("/add-integration")
    ) {
      return "profile";
    }

    return "";
  }

  useEffect(() => {
    const currentPage = getCurrentPageFromPath(location.pathname);
    setSelectedMenuItem(currentPage);
  }, [location.pathname]);

  const handleOnMenuItemPress = (clickedItem: string) => {
    setSelectedMenuItem(clickedItem);
    setIsMenuOpen(false);
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
        return "inbox-testing";
      case "test-group":
        return "test-group";
      case "subscriber-breakdown":
        return "subscriber-breakdown";
      case "profile":
        return "profile";
      case "integrations":
        return "integrations";
      case "domain-ip":
        return "domain-ip";
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
        <div className={styles.logoSidebar}>
          <img src="/logo.png" />
        </div>
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
                  ? "/dashboard-logo-dark.png"
                  : "/dashboard-logo.png"
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
                  ? "/inbox-testing-logo-dark.png"
                  : "/inbox-testing-logo.png"
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
              className={`${styles.optionIcon}  ${styles.optionIconLarge1}`}
              src={
                selectedMenuItem === "test-group"
                  ? "/testgroup-logo-dark.png"
                  : "/testgroup-logo.png"
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
              className={`${styles.optionIcon}  ${styles.optionIconLarge2}`}
              src={
                selectedMenuItem === "subscriber-breakdown"
                  ? "/subscriber-breakdown-logo-dark.png"
                  : "/subscriber-breakdown-logo.png"
              }
            />
            <div className={styles.divP}>
              <p className={styles.optionText}>
                Subscriber <br />
                Breakdown
              </p>
            </div>
          </NavLink>
        </ul>

        <hr className={styles.hrSidebar} />
        <div className={styles.profileWrapper}>
          <div
            className={`${styles.profileOption} ${
              selectedMenuItem === "profile" ? styles.selected : ""
            }`}
            onClick={toggleMenu}
          >
            <img
              className={styles.avatar}
              src={
                selectedMenuItem === "profile"
                  ? "/default-avatar-dark.png"
                  : currentUser.avatar || "/default-avatar.png"
              }
            />
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>{currentUser.name}</p>
              <p className={styles.profileEmail}>{currentUser.email}</p>
            </div>

            <img
              src={
                selectedMenuItem === "profile"
                  ? "/arrows-logo-dark.png"
                  : "/arrows-logo.png"
              }
            />
          </div>

          {isMenuOpen && (
            <div className={styles.profileMenu}>
              <div className={styles.profileHeader}>
                <div className={styles.profileHeaderImage}>
                  <img src="/profilemenu-logo.png" />
                </div>
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
                <img src="/personal-logo.png" />
                <span>Personal</span>
              </NavLink>

              <NavLink
                to={getLinkDestination("organisation")}
                className={styles.profileMenuItem}
                onClick={() => handleOnMenuItemPress("organisation")}
              >
                <img src="/organisation-logo.png" />
                <span>Organisation</span>
              </NavLink>

              <NavLink
                to={getLinkDestination("integrations")}
                className={styles.profileMenuItem}
                onClick={() => handleOnMenuItemPress("integrations")}
              >
                <img src="/integration-logo.png" />
                <span>Integrations</span>
              </NavLink>

              <NavLink
                to={getLinkDestination("billing")}
                className={styles.profileMenuItem}
                onClick={() => handleOnMenuItemPress("billing")}
              >
                <img src="/billing-logo.png" />
                <span>Billing</span>
              </NavLink>
              <hr />

              <div
                className={styles.profileMenuItem}
                onClick={() => handleOnMenuItemPress("logout")}
              >
                <img src="/logout-logo.png" />
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
