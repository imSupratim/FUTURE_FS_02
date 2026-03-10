import React from "react";
import Navbar from "../components/Navbar";
import homeImg from "../assets/CRM_HOME.jpeg";
import Typewriter from "typewriter-effect";
import { ArrowRight, LayoutDashboard, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/crm_logo.png";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${homeImg})` }}
    >
      <Navbar user={user} />

      {/* Overlay */}
      <div className="flex items-center h-[90vh] bg-black/10">
        <div className="max-w-xl text-white px-12">
          <div className="flex flex-col gap-5 items-center">
            <img src={logo} alt="logo" className="size-23" />
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Mini CRM System
          </h1>
          </div>

          <div className=" mb-6 text-purple-800 font-bold text-2xl">
            <Typewriter
              options={{
                strings: [
                  "Manage your leads efficiently",
                  "Track customer interactions",
                  "Organize your sales pipeline",
                  "Grow your business with ease",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="group flex items-center justify-center gap-2 bg-green-600 px-9 py-4 rounded-2xl mb-4"
              >
                <LayoutDashboard className="h-5 w-5" />
                Go to Dashboard
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="group flex items-center justify-center gap-2 bg-blue-600 px-11 py-4 rounded-2xl"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 bg-green-600 px-8 rounded-2xl"
                >
                  <UserPlus className="h-5 w-5" />
                  Create Account
                </Link>
              </>
            )}
          </div>

          {user && (
            <p className="text-xl font-semibold text-gray-900">
              <span className="text-gray-600 text-lg">Welcome</span>, {user.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
