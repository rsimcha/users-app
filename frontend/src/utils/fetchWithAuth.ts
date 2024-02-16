export const fetchWithAuth = async (url: string, options?: RequestInit) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found");
  }

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error("API call unsuccessful");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
