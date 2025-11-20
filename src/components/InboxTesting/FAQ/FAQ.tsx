import { Box, Typography, Collapse } from "@mui/material";
import { useState } from "react";
import styles from "./FAQ.module.css";
import { ChevronRight, ExpandMore } from "@mui/icons-material";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  const faqData = [
    {
      id: 1,
      question: "Lorem ipsum dolor sit amet, consetetur",
      answer:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata",
    },
    {
      id: 2,
      question: "Lorem ipsum dolor sit amet, consetetur",
      answer:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    },
    {
      id: 3,
      question: "Lorem ipsum dolor sit amet, consetetur",
      answer:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd",
    },
    {
      id: 4,
      question: "Lorem ipsum dolor sit amet, consetetur",
      answer:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Box className={styles.rootBox}>
      <Box className={styles.faqContainer}>
        {faqData.map((item) => (
          <Box key={item.id} className={styles.faqItem}>
            <Box
              className={`${styles.questionBox} ${
                openItems[item.id] ? styles.questionBoxOpen : ""
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <Typography className={styles.questionText}>
                {item.question}
              </Typography>
              {openItems[item.id] ? (
                <ExpandMore className={styles.expandIcon} />
              ) : (
                <ChevronRight className={styles.chevronIcon} />
              )}
            </Box>

            <Collapse in={openItems[item.id]} timeout="auto">
              <Box className={styles.answerBox}>
                <Typography className={styles.answerText}>
                  {item.answer}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FAQ;
