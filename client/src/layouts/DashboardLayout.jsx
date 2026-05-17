import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  FileText,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const DashboardLayout = ({
  children,
}) => {

  const {
    user,
    logout,
  } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3ff] via-white to-[#eef2ff]">

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="rounded-2xl bg-[#7C3AED] p-2 text-white shadow-lg">
              <FileText size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                AI Notes
              </h1>

              <p className="text-xs text-gray-500">
                Smart workspace
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}
          <div className="flex items-center gap-3">

            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <LayoutDashboard size={18} />

              Dashboard
            </Link>

            <Link
              to="/notes"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <FileText size={18} />

              Notes
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              <LogOut size={18} />

              Logout
            </button>

          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;