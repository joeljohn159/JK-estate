import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import  app  from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = ({value}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        })
      })

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not sign in with Google', error)
    }
  }

  return (
    <button type='button' onClick={handleGoogleClick} className='text-white bg-red-500 p-3 rounded-lg hover:opacity-90 uppercase'>{value  }</button>
  )
}

export default OAuth