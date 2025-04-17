import React, { useState, useEffect } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import BookCard from "../../../../components/BookCard";
import {
  getWishBooks,
  addWishBook,
  deleteWishBook,
  addReadingBooksById,
} from "../../../../services/userService"; // API fonksiyonlarını sen oluşturursun

type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
  createdDate: Date;
};

const WishListContent = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation() as { t: (key: string) => string };
  const { isUserLogin } = useUserContext();
  const navigate = useNavigate();

  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    image: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzf4pv2dn/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleRemove = async (id: string | number) => {
    const confirmDelete = window.confirm(t("wishlist.confirmDelete"));
    if (!confirmDelete) return;

    try {
      await deleteWishBook(id.toString());
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Kitap silinirken hata oluştu", err);
      alert(t("wishlist.deleteError"));
    }
  };

  const isBookBuy = async (id: string | number) => {
    alert(t("wishlist.successfullyAdded"));
    try {
      await deleteWishBook(id.toString());
      await addReadingBooksById(id.toString());
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Kitap satın alınırken hata oluştu", error);
      alert(t("wishlist.errorAdding"));
    }
  };

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.image) {
      alert(t("wishlist.fillAllFields"));
      return;
    }

    try {
      const payload = {
        bookTitle: newBook.title,
        author: newBook.author,
        image: newBook.image,
        genre: "roman",
      };

      const response = await addWishBook(payload);
      const added = response.book;

      setBooks((prev) => [
        ...prev,
        {
          id: added.id,
          title: added.title,
          author: added.author,
          genre: added.genre,
          image: added.image || newBook.image,
          createdDate: new Date(added.createdAt),
        },
      ]);

      setNewBook({ title: "", author: "", image: "" });
      setIsAdding(false);
    } catch (err) {
      console.error("Kitap eklenirken hata oluştu", err);
      alert(t("wishlist.addError"));
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getWishBooks();
        const list = res.map((b: any) => ({
          id: b.id,
          title: b.title,
          author: b.author,
          image: b.image || "https://via.placeholder.com/150",
          createdDate: new Date(b.createdAt),
        }));
        setBooks(list);
      } catch (err) {
        console.error("İstek listesi kitapları alınamadı", err);
      }
    };

    fetchBooks();
  }, []);

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
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          {isAdding ? t("wishlist.closeAddForm") : t("wishlist.addBook")}
        </button>
      </div>

      {isAdding && (
        <div
          className={`flex flex-col items-center rounded-xl p-6 mb-6 w-full md:w-2/3 lg:w-1/2 mx-auto shadow-md ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">
            {t("wishlist.addNewBook")}
          </h3>
          <input
            type="text"
            placeholder={t("wishlist.bookTitle")}
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="rounded p-2 w-full mb-3 border"
          />
          <input
            type="text"
            placeholder={t("wishlist.author")}
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="rounded p-2 w-full mb-3 border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setUploading(true);
                try {
                  const url = await uploadImageToCloudinary(file);
                  setNewBook((prev) => ({ ...prev, image: url }));
                } catch {
                  alert("Görsel yüklenemedi.");
                } finally {
                  setUploading(false);
                }
              }
            }}
            className="rounded p-2 w-full mb-3 border"
          />
          {uploading && (
            <p className="text-sm text-gray-400 mb-2">
              {t("wishlist.uploading")}
            </p>
          )}
          <button
            onClick={handleAddBook}
            disabled={uploading}
            className={`px-5 py-2 rounded-md shadow transition ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {uploading
              ? t("wishlist.uploading") || "Yükleniyor..."
              : t("wishlist.addBookButton")}
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
              onPrimaryAction={handleRemove}
              onSecondaryAction={isBookBuy}
              primaryLabel="wishlist.remove"
              secondaryLabel="wishlist.read"
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg mt-8 select-none">
            {t("wishlist.noBooks")}
          </p>
        )}
      </div>
    </div>
  );
};

export default WishListContent;
