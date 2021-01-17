import React, { useState, useEffect } from "react";

function HomePage() {
  const token = localStorage.getItem("token");
  const [customersInfo, setCustomersInfo] = useState([]);

  function fetchCustomers() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCustomersInfo(data.results));
  }

  useEffect(fetchCustomers, [token]);

  return (
    <div>
      <h1>Home</h1>
      <table>
        {customersInfo.map((customer) => (
          <tr>
            <td>{customer.name}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default HomePage;
