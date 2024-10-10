import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const useGetConversations = () => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                console.log('Fetching conversations from /api/users');
                
                const res = await axios.get('http://localhost:3000/api/users', {
                    withCredentials: true, // This ensures cookies are sent with the request
                });

                // Check if the response is successful
                if (res.status !== 200) {
                    throw new Error('Failed to fetch conversations'); // Handle HTTP errors
                }
                
                const data = res.data; // Axios automatically parses JSON
                if (data.error) {
                    throw new Error(data.error); // Handle API errors
                }
                
                setConversations(data);
            } catch (error) {
                toast.error(error.message); // Display error toast
            }
        };

        getConversations();
    }, []);

    return { conversations }; // Return the conversations
};

export default useGetConversations;
