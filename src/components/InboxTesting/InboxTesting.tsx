import {
  Box,
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
import { useState, type MouseEvent } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./InboxTesting.module.css";
import { useNavigate } from "react-router";

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
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 days");

  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<HTMLElement | null>(null);

  const actionMenuOpen = Boolean(actionMenuAnchorEl);

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

  const domainItems = [
    "All domains",
    "diesisteinnemusterseite1.de",
    "diesisteinnemusterseite2.de",
    "diesisteinnemusterseite3.de",
    "diesisteinnemusterseite4.de",
    "diesisteinnemusterseite5.de",
    "diesisteinnemusterseite6.de",
  ];

  const handleActionMenuClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setActionMenuAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleViewClick = () => {
    navigate(`/inbox-testing/details/1`);
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

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
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

  const handleDomainCheckboxChange = (domain: string) => {
    if (domain === "All domains") {
      if (selectedDomains.includes("All domains")) {
        setSelectedDomains([]);
        setSelectedDomain("All domains");
      } else {
        setSelectedDomains(domainItems);
        setSelectedDomain("All domains");
      }
    } else {
      let newSelectedDomains: string[];

      if (selectedDomains.includes(domain)) {
        newSelectedDomains = selectedDomains.filter(
          (d) => d !== domain && d !== "All domains"
        );
      } else {
        newSelectedDomains = [
          ...selectedDomains.filter((d) => d !== "All domains"),
          domain,
        ];
      }

      const individualDomains = domainItems.filter(
        (item) => item !== "All domains"
      );
      const allIndividualSelected = individualDomains.every((item) =>
        newSelectedDomains.includes(item)
      );

      if (
        allIndividualSelected &&
        newSelectedDomains.length === individualDomains.length
      ) {
        newSelectedDomains = ["All domains", ...newSelectedDomains];
      }

      setSelectedDomains(newSelectedDomains);

      if (newSelectedDomains.length === 0) {
        setSelectedDomain("All domains");
      } else if (newSelectedDomains.includes("All domains")) {
        setSelectedDomain("All domains");
      } else if (newSelectedDomains.length === 1) {
        setSelectedDomain(newSelectedDomains[0]);
      } else {
        setSelectedDomain(`${newSelectedDomains.length} domains selected`);
      }
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

          {domainItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={(e) => {
                e.preventDefault();
                handleDomainCheckboxChange(item);
              }}
              className={styles.checkboxMenuItem}
            >
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  handleDomainCheckboxChange(item);
                }}
                className={`${styles.customCheckbox} ${
                  selectedDomains.includes(item)
                    ? styles.customCheckboxChecked
                    : styles.customCheckboxUnchecked
                }`}
              >
                {selectedDomains.includes(item) && (
                  <Box className={styles.checkmark} />
                )}
              </Box>
              <Typography className={styles.checkboxLabel}>{item}</Typography>
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
            {[...Array(25)].map((_, index) => (
              <TableRow key={index} className={styles.campaignTableRow}>
                <TableCell
                  component="th"
                  scope="row"
                  className={styles.campaignCellWithPadding}
                >
                  <Box className={styles.campaignInfoColumn}>
                    <Typography
                      className={styles.campaignSubjectLine}
                      onClick={handleViewClick}
                    >
                      Hier steht die Subjectline lorem ipsum
                    </Typography>
                    <Typography className={styles.campaignDateTime}>
                      March, 13th, 2024 4:57pm
                    </Typography>
                    <Typography className={styles.campaignDomain}>
                      Talesandtails.de
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <ProgressBar inbox={88} spam={6} blocked={6} />
                </TableCell>
                <TableCell className={styles.inboxPercentage} align="left">
                  88%
                </TableCell>
                <TableCell className={styles.spamPercentage} align="left">
                  6%
                </TableCell>
                <TableCell className={styles.blockedPercentage} align="left">
                  6%
                </TableCell>
                <TableCell>
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
        <Typography
          className={styles.paginationText}
          variant="body2"
        >{`1-25 of 50`}</Typography>
        <p className={styles.rightText}>ssssss</p>
      </Box>
    </Box>
  );
};

export default InboxTesting;
