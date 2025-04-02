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
import { sendSuggestion } from "./SuggestionAPI";

const SuggestionContent = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation() as {
    t: (key: string) => string;
  };

  const [selected, setSelected] = useState<"öneri" | "şikayet">("öneri");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  async function handleSendSuggest() {
    if (email && message) {
      if (selected == "öneri") {
        await sendSuggestion(email, message, "Suggestion");
      } else {
        await sendSuggestion(email, message, "Complaint");
      }
      setOpenSnackbar(true);
      setEmail("");
      setMessage("");
    } else if (!email && message) {
      alert(t("suggest.emailRequired"));
    } else if (email && !message) {
      alert(t("suggest.descriptionRequired"));
    } else {
      alert(t("suggest.allFieldsRequired"));
    }
  }

  return (
    <div
      className={`flex flex-col h-full items-center justify-center w-full p-6 select-none transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-[#f4f6f8] text-black"
      }`}
    >
      <div
        className={`rounded-2xl shadow-lg p-8 max-w-5xl mx-auto w-full transition-colors duration-300 ${
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

        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-full max-w-[700px]">
            <TextField
              fullWidth
              label={t("suggest.email")}
              variant="outlined"
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
          </div>

          <div className="w-full max-w-[700px]">
            <TextField
              fullWidth
              label={
                selected === "öneri"
                  ? t("suggest.suggestionLabel")
                  : t("suggest.complaintLabel")
              }
              placeholder={t("suggest.placeholder")}
              multiline
              rows={6}
              variant="outlined"
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
          </div>

          <div className="w-full max-w-[700px] flex justify-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendSuggest}
            >
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
