import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast } from "react-toastify";
import { buildApiUrl } from "../../Services/apiConfig";

const ContactForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormEmpty =
        !firstName || !lastName || !phoneNumber || !email || !message;
    const isPhoneNumberValid = phoneNumber.length === 0 || !phoneNumberError;
    const isEmailValid = email.length === 0 || !emailError;

    const isFormValid = !isFormEmpty && isPhoneNumberValid && isEmailValid;

    const validatePhoneNumber = (value) => {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
            setPhoneNumberError("");
            return false;
        }

        const isValid = /^\+\d{1,3} \d{3} \d{3} \d{4}$/.test(trimmedValue);
        setPhoneNumberError(
            isValid
                ? ""
                : "Please enter a valid phone number with the format +X XXX XXX XXXX"
        );

        return isValid;
    };

    const validateEmail = (value) => {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
            setEmailError("");
            return false;
        }

        const isValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmedValue);
        setEmailError(isValid ? "" : "Please enter a valid email address");

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isPhoneValid = validatePhoneNumber(phoneNumber);
        const isEmailValidValue = validateEmail(email);

        if (!isPhoneValid || !isEmailValidValue) {
            toast.error("Please correct the highlighted fields before sending.");
            return;
        }

        setIsSubmitting(true);

        const formData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phoneNumber: phoneNumber.trim(),
            email: email.trim(),
            message: message.trim(),
        };

        try {
            const response = await axios.post(buildApiUrl("contact/email"), formData);

            if (response.status === 201 || response.status === 200) {
                toast.success("Message received. I will be in touch soon.");
                setFirstName("");
                setLastName("");
                setPhoneNumber("");
                setEmail("");
                setMessage("");
                setPhoneNumberError("");
                setEmailError("");
            } else {
                toast.error("The message could not be sent right now.");
            }
        } catch (error) {
            const message = error?.response?.data?.message || "The message could not be sent right now.";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
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
                    endIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
                    disabled={!isFormValid || isSubmitting}
                    sx={{
                        backgroundColor: isFormValid && !isSubmitting ? undefined : "#ccc",
                        color: "#fff",
                    }}
                >
                    {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
