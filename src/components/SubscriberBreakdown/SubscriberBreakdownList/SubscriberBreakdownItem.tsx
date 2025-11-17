import {
  IconButton,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, type MouseEvent } from "react";
import styles from "./SubscriberBreakdownList.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { SubscriberListRespone } from "../../../models/SubscriberModels";

interface SubscriberBreakdownItemProps {
  subscriber: SubscriberListRespone;
  onSelect?: (subscriber: SubscriberListRespone) => void;
  isSelected: boolean;
  onDelete?: (id: number, name: string) => void;
}

const SubscriberBreakdownItem = (props: SubscriberBreakdownItemProps) => {
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const handleRowClick = () => {
    if (props.onSelect) {
      props.onSelect(props.subscriber);
    }
  };

  const handleActionMenuClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setActionMenuAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleViewClick = () => {
    if (props.onSelect) {
      props.onSelect(props.subscriber);
    }
    handleActionMenuClose();
  };

  const handleDeleteClick = () => {
    handleActionMenuClose();
    if (props.onDelete) {
      props.onDelete(props.subscriber.id, props.subscriber.name);
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
        <IconButton
          size="small"
          className={styles.menuButton}
          onClick={handleActionMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={actionMenuAnchorEl}
          open={actionMenuOpen}
          onClose={handleActionMenuClose}
          className={styles.actionMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleViewClick} className={styles.actionMenuItem}>
            View
          </MenuItem>
          <MenuItem
            onClick={handleDeleteClick}
            className={styles.actionMenuItem}
          >
            Delete
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default SubscriberBreakdownItem;
