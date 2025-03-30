// ResetPassword.tsx
import { Input } from "@mui/joy";
import { Button, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { sendMail, checkCode, resetPassword } from "./ResetPasswordAPI";

const ResetPassword = () => {
  const [mail, setMail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"mail" | "code" | "password">("mail");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  async function handleSubmit() {
    if (step === "mail") {
      try {
        await sendMail(mail);
        setStep("code");
      } catch (err) {
        setToastMessage("Mail gönderilemedi.");
        setToastType("error");
        setToastOpen(true);
      }
    } else if (step === "code") {
      try {
        await checkCode(mail, code);
        setStep("password");
      } catch (err) {
        setToastMessage("Kod doğrulanamadı.");
        setToastType("error");
        setToastOpen(true);
      }
    } else if (step === "password") {
      if (password !== confirmPassword) {
        setToastMessage("Şifreler eşleşmiyor!");
        setToastType("error");
        setToastOpen(true);
        return;
      }
      try {
        await resetPassword({ email: mail, newPassword: password });
        setToastMessage("Şifreniz başarıyla güncellendi!");
        setToastType("success");
        setToastOpen(true);
        setStep("mail");
        setMail("");
        setCode("");
        setPassword("");
        setConfirmPassword("");
      } catch (err) {
        setToastMessage("Şifre güncellenemedi.");
        setToastType("error");
        setToastOpen(true);
      }
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1740&q=60')] bg-cover bg-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md px-10 py-12 m-6 flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Parola Sıfırlama Ekranı
        </h2>

        <Input
          className="w-full"
          placeholder="E-mail adresinizi girin"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={step !== "mail"}
        />

        {step === "code" && (
          <Input
            className="w-full"
            placeholder="Doğrulama kodunu girin"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        )}

        {step === "password" && (
          <>
            <Input
              type="password"
              className="w-full"
              placeholder="Yeni şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Input
              type="password"
              className="w-full"
              placeholder="Yeni şifre (tekrar)"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </>
        )}

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          {step === "mail"
            ? "Mail Yolla"
            : step === "code"
            ? "Kodu Kontrol Et"
            : "Şifreyi Güncelle"}
        </Button>

        <Snackbar
          open={toastOpen}
          autoHideDuration={3000}
          onClose={() => setToastOpen(false)}
          message={toastMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          ContentProps={{
            sx: {
              backgroundColor: toastType === "success" ? "#2e7d32" : "#d32f2f",
              color: "white",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
