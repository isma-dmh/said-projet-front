const BASE_URL = import.meta.env.VITE_API_URL || "https://127.0.0.1:8000/api";

export const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(`${BASE_URL}/${endpoint}`, { ...options, headers });
};
