import React from "react";

const Settings = () => (
  <div className="bg-white rounded-xl shadow p-8 max-w-xl mx-auto">
    <h2 className="text-2xl font-bold mb-4 text-indigo-700">Admin Settings</h2>
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-1">Admin Name</label>
        <input type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Enter your name" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <input type="email" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Enter your email" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Change Password</label>
        <input type="password" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="New password" />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition">Save Changes</button>
    </form>
  </div>
);

export default Settings;
