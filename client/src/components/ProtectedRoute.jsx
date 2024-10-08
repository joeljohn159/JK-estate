import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const currentUser = useSelector(state => state.user);
  return currentUser.currentUser ? <Outlet/> : <Navigate  to = '/sign-in'/> 
}

export default ProtectedRoute