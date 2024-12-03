import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lastPost: null,
    status: false,
};

const postSlice = createSlice({
    name: "Blog",
    initialState,
    reducers: {
        setLastPost: (state, action) => {
            state.lastPost = action.payload; 
            state.status = true;           

            // Persist to localStorage
            localStorage.setItem("lastPost", JSON.stringify(action.payload));
        },

        clearLastPost: (state) => {
            state.lastPost = null;
            state.status = false;

            // Remove from localStorage
            localStorage.removeItem("lastPost");
        },

        initializeLastPost: (state) => {
            // Check localStorage for saved post
            const savedLastPost = localStorage.getItem("lastPost");
            if (savedLastPost) {
                state.lastPost = JSON.parse(savedLastPost); // Restore state
                state.status = true;
            }
        },
    },
});

export const { setLastPost, clearLastPost, initializeLastPost } = postSlice.actions;

export default postSlice.reducer;
