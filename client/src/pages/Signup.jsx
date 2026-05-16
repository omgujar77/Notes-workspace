import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Loader2, Sparkles, FileText, Users } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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
      const res = await api.post("/auth/signup", formData);

      localStorage.setItem("token", res.data.token);

      login(res.data.user, res.data.token);

      toast.success("Account created successfully");

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-hidden relative">
      
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* LEFT SECTION */}
      <div className="hidden lg:flex flex-1 relative border-r border-gray-200 bg-white px-16 py-14">
        
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
                Capture ideas.
                <br />
                Collaborate naturally.
                <br />
                Let AI organize the rest.
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                A calm, focused workspace built for collaborative learning,
                smart note-taking, and AI-assisted productivity.
              </p>
            </div>

            {/* Features */}
            <div className="mt-12 space-y-4">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    AI summaries
                  </p>

                  <p className="text-sm text-gray-500">
                    Instantly generate concise note summaries.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    Real-time collaboration
                  </p>

                  <p className="text-sm text-gray-500">
                    Work together with teammates and classmates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mock Preview */}
          <div className="mt-16">
            
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] max-w-md">
              
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Product Strategy Meeting
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Updated 12 min ago
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">
                  AI Summary
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  • Finalize dashboard collaboration workflow
                </p>

                <p>
                  • Improve async note synchronization
                </p>

                <p>
                  • Add AI-generated action items support
                </p>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <div className="w-8 h-8 rounded-full bg-violet-200" />
                <div className="w-8 h-8 rounded-full bg-blue-200 -ml-3" />
                <div className="w-8 h-8 rounded-full bg-cyan-200 -ml-3" />

                <span className="text-sm text-gray-500 ml-2">
                  3 collaborators active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 relative z-10">
        
        <div className="w-full max-w-lg">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
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

          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-[28px] p-8 md:p-10 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
            
            {/* Header */}
            <div className="mb-8">
              
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200 mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>

              <h1 className="text-[32px] leading-tight tracking-[-0.02em] font-semibold text-gray-900 mb-3">
                Create your account
              </h1>

              <p className="text-gray-500 leading-relaxed">
                Build smarter notes, collaborate in real-time, and let AI
                simplify your workflow.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

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
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-violet-600 hover:text-violet-700 font-semibold transition"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* BOTTOM TEXT */}
          <p className="text-center mt-6 text-xs text-gray-500 leading-relaxed">
            By signing up, you agree to our{" "}
            <a href="#" className="text-gray-700 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-700 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;