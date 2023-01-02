import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export default function Settings() {
  let token=localStorage.getItem("blog-token")
  const navigate=useNavigate()
  const {user,dispatch}=useContext(Context)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const PF = "https://radheblog-production.up.railway.app/images/"
 
  // const [success, setSuccess] = useState(true);
  const handleSubmit=async (e)=>{
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      username,
      email,
      password
    };

    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.photo = filename;
      try {
        await axios.post("https://radheblog-production.up.railway.app/upload", data);
        
      } catch (err) {}
    }



    try {
      const res = await axios.put("https://radheblog-production.up.railway.app/user/update/"+user._id, updatedUser,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        // alert("You have Updated successfully")
        navigate("/")
      // window.location.replace("http://localhost:8080/post/" + res.data._id);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  }
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          {/* <span className="settingsTitleDelete">Delete Account</span> */}
        </div>
        <form className="settingsForm" onClick={handleSubmit}>
          {/* <label>Profile Picture</label>
          <div className="settingsPP">
            <img
             src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div> */}
          <label>Username</label>
          <input   onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Username" name="name" />
          <label>Email</label>
          <input   onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" name="email" />
          <label>Password</label>
          <input
           onChange={(e) => setPassword(e.target.value)}
          type="password" placeholder="Password" name="password" />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        

        {/* {!success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )} */}

        </form>
      </div>
      <Sidebar />
    </div>
  );
}
