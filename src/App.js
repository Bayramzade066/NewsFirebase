import './App.css';
import {BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import { useState } from 'react';
import { signOut } from "firebase/auth";

import {auth} from './firebase-config'


function App() {
  const [isAuth, setisAuth] = useState(localStorage.getItem("isAuth"))


  const signUserOut=()=>{
    signOut(auth).then(()=>{
      localStorage.clear();
      setisAuth(false);
      window.location.pathname="/login";
    })
}

 

  return (
    <Router>
    <nav>
      <Link to="/">News</Link>
      
      {!isAuth ? (<Link to="/login">Login</Link>) : 
      <>
      <Link to="/createpost">Create News</Link>
      <button className="Logout" onClick={signUserOut}>Log out</button>
      </>
      }
    </nav>
      <Routes>
        <Route path="/" element={<Home IsAuth={isAuth} />} />
        <Route path="/login"  element={<Login setIsAuth={setisAuth} />} />
        <Route path="/createpost" element={<CreatePost IsAuth={isAuth} />} />
        <Route path="/postdetails/:id" element={<PostDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
