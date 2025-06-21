import UserModel from "../models/user.model";

export const getCurrentUserService = async (userId: string) => {
  const user = await UserModel.findById(userId)
    .populate("currentWorkSpace")
    .select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    user,
  };
};