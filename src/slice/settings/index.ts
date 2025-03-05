import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ISettingsState, {FontFamily} from "./type";


const initialState: ISettingsState = {
    textSize: '14',
    fontFamily: FontFamily.Default,
    isCtrl: true
}

const slice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTextSize: (state: ISettingsState, action: PayloadAction<string>) => {
            state.textSize = action.payload;
        },
        setFontFamily: (state: ISettingsState, action: PayloadAction<FontFamily>) => {
            state.fontFamily = action.payload;
        },
        setIsCtrl: (state: ISettingsState) => {
            state.isCtrl = !state.isCtrl;
        }
    }

})

const {reducer, actions} = slice;

const reducerSettings = reducer;
export default reducerSettings;

export const {
    setTextSize,
    setFontFamily,
    setIsCtrl
} = actions