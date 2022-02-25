import React, { useState,useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';


function CreatePost() {

  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState("")
  const [post, setPost] = useState("")
  const newsCollectionRef = collection(db, "news")
  let navigate = useNavigate();



  
  
  const createPost = async () => {
    await addDoc(newsCollectionRef, {
      title,
      url,
      category,
      post,
       author: {
          name: auth.currentUser.displayName,
           id: auth.currentUser.email 
          }
  });
    navigate("/")
  }



  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input placeholder="Title..." onChange={(event) => {
            setTitle(event.target.value)
          }} />
        </div>
        <div className="inputGp">
          <label> image URL:</label>
          <input placeholder="URL..." onChange={(event) => {
            setUrl(event.target.value)
          }} />
        </div>
        <div className="inputGp">
          <label> Category:</label>
          <input placeholder="Category name..." onChange={(event) => {
            setCategory(event.target.value)
          }} />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea placeholder="Post..." onChange={(event) => {
            setPost(event.target.value)
          }} />
        </div>
        <button onClick={createPost} > Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost