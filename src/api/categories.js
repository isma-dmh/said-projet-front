import { authFetch } from "./fetchWrapper";

const endpoint = "categories";

export const getCategories = async () => {
  const req = await authFetch(endpoint);
  if (!req.ok)
    throw new Error(
      "Connexion a la base de donnee echouee, echec du chargement des categories",
    );
  return req.json();
};