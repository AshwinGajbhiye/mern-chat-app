import React, { useState } from 'react';
import useConversation from '../zustand/useConversations';
import toast from 'react-hot-toast';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        // Check if selectedConversation exists before proceeding
        if (!selectedConversation) {
            toast.error("No conversation selected.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
                credentials: 'include' // Include cookies (JWT) with the request
            });

            // Check for non-200 response status codes
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            const data = await res.json();

            // Assuming the data contains the new message
            setMessages([...messages, data]);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
