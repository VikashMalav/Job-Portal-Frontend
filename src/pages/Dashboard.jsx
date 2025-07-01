import { useState } from "react";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate =useNavigate()

  const handleLogout = async () => {
    try {
       await dispatch(logoutUser()).unwrap();
    toast.success("Logout Successfully");
    navigate('/login', { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error)
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} />

      <div className="flex flex-1">
     
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
        />

        <main className="flex-1 bg-gray-100 overflow-y-auto p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
