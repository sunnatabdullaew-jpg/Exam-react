import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from '../components/ProductForm';

function CreateProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);

    const title = form.get('title')?.toString().trim();
    const brand = form.get('brand')?.toString().trim();
    const price = form.get('price')?.toString().trim();
    const description = form.get('description')?.toString().trim();
    const category = form.get('category')?.toString().trim();
    const image = form.get('image')?.toString().trim();

    if (!title || !brand || !price || !description || !category || !image) {
      toast.error("Barcha maydonlarni to'ldiring.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://dummyjson.com/products/add', {
        title,
        brand,
        price: Number(price),
        description,
        category,
        thumbnail: image,
      });

      toast.success("Mahsulot qo'shildi.");
      event.target.reset();
      setTimeout(
        () =>
          navigate('/products', {
            state: {
              newProduct: {
                ...response.data,
                localOnly: true,
              },
            },
          }),
        500
      );
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h2>Create Product</h2>
      <div>
        <ProductForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </section>
  );
}

export default CreateProduct;
