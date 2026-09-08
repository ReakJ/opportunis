import {
  createBrowserRouter,
  createRoutesFromElements, 
  Route,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import OnboardingGuard from "../guards/OnboardingGuard";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ChooseRole from "../pages/onboarding/ChooseRole";
import EmployeeProfileSetup from "../pages/onboarding/EmployeeProfileSetup";
import RecruiterProfileSetup from "../pages/onboarding/RecruiterProfileSetup";
import OnboardingLayout from "../components/onboarding/OnboardingLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<h1>Opportunis Home</h1>} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/sign-in" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* <Route element={<OnboardingGuard />}> */}
          <Route element={<OnboardingLayout />}>
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/choose-role" element={<ChooseRole />} />
            <Route path="/employee/profile-setup" element={<EmployeeProfileSetup />} />
            <Route path="/recruiter/profile-setup" element={<RecruiterProfileSetup />} />
          </Route>

          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        {/* </Route> */}
        
      </Route>
    </>
  )
)

export default router;