
import React,{useState,useEffect} from 'react'
import {collection,onSnapshot} from 'firebase/firestore'
import { db } from '../firebase-config';
import {useParams} from 'react-router-dom';
import './details.css'


function PostDetails() {
 
  const [newlists, setNewlist] = useState([]);
  const newsCollectionRef = collection(db, "news")


  const {id} = useParams()
  const user = newlists.find(u => u.id===String(id))

 
  

 useEffect(() => { 
  
  const getNews = ()=>{
      onSnapshot((newsCollectionRef),(snapshot)=>{
      setNewlist(snapshot.docs.map(doc=>({...doc.data(),id: doc.id})))
    });
    
  }
  getNews()
}, [])


 

  return (
   <div className="details">


     <h2 className="header">News detail</h2>
     <h1>{user.title}</h1>
     <h2>Category: {user.category}</h2>
     <div className="postimg">
       <img src={`${user.url}`} alt="" />
     </div>
     <p>{user.post}</p>
     <p>Author: {user.author.name}</p>
     <p>Email: {user.author.id}</p>
     
      

     
   </div>
  ) 
}

export default PostDetails