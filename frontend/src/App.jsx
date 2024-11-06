import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import LogIn from './pages/LogIn'
import AllBooks from './pages/AllBooks'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/Favourites'
import UserOrderHistory from './components/UserOrderHistory'
import Setting from './components/Setting'
import AllOrders from './pages/AllOrders'
import AddBooks from './pages/AddBooks'
import UpdateBook from './pages/UpdateBook'


const App = () => {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(()=> {
      if(
      localStorage.getItem('id') &&
      localStorage.getItem('token') &&
      localStorage.getItem('role') 
      ){
        dispatch(authActions.login());
        dispatch(authActions.changeRole(localStorage.getItem('role')))
      }
  },[])
  return (
    <div>
    <Navbar/>
      <Routes>
        <Route element={<Home/>} exact path='/'/>
        <Route element={<LogIn/>} path='/log-in' />
        <Route element={<UpdateBook/>} path='/update-book/:id' />
        <Route element={<AllBooks/>} path='/all-books' />
        <Route element={<SignUp/>} path='/sign-up' />
        <Route element={<Cart/>} path='/cart' />
        <Route element={<Profile/>} path='/profile' >
         {role === "user" ? 
         <Route index element={<Favourites/>}/> :
         <Route index element={<AllOrders/>}/>
         }
          {role === "admin" && <Route path='/profile/add-book' element={<AddBooks/>}/>
        }
          <Route path='/profile/orderHistory' element={<UserOrderHistory/>}/>
          <Route path='/profile/setting' element={<Setting/>}/>
        </Route>
        <Route element={<ViewBookDetails/>} path='/view-books-details/:id'/>
      </Routes>
    <Footer/> 
    </div>
  )
}

export default App
