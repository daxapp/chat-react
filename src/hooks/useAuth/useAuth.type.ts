import { User } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { storage } from '../../firebase'

export default interface IUseAuthReturn {
    user: User | null | undefined;
    loading: boolean;
    login: () => Promise<void>;
    exit: () => Promise<void>;
    firestore: Firestore;
    storage: typeof storage
}