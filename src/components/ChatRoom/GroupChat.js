import React, { useState, useEffect } from "react";
import useChatRoomStore from "../../chatRoomStore";
import ScrollToBottom from "react-scroll-to-bottom";
import { toast } from "react-toastify";

const GroupChat = ({ socket, chatId, userName }) => {
    const {
        activeRoom,
        setActiveRoom,
        roomMessages,
        appendRoomMessage,
        clearRoomMessages,
    } = useChatRoomStore();

    const [messageInput, setMessageInput] = useState("");
    const [lastMessage, setLastMessage] = useState(null);

    const handleSendMessage = () => {
        if (messageInput.trim() === "") {
            return;
        }

        const timeStamp = new Date().getTime();

        const messageData = {
            sender: { id: chatId, name: userName },
            message: messageInput,
            roomId: activeRoom.id,
            timeStamp: timeStamp,
        };

        socket.emit("sendRoomMessage", messageData);

        appendRoomMessage(messageData);
        setMessageInput("");
    };

    const handleExitChat = () => {
        setActiveRoom(null);
        clearRoomMessages();
    };

    const handleIncomingRoomMessage = (data) => {
        const displayUserName =
            lastMessage === null ||
            String(lastMessage.sender.id) !== String(data.sender.id);

        const newData = { ...data, displayUserName };
        console.log(newData);

        appendRoomMessage(newData);
        setLastMessage(roomMessages[-1]);
        console.log("Prining Last Message  : ", lastMessage);
    };

    useEffect(() => {
        if (socket) {
            socket.on("receiveRoomMessage", (data) => {
                handleIncomingRoomMessage(data);
            });
        }

        return () => {};
    }, [socket]);

    if (!activeRoom) {
        return null;
    }

    return (
        <div className="active-chat-container">
            <div className="chat-header">
                <div className="chat-title">
                    <h2>{`  ${activeRoom.name}`}</h2>
                    <h3>{`ID: ${activeRoom.id}`}</h3>
                </div>
                <button onClick={handleExitChat} className="exit-btn">
                    Exit Chat
                </button>
            </div>
            <ScrollToBottom
                className="chat-messages"
                mode="bottom"
                behavior="smooth"
            >
                <div>
                    {roomMessages &&
                        roomMessages.map((message, index) => (
                            <div className="group-messages">
                                <div
                                    key={index}
                                    className={
                                        message.sender.id === chatId
                                            ? "my-message right"
                                            : "other-message left"
                                    }
                                >
                                    {message.message}
                                </div>

                                {message.displayUserName && (
                                    <div className="message-info">
                                        <div className="other-user">
                                            {message.sender.name}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </ScrollToBottom>

            <div className="chat-input">
                <textarea
                    placeholder="Type your message..."
                    rows="3"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        } else if (e.key === "Enter" && e.shiftKey) {
                            setMessageInput(
                                (prevMessage) => prevMessage + "\n"
                            );
                        }
                    }}
                />
                <button onClick={handleSendMessage} className="send-btn">
                    Send
                </button>
            </div>
        </div>
    );
};

export default GroupChat;
