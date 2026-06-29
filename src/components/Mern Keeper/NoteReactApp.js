import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import NotesList from "./NoteList";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

function NoteReactApp() {
    const defaultNotesPerPage = 10;
    const [selectedOption, setSelectedOption] = useState(defaultNotesPerPage);
    const [socket, setSocket] = useState(null);
    const [activeUsers, setActiveUsers] = useState(0);

    useEffect(() => {
        // Create socket once and set up listeners
        const s = io(`${process.env.REACT_APP_BASE_URL}mern-notes`);
        setSocket(s);
        s.on("connect", () => {
            s.emit("message", { sourcePage: "/notes" });
        });

        s.on("testRoute", () => {
            toast.info("Excellent. Test Router is Working");
        });

        s.on("message", () => {
            toast.info("New User Joined :");
        });

        s.on('userCount', (count) => {
            setActiveUsers(Number(count));
        });

        return () => {
            if (s) {
                s.disconnect();
            }
        };
    }, []);

    return (
        <div className="notes-app">
            <div className="notes-container">
            <Header
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                activeUsers={activeUsers}
            />

            <NotesList selectedOption={selectedOption} socket={socket} activeUsers={activeUsers} />
            </div>
        </div>
    );
}

export default NoteReactApp;
