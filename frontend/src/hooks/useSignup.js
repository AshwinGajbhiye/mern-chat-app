import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const useSignup = () => {
    const [loading, setLoading] = useState(false); 

    const {setAuthUser} = useAuthContext();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        // Input validation
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);  // Only set loading after input validation
        try {
            const res = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error); // Catch server-side errors
            }

            if (res.ok) {
                toast.success("Signup successful!");
                localStorage.setItem("chat-user", JSON.stringify(data)); 
                setAuthUser(data);

                
            } else {
                toast.error(data.message || "Signup failed");
            }

        } catch (error) {
            toast.error(error.message); // Catch network or parsing errors
        } finally {
            setLoading(false); // Ensure loading is stopped after request completes
        }
    };

    return { loading, signup }; 
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }
    return true;
}
