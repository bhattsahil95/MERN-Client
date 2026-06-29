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
        clearRoomMessages,
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
    const [joinRoomModal, setJoinRoomModal] = useState({ open: false, room: null });
    const [roomPassword, setRoomPassword] = useState("");

    const socket = useRef();
    const chatIdRef = useRef(chatId);
    const roomsRef = useRef(rooms);
    const activeRoomRef = useRef(activeRoom);
    const userNameRef = useRef(userName);

    useEffect(() => {
        chatIdRef.current = chatId;
    }, [chatId]);

    useEffect(() => {
        roomsRef.current = rooms;
    }, [rooms]);

    useEffect(() => {
        activeRoomRef.current = activeRoom;
    }, [activeRoom]);

    useEffect(() => {
        userNameRef.current = userName;
    }, [userName]);

    const cleanupPresence = () => {
        if (!socket.current || !chatIdRef.current || !userNameRef.current) {
            return;
        }

        if (activeRoomRef.current) {
            socket.current.emit("leaveRoom", activeRoomRef.current.id);
        }

        socket.current.emit("removeChatUser", {
            chatId: chatIdRef.current,
            userName: userNameRef.current,
        });
    };

    useEffect(() => {
        const storedUserData = sessionStorage.getItem("userData");
        const activeChat = sessionStorage.getItem("activeChat");

        if (!socket.current) {
            socket.current = io(`${process.env.REACT_APP_BASE_URL || "http://localhost:5500/"}chatroom`, {
                transports: ["websocket"],
                reconnection: true,
                withCredentials: true,
            });
        }

        socket.current.on("connect", () => {
            if (storedUserData) {
                const { chatId, userName } = JSON.parse(storedUserData);
                socket.current.emit("newChatUser", { chatId, userName });
                socket.current.emit("map-audit", { chatId });
            }

            if (activeChat) {
                socket.current.emit("retriveChat", activeChat);
            }

            if (activeRoomRef.current) {
                socket.current.emit("joinRoom", { roomId: activeRoomRef.current.id });
            }
        });

        if (storedUserData) {
            const { userName, chatId } = JSON.parse(storedUserData);
            setUserName(userName);
            setChatID(chatId);
            setActive(true);
        }

        socket.current.on("userUpdate", ({ type, who, users: incomingUsers }) => {
            const storedUserData = sessionStorage.getItem("userData");
            const currentId = storedUserData
                ? JSON.parse(storedUserData).chatId
                : null;

            if (who?.chatId !== currentId) {
                if (type === "add" && who) {
                    toast.success(`User Joined: ${who.userName}`);
                } else if (type === "remove" && who) {
                    toast.error(`User Left: ${who.userName}`);
                }
            }

            const normalizedUsers = (incomingUsers || [])
                .filter(Boolean)
                .filter((user) => user.chatId !== currentId)
                .filter((user, index, list) => list.findIndex((entry) => entry.chatId === user.chatId) === index);

            setUsers(normalizedUsers);
            setUserCount(normalizedUsers.length);
        });

        socket.current.on("receiveMessage", (messageData) => {
            appendMessage(messageData);
        });

        socket.current.on("receiveChatRequest", ({ host, guest }) => {
            setShowChatConfirmation(true);
            setChatParty({ host, guest });
        });

        socket.current.on("chatRequestAccept", ({ host, guest }) => {
            setChatRequestPending(false);
            setMyChat(guest || host);
            clearMessages();
            toast.success(`${guest?.name || host?.name} accepted your request`);
            sessionStorage.setItem("activeChat", guest?.id || host?.id);
        });

        socket.current.on("chatRequestDecline", ({ guest }) => {
            setChatRequestPending(false);
            toast.warning(`${guest?.name || "The other user"} declined your request.`);
        });

        socket.current.on("chatRequestAccepted", ({ host }) => {
            setChatRequestPending(false);
            setMyChat(host);
            clearMessages();
            toast.success(`Chat started with ${host?.name || "the other user"}`);
            sessionStorage.setItem("activeChat", host?.id);
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
        socket.current.on("roomUpdate", (roomsList) => {
            addRoom(roomsList);
        });

        socket.current.on("addRoom", (newRoom) => {
            if (newRoom.hostId !== chatIdRef.current) {
                addRoom(newRoom);
                toast.info(`Room added: ${newRoom.name}`);
            }
        });

        socket.current.on("joinRoomError", ({ message }) => {
            toast.error(message || "Unable to join room.");
        });

        socket.current.on("roomJoined", ({ roomId, roomName }) => {
            const joinedRoom = roomsRef.current.find((room) => room.id === roomId);
            if (joinedRoom) {
                setActiveRoom(joinedRoom);
                toast.success(`Joined ${roomName}`);
            }
        });

        socket.current.on("deleteRoom", (roomId) => {
            deleteRoom(roomId);
            toast.info("Room Deleted");
        });

        const handlePageLeave = () => {
            cleanupPresence();
        };

        window.addEventListener("beforeunload", handlePageLeave);
        window.addEventListener("pagehide", handlePageLeave);

        return () => {
            window.removeEventListener("beforeunload", handlePageLeave);
            window.removeEventListener("pagehide", handlePageLeave);
            cleanupPresence();
            if (socket.current) {
                socket.current.disconnect();
            }
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
        setActiveRoom(null);
        clearRoomMessages();
        setCreateRoom(false);
        setIsPrivateRoom(false);

        setActive(true);
        socket.current.emit("newChatUser", {
            chatId: newChatId,
            userName: userName,
        });
    };

    const handleClearUser = () => {
        if (socket.current && chatId && userName) {
            cleanupPresence();
        }

        setActive(false);
        setUsers([]);
        setUserCount(0);
        setChatRequestPending(false);
        setMyChat(false);
        setAlertMessage(null);
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("activeChat");
        clearMessages();
        clearRoomMessages();
        setActiveRoom(null);
        setCreateRoom(false);
        setIsPrivateRoom(false);
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
            sessionStorage.setItem("activeChat", chatParty.host.id);
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
        if (room.isPrivate) {
            setJoinRoomModal({ open: true, room });
            setRoomPassword("");
            return;
        }

        socket.current.emit("joinRoom", { roomId: room.id });
        setActiveRoom(room);
    };

    const closeJoinRoomModal = () => {
        setJoinRoomModal({ open: false, room: null });
        setRoomPassword("");
    };

    const handleRoomPasswordSubmit = (e) => {
        e.preventDefault();

        const room = joinRoomModal.room;
        const password = roomPassword.trim();

        if (!room) return;

        if (!password) {
            setAlertMessage("A password is required to join this private room.");
            return;
        }

        if (password !== room.roomKey?.trim()) {
            setAlertMessage("Incorrect password. Unable to join the room.");
            return;
        }

        socket.current.emit("joinRoom", {
            roomId: room.id,
            roomKey: password,
        });
        setActiveRoom(room);
        closeJoinRoomModal();
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
                                                <div className="room-info">
                                                    <span className="room-name">
                                                        {room.name}
                                                    </span>
                                                    <span className="room-id">
                                                        Room ID: {room.id}
                                                    </span>
                                                </div>
                                                <div className="lock-and-button-container">
                                                    {room.isPrivate && (
                                                        <div className="room-lock">
                                                            <LockOutlinedIcon />
                                                        </div>
                                                    )}
                                                    {room.hostId === chatId && (
                                                        <button
                                                            type="button"
                                                            className="room-remove"
                                                            aria-label="Delete room"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteRoom(room.id);
                                                            }}
                                                        >
                                                            <DeleteOutlineOutlinedIcon fontSize="small" />
                                                        </button>
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
                                        {users.map((user) => {
                                            if (!user?.chatId || user.chatId === chatId) {
                                                return null;
                                            }

                                            return (
                                                <div
                                                    key={user.chatId}
                                                    className="room current-users"
                                                >
                                                    <span>{user.userName}</span>
                                                    <button
                                                        className="join-btn"
                                                        onClick={() =>
                                                            handleJoinChat({
                                                                guestId: user.chatId,
                                                                guestName: user.userName,
                                                            })
                                                        }
                                                    >
                                                        Chat
                                                    </button>
                                                </div>
                                            );
                                        })}
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

            {joinRoomModal.open && joinRoomModal.room && (
                <div className="room-password-modal-overlay">
                    <div className="room-password-modal">
                        <h3>Enter room password</h3>
                        <p>{joinRoomModal.room.name}</p>
                        <input
                            className="room-password-input"
                            type="password"
                            placeholder="Password"
                            value={roomPassword}
                            onChange={(e) => setRoomPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleRoomPasswordSubmit(e);
                                }
                            }}
                        />
                        <div className="room-password-modal-actions">
                            <button
                                type="button"
                                className="room-password-cancel"
                                onClick={closeJoinRoomModal}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="room-password-submit"
                                onClick={handleRoomPasswordSubmit}
                            >
                                Join room
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRoom;
