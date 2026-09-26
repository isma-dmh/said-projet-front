const BASE_URL = "https://127.0.0.1:8000/api";

export const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(`${BASE_URL}/${endpoint}`, { ...options, headers });
};
