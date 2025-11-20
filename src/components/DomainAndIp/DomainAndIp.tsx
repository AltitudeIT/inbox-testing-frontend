import {
  Box,
  CircularProgress,
  Divider,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./DomainAndIp.module.css";
import type { ISP } from "../../models/IspModels";
import {
  GetAllISPs,
  UpdateISPDisplay,
  UpdateAllISPs,
} from "../../services/InboxTesting/InboxTesting";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const DomainAndIp = () => {
  const [allChecked, setAllChecked] = useState(true);
  const [isps, setIsps] = useState<ISP[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchISPs = async () => {
    try {
      setLoading(true);
      const response = await GetAllISPs();
      const ispData: ISP[] = response.data.results;
      setIsps(ispData);
      const allEnabled = ispData.every((isp) => isp.display);
      setAllChecked(allEnabled);
    } catch (error) {
      console.error("Failed to fetch ISPs:", error);
      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      }
      setIsps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchISPs();
  }, []);

  const handleAllToggle = async () => {
    const newAllState = !allChecked;
    const originalAllState = allChecked;
    const originalIsps = [...isps];

    setAllChecked(newAllState);
    const updatedIsps = isps.map((isp) => ({
      ...isp,
      display: newAllState,
    }));
    setIsps(updatedIsps);

    try {
      await UpdateAllISPs(newAllState);
      toast.success(
        `Successfully ${newAllState ? "enabled" : "disabled"} all ISPs`
      );
    } catch (error) {
      console.error("Failed to update all ISPs:", error);

      setIsps(originalIsps);
      setAllChecked(originalAllState);

      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Unexpected error occurred while updating all ISPs");
        }
      }
    }
  };

  const handleIspToggle = async (ispName: string) => {
    const targetIsp = isps.find((isp) => isp.name === ispName);
    if (!targetIsp) return;

    const newDisplayValue = !targetIsp.display;
    const originalIsps = [...isps];
    const originalAllState = allChecked;

    const updatedIsps = isps.map((isp) =>
      isp.name === ispName ? { ...isp, display: newDisplayValue } : isp
    );
    setIsps(updatedIsps);

    const allEnabled = updatedIsps.every((isp) => isp.display);
    setAllChecked(allEnabled);

    try {
      await UpdateISPDisplay(ispName, newDisplayValue);
      toast.success(
        `Successfully ${newDisplayValue ? "enabled" : "disabled"} ${ispName}`
      );
    } catch (error) {
      console.error(`Failed to update ${ispName}:`, error);

      setIsps(originalIsps);
      setAllChecked(originalAllState);

      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error(`Unexpected error occurred while updating ${ispName}`);
        }
      }
    }
  };

  //  (3 items per row)
  const createIspGrid = (ispList: ISP[]) => {
    const grid: ISP[][] = [];
    const itemsPerRow = 3;

    for (let i = 0; i < ispList.length; i += itemsPerRow) {
      grid.push(ispList.slice(i, i + itemsPerRow));
    }

    return grid;
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
        <Typography ml={2}>Loading ISPs...</Typography>
      </Box>
    );
  }

  const ispGrid = createIspGrid(isps);

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
        {ispGrid.map((row, rowIndex) => (
          <Box key={rowIndex} className={styles.ispRow}>
            {row.map((isp) => (
              <Box key={isp.name} className={styles.ispItem}>
                <Typography className={styles.ispText}>{isp.name}</Typography>
                <Switch
                  className={styles.antSwitch}
                  checked={isp.display}
                  onChange={() => handleIspToggle(isp.name)}
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
