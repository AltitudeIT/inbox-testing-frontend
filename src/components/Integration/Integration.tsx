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
import { useEffect, useState, type MouseEvent } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router";
import {
  GetIntegrations,
  UpdateIntegrationStatus,
  RemoveIntegration,
} from "../../services/User/UserService";
import type { IntegrationResponse } from "../../models/UserModels";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

const Integration = () => {
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const navigator = useNavigate();
  const [integrations, setIntegrations] = useState<IntegrationResponse[]>([]);
  const [selectedIntegration, setSelectedIntegration] =
    useState<IntegrationResponse | null>(null);

  const fetchIntegrations = async () => {
    try {
      const response = await GetIntegrations();
      console.log(response.data);
      setIntegrations(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const StatusButton = ({ status }: { status: boolean }) => {
    if (status === true) {
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

  const handleActionMenuClick = (
    event: MouseEvent<HTMLElement>,
    integration: IntegrationResponse
  ) => {
    event.stopPropagation();
    setSelectedIntegration(integration);
    setActionMenuAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleDisableClick = async () => {
    if (!selectedIntegration) return;

    try {
      const newStatus = !selectedIntegration.klaviyo_status;
      await UpdateIntegrationStatus(selectedIntegration.id, newStatus);
      toast.success("Integration status updated successfully");
      fetchIntegrations();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      }
    } finally {
      handleActionMenuClose();
    }
  };

  const handleRemoveClick = async () => {
    if (!selectedIntegration) return;

    try {
      await RemoveIntegration(selectedIntegration.id);
      toast.success("Integration removed successfully");
      fetchIntegrations();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      }
    } finally {
      handleActionMenuClose();
    }
  };

  const handleAddIntegrationClick = () => {
    navigator("/add-integration");
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
        <Button
          className={styles.addButton}
          onClick={handleAddIntegrationClick}
        >
          Add integration
        </Button>
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
            {integrations.length > 0 ? (
              integrations.map((integration, index) => (
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
                    <StatusButton status={integration.klaviyo_status} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleActionMenuClick(e, integration)}
                      className={styles.actionMenuButton}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography>You don't have any integrations yet</Typography>
                </TableCell>
              </TableRow>
            )}
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
              {selectedIntegration?.klaviyo_status
                ? "Disable integration"
                : "Enable integration"}
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
