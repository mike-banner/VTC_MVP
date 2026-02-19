/**
 * src/lib/rbac.ts
 * Utilitaires pour la gestion des rôles et des permissions (RBAC)
 */

export type TenantRole = 'owner' | 'manager' | 'driver';

/**
 * Vérifie si le profil utilisateur possède l'un des rôles autorisés.
 * Lève une erreur si l'accès est refusé.
 */
export function requireTenantRole(profile: any, allowed: TenantRole[]) {
  if (!profile?.tenant_role || !allowed.includes(profile.tenant_role)) {
    throw new Error("Access denied: Insufficient permissions");
  }
}

/**
 * Retourne true si le rôle est autorisé
 */
export function hasTenantRole(profile: any, allowed: TenantRole[]): boolean {
  return !!(profile?.tenant_role && allowed.includes(profile.tenant_role));
}
