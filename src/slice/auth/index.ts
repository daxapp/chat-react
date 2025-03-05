import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFruit } from "../../components/specific/changePhotoModal/changePhotoModal";

export interface ICurrentUser {
    changedName: string;
    changedPhoto: IFruit;
    displayName: string;
    email: string;
    lastActive: number;
    uid: string;
    phoneNumber: number | undefined;
}

export interface IAuthState {
    currentUser: ICurrentUser | null;
}

const initialState: IAuthState = {
    currentUser: null,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<ICurrentUser>) => {
            state.currentUser = action.payload;
        },
        clearAuthState: () => {
            return initialState
        }
    }
})
const {reducer, actions} = slice
const reducerAuth = reducer;
export default reducerAuth ;

export const {
    setCurrentUser,
    clearAuthState
} = actions