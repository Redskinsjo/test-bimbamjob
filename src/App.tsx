import { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { MdIron } from "react-icons/md";

import "./App.css";
import Program from "./program.txt";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setLawn, resetLawn } from "./features/lawnSlice";
import CustomBox from "./components/CustomBox";
import { setMower, setMovement, setRound, reset } from "./features/mowerSlice";
import { findBoxCoordinatesFromIndex } from "./utils";

function App() {
  const [loading, setLoading] = useState(true);
  const [shouldStart, setShouldStart] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  const dispatch = useAppDispatch();
  const { Xaxis, Yaxis, program1, program2 } = useAppSelector(
    (state) => state.lawn
  );
  const { boxIndex, round, currentActionId, currentAction } = useAppSelector(
    (state) => state.mower
  );

  useEffect(() => {
    fetch(Program).then((response) => {
      const reader = response.body?.getReader();
      return reader?.read().then(({ done, value }) => {
        const fileContent = new TextDecoder().decode(value);

        dispatch(setLawn(fileContent));
        dispatch(setMower(fileContent));

        setLoading(false);
        setShouldReset(false);
      });
    });
  }, [shouldReset]);

  useEffect(() => {
    if (shouldStart) {
      const program = round === 1 ? program1 : program2;
      if (currentActionId < program.length) {
        setTimeout(() => {
          dispatch(setMovement({ action: program[currentActionId], Xaxis }));
          if (currentActionId === program.length - 1) {
            setShouldStart(false);
          }
        }, 1500);
      }
    }
  }, [shouldStart, currentActionId]);

  const LawnGrids = useMemo(
    () =>
      Array.from(Array(Xaxis * Yaxis)).map((_, index) => {
        return (
          <Grid item xs={1} key={index}>
            <CustomBox index={index} />
          </Grid>
        );
      }),
    [shouldReset, currentAction, Xaxis, Yaxis]
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <Box className="h-full flex justify-center">
        <Grid
          container
          spacing={{ md: 1 }}
          columns={{ md: Xaxis }}
          className="flex w-[50%]  py-6 pl-6"
        >
          {!loading && Xaxis && Yaxis && LawnGrids}
        </Grid>
      </Box>
      <h2 className="font-bold my-4">
        Veuillez réinitialiser le jeu avant chaque début
      </h2>
      <ul className="w-[400px]">
        <div className="flex items-center justify-between">
          <li className="flex items-center justify-between w-full">
            <span className="text-blue-500">
              Tondeuse 1:{" "}
              <span>
                {round === 1
                  ? `[${
                      findBoxCoordinatesFromIndex(
                        boxIndex as number,
                        Xaxis,
                        Yaxis
                      )[0]
                    }, ${
                      findBoxCoordinatesFromIndex(
                        boxIndex as number,
                        Xaxis,
                        Yaxis
                      )[1]
                    }]`
                  : `[]`}
              </span>
            </span>
            <div>
              <span>
                <Button
                  onClick={() => {
                    setShouldStart(true);
                  }}
                  className="text-xl hover:bg-blue-300 hover:text-white border-[1px] border-blue-300 border-solid"
                >
                  Start
                </Button>
              </span>
              <span>
                <Button
                  onClick={() => {
                    dispatch(reset());
                    setShouldReset(true);
                    dispatch(setRound(1));
                    dispatch(resetLawn());
                  }}
                  className="text-xl hover:bg-blue-300 hover:text-white border-[1px] border-blue-300 border-solid"
                >
                  Reset
                </Button>
              </span>
            </div>
          </li>
        </div>
        <div className="flex items-center justify-between">
          {boxIndex && boxIndex < 0 && round === 2 && (
            <MdIron
              style={{
                fontSize: 32,
              }}
              className="text-purple-500"
            />
          )}
          <li className="flex items-center justify-between w-full">
            <span className="text-purple-500">
              Tondeuse 2:{" "}
              <span>
                {boxIndex && boxIndex > -1 && round !== 1
                  ? `[${
                      findBoxCoordinatesFromIndex(
                        boxIndex as number,
                        Xaxis,
                        Yaxis
                      )[0]
                    }, ${
                      findBoxCoordinatesFromIndex(
                        boxIndex as number,
                        Xaxis,
                        Yaxis
                      )[1]
                    }]`
                  : round !== 1
                  ? `[out]`
                  : `[]`}
              </span>
            </span>
            <div>
              <span>
                <Button
                  onClick={() => {
                    setShouldStart(true);
                  }}
                  className="text-xl hover:bg-blue-300 hover:text-white border-[1px] border-blue-300 border-solid"
                >
                  Start
                </Button>
              </span>
              <span>
                <Button
                  onClick={() => {
                    dispatch(reset());
                    setShouldReset(true);
                    dispatch(setRound(2));
                    dispatch(resetLawn());
                  }}
                  className="text-xl hover:bg-blue-300 hover:text-white border-[1px] border-blue-300 border-solid"
                >
                  Reset
                </Button>
              </span>
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default App;
