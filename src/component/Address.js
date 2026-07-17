import React, { useState, useEffect } from "react";

function Address() {
  const emptyAddress = {
    fullName: "",
    mobile: "",
    house: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  };

  const [address, setAddress] = useState(emptyAddress);
  const [saved, setSaved] = useState(false);

 useEffect(() => {
   const storedAddress = localStorage.getItem("address");

   if (!storedAddress) return;

   try {
     const parsed = JSON.parse(storedAddress);
     setAddress(parsed);
     setSaved(true);
   } catch (error) {
     // Old address stored as plain text
     setAddress({
       fullName: "",
       mobile: "",
       house: storedAddress,
       area: "",
       city: "",
       state: "",
       pincode: "",
     });
     setSaved(true);
   }
 }, []);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = () => {
    localStorage.setItem("address", JSON.stringify(address));
    setSaved(true);
    alert("Address Saved Successfully ✅");
  };

  const editAddress = () => {
    setSaved(false);
  };

  const deleteAddress = () => {
    localStorage.removeItem("address");
    setAddress(emptyAddress);
    setSaved(false);
  };

  return (
    <div className="address-page">

      <h2>Delivery Address</h2>

      {saved ? (
        <div className="saved-address">

          <h3>Saved Address</h3>

          <p><strong>{address.fullName}</strong></p>

          <p>{address.house}</p>

          <p>{address.area}</p>

          <p>{address.city}, {address.state}</p>

          <p>{address.pincode}</p>

          <p>📞 {address.mobile}</p>

          <div className="address-buttons">
            <button onClick={editAddress}>Edit</button>

            <button
              className="delete-btn"
              onClick={deleteAddress}
            >
              Delete
            </button>
          </div>

        </div>
      ) : (
        <div className="address-form">

          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Mobile Number"
            name="mobile"
            value={address.mobile}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="House / Flat No"
            name="house"
            value={address.house}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Area / Street"
            name="area"
            value={address.area}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="City"
            name="city"
            value={address.city}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="State"
            name="state"
            value={address.state}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Pincode"
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
          />

          <button onClick={saveAddress}>
            Save Address
          </button>

        </div>
      )}

    </div>
  );
}

export default Address;