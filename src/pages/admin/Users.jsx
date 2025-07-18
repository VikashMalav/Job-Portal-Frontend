import React, { useEffect, useState } from "react";
import ProLoader from "../../components/skeleton/ProLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/admin/adminSlice";
import { useSelector as useReduxSelector } from "react-redux";

const getInitials = (name = "") => name.split(" ").map((n) => n[0]).join("").toUpperCase();

const Users = () => {

  const dispatch = useDispatch();
  const { users, loading, error, page, limit, totalPages, totalUsers } = useSelector((state) => state.admin);
  const { user: adminUser } = useReduxSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">User Management</h2>
        <span className="text-gray-500 text-sm">Total: {totalUsers || 0}</span>
      </div>
      {loading && <ProLoader text="Loading users..." />}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!loading && !error && users && users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118A7.5 7.5 0 0112 15.75a7.5 7.5 0 017.5 4.368m-15.001 0v.007A2.625 2.625 0 006.125 22.5h11.25a2.625 2.625 0 002.625-2.625v-.007m-15.001 0v-.007" /></svg>
          <div className="text-lg text-gray-500 font-semibold">
            No users registered yet.<br />
            <span className="text-sm text-gray-400">Invite users to get started, {adminUser?.name ? adminUser.name : 'Admin'}!</span>
          </div>
        </div>
      )}
      {!loading && !error && users && users.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id} className="hover:bg-indigo-50 transition">
                    <td className="px-6 py-4 border-b text-gray-500">{(page - 1) * limit + idx + 1}</td>
                    <td className="px-6 py-4 border-b flex items-center gap-3">
                      {/* Avatar circle with initials */}
                      <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-base">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                        ) : (
                          getInitials(user.name)
                        )}
                      </span>
                      <span>{user.name}</span>
                    </td>
                    <td className="px-6 py-4 border-b text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 border-b">
                      <span className={`px-2 py-1 rounded text-xs font-semibold 
                        ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : user.role === 'employer' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b">
                      <span className={`px-2 py-1 rounded text-xs font-semibold 
                        ${user.status === 'Blocked' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                      >
                        {user.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b">
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs font-semibold shadow">Block</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-end mt-6 gap-2">
            <button
              className="px-3 py-1 rounded border text-indigo-600 border-indigo-200 bg-white hover:bg-indigo-50 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded border ${page === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'}`}
                onClick={() => setCurrentPage(i + 1)}
                disabled={page === i + 1}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded border text-indigo-600 border-indigo-200 bg-white hover:bg-indigo-50 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
