import React, { useEffect, useState } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

const deleteUser = (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) {
    return;
  }

  fetch(`http://localhost:8080/users/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    })
    .catch((err) => console.log(err));
};
  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        👥 Manage Users
      </h1>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  }}
>
  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,.1)",
      width: "220px",
      textAlign: "center",
    }}
  >
    <h3>Total Users</h3>
    <h1>{users.length}</h1>
  </div>

  <input
    type="text"
    placeholder="🔍 Search by Name or Email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "320px",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
    }}
  />
</div>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
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
              color: "white",
            }}
          >
           <tr>
             <th style={th}>ID</th>
             <th style={th}>Name</th>
             <th style={th}>Email</th>
             <th style={th}>Action</th>
           </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td style={td}>{user.id}</td>
                <td style={td}>{user.name}</td>
                <td style={td}>{user.email}</td>

                <td style={td}>
                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
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
  padding: "15px",
  textAlign: "left",
};

const td = {
  padding: "15px",
};

export default ManageUsers;