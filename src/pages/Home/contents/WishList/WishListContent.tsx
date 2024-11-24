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
    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-4 m-6 h-96 w-80">
      <img
        src={image}
        alt={title}
        className="w-36 h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-gray-600 text-sm">{author}</p>
      <div className="flex flex-row gap-1">
        <p className="text-gray-400 text-xs mt-1">Created Date:</p>
        <p className="text-gray-400 text-xs mt-1">
          {createdDate.toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <button
          onClick={() => onRemove(id)}
          className="mt-2 px-4 py-2 text-white rounded hover:bg-red-600"
        >
          ✖️
        </button>
        <button
          onClick={() => onRemove(id)}
          className="mt-2 px-4 py-2 text-white rounded hover:bg-green-600"
        >
          ✅
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
  const [isAdding, setIsAdding] = useState(false); // Kitap ekleme alanı kontrolü

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
    setIsAdding(false); // Ekleme alanını gizle
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      {/* Header */}
      <div className="h-16 bg-slate-400 flex items-center justify-center px-4 shadow-md">
        <span className="text-xl font-bold">WISH BOOKS LIST</span>
      </div>

      {/* Kitap Ekle Butonu */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => setIsAdding((prev) => !prev)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {isAdding ? "Ekleme Alanını Kapat" : "Kitap Ekle"}
        </button>
      </div>

      {/* Kitap Ekleme Alanı */}
      {isAdding && (
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 mx-4">
          <h3 className="text-lg font-semibold mb-2">Yeni Kitap Ekle</h3>
          <input
            type="text"
            placeholder="Kitap Başlığı"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="border border-gray-300 rounded p-2 w-64 mb-2"
          />
          <input
            type="text"
            placeholder="Yazar"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="border border-gray-300 rounded p-2 w-64 mb-2"
          />
          <input
            type="text"
            placeholder="Resim URL'si"
            value={newBook.image}
            onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
            className="border border-gray-300 rounded p-2 w-64 mb-4"
          />
          <button
            onClick={handleAddBook}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Kitap Ekle
          </button>
        </div>
      )}

      {/* Kitap Kartları */}
      <div className="flex flex-wrap items-center justify-center p-4">
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
          <p className="text-gray-500 text-lg mt-8">
            Henüz eklediğiniz kitap yok.
          </p>
        )}
      </div>
    </div>
  );
};

export default WishListContent;
