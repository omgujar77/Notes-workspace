import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AnalyticsCard from "../components/AnalyticsCard";
import { getDashboardStats } from "../services/dashboardService";
import DashboardLayout from "../layouts/DashboardLayout";
import useDocumentTitle from "../hooks/useDocumentTitle";

import {
  NotebookPen,
  Brain,
  Globe,
  LogOut,
  Clock3,
  Archive,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Loader2,
  Plus,
  Activity,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Dashboard = () => {
  useDocumentTitle("Dashboard");
  const { user, logout } = useAuth();

  const [stats, setStats] = useState({
    totalNotes: 0,
    recentEditedCount: 0,
    aiUsageCount: 0,
    topTags: [],
    recentNotes: [],
    weeklyActivity: [],
    publicNotes: 0,
    archivedNotes: 0,
    remainingCredits: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const data = await getDashboardStats();

      setStats({
        totalNotes: data.totalNotes || 0,
        recentEditedCount: data.recentEditedCount || 0,
        aiUsageCount: data.aiUsageCount || 0,
        topTags: data.topTags || [],
        recentNotes: data.recentNotes || [],
        weeklyActivity: data.weeklyActivity || [],
        publicNotes: data.publicNotes || 0,
        archivedNotes: data.archivedNotes || 0,
        remainingCredits: data.remainingCredits || 0,
      });
    } catch (err) {
      console.error(err);

      setError("Failed to load dashboard");

      toast.error("Dashboard failed to load");
    } finally {
      setLoading(false);
    }
  };

  const barColors = [
    "#8b5cf6",
    "#7c3aed",
    "#6366f1",
    "#3b82f6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
          <div className="bg-white border border-gray-200 rounded-3xl px-8 py-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-violet-100 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-violet-600 animate-spin" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Loading dashboard
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Preparing your workspace...
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
        <div className="bg-white border border-gray-200 rounded-3xl px-8 py-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)] max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
            <Activity className="text-red-500" size={28} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to load dashboard
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed">
            Something went wrong while fetching your workspace data.
          </p>

          <button
            onClick={fetchDashboardStats}
            className="mt-6 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 md:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        {/* TOP HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

              <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                Peblo Workspace
              </p>
            </div>

            <h1 className="text-[34px] md:text-[42px] leading-tight tracking-[-0.03em] font-semibold text-gray-900">
              Welcome back,{" "}
              <span className="text-violet-600">
                {user?.name?.split(" ")[0] || "User"}
              </span>
            </h1>

            <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Continue building smarter notes, collaborating with your team, and
              letting AI organize your workflow naturally.
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/notes">
              <button className="w-full sm:w-auto h-12 px-5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition font-medium text-gray-700 flex items-center justify-center gap-2 shadow-sm">
                <NotebookPen size={18} />
                View Notes
              </button>
            </Link>

            <Link to="/notes">
              <button className="w-full sm:w-auto h-12 px-5 rounded-xl bg-violet-600 hover:bg-violet-700 transition text-white font-medium flex items-center justify-center gap-2 shadow-sm hover:-translate-y-[1px]">
                <Plus size={18} />
                New Note
              </button>
            </Link>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
          <AnalyticsCard
            title="Total Notes"
            value={stats.totalNotes}
            color="bg-violet-600"
            icon={<NotebookPen size={22} />}
          />

          <AnalyticsCard
            title="AI Usage"
            value={stats.aiUsageCount}
            color="bg-indigo-600"
            icon={<Brain size={22} />}
          />

          <AnalyticsCard
            title="Public Notes"
            value={stats.publicNotes}
            color="bg-blue-600"
            icon={<Globe size={22} />}
          />

          <AnalyticsCard
            title="Archived"
            value={stats.archivedNotes}
            color="bg-orange-500"
            icon={<Archive size={22} />}
          />

          <AnalyticsCard
            title="Recent Activity"
            value={stats.recentEditedCount}
            color="bg-emerald-600"
            icon={<Clock3 size={22} />}
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="xl:col-span-2 space-y-6">
            {/* ACTIVITY CHART */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-7 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-violet-600" size={20} />

                    <h2 className="text-2xl font-semibold text-gray-900">
                      Weekly Activity
                    </h2>
                  </div>

                  <p className="text-sm text-gray-500">
                    Notes created and edited over the last 7 days
                  </p>
                </div>
              </div>

              {stats.weeklyActivity.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={stats.weeklyActivity}>
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "16px",
                        boxShadow: "0 10px 40px rgba(15,23,42,0.08)",
                      }}
                      cursor={{ fill: "#f8fafc" }}
                    />

                    <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                      {stats.weeklyActivity.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={barColors[index % barColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-5">
                    <TrendingUp size={30} className="text-violet-400" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No activity yet
                  </h3>

                  <p className="text-sm text-gray-500 max-w-sm">
                    Start creating notes and your workspace activity will appear
                    here.
                  </p>
                </div>
              )}
            </div>

            {/* RECENT NOTES */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-7 shadow-sm">
              <div className="flex items-center justify-between mb-7">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Recent Notes
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Your latest workspace updates
                  </p>
                </div>

                <Link
                  to="/notes"
                  className="text-violet-600 hover:text-violet-700 font-medium transition flex items-center gap-1 text-sm"
                >
                  View all
                  <ArrowRight size={15} />
                </Link>
              </div>

              {stats.recentNotes.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentNotes.map((note) => (
                    <div
                      key={note._id}
                      className="group border border-gray-200 hover:border-violet-200 rounded-2xl p-5 transition-all hover:shadow-md bg-white"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 group-hover:text-violet-600 transition truncate">
                            {note.title || "Untitled Note"}
                          </h3>

                          <p className="text-xs text-gray-500 mt-2">
                            Updated{" "}
                            {new Date(note.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>

                          {note.tags && note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {note.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-xs font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                          <NotebookPen size={18} className="text-violet-600" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-5">
                    <NotebookPen size={30} className="text-violet-400" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No notes yet
                  </h3>

                  <p className="text-sm text-gray-500 max-w-sm">
                    Start capturing ideas and let AI organize the rest.
                  </p>

                  <Link to="/notes">
                    <button className="mt-6 h-11 px-5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium transition">
                      Create first note
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* AI STATS */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-violet-600" size={20} />

                <h2 className="text-xl font-semibold text-gray-900">
                  AI Assistant
                </h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-violet-700">
                      AI Requests Used
                    </p>

                    <Brain className="text-violet-600" size={18} />
                  </div>

                  <h3 className="text-3xl font-semibold text-violet-700">
                    {stats.aiUsageCount}
                  </h3>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-emerald-700">
                      Remaining Credits
                    </p>

                    <Sparkles className="text-emerald-600" size={18} />
                  </div>

                  <h3 className="text-3xl font-semibold text-emerald-700">
                    {stats.remainingCredits}
                  </h3>
                </div>
              </div>
            </div>

            {/* TAGS */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Popular Tags
              </h2>

              {stats.topTags.length > 0 ? (
                <div className="space-y-3">
                  {stats.topTags.map((tagItem, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border border-gray-100 hover:border-violet-200 bg-gray-50 hover:bg-violet-50 px-4 py-3 transition"
                    >
                      <span className="font-medium text-gray-700">
                        #{tagItem.tag}
                      </span>

                      <span className="bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {tagItem.count}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-sm text-gray-500">No tags available yet</p>
                </div>
              )}
            </div>

            {/* LOGOUT */}
            <button
              onClick={() => {
                logout();

                toast.success("Logged out successfully");
              }}
              className="w-full h-12 rounded-2xl bg-white border border-red-200 hover:bg-red-50 text-red-600 font-medium transition flex items-center justify-center gap-2 shadow-sm"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
