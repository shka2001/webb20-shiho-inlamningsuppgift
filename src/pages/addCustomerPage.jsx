import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function AddCustomerPage() {
  const token = localStorage.getItem("token");
  const [customersInfo, setCustomersInfo] = useState({
    name: "Test Name",
    organisationNr: "SE0101010101",
    vatNr: "SE010100101010",
    reference: "Test Reference",
    paymentTerm: "90",
    website: "https://github.com/hassanmian/webb20-js-lesson-jwt",
    email: "test@gmail.com",
    phoneNumber: "0046850101010",
  });
  const history = useHistory();

  function handleOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const newObj = { ...customersInfo, [name]: value };
    setCustomersInfo(newObj);
  }

  function addCustomer() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(customersInfo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Add Customer</h1>
      <div>
        <div className="label">Name</div>
        <div className="field">
          <input
            type="text"
            name="name"
            onChange={handleOnChange}
            value={customersInfo.name}
          />
        </div>
        <div className="label">Organisation Number</div>
        <div className="field">
          <input
            type="text"
            name="organisationNr"
            onChange={handleOnChange}
            value={customersInfo.organisationNr}
          />
        </div>
        <div className="label">VAT Number</div>
        <div className="field">
          <input
            type="text"
            name="vatNr"
            onChange={handleOnChange}
            value={customersInfo.vatNr}
          />
        </div>
        <div className="label">Reference</div>
        <div className="field">
          <input
            type="text"
            name="reference"
            onChange={handleOnChange}
            value={customersInfo.reference}
          />
        </div>
        <div className="label">Payment Term</div>
        <div className="field">
          <input
            type="number"
            name="paymentTerm"
            onChange={handleOnChange}
            value={customersInfo.paymentTerm}
          />
        </div>
        <div className="label">Website URL</div>
        <div className="field">
          <input
            type="url"
            name="website"
            onChange={handleOnChange}
            value={customersInfo.website}
          />
        </div>
        <div className="label">Email</div>
        <div className="field">
          <input
            type="email"
            name="email"
            onChange={handleOnChange}
            value={customersInfo.email}
          />
        </div>
        <div className="label">Phone Number</div>
        <div className="field">
          <input
            type="tel"
            name="phoneNumber"
            onChange={handleOnChange}
            value={customersInfo.phoneNumber}
          />
        </div>
        <button onClick={addCustomer}>Save Customer</button>
      </div>
    </div>
  );
}

export default AddCustomerPage;
