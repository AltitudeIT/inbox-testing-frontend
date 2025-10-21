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
import {
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import type {
  SubscriberListRespone,
  PaginationInfo,
} from "../../models/SubscriberModels";
import {
  CheckSubscriberListStatus,
  GetSubscriberList,
  DeleteSubscriberList,
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [deleteName, setDeleteName] = useState<string>("");
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

  const handleDeleteClick = (id: number, name: string) => {
    setIsDialogOpen(true);
    setDeleteId(id);
    setDeleteName(name);
  };

  const handleConfirmDelete = async () => {
    try {
      await DeleteSubscriberList(deleteId);
      toast.success(`Successfully deleted subscriber list: ${deleteName}`);

      setIsDialogOpen(false);

      const newTotalItems = (pagination?.total || 1) - 1;
      const newTotalPages = Math.ceil(newTotalItems / pagination.limit);
      const pageToFetch =
        pagination.page >= newTotalPages
          ? Math.max(1, newTotalPages)
          : pagination.page;
      fetchSubscriberList(pageToFetch, pagination.limit);
      setSelectedSubscriber(null);
      setDeleteId(0);
      setDeleteName("");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response?.data.message);
        }
      } else {
        toast.error("Something unexpectedly went wrong");
      }
    }
  };

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        slotProps={{
          paper: {
            sx: {
              borderRadius: "18px",
              padding: "20px 30px 20px 30px",
            },
          },
        }}
      >
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Montserrat, sans-serif",
              marginBottom: "34px",
              fontSize: "20px",
              fontWeight: "500",
            }}
            id="alert-dialog-description"
          >
            Are you sure you want to delete this subscriber list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#FFFFFF",
              backgroundColor: "#050E21",
              borderRadius: "10px",
              width: "100px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "500",
              "&:hover": {
                opacity: "0.9",
              },
            }}
            onClick={handleConfirmDelete}
          >
            Yes
          </Button>
          <Button
            sx={{
              color: "var(--primary-text-color)",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              border: "1px solid #050E21",
              width: "90px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "500",
              "&:hover": {
                opacity: "0.8",
                border: "1px solid #050E21",
              },
            }}
            onClick={() => setIsDialogOpen(false)}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <div className={styles.rootDiv}>
        <SubscriberBreakdownList
          subscribers={subscriberList}
          onSubscriberSelect={handleSubscriberSelect}
          selectedSubscriberId={selectedSubscriber?.id || null}
          pagination={pagination}
          isLoading={isLoading}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          onDelete={handleDeleteClick}
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
