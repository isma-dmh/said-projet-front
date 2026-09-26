import { authFetch } from "./fetchWrapper";

const endpoint = "products";

export const getProducts = async (cat, page = 1) => {
  const params = new URLSearchParams();
  if (cat) params.append("category.name", cat);
  params.append("page", page);

  const req = await authFetch(`${endpoint}?${params.toString()}`);
  if (!req.ok)
    throw new Error(
      "Connexion a la base de donnee echouee, echec du chargement des produits",
    );
  return req.json();
};

export const getProduct = async (id) => {
  const req = await authFetch(`${endpoint}/${id}`);
  if (!req.ok)
    throw new Error(
      "Connexion a la base de donnee echouee, echec du chargement du produit",
    );
  return req.json();
};

export const postProduct = async (name, description, price) => {
  const req = await authFetch(endpoint, {
    method: "POST",
    headers: { "Content-type": "application/ld+json" },
    body: JSON.stringify({ name, description, price }),
  });
  if (!req.ok)
    throw new Error(
      "Connexion a la base de donnee echouee, echec de la creation du produit",
    );
  return req.json();
};

// export const deleteProduct = async (id) => {
//   const req = await authFetch(`${endpoint}/${id}`, {
//     method: "DELETE",
//   });
//   if (!req.ok)
//     throw new Error(
//       "Connexion a la base de donnee echouee, echec de la suppression du produit",
//     );
//   return req.json();
// };
