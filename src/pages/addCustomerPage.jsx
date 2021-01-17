import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const [nameInput, setNameInput] = useState("Kalle");
  const [orgNumberInput, setOrgNumberInput] = useState("924894");

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
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        history.push("/home");
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
