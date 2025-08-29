import {
  Box,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import { ChevronRight } from "@mui/icons-material";
import ProgressBar from "../ProgressBar/ProgressBar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from "recharts";
import DomainTrends from "../InboxTesting/DomainTrend/DomainTrend";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Custom");

  const data = [
    { date: "Mar 10", inbox: null, spam: null, missing: null },
    { date: "Mar 11", inbox: null, spam: null, missing: null },
    { date: "Mar 12", inbox: 90, spam: 8, missing: 2 },
    { date: "Mar 13", inbox: 80, spam: 15, missing: 5 },
    { date: "Mar 14", inbox: 85, spam: 10, missing: 5 },
    { date: "Mar 15", inbox: null, spam: null, missing: null },
  ];

  return (
    <Box className={styles.rootDiv}>
      <Box className={styles.periodBox}>
        <Typography className={styles.headerTitle}>Period of Time</Typography>

        <Box className={styles.periosSelectBox}>
          <Typography className={styles.headerSelectedText}>
            {selectedPeriod}
          </Typography>
          <ChevronRight className={styles.chevronIcon} />
        </Box>
      </Box>

      <Box className={styles.detailsContainer}>
        <Box className={styles.detailsBox}>
          <Typography className={styles.detailsCount}>XX,XX €</Typography>
          <Box>
            <Typography className={styles.detailsText}>
              E-Mail Revenue
            </Typography>
          </Box>
        </Box>

        <Box className={styles.detailsBox}>
          <Typography className={styles.detailsCount}>XX,XX €</Typography>
          <Box className={styles.statLabel}>
            <Typography className={styles.detailsText}>
              Missing E-Mail Revenue
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Typography className={styles.inboxTestsText}>
        Last 3 Inbox Tests
      </Typography>

      <TableContainer className={styles.campaignTableContainer}>
        <Table>
          <TableHead className={styles.campaignTableHead}>
            <TableRow>
              <TableCell
                className={`${styles.campaignHeaderCell} ${styles.campaignHeaderCellWithPadding}`}
              >
                CAMPAIGN
              </TableCell>
              <TableCell align="left" className={styles.campaignHeaderCell}>
                OVERVIEW
              </TableCell>
              <TableCell className={styles.campaignHeaderCell} align="left">
                INBOX
              </TableCell>
              <TableCell className={styles.campaignHeaderCell} align="left">
                SPAM
              </TableCell>
              <TableCell className={styles.campaignHeaderCell} align="left">
                BLOCKED
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(3)].map((_, index) => (
              <TableRow key={index} className={styles.campaignTableRow}>
                <TableCell
                  component="th"
                  scope="row"
                  className={styles.campaignCellWithPadding}
                >
                  <Box className={styles.campaignInfoColumn}>
                    <Typography className={styles.campaignSubjectLine}>
                      Hier steht die Subjectline lorem ipsum
                    </Typography>
                    <Typography className={styles.campaignDateTime}>
                      March, 13th, 2024 4:57pm
                    </Typography>
                    <Typography className={styles.campaignDomain}>
                      Talesandtails.de
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <ProgressBar inbox={88} spam={6} blocked={6} />
                </TableCell>
                <TableCell className={styles.inboxPercentage} align="left">
                  88%
                </TableCell>
                <TableCell className={styles.spamPercentage} align="left">
                  6%
                </TableCell>
                <TableCell className={styles.blockedPercentage} align="left">
                  6%
                </TableCell>
                <TableCell>
                  <IconButton size="small" className={styles.actionMenuButton}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />

      <Typography className={styles.inboxTestsText}>
        Inbox Placement-Trend
      </Typography>

      <Box className={styles.domainBox}>
        <DomainTrends />
      </Box>
    </Box>
  );
};

export default Dashboard;
