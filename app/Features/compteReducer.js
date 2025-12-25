import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    solde : 0,
    transactions : [],
    error : null
};
export const compteSlice = createSlice({
    name: "compte",
    initialState,
    reducers: {
       deposit(state,action){
        state.solde += action.payload ;
        state.transactions.push({id : Date.now(),type : "deposit",amount : action.payload})
        state.error = null; 
       },
       withdraw(state,action){
        if(state.solde >= action.payload){
            state.solde -= action.payload ;
             state.transactions.push({id : Date.now(),type : "withdraw",amount : action.payload})
        }else{
            state.error = "Solde insuffisant";
        }
       
       },
       resetAccount(state){
        state.solde = 0 ;
        state.transactions = [] ;
         state.error = null;
       }
    }
})
export const {deposit,withdraw,resetAccount} = compteSlice.actions;
export default compteSlice.reducer