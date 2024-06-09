import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          Sign In
        </h2>
        <label className="block">
          <span className="text-gray-700 text-sm font-bold">Email</span>
          <input
            className="border rounded w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#b30000] transition duration-200"
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
          <span className="text-gray-700 text-sm font-bold">Password</span>
          <input
            className="border rounded w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#b30000] transition duration-200"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
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
        <div className="flex flex-col mt-4">
          <span className="text-sm mb-2">
            Not Registered?{" "}
            <Link to="/register" className="text-[#b30000] hover:underline">
              Create an account here
            </Link>
          </span>
          <button
            type="submit"
            className="w-full md:w-auto bg-[#b30000] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#cc0000] transition duration-200"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
