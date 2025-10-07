import { Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import styles from "./DomainTrend.module.css";
import type { DomainTrend } from "../../../models/InboxTestingModels";

interface DomainTrendProps {
  domain_trends: DomainTrend[];
}

const DomainTrends: React.FC<DomainTrendProps> = ({ domain_trends }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Box className={styles.rootBox}>
      <ResponsiveContainer>
        <LineChart
          data={domain_trends}
          margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
        >
          <CartesianGrid stroke="#e0e0e0" />
          <XAxis
            dataKey="created"
            axisLine={true}
            tickLine={false}
            tick={{ fontSize: 12, fill: "black" }}
            tickFormatter={formatDate}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            interval={0}
            axisLine={true}
            tickLine={false}
            tick={{ fontSize: 12, fill: "black" }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className={styles.tooltip}>
                    <p className={styles.tooltipLabel}>
                      {formatDate(String(label))}
                    </p>
                    {payload.map((entry, index) => (
                      <p key={index} className={styles.tooltipEntry}>
                        <span
                          className={styles.tooltipDot}
                          style={{ backgroundColor: entry.color }}
                        ></span>
                        {entry.name}: {entry.value}
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{
              fontSize: "15px",
              fontWeight: 400,
              marginTop: "-20px",
            }}
            iconType="circle"
            formatter={(value) => (
              <span className={styles.legendText}>{value}</span>
            )}
          />
          <Line
            dataKey="inbox"
            stroke="#649F21"
            strokeWidth={2}
            dot={{ fill: "#649F21", strokeWidth: 1 }}
            name="Inbox"
            connectNulls={false}
          />
          <Line
            dataKey="spam"
            stroke="#F5770B"
            strokeWidth={2}
            dot={{ fill: "#F5770B", strokeWidth: 1 }}
            name="Spam"
            connectNulls={false}
          />
          <Line
            dataKey="blocked"
            stroke="#FC0003"
            strokeWidth={2}
            dot={{ fill: "#FC0003", strokeWidth: 1 }}
            name="Missing"
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DomainTrends;
