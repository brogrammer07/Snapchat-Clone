import { AttachFile, Close, Create, Crop, MusicNote, Note, Send, TextFields, Timer } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import './Preview.css'
import {v4 as uuid} from 'uuid'
import { db, storage } from './firebase'
import {collection,addDoc,serverTimestamp} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from '@firebase/storage'
import { selectUser } from './features/appSlice'
function Preview() {
    const cameraImage = useSelector(selectCameraImage)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    useEffect(()=>{
        if(!cameraImage){
            navigate('/camera', { replace: true })
        }
    },[cameraImage,navigate])
    const closePreview = () =>{ 
        dispatch(resetCameraImage())
    }

    const sendPost =() =>{
         const id = uuid()
        const metadata = {
            contentType: 'image/jpeg'
        };
        const storageRef = ref(storage,`posts/${id}`)
        const uploadTask = uploadBytesResumable(storageRef, cameraImage,metadata);
        uploadTask.on('state_changed',null,(error)=>{
            console.log(error)
            },()=>{
                uploadString(storageRef, cameraImage, 'data_url')
                .then((snapshot) =>{
                    getDownloadURL(storageRef).then((url) =>{
                        addDoc(collection(db,'posts') ,{
                            imageUrl: url,
                            username:user.username,
                            profilePic: user.profilePic,
                            read: false,
                            timestamp: serverTimestamp()
                    })
                    navigate('/', { replace: true })   
                        })
                    }
                )
            }
        )
    }

    return (
        <div className='preview'>
            <Close onClick={closePreview} className='preview_close' />
            <div class="preview_toolbarRight">
                <TextFields />
                <Create />
                <Note />
                <MusicNote />
                <AttachFile />
                <Crop />
                <Timer />
            </div>
            <img src={cameraImage} alt="" />
            <div onClick={sendPost} class="preview_footer">
                <h2>Send Now</h2>
                <Send fontSize='small' className='preview_sendIcon' />
            </div>
        </div>
    )
}

export default Preview

