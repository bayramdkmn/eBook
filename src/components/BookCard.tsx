import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

type BookCardProps = {
  id: string | number;
  title: string;
  author: string;
  image: string;
  createdDate: Date;
  onPrimaryAction?: (id: string | number) => void;
  onSecondaryAction?: (id: string | number) => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryColor?: string;
  secondaryColor?: string;
};

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  image,
  createdDate,
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel = "Sil",
  secondaryLabel = "İşaretle",
  primaryColor = "bg-red-500 hover:bg-red-600",
  secondaryColor = "bg-green-500 hover:bg-green-600",
}) => {
  const { darkMode } = useTheme();
  const { t } = useTranslation() as { t: (key: string) => string };
  return (
    <div
      className={`flex flex-col items-center justify-between rounded-2xl p-5 m-4 w-72 h-[440px] transition hover:scale-105 select-none shadow-xl ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full h-48 flex items-center justify-center mb-4">
        <img
          src={image}
          alt={title}
          className="max-h-full object-contain rounded-md"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm">{author}</p>
        <p className="text-xs mt-1 text-gray-400">
          {new Date(createdDate).toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-row gap-3 mt-6">
        {onPrimaryAction && (
          <button
            onClick={() => onPrimaryAction(id)}
            className={`${primaryColor} text-white text-sm px-3 py-2 rounded-md shadow`}
          >
            🗑️ {t(primaryLabel)}
          </button>
        )}
        {onSecondaryAction && (
          <button
            onClick={() => onSecondaryAction(id)}
            className={`${secondaryColor} text-white text-sm px-3 py-2 rounded-md shadow`}
          >
            ✅ {t(secondaryLabel)}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
