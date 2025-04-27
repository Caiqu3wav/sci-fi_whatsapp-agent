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
      answer: "Entenda a visão geral do projeto e como ele vai te ajudar a automatizar o atendimento no WhatsApp com inteligência artificial.",
    },
    {
      question: "Signup and add your business information",
      answer: "Crie sua conta e adicione os dados da empresa para conectar à API oficial do WhatsApp (Meta).",
    },
    {
      question: "What is the AI used for?",
      answer: "The AI understands the messages, classifies the client goals and answers based on historic and the saved data.",
    },
    {
      question: "How is data stored and protected?",
      answer: "All data são armazenados com criptografia no banco PostgreSQL, com autenticação JWT e medidas de segurança padrão da indústria.",
    },
    {
      question: "Can I customize the AI behavior?",
      answer: "Sim! Você pode treinar sua IA com exemplos reais de conversas ou integrar modelos externos para personalização do comportamento.",
    },
    {
      question: "How do I monitor conversations in real time?",
      answer: "A dashboard em Next.js mostra cada interação em tempo real com logs e filtros por cliente, intenção e status.",
    },
    {
      question: "Is there a free trial or pricing plan?",
      answer: "Oferecemos um período de teste gratuito e planos escaláveis baseados na quantidade de mensagens e recursos utilizados.",
    },
  ];
  
  
  export default function FAQSection() {
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