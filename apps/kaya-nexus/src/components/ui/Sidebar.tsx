"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  return (
    <aside className="w-20 md:w-56 bg-gradient-to-b from-gray-950 to-indigo-950 p-4 flex flex-col shadow-2xl min-h-screen">
      <nav className="flex flex-col gap-1 mt-8">
        {modules.map(({ slug, label, icon: Icon }) => {
          const href = `/${slug}`;
          const isActive = pathname === href || (slug === "" && pathname === "/");
          return (
            <Link
              key={slug}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition",
                isActive
                  ? "bg-indigo-700 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline-block">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
