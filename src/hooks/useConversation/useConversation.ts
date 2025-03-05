import { collection, doc, query, setDoc, where } from "@firebase/firestore";
import IUseConversationReturn, {ReturnCheckUser} from "./useConversation.type";
import useAuth from "../useAuth/useAuth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useHttp from "../useHttp/useHttp";

const useConversation = (): IUseConversationReturn => {
    const {user, firestore} = useAuth();
    const {users} = useHttp()

    const conversationsQuery = query(
        collection(firestore, "Conversations"),
        where("participants", "array-contains", user?.uid)
    );

    const [conversations] = useCollectionData(conversationsQuery);

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

    const onAddConversation = async (value: string | undefined) => {
        if (!value) {
            return false
        } 
        const {res, code} = await checkPresentsUser(value);

        if (!!user && res) {    
            addConversation(user?.uid, code);
            return true
        } else {
            return false;
        }
    }

    return {onAddConversation, createConversationId, checkPresentsUser, addConversation, conversations}
}

export default useConversation;