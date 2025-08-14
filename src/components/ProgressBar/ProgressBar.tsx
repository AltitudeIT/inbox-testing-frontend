import { Box } from "@mui/material";

const ProgressBar = ({ inbox, spam, blocked }: any) => {
  const inboxWidth = (inbox / 100) * 100;
  const spamWidth = (spam / 100) * 100;
  const blockedWidth = (blocked / 100) * 100;

  return (
    <Box
      sx={{
        display: "flex",
        width: 370,
        height: 23,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "transparent",
        gap: 0.5,
      }}
    >
      <Box
        sx={{
          width: `${inboxWidth}%`,
          backgroundColor: "#649F21",
          height: "100%",
        }}
      />
      <Box
        sx={{
          width: `${spamWidth}%`,
          backgroundColor: "#F5770B",
          height: "100%",
        }}
      />
      <Box
        sx={{
          width: `${blockedWidth}%`,
          backgroundColor: "#FC0003",
          height: "100%",
        }}
      />
    </Box>
  );
};

export default ProgressBar;
