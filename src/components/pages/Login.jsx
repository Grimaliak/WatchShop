import axios from 'axios';
import React from 'react'

export default function Login() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    try {
      await axios.post("/api/admin-login", data);
      window.location = "/";
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="login" />
      <input type="password" name="password" />
      <button>login</button>
    </form>
  )
}
