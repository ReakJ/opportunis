import { z } from "zod";

const locationSchema = z.object({
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State / Province is required"),
  country: z.string().trim().min(1, "Country is required"),
  countryCode: z.string().trim().min(1, "Country code is required"),
  pincode: z.string().trim().min(1, "Pincode / Postal code is required"),
});

export const recruiterProfileSchema = z.object({
  personal: z.object({
    firstName: z.string().trim().min(1, "First Name is required"),
    lastName: z.string().trim().min(1, "Last Name is required"),
    phone: z.string().trim().min(1, "Phone number is required"),
    location: locationSchema,
  }),

  professional: z.object({
    designation: z.string().trim().min(1, "Designation is required"),
  }),

  company: z.object({
    name: z.string().trim().min(1, "Company name is required"),
    industry: z.string().trim().min(1, "Industry is required"),
    size: z.string().min(1, "Company size is required"),
    location: locationSchema,
  }),
});