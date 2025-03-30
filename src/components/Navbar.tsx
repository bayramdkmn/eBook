import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isUserJoin, setIsUserJoin] = useState(true);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const location = useLocation();
  let timer: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setShowAccountMenu(true);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setShowAccountMenu(false);
    }, 150);
  };

  const createHandleMenuClick = (menuItem: string) => () => {
    console.log(`Clicked on ${menuItem}`);
  };

  // Dinamik başlık eşleştirme
  const pathTitleMap: Record<string, string> = {
    "/": "Keşfet",
    "/eventMap": "Etkinlik Haritası",
    // "/swap": "Takas İlanları",
    "/readingBooks": "Okuduğum Kitaplar",
    "/wishList": "İstek Listem",
    "/popularBooks": "Popüler Kitaplar",
    "/advertise": "Reklam Ver",
    "/reportProblem": "Sorun Bildir",
    "/suggest": "Öneri / Şikayet",
  };

  const pageTitle = pathTitleMap[location.pathname] || "E-Kitap";

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } flex flex-row w-full h-16 font-bold shadow bg-gradient-to-r from-gray-200 via-blue-200 to-gray-300 `}
    >
      <h1 className="w-5/6 text-3xl flex items-center justify-center text-gray-700 font-semibold py-4  ">
        {pageTitle}
      </h1>

      {isUserJoin ? (
        <div
          className="flex justify-center items-center w-1/6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="cursor-pointer hover:text-2xl transition-all duration-200">
            Hesabım
          </span>

          {showAccountMenu && (
            <div
              className={`${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              } absolute right-0 top-14 mt-2 w-60 border border-gray-300 rounded-lg shadow-lg z-50`}
            >
              <div
                onClick={createHandleMenuClick("Profile")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Profil
              </div>
              <div
                onClick={createHandleMenuClick("Language settings")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Dil Ayarları
              </div>
              <div
                onClick={createHandleMenuClick("Log out")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Çıkış Yap
              </div>
            </div>
          )}
        </div>
      ) : (
        <span className="cursor-pointer">Giriş Yap</span>
      )}
    </div>
  );
};

export default Navbar;
