import User from "../models/User.js"
import EmployeeProfile from "../models/EmployeeProfile.js"
import RecruiterProfile from "../models/RecruiterProfile.js"
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

export const createEmployeeProfile = async (firebaseUser, profileData) => {
  const user = await User.findOne({
    firebaseUid: firebaseUser.uid
  })

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role !== "employee") {
    throw new ApiError(403, "Employee onboarding is only allowed")
  }

  const existingProfile = await EmployeeProfile.findOne({
    user: user._id,
  })

  if (existingProfile) {
    throw new ApiError(409, "Employee profile already exists");
  }

  const profile = await EmployeeProfile.create({
    user: user._id,
    ...profileData,
  })

  user.onboardingStatus = "completed";

  await user.save();

  return profile;
}

export const createRecruiterProfile = async (firebaseUser, profileData) => {
  const user = await User.findOne({
    firebaseUid: firebaseUser.uid
  })

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role !== "recruiter") {
    throw new ApiError(403, "Recruiter onboarding is only allowed")
  }

  const existingProfile = await RecruiterProfile.findOne({
    user: user._id,
  })

  if (existingProfile) {
    throw new ApiError(409, "Recruiter profile already exists");
  }

  const profile = await RecruiterProfile.create({
    user: user._id,
    ...profileData,
  })

  user.onboardingStatus = "completed";

  await user.save();

  return profile;
}