import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!user) return <div className="p-8 text-center">No profile data found.</div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Profile Details</h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold text-gray-700">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Role:</span> {user.role}
        </div>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default Profile;
