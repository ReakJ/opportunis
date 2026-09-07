import User from "../models/User.js"
import ApiError from "../errors/ApiError.js"

const ALLOWED_ROLES = [
  "employee",
  "recruiter"
]

export const syncUser = async (firebaseUser) => {
  const existingUser = await User.findOne({
    firebaseUid: firebaseUser.uid,
  });

  let user = existingUser;

  if (!user) {
    user = await User.create({
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email,
    });
  }

  return {
    role: user.role,
    onboardingStatus: user.onboardingStatus
  };
};

export const updateRole = async (firebaseUser, role) => {
  if(!ALLOWED_ROLES.includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  const user = await User.findOne({
    firebaseUid: firebaseUser.uid,
  })

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.role = role;
  user.onboardingStatus = "profile_setup";

  await user.save();

  return {
    role: user.role,
    onboardingStatus: user.onboardingStatus
  };
};