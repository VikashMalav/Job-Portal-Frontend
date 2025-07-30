import { NavLink } from "react-router-dom";
import { Briefcase, PlusCircle, Users, LogOut } from "lucide-react";
import { logoutUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const EmployerSidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col">
      <div className="p-5 text-2xl font-bold border-b border-blue-600">
        Employer Panel
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/employer/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
            >
              <Briefcase size={20} />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employer/jobs"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
            >
              <Briefcase size={20} />
              My Jobs
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employer/post-job"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
            >
              <PlusCircle size={20} />
              Post Job
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employer/applicants"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
            >
              <Users size={20} />
              Applicants
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-600">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default EmployerSidebar;
