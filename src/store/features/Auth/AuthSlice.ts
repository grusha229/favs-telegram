import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type TRoles  = 'manager' | 'executor' | 'admin' | null

export interface IAuthState {
    isAuth: boolean,
    id: string | null,
    name: string | null,
    surname: string | null,
    role: TRoles;
  }

const initialState: IAuthState = {
    isAuth: false,
    id: null,
    name: null,
    surname: null,
    role: null
}

export const AuthSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setAuthentication: (state, action) => {
            state.isAuth = true;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.role = action.payload.role
        },
        resetAuthentication: (state) => {
            state.isAuth = false;
        }
    }
})

export const {setAuthentication, resetAuthentication} = AuthSlice.actions

export default AuthSlice.reducer