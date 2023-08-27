import React from "react";
import { Container, Typography } from "@mui/material";
import ContactForm from "../components/ContactPage/contactform";

const ContactPage = () => {
    return (
        <Container maxWidth="sm" className="contact-container">
            <Typography variant="h4" className="get-in-touch" gutterBottom>
                Get in Touch!
            </Typography>
            <ContactForm />
        </Container>
    );
};

export default ContactPage;
