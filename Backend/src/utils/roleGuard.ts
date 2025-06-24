import { PermissionEnum } from "../config/role-permission.config";
import { RolePermission } from "./role-permission";

export const roleGuard = (
  role: keyof typeof RolePermission,
  requiredPermissions: string[]
) => {
  const permissions = RolePermission[role];
  // If the role doesn't exist or lacks required permissions, throw an exception

  const hasPermission = requiredPermissions.every((permission) =>
    permissions.includes(permission as PermissionEnum)
  );
      
  if (!hasPermission) {
    throw new Error(
      "You do not have the necessary permissions to perform this action"
    );
  }
};