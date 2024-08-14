import { set } from "date-fns";
import { SparkleIcon, Star } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

type GeminiButtonProps = {
  onClick: () => void;
  showLoader: boolean;
};

const GeminiButton: React.FC<GeminiButtonProps> = ({ onClick, showLoader }) => {
  const { watch } = useFormContext();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      className="rounded-md bg-gradient-to-br from-purple-600 to-pink-600 px-2 py-1 text-white hover:outline "
      onClick={handleButtonClick}
    >
      {showLoader ? (
        <span className="glowing-text inline-flex items-center gap-1 text-xs">
          {" "}
          Generating description <Star className="size-4 animate-spin" />{" "}
        </span>
      ) : (
        <span className="glowing-text inline-flex items-center gap-1 text-xs">
          {" "}
          Generate with AI <SparkleIcon className="size-4" />{" "}
        </span>
      )}
    </button>
  );
};

export default GeminiButton;
