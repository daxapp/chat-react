import { DocumentData } from "firebase/firestore";

export default interface IUseUserReturn {
    changeName: () => Promise<void>;
    changePhoto: () => Promise<void>;
    addUser: () => Promise<void>;
    users: DocumentData[] | undefined;
}