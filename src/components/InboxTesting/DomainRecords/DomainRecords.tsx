import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import styles from "./DomainRecords.module.css";

const DomainRecords = () => {
  const domainRecordsData = [
    {
      type: "SPF",
      domain: "Reply.betternid.de",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
    {
      type: "DKIM",
      domain: "",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
    {
      type: "DMARC",
      domain: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
    {
      type: "BIMI",
      domain: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
    {
      type: "BIMI Logo",
      domain: "",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
    {
      type: "MX Records",
      domain: "",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
  ];

  return (
    <Box className={styles.rootBox}>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell
                className={`${styles.headerCell} ${styles.headerCellWithPadding}`}
              >
                LOREM
              </TableCell>
              <TableCell align="left" className={styles.headerCell}>
                LOREM
              </TableCell>
              <TableCell className={styles.headerCell} align="left">
                LOREM
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {domainRecordsData.map((record, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell
                  component="th"
                  scope="row"
                  className={styles.cellWithPadding}
                >
                  <Typography className={styles.rowText}>
                    {record.type}
                  </Typography>
                </TableCell>

                <TableCell align="left" className={styles.domainCell}>
                  <Typography className={styles.rowText}>
                    {record.domain}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography className={styles.rowText}>
                    {record.description}
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

export default DomainRecords;
