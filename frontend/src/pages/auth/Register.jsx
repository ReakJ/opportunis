import {useState} from "react";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);


  return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>

        {/* Brand */}
        <div className='text-center mb-6'>
          <h1 className='text-3xl font-bold'>
            Opportunis
          </h1>

          <p className='text-base-content/60 mt-2'>
            Create your account 
          </p>
        </div>

        {/* Register Card */}
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            
            <form className='space-y-4'>

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
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className='input input-bordered w-full'
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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className='input input-bordered w-full'
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
              >
                Create Account
              </button>

            </form>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Google */}
            <button
              type="button"
              className="btn btn-outline w-full"
            >
              Continue with Google
            </button>

            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <span className="link link-primary">
                Sign in
              </span>
            </p>

          </div>
        </div>
        
        {/* Back */}
        <p className="text-base-content/50 pl-5 mt-6 text-sm">
          <span className="link-hover">
            ← Back to home
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register