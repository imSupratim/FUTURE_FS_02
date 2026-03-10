import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/crm_logo.png"

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gray-800 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      {/* Logo / Title */}
      <Link to='/' className="text-2xl font-bold tracking-wide hover:text-green-400 transition-colors">
        <img src={logo} alt="logo" className="size-10 ml-10" />
      </Link>

      {/* Links & Buttons */}
      <div className="flex items-center gap-8">
        {user ? (
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="hover:text-green-400 transition-colors font-medium"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="hover:text-green-400 transition-colors font-medium"
            >
              Dashboard
            </Link>

            <Link
              to="/form"
              className="hover:text-green-400 transition-colors font-medium"
            >
              Form
            </Link>
            


            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-md text-sm font-semibold shadow-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-green-400 hover:bg-green-500 transition-colors text-black px-4 py-2 rounded-lg font-semibold shadow-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 transition-colors text-black px-4 py-2 rounded-lg font-semibold shadow-md"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
