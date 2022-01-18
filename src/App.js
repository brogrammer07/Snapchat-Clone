import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import { Routes, Route,  } from "react-router-dom";
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import { useDispatch } from 'react-redux';
import Login from './Login';
import { auth } from './firebase';
import { onAuthStateChanged } from '@firebase/auth';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(()=>{
    onAuthStateChanged(auth,(authUser)=>{
      if (authUser){
        dispatch(login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
        }))
      } else{
        dispatch(logout())
      }
    })
  },[])

  return (
    <div className="app">
      
      {!user ?(
          <Login />
      ):(
          <>
          <img className='app_logo' src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="" />
          <div class="app_body">
            <div class="app_bodyBackground">
              <Routes>
              <Route path="/chats/view" element={<ChatView />} />
              <Route exact path="/" element={<Chats />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/camera" element={<WebcamCapture />} />
              </Routes>
            </div>
          
          </div>
          </>
      )} 
    </div>
  );
}

export default App;
