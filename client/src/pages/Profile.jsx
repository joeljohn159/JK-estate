import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import app from "../firebase";

const Profile = () => {
  // DESTRUCTURING
  const {currentUser, loading, error} = useSelector(state => state.user);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);

  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({})

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  function handleFileUpload(file){
    const storage = getStorage(app);
    const currentDateTime = new Date();
    const fileName = currentDateTime.getDate() + currentDateTime.getTime + file.name;

    const storageRef = ref(storage, fileName);
    

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress))
        if(filePercentage === 100) {setTimeout(()=>setFilePercentage(null), 8000)}

      },
      (error) => {
        setFileUploadError(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => setFormData({...formData, photoURL: downloadURL}));    
      }
    )
  }
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>

      <form action="" className=" mt-2 flex flex-col gap-5">
          <input type="file" accept="image/*" ref={fileRef} hidden onChange={(e) => setFile(e.target.files[0])}/>
          <img src={formData.photoURL || currentUser.photoURL} alt="avatar" onClick={() => fileRef.current.click()} className="rounded-full w-24 h-24 object-cover self-center"/>
         <p className="text-center text-xs"> {fileUploadError ? (<span className="text-red-800">Error while uploading, size should be less than 2MB</span>) : filePercentage > 0 && filePercentage < 100 ? <span className="text-green-800">{`Uploading ${filePercentage}%`}</span> : filePercentage === 100 ? (<span  className="text-green-800">Uploaded.</span>) : ''} </p>

          <input type="text" id="username" placeholder="username"  defaultValue={currentUser.username} className="  border-2 p-3 rounded-lg" />
          <input type="text" id="email" placeholder="email"  defaultValue={currentUser.email} className="  border-2 p-3 rounded-lg" />
          <input type="text" id="password" placeholder="password"   className="  border-2 p-3 rounded-lg" />

          <button className="rounded-lg text-center bg-slate-700 p-3 text-white font-semibold uppercase hover:opacity-90">Submit</button>
          <div className="flex justify-around my-2 gap-5">
            <span className="p-2 rounded-lg hover:opacity-90 cursor-pointer text-white basis-0 grow text-center bg-red-500">Delete Account</span>
            <span className="p-2 rounded-lg hover:opacity-90 cursor-pointer text-white  basis-0 grow text-center  bg-red-500">Sign Out</span>
          </div>
      </form>
    </div>
  )
}

export default Profile