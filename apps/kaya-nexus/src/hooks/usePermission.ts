import { useMemo } from "react";

/**
 * Hook pour vérifier si un utilisateur a la permission d’effectuer une action donnée.
 * @param {string[]} userRoles - Rôles attribués à l’utilisateur (ex : ["admin", "user"])
 * @param {string[]} allowedRoles - Rôles autorisés pour l’action/ressource (ex : ["admin"])
 * @returns {boolean} true si l’utilisateur a au moins un rôle autorisé
 * @example
 * const canEdit = usePermission(user.roles, ["admin", "manager"]);
 */
export function usePermission(userRoles: string[] = [], allowedRoles: string[] = []): boolean {
  return useMemo(() => {
    if (allowedRoles.length === 0) return true;
    return userRoles.some((role) => allowedRoles.includes(role));
  }, [userRoles, allowedRoles]);
}
