import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function DetailCustomerPage() {
  const { customerID } = useParams();

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

  console.log(customersInfo);

  function fetchCustomerItem() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/${customerID}/`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCustomersInfo(data));
  }

  function removeCustomer() {
    const url = `https://frebi.willandskill.eu/api/v1/customers/${customerID}/`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(fetchCustomerItem, [token, customerID]);

  return (
    <div className="w-50 container-fluid">
      <h1>{customersInfo.name}</h1>
      <div>
        <div className="form-label">Name</div>
        <div className="field">
          <input
            className="form-control"
            type="text"
            name="name"
            value={customersInfo.name || ""}
            readOnly
          />
        </div>
        <br />
        <div className="form-label">Organisation Number</div>
        <div className="field">
          <input
            className="form-control"
            type="text"
            name="organisationNr"
            value={customersInfo.organisationNr || ""}
            readOnly
          />
        </div>
        <br />
        <div className="form-label">VAT Number</div>
        <div className="field">
          <input
            className="form-control"
            type="text"
            name="vatNr"
            value={customersInfo.vatNr || ""}
            readOnly
          />
        </div>
        <br />
        <div className="form-label">Reference</div>
        <div className="field">
          <input
            className="form-control"
            type="text"
            name="reference"
            value={customersInfo.reference || ""}
            readOnly
          />
        </div>
        <br />
        <div className="form-label">Payment Term</div>
        <div className="field">
          <input
            className="form-control"
            type="number"
            name="paymentTerm"
            value={customersInfo.paymentTerm || ""}
            readOnly
          />
        </div>
        <br />
        <div className="form-label">Website URL</div>
        <div className="field">
          <input
            className="form-control"
            type="url"
            name="website"
            value={customersInfo.website || ""}
            readOnly
          />
        </div>
        <br />
        <div className="form-label">Email</div>
        <div className="field">
          <input
            className="form-control"
            type="email"
            name="email"
            value={customersInfo.email || ""}
            readOnly
          />
        </div>
        <br />
        <div className="form-label">Phone Number</div>
        <div className="field">
          <input
            className="form-control"
            type="tel"
            name="phoneNumber"
            value={customersInfo.phoneNumber || ""}
            readOnly
          />
        </div>
      </div>
      <br />
      <button onClick={removeCustomer} className="w-100 btn btn-lg btn-warning">
        Remove {customersInfo.name}
      </button>
    </div>
  );
}

export default DetailCustomerPage;
