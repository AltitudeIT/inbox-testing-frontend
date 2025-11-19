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
  Popover,
} from "@mui/material";
import styles from "./Dashboard.module.css";
import { useEffect, useState, type MouseEvent } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { type Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import DomainTrends from "../InboxTesting/DomainTrend/DomainTrend";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import {
  GetDashboardRevenue,
  GetDashboardTests,
  GetDashboardPlacements,
} from "../../services/InboxTesting/InboxTesting";
import type {
  InboxTestingResponse,
  DomainTrend,
} from "../../models/InboxTestingModels";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [periodAnchorEl, setPeriodAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const periodOpen = Boolean(periodAnchorEl);
  const [selectedPeriod, setSelectedPeriod] = useState("This year");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<InboxTestingResponse[]>();
  const navigate = useNavigate();
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const [selectedTest, setSelectedTest] = useState<InboxTestingResponse | null>(
    null
  );
  const [emailRevenue, setEmailRevenue] = useState<number>();
  const actionMenuOpen = Boolean(actionMenuAnchorEl);

  const getInitialDateRange = () => {
    const now = new Date();
    return {
      startDate: new Date(now.getFullYear(), 0, 1),
      endDate: now,
    };
  };

  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>(getInitialDateRange());
  const [domainTrends, setDomainTrends] = useState<DomainTrend[]>([]);
  const [startDateAnchorEl, setStartDateAnchorEl] =
    useState<HTMLElement | null>(null);
  const [endDateAnchorEl, setEndDateAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const startDatePickerOpen = Boolean(startDateAnchorEl);
  const endDatePickerOpen = Boolean(endDateAnchorEl);

  const menuItems = [
    "Last 7 days",
    "Last 60 days",
    "Last 90 days",
    "This year",
    "Last year",
    "Custom",
  ];

  const calculateDateRange = (period: any) => {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    switch (period) {
      case "Last 7 days":
        return {
          startDate: new Date(startOfDay.getTime() - 7 * 24 * 60 * 60 * 1000),
          endDate: now,
        };
      case "Last 60 days":
        return {
          startDate: new Date(startOfDay.getTime() - 60 * 24 * 60 * 60 * 1000),
          endDate: now,
        };
      case "Last 90 days":
        return {
          startDate: new Date(startOfDay.getTime() - 90 * 24 * 60 * 60 * 1000),
          endDate: now,
        };
      case "This year":
        return {
          startDate: new Date(now.getFullYear(), 0, 1),
          endDate: now,
        };
      case "Last year":
        return {
          startDate: new Date(now.getFullYear() - 1, 0, 1),
          endDate: new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59),
        };
      default:
        return {
          startDate: new Date(now.getFullYear(), 0, 1),
          endDate: now,
        };
    }
  };

  const handlePeriodClick = (event: MouseEvent<HTMLElement>) => {
    if (periodOpen) {
      setPeriodAnchorEl(null);
    } else {
      setPeriodAnchorEl(event.currentTarget);
    }
  };

  const handlePeriodClose = () => {
    setPeriodAnchorEl(null);
  };

  const handlePeriodSelect = (period: any) => {
    setSelectedPeriod(period);

    if (period !== "Custom") {
      const newDateRange = calculateDateRange(period);
      setDateRange(newDateRange);
    }

    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
    handlePeriodClose();
  };

  const handleStartDateClick = (event: MouseEvent<HTMLElement>) => {
    setStartDateAnchorEl(event.currentTarget);
  };

  const handleStartDateClose = () => {
    setStartDateAnchorEl(null);
  };

  const handleStartDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const date = new Date(
        Date.UTC(newValue.year(), newValue.month(), newValue.date(), 0, 0, 0, 0)
      );
      setDateRange({
        ...dateRange,
        startDate: date,
      });
    } else {
      setDateRange({
        ...dateRange,
        startDate: null,
      });
    }
    handleStartDateClose();
  };

  const handleEndDateClick = (event: MouseEvent<HTMLElement>) => {
    setEndDateAnchorEl(event.currentTarget);
  };

  const handleEndDateClose = () => {
    setEndDateAnchorEl(null);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const date = new Date(
        Date.UTC(
          newValue.year(),
          newValue.month(),
          newValue.date(),
          23,
          59,
          59,
          999
        )
      );
      setDateRange({
        ...dateRange,
        endDate: date,
      });
    } else {
      setDateRange({
        ...dateRange,
        endDate: null,
      });
    }
    handleEndDateClose();
  };

  useEffect(() => {
    fetchLatestTests(dateRange.startDate, dateRange.endDate);
    fetchEmailRevenue(dateRange.startDate, dateRange.endDate);
    fetchDashboardPlacements(dateRange.startDate, dateRange.endDate);
  }, [dateRange]);

  const fetchLatestTests = async (
    startDate: Date | null = null,
    endDate: Date | null = null
  ) => {
    try {
      setIsLoading(true);
      const response = await GetDashboardTests(startDate, endDate);
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

  const fetchEmailRevenue = async (
    startDate: Date | null = null,
    endDate: Date | null = null
  ) => {
    try {
      setIsLoading(true);
      const response = await GetDashboardRevenue(startDate, endDate);
      setEmailRevenue(response.data.revenue);
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

  const fetchDashboardPlacements = async (
    startDate: Date | null = null,
    endDate: Date | null = null
  ) => {
    try {
      setIsLoading(true);
      const response = await GetDashboardPlacements(startDate, endDate);
      if (Array.isArray(response.data)) {
        setDomainTrends(response.data);
      } else {
        setDomainTrends([]);
      }
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

        <Box className={styles.periosSelectBox} onClick={handlePeriodClick}>
          <Typography className={styles.headerSelectedText}>
            {selectedPeriod}
          </Typography>
          <Box className={styles.arrow} />
        </Box>
      </Box>

      <Menu
        anchorEl={periodAnchorEl}
        open={periodOpen}
        onClose={handlePeriodClose}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        className={styles.periodDropdownMenu}
      >
        <div className={styles.noOption} />
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handlePeriodSelect(item)}
            className={styles.periodMenuItem}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>

      {selectedPeriod === "Custom" && (
        <Box className={styles.customBox}>
          <Box className={styles.timeBox} onClick={handleStartDateClick}>
            <Typography className={styles.headerSelectedText}>
              {dateRange.startDate
                ? `${
                    dateRange.startDate.getUTCMonth() + 1
                  }/${dateRange.startDate.getUTCDate()}/${dateRange.startDate.getUTCFullYear()}`
                : "Start Date"}
            </Typography>
          </Box>
          <Typography>-</Typography>
          <Box className={styles.timeBox} onClick={handleEndDateClick}>
            <Typography className={styles.headerSelectedText}>
              {dateRange.endDate
                ? `${
                    dateRange.endDate.getUTCMonth() + 1
                  }/${dateRange.endDate.getUTCDate()}/${dateRange.endDate.getUTCFullYear()}`
                : "End Date"}
            </Typography>
          </Box>
        </Box>
      )}

      <Popover
        open={startDatePickerOpen}
        anchorEl={startDateAnchorEl}
        onClose={handleStartDateClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={
              dateRange.startDate
                ? dayjs.utc(
                    `${dateRange.startDate.getUTCFullYear()}-${String(
                      dateRange.startDate.getUTCMonth() + 1
                    ).padStart(2, "0")}-${String(
                      dateRange.startDate.getUTCDate()
                    ).padStart(2, "0")}`
                  )
                : null
            }
            onChange={handleStartDateChange}
            maxDate={
              dateRange.endDate
                ? dayjs.utc(
                    `${dateRange.endDate.getUTCFullYear()}-${String(
                      dateRange.endDate.getUTCMonth() + 1
                    ).padStart(2, "0")}-${String(
                      dateRange.endDate.getUTCDate()
                    ).padStart(2, "0")}`
                  )
                : undefined
            }
          />
        </LocalizationProvider>
      </Popover>

      <Popover
        open={endDatePickerOpen}
        anchorEl={endDateAnchorEl}
        onClose={handleEndDateClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={
              dateRange.endDate
                ? dayjs.utc(
                    `${dateRange.endDate.getUTCFullYear()}-${String(
                      dateRange.endDate.getUTCMonth() + 1
                    ).padStart(2, "0")}-${String(
                      dateRange.endDate.getUTCDate()
                    ).padStart(2, "0")}`
                  )
                : null
            }
            onChange={handleEndDateChange}
            minDate={
              dateRange.startDate
                ? dayjs.utc(
                    `${dateRange.startDate.getUTCFullYear()}-${String(
                      dateRange.startDate.getUTCMonth() + 1
                    ).padStart(2, "0")}-${String(
                      dateRange.startDate.getUTCDate()
                    ).padStart(2, "0")}`
                  )
                : undefined
            }
          />
        </LocalizationProvider>
      </Popover>

      <Box className={styles.detailsContainer}>
        <Box className={styles.detailsBox}>
          <Typography className={styles.detailsCount}>
            {emailRevenue}€
          </Typography>
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
        <DomainTrends domain_trends={domainTrends} />
      </Box>
    </Box>
  );
};

export default Dashboard;
