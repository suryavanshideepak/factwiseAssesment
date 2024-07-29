import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JsonData } from "../../utils/types";

interface InitState {
  celebrityData: JsonData[];
}

const initialState: InitState = {
  celebrityData: [],
};
const userSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getData: (state, action:PayloadAction<JsonData[]>) => {
      console.log(action.payload,"payload")
      state.celebrityData = action.payload
    },

    deleteData: (state, action) => {
     state.celebrityData = action.payload;
    },

  },
});

export const { getData, deleteData} = userSlice.actions;

export default userSlice.reducer;
