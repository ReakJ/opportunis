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