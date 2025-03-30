import { Button, Rating, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";

const PopularBooksContent = () => {
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
    <div className="flex flex-col min-h-screen w-full bg-[#f7f9fc] p-6">
      <div className="flex flex-col gap-6">
        {posts.slice(0, visiblePosts).map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 p-5 flex flex-row items-center justify-between select-none"
          >
            <div className="w-40 h-56 flex items-center justify-center">
              <img
                src={post.img}
                alt={post.bookName}
                className="max-w-full max-h-full object-contain rounded-md shadow-sm transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col flex-grow px-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                {post.bookName}
              </h2>
              <p className="text-md text-gray-600 mb-1">Yazar: {post.author}</p>
              <p className="text-sm text-gray-500 mb-4">{post.content}</p>
              <Rating name="book-rating" value={rating} readOnly />
            </div>

            <div className="ml-4">
              <Button
                onClick={() => addWishList(post.id)}
                variant="contained"
                className="bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300"
              >
                İstek Listeme Ekle
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
              Daha Fazla Göster
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
          Kitap başarıyla istek listene eklendi!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PopularBooksContent;
