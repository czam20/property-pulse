"use client";
import { RiseLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-[calc(100vh-164px)] flex items-center justify-center">
      <RiseLoader color="#3b82f6" />
    </div>
  );
}
