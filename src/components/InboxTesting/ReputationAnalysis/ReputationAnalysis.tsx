import { Box, Divider, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import styles from "./ReputationAnalysis.module.css";

const ReputationAnalysis = () => {
  const scaleLabels = ["Malicious", "Bad", "Low", "Neutral", "Medium", "High"];

  const domainReputationData = [
    { date: "", reputation: null },
    { date: "Mar 10", reputation: 5 },
    { date: "Mar 10", reputation: 5 },
    { date: "Mar 10", reputation: 5 },
    { date: "Mar 10", reputation: null },
    { date: "Mar 10", reputation: null },
    { date: "Mar 10", reputation: null },
    { date: "Mar 10", reputation: null },
    { date: "", reputation: null },
  ];

  const complaintRatesData = [
    { date: "", gmail: null, outlook: null },
    { date: "Mar 10", gmail: 0.1, outlook: 0 },
    { date: "Mar 10", gmail: 0, outlook: 0.7 },
    { date: "Mar 10", gmail: null, outlook: 0.4 },
    { date: "Mar 10", gmail: null, outlook: null },
    { date: "Mar 10", gmail: null, outlook: null },
    { date: "Mar 10", gmail: null, outlook: null },
    { date: "Mar 10", gmail: null, outlook: null },
    { date: "", gmail: null, outlook: null },
  ];

  const ipReputationGmailData = [
    { date: "", high: 0, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 1.0, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 0, medium: 1.0, low: 0, bad: 0 },
    { date: "Mar 10", high: 1.0, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 0, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 0, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 0, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 0, medium: 0, low: 0, bad: 0 },
    { date: "", high: 0, medium: 0, low: 0, bad: 0 },
  ];

  const ipReputationOutlookData = [
    { date: "", high: 0, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 100, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 100, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 0, medium: 0, low: 100, bad: 0 },
    { date: "Mar 10", high: 0, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 0, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 0, medium: 0, low: 0, bad: 0 },
    { date: "Mar 10", high: 0, medium: 0, low: 0, bad: 0 },
    { date: "", high: 0, medium: 0, low: 0, bad: 0 },
  ];

  return (
    <Box className={styles.rootBox}>
      <Box className={styles.testBox}>
        <Box className={styles.chartBox}>
          <Typography className={styles.chartTitle}>
            Domain Reputation - GMAIL
          </Typography>

          <ResponsiveContainer width={530} height={280}>
            <LineChart data={domainReputationData}>
              <CartesianGrid />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                axisLine={true}
                tickLine={false}
              />
              <YAxis
                domain={[0, 5]}
                ticks={[0, 1, 2, 3, 4, 5]}
                tick={{ fontSize: 10 }}
                axisLine={true}
                tickLine={false}
                tickFormatter={(value) => scaleLabels[value]}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                height={30}
                wrapperStyle={{
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              />
              <Line
                dataKey="reputation"
                stroke="#333"
                dot={{ fill: "black", r: 2 }}
                name="Reputation"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box className={styles.chartBox}>
          <Typography className={styles.chartTitle}>
            Complaint Rates - GMAIL + Outlook
          </Typography>

          <ResponsiveContainer width={530} height={280}>
            <LineChart data={complaintRatesData}>
              <CartesianGrid />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                axisLine={true}
                tickLine={false}
              />
              <YAxis
                domain={[0, 1]}
                ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
                tick={{ fontSize: 10 }}
                axisLine={true}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />

              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                height={30}
                wrapperStyle={{
                  fontSize: "14px",
                  fontWeight: 400,
                }}
                formatter={(value) => (
                  <span style={{ color: "#050E21" }}>{value}</span>
                )}
              />
              <Line
                dataKey="gmail"
                stroke="#050E21"
                dot={{ fill: "#050E21", r: 2 }}
                name="Gmail"
                type="monotone"
              />
              <Line
                dataKey="outlook"
                stroke="#670203"
                dot={{ fill: "#670203", r: 2 }}
                name="Outlook"
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Divider
        sx={{
          width: "calc(100% + 60px)",
          margin: "20px -30px",
        }}
      />

      <Box className={styles.testBox}>
        <Box className={styles.chartBox}>
          <Typography className={styles.chartTitle}>
            IP Reputation - GMAIL
          </Typography>
          <ResponsiveContainer width={530} height={280}>
            <BarChart data={ipReputationGmailData} maxBarSize={80}>
              <CartesianGrid />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                axisLine={true}
                tickLine={false}
              />
              <YAxis
                domain={[0, 1]}
                ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
                tick={{ fontSize: 10 }}
                axisLine={true}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Legend
                verticalAlign="top"
                align="right"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span style={{ color: "#000000" }}>{value.substring(1)}</span>
                )}
              />
              <Bar dataKey="high" name="1High" fill="#649F21" barSize={80} />
              <Bar
                dataKey="medium"
                name="2Medium"
                fill="#F5770B"
                barSize={80}
              />
              <Bar dataKey="low" name="3Low" fill="#FC0003" barSize={80} />
              <Bar dataKey="bad" name="4Bad" fill="#670203" barSize={80} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box className={styles.chartBox}>
          <Typography className={styles.chartTitle}>
            IP Reputation - Outlook
          </Typography>

          <ResponsiveContainer width={530} height={280}>
            <BarChart data={ipReputationOutlookData} maxBarSize={80}>
              <CartesianGrid />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                axisLine={true}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                tick={{ fontSize: 10 }}
                axisLine={true}
                tickLine={false}
              />
              <Legend
                verticalAlign="top"
                align="right"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span style={{ color: "#000000" }}>{value.substring(1)}</span>
                )}
              />
              <Bar dataKey="high" name="1High" fill="#649F21" barSize={80} />
              <Bar
                dataKey="medium"
                name="2Medium"
                fill="#F5770B"
                barSize={80}
              />
              <Bar dataKey="low" name="3Low" fill="#FC0003" barSize={80} />
              <Bar dataKey="bad" name="4Bad" fill="#670203" barSize={80} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ReputationAnalysis;
