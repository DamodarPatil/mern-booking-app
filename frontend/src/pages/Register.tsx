import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-50">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-text-900">
          Create an Account
        </h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="flex-1">
            <span className="text-black text-sm font-semibold">First Name</span>
            <input
              className="border rounded w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent-500 transition duration-200"
              {...register("firstName", { required: "This field is required" })}
              type="text"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.firstName.message}
              </span>
            )}
          </label>
          <label className="flex-1">
            <span className="text-black text-sm font-semibold">Last Name</span>
            <input
              className="border rounded w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent-500 transition duration-200"
              {...register("lastName", { required: "This field is required" })}
              type="text"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.lastName.message}
              </span>
            )}
          </label>
        </div>
        <label className="block">
          <span className="text-black text-sm font-semibold">Email</span>
          <input
            className="border rounded w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent-500 transition duration-200"
            {...register("email", { required: "This field is required" })}
            type="email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="block">
          <span className="text-black text-sm font-semibold">Password</span>
          <input
            className="border rounded w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent-500 transition duration-200"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                message: "Password must include at least one uppercase letter, one number, and one special character",
              },
            })}
            type="password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.password.message}
            </span>
          )}
        </label>
        <label className="block">
          <span className="text-black text-sm font-semibold">
            Confirm Password
          </span>
          <input
            className="border rounded w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent-500 transition duration-200"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  return "Your passwords do not match";
                }
              },
            })}
            type="password"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="bg-accent-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-accent-600 transition duration-200 w-full"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
