import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8080/orders")
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.log(err));
    }, []);

const cancelOrder = (id) => {
  fetch(`http://localhost:8080/orders/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setOrders(orders.filter((order) => order.id !== id));
      alert("Order cancelled successfully!");
    })
    .catch((err) => console.log(err));
};

const downloadInvoice = (order) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text("Naina Artistry", 70, 20);

  doc.setFontSize(12);
  doc.text(`Invoice`, 14, 35);
  doc.text(`Order ID: ${order.id}`, 14, 45);
  doc.text(`Date: ${order.date}`, 14, 55);
  doc.text(`Address: ${order.address}`, 14, 65);

  // Table
  const items = JSON.parse(order.items);

  autoTable(doc, {
    startY: 75,
    head: [["Product", "Qty", "Price"]],
    body: items.map((item) => [
      item.name,
      item.quantity,
      `₹${item.price}`,
    ]),
  });

  // Total
  const finalY = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(14);
  doc.text(`Total: ₹${order.total}`, 14, finalY);

  doc.setFontSize(12);
  doc.text("Thank you for shopping with Naina Artistry!", 14, finalY + 15);

  // Save PDF
  doc.save(`Invoice_Order_${order.id}.pdf`);
};
  return (
    <div style={{ padding: "30px" }}>


      <h2>My Orders 📦</h2>

      {orders.length === 0 ? (
        <h3>No Orders Yet</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "25px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
            }}
          >
            <h3>Order ID: {order.id}</h3>

            <p>
              <b>Date:</b> {order.date}
            </p>

            <p>
              <b>Address:</b> {order.address}
            </p>

            <p>
              <b>Status:</b>
              <span style={{ color: "green" }}>
                {" "}Placed ✅
              </span>
            </p>

            <hr />

           {JSON.parse(order.items).map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px"
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginRight: "20px"
                  }}
                />

                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <p>Quantity : {item.quantity}</p>
                </div>
              </div>
            ))}

            <hr />

            <h3>Total : ₹{order.total}</h3>

           <div
             style={{
               display: "flex",
               gap: "15px",
               marginTop: "20px",
             }}
           >
             <button
               onClick={() => downloadInvoice(order)}
               style={{
                 background: "#1976d2",
                 color: "white",
                 border: "none",
                 padding: "10px 20px",
                 borderRadius: "5px",
                 cursor: "pointer",
                 fontWeight: "bold",
               }}
             >
               📄 Download Invoice
             </button>

             <button
               onClick={() => cancelOrder(order.id)}
               style={{
                 background: "red",
                 color: "white",
                 border: "none",
                 padding: "10px 20px",
                 borderRadius: "5px",
                 cursor: "pointer",
                 fontWeight: "bold",
               }}
             >
               Cancel Order
             </button>
           </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;