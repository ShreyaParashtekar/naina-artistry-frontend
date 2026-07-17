import React, { useEffect, useState } from "react";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:8080/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, []);

  const updateStatus = (order) => {
    fetch(`http://localhost:8080/orders/${order.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((updatedOrder) => {
        setOrders(
          orders.map((o) =>
            o.id === updatedOrder.id ? updatedOrder : o
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const deleteOrder = (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    fetch(`http://localhost:8080/orders/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setOrders(orders.filter((order) => order.id !== id));
        alert("Order deleted successfully!");
      })
      .catch((err) => console.log(err));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Placed":
        return "#ff9800";
      case "Shipped":
        return "#2196f3";
      case "Delivered":
        return "#4caf50";
      default:
        return "#555";
    }
  };

const filteredOrders = orders.filter((order) => {
  const matchesSearch =
    order.id.toString().includes(search) ||
    order.address.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || order.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  const totalOrders = orders.length;

  const placedOrders = orders.filter(
    (order) => order.status === "Placed"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;


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
          marginBottom: "30px",
        }}
      >
        📦 Manage Orders
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search by Order ID, Address or Status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "400px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >


        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        >
          <option value="All">All Orders</option>
          <option value="Placed">Placed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Summary Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <h4>Total Orders</h4>
          <h2>{totalOrders}</h2>
        </div>

        <div
          style={{
            ...cardStyle,
            background: "#FFF3CD",
          }}
        >
          <h4>Placed</h4>
          <h2>{placedOrders}</h2>
        </div>

        <div
          style={{
            ...cardStyle,
            background: "#D1ECF1",
          }}
        >
          <h4>Shipped</h4>
          <h2>{shippedOrders}</h2>
        </div>

        <div
          style={{
            ...cardStyle,
            background: "#D4EDDA",
          }}
        >
          <h4>Delivered</h4>
          <h2>{deliveredOrders}</h2>
        </div>
      </div>

      {/* Orders Table */}

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 6px 15px rgba(0,0,0,.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#1f2937",
              color: "#fff",
            }}
          >
            <tr>
              <th style={th}>Order ID</th>
              <th style={th}>Date</th>
              <th style={th}>Address</th>
              <th style={th}>Total</th>
              <th style={th}>Items</th>
              <th style={th}>Status</th>
              <th style={th}>Delete</th>
            </tr>
          </thead>

          <tbody>
           {filteredOrders.map((order) => (
              <tr
                key={order.id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={td}>#{order.id}</td>

                <td style={td}>{order.date}</td>

                <td style={td}>{order.address}</td>

                <td
                  style={{
                    ...td,
                    fontWeight: "bold",
                  }}
                >
                  ₹{order.total}
                </td>

                <td style={td}>
                  {order.items &&
                    JSON.parse(order.items).map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          background: "#fafafa",
                          padding: "10px",
                          borderRadius: "10px",
                          marginBottom: "10px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                          }}
                        />

                        <div style={{ flex: 1 }}>
                          <h4
                            style={{
                              margin: "0 0 5px 0",
                              fontSize: "15px",
                            }}
                          >
                            {item.name}
                          </h4>

                          <p
                            style={{
                              margin: "3px 0",
                              color: "#666",
                            }}
                          >
                            Qty : {item.quantity}
                          </p>

                          <p
                            style={{
                              margin: "3px 0",
                              fontWeight: "bold",
                              color: "#2e7d32",
                            }}
                          >
                            ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                </td>

                <td style={td}>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus({
                        ...order,
                        status: e.target.value,
                      })
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "20px",
                      border: `2px solid ${getStatusColor(order.status)}`,
                      color: getStatusColor(order.status),
                      fontWeight: "bold",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Placed">Placed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>

                <td style={td}>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    style={{
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = {
  padding: "16px",
  textAlign: "left",
};

const td = {
  padding: "16px",
  verticalAlign: "top",
};

const cardStyle = {
  padding: "20px",
  borderRadius: "10px",
  background: "#fff",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

export default ManageOrders;