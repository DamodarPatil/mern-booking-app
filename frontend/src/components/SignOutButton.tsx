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
        className="block md:hidden bg-[#FFFFFF] text-[#ff4d4d] px-4 py-1 hover:bg-[#e6e6e6]"
      >
        Sign out
      </button>

      {/* Desktop Button */}
      <button
        onClick={handleClick}
        className="hidden md:inline-block rounded-md bg-[#FFFFFF] text-[#b30000] font-bold px-4 py-1 hover:bg-[#e6e6e6]"
      >
        Sign out
      </button>
    </>
  );
};

export default SignOutButton;
