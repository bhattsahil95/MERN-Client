import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotesList from "./NoteList";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

function NoteReactApp() {
    const defaultNotesPerPage = 10;
    const [selectedOption, setSelectedOption] = useState(defaultNotesPerPage);
    const socket = io(`${process.env.REACT_APP_BASE_URL}mern-notes`);

    useEffect(() => {
        socket.emit("message", { sourcePage: "/notes" });
        socket.on("testRoute", () => {
            toast.info("Excellent. Test Router is Working");
        });

        socket.on("message", () => {
            toast.info("New User Joined :");
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <div className="notes-app">
            <div className="notes-container">
            <Header
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />

            <NotesList selectedOption={selectedOption} socket={socket} />
            </div>
        </div>
    );
}

export default NoteReactApp;
