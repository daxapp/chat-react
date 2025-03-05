import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useActions } from "../useActions";
import { v4 } from "uuid";
import { useTypedSelector } from "../useTypedSelector";
import useAuth from "../useAuth/useAuth";
import useConversation from "../useConversation/useConversation";
import {IUseMessagesReturn} from './useMessages.type'
import { useCallback } from "react";


const useMessages = (): IUseMessagesReturn => {
    const {setLoadingMessage, setMessages} = useActions()
    const {photoUrl} = useTypedSelector(state => state.profile)
    const {currentUser} = useTypedSelector(state => state.auth)
    const {currentCompanion} = useTypedSelector(state => state.chat)
    const {firestore} = useAuth()
    const {createConversationId, conversations} = useConversation();

    const posibleConversationIds: string[] = [
        createConversationId(currentUser?.uid, currentCompanion), 
        createConversationId(currentCompanion, currentUser?.uid)
    ];

    const sendMessageInConversation = async function (value: string) {
        setLoadingMessage(true);
        if (value.trim() === "") {
            setLoadingMessage(false);
            return; 
        }

        const timeStemp = new Date().toISOString();

        for (let conversationId of posibleConversationIds) {
            let conversationRef = doc(firestore, "Conversations", conversationId);
            let conversationSnap = await getDoc(conversationRef)

            if (conversationSnap.exists()) {
                setMessages(conversationSnap.data().messages)
                await updateDoc(conversationRef, {
                    messages: arrayUnion({
                        uidSender: currentUser?.uid,
                        displayName: currentUser?.changedName ? currentUser.changedName : currentUser?.displayName,
                        photoUrl: currentUser?.changedPhoto || photoUrl,
                        text: value.trim(),
                        createdAt: timeStemp,
                        messageId: v4()
                    }),
                    lastMessage: {
                        text: value,
                        createdAt: timeStemp,
                        user: currentUser?.uid
                    },
                    lastMessageTime: timeStemp
                });
                setLoadingMessage(false)
            }
        }
    }
    
    const getMessages = useCallback(async function() {
        for (let conversationId of posibleConversationIds) {
            let conversationRef = doc(firestore, "Conversations", conversationId);
            let conversationSnap = await getDoc(conversationRef)
            if (conversationSnap.exists()) {
                setMessages(conversationSnap.data().messages);
            }
        }
    }, [currentCompanion, conversations])

    return {sendMessageInConversation, getMessages}
}

export default useMessages;