import React, { useEffect, useState } from "react";
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
  Button,
  Divider,
} from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import styles from "./SubscriberDetails.module.css";
import SearchIcon from "@mui/icons-material/Search";
import type {
  SubscriberListDetails,
  SubscriberListRespone,
} from "../../../models/SubscriberModels";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { GetSubscriberListDetails } from "../../../services/SubscriberList/SubscriberList";

interface SubscriberDetailsProps {
  subscriber: SubscriberListRespone;
  onClose: () => void;
}

const SubscriberDetails: React.FC<SubscriberDetailsProps> = (props) => {
  const [subscriberListDetails, setSubscriberListDetails] =
    useState<SubscriberListDetails>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    FetchListDetails(currentPage, pageLimit, searchQuery);
  }, [currentPage]);

  useEffect(() => {
    if (!searchQuery) {
      FetchListDetails(1, pageLimit, "");
      return;
    }

    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      FetchListDetails(1, pageLimit, searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const FetchListDetails = async (
    page: number,
    limit: number,
    search: string = ""
  ) => {
    try {
      const response = await GetSubscriberListDetails(
        props.subscriber.id,
        page,
        limit,
        search
      );
      setSubscriberListDetails(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      }
    }
  };

  const handlePreviousPage = () => {
    if (subscriberListDetails?.pagination?.hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (subscriberListDetails?.pagination?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Box>
      <Box className={styles.detailsContainer}>
        <Box className={styles.detailsBox}>
          <Typography className={styles.detailsCount}>
            {subscriberListDetails?.total_subscribers || 0}
          </Typography>
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
          <Typography className={styles.detailsCount}>
            {subscriberListDetails?.unique_domains || 0}
          </Typography>
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriberListDetails?.isp_breakdown.map((item, index) => (
                  <TableRow key={index} className={styles.tableRow}>
                    <TableCell
                      className={styles.rowItem}
                      component="th"
                      scope="row"
                    >
                      {item.isp}
                    </TableCell>
                    <TableCell className={styles.rowItem} align="left">
                      {item.subscribers.toLocaleString()}
                    </TableCell>
                    <TableCell className={styles.rowItem} align="left">
                      {item.percent_of_list}
                    </TableCell>
                    <TableCell className={styles.rowItem} align="left">
                      {item.domains}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className={styles.tablePagination}>
            <Typography className={styles.paginationText} variant="body2">
              {subscriberListDetails?.pagination
                ? `${
                    (subscriberListDetails.pagination.page - 1) *
                      subscriberListDetails.pagination.limit +
                    1
                  }-${Math.min(
                    subscriberListDetails.pagination.page *
                      subscriberListDetails.pagination.limit,
                    subscriberListDetails.pagination.total
                  )} of ${subscriberListDetails.pagination.total}`
                : "0-0 of 0"}
            </Typography>

            <Box className={styles.paginationControls}>
              <Button
                className={styles.paginationButton}
                disabled={!subscriberListDetails?.pagination?.hasPreviousPage}
                onClick={handlePreviousPage}
                startIcon={<ChevronLeftIcon />}
              >
                Prev
              </Button>

              <Box className={styles.pageNumbers}>
                {subscriberListDetails?.pagination &&
                  subscriberListDetails.pagination.page > 1 && (
                    <Typography
                      className={styles.pageNumber}
                      onClick={() =>
                        handlePageClick(
                          subscriberListDetails.pagination!.page - 1
                        )
                      }
                    >
                      {subscriberListDetails.pagination.page - 1}
                    </Typography>
                  )}

                <Typography
                  className={`${styles.pageNumber} ${styles.currentPage}`}
                  onClick={() =>
                    handlePageClick(
                      subscriberListDetails?.pagination?.page || 1
                    )
                  }
                >
                  {subscriberListDetails?.pagination?.page || 1}
                </Typography>

                {subscriberListDetails?.pagination &&
                  subscriberListDetails.pagination.page <
                    subscriberListDetails.pagination.totalPages && (
                    <Typography
                      className={styles.pageNumber}
                      onClick={() =>
                        handlePageClick(
                          subscriberListDetails.pagination!.page + 1
                        )
                      }
                    >
                      {subscriberListDetails.pagination.page + 1}
                    </Typography>
                  )}
              </Box>

              <Button
                className={styles.paginationButton}
                disabled={!subscriberListDetails?.pagination?.hasNextPage}
                onClick={handleNextPage}
                endIcon={<ChevronRightIcon />}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider className={styles.divider} />
    </Box>
  );
};

export default SubscriberDetails;
