import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "./SubscriberBreakdownList.module.css";
import SubscriberBreakdownItem from "./SubscriberBreakdownItem";
import { type ReactNode } from "react";

interface SubscriberResponse {
  id: number;
  name: string;
  date: string;
  totalSubscribers: string;
}

const MOCK_SUBSCRIBERS: SubscriberResponse[] = [
  {
    id: 1,
    name: "Deingenussberlin.de / GenussBLN GmbH",
    date: "2024-03-04",
    totalSubscribers: "24,685",
  },
  {
    id: 2,
    name: "Lorem Ipsum GmbH ",
    date: "2024-02-06",
    totalSubscribers: "4,651",
  },
  {
    id: 3,
    name: "Deingenussberlin.de / GenussBLN GmbH",
    date: "2024-03-04",
    totalSubscribers: "24,685",
  },
  {
    id: 4,
    name: "Deingenussberlin.de / GenussBLN GmbH",
    date: "2024-03-04",
    totalSubscribers: "24,685",
  },
  {
    id: 5,
    name: "Deingenussberlin.de / GenussBLN GmbH",
    date: "2024-03-04",
    totalSubscribers: "24,685",
  },
  {
    id: 6,
    name: "Deingenussberlin.de / GenussBLN GmbH",
    date: "2024-03-04",
    totalSubscribers: "24,685",
  },
];

interface SubscriberBreakdownListProps {
  subscribers?: SubscriberResponse[];
  count?: number;
  searchText?: string | undefined;
  onDelete?: (id: number) => void;
  page?: number;
  rowsPerPage?: number;
  setPage?: (newPage: number) => void;
  setRowsPerPage?: (newRowsPerPage: number) => void;
  onSubscriberSelect?: (subscriber: SubscriberResponse) => void;
  selectedSubscriberId?: number | null;
}

const SubscriberBreakdownList = (props: SubscriberBreakdownListProps) => {
  const subscribers = props.subscribers || MOCK_SUBSCRIBERS;
  const page = props.page || 0;
  const rowsPerPage = props.rowsPerPage || 5;

  const handleDelete =
    props.onDelete ||
    ((id: number) => {
      console.log(`Mock delete: ${id}`);
    });

  let content: ReactNode = null;

  if (subscribers.length === 0) {
    content = (
      <TableBody>
        <TableRow>
          <TableCell className={styles.element} colSpan={4}>
            <Typography variant="body2" className={styles.typographyElement}>
              There are no subscribers available.
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  } else {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedSubscribers = subscribers.slice(startIndex, endIndex);

    content = (
      <TableBody>
        {paginatedSubscribers.map((subscriber) => (
          <SubscriberBreakdownItem
            key={subscriber.id}
            subscriber={subscriber}
            onDelete={handleDelete}
            onSelect={props.onSubscriberSelect}
            isSelected={props.selectedSubscriberId === subscriber.id}
          />
        ))}
      </TableBody>
    );
  }

  return (
    <Box>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHeader}>
            <TableRow className={styles.headerRow}>
              <TableCell className={styles.cell}>Name</TableCell>
              <TableCell className={styles.cell}>Date</TableCell>
              <TableCell className={styles.cell}>Total subscribers</TableCell>
              <TableCell className={styles.cell}></TableCell>
            </TableRow>
          </TableHead>
          {content}
        </Table>
      </TableContainer>
      <Box className={styles.box}>
        <Typography
          className={styles.typography}
          variant="body2"
        >{`1-5 of 20`}</Typography>
        <p className={styles.p_pagination}>ssssss</p>
      </Box>
    </Box>
  );
};

export default SubscriberBreakdownList;
