import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const ChatScreen = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation("common") as { t: (key: string) => string };

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Bayram Dikmen",
      content: t("chat.sampleMessage"),
    },
  ]);

  return (
    <div
      className={`flex flex-col h-full w-full transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`h-16 flex justify-center items-center px-4 shadow-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-slate-400 text-black"
        }`}
      >
        <span className="text-xl font-bold">{t("chat.title")}</span>
      </div>

      <div className="flex flex-row w-full">
        <div className="flex flex-col lg:flex-row gap-4 flex-grow px-4 py-6 w-1/4">
          <div
            className={`flex-1 shadow-md rounded-md p-4 overflow-y-auto transition-colors duration-300 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
            style={{ maxHeight: "calc(87vh - 64px)" }}
          >
            {posts.map((post) => (
              <div
                key={post.id}
                className={`mb-6 p-4 rounded-md transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-slate-100 text-black"
                }`}
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
                <div className="mt-2 text-sm">{post.content}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`flex w-3/4 items-center px-4 transition-colors duration-300 ${
            darkMode ? "bg-gray-900 text-white" : "bg-slate-700 text-white"
          }`}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <AccountCircle
              sx={{
                color: darkMode ? "#ffffff88" : "action.active",
                mr: 1,
                my: 0.5,
              }}
            />
            <TextField
              id="input-with-sx"
              label={t("chat.inputPlaceholder")}
              variant="standard"
              fullWidth
              InputLabelProps={{
                style: {
                  color: darkMode ? "#ccc" : "#000",
                },
              }}
              InputProps={{
                style: {
                  color: darkMode ? "#fff" : "#000",
                },
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
