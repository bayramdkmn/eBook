import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const DiscoverContent = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation("common") as { t: (key: string) => string };

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Bayram Dikmen",
      content: "İlk gönderi içerik örneği.",
      img: "/logo192.png",
    },
    {
      id: 2,
      author: "Bayram Dikmen",
      content: "İkinci gönderi içerik örneği.",
    },
    {
      id: 3,
      author: "Bayram Dikmen",
      content: "İlk gönderi içerik örneği.",
      img: "/logo192.png",
    },
    {
      id: 4,
      author: "Bayram Dikmen",
      content: "İlk gönderi içerik örneği.",
      img: "/logo192.png",
    },
    {
      id: 5,
      author: "Bayram Dikmen",
      content: "s gönderi içerik örneği.",
      img: "/logo192.png",
    },
    {
      id: 6,
      author: "Bayram Dikmen",
      content: "s gönderi içerik örneği.",
      img: "/logo192.png",
    },
    {
      id: 7,
      author: "Bayram Dikmen",
      content: "yedi gönderi içerik örneği.",
    },
    {
      id: 8,
      author: "Bayram Dikmen",
      content: "sekizinci gönderi içerik örneği.",
      img: "/logo192.png",
    },
    {
      id: 9,
      author: "Bayram Dikmen",
      content: "dokuzuncu gönderi içerik örneği.",
    },
    {
      id: 10,
      author: "Bayram Dikmen",
      content: "onuncu gönderi içerik örneği.",
      img: "/logo192.png",
    },
    {
      id: 11,
      author: "Bayram Dikmen",
      content: "on birinci gönderi içerik örneği.",
    },
    {
      id: 12,
      author: "Bayram Dikmen",
      content: "on ikinci gönderi içerik örneği.",
      img: "/logo192.png",
    },
    {
      id: 13,
      author: "Bayram Dikmen",
      content: "on üçüncü gönderi içerik örneği.",
    },
    {
      id: 14,
      author: "Bayram Dikmen",
      content: "on dördüncü gönderi içerik örneği.",
      img: "/logo192.png",
    },
    {
      id: 15,
      author: "Bayram Dikmen",
      content: "on beşinci gönderi içerik örneği.",
    },
    {
      id: 16,
      author: "Bayram Dikmen",
      content: "on altıncı gönderi içerik örneği.",
    },
    {
      id: 17,
      author: "Bayram Dikmen",
      content: "on yedinci gönderi içerik örneği.",
    },
  ]);

  const [visiblePosts, setVisiblePosts] = useState(15);

  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + 15);
  };

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
                    src="/pp.jpeg"
                  />
                  <div className="font-bold text-lg">{post.author}</div>
                </div>
                <div className="text-gray-500">...</div>
              </div>
              <div className="mt-2 text-sm">{post.content}</div>
              {post.img && (
                <div className="mt-4">
                  <img
                    className="w-full rounded-md object-cover"
                    style={{ height: 200, width: 200 }}
                    src={post.img}
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
        </div>
      </div>
    </div>
  );
};

export default DiscoverContent;
