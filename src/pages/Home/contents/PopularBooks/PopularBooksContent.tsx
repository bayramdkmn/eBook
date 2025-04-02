import { Button, Rating, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../../../context/UserContext";

const PopularBooksContent = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation() as {
    t: (key: string, options?: Record<string, any>) => string;
  };
  const { isUserLogin } = useUserContext();
  const [rating, setRating] = useState<number | null>(4);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Bayram Dikmen",
      content: "Bu kitap, modern edebiyatın önemli örneklerinden biridir.",
      img: "/logo192.png",
      bookName: "Gölgelerin Dansı",
    },
    {
      id: 2,
      author: "Bayram Dikmen",
      content: "Psikolojik derinliğiyle dikkat çeken bir başyapıt.",
      img: "/logo192.png",
      bookName: "Zihin Oyunları",
    },
  ]);

  const addWishList = (id: number) => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const [visiblePosts, setVisiblePosts] = useState(15);

  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + 15);
  };

  return (
    <div
      className={`flex flex-col min-h-screen w-full p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-[#f7f9fc] text-black"
      }`}
    >
      <div className="flex flex-col gap-6">
        {posts.slice(0, visiblePosts).map((post) => (
          <div
            key={post.id}
            className={`rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 p-5 flex flex-row items-center justify-between select-none ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="w-40 h-56 flex items-center justify-center">
              <img
                src={post.img}
                alt={post.bookName}
                className="max-w-full max-h-full object-contain rounded-md shadow-sm transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col flex-grow px-6">
              <h2
                className={`text-2xl font-semibold mb-1 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {post.bookName}
              </h2>
              <p
                className={`text-md mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("popularBooks.author")}: {post.author}
              </p>
              <p
                className={`text-sm mb-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {post.content}
              </p>
              <Rating name="book-rating" value={rating} readOnly />
            </div>

            <div className={`${isUserLogin ? "flex" : "hidden"} ml-4`}>
              <Button
                onClick={() => addWishList(post.id)}
                variant="contained"
                className="bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300"
              >
                {t("popularBooks.addToWishlist")}
              </Button>
            </div>
          </div>
        ))}

        {visiblePosts < posts.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleShowMore}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300"
            >
              {t("popularBooks.showMore")}
            </button>
          </div>
        )}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {t("popularBooks.addedMessage")}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PopularBooksContent;
