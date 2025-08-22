import { Box, Button, Typography } from "@mui/material";
import styles from "./InboxTestingDetails.module.css";

const InboxTestingDetails = () => {
  return (
    <Box>
      <Box className={styles.headerBox}>
        <Box className={styles.infoBox}>
          <Typography className={styles.subjectLine}>
            Hier steht die Subjectline lorem ipsum
          </Typography>
          <Typography className={styles.info}>
            March, 13th, 2024 4:57pm
          </Typography>
          <Typography className={styles.info}>Talesandtails.de</Typography>
        </Box>
        <Button className={styles.shareButton}>Share Report</Button>
      </Box>

      <Box className={styles.sectionGrid}>
        <Box className={styles.leftColumn}>
          <Box className={styles.statsContainer}>
            <Box className={styles.chartSection}>
              <Box className={styles.chartSectionHeader}>
                <Typography className={styles.chartSectionTitle}>
                  Delivery
                </Typography>
                <img src="/InboxTesting/Info.png" className={styles.infoIcon} />
              </Box>
              <Box className={styles.donutChart}>
                <Box className={`${styles.chartLabel} ${styles.chartLabel91}`}>
                  <span className={styles.greenDot}></span>
                  <Typography className={styles.chartLabelText}>91%</Typography>
                </Box>
                <Box className={`${styles.chartLabel} ${styles.chartLabel5}`}>
                  <span className={styles.redDot}></span>
                  <Typography className={styles.chartLabelText}>4%</Typography>
                </Box>
                <Box className={`${styles.chartLabel} ${styles.chartLabel4}`}>
                  <span className={styles.orangeDot}></span>
                  <Typography className={styles.chartLabelText}>5%</Typography>
                </Box>
              </Box>
            </Box>

            <Box className={styles.chartSection}>
              <Box className={styles.chartSectionHeader}>
                <Typography className={styles.chartSectionTitle}>
                  Duration
                </Typography>
                <img src="/InboxTesting/Info.png" className={styles.infoIcon} />
              </Box>
              <Box className={styles.donutChartGreen}>
                <Box className={`${styles.chartLabel} ${styles.chartLabel100}`}>
                  <span className={styles.greenDot}></span>
                  <Typography className={styles.chartLabelText}>
                    100%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className={styles.spamScoreSection}>
            <Typography className={styles.sectionTitle}>Spam Score</Typography>
            <Box className={styles.scoreGrid}>
              <Box className={styles.scoreItem}>
                <img src="/InboxTesting/check-mark.png" />
                <Typography className={styles.scoreText}>
                  Spam Assassin
                </Typography>
              </Box>
              <Box className={styles.scoreItem}>
                <img src="/InboxTesting/exclamation-mark.png" />
                <Typography className={styles.scoreText}>
                  Barracuda .55
                </Typography>
              </Box>
              <Box className={styles.scoreItem}>
                <img src="/InboxTesting/stop-mark.png" />
                <Typography className={styles.scoreText}>Symantec</Typography>
              </Box>
              <Box className={styles.scoreItem}>
                <img src="/InboxTesting/check-mark.png" />
                <Typography className={styles.scoreText}>Brightmail</Typography>
              </Box>
            </Box>
            <img src="/InboxTesting/Info.png" className={styles.spamInfoIcon} />
          </Box>

          <Box className={styles.recommendationsSection}>
            <Typography className={styles.sectionTitle}>
              Recommendations
            </Typography>
            <Typography className={styles.recommendationText}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. <br />
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata
            </Typography>
          </Box>
        </Box>

        <Box className={styles.rightColumn}>
          <Box className={styles.contentSection}>
            <Box className={styles.chartSectionHeader}>
              <Typography className={styles.contentTitle}>Content</Typography>
            </Box>
            <Box className={styles.contentSectionContent}></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InboxTestingDetails;
