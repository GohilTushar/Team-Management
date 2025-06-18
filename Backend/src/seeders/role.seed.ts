import "dotenv/config";
import mongoose from "mongoose";
import connectToDatabase from "../config/database.config";
import RoleModel from "../models/role-permission.model";
import { RolePermission } from "../utils/role-permission";

const seedRolesPermission=async()=>{
    console.log('Seeding Started...')

    try {

        await connectToDatabase();

        const session=await mongoose.startSession();
        session.startTransaction();

        console.log('deleting existing roles...');
        await RoleModel.deleteMany({}, { session });

        for(const roleName in RolePermission){
            const role=roleName as keyof typeof RolePermission;
            const permissions=RolePermission[role];

            const existingRole=await RoleModel.findOne({ name: role }).session(session);
            if(!existingRole){
                const newRole = new RoleModel({
                    name: role,
                    permissions: permissions
                });
                await newRole.save({ session });
                console.log(`Role ${role} created with permissions`);
            }
            else {
                console.log(`Role ${role} already exists, skipping creation`);
            }
        }
        await session.commitTransaction();
        console.log('Roles and permissions seeded successfully');

        session.endSession();
        console.log('session ended')
        
    } catch (error) {
        console.error('Error seeding roles and permissions:', error);
        
    }
}

seedRolesPermission()
    .then(() => {
        console.log('Seeding completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });