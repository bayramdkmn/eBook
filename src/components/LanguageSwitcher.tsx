import { useTranslation } from "react-i18next";
import { Button, Box } from "@mui/material";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button
        variant={i18n.language === "en" ? "contained" : "outlined"}
        onClick={() => changeLanguage("en")}
      >
        English
      </Button>
      <Button
        variant={i18n.language === "tr" ? "contained" : "outlined"}
        onClick={() => changeLanguage("tr")}
      >
        Türkçe
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
