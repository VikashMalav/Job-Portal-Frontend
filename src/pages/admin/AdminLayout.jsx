
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow flex items-center justify-between px-4 py-3 md:px-8 md:py-4 border-b border-gray-200">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Admin Dashboard</h1>
          <span className="text-gray-500 text-xs md:text-sm">Welcome, Admin</span>
        </header>
        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
