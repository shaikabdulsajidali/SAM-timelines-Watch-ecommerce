// Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import Footer from '../Footer/Footer';

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [expandedDesc, setExpandedDesc] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const toggleDescription = (id) => {
    setExpandedDesc(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addToCart = (product, quantity) => {
    const qty = parseInt(quantity) || 1;
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + qty }
          : item
      ));
    } else {
      setCart(prev => [...prev, { ...product, quantity: qty }]);
    }
    alert('Product added to cart');
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const handleBuy = (product) => {
    const order = [{ ...product, quantity: 1 }];
    const total = product.price;
    axios.post('http://localhost:5000/api/orders', {
      user,
      cart: order,
      total,
      date: new Date()
    });
    navigate('/invoice', { state: { user, cart: order, total } });
  };

  const handleCartBuy = () => {
    if (cart.length > 0) {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      axios.post('http://localhost:5000/api/orders', {
        user,
        cart,
        total,
        date: new Date()
      });
      navigate('/invoice', { state: { user, cart, total } });
      setCart([]);
    }
  };

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'low' ? a.price - b.price :
      sortOrder === 'high' ? b.price - a.price : 0
    );

  if (!user) return <h2 className="error">Please login to view your profile.</h2>;

  return (
    <div className="profile-container">
      <header className="profile-header">
        <img src={`http://localhost:5000/${user.image}`} alt="User" className="avatar" />
        <h2>{user.name}</h2>
        <div className="action-buttons">
          <button className="btn" onClick={() => navigate('/logout')}>Logout</button>
          <button className="btn" onClick={() => navigate('/update')}>Update</button>
        </div>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select onChange={e => setSortOrder(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <h3 className="section-heading">Available Products</h3>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product._id}>
            <div className="product-image-box">
              <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
            </div>
            <h4>{product.name}</h4>
            <p className={`desc ${expandedDesc[product._id] ? 'expanded' : 'collapsed'}`}>{product.description}</p>
            <button className="read-more" onClick={() => toggleDescription(product._id)}>
              {expandedDesc[product._id] ? 'Read Less' : 'Read More'}
            </button>
            <p className="price">₹{product.price}</p>
            <input type="number" defaultValue="1" min="1" id={`qty-${product._id}`} />
            <div className="product-actions">
              <button className="btn" onClick={() => addToCart(product, document.getElementById(`qty-${product._id}`).value)}>Add to Cart</button>
              <button className="btn buy" onClick={() => handleBuy(product)}>Buy</button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn toggle-cart" onClick={() => setShowCart(!showCart)}>
        {showCart ? 'Hide Cart' : 'View Cart'}
      </button>

      {showCart && (
        <div className="cart">
          <h3>Cart Details</h3>
          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.price * item.quantity}</td>
                      <td><button className="btn danger" onClick={() => removeFromCart(item._id)}>Remove</button></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3"><strong>Total:</strong></td>
                    <td colSpan="2"><strong>₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</strong></td>
                  </tr>
                </tfoot>
              </table>
              <button className="btn buy" onClick={handleCartBuy}>Buy All</button>
            </>
          )}
        </div>
      )}

      <Footer/>
    </div>
  );
}

export default Profile;