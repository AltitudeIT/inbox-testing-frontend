import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
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
import {
  CheckSubscriberListStatus,
  GetSubscriberList,
} from "../../services/SubscriberList/SubscriberList";

const SubscriberBreakdown = forwardRef((_, ref) => {
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

  const pollingIntervalsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  useImperativeHandle(ref, () => ({
    refreshList: () => {
      fetchSubscriberList(pagination.page, pagination.limit);
    },
  }));

  useEffect(() => {
    fetchSubscriberList(pagination.page, pagination.limit);

    return () => {
      pollingIntervalsRef.current.forEach((interval) =>
        clearInterval(interval)
      );
      pollingIntervalsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const processingLists = subscriberList.filter(
      (list) => list.status === "processing"
    );

    processingLists.forEach((list) => {
      if (!pollingIntervalsRef.current.has(list.id)) {
        const intervalId = setInterval(() => {
          pollListStatus(list.id);
        }, 5000);
        pollingIntervalsRef.current.set(list.id, intervalId);
      }
    });

    pollingIntervalsRef.current.forEach((intervalId, listId) => {
      const listStillProcessing = processingLists.some((l) => l.id === listId);
      if (!listStillProcessing) {
        clearInterval(intervalId);
        pollingIntervalsRef.current.delete(listId);
      }
    });
  }, [subscriberList]);

  const pollListStatus = async (listId: number) => {
    try {
      const response = await CheckSubscriberListStatus(listId);
      const newStatus = response.data.status;

      setSubscriberList((prevList) =>
        prevList.map((list) =>
          list.id === listId ? { ...list, status: newStatus } : list
        )
      );

      setSelectedSubscriber((prevSelected) => {
        if (prevSelected && prevSelected.id === listId) {
          return { ...prevSelected, status: newStatus };
        }
        return prevSelected;
      });

      if (newStatus === "complete") {
        toast.success(`Subscriber list processing completed!`);
      } else if (newStatus === "failed") {
        toast.error(`Subscriber list processing failed.`);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      }
    }
  };

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
            key={selectedSubscriber.id}
            subscriber={selectedSubscriber}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </>
  );
});

SubscriberBreakdown.displayName = "SubscriberBreakdown";

export default SubscriberBreakdown;
