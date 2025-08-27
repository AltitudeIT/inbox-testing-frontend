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
import styles from "./InboxPlacement.module.css";
import ProgressBar from "../../ProgressBar/ProgressBar";

const InboxPlacement = () => {
  return (
    <Box className={styles.rootBox}>
      <Typography className={styles.titleText}>Global</Typography>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell
                className={`${styles.headerCell} ${styles.headerCellWithPadding}`}
              >
                ISP
              </TableCell>
              <TableCell align="left" className={styles.headerCell}>
                DELIVERY
              </TableCell>
              <TableCell className={styles.headerCell} align="left">
                DURATION
              </TableCell>
              <TableCell className={styles.headerCell} align="left">
                AUTHENTICATION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(3)].map((_, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell
                  component="th"
                  scope="row"
                  className={styles.cellWithPadding}
                >
                  <Typography className={styles.rowText}>Gmail</Typography>
                </TableCell>

                <TableCell align="left" className={styles.customCell}>
                  <Box>
                    <Box className={styles.legendContainer}>
                      <Box className={styles.legendItem}>
                        <Box className={styles.greenDot}></Box>
                        <Typography className={styles.legendText}>
                          Inbox 91%
                        </Typography>
                      </Box>
                      <Box className={styles.legendItem}>
                        <Box className={styles.orangeDot}></Box>
                        <Typography className={styles.legendText}>
                          Spam 5%
                        </Typography>
                      </Box>
                      <Box className={styles.legendItem}>
                        <Box className={styles.redDot}></Box>
                        <Typography className={styles.legendText}>
                          Missing 4%
                        </Typography>
                      </Box>
                    </Box>
                    <ProgressBar inbox={91} spam={5} blocked={4} />
                  </Box>
                </TableCell>
                <TableCell align="left" className={styles.durationCell}>
                  <Typography className={styles.rowText}>13 sec</Typography>
                </TableCell>
                <TableCell align="left">
                  <Box>
                    <Box className={styles.authRow}>
                      <img
                        src="/InboxTesting/check-mark.png"
                        className={styles.img}
                      />
                      <Typography>SPF</Typography>
                    </Box>
                    <Box className={styles.authRow}>
                      <img
                        src="/InboxTesting/stop-mark.png"
                        className={styles.img}
                      />
                      <Typography>DKIM</Typography>
                    </Box>
                    <Box className={styles.authRow}>
                      <img
                        src="/InboxTesting/block-icon.png"
                        className={styles.img}
                      />
                      <Typography>DMARC</Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography className={styles.titleText}>Europe</Typography>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell
                className={`${styles.headerCell} ${styles.headerCellWithPadding}`}
              >
                ISP
              </TableCell>
              <TableCell align="left" className={styles.headerCell}>
                DELIVERY
              </TableCell>
              <TableCell className={styles.headerCell} align="left">
                DURATION
              </TableCell>
              <TableCell className={styles.headerCell} align="left">
                AUTHENTICATION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(3)].map((_, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell
                  component="th"
                  scope="row"
                  className={styles.cellWithPadding}
                >
                  <Typography className={styles.rowText}>Gmail</Typography>
                </TableCell>

                <TableCell align="left" className={styles.customCell}>
                  <Box>
                    <Box className={styles.legendContainer}>
                      <Box className={styles.legendItem}>
                        <Box className={styles.greenDot}></Box>
                        <Typography className={styles.legendText}>
                          Inbox 91%
                        </Typography>
                      </Box>
                      <Box className={styles.legendItem}>
                        <Box className={styles.orangeDot}></Box>
                        <Typography className={styles.legendText}>
                          Spam 5%
                        </Typography>
                      </Box>
                      <Box className={styles.legendItem}>
                        <Box className={styles.redDot}></Box>
                        <Typography className={styles.legendText}>
                          Missing 4%
                        </Typography>
                      </Box>
                    </Box>
                    <ProgressBar inbox={91} spam={5} blocked={4} />
                  </Box>
                </TableCell>
                <TableCell align="left" className={styles.durationCell}>
                  <Typography className={styles.rowText}>13 sec</Typography>
                </TableCell>
                <TableCell align="left">
                  <Box>
                    <Box className={styles.authRow}>
                      <img
                        src="/InboxTesting/check-mark.png"
                        className={styles.img}
                      />
                      <Typography>SPF</Typography>
                    </Box>
                    <Box className={styles.authRow}>
                      <img
                        src="/InboxTesting/stop-mark.png"
                        className={styles.img}
                      />
                      <Typography>DKIM</Typography>
                    </Box>
                    <Box className={styles.authRow}>
                      <img
                        src="/InboxTesting/block-icon.png"
                        className={styles.img}
                      />
                      <Typography>DMARC</Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InboxPlacement;
