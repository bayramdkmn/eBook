import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const DiscoverContent = () => {
  const { posts, isUserLogin } = useUserContext();
  const { darkMode } = useTheme();
  const { t } = useTranslation("common") as { t: (key: string) => string };
  const navigate = useNavigate();
  const [visiblePosts, setVisiblePosts] = useState(15);

  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + 15);
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
                  <div className="font-bold text-lg">
                    {post.user.name} {post.user.surname}
                  </div>
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-2 text-sm">{post.content}</div>

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

        {/* Sağ Sidebar */}
        <div
          className={`lg:w-1/4 shadow-md rounded-md p-4 hidden xl:block transition-colors duration-300 ${
            darkMode ? "bg-gray-700 text-white" : "bg-slate-200 text-black"
          }`}
        >
          <div className="flex items-center mb-6">
            <Avatar sx={{ width: 60, height: 60 }} src="/pp.jpeg" />
            <div className="ml-4">
              <div className="font-bold text-lg">Bayram Dikmen</div>
              <div className="text-sm text-gray-500">
                1000 {t("discover.followers")}
              </div>
            </div>
            <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600">
              {t("discover.follow")}
            </button>
          </div>

          <div className="flex items-center mb-6">
            <Avatar sx={{ width: 60, height: 60 }} />
            <div className="ml-4">
              <div className="font-bold text-lg">Güneş Bolçelik</div>
              <div className="text-sm text-gray-500">
                2500 {t("discover.followers")}
              </div>
            </div>
            <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600">
              {t("discover.follow")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverContent;
