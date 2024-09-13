import {create} from 'zustand';

export const useSelectedConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => {set({selectedConversation: conversation})},
    messages: [],
    setMessages: (messages) => {set({messages: messages})}
}))