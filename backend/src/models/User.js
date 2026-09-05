import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["employee", "recruiter", "admin"],
      default: null,
    },

    onboardingStatus: {
      type: String,
      enum: ["role_selection", "profile_setup", "completed"],
      default: "role_selection",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;