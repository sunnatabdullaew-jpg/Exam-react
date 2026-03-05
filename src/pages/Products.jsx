import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    brand: '',
    price: '',
    description: '',
    category: '',
    thumbnail: '',
  });

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await axios.get('https://dummyjson.com/products?limit=20');
        setProducts(res.data.products || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);
      setProducts((old) => old.filter((item) => item.id !== id));
      toast.success("Deleted successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Delete xatolik');
    }
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setEditData({
      title: product.title || '',
      brand: product.brand || '',
      price: product.price || '',
      description: product.description || '',
      category: product.category || '',
      thumbnail: product.thumbnail || '',
    });
  };

  const closeEditModal = () => {
    setEditingId(null);
  };

  const changeEditInput = (e) => {
    const { name, value } = e.target;
    setEditData((old) => ({ ...old, [name]: value }));
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editingId) return;

    if (
      !editData.title ||
      !editData.brand ||
      !editData.price ||
      !editData.description ||
      !editData.category ||
      !editData.thumbnail
    ) {
      toast.error("Hamma maydonni to'ldiring.");
      return;
    }

    try {
      const res = await axios.put(`https://dummyjson.com/products/${editingId}`, {
        title: editData.title,
        brand: editData.brand,
        price: Number(editData.price),
        description: editData.description,
        category: editData.category,
        thumbnail: editData.thumbnail,
      });

      setProducts((old) =>
        old.map((item) =>
          item.id === editingId ? { ...item, ...res.data } : item
        )
      );

      toast.success('Edited successfully.');
      closeEditModal();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Edit xatolik');
    }
  };

  return (
    <section className="page">
      <h2>Products</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <div className="products-grid">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onDelete={deleteProduct}
              onEdit={openEditModal}
            />
          ))}
        </div>
      )}

      {editingId && (
        <div className="edit-modal-backdrop" onClick={closeEditModal}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Product</h3>
            <form className="edit-form" onSubmit={saveEdit}>
              <input name="title" value={editData.title} onChange={changeEditInput} placeholder="Title" />
              <input name="brand" value={editData.brand} onChange={changeEditInput} placeholder="Brand" />
              <input
                name="price"
                type="number"
                value={editData.price}
                onChange={changeEditInput}
                placeholder="Price"
              />
              <input
                name="description"
                value={editData.description}
                onChange={changeEditInput}
                placeholder="Description"
              />
              <input
                name="category"
                value={editData.category}
                onChange={changeEditInput}
                placeholder="Category"
              />
              <input
                name="thumbnail"
                value={editData.thumbnail}
                onChange={changeEditInput}
                placeholder="Image URL"
              />
              <div className="edit-actions">
                <button type="submit" className="edit-save">
                  Save
                </button>
                <button type="button" className="edit-cancel" onClick={closeEditModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Products;
