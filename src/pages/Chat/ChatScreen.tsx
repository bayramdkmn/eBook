import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, TextField } from "@mui/material";
import React, { useState } from "react";

const ChatScreen = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Bayram Dikmen",
      content:
        "İlk gönderi içerik örneği İlk gönderi içerik örneğiİlk gönderi içerik örneğiİlk gönderi içerik örneği.",
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
    },
    {
      id: 4,
      author: "Bayram Dikmen",
      content: "İlk gönderi içerik örneği.",
    },
    {
      id: 5,
      author: "Bayram Dikmen",
      content: "s gönderi içerik örneği.",
    },
    {
      id: 6,
      author: "Bayram Dikmen",
      content: "s gönderi içerik örneği.",
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

  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      <div className="h-16 bg-slate-400 flex justify-center items-center px-4 shadow-md">
        <span className="text-xl font-bold">Chat Screen</span>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col lg:flex-row gap-4 flex-grow px-4 py-6 w-1/4">
          <div
            className="flex-1 bg-white shadow-md rounded-md p-4 overflow-y-auto"
            style={{ maxHeight: "calc(87vh - 64px)" }}
          >
            {posts.slice(0).map((post, index) => (
              <div
                key={post.id}
                className={`mb-6 p-4 bg-slate-100 shadow rounded-md `}
              >
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
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-3/4 bg-slate-700">
          <Box sx={{ display: "flex" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="With sx" variant="standard" />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
