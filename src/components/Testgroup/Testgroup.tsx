import { useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import styles from "./Testgroup.module.css";
import { DownloadTestGroupCsv } from "../../services/User/UserService";

const Testgroup = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCsv = async () => {
    setIsDownloading(true);
    try {
      const response = await DownloadTestGroupCsv();

      const blob = new Blob([response.data], { type: "text/csv" });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "test-group-emails.csv";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("CSV file downloaded successfully");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.rootDiv}>
      <p className={styles.text}>
        To check if your emails are getting delivered, add the email addresses
        from this export to your campaigns <br />
        This helps you see if your emails are reaching people's inboxes
        effectively.
      </p>
      <button
        type="button"
        className={styles.csvButton}
        onClick={handleDownloadCsv}
        disabled={isDownloading}
      >
        {isDownloading ? "Downloading..." : "Download as csv"}
      </button>
    </div>
  );
};

export default Testgroup;
