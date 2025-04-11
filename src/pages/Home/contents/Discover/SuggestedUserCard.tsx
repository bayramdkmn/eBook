import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useUserContext } from "../../../../context/UserContext";
import { useTranslation } from "react-i18next";

interface SuggestedUserCardProps {
  id: string;
  name: string;
  surname: string;
  avatar?: string;
  followerCount?: number;
}

const SuggestedUserCard: React.FC<SuggestedUserCardProps> = ({
  id,
  name,
  surname,
  avatar,
  followerCount,
}) => {
  const { removeUserFromSuggestions, followUser, unfollowUser } =
    useUserContext();
  const { t } = useTranslation("common") as { t: (key: string) => string };
  const [followed, setFollowed] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const onFollowClick = async () => {
    const res = await followUser(id);
    if (res) {
      setFollowed(true);
      setTimeout(() => setFadeOut(true), 1000);
      setTimeout(() => removeUserFromSuggestions(id), 1800);
    }
  };

  return (
    <div
      className={`flex items-center mb-6 transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <Avatar sx={{ width: 60, height: 60 }} src={avatar || ""} />
      <div className="ml-4">
        <div className="font-bold text-lg">
          {name} {surname}
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <div>{followerCount}</div>
          <span>{t("discover.followers")}</span>
        </div>
      </div>
      <button
        onClick={onFollowClick}
        disabled={followed}
        className={`ml-auto px-4 py-1 rounded-xl transition-all duration-300 ${
          followed
            ? "bg-green-500 text-white cursor-default"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {followed ? t("discover.followed") : t("discover.follow")}
      </button>
    </div>
  );
};

export default SuggestedUserCard;
