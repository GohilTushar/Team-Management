import {
  permissionConfig,
  PermissionEnum,
  RoleEnum,
} from "../config/role-permission.config";

export const RolePermission: Record<RoleEnum, Array<PermissionEnum>> = {
  OWNER: [
    permissionConfig.CREATE_WORKSPACE,
    permissionConfig.EDIT_WORKSPACE,
    permissionConfig.DELETE_WORKSPACE,
    permissionConfig.MANAGE_WORKSPACE_SETTINGS,

    permissionConfig.CREATE_PROJECT,
    permissionConfig.EDIT_PROJECT,
    permissionConfig.DELETE_PROJECT,

    permissionConfig.CREATE_TASK,
    permissionConfig.EDIT_TASK,
    permissionConfig.DELETE_TASK,

    permissionConfig.ADD_MEMBER,
    permissionConfig.EDIT_MEMBER,
    permissionConfig.REMOVE_MEMBER,

    permissionConfig.VIEW_ONLY,
  ],
  ADMIN: [
    permissionConfig.MANAGE_WORKSPACE_SETTINGS,

    permissionConfig.CREATE_PROJECT,
    permissionConfig.EDIT_PROJECT,
    permissionConfig.DELETE_PROJECT,

    permissionConfig.CREATE_TASK,
    permissionConfig.EDIT_TASK,
    permissionConfig.DELETE_TASK,

    permissionConfig.ADD_MEMBER,

    permissionConfig.VIEW_ONLY,
  ],

  MEMBER: [
    permissionConfig.CREATE_TASK,
    permissionConfig.EDIT_TASK,

    permissionConfig.VIEW_ONLY,
  ],
} as Record<RoleEnum, Array<PermissionEnum>>;
