import { useEffect, useState } from "react";
import styles from "./SubscriberBreakdown.module.css";
import SubscriberBreakdownList from "./SubscriberBreakdownList/SubscriberBreakdownList";
import SubscriberDetails from "./SubscriberDetails/SubscriberDetails";
import { Divider } from "@mui/material";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import type {
  SubscriberListRespone,
  PaginationInfo,
} from "../../models/SubscriberModels";
import { GetSubscriberList } from "../../services/SubscriberList/SubscriberList";

const SubscriberBreakdown = () => {
  const [selectedSubscriber, setSelectedSubscriber] =
    useState<SubscriberListRespone | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subscriberList, setSubscriberList] = useState<SubscriberListRespone[]>(
    []
  );
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const handleSubscriberSelect = (subscriber: SubscriberListRespone) => {
    setSelectedSubscriber((prev) =>
      prev?.id === subscriber.id ? null : subscriber
    );
  };

  const handleCloseDetails = () => {
    setSelectedSubscriber(null);
  };

  useEffect(() => {
    fetchSubscriberList(pagination.page, pagination.limit);
  }, []);

  const fetchSubscriberList = async (page = 1, limit = 5) => {
    try {
      setIsLoading(true);
      const response = await GetSubscriberList(page, limit);
      setSubscriberList(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchSubscriberList(newPage, pagination.limit);
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      handlePageChange(pagination.page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.hasPreviousPage) {
      handlePageChange(pagination.page - 1);
    }
  };

  return (
    <>
      <div className={styles.rootDiv}>
        <SubscriberBreakdownList
          subscribers={subscriberList}
          onSubscriberSelect={handleSubscriberSelect}
          selectedSubscriberId={selectedSubscriber?.id || null}
          pagination={pagination}
          isLoading={isLoading}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </div>
      <Divider className={styles.divider} />
      <div className={styles.titleDiv}>
        <p className={styles.title}>Details</p>
        <p className={styles.subtitle}>
          Please select a upload to see more details.
        </p>
        {selectedSubscriber && (
          <SubscriberDetails
            subscriber={selectedSubscriber}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </>
  );
};

export default SubscriberBreakdown;
