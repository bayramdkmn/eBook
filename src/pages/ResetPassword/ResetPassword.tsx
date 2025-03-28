import { Input } from "@mui/joy";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { sendMail, checkCode, resetPassword } from "./ResetPasswordAPI";

const ResetPassword = () => {
  const [mail, setMail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"mail" | "code" | "password">("mail");

  async function handleSubmit() {
    if (step === "mail") {
      try {
        await sendMail(mail);
        setStep("code");
      } catch (err) {
        console.log(err);
      }
    } else if (step === "code") {
      try {
        await checkCode(mail, code);
        setStep("password");
      } catch (err) {
        console.log(err);
      }
    } else if (step === "password") {
      if (password !== confirmPassword) {
        alert("Şifreler eşleşmiyor!");
        return;
      }
      try {
        await resetPassword(password);
        alert("Şifreniz başarıyla değiştirildi!");
        // İstersen yönlendirme yap veya step'i sıfırla
        setStep("mail");
        setMail("");
        setCode("");
        setPassword("");
        setConfirmPassword("");
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="flex flex-1 fixed top-0 left-0 w-screen justify-center items-center h-screen flex-col bg-slate-600">
      <div className="flex w-1/3 flex-col bg-slate-400 items-center gap-4 rounded-xl p-5 justify-center">
        <span className="font-bold text-xl mb-4">Parola Sıfırlama Ekranı</span>

        <Input
          className="w-3/4 mb-5"
          placeholder="E-mail adresinizi girin"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          disabled={step !== "mail"}
        />

        {step === "code" && (
          <Input
            className="w-3/4 mb-5"
            placeholder="Kodu girin"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        )}

        {step === "password" && (
          <>
            <Input
              type="password"
              className="w-3/4 mb-3"
              placeholder="Yeni şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              className="w-3/4 mb-5"
              placeholder="Yeni şifre (tekrar)"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        <div className="w-3/4 flex justify-end">
          <Button onClick={handleSubmit} variant="contained">
            {step === "mail"
              ? "Mail Yolla"
              : step === "code"
              ? "Kodu Kontrol Et"
              : "Şifreyi Güncelle"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
