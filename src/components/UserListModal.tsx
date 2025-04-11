import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import { User } from "../types/User.type";
import { FaUserCircle as FaUserCircleRaw } from "react-icons/fa";

interface Props {
  type: "followers" | "following";
  onClose: () => void;
}

type UserWithFollow = User & { isFollowing: boolean };

const ModalFollowersFollowing: React.FC<Props> = ({ type, onClose }) => {
  const FaUserCircle = FaUserCircleRaw as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const { t } = useTranslation() as { t: (key: string) => string };
  const {
    followUser,
    unfollowUser,
    fetchFollowers,
    fetchUserFollowing,
    fetchUserSuggestions,
  } = useUserContext();

  const [localUsers, setLocalUsers] = useState<UserWithFollow[]>([]);

  const handleFollowToggle = async (userId: string) => {
    try {
      const user = localUsers.find((u) => u.id === userId);
      if (!user) return;

      if (user.isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }

      await fetchFollowers();
      await fetchUserFollowing();
      await fetchUserSuggestions();

      setLocalUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
        )
      );
    } catch (error) {
      console.error("Takip işlemi başarısız", error);
    }
  };

  useEffect(() => {
    const followers = JSON.parse(localStorage.getItem("userFollowers") || "[]");
    const following = JSON.parse(localStorage.getItem("userFollowing") || "[]");

    const followingIds = new Set(following.map((u: User) => u.id));
    const initialUsers = (type === "followers" ? followers : following).map(
      (user: User) => ({
        ...user,
        isFollowing: followingIds.has(user.id),
      })
    );

    setLocalUsers(initialUsers);

    fetchFollowers();
    fetchUserFollowing();
  }, []);

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
                <div className="flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.name} ${user.surname}`}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-400" />
                  )}
                  <span className="text-sm font-medium">
                    {user.name} {user.surname}
                  </span>
                </div>
                <button
                  onClick={() => handleFollowToggle(user.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    user.isFollowing
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {user.isFollowing ? t("modal.unfollow") : t("modal.follow")}
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
