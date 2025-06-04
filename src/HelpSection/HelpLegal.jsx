import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Legaldata } from "../Data";
import {
  Box,
  Typography,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  List,
  ListItem,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Article as ArticleIcon,
  Gavel as GavelIcon,
} from "@mui/icons-material";

const HelpLegal = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Help & Support
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Let's take a step ahead and help you better.
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          {/* Sidebar Navigation */}
          <Box
            sx={{
              width: isSmallScreen ? "100%" : "250px",
              bgcolor: "grey.100",
              p: 2,
              borderRight: isSmallScreen ? "none" : "1px solid",
              borderRightColor: "divider",
            }}
          >
            <List>
              <ListItem
                button
                component={Link}
                to="/help"
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  bgcolor: "background.paper",
                }}
              >
                <Typography variant="body1" sx={{ color: "black" }}>
                  Partner Onboarding
                </Typography>
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/help/legal"
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  Legal
                </Typography>
              </ListItem>
            </List>
          </Box>

          {/* Main Content */}
          <Box sx={{ flex: 1, p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              <GavelIcon
                sx={{ mr: 1, verticalAlign: "middle", color: "black" }}
              />
              Legal Information
            </Typography>

            {Legaldata.map((item) => (
              <Accordion
                key={item.id}
                expanded={expandedPanel === item.id}
                onChange={handleAccordionChange(item.id)}
                sx={{ mb: 2 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${item.id}-content`}
                  id={`${item.id}-header`}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ArticleIcon color="primary" sx={{ mr: 2 }} />
                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      sx={{ color: "black" }}
                    >
                      {item.heading}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph sx={{ color: "black" }}>
                    {item.Summary}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.read}
                  </Typography>
                  <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                    Read Full Document
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default HelpLegal;
