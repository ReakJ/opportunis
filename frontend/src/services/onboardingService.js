import api from "../api/axios";

export const syncOnboarding = async () => {
  const response = await api.post("/onboarding/sync");

  return response.data;
}