import axios from 'axios';
import React from 'react';

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
    <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">
      <input type="text" name="login" placeholder="Admin name" className="login-input"/>
      <input type="password" name="password" placeholder="Admin password" className="login-input"/>
      <button type="submit" className="login-butoon">login</button>
    </form>
    </div>
  )
}
