import React, { useState } from "react";
import useChatRoomStore from "../../chatRoomStore";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ myChat, setMyChat, socket, chatId }) => {
    const chatPartner = myChat ? myChat.name : "";
    const { messages, appendMessage, clearMessages } = useChatRoomStore();
    const [messageInput, setMessageInput] = useState("");

    const handleSendMessage = () => {
        const trimmed = messageInput.trim();
        if (!trimmed || !myChat) {
            return;
        }

        const messageData = {
            sender: chatId,
            receiver: myChat.id,
            message: trimmed,
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
                        messages.map((message, index) => {
                            const isMine = String(message.sender) === String(chatId);

                            return (
                                <div
                                    key={index}
                                    className={`group-messages ${isMine ? "mine" : "others"}`}
                                >
                                    <div className="message-meta">
                                        <span className="message-author">
                                            {isMine ? "You" : chatPartner}
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            isMine ? "my-message" : "other-message"
                                        }
                                    >
                                        {message.message}
                                    </div>
                                </div>
                            );
                        })}
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
