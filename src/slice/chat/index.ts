import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMessage {
    createdAt: Date;
    displayName: string;
    messageId: string;
    photoUrl: {
        img: string;
        name: string;
    };
    text: string;
    uidSender: string
}

export interface IChatState {
    currentCompanion: null | string;
    messages: IMessage[];
    loadingMessage: boolean;
    conversationsData: any[] | undefined;
    conversationFilterWorld: string;
    isModal: boolean;
}

const initialState: IChatState = {
    currentCompanion: null,
    messages: [],
    loadingMessage: false,
    conversationsData: [],
    conversationFilterWorld: '',
    isModal: false
}

const slice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentCompanion: (state: IChatState, action: PayloadAction<string>) => {
            state.currentCompanion = action.payload;
        },
        setMessages: (state: IChatState, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload
        },
        setLoadingMessage: (state, action: PayloadAction<boolean>) => {
            state.loadingMessage = action.payload
        },
        setConversations: (state: IChatState, action: PayloadAction<any[] | undefined>) => {
            state.conversationsData = action.payload
        },
        setConversationsFilterWord: (state, action: PayloadAction<string>) => {
            state.conversationFilterWorld = action.payload
        },
        setIsModal: (state, action: PayloadAction<boolean>) => {
            state.isModal = action.payload;
        },
        clearChatState: () => {
            return initialState
        }
    }
})
const {reducer, actions} = slice
const reducerChat = reducer;
export default reducerChat;

export const {
    setCurrentCompanion,
    setMessages,
    setLoadingMessage,
    setConversations,
    setConversationsFilterWord,
    setIsModal,
    clearChatState
} = actions