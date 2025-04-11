import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import { User } from "../types/User.type";

interface Props {
  type: "followers" | "following";
  onClose: () => void;
}

const ModalFollowersFollowing: React.FC<Props> = ({ type, onClose }) => {
  const { t } = useTranslation() as { t: (key: string) => string };
  const {
    followUser,
    unfollowUser,
    userFollowers,
    userFollowing,
    fetchFollowers,
    fetchUserFollowing,
    fetchUserSuggestions,
  } = useUserContext();

  const [localUsers, setLocalUsers] = useState<User[]>([]);

  const isFollowing = (userId: string) => {
    return userFollowing.some((u) => u.id === userId);
  };

  const handleFollowToggle = async (userId: string) => {
    try {
      if (isFollowing(userId)) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }

      // Verileri tekrar çek + localStorage otomatik güncellenecek
      await fetchFollowers();
      await fetchUserFollowing();
      await fetchUserSuggestions();

      // UI'daki listeyi güncelle
      const updatedUsers =
        type === "followers"
          ? JSON.parse(localStorage.getItem("userFollowers") || "[]")
          : JSON.parse(localStorage.getItem("userFollowing") || "[]");
      setLocalUsers(updatedUsers);
    } catch (error) {
      console.error("Takip işlemi başarısız", error);
    }
  };

  useEffect(() => {
    // LocalStorage’dan başlat
    const followers = JSON.parse(localStorage.getItem("userFollowers") || "[]");
    const following = JSON.parse(localStorage.getItem("userFollowing") || "[]");
    const initialUsers = type === "followers" ? followers : following;
    setLocalUsers(initialUsers);

    // Sonradan fetch et (localStorage da güncellenir)
    fetchFollowers();
    fetchUserFollowing();
  }, []);

  useEffect(() => {
    // Context state değiştiğinde de listeyi güncelle
    const users = type === "followers" ? userFollowers : userFollowing;
    setLocalUsers(users);
  }, [type, userFollowers, userFollowing]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-md max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {type === "followers" ? t("modal.followers") : t("modal.following")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-3">
          {localUsers.length === 0 ? (
            <p className="text-sm text-gray-500">{t("modal.noUsers")}</p>
          ) : (
            localUsers.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{user.name}</span>
                <button
                  onClick={() => handleFollowToggle(user.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    isFollowing(user.id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isFollowing(user.id)
                    ? t("modal.unfollow")
                    : t("modal.follow")}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ModalFollowersFollowing;
