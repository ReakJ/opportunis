import { useState } from "react";
import { MailCheck, RefreshCw } from "lucide-react";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import auth from "../../auth";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);

  const user = auth.currentUser;

  const checkVerification = async () => {
    if(!user) {
      toast.error("No authenticated user found.");
      return;
    }

    try {
      setChecking(true);

      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        toast.success("Email verified successfully!");
        navigate("/choose-role")
      } else {
        toast.error("Your email is not verified yet.")
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setChecking(false);
    }
  };

  const resendVerification = async () => {
    if(!user) {
      toast.error("No authenticated user found.");
      return;
    }

    try {
      setResending(true);

      await sendEmailVerification(auth.currentUser);

      toast.success("Verification email sent again!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setResending(false);
    };
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="card bg-base-100 shadow-xl w-full max-w-md">
          <div className="card-body items-center text-center">
            <h1 className="text-2xl font-bold">
              Authentication Required
            </h1>

            <p className="text-base-content/60">
              Please sign in to continue.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="btn btn-primary w-full mt-4"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            Opportunis
          </h1>

          <p className="text-base-content/60 mt-2">
            Verify your email
          </p>
        </div>

        {/* Verification Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">

            <MailCheck className="size-14 text-primary mb-2" />

            <h2 className="text-xl font-semibold">
              Check your inbox
            </h2>

            <p className="text-base-content/60">
              We've sent a verification link to:
            </p>

            <p className="font-medium break-all">
              {user.email}
            </p>

            <p className="text-sm text-base-content/60 mt-2">
              Click the link in the email to verify your account.
              Once you've done that, come back here and click the
              button below.
            </p>

            {/* Check Verification */}
            <button
              type="button"
              onClick={checkVerification}
              className="btn btn-primary w-full mt-4"
              disabled={checking}
            >
              {checking ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Checking...
                </>
              ) : (
                "I've Verified My Email"
              )}
            </button>

            {/* Resend */}
            <button
              type="button"
              onClick={resendVerification}
              className="btn btn-outline w-full"
              disabled={resending}
            >
              {resending ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="size-4" />
                  Resend Verification Email
                </>
              )}
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}

export default VerifyEmail;