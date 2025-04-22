import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <button
        className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Précédent
      </button>
      <span className="text-sm text-gray-300">
        Page {page} / {totalPages}
      </span>
      <button
        className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Suivant
      </button>
    </div>
  );
}
