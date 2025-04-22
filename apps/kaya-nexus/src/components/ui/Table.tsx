import React from "react";

export default function Table({ columns = [], data = [], renderCell }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-900 text-white rounded-xl">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 text-left font-bold border-b border-gray-700">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-400">Aucune donnée</td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-800">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 border-b border-gray-800">
                    {renderCell ? renderCell(row, col) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
