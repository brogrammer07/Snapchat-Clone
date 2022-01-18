import { signOut } from '@firebase/auth'
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import { ChatBubble, RadioButtonUnchecked, Search } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Chat from './Chat'
import './Chats.css'
import { selectUser } from './features/appSlice'
import { resetCameraImage } from './features/cameraSlice'
import { auth, db } from './firebase'
function Chats() {
    const [posts,setPosts] = useState([])
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),(snapshot => setPosts(snapshot.docs.map(doc=>({
                    id: doc.id,
                    data: doc.data(),
                })))
            )
        )
    },[])

    const takeSnap = () =>{
        dispatch(resetCameraImage)
        navigate('/camera')
    }

    return (
        <div className='chats'>
            <div class="chats_header">
                <Avatar src={user.profilePic} onClick={()=> signOut(auth)} className='chats_avatar' />
                <div class="chats_search">
                    <Search className='chats_searchIcon' />
                    <input placeholder='Friends' type="text"/>
                </div>
                <ChatBubble className='chats_chatIcon' />
            </div>
            <div class="chats_posts">
                {posts.map(({id, data: { username,profilePic,read,timestamp,imageUrl}}) => (
                    <Chat
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic}
                    />
                ))}
            </div>
            <RadioButtonUnchecked 
                className='chats_takePicIcon'
                onClick={takeSnap}
                fontSize='large'
            />
        </div>
        
    )
}

export default Chats
