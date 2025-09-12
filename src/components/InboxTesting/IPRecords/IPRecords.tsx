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
import styles from "./IPRecords.module.css";
import type { IPRecord } from "../../../models/InboxTestingModels";

interface IPRecordsProps {
  ip_records: IPRecord[];
}

const IPRecords: React.FC<IPRecordsProps> = ({ ip_records }) => {
  return (
    <Box className={styles.rootBox}>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell
                className={`${styles.headerCell} ${styles.headerCellWithPadding}`}
              >
                IP
              </TableCell>
              <TableCell align="left" className={styles.headerCell}>
                REVERSE DNS
              </TableCell>
              <TableCell className={styles.headerCell} align="left">
                ORGANISATION NAME
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ip_records.map((record, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell
                  component="th"
                  scope="row"
                  className={styles.cellWithPadding}
                >
                  <Typography className={styles.rowText}>
                    {record.ip_address}
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography className={styles.rowText}>
                    {record.reverse_dns}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography className={styles.rowText}>
                    Lorem ipsum dolor sit amet,
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default IPRecords;
