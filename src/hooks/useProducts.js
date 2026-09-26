import { useEffect, useState } from "react";
import {
  // deleteProduct,
  getProduct,
  getProducts,
  postProduct,
} from "../api/products";

export const useProducts = (cat = null) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorProducts, setErrorProducts] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProducts(true);
      try {
        const res = await getProducts(cat, 1);
        setProducts(res.member || []);
        setPage(1);
        setHasMore(Boolean(res["view"]?.["next"]));
      } catch (error) {
        setErrorProducts(error.message);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchData();
  }, [cat]);

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const res = await getProducts(cat, nextPage);
      setProducts((prev) => [...prev, ...(res.member || [])]);
      setPage(nextPage);
      setHasMore(Boolean(res["view"]?.["next"]));
    } catch (error) {
      setErrorProducts(error.message);
    } finally {
      setLoadingMore(false);
    }
  };

  const fetchProduct = async (id) => {
    try {
      const res = await getProduct(id);
      setErrorProducts("");
      return res;
    } catch (error) {
      setErrorProducts(error.message);
    }
  };

  const createProduct = async (name, description, price) => {
    try {
      const res = await postProduct(name, description, price);
      setProducts((prev) => [...prev, res]);
      setErrorProducts("");
    } catch (error) {
      setErrorProducts(error.message);
    }
  };

  // const removeProduct = async (id) => {
  //   try {
  //     await deleteProduct(id);
  //     setErrorProducts("");
  //     setProducts((prev) => {
  //       console.log(`Produits avant filtre: ${prev}`);
  //       return prev.filter((product) => product.id !== id);
  //     });
  //   } catch (error) {
  //     setErrorProducts(error.message);
  //   }
  // };

  return {
    products,
    loadingProducts,
    loadingMore,
    errorProducts,
    loadMore,
    hasMore,
    fetchProduct,
    createProduct,
    // removeProduct,
  };
};
