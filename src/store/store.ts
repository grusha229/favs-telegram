import AuthSlice, { IAuthState } from './features/Auth/AuthSlice';
import PlacesSlice, { IPlacesListState } from './features/Places/PlacesSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit'

export interface IStateInterface {
    placesList: IPlacesListState,
    authentication: IAuthState,
  }

const rootReducer = combineReducers({
    placesList: PlacesSlice,
    authentication: AuthSlice,
})

export const store = configureStore({
    reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch