"use client"
import React from "react";
import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider(props: AuthProviderProps) {
  return (
    <SessionProvider>{props.children}</SessionProvider>
  );
}
