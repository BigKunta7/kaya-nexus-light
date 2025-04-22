import { useEffect, useRef } from "react";

/**
 * Hook pour exécuter une fonction uniquement lors du premier rendu (mount).
 */
export function useMount(effect) {
  useEffect(() => {
    effect();
    // eslint-disable-next-line
  }, []);
}

/**
 * Hook pour exécuter une fonction lors d’un changement de valeur (et ignorer le premier rendu).
 */
export function useUpdate(effect, deps) {
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    effect();
    // eslint-disable-next-line
  }, deps);
}

/**
 * Hook pour gérer la pagination côté client.
 */
export function usePagination(data = [], pageSize = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginated = data.slice((page - 1) * pageSize, page * pageSize);
  return { page, setPage, totalPages, paginated };
}
