import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logoLoading from "../assets/svg/loading.svg";
import "../assets/styles/pages/product.css";
import { useProducts } from "../hooks/useProducts";
// import { useAuth } from "../context/AuthContext";

export const Product = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [error, setError] = useState();
  const [expanded, setExpanded] = useState(false);
  const { fetchProduct } = useProducts();
  // const { token } = useAuth();
  // const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError();
      try {
        const res = await fetchProduct(id);
        setProduct(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // const handleDelete = async () => {
  //   await removeProduct(product.id);
  //   navigate("/");
  // };

  return (
    <div id="product">
      {loading ? (
        <img className="logo-loading" src={logoLoading} alt="loading" />
      ) : error ? (
        <p>Une erreur est survenue : {error}</p>
      ) : (
        <>
          <img
            src={`${import.meta.env.VITE_API_URL}/images/products/${product.imageName}`}
            alt={`image ${product.name}`}
          />
          <div className="product-infos">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}€</p>
            <p className={`product-description ${expanded ? "expanded" : ""}`}>
              {product.description}
            </p>
            <button
              className="toggle-description"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Voir moins" : "Voir plus"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
