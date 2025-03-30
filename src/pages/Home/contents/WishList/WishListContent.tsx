import React, { useState } from "react";

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
  isBuy,
}: {
  id: number;
  title: string;
  author: string;
  image: string;
  createdDate: Date;
  onRemove: (id: number) => void;
  isBuy: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-between bg-white shadow-xl rounded-2xl p-5 m-4 w-72 h-[440px] transition hover:scale-105 select-none">
      <div className="w-full h-48 flex items-center justify-center mb-4">
        <img
          src={image}
          alt={title}
          className="max-h-full object-contain rounded-md"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{author}</p>
        <p className="text-gray-400 text-xs mt-1">
          {createdDate.toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-row gap-3 mt-6">
        <button
          onClick={() => onRemove(id)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-md shadow"
        >
          🗑️ Sil
        </button>
        <button
          onClick={() => isBuy(id)}
          className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-2 rounded-md shadow"
        >
          ✅ Okundu
        </button>
      </div>
    </div>
  );
};

const WishListContent = () => {
  const [books, setBooks] = useState(initialBooks);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    image: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleRemove = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const isBookBuy = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    alert("Kitap başarıyla okuduğunuz kitaplar listesine eklendi.");
  };

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.image) {
      alert("Lütfen tüm alanları doldurun!");
      return;
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

    setNewBook({ title: "", author: "", image: "" });
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f5f7fa] p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAdding((prev) => !prev)}
          className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          {isAdding ? "Ekleme Alanını Kapat" : "Kitap Ekle"}
        </button>
      </div>

      {isAdding && (
        <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 mb-6 w-full md:w-2/3 lg:w-1/2 mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Yeni Kitap Ekle
          </h3>
          <input
            type="text"
            placeholder="Kitap Başlığı"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full mb-3"
          />
          <input
            type="text"
            placeholder="Yazar"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full mb-3"
          />
          <input
            type="text"
            placeholder="Resim URL'si"
            value={newBook.image}
            onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
          <button
            onClick={handleAddBook}
            className="px-5 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
          >
            Kitap Ekle
          </button>
        </div>
      )}

      {/* Kitaplar */}
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
              isBuy={isBookBuy}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg mt-8 select-none">
            Henüz eklediğiniz kitap yok.
          </p>
        )}
      </div>
    </div>
  );
};

export default WishListContent;
