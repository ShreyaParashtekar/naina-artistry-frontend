import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

 useEffect(() => {
   fetch("https://naina-artistry-backend.onrender.com/products")
     .then((res) => res.json())
     .then((data) => setProducts(data));

   fetch("https://naina-artistry-backend.onrender.com/orders")
     .then((res) => res.json())
     .then((data) => setOrders(data));

   fetch("https://naina-artistry-backend.onrender.com/users")
     .then((res) => res.json())
     .then((data) => setUsers(data));
 }, []);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalUsers = users.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.stock <= 5
  );

  const recentOrders = [...orders]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

    const chartData = orders.map((order) => ({
      order: `#${order.id}`,
      revenue: Number(order.total),
    }));

    const statusData = [
      {
        name: "Placed",
        value: orders.filter((o) => o.status === "Placed").length,
      },
      {
        name: "Shipped",
        value: orders.filter((o) => o.status === "Shipped").length,
      },
      {
        name: "Delivered",
        value: orders.filter((o) => o.status === "Delivered").length,
      },
    ];

    const COLORS = ["#ff9800", "#2196f3", "#4caf50"];

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        👨‍💼 Admin Dashboard
      </h1>

      {/* Dashboard Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div style={cardStyle}>
          <h3>📦 Products</h3>
          <h1>{totalProducts}</h1>
        </div>

        <div style={cardStyle}>
          <h3>🛒 Orders</h3>
          <h1>{totalOrders}</h1>
        </div>

        <div style={cardStyle}>
          <h3>💰 Revenue</h3>
          <h1>₹{totalRevenue.toLocaleString()}</h1>
        </div>

        <div style={cardStyle}>
          <h3>👤 Users</h3>
          <h1>{totalUsers}</h1>
        </div>
      </div>

      {/* Buttons */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,220px)",
          gap: "20px",
          marginBottom: "50px",
        }}
      >
        <button style={btnStyle} onClick={() => navigate("/add-product")}>
          ➕ Add Product
        </button>

        <button style={btnStyle} onClick={() => navigate("/manage-products")}>
          📦 Manage Products
        </button>

        <button style={btnStyle} onClick={() => navigate("/manage-orders")}>
          🛒 Manage Orders
        </button>

        <button style={btnStyle} onClick={() => navigate("/users")}>
          👤 Manage Users
        </button>

        <button
          style={{
            ...btnStyle,
            background: "#dc3545",
          }}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Low Stock */}

      <h2>⚠️ Low Stock Products</h2>

      <div style={tableContainer}>
        {lowStockProducts.length === 0 ? (
          <h3
            style={{
              padding: "20px",
              color: "green",
            }}
          >
            ✅ All products have sufficient stock
          </h3>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeading}>Product</th>
                <th style={tableHeading}>Category</th>
                <th style={tableHeading}>Stock</th>
              </tr>
            </thead>

            <tbody>
              {lowStockProducts.map((product) => (
                <tr key={product.id}>
                  <td style={tableCell}>{product.name}</td>

                  <td style={tableCell}>{product.category}</td>

                  <td
                    style={{
                      ...tableCell,
                      color:
                        product.stock === 0
                          ? "red"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {product.stock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

<h2 style={{ marginTop: "50px" }}>
  📊 Dashboard Analytics
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    marginTop: "20px",
    marginBottom: "40px",
  }}
>
  {/* Revenue Chart */}

  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <h3 style={{ textAlign: "center" }}>
      Revenue Analytics
    </h3>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="order" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Order Status Pie Chart */}

  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <h3 style={{ textAlign: "center" }}>
      Order Status
    </h3>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={statusData}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
        >
          {statusData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>


      {/* Recent Orders */}

      <h2 style={{ marginTop: "50px" }}>
        🕒 Recent Orders
      </h2>

      <div style={tableContainer}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeading}>Order ID</th>
              <th style={tableHeading}>Address</th>
              <th style={tableHeading}>Total</th>
              <th style={tableHeading}>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td style={tableCell}>#{order.id}</td>

                <td style={tableCell}>{order.address}</td>

                <td style={tableCell}>
                  ₹{Number(order.total).toLocaleString()}
                </td>

                <td
                  style={{
                    ...tableCell,
                    fontWeight: "bold",
                    color:
                      order.status === "Delivered"
                        ? "green"
                        : order.status === "Shipped"
                        ? "#1976d2"
                        : "#ff9800",
                  }}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const btnStyle = {
  padding: "15px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "bold",
};

const tableContainer = {
  background: "#fff",
  marginTop: "20px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const tableHeading = {
  padding: "15px",
  background: "#f5f5f5",
  textAlign: "left",
};

const tableCell = {
  padding: "15px",
  borderTop: "1px solid #eee",
};

export default AdminDashboard;