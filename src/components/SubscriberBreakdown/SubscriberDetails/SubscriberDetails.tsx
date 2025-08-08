// components/SubscriberBreakdown/DetailsExpanded/DetailsExpanded.tsx
import React, { useState, type MouseEvent } from "react";
import {
  Typography,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import styles from "./SubscriberDetails.module.css";
import SearchIcon from "@mui/icons-material/Search";

interface SubscriberResponse {
  id: number;
  name: string;
  date: string;
  totalSubscribers: string;
}

interface SubscriberDetailsProps {
  subscriber: SubscriberResponse;
  onClose: () => void;
}

const SubscriberDetails: React.FC<SubscriberDetailsProps> = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedDomain, setSelectedDomain] = useState("Domain");
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (domain: string) => {
    setSelectedDomain(domain);
    handleClose();
  };

  return (
    <div className={styles.detailsExpanded}>
      <Box
        sx={{
          display: "flex",
          gap: "30px",
          margin: "32px 0",
        }}
      >
        <Box
          sx={{
            width: "259px",
            height: "113px",
            backgroundColor: "#F5F5F5",
            borderRadius: "14px",
            position: "relative",
            padding: "0px 0 10px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "700", fontSize: "32px", color: "#050E21" }}
          >
            24.685
          </Typography>
          <Box className={styles.statLabel}>
            <Typography
              sx={{ fontSize: "15px", fontWeight: "400", color: "#211E1BE5" }}
            >
              Total subscribers
            </Typography>
          </Box>
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: "12px",
              right: "12px",
              color: "#050E21",
            }}
          >
            <InfoOutlineIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            width: "259px",
            height: "113px",
            backgroundColor: "#F5F5F5",
            borderRadius: "14px",
            position: "relative",
            padding: "0px 0 10px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "700", fontSize: "32px", color: "#050E21" }}
          >
            200
          </Typography>
          <Box className={styles.statLabel}>
            <Typography
              sx={{ fontSize: "15px", fontWeight: "400", color: "#211E1BE5" }}
            >
              Unique Domains
            </Typography>
          </Box>
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: "12px",
              right: "12px",
              color: "#050E21",
            }}
          >
            <InfoOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ marginTop: "70px" }}>
        <TextField
          placeholder="Search Domain"
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

        <Box sx={{ width: 1155 }}>
          <TableContainer sx={{ borderRadius: "15px" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#050E21" }}>
                <TableRow>
                  <TableCell
                    className={styles.headerItem}
                    sx={{ minWidth: 180 }}
                  >
                    ISP
                  </TableCell>
                  <TableCell
                    className={styles.headerItem}
                    align="left"
                    sx={{ minWidth: 150 }}
                  >
                    SUBSCRIBERS
                  </TableCell>
                  <TableCell className={styles.headerItem} align="left">
                    PERCENT OF LIST
                  </TableCell>
                  <TableCell className={styles.headerItem} align="left">
                    DOMAINS
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(6)].map((_, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <TableCell
                      className={styles.rowItem}
                      component="th"
                      scope="row"
                    >
                      Gmail
                    </TableCell>
                    <TableCell className={styles.rowItem} align="left">
                      4,697
                    </TableCell>
                    <TableCell className={styles.rowItem} align="left">
                      22.56%
                    </TableCell>
                    <TableCell className={styles.rowItem} align="left">
                      35
                    </TableCell>
                    <TableCell className={styles.rowItem} align="center">
                      <IconButton>
                        <SearchIcon
                          sx={{ color: "#050E21" }}
                          fontSize="medium"
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
          >
            <Typography
              sx={{ fontWeight: "300", fontSize: "15px", opacity: 0.7 }}
              variant="body2"
            >{`1-5 of 20`}</Typography>
            <p style={{ opacity: 0.7 }}>ssssss</p>
          </Box>
        </Box>
      </Box>

      <Divider
        sx={{
          margin: "20px 60px 20px 0px",
          borderColor: "#707070",
          opacity: "0.4",
        }}
      />

      <Box paddingLeft={2}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 25,
            color: "#050E21",
            fontFamily:
              '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
          }}
        >
          List Binding
        </Typography>
        <Typography
          sx={{
            fontWeight: 300,
            fontSize: 15,
            fontFamily:
              '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
            marginTop: 1,
          }}
        >
          Please select a sending domain that you would like to bind the
          Subscriber Breakdown to.
        </Typography>

        <Typography
          sx={{
            fontWeight: 300,
            fontSize: 15,
            fontFamily:
              '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
            opacity: 0.8,
            marginTop: 2,
            marginBottom: 1,
          }}
        >
          Domain
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
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
            onClick={handleClick}
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
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                minWidth: 342,
              },
            }}
          >
            {[...Array(6)].map((_, index) => (
              <MenuItem
                key={index}
                onClick={() => handleSelect(`diesisteinemusterseite.de`)}
              >
                diesisteinemusterseite.de
              </MenuItem>
            ))}
          </Menu>

          <Button
            sx={{
              width: 177,
              height: 47,
              backgroundColor: "#050E21",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 50,
              fontFamily:
                '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
            }}
          >
            ADD DOMAIN
          </Button>
        </Box>

        <Box sx={{ marginTop: 3 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 18,
              fontFamily:
                '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
            }}
          >
            Binded List:
          </Typography>
          <Box className={styles.bindedItem}></Box>
        </Box>
        <Box sx={{ width: 1155, marginTop: 4, marginBottom: 14 }}>
          <TableContainer sx={{ borderRadius: "15px" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#050E21" }}>
                <TableRow>
                  <TableCell
                    className={styles.headerItem}
                    sx={{ paddingLeft: 3 }}
                  >
                    DOMAIN
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <TableCell
                    className={styles.rowItem}
                    component="th"
                    scope="row"
                  >
                    loremipsum.de
                  </TableCell>
                  <TableCell className={styles.rowItem} align="right">
                    <Typography
                      sx={{
                        color: "#FC0003",
                        marginRight: 3,
                        fontWeight: 400,
                        fontSize: 18,
                        fontFamily:
                          '"Nunito Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
                        cursor: "pointer",
                        padding: 1,
                      }}
                    >
                      Remove
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default SubscriberDetails;
