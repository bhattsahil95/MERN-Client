import React, { useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TimelineComponent from "../components/AboutPage/timeline";
import PFitems from "../assets/professionalData.js";
import { educationData, certificationData } from "../assets/educationData.js";

const accordionData = [
    {
        title: "PROFESSIONAL JOURNEY",
        class: "timeline-professional",
        content: <TimelineComponent data={PFitems} />,
    },
    {
        title: "EDUCATIONAL JOURNEY",
        class: "timeline-educational",
        content: <TimelineComponent data={educationData} />,
    },
    {
        title: "CERTIFICATIONS",
        class: "timeline-certificate",
        content: <TimelineComponent data={certificationData} />,
    },
];

const AboutPage = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleAccordionChange = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <div>
            <div className="about-page">
                <div className="about-title ">
                    <h3>
                        A finance professional with a keen passion for
                        Technology.
                    </h3>
                </div>
                <div className="timelines">
                    {accordionData.map((item, index) => (
                        <div className={`timeline ${item.class}`} key={index}>
                            <Accordion
                                expanded={expandedIndex === index}
                                onChange={() => handleAccordionChange(index)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography>{item.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {item.content}
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
