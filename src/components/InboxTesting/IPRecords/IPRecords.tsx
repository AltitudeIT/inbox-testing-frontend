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

const IPRecords = () => {
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
            {[...Array(4)].map((_, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell
                  component="th"
                  scope="row"
                  className={styles.cellWithPadding}
                >
                  <Typography className={styles.rowText}>
                    123.456.789
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography className={styles.rowText}>
                    Lorem ipsum
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
