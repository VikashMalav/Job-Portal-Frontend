import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1  bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
