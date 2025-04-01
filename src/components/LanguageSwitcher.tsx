import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "@mui/material";

interface LanguageSwitcherProps {
  isLoginPage?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isLoginPage }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (isLoginPage) {
    return (
      <div className="absolute top-4 right-4 z-50">
        <ButtonGroup size="large" variant="contained">
          <Button
            onClick={() => changeLanguage("tr")}
            variant={i18n.language === "tr" ? "contained" : "outlined"}
            sx={{
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            TR
          </Button>
          <Button
            onClick={() => changeLanguage("en")}
            variant={i18n.language === "en" ? "contained" : "outlined"}
            sx={{
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            EN
          </Button>
        </ButtonGroup>
      </div>
    );
  } else {
    return (
      <div>
        <ButtonGroup size="small" variant="outlined">
          <Button
            onClick={() => changeLanguage("tr")}
            variant={i18n.language === "tr" ? "contained" : "outlined"}
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            TR
          </Button>
          <Button
            onClick={() => changeLanguage("en")}
            variant={i18n.language === "en" ? "contained" : "outlined"}
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            EN
          </Button>
        </ButtonGroup>
      </div>
    );
  }
};

export default LanguageSwitcher;
