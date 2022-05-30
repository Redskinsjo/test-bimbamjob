import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  mapOrientationToDegrees,
  mapCardinalToDegrees,
  findIndexFromCoordinates,
  findByIndex,
  findCoordinates,
  findOrientation,
  mapActionToMovement,
} from "../utils";

export interface MowerState {
  boxIndex: number | undefined;

  orientation: string;

  round: number;

  currentAction: string;
  currentActionId: number;
}

const initialState: MowerState = {
  boxIndex: undefined,

  orientation: "",

  round: 1,

  currentAction: "",
  currentActionId: 0,
};

export const MowerSlice = createSlice({
  name: "mower",
  initialState,
  reducers: {
    reset: (state) => {
      state.currentActionId = 0;
    },
    setRound: (state, action: PayloadAction<number>) => {
      state.round = action.payload;
    },
    setCurrentAction: (state, action: PayloadAction<string>) => {
      state.currentAction = action.payload;
      state.currentActionId++;
    },
    setMower: (state, action: PayloadAction<string>) => {
      const grid = findByIndex(action.payload, 0);
      const x = Number(grid[0]);
      const y = Number(grid[1]);

      let coordinates;
      if (state.round === 1) {
        coordinates = findCoordinates(action.payload, 1);
      } else {
        coordinates = findCoordinates(action.payload, 3);
      }

      const getPosition = (coords: string[]) =>
        findIndexFromCoordinates(x, y, [coords[0], coords[1]]);

      const index = getPosition(coordinates);

      state.boxIndex = index;

      let orientation;
      if (state.round === 1) {
        orientation = findOrientation(action.payload, 1);
      } else {
        orientation = findOrientation(action.payload, 3);
      }

      state.orientation = mapCardinalToDegrees[orientation];
    },
    setMovement: (
      state,
      action: PayloadAction<{ action: string; Xaxis: number }>
    ) => {
      const newBoxIndex = (orientation: string) => {
        return mapActionToMovement(
          state.boxIndex as number,
          action.payload.Xaxis
        )[orientation];
      };

      // if (state.round === 1) {
      if (action.payload.action === "F") {
        state.boxIndex = newBoxIndex(state.orientation);
      }

      state.orientation =
        mapOrientationToDegrees[action.payload.action][state.orientation];
      state.currentAction = action.payload.action;
      state.currentActionId++;
      // } else {
      //   if (action.payload.action === "F") {
      //     state.boxIndex = newBoxIndex(state.orientation2);
      //   }

      //   state.orientation2 =
      //     mapOrientationToDegrees[action.payload.action][state.orientation2];
      //   state.currentAction = action.payload.action;
      //   state.currentActionId++;
      // }
    },
    setMowerOrientation: (state, action: PayloadAction<string>) => {
      state.orientation =
        mapOrientationToDegrees[action.payload][state.orientation];
      // if (state.round === 1) {
      // } else {
      //   state.orientation2 =
      //     mapOrientationToDegrees[action.payload][state.orientation2];
      // }
    },
  },
});

export const {
  setMower,
  setMowerOrientation,
  setCurrentAction,
  setMovement,
  setRound,
  reset,
} = MowerSlice.actions;
export default MowerSlice.reducer;
