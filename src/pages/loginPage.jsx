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
    <div>
      <div>
        <label>Email</label>
        {/* <input onChange={handleEmailInput} /> */}
        <input name="email" onChange={handleOnChange} value={emailInput} />
        <label>Password</label>
        {/* <input onChange={handlePasswordInput} /> */}
        <input
          name="password"
          onChange={handleOnChange}
          value={passwordInput}
        />
        <button onClick={loginButtonClick}>Log In</button>
      </div>
    </div>
  );
}

export default LoginPage;
