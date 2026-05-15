import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

  const { user, logout } = useAuth();

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-4">
        Dashboard
      </h1>

      <h2 className="text-xl mb-6">
        Welcome {user?.name}
      </h2>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-5 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
};

export default Dashboard;