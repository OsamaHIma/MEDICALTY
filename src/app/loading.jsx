'use client'
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500/20 backdrop-blur-xl">
      <div className="flex items-center justify-center gap-3 text-green-100">
        <ThreeDots wrapperClass="fill-slate-200" ariaLabel="Loading..." />
      </div>
    </div>
  );
}