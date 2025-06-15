import mongoose,{Document,Schema,Model} from "mongoose";
import { permissionConfig, PermissionEnum, roleConfig, RoleEnum } from "../config/role-permission.config";
import { RolePermission } from "../utils/role-permission";

export interface IRole extends Document{
    name:RoleEnum
    permissions: PermissionEnum[]
}

const RoleSchema = new Schema<IRole>(
    {
        name: {
            type: String,
            enum: Object.values(roleConfig),
            required: true,
            unique: true,
        },
        permissions: {
            type: [String],
            enum: Object.values(permissionConfig),
            required: true,
            default:function(){
                return RolePermission[this.name] || [];
            }
        },
    },
    {
        timestamps: true,
    }
);

const RoleModel: Model<IRole> = mongoose.model<IRole>("Role", RoleSchema);

export default RoleModel;