import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation("common") as { t: (key: string) => string };

  return (
    <div
      className={`flex flex-col h-full w-full transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`h-16 flex items-center justify-center px-4 shadow-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-slate-400 text-black"
        }`}
      >
        <span className="text-xl font-bold">{t("about.title")}</span>
      </div>

      <div
        className="mt-2 flex w-full h-full items-center justify-center"
        style={{ maxHeight: "calc(94vh - 65px)" }}
      >
        <div
          className={`flex w-11/12 h-850 rounded-2xl p-10 flex-col gap-6 text-xl font-sans transition-colors duration-300 ${
            darkMode ? "bg-gray-800 text-white" : "bg-slate-300 text-black"
          }`}
        >
          <span>{t("about.paragraph1")}</span>
          <span>{t("about.paragraph2")}</span>
          <span>{t("about.paragraph3")}</span>

          <div
            className={`flex border-2 flex-row rounded-2xl ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            <img
              alt="e-kitap-logo"
              src={"/e-kitap-logo.jpg"}
              className="w-72 h-4/5 object-contain rounded-xl p-4 mt-2"
            />
            <div className="flex flex-col mt-6 mb-20 w-full mr-6 pl-5 font-bold font-sans gap-4">
              <span>Bayram DİKMEN</span>
              <span>bayramdikmenn@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
