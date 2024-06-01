import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPlaceApiResponse } from "../../../models/Places";

export interface ICurrentPlace {
    name: string,
    id: string,
}

export interface IPlacesListState {
    places: IPlaceApiResponse
    current: ICurrentPlace,
}

const initialState: IPlacesListState = {
    places: null,
    current: null,
}

export const PlacesSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        setCurrentPlace: (state, action: PayloadAction<ICurrentPlace>) => {
            state.current = action.payload
        },
        resetCurrentPlace: (state) => {
            state.current = null
        },
        setPlaces: (state, action: PayloadAction<IPlaceApiResponse>) => {
            state.places = action.payload
        },
        resetPlaces: (state) => {
            state.places = null;
        }
    }
})

export const {setCurrentPlace, resetCurrentPlace, setPlaces, resetPlaces} = PlacesSlice.actions

export default PlacesSlice.reducer