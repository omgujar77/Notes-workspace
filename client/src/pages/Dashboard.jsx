import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom";

import AnalyticsCard from "../components/AnalyticsCard";

import { getDashboardStats } from "../services/dashboardService";

import toast from "react-hot-toast";

import {
  NotebookPen,
  Brain,
  Globe,
  LogOut,
  Clock3,
  Archive,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {

  const { user, logout } =
    useAuth();

  const [stats, setStats] =
    useState({
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

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchDashboardStats();

  }, []);

  const fetchDashboardStats =
    async () => {

      try {

        setLoading(true);

        const data =
          await getDashboardStats();

        setStats({
          totalNotes:
            data.totalNotes || 0,

          recentEditedCount:
            data.recentEditedCount || 0,

          aiUsageCount:
            data.aiUsageCount || 0,

          topTags:
            data.topTags || [],

          recentNotes:
            data.recentNotes || [],

          weeklyActivity:
            data.weeklyActivity || [],

          publicNotes:
            data.publicNotes || 0,

          archivedNotes:
            data.archivedNotes || 0,

          remainingCredits:
            data.remainingCredits || 0,
        });

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load dashboard"
        );

        toast.error(
          "Dashboard failed to load"
        );

      } finally {

        setLoading(false);
      }
    };

  if (loading) {

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="bg-white px-8 py-6 rounded-2xl shadow-md">

          <p className="text-lg font-semibold text-gray-700">
            Loading dashboard...
          </p>

        </div>

      </div>
    );
  }

  if (error) {

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="bg-white px-8 py-6 rounded-2xl shadow-md">

          <p className="text-red-500 font-semibold">
            {error}
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl p-6 md:p-10 text-white shadow-xl mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <p className="text-sm uppercase tracking-widest text-gray-300 mb-3">
                AI Notes Workspace
              </p>

              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Welcome back,
                {" "}
                {user?.name || "User"}
              </h1>

              <p className="text-gray-300 text-lg max-w-2xl">
                Organize your notes,
                generate AI insights,
                and manage your workspace
                efficiently.
              </p>

            </div>

            {/* QUICK ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4">

              <Link to="/notes">

                <button className="bg-white text-black px-6 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition flex items-center gap-2 shadow-lg">

                  <NotebookPen size={20} />

                  Open Notes Workspace

                  <ArrowRight size={18} />

                </button>

              </Link>

              <Link to="/notes">

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold transition flex items-center gap-2 shadow-lg">

                  <Sparkles size={20} />

                  Create New Note

                </button>

              </Link>

            </div>

          </div>

        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">

          <AnalyticsCard
            title="Total Notes"
            value={stats.totalNotes}
            color="bg-black"
            icon={
              <NotebookPen size={24} />
            }
          />

          <AnalyticsCard
            title="AI Usage"
            value={stats.aiUsageCount}
            color="bg-purple-600"
            icon={
              <Brain size={24} />
            }
          />

          <AnalyticsCard
            title="Public Notes"
            value={stats.publicNotes}
            color="bg-blue-600"
            icon={
              <Globe size={24} />
            }
          />

          <AnalyticsCard
            title="Archived"
            value={stats.archivedNotes}
            color="bg-orange-500"
            icon={
              <Archive size={24} />
            }
          />

          <AnalyticsCard
            title="Recent Activity"
            value={
              stats.recentEditedCount
            }
            color="bg-green-600"
            icon={
              <Clock3 size={24} />
            }
          />

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-6">

            {/* WEEKLY ACTIVITY */}
            <div className="bg-white rounded-3xl shadow-sm p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Weekly Activity
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Notes activity from last 7 days
                  </p>

                </div>

              </div>

              {stats.weeklyActivity.length > 0 ? (

                <ResponsiveContainer
                  width="100%"
                  height={280}
                >

                  <BarChart
                    data={
                      stats.weeklyActivity
                    }
                  >

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              ) : (

                <p className="text-gray-500">
                  No activity available
                </p>

              )}

            </div>

            {/* RECENT NOTES */}
            <div className="bg-white rounded-3xl shadow-sm p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Recent Notes
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Recently updated notes
                  </p>

                </div>

                <Link
                  to="/notes"
                  className="text-blue-600 font-medium hover:underline"
                >
                  View All
                </Link>

              </div>

              {stats.recentNotes.length > 0 ? (

                <div className="space-y-4">

                  {stats.recentNotes.map(
                    (note) => (

                      <div
                        key={note._id}
                        className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition"
                      >

                        <h3 className="font-semibold text-lg mb-2">
                          {note.title ||
                            "Untitled Note"}
                        </h3>

                        <p className="text-sm text-gray-500 mb-3">
                          Updated{" "}
                          {new Date(
                            note.updatedAt
                          ).toLocaleString()}
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {note.tags?.map(
                            (
                              tag,
                              index
                            ) => (
                              <span
                                key={index}
                                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                              >
                                #{tag}
                              </span>
                            )
                          )}

                        </div>

                      </div>
                    )
                  )}

                </div>

              ) : (

                <p className="text-gray-500">
                  No recent notes found
                </p>

              )}

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* AI CREDITS */}
            <div className="bg-white rounded-3xl shadow-sm p-6">

              <h2 className="text-2xl font-bold mb-4">
                AI Usage Statistics
              </h2>

              <div className="space-y-4">

                <div className="bg-purple-50 rounded-2xl p-4">

                  <p className="text-gray-500 text-sm">
                    AI Requests Used
                  </p>

                  <h3 className="text-3xl font-bold text-purple-700">
                    {stats.aiUsageCount}
                  </h3>

                </div>

                <div className="bg-green-50 rounded-2xl p-4">

                  <p className="text-gray-500 text-sm">
                    Remaining Credits
                  </p>

                  <h3 className="text-3xl font-bold text-green-700">
                    {stats.remainingCredits}
                  </h3>

                </div>

              </div>

            </div>

            {/* TOP TAGS */}
            <div className="bg-white rounded-3xl shadow-sm p-6">

              <h2 className="text-2xl font-bold mb-6">
                Most Used Tags
              </h2>

              {stats.topTags.length > 0 ? (

                <div className="space-y-4">

                  {stats.topTags.map(
                    (
                      tagItem,
                      index
                    ) => (

                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                      >

                        <span className="font-medium">
                          #{tagItem.tag}
                        </span>

                        <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                          {tagItem.count}
                        </span>

                      </div>
                    )
                  )}

                </div>

              ) : (

                <p className="text-gray-500">
                  No tags available
                </p>

              )}

            </div>

            {/* LOGOUT */}
            <button
              onClick={() => {

                logout();

                toast.success(
                  "Logged out successfully"
                );
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition font-semibold flex items-center justify-center gap-2"
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