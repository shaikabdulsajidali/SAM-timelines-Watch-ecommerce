import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewOrders.css'; // Make sure to create this CSS file too

function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="orders-container">
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Image</th>
              <th>Cart Items</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{order.user.name}</td>
                <td>{order.user.email}</td>
                <td>
                  <img src={`http://localhost:5000/${order.user.image}`} alt="user" width="50" height="50" />
                </td>
                <td>
                  {order.cart.map((item, i) => (
                    <div key={i}>
                      {item.name} x {item.quantity} = ₹{item.price * item.quantity}
                    </div>
                  ))}
                </td>
                <td>₹{order.total}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewOrders;
