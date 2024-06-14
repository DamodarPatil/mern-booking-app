import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = ({ onClick }: { onClick?: () => void }) => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      if (onClick) onClick();
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={handleClick}
        className="block md:hidden bg-background-50 text-danger-500 px-4 py-1 hover:bg-background-100"
      >
        Sign out
      </button>

      {/* Desktop Button */}
      <button
        onClick={handleClick}
        className="hidden md:inline-block rounded-md bg-background-50 text-primary-500 font-bold px-4 py-1 hover:bg-background-100"
      >
        Sign out
      </button>
    </>
  );
};

export default SignOutButton;
