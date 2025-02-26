import {createSlice} from "@reduxjs/toolkit"

const postSlice = createSlice({
    name : "post",
    initialState : {
        query : ""
    },
    reducers : {
        setQuery : (state , action) => {
            state.query = action.payload;
        },
    }
})

export const {setQuery} = postSlice.actions;
export default postSlice.reducer;