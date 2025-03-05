import { configureStore } from "@reduxjs/toolkit";
import reducerAuth from "../slice/auth/index";
import reducerChat from '../slice/chat/index';
import reducerProfile from "../slice/profile";
import reducerSettings from "../slice/settings";


const store = configureStore({
    reducer: {
        auth: reducerAuth,
        chat: reducerChat,
        profile: reducerProfile,
        settings: reducerSettings
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ["chat/setConversations", "chat/setMessages"],
            ignoredPaths: ['chat.conversationsData', 'chat.messages'],
          },
        }),
})  



export default store;

export type RootState = ReturnType<typeof store.getState>
    
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store