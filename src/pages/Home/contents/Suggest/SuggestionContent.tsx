import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";

const SuggestionContent = () => {
  const [selected, setSelected] = useState<"öneri" | "şikayet">("öneri");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = () => {
    if (!email || !message) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    // API vs olsa buraya gelir
    setOpenSnackbar(true);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full items-center justify-center w-full bg-[#f4f6f8] p-6 select-none">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto w-full h-3/5">
        <div className="flex justify-center mb-6">
          <ToggleButtonGroup
            value={selected}
            exclusive
            onChange={(_, value) => value && setSelected(value)}
            color="primary"
          >
            <ToggleButton value="öneri">Öneri</ToggleButton>
            <ToggleButton value="şikayet">Şikayet</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className="flex flex-col items-center gap-6">
          <TextField
            label="E-mail adresiniz"
            variant="outlined"
            className="w-full md:w-2/3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label={
              selected === "öneri" ? "Önerinizi yazın" : "Şikayetinizi yazın"
            }
            placeholder="Size en kısa sürede dönüş sağlayacağız."
            multiline
            rows={6}
            variant="outlined"
            className="w-full md:w-2/3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="w-full md:w-2/3 flex justify-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Gönder
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
            ? "Öneriniz iletildi, teşekkür ederiz!"
            : "Şikayetiniz iletildi, kısa sürede dönüş sağlayacağız."}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SuggestionContent;
