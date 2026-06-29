import React, { useState, useEffect } from "react";
import useChatRoomStore from "../../chatRoomStore";
import ScrollToBottom from "react-scroll-to-bottom";

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
        if (!activeRoom || messageInput.trim() === "") {
            return;
        }

        const timeStamp = new Date().getTime();

        const messageData = {
            sender: { id: chatId, name: userName },
            message: messageInput.trim(),
            roomId: activeRoom.id,
            timeStamp: timeStamp,
        };

        socket.emit("sendRoomMessage", messageData);
        setMessageInput("");
    };

    const handleExitChat = () => {
        if (activeRoom && socket) {
            socket.emit("leaveRoom", activeRoom.id);
        }
        setActiveRoom(null);
        clearRoomMessages();
        setLastMessage(null);
    };

    const handleIncomingRoomMessage = (data) => {
        if (!data || !activeRoom || data.roomId !== activeRoom.id) {
            return;
        }

        if (data.type === "system") {
            appendRoomMessage(data);
            return;
        }

        const displayUserName =
            lastMessage === null ||
            String(lastMessage.sender?.id) !== String(data.sender?.id);

        const newData = { ...data, displayUserName };
        appendRoomMessage(newData);
        setLastMessage(newData);
    };

    useEffect(() => {
        if (!socket) return;

        const onReceiveRoomMessage = (data) => {
            handleIncomingRoomMessage(data);
        };

        socket.on("receiveRoomMessage", onReceiveRoomMessage);
        socket.on("roomSystemMessage", onReceiveRoomMessage);

        return () => {
            socket.off("receiveRoomMessage", onReceiveRoomMessage);
            socket.off("roomSystemMessage", onReceiveRoomMessage);
        };
    }, [socket, activeRoom, lastMessage]);

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
                        roomMessages
                            .filter((message) => message.roomId === activeRoom.id)
                            .map((message, index) => {
                                const isMine =
                                    message.type !== "system" &&
                                    String(message.sender?.id) === String(chatId);

                                return (
                                    <div
                                        key={message.timeStamp || index}
                                        className={`group-messages ${
                                            message.type === "system"
                                                ? "system"
                                                : isMine
                                                ? "mine"
                                                : "others"
                                        }`}
                                    >
                                        {message.type === "system" ? (
                                            <div className="system-message">
                                                {message.text}
                                            </div>
                                        ) : (
                                            <>
                                                {message.displayUserName && (
                                                    <div className="message-meta">
                                                        <span className="message-author">
                                                            {message.sender?.name}
                                                        </span>
                                                    </div>
                                                )}
                                                <div
                                                    className={
                                                        isMine
                                                            ? "my-message"
                                                            : "other-message"
                                                    }
                                                >
                                                    {message.message}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
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
                    SEND
                </button>
            </div>
        </div>
    );
};

export default GroupChat;
