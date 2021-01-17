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
    <div className="container-fluid w-50">
      <h1 className="h3 mb-3 fw-normal">Add Customer</h1>
      <div>
        <div className="form-label">Name</div>
        <div className="field">
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={handleOnChange}
            value={customersInfo.name}
          />
        </div>
        <br />
        <div className="form-label">Organisation Number</div>
        <div className="field">
          <input
            className="form-control"
            type="text"
            name="organisationNr"
            onChange={handleOnChange}
            value={customersInfo.organisationNr}
          />
        </div>
        <br />
        <div className="form-label">VAT Number</div>
        <div className="field">
          <input
            className="form-control"
            type="text"
            name="vatNr"
            onChange={handleOnChange}
            value={customersInfo.vatNr}
          />
        </div>
        <br />
        <div className="form-label">Reference</div>
        <div className="field">
          <input
            className="form-control"
            type="text"
            name="reference"
            onChange={handleOnChange}
            value={customersInfo.reference}
          />
        </div>
        <br />
        <div className="form-label">Payment Term</div>
        <div className="field">
          <input
            className="form-control"
            type="number"
            name="paymentTerm"
            onChange={handleOnChange}
            value={customersInfo.paymentTerm}
          />
        </div>
        <br />
        <div className="form-label">Website URL</div>
        <div className="field">
          <input
            className="form-control"
            type="url"
            name="website"
            onChange={handleOnChange}
            value={customersInfo.website}
          />
        </div>
        <br />
        <div className="form-label">Email</div>
        <div className="field">
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={handleOnChange}
            value={customersInfo.email}
          />
        </div>
        <br />
        <div className="form-label">Phone Number</div>
        <div className="field">
          <input
            className="form-control"
            type="tel"
            name="phoneNumber"
            onChange={handleOnChange}
            value={customersInfo.phoneNumber}
          />
        </div>
        <br />
        <button onClick={addCustomer} className="w-100 btn btn-lg btn-primary">
          Save Customer
        </button>
      </div>
    </div>
  );
}

export default AddCustomerPage;
