import { useState } from "react";

import { MailCheck, RefreshCw } from "lucide-react";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import auth from "../../auth";
import { useAuth } from "../../context/useAuth";
import { useOnboarding } from "../../context/useOnboarding";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);

  const { user, loading } = useAuth();
  const { syncOnboarding } = useOnboarding();

  const checkVerification = async () => {
    if(!user) {
      toast.error("No authenticated user found.");
      return;
    }

    try {
      setChecking(true);

      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        await syncOnboarding();
        
        toast.success("Email verified successfully!");
      } else {
        toast.error("Your email is not verified yet.")
      }
    } catch (error) {
      console.error("Onboarding sync error:", error);
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

if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-100 items-center justify-center px-4">
        <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body items-center text-center">
            <h1 className="text-2xl font-bold">
              Authentication Required
            </h1>

            <p className="text-base-content/60">
              Please sign in to continue.
            </p>

            <button
              type="button"
              onClick={() => navigate("/sign-in")}
              className="btn btn-primary mt-4 w-full"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md pt-10">
      {/* Page heading */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-medium text-primary">
          Let's secure your account
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-base-content">
          Verify your email
        </h2>

        <p className="mx-auto mt-3 max-w-md text-base text-base-content/60">
          Confirm your email address to secure your account and continue
          setting up your Opportunis profile.
        </p>
      </div>

      {/* Verification card */}
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body items-center px-6 py-8 text-center sm:px-10 sm:py-10">
          {/* Icon */}
          <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <MailCheck className="size-8 text-primary" />
          </div>

          <h3 className="text-xl font-semibold text-base-content">
            Check your inbox
          </h3>

          <p className="mt-2 text-sm leading-6 text-base-content/60">
            We've sent a verification link to
          </p>

          <p className="mt-1 max-w-full break-all font-medium text-base-content">
            {user.email}
          </p>

          <div className="my-6 h-px w-full bg-base-300" />

          <p className="text-sm leading-6 text-base-content/60">
            Click the link in the email to verify your account. Once
            you've verified it, come back here and continue below.
          </p>

          {/* Actions */}
          <div className="mt-7 flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={checkVerification}
              className="btn btn-primary w-full"
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

            <button
              type="button"
              onClick={resendVerification}
              className="btn btn-ghost w-full"
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
                  Resend verification email
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Small helper text */}
      <p className="mt-5 text-center text-xs text-base-content/50">
        Didn't receive the email? Check your spam or junk folder.
      </p>
    </div>
  );
};

export default VerifyEmail;