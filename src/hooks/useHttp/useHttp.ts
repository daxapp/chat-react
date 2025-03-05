import {  doc, setDoc } from "firebase/firestore";
import IUseHttpReturn, { ReturnCheckUser } from "./useHttp.type";
import useAuth from "../useAuth/useAuth";
import useUser from "../useUser/useUser";

const useHttp = (): IUseHttpReturn => {
    const {user, firestore} = useAuth();
    const {users} = useUser()

    const addConversation = async (user1:string, user2:string): Promise<void>  => {
        await setDoc(doc(firestore, "Conversations", createConversationId(user1, user2)), {
            participants: [user1, user2],
            lastMessageTime: new Date()
        }) 
    }

    const checkPresentsUser = async (id: string): Promise<ReturnCheckUser> => {
        let res = false
        let code = '';
        users?.forEach(item => {
            if (item?.uid.includes(id) && !item?.uid.includes()) {
                res = true;
                code = item.uid;
            }
        }) 
        return {res, code};
    }

    const createConversationId = (user1:string | undefined | null, user2:string | null | undefined): string =>  {
        return `${user1?.slice(0, 6)}_${user2?.slice(0, 6)}`;
    }

    return {users, createConversationId, checkPresentsUser, addConversation}

};

export default useHttp;
