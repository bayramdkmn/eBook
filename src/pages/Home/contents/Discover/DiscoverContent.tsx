import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { deleteUserPost } from "../../../../services/userService";
import SuggestedUserCard from "./SuggestedUserCard";

const DiscoverContent = () => {
  const {
    posts,
    isUserLogin,
    userSuggestions,
    removePost,
    fetchUserSuggestions,
  } = useUserContext();
  const { darkMode } = useTheme();
  const { t } = useTranslation("common") as { t: (key: string) => string };
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("requesterId");
  const [visiblePosts, setVisiblePosts] = useState(15);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + 15);
  };

  const handleRefreshSuggestions = async () => {
    setLoadingSuggestions(true);
    await fetchUserSuggestions();
    setLoadingSuggestions(false);
  };

  if (!isUserLogin) {
    return (
      <div className="flex items-center justify-center w-full h-full flex-col">
        <h1 className="text-2xl font-bold text-center">
          {t("eventList.loginRequired")}
        </h1>
        <button
          onClick={() => navigate("/signIn")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          {t("login.title")}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-full w-full transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-4 flex-grow px-4 py-6">
        <div
          className={`flex-1 shadow-md rounded-md p-4 overflow-y-auto max-h-[88svh] transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {posts.slice(0, visiblePosts).map((post, index) => (
            <div
              key={post.id}
              className={`mb-6 p-4 shadow rounded-md transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-slate-100 text-gray-800"
              } ${index === visiblePosts - 1 ? "pb-12" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar
                    className="mr-4"
                    sx={{ width: 60, height: 60 }}
                    src={post.user?.avatar || ""}
                  />
                  <div className="flex flex-col text-sm">
                    <div className="font-bold text-lg">
                      {post.user.name} {post.user.surname}
                    </div>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-gray-500 text-sm flex flex-col gap-4">
                  {String(post.user?.id) === currentUserId && (
                    <button
                      onClick={async () => {
                        const confirmDelete = window.confirm(
                          "Bu gönderiyi silmek istediğine emin misin?"
                        );
                        if (!confirmDelete) return;

                        try {
                          await deleteUserPost(post.id);
                          removePost(post.id);
                        } catch (err) {
                          console.error("Silme başarısız", err);
                          alert("Gönderi silinirken bir hata oluştu.");
                        }
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                      title="Gönderiyi sil"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-2 mt-4 items-center">
                <span className="font-bold text-base">
                  {t("discover.postBookName")}:
                </span>
                <span className="text-base">{post.title}</span>
              </div>
              <div className="mt-4 text-lg">{post.content}</div>

              {post.images && (
                <div className="mt-4">
                  <img
                    className="w-full rounded-md object-cover"
                    style={{ height: 200, width: 200 }}
                    src={post.images[0]}
                    alt="Post"
                  />
                </div>
              )}
            </div>
          ))}

          {visiblePosts < posts.length && (
            <div className="text-center mt-4">
              <button
                onClick={handleShowMore}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {t("discover.showMore")}
              </button>
            </div>
          )}
        </div>

        <div
          className={`lg:w-1/4 shadow-md rounded-md p-4 hidden xl:block transition-colors duration-300 ${
            darkMode ? "bg-gray-700 text-white" : "bg-slate-200 text-black"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {t("discover.suggestedUsers")}
            </h2>
            <button
              onClick={handleRefreshSuggestions}
              className="text-sm text-blue-500 hover:underline"
            >
              {loadingSuggestions ? t("loading") : t("discover.refresh")}
            </button>
          </div>

          {userSuggestions.length > 0 ? (
            userSuggestions.map((user) => (
              <SuggestedUserCard
                key={user.id}
                id={user.id}
                name={user.name}
                surname={user.surname}
                avatar={user.avatar}
                followerCount={user.followersCount}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">
              {t("discover.noSuggestions")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoverContent;
