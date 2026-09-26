import { useCallback, useEffect, useRef, useState } from "react";
import "../assets/styles/pages/home.css";
import { ProductItem } from "../components/ProductItem";
import logoLoading from "../assets/svg/loading.svg";
import { Link } from "react-router-dom";

export const Home = ({
  products,
  loadingProducts,
  errorProducts,
  loadingMore,
  loadMore,
  hasMore,
  cat,
  setCat,
  categories,
  loadingCategories,
  errorCategories,
}) => {
  const observerRef = useRef(null);
  const sentinelRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasMore, loadMore],
  );
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="home">
      <h1>Bienvenue chez Aurae</h1>
      <div id="categories">
        <button
          className={`${cat === "" ? "active" : ""}`}
          onClick={() => setCat("")}
        >
          Tous
        </button>
        {categories.map((categorie) => (
          <button
            className={`${cat === categorie.name ? "active" : ""}`}
            key={categorie.id}
            onClick={() => setCat(categorie.name)}
          >
            {categorie.name}
          </button>
        ))}
      </div>
      {loadingProducts || loadingCategories ? (
        <img className="logo-loading" src={logoLoading} alt="loading" />
      ) : errorProducts || errorCategories ? (
        <p>
          Une Erreur est survenue:{" "}
          {errorProducts ? errorProducts : errorCategories}
        </p>
      ) : (
        <>
          <div id="products">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <ProductItem product={product} />
              </Link>
            ))}
          </div>
          {loadingMore && (
            <img
              className="logo-loading"
              src={logoLoading}
              alt="Chargement..."
            />
          )}
          {hasMore && <div ref={sentinelRef} id="scroll-sentinel" />}
        </>
      )}
      <button
        id="scroll-top"
        className={showScrollTop ? "visible" : ""}
        onClick={scrollToTop}
        aria-label="Remonter en haut"
      >
        ↑
      </button>
    </div>
  );
};
