import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { darkMode } = useTheme();
  const { t, i18n } = useTranslation("common") as {
    t: (key: string) => string;
    i18n: any;
  };
  const [isUserJoin, setIsUserJoin] = useState(true);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();
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

  const pathTitleMap: Record<string, string> = {
    "/": t("navbar.explore"),
    "/eventMap": t("navbar.eventMap"),
    "/readingBooks": t("navbar.readingBooks"),
    "/wishList": t("navbar.wishList"),
    "/popularBooks": t("navbar.popularBooks"),
    "/advertise": t("navbar.advertise"),
    "/reportProblem": t("navbar.reportProblem"),
    "/suggest": t("navbar.suggest"),
  };

  const pageTitle = pathTitleMap[location.pathname] || t("navbar.default");

  return (
    <div
      className={`w-full h-16 flex items-center justify-between px-6 shadow transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex-1">{/* İsteğe bağlı logo */}</div>

      {/* Orta bölüm: Sayfa başlığı */}
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-semibold">{pageTitle}</h1>
      </div>

      <div className="flex-1 flex justify-end mr-4 items-center">
        {isUserJoin ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="cursor-pointer text-xl font-medium hover:text-2xl transition-all duration-200 ease-in-out">
              {t("navbar.account")}
            </span>

            {showAccountMenu && (
              <div
                className={`absolute right-0 top-12  w-56 border rounded-lg shadow-lg z-50 text-xl ${
                  darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                }`}
              >
                <div
                  onClick={() => {
                    navigate("/profile");
                    setShowAccountMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  {t("navbar.profile")}
                </div>
                <div
                  onClick={() => {
                    setShowAccountMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  {t("navbar.logout")}
                </div>

                <div className="border-t border-gray-300 my-2"></div>

                {/* Dil Seçici */}
                <div className="px-4 py-2">
                  <p className="mb-2 text-lg ">{t("navbar.language")}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => i18n.changeLanguage("tr")}
                      className={`px-2 py-1 text-base rounded ${
                        i18n.language === "tr"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      TR
                    </button>
                    <button
                      onClick={() => i18n.changeLanguage("en")}
                      className={`px-2 py-1 text-base rounded ${
                        i18n.language === "en"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <span className="cursor-pointer text-lg font-medium">
            {t("navbar.login")}
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
