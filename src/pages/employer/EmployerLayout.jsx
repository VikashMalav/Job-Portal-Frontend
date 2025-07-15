import { Outlet } from "react-router-dom";
import EmployerSidebar from "../components/EmployerSidebar";

const EmployerLayout = () => {
  return (
    <div className="flex h-screen">
  
      <EmployerSidebar />

      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployerLayout;
