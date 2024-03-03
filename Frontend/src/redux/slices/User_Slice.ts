import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAdmin: false,
    email:null,
    _id:null
  },
  reducers: {
    setUserData: (state, action) => {
      const { isAdmin, email,_id } = action.payload;
      state.isAdmin = isAdmin;
      state.email = email;
      state._id=_id
    },
    clearUserData: (state) => {
      state.isAdmin = false;
      state.email=null;
      state._id=null
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
