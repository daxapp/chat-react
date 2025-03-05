import { collection, doc, query, setDoc, updateDoc } from "firebase/firestore"
import useAuth from "../useAuth/useAuth"
import { useTypedSelector } from "../useTypedSelector";
import { FruitName } from "../../components/specific/changePhotoModal/changePhotoModal";
import { useCallback, useEffect } from "react";
import IUseUserReturn from "./useUser.type";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ICurrentUser } from "../../slice/auth";
import { useActions } from "../useActions";

const useUser = (): IUseUserReturn => {
    const {user, firestore} = useAuth();
    const {currentUser} = useTypedSelector(state => state.auth);
    const {name, photoUrl} = useTypedSelector(state => state.profile);
    const {setCurrentUser} = useActions()

    const userQuery = query(
        collection(firestore, "Users"),
    );

    const [users] = useCollectionData(userQuery);

    useEffect(() => {
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (user?.uid === users[i].uid) {
                    setCurrentUser(users[i] as ICurrentUser)
                }
            }
            
        }
    }, [users, user?.uid, name])

    const addUser =  useCallback(async () => {
        if (!user) {
            return
        } 
        try {
            await updateDoc(doc(firestore, "Users" , user?.uid), {
                ...currentUser,
                displayName: user?.displayName,
                email: user?.email,
                uid: user?.uid
            })
        } catch(e) {
            await setDoc(doc(firestore, "Users" , user?.uid), {
                ...currentUser,
                displayName: user?.displayName,
                email: user?.email,
                uid: user?.uid
            })
        }
    }, [user, currentUser])

    const changeName = async () => {
        if (!user ) {
            return
        } 

        await updateDoc(doc(firestore, "Users" , user?.uid), {
            changedName: name
        })
    }
        
    const changePhoto = async () => {
        if (!user || photoUrl.name === FruitName.Default) {
            return
        }

        await updateDoc(doc(firestore, 'Users', user?.uid), {
            changedPhoto: photoUrl
        })
    }

    useEffect(() => {
        addUser()
    }, [user, addUser])

    return {addUser, changeName, changePhoto, users}
}

export default useUser;