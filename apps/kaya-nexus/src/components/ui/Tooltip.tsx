import React from "react";

export default function Tooltip({ label, children }) {
  const [show, setShow] = React.useState(false);
  return (
    <span
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      tabIndex={0}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-gray-800 text-xs text-white shadow-lg z-50 whitespace-nowrap">
          {label}
        </span>
      )}
    </span>
  );
}
