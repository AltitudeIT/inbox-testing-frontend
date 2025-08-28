import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "./Integration.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, type MouseEvent } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Integration = () => {
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);

  const integrations = [
    { name: "Google Postmaster", status: "enabled" },
    { name: "Outlook SNDS", status: "enabled" },
    { name: "Klaviyo", status: "disabled" },
  ];

  const StatusButton = ({ status }: { status: string }) => {
    if (status === "enabled") {
      return (
        <Box className={styles.statusButton}>
          <CheckCircleIcon className={styles.enabledIcon} />
          <Typography className={styles.statusText}>Enabled</Typography>
        </Box>
      );
    } else {
      return (
        <Box className={styles.statusButton}>
          <CancelIcon className={styles.disabledIcon} />
          <Typography className={styles.statusText}>Disabled</Typography>
        </Box>
      );
    }
  };

  const handleActionMenuClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setActionMenuAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleDisableClick = () => {
    handleActionMenuClose();
  };

  const handleRemoveClick = () => {
    handleActionMenuClose();
  };

  return (
    <Box className={styles.rootBox}>
      <Box className={styles.headerBox}>
        <Box className={styles.titleBox}>
          <Typography className={styles.title}>Integrations</Typography>
          <Typography className={styles.subtitle}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          </Typography>
        </Box>
        <Button className={styles.addButton}>Add integration</Button>
      </Box>

      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell
                className={`${styles.headerItem} ${styles.headerCell}`}
              >
                NAME
              </TableCell>
              <TableCell className={`${styles.headerItem}`} align="left">
                STATUS
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {integrations.map((integration, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell
                  className={styles.rowItem}
                  component="th"
                  scope="row"
                >
                  <Box className={styles.nameCell}>
                    <Typography className={styles.integrationName}>
                      {integration.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell className={styles.rowItem} align="left">
                  <StatusButton status={integration.status} />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => handleActionMenuClick(e)}
                    className={styles.actionMenuButton}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Menu
            anchorEl={actionMenuAnchorEl}
            open={actionMenuOpen}
            onClose={handleActionMenuClose}
            className={styles.actionMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={handleDisableClick}
              className={`${styles.actionMenuItem}`}
            >
              Disable integration
            </MenuItem>
            <MenuItem
              onClick={handleRemoveClick}
              className={`${styles.actionMenuItem} `}
            >
              Remove integration
            </MenuItem>
          </Menu>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Integration;
