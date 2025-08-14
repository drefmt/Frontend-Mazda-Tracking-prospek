import toast from "react-hot-toast";

export const confirmDelete = (onConfirm: () => void) => {
  toast.custom(
    (t) => (
      <div
        className={`bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 w-72 transform transition-all duration-300 ${
          t.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <p className="text-sm text-gray-800">Yakin ingin menghapus data ini?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm border rounded"
          >
            Batal
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center", // Biar di tengah atas layar
      duration: Infinity, // Tetap sampai user klik
    }
  );
};

