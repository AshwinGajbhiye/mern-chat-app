import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });


            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.removeItem("chat-user");
            
            console.log("user info removes from localstotarge")
            setAuthUser(null);
            toast.success("Logout successful!"); // Optional: Success message

        } catch (error) {
            toast.error(error.message || "An error occurred during logout");
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;
