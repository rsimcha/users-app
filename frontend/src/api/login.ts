import { BASE_URL } from "./baseUrl";

export const login = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    const { accessToken } = data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Login failed: ", error);
    throw error;
  }
};
