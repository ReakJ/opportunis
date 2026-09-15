import { z } from "zod";

export const employeeProfileSchema = z.object({
  personal: z.object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required"),

    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required"),

    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required"),

    location: z.object({
      city: z
        .string()
        .trim()
        .min(1, "City is required"),

      state: z
        .string()
        .trim()
        .min(1, "State / Province is required"),

      country: z
        .string()
        .trim()
        .min(1, "Country is required"),

      countryCode: z
        .string()
        .trim()
        .min(1, "Country code is required"),

      pincode: z
        .string()
        .trim()
        .min(1, "Pincode / Postal code is required"),
    }),
  }),

  professional: z.object({
    headline: z
      .string()
      .trim()
      .min(1, "Professional headline is required"),

    experienceLevel: z.enum(
      ["fresher", "entry", "mid", "senior"],
      {
        error: "Please select your experience level",
      }
    ),
  }),

  skills: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one skill"),
});