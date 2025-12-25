import { configureStore } from "@reduxjs/toolkit";
import compteReducer from "./../Features/compteReducer";
export const store = configureStore({
    reducer: {
        compte: compteReducer
    }
})