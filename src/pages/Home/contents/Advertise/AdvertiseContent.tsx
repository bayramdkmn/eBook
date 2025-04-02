import { Input } from "@mui/joy";
import { Button } from "@mui/material";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const AdvertiseContent = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation("common") as { t: (key: string) => string };

  return (
    <div
      className={`flex flex-col h-full w-full transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-4 flex-grow px-4 py-6 items-center justify-center">
        <div
          className={`border-2 w-3/5 h-4/6 flex items-center justify-center rounded-xl shadow-md ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <div
            className={`flex flex-col justify-center items-center h-full w-full rounded-xl shadow-md transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex h-full flex-col w-4/5 items-center justify-center">
              <textarea
                className={`${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-300"
                    : "bg-white border-gray-300 text-black focus:ring-blue-500"
                } w-3/4 mb-10 h-12 rounded-xl p-3`}
                placeholder={t("advertise.emailPlaceholder")}
              />
              <textarea
                className={`w-3/4 h-2/5 p-3 mb-10 border rounded-md resize-none focus:outline-none focus:ring-2 placeholder:text-gray-400 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-300"
                    : "bg-white border-gray-300 text-black focus:ring-blue-500"
                }`}
                placeholder={t("advertise.messagePlaceholder")}
              />
              <div className="w-full md:w-3/4 flex justify-end">
                <Button className="w-24" variant="contained" color="primary">
                  {t("advertise.send")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseContent;
