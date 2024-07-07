import React, { useState } from "react";
import { faq } from "../../dummydata";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Heading from "../common/heading/Heading";

const Faq = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <>
      <Heading subtitle="FAQS" title="Frequently Asked Questions" />
      <section className='faq bg-gray-100 py-8'>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            {faq.map((val, index) => (
              <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography>{val.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{val.desc}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Faq;
