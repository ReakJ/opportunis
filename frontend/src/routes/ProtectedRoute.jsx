import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center gap-3">
        <span className="loading loading-spinner loading-lg text-primary" />

        <p className="text-sm text-base-content/60">
          Loading...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace/>
  }

  return <Outlet />
}

export default ProtectedRoute;