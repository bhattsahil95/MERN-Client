import React, { useState, useRef } from "react";
import useChatRoomStore from "../../chatRoomStore";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ myChat, setMyChat, socket, chatId }) => {
    const chatPartner = myChat ? myChat.name : "";
    const { messages, appendMessage, clearMessages } = useChatRoomStore();
    const [messageInput, setMessageInput] = useState();

    const handleSendMessage = () => {
        if (messageInput.trim() === "") {
            return;
        }

        const messageData = {
            sender: chatId,
            receiver: myChat.id,
            message: messageInput,
        };

        socket.emit("sendMessage", messageData);

        appendMessage(messageData);
        setMessageInput("");
    };

    const handleExitChat = () => {
        socket.emit("chatLeft", myChat);
        setMyChat(false);
        clearMessages();
        sessionStorage.removeItem("activeChat");
    };

    if (!myChat) {
        return null;
    }

    return (
        <div className="active-chat-container">
            <div className="chat-header">
                <h2>{`Chat with ${chatPartner}`}</h2>
                <button onClick={handleExitChat} className="exit-btn">
                    Exit Chat
                </button>
            </div>

            <ScrollToBottom
                className="chat-messages"
                mode="bottom"
                behavior="smooth"
            >
                <div className="messages">
                    {messages &&
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={
                                    message.sender === chatId
                                        ? "my-message right"
                                        : "other-message left"
                                }
                            >
                                {message.message}
                            </div>
                        ))}
                </div>
            </ScrollToBottom>

            <div className="chat-input">
                <textarea
                    placeholder="Type your message..."
                    rows="2"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSendMessage();
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

export default Chat;
