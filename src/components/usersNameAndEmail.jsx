import React from "react";

function UsersNameAndEmail() {
  const firstName = localStorage.getItem("usersFirstName") || "";
  const lastName = localStorage.getItem("usersLastName") || "";
  const email = localStorage.getItem("usersEmail") || "";

  return (
    <div>
      <div>{firstName}</div>
      <div>{lastName}</div>
      <div>{email}</div>
    </div>
  );
}

export default UsersNameAndEmail;
