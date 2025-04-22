"use client";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, Briefcase, CreditCard, BarChart2, Cpu } from "lucide-react";
import clsx from "clsx";

const modules = [
  { slug: "", label: "Accueil", icon: Home },
  { slug: "crm", label: "CRM", icon: Users },
  { slug: "projets", label: "Projets", icon: Briefcase },
  { slug: "finance", label: "Finance", icon: CreditCard },
  { slug: "analytics", label: "Analytique", icon: BarChart2 },
  { slug: "ai", label: "IA", icon: Cpu },
];

export default function Sidebar() {
  const { push } = useRouter();
  const pathname = usePathname();
  return (
    <aside className="h-screen w-20 md:w-56 bg-gradient-to-b from-gray-900 to-indigo-900 flex flex-col justify-between py-4 shadow-xl">
      <nav className="flex-1 flex flex-col gap-2 items-center md:items-stretch">
        {modules.map(({ slug, label, icon: Icon }) => {
          const active = pathname === `/${slug}` || (slug === "" && pathname === "/");
          return (
            <button
              key={slug || "home"}
              className={clsx(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm font-medium hover:bg-indigo-700/70 hover:text-white",
                active ? "bg-indigo-700 text-white shadow-lg" : "text-gray-300"
              )}
              onClick={() => push(slug ? `/${slug}` : "/")}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{label}</span>
            </button>
          );
        })}
      </nav>
      <div className="flex flex-col items-center md:items-end px-4">
        <span className="text-xs text-gray-500">2025 Kaya Nexus</span>
      </div>
    </aside>
  );
}
