import { create } from "zustand";

const useChatRoomStore = create((set) => ({
    // States
    messages: [],
    rooms: [],
    roomMessages: [],
    createRoom: false,
    isPrivateRoom: false,
    activeRoom: null,
    activeRoomPrivate: false, // 'public' or 'private'

    //State Actions

    setIsPrivateRoom: (value) => set({ isPrivateRoom: value }),
    setCreateRoom: (value) => set({ createRoom: value }),

    appendMessage: (newMessage) =>
        set((state) => ({ messages: [...state.messages, newMessage] })),
    clearMessages: () => set({ messages: [] }),

    appendRoomMessage: (newRoomMessage) =>
        set((state) => ({
            roomMessages: [...state.roomMessages, newRoomMessage],
        })),
    clearRoomMessages: () => set({ roomMessages: [] }),

    setRooms: (nextRooms) => set({ rooms: nextRooms || [] }),

    addRoom: (newRoom) =>
        set((state) => {
            const incomingRooms = Array.isArray(newRoom) ? newRoom : [newRoom];
            const mergedRooms = [...state.rooms];

            incomingRooms.forEach((room) => {
                if (!mergedRooms.some((existingRoom) => existingRoom.id === room.id)) {
                    mergedRooms.push(room);
                }
            });

            return { rooms: mergedRooms };
        }),

    deleteRoom: (roomId) =>
        set((state) => ({
            rooms: state.rooms.filter((room) => room.id !== roomId),
        })),

    setActiveRoom: (room) => set({ activeRoom: room }),
    setActiveRoomPrivate: (isPrivate) =>
        set({ activeRoomPrivate: isPrivate }),
}));

export default useChatRoomStore;
