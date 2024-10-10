import React, { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversations';
import toast from 'react-hot-toast';
import axios from 'axios';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:3000/api/messages/${selectedConversation._id}`, {
                    withCredentials: true, // Ensures cookies (like JWT) are included
                });

                // Axios already parses JSON, so no need to call res.json()
                const data = res.data;
                if (data.error) throw new Error(data.error);
                
                // Update the messages state
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Fetch messages only if a conversation is selected
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id]); // No need to include setMessages in the dependencies

    return { messages, loading };
};

export default useGetMessages;
