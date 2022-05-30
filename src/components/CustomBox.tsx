import { memo, useEffect } from "react";
import { MdIron } from "react-icons/md";

import { useAppSelector, useAppDispatch } from "../hooks";
import { setCutLawn } from "../features/lawnSlice";

interface ICustomBox {
  index: number;
}

const CustomBox = memo(({ index }: ICustomBox) => {
  const dispatch = useAppDispatch();
  const { boxIndex, orientation, round } = useAppSelector(
    (state) => state.mower
  );
  const { cut } = useAppSelector((state) => state.lawn);

  const shouldDisplay = boxIndex === index;

  useEffect(() => {
    if (shouldDisplay) {
      dispatch(setCutLawn(index));
    }
  }, [shouldDisplay]);

  return (
    <div
      className={
        cut.includes(index)
          ? "flex items-center justify-center w-[80px] h-[50px] bg-green-200 shadow-green-700 shadow-md border-solid border-0 border-black"
          : "flex items-center justify-center w-[80px] h-[50px] bg-green-700 shadow-green-700 shadow-md border-solid border-0 border-black"
      }
    >
      {shouldDisplay && (
        <MdIron
          style={{
            fontSize: 32,
            transform: `rotate(${orientation})`,
          }}
          className={round === 1 ? `text-blue-500` : `text-purple-500`}
        />
      )}
    </div>
  );
});
export default CustomBox;
