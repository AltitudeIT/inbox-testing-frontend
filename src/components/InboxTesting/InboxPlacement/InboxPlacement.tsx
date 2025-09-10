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
import type { PlacementData } from "../../../models/InboxTestingModels";

interface InboxPlacementProps {
  globalPlacements: PlacementData[];
  europePlacements: PlacementData[];
}

const InboxPlacement: React.FC<InboxPlacementProps> = ({
  globalPlacements,
  europePlacements,
}) => {
  const calculateDeliveryStats = (
    placements: PlacementData[],
    ispName: string
  ) => {
    const ispPlacement = placements.find((p) => p.isp_name === ispName);

    if (!ispPlacement || ispPlacement.total_count === 0) {
      return { inbox: 0, spam: 0, blocked: 0 };
    }

    return {
      inbox: Math.round(
        (ispPlacement.inbox_count / ispPlacement.total_count) * 100
      ),
      spam: Math.round(
        (ispPlacement.spam_count / ispPlacement.total_count) * 100
      ),
      blocked: Math.round(
        (ispPlacement.blocked_count / ispPlacement.total_count) * 100
      ),
    };
  };

  const getISPDuration = (placements: PlacementData[], ispName: string) => {
    const ispPlacement = placements.find((p) => p.isp_name === ispName);
    return ispPlacement?.duration || 0;
  };

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
            {globalPlacements.map((placement, index) => {
              const stats = calculateDeliveryStats(
                globalPlacements,
                placement.isp_name
              );
              const duration = getISPDuration(
                globalPlacements,
                placement.isp_name
              );

              return (
                <TableRow key={index} className={styles.tableRow}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={styles.cellWithPadding}
                  >
                    <Typography className={styles.rowText}>
                      {placement.isp_name}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" className={styles.customCell}>
                    <Box>
                      <Box className={styles.legendContainer}>
                        <Box className={styles.legendItem}>
                          <Box className={styles.greenDot}></Box>
                          <Typography className={styles.legendText}>
                            Inbox {stats.inbox}%
                          </Typography>
                        </Box>
                        <Box className={styles.legendItem}>
                          <Box className={styles.orangeDot}></Box>
                          <Typography className={styles.legendText}>
                            Spam {stats.spam}%
                          </Typography>
                        </Box>
                        <Box className={styles.legendItem}>
                          <Box className={styles.redDot}></Box>
                          <Typography className={styles.legendText}>
                            Missing {stats.blocked}%
                          </Typography>
                        </Box>
                      </Box>
                      <ProgressBar
                        inbox={stats.inbox}
                        spam={stats.spam}
                        blocked={stats.blocked}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="left" className={styles.durationCell}>
                    <Typography className={styles.rowText}>
                      {duration} sec
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Box>
                      <Box className={styles.authRow}>
                        <img
                          src={
                            placement.spf_auth
                              ? "/InboxTesting/check-mark.png"
                              : "/InboxTesting/block-icon.png"
                          }
                          className={styles.img}
                        />
                        <Typography>SPF</Typography>
                      </Box>
                      <Box className={styles.authRow}>
                        <img
                          src={
                            placement.dkim_auth
                              ? "/InboxTesting/check-mark.png"
                              : "/InboxTesting/block-icon.png"
                          }
                          className={styles.img}
                        />
                        <Typography>DKIM</Typography>
                      </Box>
                      <Box className={styles.authRow}>
                        <img
                          src={
                            placement.dmarc_auth
                              ? "/InboxTesting/check-mark.png"
                              : "/InboxTesting/block-icon.png"
                          }
                          className={styles.img}
                        />
                        <Typography>DMARC</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
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
            {europePlacements.map((placement, index) => {
              const stats = calculateDeliveryStats(
                europePlacements,
                placement.isp_name
              );
              const duration = getISPDuration(
                europePlacements,
                placement.isp_name
              );

              return (
                <TableRow key={index} className={styles.tableRow}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={styles.cellWithPadding}
                  >
                    <Typography className={styles.rowText}>
                      {placement.isp_name}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" className={styles.customCell}>
                    <Box>
                      <Box className={styles.legendContainer}>
                        <Box className={styles.legendItem}>
                          <Box className={styles.greenDot}></Box>
                          <Typography className={styles.legendText}>
                            Inbox {stats.inbox}%
                          </Typography>
                        </Box>
                        <Box className={styles.legendItem}>
                          <Box className={styles.orangeDot}></Box>
                          <Typography className={styles.legendText}>
                            Spam {stats.spam}%
                          </Typography>
                        </Box>
                        <Box className={styles.legendItem}>
                          <Box className={styles.redDot}></Box>
                          <Typography className={styles.legendText}>
                            Missing {stats.blocked}%
                          </Typography>
                        </Box>
                      </Box>
                      <ProgressBar
                        inbox={stats.inbox}
                        spam={stats.spam}
                        blocked={stats.blocked}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="left" className={styles.durationCell}>
                    <Typography className={styles.rowText}>
                      {duration} sec
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Box>
                      <Box className={styles.authRow}>
                        <img
                          src={
                            placement.spf_auth
                              ? "/InboxTesting/check-mark.png"
                              : "/InboxTesting/block-icon.png"
                          }
                          className={styles.img}
                        />
                        <Typography>SPF</Typography>
                      </Box>
                      <Box className={styles.authRow}>
                        <img
                          src={
                            placement.dkim_auth
                              ? "/InboxTesting/check-mark.png"
                              : "/InboxTesting/block-icon.png"
                          }
                          className={styles.img}
                        />
                        <Typography>DKIM</Typography>
                      </Box>
                      <Box className={styles.authRow}>
                        <img
                          src={
                            placement.dmarc_auth
                              ? "/InboxTesting/check-mark.png"
                              : "/InboxTesting/block-icon.png"
                          }
                          className={styles.img}
                        />
                        <Typography>DMARC</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InboxPlacement;
