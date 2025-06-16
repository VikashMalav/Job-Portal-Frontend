import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../features/auth/authSlice';

const UserAuth = () => {


  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const dispatch = useDispatch();



  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isSignup) {
      if (!nameRegex.test(formData.name)) {
        newErrors.name = 'Name must be at least 3 characters long and contain only letters.';
      }
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const loadingToast = toast.loading(isSignup ? "Signing up..." : "Logging in...");

    try {
      const action = isSignup
        ? await dispatch(registerUser(formData)).unwrap()
        : await dispatch(loginUser(formData)).unwrap();

      toast.update(loadingToast, {
        render: isSignup ? "Signup successful!" : "Login successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
      console.log(action)
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.update(loadingToast, {
        render: err || "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 px-4">
      <div className="w-full max-w-md p-8 sm:p-10 md:p-12 bg-white/20 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-[0_8px_40px_rgba(255,255,255,0.15)]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-3 tracking-wider text-white drop-shadow">JobSphere</h1>
        <p className="text-center text-sm mb-6 text-white/80">
          {isSignup ? 'One step away from your dream job' : 'Sign in to explore opportunities'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignup && (
            <div>
              <label className="block text-sm mb-1 font-semibold text-white">Name</label>
              <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 border border-white/30">
                <User className="w-4 h-4 text-white/70" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && <p className="text-sm text-red-300 mt-1 ml-2">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm mb-1 font-semibold text-white">Email</label>
            <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 border border-white/30">
              <Mail className="w-4 h-4 text-white/70" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-sm text-red-300 mt-1 ml-2">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold text-white">Password</label>
            <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 border border-white/30">
              <Lock className="w-4 h-4 text-white/70" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
                placeholder="Enter your password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/70">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-300 mt-1 ml-2">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full duration-300 py-3 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 hover:from-pink-500 hover:to-yellow-400 text-white font-bold rounded-xl shadow-lg transition-all ease-in-out tracking-wide"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>

          <p className="text-center text-sm mt-4 text-white">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              className="ml-2 text-yellow-300 underline hover:text-yellow-200"
              onClick={toggleMode}
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
