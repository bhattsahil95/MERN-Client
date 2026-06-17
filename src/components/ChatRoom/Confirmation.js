import React, { useState } from "react";

import useChatRoomStore from "../../chatRoomStore.js";

const Confirmation = ({ host, socket, guest, handleAnswer }) => {
    const { clearMessages } = useChatRoomStore();

    const handleConfirm = (response) => {
        handleAnswer(response);
        socket.emit("confirmationResponse", {
            guestResponse: response,
            chatParty: { host, guest },
        });

        if (response === "yes") {
            sessionStorage.setItem("activeChat", host.id);
            clearMessages();
        }
    };

    return (
        <div className="confirmation-overlay">
            <div className="confirmation-box">
                <h3>{`Do you want to chat with ${host.name}?`}</h3>
                <div className="confirmation-buttons">
                    <button onClick={() => handleConfirm("yes")}>Yes</button>
                    <button onClick={() => handleConfirm("no")}>No</button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
