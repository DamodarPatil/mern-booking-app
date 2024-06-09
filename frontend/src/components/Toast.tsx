import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const baseStyle =
    "fixed top-16 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-md text-white max-w-md shadow-lg flex items-center transition-opacity duration-500";

  const styles =
    type === "SUCCESS"
      ? `${baseStyle} bg-[#FF9933]`
      : `${baseStyle} bg-[#b30000]`;

  const icon =
    type === "SUCCESS" ? (
      <svg
        className="w-6 h-6 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ) : (
      <svg
        className="w-6 h-6 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );

  return (
    <div className={styles}>
      {icon}
      <span className="text-lg font-semibold">{message}</span>
    </div>
  );
};

export default Toast;
