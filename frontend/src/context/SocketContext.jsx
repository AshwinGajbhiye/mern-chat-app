import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:3000", {
                query: {
                    userId: authUser._id,
                },
                withCredentials: true, // Ensure cookies are sent with requests
            });

            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => {
                socket.off("getOnlineUsers"); // Cleanup the event listener
                socket.close(); // Close the socket connection
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
