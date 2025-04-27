'use client'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Container,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { useState } from "react"; 
  
  const faqs = [
    {
      question: "First steps",
      answer: "Understand the project's overview and how it will help you automate service on WhatsApp with artificial intelligence.",
    },
    {
      question: "Signup and add your business information",
      answer: "Create your account and add company data to connect to the official WhatsApp API.",
    },
    {
      question: "What is the AI used for?",
      answer: "The AI understands the messages, classifies the client goals and answers based on historic and the saved data.",
    },
    {
      question: "How is data stored and protected?",
      answer: "They are stored with encryption in PostgreSQL bank, with JWT authentication and industry standard security measures.",
    },
    {
      question: "Can I customize the AI behavior?",
      answer: "Yes! You can train your AI with real examples of conversations or integrate external models for customizing behavior.",
    },
    {
      question: "How do I monitor conversations in real time?",
      answer: "Dashboard in Next.js shows each real -time interaction with logs and filters by client, intention and status.",
    },
    {
      question: "Is there a free trial or pricing plan?",
      answer: "We offer a free test period and scalable plans based on the amount of messages and features used.",
    },
  ];
  
  
  export default function InfoAccordions() {
    const [expanded, setExpanded] = useState<number | false>(false);
  
    const handleChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    return (
      <Container maxWidth="md" sx={{ backgroundColor: "#1a1a1a", color: "#eee", py: 3 }}>
      {faqs.map(({ question, answer }, i) => (
        <Accordion
          key={i}
          expanded={expanded === i}
          onChange={handleChange(i)}
          sx={{ backgroundColor: "#2a2a2a", color: "#ccc", mb: 1 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#a259ff" }} />}>
            <Typography sx={{ color: "#a259ff", fontWeight: 600 }}>{question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
    );
  }