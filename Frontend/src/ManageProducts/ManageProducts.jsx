import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageProducts.css';
import { Link } from 'react-router-dom';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: null });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
    setFilteredProducts(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({ name: product.name, description: product.description, price: product.price, image: null });
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Smooth scroll to form
  };

  const handleAddNew = () => {
    setEditId(null);
    setForm({ name: '', description: '', price: '', image: null });
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (editId) {
      await axios.put(`http://localhost:5000/api/products/${editId}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/products/add', formData);
    }

    fetchProducts();
    setShowForm(false);
  };

  return (
    <div className="manageproducts-container">
      <h2 className="manageproducts-title">Manage Products</h2>

      <div className="manageproducts-actions">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="manageproducts-search"
        />
        <button onClick={handleAddNew} className="manageproducts-add-btn">Add New Product</button>
      </div>

      <div className="manageproducts-table-wrapper">
        <table className="manageproducts-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${p.image}`}
                    alt={p.name}
                    className="manageproducts-image"
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>₹ {p.price}</td>
                <td>
                  
                  <button onClick={() => handleEdit(p) } className="manageproducts-edit-btn">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="manageproducts-delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="manageproducts-form-wrapper">
          {/* <h3 className="manageproducts-form-title">{editId ? 'Update Product' : 'Add New Product'}</h3> */}
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="manageproducts-form">
            <h3 className="manageproducts-form-title">{editId ? 'Update Product' : 'Add New Product'}</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
            <button type="submit" className="manageproducts-submit-btn">
              {editId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ManageProducts;
