import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import io from "socket.io-client";
import Chat from "../components/ChatRoom/Chat.js";
import { LinearProgress } from "@mui/material";
import Confirmation from "../components/ChatRoom/Confirmation.js";
import useChatRoomStore from "../chatRoomStore.js";
import CreateRoom from "../components/ChatRoom/CreateRoom.js";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import GroupChat from "../components/ChatRoom/GroupChat.js";
import ProjectPageHeader from "../components/ProjectPageHeader";
import projects from "../assets/projectsData";

const project = projects.find((p) => p.id === "chatroom");

const ChatRoom = () => {
    const {
        rooms,
        appendMessage,
        clearMessages,
        createRoom,
        setCreateRoom,
        addRoom,
        activeRoom,
        deleteRoom,
        setIsPrivateRoom,
        setActiveRoom,
        appendRoomMessage,
    } = useChatRoomStore();

    const [alertMessage, setAlertMessage] = useState(null);
    const [userName, setUserName] = useState(null);
    const [active, setActive] = useState();
    const [userCount, setUserCount] = useState(1);
    const [chatId, setChatID] = useState(null);
    const [users, setUsers] = useState([]);

    const [myChat, setMyChat] = useState(false);
    const [showChatConfirmation, setShowChatConfirmation] = useState(false);
    const [chatParty, setChatParty] = useState([]);
    const [chatRequestPending, setChatRequestPending] = useState(false);

    const socket = useRef();

    useEffect(() => {
        if (!socket.current) {
            socket.current = io(`${process.env.REACT_APP_BASE_URL}chatroom`);
        }

        socket.current.on("connect", () => {
            if (storedUserData) {
                const { chatId } = JSON.parse(storedUserData);
                socket.current.emit("map-audit", { chatId });
            }

            if (activeChat) {
                socket.current.emit("retriveChat", activeChat);
            }
        });

        const storedUserData = sessionStorage.getItem("userData");
        const activeChat = sessionStorage.getItem("activeChat");

        if (storedUserData) {
            const { userName, chatId } = JSON.parse(storedUserData);
            setUserName(userName);
            setChatID(chatId);
            setActive(true);
        }

        socket.current.on("userUpdate", ({ type, who, users }) => {
            const storedUserData = sessionStorage.getItem("userData");
            const currentId = storedUserData
                ? JSON.parse(storedUserData).chatId
                : null;
            if (who.chatId !== currentId) {
                if (type === "add" && who) {
                    toast.success(`User Joined: ${who.userName}`);
                } else if (type === "remove" && who) {
                    toast.error(`User Left: ${who.userName}`);
                } else if (type === "update") {
                }
            }

            const filteredUsers = users.filter(
                (user) => user.chatId !== currentId
            );
            setUsers(filteredUsers);
            setUserCount(filteredUsers.length);
        });

        socket.current.on("receiveMessage", (messageData) => {
            appendMessage(messageData);
        });

        socket.current.on("receiveChatRequest", ({ host, guest }) => {
            setShowChatConfirmation(true);
            setChatParty({ host, guest });
        });

        socket.current.on("chatRequestAccept", ({ guest }) => {
            setChatRequestPending(false);
            setMyChat(guest);
            clearMessages();
            toast.success(`${guest.name} accepted your request`);
            sessionStorage.setItem("activeChat", guest.id);
        });

        socket.current.on("chatRequestDecline", ({ guest }) => {
            setChatRequestPending(false);
            toast.warning(`${guest.name} declined your request.`);
        });

        socket.current.on("failedChatRequest", () => {
            setChatRequestPending(false);
            toast.error("Failed to send chat request");
        });

        socket.current.on("chatLeft", () => {
            toast.error(`Other user left the chat`);
            setMyChat(false);
            sessionStorage.removeItem("activeChat");
            clearMessages();
        });

        socket.current.on("restoreChat", (data) => {
            toast.info(myChat.id);

            if (data === myChat.id) {
                toast.info("Valid Request!");
            }
        });

        //Rooms
        socket.current.on("roomUpdate", (rooms) => {
            addRoom(rooms);
        });

        socket.current.on("addRoom", (newRoom) => {
            if (newRoom.hostId !== chatId) {
                addRoom(newRoom);
                toast.info("Room Added");
            }
        });

        socket.current.on("deleteRoom", (roomId) => {
            deleteRoom(roomId);
            toast.info("Room Deleted");
        });

        return () => {
            socket.current.disconnect();
        };
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Your updated validation rules
        const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]{3,12}$/;
        const username = userName.trim();

        if (!usernameRegex.test(username)) {
            setAlertMessage(
                "Username must be between 3 and 12 characters and include at least one alphabet character."
            );
            return;
        }
        const newChatId = uuidv4();
        const userData = JSON.stringify({
            userName: userName,
            chatId: newChatId,
        });
        sessionStorage.setItem("userData", userData);

        setChatID(newChatId);

        setActive(true);
        socket.current.emit("newChatUser", {
            chatId: newChatId,
            userName: userName,
        });
    };

    const handleClearUser = () => {
        setActive(false);
        sessionStorage.removeItem("userData");
        setChatRequestPending(false);
        setMyChat(false);
        socket.current.emit("removeChatUser", {
            chatId: chatId,
            userName: userName,
        });
    };

    const handleJoinChat = ({ guestId, guestName }) => {
        socket.current.emit("sendChatRequest", {
            guest: { id: guestId, name: guestName },
            host: { id: chatId, name: userName },
        });
        setChatRequestPending(true);
    };

    const handleConfirmation = (answer) => {
        setShowChatConfirmation(false);
        setChatRequestPending(false);

        if (answer === "no") {
            setChatParty([]);
        } else if (answer === "yes") {
            setMyChat(chatParty.host);
            setChatParty([]);
        }
    };

    const handleCreateOpenRoom = () => {
        setCreateRoom(true);
    };

    const handleCreatePrivateRoom = () => {
        setCreateRoom(true);
        setIsPrivateRoom(true);
    };

    const handleDeleteRoom = (roomId) => {
        deleteRoom(roomId);
        socket.current.emit("deleteRoom", roomId);
    };

    const handleJoinRoom = (room) => {
        if (room.isPrivate && !room.password) {
           
            // You can implement a password prompt here if needed
            const password = prompt(
                "This is a private room. Please enter the password:"
            );
            if (password === room.roomKey) {
                setActiveRoom(room);
            } else {
                setAlertMessage("Incorrect password. Unable to join the room.");
            }
            return;
        }
        setActiveRoom(room);
    };

  

    const clearAlert = () => {
        setAlertMessage(null);
    };

    return (
        <div className="chat-app">
            <ProjectPageHeader
                title={project.title}
                description={project.description}
                tech={project.tech}
            />
            {alertMessage && (
                <div className="alert-message">
                    {alertMessage}
                    <button className="" onClick={clearAlert}>
                        close
                    </button>
                </div>
            )}
            <div className="chat-container">
                {chatRequestPending && (
                    <div
                        className="pending-progress-bar request-pending"
                        style={{ width: "50%" }}
                    >
                        <LinearProgress
                            sx={{
                                "& .MuiLinearProgress-bar": {
                                    transitionDuration: "15s", // Adjust the duration as per your requirement
                                },
                            }}
                        />
                    </div>
                )}

                <div>
                    {!active ? (
                        <form
                            className="username-form"
                            onSubmit={handleFormSubmit}
                        >
                            <label className="username-label">
                                Username:
                                <input
                                    className="username-input"
                                    type="text"
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    value={userName}
                                    required
                                />
                            </label>
                            <button
                                className="username-submit-btn"
                                type="submit"
                            >
                                Join Page
                            </button>
                        </form>
                    ) : (
                        <div>
                            <div className="user-info">
                                <span>Chat ID: {chatId}</span>
                                <span>Active Users: {userCount}</span>
                                <span>User Name: {userName}</span>
                                <form
                                    className="renew-button"
                                    onClick={handleClearUser}
                                >
                                    <button type="submit">Renew</button>
                                </form>
                            </div>

                            <div className="create-rooms">
                                <div className="create-options">
                                    <button
                                        onClick={handleCreateOpenRoom}
                                        className="create-btn open"
                                    >
                                        Create Open Room
                                    </button>
                                    <button
                                        onClick={handleCreatePrivateRoom}
                                        className="create-btn private"
                                    >
                                        Create Private Room
                                    </button>
                                </div>
                            </div>

                            <div className="room-container">
                                <div className="existing-rooms room-card">
                                    <h2>Existing Rooms</h2>
                                    <div className="room-list">
                                        {rooms.map((room, index) => (
                                            <div
                                                key={index}
                                                className={`room ${
                                                    room.isPrivate
                                                        ? "private-room"
                                                        : "open-room"
                                                }`}
                                            >
                                                {room.hostId === chatId && (
                                                    <DeleteOutlineOutlinedIcon
                                                        onClick={() => {
                                                            handleDeleteRoom(
                                                                room.id
                                                            );
                                                        }}
                                                        className="room-remove"
                                                    />
                                                )}
                                                <div className="room-info">
                                                    <span className="room-name">
                                                        Name: {room.name}
                                                    </span>
                                                    <span className="room-id">
                                                        ID: {room.id}
                                                    </span>
                                                </div>
                                                <div className="lock-and-button-container">
                                                    {room.isPrivate && (
                                                        <div className="room-lock">
                                                            <LockOutlinedIcon />
                                                        </div>
                                                    )}
                                                    <button
                                                        className="join-btn"
                                                        onClick={() =>
                                                            handleJoinRoom(room)                                                  
                                                        
                                                        }
                                                    >
                                                        Join
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="existing-rooms room-card">
                                    <h2>Existing Users</h2>
                                    <div className="user-list">
                                        {users.map(
                                            (user) =>
                                                user.userName !==
                                                    myChat.name && (
                                                    <div
                                                        key={user.userName}
                                                        className="room current-users"
                                                    >
                                                        <span>
                                                            {user.userName}
                                                        </span>
                                                        <button
                                                            className="join-btn"
                                                            onClick={() =>
                                                                handleJoinChat({
                                                                    guestId:
                                                                        user.chatId,
                                                                    guestName:
                                                                        user.userName,
                                                                })
                                                            }
                                                        >
                                                            Chat
                                                        </button>
                                                    </div>
                                                )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="display-chat">
                    <Chat
                        myChat={myChat}
                        setMyChat={setMyChat}
                        socket={socket.current}
                        chatId={chatId}
                    />
                </div>
                <div className="display-chat">
                    <GroupChat
                        socket={socket.current}
                        chatId={chatId}
                        userName={userName}
                    />
                </div>
                <div>
                    {createRoom && (
                        <CreateRoom
                            socket={socket.current}
                            chatId={chatId}
                        ></CreateRoom>
                    )}
                </div>
            </div>
            {showChatConfirmation && (
                <Confirmation
                    host={chatParty.host}
                    socket={socket.current}
                    handleAnswer={handleConfirmation}
                    guest={chatParty.guest}
                ></Confirmation>
            )}
        </div>
    );
};

export default ChatRoom;
