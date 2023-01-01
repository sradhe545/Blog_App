import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";
import { format } from "timeago.js";
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:8080/post/" + path);
      console.log(res.data.msg);
       setPost(res.data.msg);
    };
    getPost();
  }, [path]);
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {
          post.photo &&<img
          className="singlePostImg"
          src={post.photo}
          alt=""
        />
      }
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit">Edit</i>
            <i className="singlePostIcon far fa-trash-alt">Delete</i>
          </div>
        </h1>
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
        <p className="singlePostDesc">
         {post.desc}
          <br />
          <br />
         
        </p>
      </div>
    </div>
  );
}
