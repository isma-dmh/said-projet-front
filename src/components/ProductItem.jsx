import "../assets/styles/components/productItem.css"

export const ProductItem = ({ product }) => {

  return (
    <div className="product">
      <img
        src={`${import.meta.env.VITE_API_URL}/images/products/${product.imageName}`}
        alt={`image ${product.name}`}
      />
      <p className="product-name">{product.name}</p>
      <p className="product-price">{product.price}€</p>

    </div>

  );
};
