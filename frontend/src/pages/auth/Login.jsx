import {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import auth from "../../auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm()

  const handleLogin = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (!userCredential.user.emailVerified) {
        navigate("/verify-email")
        return
      }

      navigate("/dashboard")
    } catch (error) {
      toast.error(error.message);
    } 
  }


  return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>

        {/* Brand */}
        <div className='text-center mb-6'>
          <h1 className='text-3xl font-bold'>
            Opportunis
          </h1>

          <p className='text-base-content/60 mt-2'>
            Sign in to your account 
          </p>
        </div>

        {/* Register Card */}
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            
            <form 
              className='space-y-4'
              onSubmit={handleSubmit(handleLogin)}
            >

              {/* Email */}
              <div>
                <label 
                  htmlFor="email"
                  className='label mb-1' 
                >
                  <span className='label-text'>
                    Email
                  </span> 
                </label>

                <input 
                  placeholder="you@example.com"
                  type="email"
                  id="email"
                  className='input input-bordered w-full'
                  {...register("email")}
                />
              </div>

              {/* Password */}
              <div>
                <label 
                  htmlFor="password"
                  className='label mb-1' 
                >
                  <span className='label-text'>
                    Password
                  </span> 
                </label>

                <div className="relative">
                  <input 
                    placeholder="Enter your password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className='input input-bordered w-full'
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40"/>
                    ) : (
                      <Eye className="size-5 text-base-content/40"/>
                    )}
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"/>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Google */}
            <button
              type="button"
              className="btn btn-outline w-full"
            >
              Sign in with Google
            </button>

            <p className="text-center text-sm mt-2">
              Don't have an account?{" "}
              <Link to="/sign-up">
                <span className="link link-primary">
                  Sign up
                </span>
              </Link>
            </p>

          </div>
        </div>
        
        {/* Back */}
        <Link
          to="/"
          className="text-base-content/50 pl-5 mt-6 text-sm link-hover inline-block"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  )
}

export default Login;