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

    addRoom: (newRoom) =>
        set((state) => ({
            rooms: Array.isArray(newRoom)
                ? [...state.rooms, ...newRoom]
                : [...state.rooms, newRoom],
        })),

    deleteRoom: (roomId) =>
        set((state) => ({
            rooms: state.rooms.filter((room) => room.id !== roomId),
        })),

    setActiveRoom: (room) => set({ activeRoom: room }),
    setActiveRoomPrivate: (isPrivate) =>
        set({ activeRoomPrivate: isPrivate }),
}));

export default useChatRoomStore;
