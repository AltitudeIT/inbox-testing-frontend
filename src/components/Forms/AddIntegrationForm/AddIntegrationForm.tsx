import { Box, Typography, Button } from "@mui/material";
import styles from "./AddIntegrationForm.module.css";

const AddIntegrationForm = () => {
  const integrations = [
    {
      id: 1,
      name: "Google Postmaster",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
      available: true,
      image: "/gmail-icon.png",
    },
    {
      id: 2,
      name: "Outlook SNDS",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
      available: true,
    },
    {
      id: 3,
      name: "",
      description: "",
      available: false,
    },
  ];

  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>Add Integration</Typography>

      <Box className={styles.cardsContainer}>
        {integrations.map((integration) => (
          <Box
            key={integration.id}
            className={`${styles.card} ${
              !integration.available ? styles.cardDisabled : ""
            }`}
          >
            <Box className={styles.cardContent}>
              <Box className={styles.iconContainer}>
                <img
                  className={styles.integrationIcon}
                  src={integration.image}
                />
              </Box>

              <Typography className={styles.integrationName}>
                {integration.name}
              </Typography>

              <Typography className={styles.integrationDescription}>
                {integration.description}
              </Typography>

              {integration.available ? (
                <Button className={styles.addButton}>ADD INTEGRATION</Button>
              ) : (
                <Box className={styles.comingSoonOverlay}>
                  <Typography className={styles.comingSoonTitle}>
                    Coming soon
                  </Typography>
                  <Typography className={styles.comingSoonText}>
                    We're currently working on integrating Klaviyo.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AddIntegrationForm;
