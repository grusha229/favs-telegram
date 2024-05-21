import { createSlice } from "@reduxjs/toolkit";


export type TRoles  = 'manager' | 'executor' | 'admin' | null

export interface IAuthState {
    token: string;
    telegramID: number;
  }

const initialState: IAuthState = {
    token: null,
    telegramID: null,
}

export const AuthSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUser: (state, action) => {
            state.telegramID = action.payload
        },
        resetToken: (state) => {
            state.token = null;
        },
        resetUser: (state) => {
            state.telegramID = null;
        }
    }
})

export const {setToken, setUser, resetToken, resetUser} = AuthSlice.actions

export default AuthSlice.reducer