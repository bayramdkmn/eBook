import { Input, Button } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { sendProblem } from "./ReportProblemAPI";

const ReportProblemContent = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation() as {
    t: (key: string) => string;
  };

  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  
  async function handleSendProblem() {
    
    if (email && description) {
      await sendProblem(email, description, "Report");
      setEmail("");
      setDescription("");
      alert(t("reportProblem.success"));
    } else if (!email && description) {
      alert(t("reportProblem.emailRequired"));
    } else if (email && !description) {
      alert(t("reportProblem.descriptionRequired"));
    } else {
      alert(t("reportProblem.allFieldsRequired"));
    }
  }

  return (
    <div
      className={`flex flex-col h-full w-full transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-4 flex-grow px-4 py-6 items-center justify-center">
        <div
          className={`border-2 w-3/5 h-4/6 flex items-center justify-center rounded-xl shadow-md transition-colors duration-300 ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <div
            className={`flex flex-col justify-center items-center h-full w-full rounded-xl shadow-md transition-colors duration-300 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex flex-col h-full w-4/5 items-center justify-center">
              <textarea
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-3/4 h-12 mb-8 resize-none rounded-md p-4 text-sm transition-colors duration-300 overflow-hidden ${
                  darkMode
                    ? "bg-gray-700 text-white border border-gray-600"
                    : "bg-white border border-indigo-300 text-black"
                }`}
                placeholder={t("reportProblem.emailPlaceholder")}
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-3/4 h-2/5 resize-none rounded-md p-4 text-sm transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 text-white border border-gray-600"
                    : "bg-white border border-indigo-300 text-black"
                }`}
                placeholder={t("reportProblem.descriptionPlaceholder")}
              />

              <div className="w-full md:w-3/4 mt-4 flex justify-end">
                <Button variant="contained" onClick={handleSendProblem}>
                  {t("reportProblem.send")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportProblemContent;
