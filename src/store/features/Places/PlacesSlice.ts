import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPlaceApiResponse } from "../../../models/Places";

export interface IPlacesListState {
    places: IPlaceApiResponse
  }

const initialState: IPlacesListState = {
    places: null,
}

export const PlacesSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        setPlaces: (state, action: PayloadAction<IPlaceApiResponse>) => {
            state.places = action.payload
        },
        resetPlaces: (state) => {
            state.places = null;
        }
    }
})

export const {setPlaces, resetPlaces} = PlacesSlice.actions

export default PlacesSlice.reducer