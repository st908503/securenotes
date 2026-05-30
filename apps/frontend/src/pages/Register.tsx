import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import Input from "../components/common/Input";

import { register as registerUser } from "../features/auth/authSlice";

import type { AppDispatch, RootState } from "../app/store";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { loading, token, error } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (
    data: RegisterFormValues
  ) => {
    const resultAction = await dispatch(
      registerUser(data)
    );

    if (
      registerUser.fulfilled.match(resultAction)
    ) {
      toast.success("Registration successful");

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
          <Link
            to="/login"
            className="flex-1 bg-white py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-[#2563eb] hover:text-white"
          >
            Login
          </Link>

          <button className="flex-1 bg-[#3b82f6] py-3 text-sm font-medium text-white">
            Register
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Name"
            type="text"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
            })}
          />

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
              minLength: {
                value: 6,
                message:
                  "Password must be at least 6 characters",
              },
            })}
          />

          <Button
            type="submit"
            loading={loading}
            className="mt-2"
          >
            Register
          </Button>
        </form>

       
      </div>
    </div>
  );
};

export default Register;