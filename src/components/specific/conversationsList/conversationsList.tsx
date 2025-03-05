import { FC, memo, useEffect } from "react"
import ConversationsTools from "../conversationsTools/conversationsTools";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useAuth from "../../../hooks/useAuth/useAuth";
import ChatListItem from "../chatListItem/chatListItem";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import Modal from "../addConversationModal/addConversationModal";
import useHttp from "../../../hooks/useHttp/useHttp";
 
const ConversationsList:FC = memo(() => {
    const {user, firestore} = useAuth() 
    const {users} = useHttp()
    const {setConversations} = useActions()
    const {currentCompanion, conversationFilterWorld, isModal} = useTypedSelector(state => state.chat)

    const conversationsData = useTypedSelector(state => state.chat.conversationsData);

    const conversationsQuery = query(
        collection(firestore, "Conversations"),
        where("participants", "array-contains", user?.uid)
    );

    const [conversations] = useCollectionData(conversationsQuery);

    const filteredConversation = conversations?.filter(({ participants }) => {
        if (conversationFilterWorld.trim() === '') {
            return true;
        }
        participants = participants.filter((item: string) => item !== user?.uid);
        const data = users?.filter(item => item.uid === participants[0])[0];
        return new RegExp(conversationFilterWorld, 'i').test(data?.changedName ? data?.changedName : data?.displayName)
    });
    
    useEffect(() => {
        if (filteredConversation?.length === 1) {
            setConversations(filteredConversation);
            return
        }

        const sortedConversations = filteredConversation?.sort((a, b) => {
            return Date.parse(b.lastMessageTime) - Date.parse(a.lastMessageTime)
        });

        setConversations(sortedConversations);
    }, [conversationFilterWorld,]);

    useEffect(() => {
        setConversations(filteredConversation)
    }, [conversations])


    return (
        <>
            {isModal ? <Modal/> : null}
            <ConversationsTools/>
            <ul className="chat__wrap">
                {conversationsData?.map(({participants, lastMessage}) =>  {
                    participants = participants.filter((item: string) => item !== user?.uid)
                    let data = users?.filter(item => item.uid === participants[0])[0];
                    if (data) {
                        return <ChatListItem 
                            key={data.uid} 
                            companion={participants[0]}     
                            ava={data.changedPhoto}
                            active={participants[0] === currentCompanion}
                            name={data.changedName ? data.changedName : data.displayName}
                            time={lastMessage?.createdAt
                                ? new Date(lastMessage.createdAt).toLocaleTimeString().slice(0, -3)
                                : ''}
                            lastMessage={lastMessage?.text || ''}
                            isYou={lastMessage?.user === user?.uid || false}
                            />
                    }   
                    return null
                })} 
            </ul>
        </>
    )
});

export default ConversationsList;
