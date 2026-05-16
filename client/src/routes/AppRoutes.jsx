import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotesPage from "../pages/NotesPage";
import NoteEditor from "../components/NoteEditor";
import PublicNotePage from "../pages/PublicNotePage";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/notes" element={<NoteEditor />} /> */}
      <Route path="/shared/:shareId" element={<PublicNotePage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
