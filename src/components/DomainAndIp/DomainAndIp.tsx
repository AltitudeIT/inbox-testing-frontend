import { Box, Divider, Switch, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./DomainAndIp.module.css";

const DomainAndIp = () => {
  const [allChecked, setAllChecked] = useState(true);
  const [ispStates, setIspStates] = useState<{ [key: string]: boolean }>({
    Gmail: true,
    AOL: true,
    Yahoo: true,
    Outlook: true,
    iCloud: true,
    "gmx.de": true,
    "gmx.at": true,
    "gmx.ch": true,
    "web.de": true,
    "Outlook.de": true,
    "T-Online.de": true,
    "Freenet.de": true,
  });

  const handleAllToggle = () => {
    const newAllState = !allChecked;
    setAllChecked(newAllState);

    const updatedStates: { [key: string]: boolean } = {};
    Object.keys(ispStates).forEach((isp) => {
      updatedStates[isp] = newAllState;
    });
    setIspStates(updatedStates);
  };

  const handleIspToggle = (ispName: string) => {
    const newIspStates = {
      ...ispStates,
      [ispName]: !ispStates[ispName],
    };
    setIspStates(newIspStates);

    const allEnabled = Object.values(newIspStates).every((state) => state);
    setAllChecked(allEnabled);
  };

  const ispList = [
    ["Gmail", "iCloud", "web.de"],
    ["AOL", "gmx.de", "Outlook.de"],
    ["Yahoo", "gmx.at", "T-Online.de"],
    ["Outlook", "gmx.ch", "Freenet.de"],
  ];

  return (
    <Box>
      <Box className={styles.titleBox}>
        <Typography className={styles.title}>ISP Management</Typography>
        <Typography className={styles.subtitle}>
          Turn off/on isp's that you would like to include in dashboards.
        </Typography>
      </Box>
      <Box className={styles.middleBox}>
        <Typography className={styles.allText}>All</Typography>
        <Switch
          className={styles.antSwitch}
          checked={allChecked}
          onChange={handleAllToggle}
        />
      </Box>
      <Divider className={styles.divider} />

      <Box className={styles.ispGrid}>
        {ispList.map((row, rowIndex) => (
          <Box key={rowIndex} className={styles.ispRow}>
            {row.map((isp) => (
              <Box key={isp} className={styles.ispItem}>
                <Typography className={styles.ispText}>{isp}</Typography>
                <Switch
                  className={styles.antSwitch}
                  checked={ispStates[isp]}
                  onChange={() => handleIspToggle(isp)}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DomainAndIp;
