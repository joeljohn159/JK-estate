import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading:false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
     reducers : {
        signInStart : (state) => {
            state.loading = true
        },
        signInSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;},
        signInFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        updateUserStart : (state, action) => {
            state.loading = true;
        },
        updateUserSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart : (state) => {
            state.loading = true;
        },
        deleteUserSuccess : (state, action) => {
            state.loading = false;
        },
        deleteUserFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
     }
})

export default userSlice.reducer;

export const {signInFailure, signInStart, signInSuccess, updateUserStart, updateUserFailure, updateUserSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure} = userSlice.actions;


