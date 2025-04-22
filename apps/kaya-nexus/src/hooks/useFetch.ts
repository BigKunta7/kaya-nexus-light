import { useState, useEffect } from "react";

/**
 * Hook universel pour fetcher des données depuis une API, avec gestion loading/erreur.
 * @param {string} url - L’URL de l’API à interroger
 * @param {object} options - Options fetch (headers, method, body...)
 * @returns {{ data: unknown, loading: boolean, error: unknown, refetch: () => Promise<void> }}
 * @example
 * const { data, loading, error, refetch } = useFetch("/api/users");
 */
export function useFetch(url: string, options: RequestInit = {}) {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}
