// Invoice.jsx
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Invoice.css';

function Invoice() {
  const location = useLocation();
  const { user, cart, total } = location.state || {};
  const orderTime = new Date().toLocaleString();
  const invoiceRef = useRef();

  useEffect(() => {
    if (invoiceRef.current) {
      html2canvas(invoiceRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
      });
    }
  }, []);

  if (!user || !cart || cart.length === 0) {
    return <h2 className="invoice-error">No order details found.</h2>;
  }

  return (
    <div className="invoice-container" ref={invoiceRef}>
      <img src="/images/logo1.png" alt="Sam Logo" className="hero-logo" />
      <h1>Order Invoice</h1>
      <div className="invoice-header">
        <p><strong>Customer:</strong> {user.name}</p>
        {/* <p><strong>Email:</strong> {user.email}</p> */}
        <p><strong>Order Date:</strong> {orderTime}</p>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Grand Total</strong></td>
            <td><strong>₹{total}</strong></td>
          </tr>
        </tfoot>
      </table>

      <p className="thank-you">Thank you for your purchase!</p>
    </div>
  );
}

export default Invoice;
