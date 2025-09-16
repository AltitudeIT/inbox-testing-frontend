import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState, type MouseEvent } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./InboxTesting.module.css";
import { useNavigate } from "react-router";
import {
  GetAllDomains,
  GetAllTests,
} from "../../services/InboxTesting/InboxTesting";
import type {
  Domain,
  InboxTestingResponse,
  Pagination,
} from "../../models/InboxTestingModels";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const InboxTesting = () => {
  const [periodAnchorEl, setPeriodAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [domainAnchorEl, setDomainAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const periodOpen = Boolean(periodAnchorEl);
  const domainOpen = Boolean(domainAnchorEl);
  const [selectedDomain, setSelectedDomain] = useState("All domains");
  const [selectedPeriod, setSelectedPeriod] = useState("All time");
  const [domains, setDomains] = useState<Domain[]>([]);

  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<HTMLElement | null>(null);

  const actionMenuOpen = Boolean(actionMenuAnchorEl);

  const [tests, setTests] = useState<InboxTestingResponse[]>();
  const [selectedTest, setSelectedTest] = useState<InboxTestingResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(25);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const navigate = useNavigate();

  const menuItems = [
    "Last 7 days",
    "Last 60 days",
    "Last 90 days",
    "This year",
    "Last year",
    "All time",
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
      case "All time":
        return {
          startDate: null,
          endDate: null,
        };
      default:
        return {
          startDate: null,
          endDate: null,
        };
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
    const newDateRange = calculateDateRange(period);
    setDateRange(newDateRange);
    setCurrentPage(1);

    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
    handlePeriodClose();
  };

  const handleDomainClick = (event: MouseEvent<HTMLElement>) => {
    if (domainOpen) {
      setDomainAnchorEl(null);
    } else {
      setDomainAnchorEl(event.currentTarget);
    }
  };

  const handleDomainClose = () => {
    setDomainAnchorEl(null);
  };

  const handleDomainCheckboxChange = (domain: Domain) => {
    if (domain.name === "All domains") {
      if (selectedDomains.some((d) => d.name === "All domains")) {
        setSelectedDomains([]);
        setSelectedDomain("All domains");
      } else {
        setSelectedDomains(domains);
        setSelectedDomain("All domains");
      }
    } else {
      let newSelectedDomains: Domain[];

      if (selectedDomains.some((d) => d.name === domain.name)) {
        newSelectedDomains = selectedDomains.filter(
          (d) => d.name !== domain.name && d.name !== "All domains"
        );
      } else {
        newSelectedDomains = [
          ...selectedDomains.filter((d) => d.name !== "All domains"),
          domain,
        ];
      }

      const individualDomains = domains.filter(
        (item) => item.name !== "All domains"
      );
      const allIndividualSelected = individualDomains.every((item) =>
        newSelectedDomains.some((d) => d.name === item.name)
      );

      if (
        allIndividualSelected &&
        newSelectedDomains.length === individualDomains.length
      ) {
        newSelectedDomains = [{ name: "All domains" }, ...newSelectedDomains];
      }

      setSelectedDomains(newSelectedDomains);

      if (newSelectedDomains.length === 0) {
        setSelectedDomain("All domains");
      } else if (newSelectedDomains.some((d) => d.name === "All domains")) {
        setSelectedDomain("All domains");
      } else if (newSelectedDomains.length === 1) {
        setSelectedDomain(newSelectedDomains[0].name);
      } else {
        setSelectedDomain(`${newSelectedDomains.length} domains selected`);
      }
    }
  };

  useEffect(() => {
    const domainNames = selectedDomains.map((d) => d.name);
    fetchTests(
      currentPage,
      pageLimit,
      searchQuery,
      dateRange.startDate,
      dateRange.endDate,
      domainNames
    );
  }, [currentPage, dateRange, selectedDomains]);

  useEffect(() => {
    if (!searchQuery) return;

    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      const domainNames = selectedDomains.map((d) => d.name);
      fetchTests(
        1,
        pageLimit,
        searchQuery,
        dateRange.startDate,
        dateRange.endDate,
        domainNames
      );
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchTests = async (
    page = 1,
    limit = 25,
    search = "",
    startDate: Date | null = null,
    endDate: Date | null = null,
    domains: string[] = []
  ) => {
    try {
      setIsLoading(true);
      const response = await GetAllTests(
        page,
        limit,
        search,
        startDate,
        endDate,
        domains
      );
      setTests(response.data.results);
      setPagination(response.data.pagination);
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

  const fetchDomains = async () => {
    try {
      const response = await GetAllDomains();
      console.log(response.data);
      const fetchedDomains: Domain[] = [
        { name: "All domains" },
        ...response.data.result,
      ];
      setDomains(fetchedDomains);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Unexpected error occurred");
        }
        setDomains([{ name: "All domains" }]);
      }
    }
  };

  const handlePreviousPage = () => {
    if (pagination?.hasPrev && !isLoading) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      fetchTests(newPage, pageLimit);
    }
  };

  const handleNextPage = () => {
    if (pagination?.hasNext && !isLoading) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchTests(newPage, pageLimit);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage && !isLoading) {
      setCurrentPage(pageNumber);
      fetchTests(pageNumber, pageLimit);
    }
  };

  return (
    <Box className={styles.rootBox}>
      <Box className={styles.headerBox}>
        <Box className={styles.searchBox}>
          <Typography className={styles.hiddenText}>Search</Typography>
          <TextField
            placeholder="Search Test"
            variant="outlined"
            size="small"
            className={styles.searchTestInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      className={styles.searchTestIcon}
                      fontSize="medium"
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Box className={styles.verticalDivider} />

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
          <>
            <Box className={styles.verticalDivider} />
            <Box className={styles.domainBox}>
              <Typography className={styles.headerTitle}>
                Custom Time
              </Typography>
              <Box className={styles.customBox}>
                <Box className={styles.timeBox}>
                  <Typography className={styles.headerSelectedText}>
                    Start Date
                  </Typography>
                </Box>
                <Typography>-</Typography>
                <Box className={styles.timeBox}>
                  <Typography className={styles.headerSelectedText}>
                    End Date
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}

        <Box className={styles.verticalDivider} />

        <Box className={styles.domainBox}>
          <Typography className={styles.headerTitle}>Domain</Typography>
          <Box className={styles.domainSelectBox} onClick={handleDomainClick}>
            <Typography className={styles.headerSelectedText}>
              {selectedDomain}
            </Typography>
            <Box className={styles.arrow} />
          </Box>
        </Box>

        <Menu
          anchorEl={domainAnchorEl}
          open={domainOpen}
          onClose={handleDomainClose}
          disableAutoFocus
          disableEnforceFocus
          disableRestoreFocus
          className={styles.domainDropdownMenu}
        >
          <div className={styles.noOption} />
          {domains.map((domain, index) => (
            <MenuItem
              key={index}
              onClick={(e) => {
                e.preventDefault();
                handleDomainCheckboxChange(domain);
              }}
              className={styles.checkboxMenuItem}
            >
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  handleDomainCheckboxChange(domain);
                }}
                className={`${styles.customCheckbox} ${
                  selectedDomains.some((d) => d.name === domain.name)
                    ? styles.customCheckboxChecked
                    : styles.customCheckboxUnchecked
                }`}
              >
                {selectedDomains.some((d) => d.name === domain.name) && (
                  <Box className={styles.checkmark} />
                )}
              </Box>
              <Typography className={styles.checkboxLabel}>
                {domain.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
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

      <Box className={styles.tablePagination}>
        <Typography className={styles.paginationText} variant="body2">
          {pagination
            ? `${
                (pagination.currentPage - 1) * pagination.perPage + 1
              }-${Math.min(
                pagination.currentPage * pagination.perPage,
                pagination.total
              )} of ${pagination.total}`
            : "1-25 of 50"}
        </Typography>

        <Box className={styles.paginationControls}>
          <Button
            className={styles.paginationButton}
            disabled={!pagination?.hasPrev || isLoading}
            onClick={handlePreviousPage}
            startIcon={<ChevronLeftIcon />}
          >
            Prev
          </Button>

          <Box className={styles.pageNumbers}>
            {pagination && pagination.currentPage > 1 && (
              <Typography
                className={styles.pageNumber}
                onClick={() => handlePageClick(pagination.currentPage - 1)}
              >
                {pagination.currentPage - 1}
              </Typography>
            )}

            <Typography
              className={`${styles.pageNumber} ${styles.currentPage}`}
              onClick={() => handlePageClick(pagination?.currentPage || 1)}
            >
              {pagination?.currentPage || 1}
            </Typography>

            {pagination && pagination.currentPage < pagination.totalPages && (
              <Typography
                className={styles.pageNumber}
                onClick={() => handlePageClick(pagination.currentPage + 1)}
              >
                {pagination.currentPage + 1}
              </Typography>
            )}
          </Box>

          <Button
            className={styles.paginationButton}
            disabled={!pagination?.hasNext || isLoading}
            onClick={handleNextPage}
            endIcon={<ChevronRightIcon />}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InboxTesting;
