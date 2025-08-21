import { IconButton, TableCell, TableRow } from "@mui/material";
import styles from "./SubscriberBreakdownList.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface SubscriberResponse {
  id: number;
  name: string;
  date: string;
  totalSubscribers: string;
}

interface SubscriberBreakdownItemProps {
  subscriber: SubscriberResponse;
  onDelete: (id: number) => void;
  onSelect?: (subscriber: SubscriberResponse) => void;
  isSelected: boolean;
}

const SubscriberBreakdownItem = (props: SubscriberBreakdownItemProps) => {
  const handleRowClick = () => {
    if (props.onSelect) {
      props.onSelect(props.subscriber);
    }
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
      <TableCell className={styles.item}>{props.subscriber.date}</TableCell>
      <TableCell className={styles.item}>
        {props.subscriber.totalSubscribers}
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
