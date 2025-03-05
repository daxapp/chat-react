import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import defaultAva from "../../assets/img/default-ava.png"
import { IFruit, FruitName } from "../../components/specific/changePhotoModal/changePhotoModal";

interface IProfileState {
    name: null | string;
    phoneNumber: string;
    email: string;
    photoUrl: IFruit;
}

const initialState: IProfileState = {
    name: null,
    phoneNumber: '',
    email: '',
    photoUrl: {name:FruitName.Default, img: defaultAva},
}

const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setName: (state: IProfileState , action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setPhotoUrl: (state: IProfileState , action: PayloadAction<IFruit>) => {
            state.photoUrl = action.payload;
        },
        setDefaultPhoto: (state: IProfileState) => {
            state.photoUrl = {name:'', img: defaultAva}
        },
        clearProfileState: () => {
            return initialState
        }
    }
});

const {reducer, actions} = slice;
const reducerProfile = reducer;
export default reducerProfile;
export const {
    setName,
    setPhotoUrl,
    clearProfileState,
    setDefaultPhoto
} = actions;
