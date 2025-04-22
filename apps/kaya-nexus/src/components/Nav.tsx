"use client";
import { useRouter } from "next/navigation";
export const Nav = () => {
  const { push } = useRouter();
  const modules = [
    { slug: '', label: 'Accueil' },
    { slug: 'crm', label: 'CRM' },
    { slug: 'projets', label: 'Projets' },
    { slug: 'finance', label: 'Finance' },
    { slug: 'analytics', label: 'Analytique' },
    { slug: 'ai', label: 'IA' },
  ];
  return (
    <nav className="nav">
      {modules.map(({ slug, label }) => (
        <button
          key={slug || 'home'}
          className="button"
          onClick={() => push(slug ? `/${slug}` : '/')}
        >
          {label}
        </button>
      ))}
    </nav>
  );
};
export default Nav;
