import { IconButton, TableCell, TableRow } from "@mui/material";
import styles from "./SubscriberBreakdownList.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { SubscriberListRespone } from "../../../models/SubscriberModels";

interface SubscriberBreakdownItemProps {
  subscriber: SubscriberListRespone;
  onSelect?: (subscriber: SubscriberListRespone) => void;
  isSelected: boolean;
}

const SubscriberBreakdownItem = (props: SubscriberBreakdownItemProps) => {
  const handleRowClick = () => {
    if (props.onSelect) {
      props.onSelect(props.subscriber);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <TableRow
      className={`${styles.tableRow} ${
        props.isSelected ? styles.tableRowSelected : ""
      }`}
    >
      <TableCell onClick={handleRowClick} className={styles.itemName}>
        {props.subscriber.name}
      </TableCell>
      <TableCell className={styles.item}>
        {formatDate(props.subscriber.created_at)}
      </TableCell>
      <TableCell className={styles.item}>
        {props.subscriber.total_count}
      </TableCell>
      <TableCell className={styles.actionsCell}>
        <IconButton size="small" className={styles.menuButton}>
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default SubscriberBreakdownItem;
