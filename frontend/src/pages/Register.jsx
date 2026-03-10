import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import crmVideo from "../assets/crm_bg.mp4";

const Register = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/register", formData);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={crmVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar user={user} />
      </div>

      {/* Register Card */}
      <div className="relative z-20 flex items-center justify-center min-h-screen">

        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-8 w-full max-w-md">

          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Admin Account
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            >
              {loading ? "Creating..." : "Register"}
            </button>

          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;