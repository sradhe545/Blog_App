import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";
import { format } from "timeago.js";
import { useContext } from "react";
import { Context } from "../../context/Context";
export default function SinglePost() {
  const location = useLocation();
  let token=localStorage.getItem("blog-token")
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const pf="https://radheblog-production.up.railway.app/images/"
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("https://radheblog-production.up.railway.app/post/" + path);
      console.log(res.data.msg);
       setPost(res.data.msg);
    };
    getPost();
  }, [path]);
  const {user}=useContext(Context)
  console.log(post);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://radheblog-production.up.railway.app/post/delete/${post._id}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      let res=await axios.put(`https://radheblog-production.up.railway.app/post/update/${post._id}`,{title,desc}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(res);
     setUpdateMode(false)
    } catch (err) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {
          post.photo &&<img
          className="singlePostImg"
          src={pf+post.photo}
          alt=""
        />
      }

      {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (

        
        
        
        <h1 className="singlePostTitle">
          {post.title}
         {
            post.username===user?.username && 
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}>Edit</i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}>Delete</i>
          </div>
           }
        </h1>

 )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?username=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{format(post.createdAt)}</span>
        </div>


        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post.desc}</p>
        )}


        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}


      </div>
    </div>
  );
}
