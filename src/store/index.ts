import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk]
});