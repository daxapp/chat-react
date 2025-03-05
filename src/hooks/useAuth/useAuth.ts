import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import IUseAuthReturn from "./useAuth.type";
import { useCallback } from "react";
import { useActions } from "../useActions";
import {auth, firestore, storage} from '../../firebase'


const useAuth = (): IUseAuthReturn => {
    const [user, loading] = useAuthState(auth);
    const {clearAuthState, clearProfileState, clearChatState} = useActions()


    const login = useCallback(async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (e) {
            console.error("Login failed:", e);
        }
    }, []);

    const exit = useCallback(async () => {
        await signOut(auth);
        clearAuthState()
        clearProfileState()
        clearChatState()
    }, [clearAuthState, clearChatState, clearProfileState])

    return {user, login, exit, loading, firestore, storage} as const
};

export default useAuth;


