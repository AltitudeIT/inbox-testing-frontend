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
  const [selectedPeriod, setSelectedPeriod] = useState("Custom");

  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

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

  const handlePeriodClick = (event: MouseEvent<HTMLElement>) => {
    setPeriodAnchorEl(event.currentTarget);
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
    setDomainAnchorEl(event.currentTarget);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        borderRadius: "20px",
        width: "1402px",
        marginTop: "35px",
        textAlign: "left",
      }}
    >
      <Box sx={{ display: "flex", gap: 4 }}>
        <TextField
          placeholder="Search Test"
          variant="outlined"
          size="small"
          sx={{
            width: "267px",
            height: "38px",
            marginBottom: "16px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "18px",
              backgroundColor: "#F5F5F5",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#050e21",
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "15px",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#211E1BE5",
              opacity: 0.9,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#050E21" }} fontSize="medium" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box
          sx={{
            backgroundColor: "#F5F5F5",
            width: 162,
            height: 38,
            borderRadius: "50px",
            border: "none",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#EEEEEE",
            },
          }}
          onClick={handlePeriodClick}
        >
          <Typography
            sx={{
              fontFamily:
                '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
              fontSize: 15,
              fontWeight: 400,
              color: "#211E1BE5",
            }}
          >
            {selectedPeriod}
          </Typography>
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #666",
              transform: "rotate(270deg)",
            }}
          />
        </Box>

        <Menu
          anchorEl={periodAnchorEl}
          open={periodOpen}
          onClose={handlePeriodClose}
          disableAutoFocus
          disableEnforceFocus
          disableRestoreFocus
          PaperProps={{
            sx: {
              minWidth: 162,
              borderRadius: "0 0 18px 18px",
              border: "1px solid #050E21",
              borderTop: "none",
            },
          }}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => handlePeriodSelect(item)}
              sx={{
                "&:hover": {
                  backgroundColor: "#F5F95E",
                  borderRadius: 50,
                },
                fontSize: "15px",
                fontWeight: 400,
                color: "#211E1BE5",
                opacity: 0.9,
                margin: "0 10px",
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>

        <Box
          sx={{
            backgroundColor: "#F5F5F5",
            width: 342,
            height: 38,
            borderRadius: "50px",
            border: "none",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#EEEEEE",
            },
          }}
          onClick={handleDomainClick}
        >
          <Typography
            sx={{
              fontFamily:
                '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
              fontSize: 15,
              fontWeight: 400,
              color: "#211E1BE5",
            }}
          >
            {selectedDomain}
          </Typography>
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #666",
              transform: "rotate(270deg)",
            }}
          />
        </Box>

        <Menu
          anchorEl={domainAnchorEl}
          open={domainOpen}
          onClose={handleDomainClose}
          disableAutoFocus
          disableEnforceFocus
          disableRestoreFocus
          PaperProps={{
            sx: {
              minWidth: 342,
              borderRadius: "0 0 18px 18px",
              border: "1px solid #050E21",
              borderTop: "none",
            },
          }}
        >
          {domainItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={(e) => {
                e.preventDefault();
                handleDomainCheckboxChange(item);
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
                fontSize: "15px",
                fontWeight: 400,
                color: "#211E1BE5",
                opacity: 0.9,
                margin: "0 10px",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  handleDomainCheckboxChange(item);
                }}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: selectedDomains.includes(item)
                    ? "#F5F95E"
                    : "#E0E0E0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "none",
                  "&:hover": {
                    backgroundColor: selectedDomains.includes(item)
                      ? "#F0F05E"
                      : "#D0D0D0",
                  },
                }}
              >
                {selectedDomains.includes(item) && (
                  <Box
                    sx={{
                      width: 9,
                      height: 7,
                      borderLeft: "2px solid #000",
                      borderBottom: "2px solid #000",
                      transform: "rotate(-50deg)",
                      marginTop: "-2px",
                    }}
                  />
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#211E1BE5",
                  opacity: 0.9,
                }}
              >
                {item}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {/* <TableContainer sx={{ borderRadius: "15px", width: 1404, marginTop: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#050E21" }}>
            <TableRow>
              <TableCell
                sx={{
                  minWidth: 180,
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 400,
                }}
              >
                CAMPAIGN
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  minWidth: 150,
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 400,
                }}
              >
                OVERVIEW
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 400,
                }}
                align="left"
              >
                INBOX
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 400,
                }}
                align="left"
              >
                SPAM
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 400,
                }}
                align="left"
              >
                BLOCKED
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(25)].map((_, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: "#F5F5F5",
                }}
              >
                <TableCell component="th" scope="row">
                  Hier steht die Subjectline lorem ipsum
                </TableCell>
                <TableCell align="left">4,697</TableCell>
                <TableCell align="left">88%</TableCell>
                <TableCell align="left">6%</TableCell>
                <TableCell align="left">6%</TableCell>
                <TableCell align="left">35</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Box>
  );
};

export default InboxTesting;
