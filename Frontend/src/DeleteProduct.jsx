import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DeleteProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      alert('Deleted successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Delete Product</h2>
      {products.map(p => (
        <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
          <span>{p.name}</span>
          <button onClick={() => handleDelete(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default DeleteProduct;
