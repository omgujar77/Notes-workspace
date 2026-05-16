import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AnalyticsCard from "../components/AnalyticsCard";
import {
  NotebookPen,
  Brain,
  Globe,
  LogOut,
} from "lucide-react";

const Dashboard = () => {

  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <h1 className="text-4xl font-bold mb-2">
            Dashboard
          </h1>

          <p className="text-gray-600 text-lg">
            Welcome back, {user?.name}
          </p>

        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <AnalyticsCard
  title="AI Summaries"
  value={user?.aiUsageCount || 0}
  color="bg-purple-600"
  icon={<Brain size={28} />}
/>

<AnalyticsCard
  title="Public Notes"
  value="0"
  color="bg-blue-600"
  icon={<Globe size={28} />}
/>

<AnalyticsCard
  title="Archived Notes"
  value="0"
  color="bg-green-600"
  icon={<NotebookPen size={28} />}
/>

        </div>

        {/* ACTIONS */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <Link to="/notes">

              <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition">

                Open Notes Workspace

              </button>

            </Link>

            <button
  onClick={logout}
  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition flex items-center gap-2"
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