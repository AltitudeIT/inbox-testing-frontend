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
import type { SubscriberListRespone } from "../../../models/SubscriberModels";

interface SubscriberDetailsProps {
  subscriber: SubscriberListRespone;
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
    <Box>
      <Box className={styles.detailsContainer}>
        <Box className={styles.detailsBox}>
          <Typography className={styles.detailsCount}>24.685</Typography>
          <Box>
            <Typography className={styles.detailsText}>
              Total subscribers
            </Typography>
          </Box>
          <IconButton size="small" className={styles.detailsIcon}>
            <InfoOutlineIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box className={styles.detailsBox}>
          <Typography className={styles.detailsCount}>200</Typography>
          <Box className={styles.statLabel}>
            <Typography className={styles.detailsText}>
              Unique Domains
            </Typography>
          </Box>
          <IconButton size="small" className={styles.detailsIcon}>
            <InfoOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box className={styles.searchBox}>
        <TextField
          placeholder="Search Domain"
          variant="outlined"
          size="small"
          className={styles.searchInput}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className={styles.searchIcon} fontSize="medium" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box className={styles.subscribersBox}>
          <TableContainer className={styles.tableContainer}>
            <Table>
              <TableHead className={styles.tableHead}>
                <TableRow>
                  <TableCell
                    className={`${styles.headerItem} ${styles.headerCell}`}
                  >
                    ISP
                  </TableCell>
                  <TableCell
                    className={`${styles.headerItem} ${styles.subscribersHeaderCell}`}
                    align="left"
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
                  <TableRow key={index} className={styles.tableRow}>
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
                          className={styles.searchIconButton}
                          fontSize="medium"
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className={styles.tablePagination}>
            <Typography
              className={styles.paginationText}
              variant="body2"
            >{`1-5 of 20`}</Typography>
            <p className={styles.rightText}>ssssss</p>
          </Box>
        </Box>
      </Box>

      <Divider className={styles.divider} />

      <Box className={styles.bindingBox}>
        <Typography className={styles.bindingTitle}>List Binding</Typography>
        <Typography className={styles.instructionText}>
          Please select a sending domain that you would like to bind the
          Subscriber Breakdown to.
        </Typography>

        <Typography className={styles.domainText}>Domain</Typography>
        <Box className={styles.domainBox}>
          <Box className={styles.domainMenuBox} onClick={handleClick}>
            <Typography className={styles.selectedDomain}>
              {selectedDomain}
            </Typography>
            <Box className={styles.arrow} />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            className={styles.dropdownMenu}
          >
            {[...Array(6)].map((_, index) => (
              <MenuItem
                key={index}
                onClick={() => handleSelect(`diesisteinemusterseite.de`)}
                className={styles.menuItem}
              >
                diesisteinemusterseite.de
              </MenuItem>
            ))}
          </Menu>

          <Button className={styles.addDomainButton}>ADD DOMAIN</Button>
        </Box>

        <Typography className={styles.bindedListTitle}>Binded List:</Typography>
        <Box className={styles.domainListBox}>
          <TableContainer className={styles.domainTableContainer}>
            <Table>
              <TableHead className={styles.domainTableHead}>
                <TableRow>
                  <TableCell
                    className={`${styles.headerItem} ${styles.domainHeaderCell}`}
                  >
                    DOMAIN
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className={styles.domainTableRow}>
                  <TableCell
                    className={styles.rowItem}
                    component="th"
                    scope="row"
                  >
                    loremipsum.de
                  </TableCell>
                  <TableCell className={styles.rowItem} align="right">
                    <Typography className={styles.removeText}>
                      Remove
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriberDetails;
