import { Avatar, Button, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createSwap, getSwapList } from "./SwapListAPI";
import AddSwap from "./AddSwap/addSwap";
import { RxAvatar } from "react-icons/rx";

interface Post {
  id: number;
  swapOwnerName: string;
  swapOwnerAvatar: string;
  bookName: string;
  author: string;
  content: string;
  img?: string; // Görsel isteğe bağlı bir alan
}

const SwapContent = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [rating, setRating] = useState<number | null>(4);
  const [swapList, setSwapList] = useState([]); // API'den dönecek veri
  const [loading, setLoading] = useState(true); // Yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu

  const [posts, setPosts] = useState<Post[]>([]);

  const [visiblePosts, setVisiblePosts] = useState(15);

  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + 15);
  };
  useEffect(() => {
    const fetchSwapList = async () => {
      try {
        const data = await getSwapList(); // Swap listesi verilerini çek
        const formattedPosts = data.map((item: any) => ({
          id: item.id,
          swapOwnerName: `${item.requester.name} ${item.requester.surname}`,
          swapOwnerAvatar: item.requester.avatar,
          bookName: item.offeredBook.title,
          author: item.offeredBook.author || "Bilinmeyen Yazar",
          content: item.content || "İçerik yok",
          img: item.offeredBook.image || null, // Varsayılan olarak null olabilir
        }));
        setPosts(formattedPosts);
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

  async function tikla() {
    try {
      const data = {
        content: "Test swap request",
        bookTitle: "saatleri ayarlama enstitüsü", // Bu veriyi backend'deki book ID'sine göre değiştirebilirsin
      };
      await createSwap(data);
    } catch (err) {
      console.log("hata", err);
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      <div className="h-16 bg-slate-400 flex items-center justify-center px-4 shadow-md ">
        <span className="text-xl font-bold flex justify-center w-5/6">
          TAKAS İLANLARI
        </span>
        {/* <Button  onClick={handleOpen} variant="contained">
          Takas İlanı Ekle
        </Button> */}
        <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded-xl  hover:bg-blue-600">
          Takas İlanı Ekle
        </button>

        <AddSwap open={open} onClose={handleClose} />
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
                    {post.swapOwnerAvatar ? (
                      <Avatar
                        sx={{ width: 60, height: 60 }}
                        src={post.swapOwnerAvatar}
                      />
                    ) : (
                      <RxAvatar size={60} />
                    )}
                    <div className="font-bold text-lg ml-2">
                      {post.swapOwnerName}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-700">{post.content}</div>
                {post.img && (
                  <div className="mt-4 flex flex-row justify-between">
                    <div className="flex flex-row">
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
                  </div>
                )}
              </div>
              <div className="flex w-1/3 items-end">
                <div className="flex w-full bg-slate-300 p-4 font-semibold text-xl flex-col justify-between h-auto rounded-2xl ">
                  <div className="flex flex-col gap-2">
                    <div className="text-xl font-semibold w-fit">
                      KİTAP ADI:
                      <span className="text-lg font-normal">
                        {post.bookName}
                      </span>
                    </div>
                    <div>
                      YAZAR:
                      <span className="text-lg font-normal">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      KİTAP PUANI:
                      <Rating name="book-rating" value={rating} readOnly />
                    </div>
                    <div>İL:</div>
                  </div>
                  <div className="flex  justify-end">
                    <Button variant="contained" onClick={tikla}>
                      İletişime Geç
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
