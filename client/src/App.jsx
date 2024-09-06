import React from 'react';
// import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

  // const router = createBrowserRouter([
  //   { path:"/", element: <Home/>},
  //   { path:'/profile', element: <Profile/>},
  //   { path:'/sign-up', element: <SignUp/>},
  //   { path:'/sign-in', element: <SignIn/>},
  //   { path:'/about', element: <About/>},
  
  // ])
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/sign-up' element={<SignUp/>}></Route>
        <Route path='/sign-in' element={<SignIn/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/profile' element={<Profile/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    {/* <RouterProvider router={router}></RouterProvider> */}
    </>
  )
}

export default App