import { Avatar, Button, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getSwapList } from "./SwapListAPI";

const SwapContent = () => {
  const [rating, setRating] = useState<number | null>(4);
  const [swapList, setSwapList] = useState([]); // API'den dönecek veri
  const [loading, setLoading] = useState(true); // Yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Bayram Dikmen",
      content:
        "İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.İlk gönderi içerik örneği.",
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
  useEffect(() => {
    console.log("useEffect başı");
    // API'den swap listesi verilerini çekiyoruz
    const fetchSwapList = async () => {
      try {
        const data = await getSwapList(); // Swap listesi verilerini çek
        setSwapList(data); // State'e kaydet
        console.log(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Yüklenme tamamlandı
      }
    };

    fetchSwapList();
  }, []);

  // Yüklenme göstergesi
  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  // Hata mesajı
  if (error) {
    return <p>Bir hata oluştu: {error}</p>;
  }

  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      <div className="h-16 bg-slate-400 flex items-center justify-center px-4 shadow-md ">
        <span className="text-xl font-bold flex justify-center">
          TAKAS İLANLARI
        </span>
      </div>
      <div className="h-full w-full">
        <div
          className="col-span-9 bg-white shadow-md rounded-md p-4 overflow-y-auto"
          style={{ maxHeight: "calc(88vh - 64px)" }}
        >
          {posts.slice(0, visiblePosts).map((post, index) => (
            <div
              key={post.id}
              className={` mb-6 p-4 bg-slate-100 shadow rounded-md flex flex-row justify-between ${
                index === visiblePosts - 1 ? "pb-12" : ""
              }`}
            >
              <div className="flex flex-col w-full pr-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar
                      className="mr-4"
                      sx={{ width: 60, height: 60 }}
                      src="/pp.jpeg"
                    />
                    <div className="font-bold text-lg">{post.author}</div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-700">{post.content}</div>
                {post.img && (
                  <div className="mt-4 flex flex-row justify-between">
                    <div className="flex flex-row">
                      <img
                        className="w-full rounded-md object-cover mx-4"
                        style={{ height: 200, width: 200 }}
                        src={post.img}
                        alt="Post"
                      />
                      <img
                        className="w-full rounded-md object-cover"
                        style={{ height: 200, width: 200 }}
                        src={post.img}
                        alt="Post"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex w-1/3 items-end">
                <div className="flex w-full bg-slate-300 p-4 font-semibold text-xl flex-col justify-between h-60 rounded-2xl ">
                  <div className="flex flex-col gap-2">
                    <div className="text-xl font-semibold w-fit">
                      KİTAP ADI:
                      <span className="text-lg font-normal"> Kitap.name</span>
                    </div>
                    <div>
                      YAZAR:
                      <span className="text-lg font-normal"> Author.name</span>
                    </div>
                    <div className="flex items-center gap-2">
                      KİTAP PUANI:
                      <Rating name="book-rating" value={rating} readOnly />
                    </div>
                    <div>İL:</div>
                  </div>
                  <div className="flex  justify-end">
                    <Button variant="contained">İletişime Geç</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default SwapContent;
