import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/adminSidebar";

const AdminLayout = () => {

    console.log("AdminLayout rendered");
    return (
        <div className="flex h-screen">

            <AdminSidebar />
            <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                {/* <Outlet /> */}hello this is admin layout
            </div>
        </div>
    );
};

export default AdminLayout;
