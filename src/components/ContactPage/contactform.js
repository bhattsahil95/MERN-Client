import React, { useState } from "react";
import { TextField, TextareaAutosize, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [emailError, setEmailError] = useState("");

    // Inside the ContactForm component
    const isFormEmpty =
        !firstName || !lastName || !phoneNumber || !email || !message;
    const isPhoneNumberValid = !phoneNumberError;
    const isEmailValid = !emailError;

    const isFormValid = !isFormEmpty && isPhoneNumberValid && isEmailValid;

    const validatePhoneNumber = (value) => {
        if (!/^\+\d{1,3} \d{3} \d{3} \d{4}$/.test(value)) {
            setPhoneNumberError(
                "Please enter a valid phone number with the format +XX XXX XXX XXXX"
            );
        } else {
            setPhoneNumberError("");
        }
    };

    const validateEmail = (value) => {
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phone number and email before submitting
        validatePhoneNumber(phoneNumber);
        validateEmail(email);

        if (phoneNumberError || emailError) {
            return;
        }

        const url = `${BASE_URL}contact/email`;
        // Create a data object to send to the backend
        const formData = {
            firstName,
            lastName,
            phoneNumber,
            email,
            message,
        };

        // Send the form data to the backend
        try {
            const response = await axios.post(url, formData);

            if (response.status === 200) {
                console.log("Email sent successfully!");
                toast.success("Email sent! ");
                // Clear form fields
                setFirstName("");
                setLastName("");
                setPhoneNumber("");
                setEmail("");
                setMessage("");
                setPhoneNumberError("");
                setEmailError("");
            } else {
                console.error("Failed to send email.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                margin="normal"
                className="input-field"
            />
            <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                margin="normal"
                className="input-field"
            />
            <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue.length > 0) {
                        if (inputValue.charAt(0) !== "+") {
                            setPhoneNumber("+" + inputValue);
                        } else {
                            setPhoneNumber(inputValue);
                        }
                    } else {
                        setPhoneNumber(inputValue);
                    }
                    validatePhoneNumber(inputValue); // Validate as needed
                }}
                onBlur={() => validatePhoneNumber(phoneNumber)}
                required
                margin="normal"
                className="input-field"
                error={phoneNumberError !== ""}
                helperText={phoneNumberError}
            />

            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                }}
                onBlur={() => validateEmail(email)}
                required
                margin="normal"
                className="input-field"
                error={emailError !== ""}
                helperText={emailError}
            />

            <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                minRows={4}
                maxRows={15}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                margin="normal"
                className="input-field"
                sx={{ fontSize: "inherit" }} // Inherit font size
            />
            <div className="submit-contact">
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={<SendIcon />}
                    disabled={!isFormValid}
                    sx={{
                        backgroundColor: isFormValid ? undefined : "#ccc", // Blue when active, grey when disabled
                        color: "#fff",
                    }}
                >
                    Send Message
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
