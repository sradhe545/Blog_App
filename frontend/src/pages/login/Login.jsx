import "./login.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      })
     localStorage.setItem("blog-token",(res.data.token))
      
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..."  onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="loginButton">Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
