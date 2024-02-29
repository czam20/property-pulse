"use client";

import React from "react";

type CustomButtonProps = {
  text: string;
  icon?: React.ReactNode;
  className?: string;
};

export default function CustomButton(props: CustomButtonProps) {
  return (
    <button className={`bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center ${props.className}`}>
      {props?.icon} {props.text}
    </button>
  );
}
