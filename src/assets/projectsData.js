const projects = [
    {
        id: "keeper-notes",
        title: "Keeper Notes",
        shortLabel: "Keeper Notes",
        description:
            "Google Keep-inspired notes app with drag-and-drop organization, local persistence, and a responsive UI.",
        route: "/notes",
        tech: ["React", "CSS", "Local Storage"],
        accent: "#22c55e",
        icon: "📝",
        featured: true,
        year: 2024,
    },
    {
        id: "mern-notes",
        title: "MERN Notes Dashboard",
        shortLabel: "MERN Notes",
        description:
            "Full-stack notes platform with MongoDB, REST API integration, and persistent cloud storage.",
        route: "/mern-notes",
        tech: ["React", "Node.js", "MongoDB", "Express"],
        accent: "#3b82f6",
        icon: "🗂️",
        featured: true,
        year: 2024,
    },
    {
        id: "weather-api",
        title: "Weather API Explorer",
        shortLabel: "Weather API",
        description:
            "Interactive weather lookup with debounced API calls, search history, rate limiting, and JSON inspection.",
        route: "/api",
        tech: ["React", "Axios", "OpenWeather"],
        accent: "#eab308",
        icon: "🌤️",
        featured: true,
        year: 2024,
    },
    {
        id: "api-server",
        title: "REST API Server Demo",
        shortLabel: "API Server",
        description:
            "Live data fetch from a Node.js/Express backend — client-server architecture in action.",
        route: "/apiserver",
        tech: ["React", "Node.js", "Express", "Axios"],
        accent: "#a855f7",
        icon: "⚡",
        featured: false,
        year: 2023,
    },
    {
        id: "chatroom",
        title: "Real-Time Chat Room",
        shortLabel: "Chat Room",
        description:
            "Socket.io chat with room creation, private messaging, group chats, and live user presence.",
        route: "/chatroom",
        tech: ["React", "Socket.io", "Node.js", "Zustand"],
        accent: "#f97316",
        icon: "💬",
        featured: true,
        year: 2024,
    },
];

export const featuredProjects = projects.filter((p) => p.featured);

export default projects;
