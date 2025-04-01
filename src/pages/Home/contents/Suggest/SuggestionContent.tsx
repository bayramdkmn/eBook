import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const SuggestionContent = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation() as {
    t: (key: string) => string;
  };

  const [selected, setSelected] = useState<"öneri" | "şikayet">("öneri");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = () => {
    if (!email || !message) {
      alert(t("suggest.fillAllFields"));
      return;
    }

    setOpenSnackbar(true);
    setEmail("");
    setMessage("");
  };

  return (
    <div
      className={`flex flex-col h-full items-center justify-center w-full p-6 select-none transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-[#f4f6f8] text-black"
      }`}
    >
      <div
        className={`rounded-2xl shadow-lg p-8 max-w-5xl mx-auto w-full h-3/5 transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex justify-center mb-6">
          <ToggleButtonGroup
            value={selected}
            exclusive
            onChange={(_, value) => value && setSelected(value)}
            color="primary"
          >
            <ToggleButton value="öneri">{t("suggest.suggestion")}</ToggleButton>
            <ToggleButton value="şikayet">
              {t("suggest.complaint")}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className="flex flex-col items-center gap-6">
          <TextField
            label={t("suggest.email")}
            variant="outlined"
            className="w-full md:w-2/3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: {
                color: darkMode ? "white" : "inherit",
              },
            }}
            InputLabelProps={{
              style: {
                color: darkMode ? "#ccc" : "inherit",
              },
            }}
          />
          <TextField
            label={
              selected === "öneri"
                ? t("suggest.suggestionLabel")
                : t("suggest.complaintLabel")
            }
            placeholder={t("suggest.placeholder")}
            multiline
            rows={6}
            variant="outlined"
            className="w-full md:w-2/3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
              style: {
                color: darkMode ? "white" : "inherit",
              },
            }}
            InputLabelProps={{
              style: {
                color: darkMode ? "#ccc" : "inherit",
              },
            }}
          />
          <div className="w-full md:w-2/3 flex justify-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {t("suggest.send")}
            </Button>
          </div>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          {selected === "öneri"
            ? t("suggest.successSuggestion")
            : t("suggest.successComplaint")}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SuggestionContent;
