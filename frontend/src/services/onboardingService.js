import api from "../api/axios";

export const syncOnboarding = async () => {
  const response = await api.post("/onboarding/sync");

  return response.data;
}

export const updateRole = async (role) => {
  const response = await api.patch("/onboarding/role", { 
    role 
  });

  return response.data;
}

export const createEmployeeProfile = async (profileData) => {
  const response = await api.patch("/onboarding/employee", profileData);

  return response.data;
}

export const createRecruiterProfile = async (profileData) => {
  const response = await api.patch("/onboarding/recruiter", profileData);

  return response.data;
}