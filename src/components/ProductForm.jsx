import './ProductForm.css';

const ProductForm = ({ onSubmit, loading }) => {
  return (
    <div className="product-form-wrap">
      <h2 className="product-form-title">ProductForm</h2>

      <form className="product-form" onSubmit={onSubmit}>
        <input type="text" placeholder="Title" name="title" required />
        <input type="text" placeholder="Brand" name="brand" required />
        <input type="number" placeholder="Price" name="price" required />
        <input type="text" placeholder="Description" name="description" required />
        <input type="text" placeholder="Category" name="category" required />
        <input type="text" placeholder="Image URL" name="image" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>

      </form>
    </div>
  );
};

export default ProductForm;
