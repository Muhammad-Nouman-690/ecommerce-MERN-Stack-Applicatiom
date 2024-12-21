//define some basic store here  
//import functions to create store
//create store
//export the store or nested functions/reducers

import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartSlices"

const store = configureStore({
    reducer:{
        //add slices here
        cart: cartReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;