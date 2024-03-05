"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

type LoginButtonProps = {
  icon: React.ReactNode;
  providerId: string;
};
export default function LoginButton(props: LoginButtonProps) {
  if (!props.providerId) return null;

  return (
    <button
      className="flex items-center gap-x-2 text-white bg-slate-700 hover:bg-slate-800 rounded-md px-3 py-2"
      onClick={() => {
        signIn(props.providerId);
      }}
    >
      {props.icon}
      <span>Login or Register</span>
    </button>
  );
}
