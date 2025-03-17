import React from "react";

interface BrutalButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const BrutalButton: React.FC<BrutalButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
}) => {
  const getButtonClasses = () => {
    const baseClasses =
      "brutal-border font-bold uppercase px-4 py-2 text-center transition-all duration-100 inline-block";

    switch (variant) {
      case "primary":
        return `${baseClasses} ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-brutal-red text-brutal-white hover:bg-brutal-red/90"
        }`;
      case "secondary":
        return `${baseClasses} ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-brutal-black text-brutal-white hover:bg-brutal-black/90"
        }`;
      case "outline":
        return `${baseClasses} ${
          disabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-brutal-white text-brutal-black hover:bg-brutal-offwhite"
        }`;
      default:
        return baseClasses;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${getButtonClasses()} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default BrutalButton;
