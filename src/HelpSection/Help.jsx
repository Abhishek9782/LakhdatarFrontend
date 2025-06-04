import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Tabs,
  Tab,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  MailOutline as MailOutlineIcon,
} from "@mui/icons-material";

const Help = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const helpItems = [
    {
      id: "panel1",
      question: "I want to partner my restaurant",
      title: "Partner with us",
      description: "We will revert within 24 hours",
    },
    {
      id: "panel2",
      question: "How do I manage my restaurant listings?",
      title: "Restaurant Management",
      description: "Our team will guide you through the process",
    },
    {
      id: "panel3",
      question: "What are the commission rates?",
      title: "Pricing Information",
      description: "Learn about our competitive rates",
    },
    {
      id: "panel4",
      question: "How do I track my earnings?",
      title: "Earnings Dashboard",
      description: "Access your real-time earnings reports",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4, mt: 8 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Help & Support
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Let's take a step ahead and help you better.
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isSmallScreen ? "scrollable" : "standard"}
            scrollButtons="auto"
          >
            <Tab
              label="Partner Onboarding"
              component={Link}
              to="/help"
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="Legal"
              component={Link}
              to="/help/legal"
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="FAQs"
              component={Link}
              to="/help/faqs"
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="Contact Us"
              component={Link}
              to="/help/contact"
              sx={{ textTransform: "none" }}
            />
          </Tabs>
        </Box>

        {/* Help Items as Accordions */}
        <Box sx={{ width: "100%" }}>
          {helpItems.map((item) => (
            <Accordion
              key={item.id}
              expanded={expandedPanel === item.id}
              onChange={handleAccordionChange(item.id)}
              elevation={2}
              sx={{ mb: 2, borderRadius: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${item.id}-content`}
                id={`${item.id}-header`}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  sx={{ color: "black" }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h6" gutterBottom sx={{ color: "black" }}>
                  {item.title}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<MailOutlineIcon />}
                    sx={{
                      alignSelf: isSmallScreen ? "stretch" : "flex-end",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Send an Email
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Additional Help Section */}
        <Box sx={{ mt: 4, p: 3, bgcolor: "action.hover", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "black" }}>
            Need more help?
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }} color="black">
            Our support team is available 24/7 to assist you with any questions
            or concerns.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: isSmallScreen ? "column" : "row",
            }}
          >
            <Button variant="outlined" fullWidth={isSmallScreen}>
              Live Chat
            </Button>
            <Button variant="outlined" fullWidth={isSmallScreen}>
              Call Support
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Help;
