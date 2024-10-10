import { create } from 'zustand';
import mongoose from 'mongoose';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),

}));

export default useConversation;
