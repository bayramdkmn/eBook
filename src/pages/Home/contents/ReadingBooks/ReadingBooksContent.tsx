import React, { useState } from "react";
import { addReadingBooks } from "./ReadingBookAPI";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const initialBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "https://via.placeholder.com/150",
    createdDate: new Date("2024-01-01"),
  },
];

const BookCard = ({
  id,
  title,
  author,
  image,
  createdDate,
  onRemove,
}: {
  id: number;
  title: string;
  author: string;
  image: string;
  createdDate: Date;
  onRemove: (id: number) => void;
}) => {
  const { darkMode } = useTheme();
  const { t } = useTranslation() as {
    t: (key: string) => string;
  };

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
          {createdDate.toLocaleDateString()}
        </p>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-md shadow"
      >
        🗑️ {t("readingBooks.removeFromList")}
      </button>
    </div>
  );
};

const ReadingBooksContent = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation() as {
    t: (key: string) => string;
  };

  const [books, setBooks] = useState(initialBooks);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "roman",
    image: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const { isUserLogin } = useUserContext();
  const navigate = useNavigate();
  const handleRemove = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  async function handleAddBook() {
    if (!newBook.title || !newBook.author || !newBook.image) {
      alert(t("readingBooks.fillAllFields"));
      return;
    }

    try {
      const data = {
        bookTitle: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        image: newBook.image,
      };
      await addReadingBooks(data);
    } catch (err: any) {
      console.error("add reading book frontend hata", err);
    }

    const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;

    setBooks((prevBooks) => [
      ...prevBooks,
      {
        id: newId,
        title: newBook.title,
        author: newBook.author,
        image: newBook.image,
        createdDate: new Date(),
      },
    ]);

    setNewBook({ title: "", author: "", image: "", genre: "roman" });
    setIsAdding(false);
  }

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
      className={`flex flex-col min-h-screen w-full p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-[#f5f7fa] text-black"
      }`}
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAdding((prev) => !prev)}
          className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          {isAdding
            ? t("readingBooks.closeAddForm")
            : t("readingBooks.addBookButton")}
        </button>
      </div>

      {isAdding && (
        <div
          className={`flex flex-col items-center rounded-xl p-6 mb-6 w-full md:w-2/3 lg:w-1/2 mx-auto shadow-md transition-colors duration-300 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">
            {t("readingBooks.addNewBook")}
          </h3>
          <input
            type="text"
            placeholder={t("readingBooks.bookTitle")}
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className={`rounded p-2 w-full mb-3 border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />
          <input
            type="text"
            placeholder={t("readingBooks.bookAuthor")}
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className={`rounded p-2 w-full mb-3 border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />
          <input
            type="text"
            placeholder={t("readingBooks.bookImage")}
            value={newBook.image}
            onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
            className={`rounded p-2 w-full mb-4 border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />
          <button
            onClick={handleAddBook}
            className="px-5 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
          >
            {t("readingBooks.addBookButton")}
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              image={book.image}
              createdDate={book.createdDate}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg mt-8 select-none">
            {t("readingBooks.noBooks")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReadingBooksContent;
