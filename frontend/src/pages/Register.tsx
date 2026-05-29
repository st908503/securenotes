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
      registerUser.fulfilled.match(
        resultAction
      )
    ) {
      toast.success(
        "Registration successful"
      );

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
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Secure Notes
          </h1>

          <p className="mt-2 text-slate-500">
            Create your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
            })}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
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
          >
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;