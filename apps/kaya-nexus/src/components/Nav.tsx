"use client";
import { useRouter } from "next/navigation";
export const Nav = () => {
  const { push } = useRouter();
  return (
    <nav className="nav">
      {["crm", "projects", "finance"].map((m) => (
        <button key={m} className="button" onClick={() => push(`/${m}`)}>
          {m.charAt(0).toUpperCase() + m.slice(1)}
        </button>
      ))}
    </nav>
  );
};
