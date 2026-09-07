import User from "../models/User.js"

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