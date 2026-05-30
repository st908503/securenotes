import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import Input from "../components/common/Input";

import { login } from "../features/auth/authSlice";

import type { AppDispatch, RootState } from "../app/store";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { loading, token, error } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (
    data: LoginFormValues
  ) => {
    const resultAction = await dispatch(login(data));

    if (login.fulfilled.match(resultAction)) {
      toast.success("Login successful");

      navigate("/");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#ececf1] px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        {/* Title */}
        <h1 className="mb-8 text-center text-4xl font-bold text-slate-800">
          Secure Notes
        </h1>

        {/* Tabs */}
        <div className="mb-8 flex overflow-hidden rounded-lg border border-slate-200">
          <button className="flex-1 bg-[#3b82f6] py-3 text-sm font-medium text-white">
            Login
          </button>

          <Link
            to="/register"
            className="flex-1 bg-white py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-[#2563eb] hover:text-white"
          >
            Register
          </Link>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
            })}
          />

          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
          />

          <Button
            type="submit"
            loading={loading}
            className="mt-2"
          >
            Login
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-600">
          Forgot password?
        </p>
      </div>
    </div>
  );
};

export default Login;