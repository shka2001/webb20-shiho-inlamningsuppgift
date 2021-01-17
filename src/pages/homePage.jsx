import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <tbody>
          {customersInfo.map((customer) => (
            <tr key={customer.id}>
              <td>
                <Link to={"/customer/" + customer.id}>{customer.name}</Link>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add">Add Customer</Link>
    </div>
  );
}

export default HomePage;
