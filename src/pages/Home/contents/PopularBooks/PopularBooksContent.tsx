import { Button, Rating, Snackbar, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../../../context/UserContext";
import { getAllBooks, addWishBookById } from "../../../../services/userService";

const PopularBooksContent = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation() as {
    t: (key: string, options?: Record<string, any>) => string;
  };
  const { isUserLogin } = useUserContext();

  const [books, setBooks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(15);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Kitaplar alınamadı", error);
      }
    };

    fetchBooks();
  }, []);

  const addWishList = async (id: string) => {
    try {
      await addWishBookById(id);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Hata oluştu", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
        {books.slice(0, visiblePosts).map((book: any) => (
          <div
            key={book.id}
            className={`rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 p-5 flex flex-row items-center justify-between select-none ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="w-40 h-56 flex items-center justify-center">
              <img
                src={book.image}
                alt={book.bookName}
                className="max-w-full max-h-full object-contain rounded-md shadow-sm transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col flex-grow px-6">
              <h2
                className={`text-2xl font-semibold mb-1 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {book.title}
              </h2>
              <p
                className={`text-md mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("popularBooks.author")}: {book.author}
              </p>
              <p
                className={`text-sm mb-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {book.description}
              </p>
              <Rating
                name="book-rating"
                value={book.rating || (Math.random() < 0.5 ? 4 : 5)}
                readOnly
              />
            </div>

            <div className={`${isUserLogin ? "flex" : "hidden"} ml-4`}>
              <Button
                onClick={() => addWishList(book.id)}
                variant="contained"
                className="bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300"
              >
                {t("popularBooks.addToWishlist")}
              </Button>
            </div>
          </div>
        ))}

        {visiblePosts < books.length && (
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
