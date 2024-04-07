import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useEffect } from "react";
import axiosClient from "../axios-client";

const DefaultLayout = () => {
  const { user, token,setUser } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() =>{
    axiosClient.get('/user')
    .then(({data})=>{
      setUser(data)

    })
  },[])
  return (
    <div className="">
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
