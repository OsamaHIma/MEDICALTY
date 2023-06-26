import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/20 backdrop-blur-xl">
      <div className="flex items-center justify-center space-x-2 text-white">
        <FaSpinner className="animate-spin" size={25} />
        <span className="text-xl">Loading...</span>
      </div>
    </div>
  );
}