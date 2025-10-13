import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import styles from "./SubscriberBreakdownList.module.css";
import SubscriberBreakdownItem from "./SubscriberBreakdownItem";
import { type ReactNode } from "react";
import type {
  SubscriberListRespone,
  PaginationInfo,
} from "../../../models/SubscriberModels";

interface SubscriberBreakdownListProps {
  subscribers: SubscriberListRespone[];
  onSubscriberSelect?: (subscriber: SubscriberListRespone) => void;
  selectedSubscriberId?: number | null;
  pagination?: PaginationInfo;
  isLoading?: boolean;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
}

const SubscriberBreakdownList = (props: SubscriberBreakdownListProps) => {
  const { subscribers, pagination, isLoading, onNextPage, onPreviousPage } =
    props;

  let content: ReactNode = null;

  if (subscribers.length === 0) {
    content = (
      <TableBody>
        <TableRow>
          <TableCell className={styles.element} colSpan={5}>
            <Typography variant="body2" className={styles.typographyElement}>
              There are no subscribers available.
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  } else {
    content = (
      <TableBody>
        {subscribers.map((subscriber) => (
          <SubscriberBreakdownItem
            key={subscriber.id}
            subscriber={subscriber}
            onSelect={props.onSubscriberSelect}
            isSelected={props.selectedSubscriberId === subscriber.id}
          />
        ))}
      </TableBody>
    );
  }

  const startRange = pagination
    ? (pagination.page - 1) * pagination.limit + 1
    : 1;
  const endRange = pagination
    ? Math.min(pagination.page * pagination.limit, pagination.total)
    : subscribers.length;
  const totalCount = pagination?.total || 0;

  return (
    <Box>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHeader}>
            <TableRow className={styles.headerRow}>
              <TableCell className={`${styles.cell} ${styles.nameCell}`}>
                Name
              </TableCell>
              <TableCell
                className={`${styles.cell} ${styles.statusCell}`}
              ></TableCell>
              <TableCell className={`${styles.cell} ${styles.dateCell}`}>
                Date
              </TableCell>
              <TableCell className={styles.cell}>Total subscribers</TableCell>
              <TableCell className={styles.cell}></TableCell>
            </TableRow>
          </TableHead>
          {content}
        </Table>
      </TableContainer>
      <Box className={styles.tablePagination}>
        <Typography className={styles.paginationText} variant="body2">
          {`${startRange}-${endRange} of ${totalCount}`}
        </Typography>

        <Box className={styles.paginationControls}>
          <Button
            className={styles.paginationButton}
            disabled={!pagination?.hasPreviousPage || isLoading}
            onClick={onPreviousPage}
            startIcon={<ChevronLeftIcon />}
          >
            Prev
          </Button>

          <Box className={styles.pageNumbers}>
            {pagination && pagination.page > 1 && (
              <Typography
                className={styles.pageNumber}
                onClick={() => onPreviousPage?.()}
              >
                {pagination.page - 1}
              </Typography>
            )}

            <Typography
              className={`${styles.pageNumber} ${styles.currentPage}`}
            >
              {pagination?.page || 1}
            </Typography>

            {pagination && pagination.page < pagination.totalPages && (
              <Typography
                className={styles.pageNumber}
                onClick={() => onNextPage?.()}
              >
                {pagination.page + 1}
              </Typography>
            )}
          </Box>

          <Button
            className={styles.paginationButton}
            disabled={!pagination?.hasNextPage || isLoading}
            onClick={onNextPage}
            endIcon={<ChevronRightIcon />}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriberBreakdownList;
