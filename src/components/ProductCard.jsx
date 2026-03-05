import './ProductCard.css';

function ProductCard({ product, onDelete, onEdit }) {
  const imageSrc =
    product.thumbnail ||
    (Array.isArray(product.images) && product.images.length ? product.images[0] : '');

  return (
    <article className="product-card">
      <img src={imageSrc} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p>{product.brand}</p>
      <p>${product.price}</p>
      <button type="button" className="delete-button" onClick={() => onDelete(product.id)}>
        Delete
      </button>
      <button type="button" className="edit-button" onClick={() => onEdit(product)}>
        Edit
      </button>
    </article>
  );
}

export default ProductCard;
