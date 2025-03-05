import { DocumentData } from "firebase/firestore";

export interface ReturnCheckUser {
    res:boolean;
    code: string;
}

export default interface IUseConversationReturn {
    addConversation: (user1: string, user2: string) => Promise<void>;
    checkPresentsUser: (id: string) => Promise<ReturnCheckUser>;
    createConversationId: (user1: string| undefined| null, user2: string | null | undefined) => string;
    onAddConversation: (value: string | undefined) => Promise<boolean>;
    conversations: DocumentData[] | undefined;
}