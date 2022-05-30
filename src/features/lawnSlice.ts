import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findByIndex } from "../utils";

export interface LawnState {
  fileContent: string;

  Xaxis: number;
  Yaxis: number;

  program1: string[];
  program2: string[];

  cut: number[];
}

const initialState: LawnState = {
  fileContent: "",

  Xaxis: 0,
  Yaxis: 0,
  program1: [],
  program2: [],

  cut: [],
};

export const LawnSlice = createSlice({
  name: "lawn",
  initialState,
  reducers: {
    setLawn: (state, action: PayloadAction<string>) => {
      state.fileContent = action.payload;

      const grid = findByIndex(action.payload, 0);
      const x = Number(grid[0]);
      const y = Number(grid[1]);

      const program1 = findByIndex(action.payload, 2);
      const program2 = findByIndex(action.payload, 4);

      state.Xaxis = x;
      state.Yaxis = y;

      state.program1 = program1;
      state.program2 = program2;
    },
    setCutLawn: (state, action: PayloadAction<number>) => {
      state.cut = [...state.cut, action.payload];
    },
    resetLawn: (state) => {
      state.cut = [];
    },
  },
});

export const { setLawn, setCutLawn, resetLawn } = LawnSlice.actions;
export default LawnSlice.reducer;
