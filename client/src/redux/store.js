import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userform/userslice";
import {persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key : 'user',
    storage,
    whitelist : ['user']
}

const reducers = combineReducers({
    user : userSlice,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const customMiddleWare = (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
})

export const store = configureStore({
    reducer : persistedReducer,
    middleware: customMiddleWare
})
