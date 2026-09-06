import mongoose from "mongoose";

const COMPANY_SIZE = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5001+",
];

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    personal: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },

      lastName: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      profilePhoto: {
        type: String,
        default: null,
      },

      location: {
        city: {
          type: String,
          required: true,
          trim: true,
        },

        state: {
          type: String,
          required: true,
          trim: true,
        },

        country: {
          type: String,
          required: true,
          trim: true,
        },
      }
    },

    professional: {
      designation: {
        type: String,
        required: true,
        trim: true
      },

      bio: {
        type: String,
        trim: true
      }
    },

    company: {
      name: {
        type: String,
        required: true,
        trim: true
      },

      logo: {
        type: String,
        default: null
      },

      website: {
        type: String,
        trim: true,
        default: null
      },

      industry: {
        type: String,
        required: true,
        trim: true,
      },

      size: {
        type: String,
        required: true,
        enum: COMPANY_SIZE,
      },

      description: {
        type: String,
        trim: true
      },

      location: {
        city: {
          type: String,
          required: true,
          trim: true,
        },
        state: {
          type: String,
          required: true,
          trim: true,
        },
        country: {
          type: String,
          required: true,
          trim: true,
        },
      },
    }
  },
  {
    timestamps: true,
  }
);

const RecruiterProfile = mongoose.model(
  "RecruiterProfile",
  recruiterProfileSchema
);

export default RecruiterProfile;