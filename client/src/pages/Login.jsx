import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  Loader2,
  FileText,
  Sparkles,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      login(res.data.user, res.data.token);

      toast.success("Login successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-hidden relative">
      
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-1 bg-white border-r border-gray-200 px-16 py-14 relative overflow-hidden">
        
        <div className="max-w-xl flex flex-col justify-between w-full">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              
              <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-200">
                <FileText className="w-6 h-6 text-white" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Peblo Notes
                </h2>

                <p className="text-sm text-gray-500">
                  AI-powered collaborative workspace
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-6">
              
              <h1 className="text-[48px] leading-[1.05] tracking-[-0.03em] font-semibold text-gray-900">
                Welcome back to your
                <br />
                collaborative workspace.
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Continue building smarter notes, collaborating with your team,
                and letting AI simplify your workflow.
              </p>
            </div>

            {/* Features */}
            <div className="mt-12 space-y-5">
              
              <div className="flex items-start gap-4">
                
                <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    AI-powered summaries
                  </p>

                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Generate quick summaries and actionable insights from your
                    notes instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    Secure collaboration
                  </p>

                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Share notes, manage teams, and collaborate in a safe
                    workspace.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mock Activity Card */}
          <div className="mt-16">
            
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] max-w-md">
              
              <div className="flex items-center justify-between mb-6">
                
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Recent Activity
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Workspace updates
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Clock3 className="w-5 h-5 text-violet-600" />
                </div>
              </div>

              <div className="space-y-5">
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2" />

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      AI summary generated
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Product roadmap discussion updated
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Team collaboration active
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      3 collaborators currently editing notes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2" />

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Notes synced successfully
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      All workspace changes are up to date
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 relative z-10">
        
        <div className="w-full max-w-lg">
          
          {/* MOBILE BRAND */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            
            <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Peblo Notes
              </h2>

              <p className="text-sm text-gray-500">
                Collaborative workspace
              </p>
            </div>
          </div>

          {/* LOGIN CARD */}
          <div className="bg-white border border-gray-200 rounded-[28px] p-8 md:p-10 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
            
            {/* HEADER */}
            <div className="mb-8">
              
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200 mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>

              <h1 className="text-[32px] leading-tight tracking-[-0.02em] font-semibold text-gray-900 mb-3">
                Welcome back
              </h1>

              <p className="text-gray-500 leading-relaxed">
                Continue your focused learning and collaborative workflow with
                AI-assisted note management.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              {/* PASSWORD */}
              <div>
                
                <div className="flex items-center justify-between mb-2">
                  
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <a
                    href="#"
                    className="text-sm text-violet-600 hover:text-violet-700 font-medium transition"
                  >
                    Forgot password?
                  </a>
                </div>

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              {/* REMEMBER */}
              <div className="flex items-center gap-3 pt-1">
                
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 rounded-xl font-medium transition-all duration-200 shadow-sm mt-2 flex items-center justify-center ${
                  loading
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-violet-600 text-white hover:bg-violet-700 hover:-translate-y-[1px] active:translate-y-0"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Log in"
                )}
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-violet-600 hover:text-violet-700 font-semibold transition"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* BOTTOM TEXT */}
          <p className="text-center mt-6 text-xs text-gray-500 leading-relaxed">
            Secure authentication with protected collaborative workspace access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;