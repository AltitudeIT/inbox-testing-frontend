import {
  Box,
  Button,
  CircularProgress,
  Switch,
  Typography,
} from "@mui/material";
import styles from "./InboxTestingDetails.module.css";
import { ChevronRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import SubscriberInsights from "../SubscriberInsights/SubscriberInsights";
import FolderPlacement from "../FolderPlacement/FolderPlacement";
import IPRecords from "../IPRecords/IPRecords";
import DomainRecords from "../DomainRecords/DomainRecords";
import InboxPlacement from "../InboxPlacement/InboxPlacement";
import DomainTrends from "../DomainTrend/DomainTrend";
import FAQ from "../FAQ/FAQ";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import {
  GeneratePDF,
  GetTestDetails,
} from "../../../services/InboxTesting/InboxTesting";
import type { InboxTestDetailsResponse } from "../../../models/InboxTestingModels";

interface ExpandedSections {
  [key: string]: boolean;
}

const InboxTestingDetails = () => {
  const { testId } = useParams();
  const [testDetails, setTestDetails] =
    useState<InboxTestDetailsResponse | null>(null);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDeliveryTooltip, setShowDeliveryTooltip] =
    useState<boolean>(false);
  const [showDurationTooltip, setShowDurationTooltip] =
    useState<boolean>(false);
  const [showSpamScoreTooltip, setShowSpamScoreTooltip] =
    useState<boolean>(false);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);

  useEffect(() => {
    fetchTestDetails();
  }, []);

  const fetchTestDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetTestDetails(testId!);
      setTestDetails(response.data.result);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          //@ts-ignore
          toast.error(error.response?.data?.message);
        } else {
          toast.error(error.response?.data?.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncludeClick = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleShareReportClick = () => {
    setIsModalOpen(true);
  };

  const isExpanded = (sectionKey: string) => !!expandedSections[sectionKey];

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadPDF = async () => {
    setIsGeneratingPDF(true);

    try {
      const includedSections = Object.entries(expandedSections)
        .filter(([_, isExpanded]) => isExpanded)
        .map(([key]) => key);

      const response = await GeneratePDF({
        testId: testId!,
        sections: includedSections,
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `inbox-test-report-${testId}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Failed to generate PDF");
      console.error(error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const calculateGradientStops = (
    inbox: number,
    blocked: number,
    spam: number
  ) => {
    const gap = 0.3;
    const totalGaps = 3;
    const totalGapSize = gap * totalGaps;

    const availableSpace = 100 - totalGapSize;
    const total = inbox + blocked + spam;
    const scale = availableSpace / total;

    const scaledInbox = inbox * scale;
    const scaledBlocked = blocked * scale;
    const scaledSpam = spam * scale;

    const inboxEnd = scaledInbox;
    const gapAfterInbox = inboxEnd + gap;

    const blockedStart = gapAfterInbox;
    const blockedEnd = blockedStart + scaledBlocked;
    const gapAfterBlocked = blockedEnd + gap;

    const spamStart = gapAfterBlocked;
    const spamEnd = spamStart + scaledSpam;
    const gapAfterSpam = spamEnd + gap;

    const result = {
      "--inbox-end": `${inboxEnd}%`,
      "--gap-after-inbox": `${gapAfterInbox}%`,
      "--blocked-start": `${blockedStart}%`,
      "--blocked-end": `${blockedEnd}%`,
      "--gap-after-blocked": `${gapAfterBlocked}%`,
      "--spam-start": `${spamStart}%`,
      "--spam-end": `${spamEnd}%`,
      "--gap-after-spam": `${gapAfterSpam}%`,
    };

    return result;
  };

  const getDurationColor = (durationInSeconds: number) => {
    const hours = durationInSeconds / 3600;

    if (hours <= 3) return "#649f21";
    if (hours > 3 && hours <= 8) return "#f5770b";
    return "#fc0003";
  };

  if (!testDetails || isLoading) {
    return (
      <div className={styles.rootBox}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress size={40} />
        </div>
      </div>
    );
  }

  return (
    <Box className={styles.rootBox}>
      <Box className={styles.headerBox}>
        <Box className={styles.infoBox}>
          <Typography className={styles.subjectLine}>
            {testDetails.test.subject}
          </Typography>
          <Typography className={styles.info}>
            Sent: {new Date(testDetails.test.created).toLocaleString()}
          </Typography>
          <Typography className={styles.info}>
            From: {testDetails.test.from}
          </Typography>
        </Box>
        {isModalOpen ? (
          <Box className={styles.modalBox}>
            <Typography className={styles.modalTitle}>Share Report</Typography>
            <Typography className={styles.modalDescription}>
              You can scroll down and customize your report with the toggle
              buttons. (include/exclude specific sections)
            </Typography>

            <Box className={styles.inputContainer}>
              <input
                type="text"
                className={styles.linkInput}
                value="Lorem ipsum dolor sit amet, consetetur ..."
                readOnly
              />
              <Box className={styles.copyBox}>
                <img
                  src="/InboxTesting/copy-icon.png"
                  className={styles.copyIcon}
                  onClick={() =>
                    copyToClipboard(
                      "Lorem ipsum dolor sit amet, consetetur ...",
                      "link"
                    )
                  }
                  alt="Copy subject line"
                />
                <Typography className={styles.copyText}>Copy Link</Typography>
                {copiedItem === "link" && (
                  <span className={styles.copiedTooltip}>Copied!</span>
                )}
              </Box>
            </Box>

            <Button
              className={styles.pdfButton}
              onClick={downloadPDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <CircularProgress size={16} sx={{ mr: 1 }} />
                  Generating PDF...
                </>
              ) : (
                "Download PDF"
              )}
            </Button>
          </Box>
        ) : (
          <Button
            className={styles.shareButton}
            onClick={handleShareReportClick}
          >
            Share Report
          </Button>
        )}
      </Box>

      <Box className={styles.sectionGrid}>
        <Box className={styles.leftColumn}>
          <Box className={styles.statsContainer}>
            <Box className={styles.chartSection}>
              <Box className={styles.chartSectionHeader}>
                <Typography className={styles.chartSectionTitle}>
                  Delivery
                </Typography>
                <img
                  src="/InboxTesting/Info.png"
                  className={styles.infoIcon}
                  onMouseEnter={() => setShowDeliveryTooltip(true)}
                  onMouseLeave={() => setShowDeliveryTooltip(false)}
                />
              </Box>
              <Box
                className={styles.donutChart}
                style={
                  calculateGradientStops(
                    testDetails.test.overall_stats.inbox,
                    testDetails.test.overall_stats.blocked,
                    testDetails.test.overall_stats.spam
                  ) as React.CSSProperties
                }
                onMouseEnter={() => setShowDeliveryTooltip(true)}
                onMouseLeave={() => setShowDeliveryTooltip(false)}
              >
                <Box className={`${styles.chartLabel} ${styles.chartLabel91}`}>
                  <span className={styles.greenDot}></span>
                  <Typography className={styles.chartLabelText}>
                    {testDetails.test.overall_stats.inbox}%
                  </Typography>
                </Box>
                <Box className={`${styles.chartLabel} ${styles.chartLabel5}`}>
                  <span className={styles.redDot}></span>
                  <Typography className={styles.chartLabelText}>
                    {testDetails.test.overall_stats.blocked}%
                  </Typography>
                </Box>
                <Box className={`${styles.chartLabel} ${styles.chartLabel4}`}>
                  <span className={styles.orangeDot}></span>
                  <Typography className={styles.chartLabelText}>
                    {testDetails.test.overall_stats.spam}%
                  </Typography>
                </Box>
                {showDeliveryTooltip && (
                  <div className={styles.tooltip}>
                    <div className={styles.legendItem}>
                      <div
                        className={`${styles.legendDot} ${styles.legendDotGreen}`}
                      ></div>
                      <span className={styles.legendText}>Inbox</span>
                    </div>
                    <div className={styles.legendItem}>
                      <div
                        className={`${styles.legendDot} ${styles.legendDotOrange}`}
                      ></div>
                      <span className={styles.legendText}>Spam</span>
                    </div>
                    <div className={styles.legendItem}>
                      <div
                        className={`${styles.legendDot} ${styles.legendDotRed}`}
                      ></div>
                      <span className={styles.legendText}>Missing</span>
                    </div>
                  </div>
                )}
              </Box>
            </Box>

            <Box className={styles.chartSection}>
              <Box className={styles.chartSectionHeader}>
                <Typography className={styles.chartSectionTitle}>
                  Duration
                </Typography>
                <img
                  src="/InboxTesting/Info.png"
                  className={styles.infoIcon}
                  onMouseEnter={() => setShowDurationTooltip(true)}
                  onMouseLeave={() => setShowDurationTooltip(false)}
                />
              </Box>
              <Box
                className={styles.donutChartGreen}
                style={{
                  background: getDurationColor(
                    testDetails.test.overall_stats.duration
                  ),
                }}
                onMouseEnter={() => setShowDurationTooltip(true)}
                onMouseLeave={() => setShowDurationTooltip(false)}
              >
                <Box className={`${styles.chartLabel} ${styles.chartLabel100}`}>
                  <span
                    className={styles.durationDot}
                    style={{
                      backgroundColor: getDurationColor(
                        testDetails.test.overall_stats.duration
                      ),
                    }}
                  ></span>
                  <Typography className={styles.chartLabelText}>
                    100%
                  </Typography>
                </Box>
                {showDurationTooltip && (
                  <div className={styles.tooltip}>
                    <div className={styles.legendItem}>
                      <div
                        className={`${styles.legendDot} ${styles.legendDotGreen}`}
                      ></div>
                      <span className={styles.legendText}>0-3 Hrs</span>
                    </div>
                    <div className={styles.legendItem}>
                      <div
                        className={`${styles.legendDot} ${styles.legendDotOrange}`}
                      ></div>
                      <span className={styles.legendText}>3-8 Hrs</span>
                    </div>
                    <div className={styles.legendItem}>
                      <div
                        className={`${styles.legendDot} ${styles.legendDotRed}`}
                      ></div>
                      <span className={styles.legendText}>8+ Hrs</span>
                    </div>
                  </div>
                )}
              </Box>
            </Box>
          </Box>

          <Box className={styles.spamScoreSection}>
            <Typography className={styles.sectionTitle}>Spam Score</Typography>
            <Box className={styles.scoreGrid}>
              <Box className={styles.scoreItem}>
                <img
                  src={
                    testDetails.test.spam_assassin < 0
                      ? "/InboxTesting/exclamation-mark.png"
                      : testDetails.test.spam_assassin >= 0 &&
                        testDetails.test.spam_assassin <= 5
                      ? "/InboxTesting/stop-mark.png"
                      : "/InboxTesting/check-mark.png"
                  }
                />
                <Typography className={styles.scoreText}>
                  Spam Assassin
                </Typography>
              </Box>
              <Box className={styles.scoreItem}>
                <img
                  src={
                    testDetails.test.barracuda < 0.5
                      ? "/InboxTesting/exclamation-mark.png"
                      : testDetails.test.barracuda >= 0.5 &&
                        testDetails.test.barracuda <= 2
                      ? "/InboxTesting/stop-mark.png"
                      : "/InboxTesting/check-mark.png"
                  }
                />
                <Typography className={styles.scoreText}>
                  Barracuda .55
                </Typography>
              </Box>
            </Box>
            <img
              src="/InboxTesting/Info.png"
              className={styles.spamInfoIcon}
              onMouseEnter={() => setShowSpamScoreTooltip(true)}
              onMouseLeave={() => setShowSpamScoreTooltip(false)}
            />
            {showSpamScoreTooltip && (
              <div className={styles.spamTooltip}>
                <div className={styles.legendItem}>
                  <img
                    src="/InboxTesting/check-mark.png"
                    className={styles.legendIcon}
                  />
                  <span className={styles.legendText}>Good</span>
                </div>
                <div className={styles.legendItem}>
                  <img
                    src="/InboxTesting/stop-mark.png"
                    className={styles.legendIcon}
                  />
                  <span className={styles.legendText}>Caution</span>
                </div>
                <div className={styles.legendItem}>
                  <img
                    src="/InboxTesting/exclamation-mark.png"
                    className={styles.legendIcon}
                  />
                  <span className={styles.legendText}>Needs Attention</span>
                </div>
              </div>
            )}
          </Box>

          <Box className={styles.recommendationsSection}>
            <Typography className={styles.sectionTitle}>
              Recommendations
            </Typography>
            <Typography className={styles.recommendationText}>
              {testDetails.test.recommendations}
            </Typography>
          </Box>
        </Box>

        <Box className={styles.rightColumn}>
          <Box className={styles.contentSection}>
            <Box className={styles.chartSectionHeader}>
              <Typography className={styles.contentTitle}>Content</Typography>
            </Box>
            <Box className={styles.contentSectionContent}>
              {testDetails.test.content && (
                <img
                  src={testDetails.test.content}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    backgroundColor: "#f5f5f5",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.secondBox}>
        <Box className={styles.subscriberInsightsBox}>
          <Box className={styles.titleContainer}>
            <Typography className={styles.sectionTitle}>
              Subscriber Insights
            </Typography>
            <img
              src="/InboxTesting/info.png"
              className={styles.infoIconHeader}
            />
          </Box>
          <Box className={styles.includeBox}>
            <Switch
              className={styles.antSwitch}
              checked={isExpanded("subscriberInsights")}
              onChange={() => handleIncludeClick("subscriberInsights")}
            />
            <Typography className={styles.includeText}>Include</Typography>
            <ChevronRight
              onClick={() => handleIncludeClick("subscriberInsights")}
              className={styles.chevronRight}
              sx={{
                transform: isExpanded("subscriberInsights")
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        {isExpanded("subscriberInsights") && (
          <SubscriberInsights data={testDetails.subscriber_insights} />
        )}

        <Box className={styles.subscriberInsightsBox}>
          <Box className={styles.titleContainer}>
            <Typography className={styles.sectionTitle}>
              Folder Placement Analysis
            </Typography>
            <img
              src="/InboxTesting/info.png"
              className={styles.infoIconHeader}
            />
          </Box>
          <Box className={styles.includeBox}>
            <Switch
              className={styles.antSwitch}
              checked={isExpanded("folderPlacement")}
              onChange={() => handleIncludeClick("folderPlacement")}
            />
            <Typography className={styles.includeText}>Include</Typography>
            <ChevronRight
              onClick={() => handleIncludeClick("folderPlacement")}
              className={styles.chevronRight}
              sx={{
                transform: isExpanded("folderPlacement")
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        {isExpanded("folderPlacement") && <FolderPlacement />}

        <Box className={styles.subscriberInsightsBox}>
          <Box className={styles.titleContainer}>
            <Typography className={styles.sectionTitle}>
              Inbox Placement Analysis
            </Typography>
            <img
              src="/InboxTesting/info.png"
              className={styles.infoIconHeader}
            />
          </Box>
          <Box className={styles.includeBox}>
            <Switch
              className={styles.antSwitch}
              checked={isExpanded("inboxPlacementAnalysis")}
              onChange={() => handleIncludeClick("inboxPlacementAnalysis")}
            />
            <Typography className={styles.includeText}>Include</Typography>
            <ChevronRight
              onClick={() => handleIncludeClick("inboxPlacementAnalysis")}
              className={styles.chevronRight}
              sx={{
                transform: isExpanded("inboxPlacementAnalysis")
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        {isExpanded("inboxPlacementAnalysis") && (
          <InboxPlacement
            globalPlacements={testDetails.placements.global}
            europePlacements={testDetails.placements.europe}
          />
        )}

        <Box className={styles.subscriberInsightsBox}>
          <Box className={styles.titleContainer}>
            <Typography className={styles.sectionTitle}>
              Inbox Placement - Domain Trend
            </Typography>
            <img
              src="/InboxTesting/info.png"
              className={styles.infoIconHeader}
            />
          </Box>
          <Box className={styles.includeBox}>
            <Switch
              className={styles.antSwitch}
              checked={isExpanded("inboxPlacementDomain")}
              onChange={() => handleIncludeClick("inboxPlacementDomain")}
            />
            <Typography className={styles.includeText}>Include</Typography>
            <ChevronRight
              onClick={() => handleIncludeClick("inboxPlacementDomain")}
              className={styles.chevronRight}
              sx={{
                transform: isExpanded("inboxPlacementDomain")
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        {isExpanded("inboxPlacementDomain") && (
          <DomainTrends domain_trends={testDetails.domain_trends} />
        )}

        <Box className={styles.subscriberInsightsBox}>
          <Box className={styles.titleContainer}>
            <Typography className={styles.sectionTitle}>
              Domain Records
            </Typography>
            <img
              src="/InboxTesting/info.png"
              className={styles.infoIconHeader}
            />
          </Box>
          <Box className={styles.includeBox}>
            <Switch
              className={styles.antSwitch}
              checked={isExpanded("domainRecords")}
              onChange={() => handleIncludeClick("domainRecords")}
            />
            <Typography className={styles.includeText}>Include</Typography>
            <ChevronRight
              onClick={() => handleIncludeClick("domainRecords")}
              className={styles.chevronRight}
              sx={{
                transform: isExpanded("domainRecords")
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        {isExpanded("domainRecords") && <DomainRecords />}

        <Box className={styles.subscriberInsightsBox}>
          <Box className={styles.titleContainer}>
            <Typography className={styles.sectionTitle}>IP Records</Typography>
            <img
              src="/InboxTesting/info.png"
              className={styles.infoIconHeader}
            />
          </Box>
          <Box className={styles.includeBox}>
            <Switch
              className={styles.antSwitch}
              checked={isExpanded("ipRecords")}
              onChange={() => handleIncludeClick("ipRecords")}
            />
            <Typography className={styles.includeText}>Include</Typography>
            <ChevronRight
              onClick={() => handleIncludeClick("ipRecords")}
              className={styles.chevronRight}
              sx={{
                transform: isExpanded("ipRecords")
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        {isExpanded("ipRecords") && (
          <IPRecords ip_records={testDetails.ip_records} />
        )}

        {/* ovo (reputation analysis) je u V2 */}
        {/* <Box className={styles.subscriberInsightsBox}>
          <Box className={styles.titleContainer}>
            <Typography className={styles.sectionTitle}>
              Reputation Analysis
            </Typography>
            <img
              src="/InboxTesting/info.png"
              className={styles.infoIconHeader}
            />
          </Box>
          <Box className={styles.includeBox}>
            <Switch
              className={styles.antSwitch}
              checked={isExpanded("reputationAnalysis")}
              onChange={() => handleIncludeClick("reputationAnalysis")}
            />
            <Typography className={styles.includeText}>Include</Typography>
            <ChevronRight
              onClick={() => handleIncludeClick("reputationAnalysis")}
              className={styles.chevronRight}
              sx={{
                transform: isExpanded("reputationAnalysis")
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        {isExpanded("reputationAnalysis") && <ReputationAnalysis />} */}

        <Box className={styles.subscriberInsightsBox}>
          <Box className={styles.titleContainer}>
            <Typography className={styles.sectionTitle}>FAQ</Typography>
            <img
              src="/InboxTesting/info.png"
              className={styles.infoIconHeader}
            />
          </Box>
          <Box className={styles.includeBox}>
            <Switch
              className={styles.antSwitch}
              checked={isExpanded("faq")}
              onChange={() => handleIncludeClick("faq")}
            />
            <Typography className={styles.includeText}>Include</Typography>
            <ChevronRight
              onClick={() => handleIncludeClick("faq")}
              className={styles.chevronRight}
              sx={{
                transform: isExpanded("faq") ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        {isExpanded("faq") && <FAQ />}
      </Box>
    </Box>
  );
};

export default InboxTestingDetails;
