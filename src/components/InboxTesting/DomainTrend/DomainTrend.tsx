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

const DomainTrends = () => {
  const data = [
    { date: "Mar 10", inbox: null, spam: null, missing: null },
    { date: "Mar 11", inbox: null, spam: null, missing: null },
    { date: "Mar 12", inbox: 90, spam: 8, missing: 2 },
    { date: "Mar 13", inbox: 80, spam: 15, missing: 5 },
    { date: "Mar 14", inbox: 85, spam: 10, missing: 5 },
    { date: "Mar 15", inbox: null, spam: null, missing: null },
  ];

  return (
    <Box className={styles.rootBox}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, left: -30, bottom: 20 }}
        >
          <CartesianGrid stroke="#e0e0e0" />
          <XAxis
            dataKey="date"
            axisLine={true}
            tickLine={false}
            tick={{ fontSize: 12, fill: "black" }}
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
                  <div
                    style={{
                      background: "white",
                      border: "1px solid #050E21",
                      borderRadius: "10px",
                      padding: "5px 12px",
                      width: "98px",
                      height: "83px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "12px",
                        textAlign: "left",
                      }}
                    >
                      {label}
                    </p>
                    {payload.map((entry, index) => (
                      <p
                        key={index}
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            backgroundColor: entry.color,
                            marginRight: "6px",
                            display: "inline-block",
                          }}
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
              <span style={{ color: "#050E21E5", opacity: 0.9 }}>{value}</span>
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
            dataKey="missing"
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
