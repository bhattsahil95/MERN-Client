import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function Message(props) {
    const { msg, title } = props;

    const [open, setOpen] = useState(
        localStorage.getItem("isFirstOpen") !== "false"
    );

    return (
        <Box
            sx={{
                position: "relative", // Position the box absolutely
                bottom: "30px",
                left: "50%", // Center the box horizontally
                transform: "translate(-50%, -50%)", // Adjust for centering
                maxWidth: "650px",
            }}
        >
            <Collapse in={open}>
                <Alert
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                                localStorage.setItem("isFirstOpen", "false"); // Set to "false" when closed
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 1 }}
                >
                    {msg}
                </Alert>
            </Collapse>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                    disabled={open}
                    variant="outlined"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    {title}
                </Button>
            </Box>
        </Box>
    );
}
