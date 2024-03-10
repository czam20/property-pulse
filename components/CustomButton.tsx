"use client";
import React from "react";
import { ClipLoader } from "react-spinners";

type CustomButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => {};
  loading?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function CustomButton(props: CustomButtonProps) {
  return (
    <button
      type={props?.type}
      disabled={props?.loading}
      onClick={props.onClick && props.onClick}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center ${props.className} disabled:bg-slate-300`}
    >
      {props.loading ? <ClipLoader color="#475569" /> : <>{props.children}</>}
    </button>
  );
}
