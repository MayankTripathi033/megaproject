import React from 'react'
import {useDispatch} from 'react-redux';
import authService from '../../appwrite/Config'
import {logout} from "../../Redux/authslice";


function LogoutButton() {
    const dispatch = useDispatch();
    const Logouthandler = () => {
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
        .catch(()=>{
            dispatch()
        })
    };
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        Logout
    </button>
  )
}

export default LogoutButton
