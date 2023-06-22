import LoadingComponent from "@/components/Loading";
const ConfirmModal = ({ message, onConfirm, onCancel, loading }) => {
  return (
    <div className="p-4">
      <div className="mb-4 text-lg font-medium dark:text-slate-200">
        {message}
      </div>
      <div className="flex items-center gap-3">
        <button
          className="mr-4 rounded bg-gray-200 px-4 py-2 transition-all ease-in-out hover:bg-gray-300"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="rounded bg-red-500 px-4 py-2 text-white transition-all ease-in-out hover:bg-red-600"
          onClick={onConfirm}
        >
          Confirm
        </button>
        {/* {loading ? <LoadingComponent /> : null} */}
      </div>
    </div>
  );
};

export default ConfirmModal;
