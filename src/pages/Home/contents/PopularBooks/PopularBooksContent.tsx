import { Image } from "@mui/icons-material";
import { Avatar, Button, Rating } from "@mui/material";
import React, { useState } from "react";

const PopularBooksContent = () => {
  const [rating, setRating] = useState<number | null>(4);
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
  ]);

  const addWishList = (id: number) => {
    console.log("a");
    alert("Kitap başarıyla İstek Listenize Eklendi");
  };

  const [visiblePosts, setVisiblePosts] = useState(15);

  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + 15);
  };
  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      {/* Header */}
      <div className="h-16 bg-slate-400 flex items-center justify-center px-4 shadow-md">
        <span className="text-xl font-bold">POPULAR BOOK LIST</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 flex-grow px-4 py-6">
        <div
          className="flex-1 bg-white shadow-md rounded-md p-4 overflow-y-auto"
          style={{ maxHeight: "calc(87vh - 64px)" }}
        >
          <div className="flex w-full bg-slate-400 flex-row h-full rounded-2xl py-8">
            <div className="flex  h-full w-1/6 justify-center items-center">
              <img src={""} className="w-36 h-48 object-cover rounded-md" />{" "}
            </div>
            <div className="flex flex-col w-1/6 mt-8 gap-3">
              <div className="font-bold text-xl">Book Name:</div>
              <div className="font-bold text-xl">Author:</div>
            </div>
            <div className="flex w-3/6 flex-col pt-6 items-center ">
              <div className="font-bold text-xl pb-6">Popülerlik</div>
              <Rating name="book-rating" value={rating} readOnly />
            </div>
            <div className="flex h-full justify-center items-center w-1/6">
              <Button onClick={() => addWishList(5)} variant="contained">
                İstek Listeme Ekle
              </Button>
            </div>
          </div>
          {visiblePosts < posts.length && (
            <div className="text-center mt-4">
              <button
                onClick={handleShowMore}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Daha Fazla Göster
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularBooksContent;
