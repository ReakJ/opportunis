import mongoose from "mongoose";

const employeeProfileSchema = new mongoose.Schema(
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
          trim: true
        },
      },
    },
    
    professional: {
      headline: {
        type: String,
        required: true,
        trim: true,
      },

      bio: {
        type: String,
        trim: true,
      },

      currentJobTitle: {
        type: String,
        trim: true,
        default: null
      },

      currentCompany: {
        type: String,
        trim: true,
        default: null
      },

      experienceLevel: {
        type: String,
        required: true,
        enum: ["fresher", "entry", "mid", "senior"],
      },
    },

    skills: {
      type: [String],
      default: [],
    },

    education: {
      type: [
        {
          institution: {
            type: String,
            trim: true,
          },

          degree: {
            type: String,
            trim: true,
          },

          fieldOfStudy: {
            type: String,
            trim: true,
          },

          startDate: {
            type: Date,
          },

          endDate: {
            type: Date,
          },

          grade: {
            type: String,
            trim: true,
          },
        },
      ],
      default: [],
    },

    experience: {
      type: [
        {
          company: {
            type: String,
            trim: true,
          },

          jobTitle: {
            type: String,
            trim: true,
          },

          employmentType: {
            type: String,
            enum: [
              "internship",
              "full-time",
              "part-time",
              "contract",
              "freelance",
            ],
          },

          location: {
            type: String,
            trim: true
          },

          startDate: {
            type: Date,
          },

          endDate: {
            type: Date,
          },

          currentlyWorking: {
            type: Boolean,
            default: false,
          },

          description: {
            type: String,
            trim: true,
          },
        },
      ],
      default: [],
    },
    
    projects: {
      type: [
        {
          title: {
            type: String,
            trim: true,
          },

          description: {
            type: String,
            trim: true,
          },

          technologies: {
            type: [String],
            default: [],
          },

          projectUrl: {
            type: String,
            trim: true,
            default: null,
          },

          githubUrl: {
            type: String,
            trim: true,
            default: null,
          },

          startDate: {
            type: Date,
          },

          endDate: {
            type: Date,
          },
        },
      ],
      default: [],
    },

    certifications: {
      type: [
        {
          name: {
            type: String,
            trim: true,
          },

          issuingOrganization: {
            type: String,
            trim: true,
          },

          issueDate: {
            type: Date,
          },

          credentialId: {
            type: String,
            trim: true,
            default: null,
          },

          credentialUrl: {
            type: String,
            trim: true,
            default: null,
          },
        },
      ],
      default: [],
    },

    achievements: {
      type: [
        {
          title: {
            type: String,
            trim: true,
          },

          description: {
            type: String,
            trim: true,
          },

          date: {
            type: Date,
          },
        },
      ],
      default: [],
    },

    links: {
      linkedin: {
        type: String,
        trim: true,
        default: null,
      },

      github: {
        type: String,
        trim: true,
        default: null,
      },

      portfolio: {
        type: String,
        trim: true,
        default: null,
      },
    },

    jobPreferences: {
      desiredJobTitles: {
        type: [String],
        default: [],
      },

      preferredLocations: {
        type: [String],
        default: [],
      },

      workMode: {
        type: [String],
        enum: ["onsite", "hybrid", "remote"],
        default: [],
      },

      employmentTypes: {
        type: [String],
        enum: [
          "internship",
          "full-time",
          "part-time",
          "contract",
          "freelance",
        ],
        default: [],
      },

      expectedSalary: {
        min: {
          type: Number,
          default: null,
        },

        max: {
          type: Number,
          default: null,
        },

        currency: {
          type: String,
          default: "INR",
          trim: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const EmployeeProfile = mongoose.model(
  "EmployeeProfile", 
  employeeProfileSchema
);

export default EmployeeProfile;