import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import {  Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Mypost from "./pages/mypost/mypost";

function App() {
  const {user}=useContext(Context)
  console.log(user);
  return (
    <>
     <Topbar />
    
    <Routes>
     
     
        <Route  path="/" element={<Homepage />}/>
          
      
        <Route path="/posts"  element={<Homepage />}/>
          
       
        <Route path="/register" element={<Register />}/> 
          
        {/* <Route path="/mypost" element={<Mypost />}/>  */}
        
        <Route path="/login" element={<Login />}/> 
          {/* {currentUser ? <Homepage /> : <Login />} */}
            
          
        <Route path="/post/:id" element={<Single />} />
          
        

        <Route path="/write" element={<Write/>}/>
          {/* {currentUser ? <Write /> : <Login />} */}
        <Route path="/settings" element={<Settings />}/>
          
          {/* {currentUser ? <Settings /> : <Login />} */}
        
    
    </Routes>
    </>
  );
}

export default App;
