import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name : "user",
    initialState : {
        user : null,
        activeTab : "Dashboard", // Navbar ke kis tab ko click kiya hai
    },
    reducers : {
        setUser : (state , action) => {
            state.user = action.payload;
        },
        setActiveTab : (state , action) => {
            state.activeTab = action.payload;
        },
    }
})

export const {setUser , setActiveTab} = userSlice.actions;
export default userSlice.reducer;