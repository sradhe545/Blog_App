import "./login.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
export default function Login() {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const {dispatch,isFetching}=useContext(Context)
  const handleSubmit = async (e) => {
    e.preventDefault();
  dispatch({type:"LOGIN_START"})

    try {
      const res = await axios.post("https://blogapp-6huo.onrender.com/user/login", {
        email,
        password,
      })
      dispatch({type:"LOGIN_SUCCESS",payload:res.data.others})
     localStorage.setItem("blog-token",(res.data.token))
      navigate("/")
    } catch (err) {
      dispatch({type:"LOGIN_FAILED"})
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
        <button type="submit" className="loginButton" disabled={isFetching}>Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
