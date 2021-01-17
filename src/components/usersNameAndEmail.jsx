import React from "react";

function UsersNameAndEmail() {
  const firstName = localStorage.getItem("usersFirstName") || "";
  const lastName = localStorage.getItem("usersLastName") || "";
  const email = localStorage.getItem("usersEmail") || "";

  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <div>
          {firstName} {lastName}
        </div>
        <div>{email}</div>
      </div>
    </nav>
  );
}

export default UsersNameAndEmail;
