import { useEffect, useState } from "react";
import {getCategories} from "../api/categories"

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategories();
        setCategories(res.member || []);
      } catch (error) {
        console.log(error);
        setErrorCategories(error.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, []);

  return { categories,loadingCategories,errorCategories };
};
