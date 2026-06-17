import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

function TestPage() {
    const socket = io(`${process.env.REACT_APP_BASE_URL}test`);
    const [users] = useState([]);

    useEffect(() => {
        socket.emit("message", { sourcePage: "/test" });

        socket.emit("testEvent", {
            userId: socket.id,
            sourcePage: "/test",
            amount: 100,
        });

        socket.emit("testerJoin", () => {
            toast.info("tester joined");
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <div>
            <h1>Test Page</h1>
            {users.map((user) => {
                return <h2>{user.userId}</h2>;
            })}
        </div>
    );
}

export default TestPage;
