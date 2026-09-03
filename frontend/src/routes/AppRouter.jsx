import {
  createBrowserRouter,
  createRoutesFromElements, 
  Route,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Register from "../pages/auth/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<h1>Opportunis Home</h1>} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Route>
    </>
  )
)

export default router;