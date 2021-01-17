import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const [emailInput, setEmailInput] = useState("webb19@willandskill.se");
  const [passwordInput, setPasswordInput] = useState("javascriptoramverk");

  const history = useHistory();

  // function handleEmailInput(e) {
  //   console.log(e.target.value);
  // }
  // function handlePasswordInput(e) {
  //   console.log(e.target.value);
  // }
  //一つにまとめると以下のようになる。

  function handleOnChange(e) {
    // console.log(e.target.value);
    //nameとpasswordを区別できるように変える。
    console.log(e.target.name, e.target.value);
    if (e.target.name === "email") {
      setEmailInput(e.target.value);
    }
    if (e.target.name === "password") {
      setPasswordInput(e.target.value);
    }
  }

  function loginButtonClick(e) {
    let dataToSend = {
      email: emailInput,
      password: passwordInput,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    };
    fetch("https://frebi.willandskill.eu/api-token-auth/", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        return fetch("https://frebi.willandskill.eu/api/v1/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        });
      })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("usersFirstName", data.firstName);
        localStorage.setItem("usersLastName", data.lastName);
        localStorage.setItem("usersEmail", data.email);

        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="col">
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <label className="form-label">Email</label>
        {/* <input className="form-control"  onChange={handleEmailInput} /> */}
        <input
          className="form-control"
          name="email"
          onChange={handleOnChange}
          value={emailInput}
          className="form-control"
        />
        <br />
        <label className="form-label">Password</label>
        {/* <input className="form-control"  onChange={handlePasswordInput} /> */}
        <input
          className="form-control"
          name="password"
          onChange={handleOnChange}
          value={passwordInput}
          className="form-control"
        />
        <button
          onClick={loginButtonClick}
          className="w-100 btn btn-lg btn-primary"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
