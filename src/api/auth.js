import { authFetch } from "./fetchWrapper";

const endpoint = "login_check";

export const auth = async (email, password) => {
  const req = await authFetch(endpoint, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ username: email, password: password }),
  });
  if (!req.ok) throw new Error("Connexion echouee");
  return req.json();
};
