import {
  Box,
  CircularProgress,
  Divider,
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
import styles from "./Dashboard.module.css";
import { useEffect, useState, type MouseEvent } from "react";
import { ChevronRight } from "@mui/icons-material";
import ProgressBar from "../ProgressBar/ProgressBar";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DomainTrends from "../InboxTesting/DomainTrend/DomainTrend";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { GetDashboardTests } from "../../services/InboxTesting/InboxTesting";
import type { InboxTestingResponse } from "../../models/InboxTestingModels";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Custom");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<InboxTestingResponse[]>();
  const navigate = useNavigate();
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const [selectedTest, setSelectedTest] = useState<InboxTestingResponse | null>(
    null
  );
  const actionMenuOpen = Boolean(actionMenuAnchorEl);

  useEffect(() => {
    fetchLatestTests();
  }, []);

  const fetchLatestTests = async () => {
    try {
      setIsLoading(true);
      const response = await GetDashboardTests();
      setTests(response.data.results);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionMenuClick = (
    event: MouseEvent<HTMLElement>,
    test: InboxTestingResponse
  ) => {
    event.stopPropagation();
    setSelectedTest(test);
    setActionMenuAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleViewClick = () => {
    if (selectedTest) {
      navigate(`/inbox-testing/details/${selectedTest.test_id}`);
    }
    handleActionMenuClose();
  };

  const handleDeleteClick = () => {
    handleActionMenuClose();
  };

  return (
    <Box className={styles.rootDiv}>
      <Box className={styles.periodBox}>
        <Typography className={styles.headerTitle}>Period of Time</Typography>

        <Box className={styles.periosSelectBox}>
          <Typography className={styles.headerSelectedText}>
            {selectedPeriod}
          </Typography>
          <ChevronRight className={styles.chevronIcon} />
        </Box>
      </Box>

      <Box className={styles.detailsContainer}>
        <Box className={styles.detailsBox}>
          <Typography className={styles.detailsCount}>XX,XX €</Typography>
          <Box>
            <Typography className={styles.detailsText}>
              E-Mail Revenue
            </Typography>
          </Box>
        </Box>

        <Box className={styles.detailsBox}>
          <Typography className={styles.detailsCount}>XX,XX €</Typography>
          <Box className={styles.statLabel}>
            <Typography className={styles.detailsText}>
              Missing E-Mail Revenue
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Typography className={styles.inboxTestsText}>
        Last 3 Inbox Tests
      </Typography>

      <TableContainer className={styles.campaignTableContainer}>
        <Table>
          <TableHead className={styles.campaignTableHead}>
            <TableRow>
              <TableCell
                className={`${styles.campaignHeaderCell} ${styles.campaignHeaderCellWithPadding}`}
              >
                CAMPAIGN
              </TableCell>
              <TableCell align="left" className={styles.campaignHeaderCell}>
                OVERVIEW
              </TableCell>
              <TableCell className={styles.campaignHeaderCell} align="left">
                INBOX
              </TableCell>
              <TableCell className={styles.campaignHeaderCell} align="left">
                SPAM
              </TableCell>
              <TableCell className={styles.campaignHeaderCell} align="left">
                BLOCKED
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  style={{ padding: "40px" }}
                >
                  <CircularProgress size={40} />
                </TableCell>
              </TableRow>
            ) : tests && tests.length > 0 ? (
              tests.map((test, index) => (
                <TableRow key={index} className={styles.campaignTableRow}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={styles.campaignCellWithPadding}
                  >
                    <Box className={styles.campaignInfoColumn}>
                      <Typography
                        className={styles.campaignSubjectLine}
                        onClick={() =>
                          navigate(`/inbox-testing/details/${test.test_id}`)
                        }
                      >
                        {test.subject}
                      </Typography>
                      <Typography className={styles.campaignDateTime}>
                        {test.created
                          ? new Date(test.created).toLocaleString()
                          : "Date not available"}
                      </Typography>
                      <Typography className={styles.campaignDomain}>
                        {test.domain}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <ProgressBar
                      inbox={test.inbox}
                      spam={test.spam}
                      blocked={test.blocked}
                    />
                  </TableCell>
                  <TableCell className={styles.inboxPercentage} align="left">
                    {test.inbox}%
                  </TableCell>
                  <TableCell className={styles.spamPercentage} align="left">
                    {test.spam}%
                  </TableCell>
                  <TableCell className={styles.blockedPercentage} align="left">
                    {test.blocked}%
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleActionMenuClick(e, test)}
                      className={styles.actionMenuButton}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography>No tests available</Typography>
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
              onClick={handleViewClick}
              className={`${styles.actionMenuItem}`}
            >
              View
            </MenuItem>
            <MenuItem
              onClick={handleDeleteClick}
              className={`${styles.actionMenuItem} `}
            >
              Delete
            </MenuItem>
          </Menu>
        </Table>
      </TableContainer>

      <Divider />

      <Typography className={styles.inboxTestsText}>
        Inbox Placement-Trend
      </Typography>

      <Box className={styles.domainBox}>
        <DomainTrends />
      </Box>
    </Box>
  );
};

export default Dashboard;
