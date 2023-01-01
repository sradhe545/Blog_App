import Post from "../post/Post";
import "./posts.css";

export default function Posts({data}) {
  return (
    <div className="posts">
      {
        data.map((el)=>{
          return(<>
          <Post {...el}/>
          
          </>)
        })
      }
      </div>
  );
}
