import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";

export const FormCreate = () => {
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const { createProduct } = useProducts();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (
      form.name.trim() !== "" &&
      form.description.trim() !== "" &&
      form.price.trim() !== ""
    ) {
      
      await createProduct(
        form.name.trim(),
        form.description.trim(),
        form.price.trim(),
      );
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Introduire le nom de l'article"
        value={form.name}
        onChange={handleChange}
      />
      <textarea
        type="text"
        name="description"
        placeholder="Introduire la description de l'article"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Introduire le prix de l'article"
        value={form.price}
        onChange={handleChange}
      />
      <button>Creer</button>
    </form>
  );
};
