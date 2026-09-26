import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Product } from "./pages/Product";
import { useProducts } from "./hooks/useProducts";
import { useCategories } from "./hooks/useCategories";
import { useState } from "react";
import { Login } from "./pages/Login";
import { PublicOnlyRoute } from "./components/PublicOnlyRoute";
import { CreateProduct } from "./pages/CreateProduct";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [cat, setCat] = useState("");
  const productsData = useProducts(cat);
  const categoriesData = useCategories();

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                {...productsData}
                {...categoriesData}
                cat={cat}
                setCat={setCat}
              />
            }
          />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/login-admin"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
