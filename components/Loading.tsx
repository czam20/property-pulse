"use client";
import { RiseLoader } from "react-spinners";

export default function Loading(props: { heigth?: number }) {
  return (
    <div
      className={`${
        props.heigth ? `h-[${props.heigth}px]` : "h-[calc(100vh-164px)]"
      } flex items-center justify-center`}
    >
      <RiseLoader color="#3b82f6" />
    </div>
  );
}
