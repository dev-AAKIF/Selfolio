import React, { useState } from "react";
import { useRegisterUserMutation } from "../../redux/Slice/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const validate = () => {
    if (!form.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!form.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Valid email is required");
      return false;
    }
    if (!form.password || form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (!/[A-Z]/.test(form.password) || !/[!@#$%^&]/.test(form.password)) {
      toast.error(
        "Password must include a capital letter and a special character"
      );
      return false;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!form.phoneNumber.trim() || !/^\d{10}$/.test(form.phoneNumber)) {
      toast.error("Enter a valid 10-digit phone number");
      return false;
    }
    if (!form.dateOfBirth) {
      toast.error("Date of Birth is required");
      return false;
    }
    if (!profilePhoto) {
      toast.error("Profile image is required");
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setErrors({ ...errors, profilePhoto: "Only JPG or PNG allowed" });
      return;
    }
    setProfilePhoto(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    formData.append("profilePhoto", profilePhoto);

    try {
      await registerUser(formData).unwrap();
      toast.success("User registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_right,_#3e4044,_#2d78f1)] flex items-center justify-center px-4">
      <div className="relative w-[25vw] max-w-md px-6 py-8 bg-white rounded-lg shadow-2xl z-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="flex justify-center">
            <label htmlFor="profilePhoto" className="cursor-pointer">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-[#4CA1AF]"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                  Upload
                </div>
              )}
              <input
                type="file"
                id="profilePhoto"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              placeholder="FIRST NAME"
              value={form.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-400 py-2 px-3 rounded-sm tracking-wider"
            />
            <input
              type="text"
              name="lastName"
              placeholder="LAST NAME"
              value={form.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-400 py-2 px-3 rounded-sm tracking-wider"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={form.email}
            onChange={handleInputChange}
            className="w-full border border-gray-400 py-2 px-3 rounded-sm tracking-wider"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="PASSWORD"
              value={form.password}
              onChange={handleInputChange}
              className="w-full border border-gray-400 py-2 px-3 rounded-sm tracking-wider"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-3 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              value={form.confirmPassword}
              onChange={handleInputChange}
              className="w-full border border-gray-400 py-2 px-3 rounded-sm tracking-wider"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-2.5 right-3 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <input
            type="text"
            name="phoneNumber"
            placeholder="PHONE NUMBER"
            value={form.phoneNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-400 py-2 px-3 rounded-sm tracking-wider"
          />

          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleInputChange}
            className="w-full border border-gray-400 py-2 px-3 rounded-sm tracking-wider text-gray-600"
          />

          <p className="text-left text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#093028] hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md text-sm font-semibold tracking-wider hover:bg-gray-900 transition"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
