import { Link } from "react-router-dom";
import "./post.css";
import {format} from 'timeago.js'
export default function Post({_id, categories,title,photo,desc,createdAt}) {
  return (
    <div className="post">
      {
        photo&& (<img
          className="postImg"
          src={photo}
          alt=""
        />)
      }
      
      <div className="postInfo">
        <div className="postCats">
          {
            categories.map((el)=>{return(<>
            <span className="postCat">
            <Link className="link" to={`/posts?cat=${el}`}>
              {el}
            </Link>
          </span>
            
            </>)})
          }
        </div>
        <span className="postTitle">
          <Link to={`/post/${_id}`} className="link">
            {title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{format(createdAt)}</span>
      </div>
      <p className="postDesc">
       {desc}
      </p>
    </div>
  );
}
