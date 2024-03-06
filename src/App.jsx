import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux"
import authService from "./appwrite/Auth";
import "./App.css"
import { login, logout } from "./Redux/authslice";
import { Header, Footer } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData)=>{
        userData === true? dispatch(login({userData})) : dispatch(logout())
      })
      .catch((error)=>{
        console.log("Current user error", error);
      })
      .finally(()=>{setLoading(false)})
  }, [])

  return !loading ? (
      <div className="min-h-screen flex flex-wrap
       content-around " >
        <div className="w-full block">
          <Header />
            <main>
              Todo: {/* <Outlet /> */}
            </main>
          <Footer />
        </div>
      </div>
  ) : null
  
}

export default App
