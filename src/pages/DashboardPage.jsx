/**
 * Determines and renders the correct dashboard view
 * according to the current user's assigned role. Safeguards against
 * unexpected roles and ensures consistent fallback handling.
 */

import { useAppContext } from "../hooks/useAppContext";
import StudentDashboardPage from "./StudentDashboardPage";
import AdminDashboardPage from "./AdminDashboardPage";
import { X } from "lucide-react";

const DashboardPage = () => {
  const { currentUser } = useAppContext();

  // Prevent rendering if no user is authenticated (safety net beyond ProtectedRoute)
  if (!currentUser) {
    return null;
  }

  const userRole = currentUser.role;

  // Role-based conditional rendering
  if (userRole === "student") {
    return <StudentDashboardPage />;
  }

  if (userRole === "admin") {
    return <AdminDashboardPage />;
  }

  // Fallback for undefined or unexpected roles
  return (
    <div className="alert alert-warning shadow-lg max-w-lg mx-auto mt-10">
      <div className="flex items-center gap-2">
        <X className="size-6 shrink-0" />
        <span>
          Warning: Unknown user role "<b>{userRole}</b>". Please contact
          support.
        </span>
      </div>
    </div>
  );
};

export default DashboardPage;
