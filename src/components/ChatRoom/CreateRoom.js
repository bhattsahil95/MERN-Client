import React, { useState } from "react";
import useChatRoomStore from "../../chatRoomStore.js";
import { v4 as uuidv4 } from "uuid";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const CreateRoom = ({ socket, chatId, type }) => {
    const [roomName, setRoomName] = useState("");
    const [roomKey, setRoomKey] = useState("");
    const { rooms, addRoom, setCreateRoom, isPrivateRoom, setIsPrivateRoom } =
        useChatRoomStore();

    const reset = () => {
        setCreateRoom(false);
        setRoomName("");
        setIsPrivateRoom(false);
    };

    const handleCreateRoom = () => {
        if (roomName.trim() === "") {
            alert("Please enter a room name.");
            return;
        }

        if (rooms.some((room) => room.name === roomName)) {
            alert(`A room with the same name already exists.`);
            return;
        }

        const roomId = uuidv4();

        // Assuming you have a function to generate unique room IDs
        const newRoom = {
            id: roomId,
            name: roomName,
            hostId: chatId,
            isPrivate: isPrivateRoom ? true : false,
            roomKey: isPrivateRoom ? roomKey : null,
        };

        addRoom(newRoom);
        reset();

        socket.emit("updateRoom", newRoom);

        // You can redirect the user to the newly created room or perform other actions
    };

    return (
        <div className="create-room-box">
            <h2>Create a New Room </h2>
            <label className="room-name-label" htmlFor="roomName">
                Room Name:
                <input
                    className="room-name-input"
                    type="text"
                    id="roomName"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
            </label>

            {isPrivateRoom && (
                <div>
                    <label className="room-key-label" htmlFor="roomKey">
                        Room Key:
                        <input
                            className="room-key-input"
                            type="text"
                            id="roomKey"
                            value={roomKey}
                            onChange={(e) => setRoomKey(e.target.value)}
                        />
                    </label>
                </div>
            )}
            <button className="create-room-btn" onClick={handleCreateRoom}>
                Create Room
            </button>
            <CancelOutlinedIcon
                className="create-room-cancel-btn"
                onClick={reset}
            />
        </div>
    );
};

export default CreateRoom;
