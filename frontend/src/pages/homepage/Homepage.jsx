import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios"
import { useEffect, useState } from "react";
export default function Homepage() {
  const location = useLocation();
  const [data,setData] = useState([])
  async function  getAllPost(){
  const response=await axios.get("https://blogapp-6huo.onrender.com/post/all").then((res)=>{
    setData(res.data);
  })
  }
  useEffect(()=>{
    getAllPost();
  },[])
  return (
    <>
      <Header />
      <div className="home">
        <Posts data={data}/>
        <Sidebar />
      </div>
    </>
  );
}
