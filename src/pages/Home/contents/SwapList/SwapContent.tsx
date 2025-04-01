import { Avatar, Button, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createSwap, getSwapList } from "./SwapListAPI";
import AddSwap from "./AddSwap/addSwap";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

interface Post {
  id: number;
  swapOwnerName: string;
  swapOwnerAvatar: string;
  bookName: string;
  author: string;
  content: string;
  img?: string;
}

const SwapContent = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation() as {
    t: (key: string) => string;
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rating, setRating] = useState<number | null>(4);
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(15);

  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + 15);
  };

  useEffect(() => {
    const fetchSwapList = async () => {
      try {
        const data = await getSwapList();
        const formattedPosts = data.map((item: any) => ({
          id: item.id,
          swapOwnerName: `${item.requester.name} ${item.requester.surname}`,
          swapOwnerAvatar: item.requester.avatar,
          bookName: item.offeredBook.title,
          author: item.offeredBook.author || t("swapContent.unknownAuthor"),
          content: item.content || t("swapContent.noContent"),
          img: item.offeredBook.image || null,
        }));
        setPosts(formattedPosts);
      } catch (err) {
        console.error(t("swapContent.fetchError"), err);
      }
    };

    fetchSwapList();
  }, [t]);

  async function tikla() {
    try {
      const data = {
        content: "Test swap request",
        bookTitle: "Saatleri Ayarlama Enstitüsü",
      };
      await createSwap(data);
    } catch (err) {
      console.log(t("swapContent.swapError"), err);
    }
  }

  return (
    <div
      className={`flex flex-col h-full w-full transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Üst bar */}
      <div
        className={`h-16 flex items-center justify-end px-6 shadow-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <button
          onClick={handleOpen}
          className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          {t("swapContent.addSwap")}
        </button>
        <AddSwap open={open} onClose={handleClose} />
      </div>

      {/* İçerik */}
      <div className="h-full w-full">
        <div
          className={`col-span-9 rounded-md p-4 overflow-y-auto transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white shadow-md"
          }`}
          style={{ maxHeight: "calc(88vh - 64px)" }}
        >
          {posts.slice(0, visiblePosts).map((post, index) => (
            <div
              key={post.id}
              className={`mb-6 p-4 rounded-md flex flex-row justify-between transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-slate-100 text-gray-900 shadow"
              } ${index === visiblePosts - 1 ? "pb-12" : ""}`}
            >
              {/* Sol kısım */}
              <div className="flex flex-col w-full pr-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar
                      sx={{ width: 60, height: 60 }}
                      src={post.swapOwnerAvatar}
                    />
                    <div className="font-bold text-lg ml-2">
                      {post.swapOwnerName}
                    </div>
                  </div>
                </div>
                <div
                  className={`mt-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {post.content}
                </div>
                {post.img && (
                  <div className="mt-4 flex flex-row justify-between">
                    <img
                      className="w-full rounded-md object-contain mx-4"
                      style={{
                        maxHeight: "350px",
                        maxWidth: "200px",
                        height: "auto",
                        width: "auto",
                      }}
                      src={post.img}
                      alt="Post"
                    />
                  </div>
                )}
              </div>

              {/* Sağ bilgi kutusu */}
              <div className="flex w-1/3 items-end">
                <div
                  className={`flex w-full p-4 font-semibold text-xl flex-col justify-between h-auto rounded-2xl transition-colors duration-300 ${
                    darkMode ? "bg-gray-600" : "bg-slate-300"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="text-xl font-semibold w-fit">
                      {t("swapContent.bookName")}:
                      <span className="text-lg font-normal ml-1">
                        {post.bookName}
                      </span>
                    </div>
                    <div>
                      {t("swapContent.author")}:
                      <span className="text-lg font-normal ml-1">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {t("swapContent.bookRating")}:
                      <Rating name="book-rating" value={rating} readOnly />
                    </div>
                    <div>{t("swapContent.city")}</div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button variant="contained" onClick={tikla}>
                      {t("swapContent.contact")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {visiblePosts < posts.length && (
            <div className="text-center mt-4">
              <button
                onClick={handleShowMore}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {t("swapContent.showMore")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapContent;
