// ResetPassword.tsx
import { Input } from "@mui/joy";
import { Button, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { sendMail, checkCode, resetPassword } from "./ResetPasswordAPI";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const ResetPassword = () => {
  const { t } = useTranslation() as { t: (key: string) => string };

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
        setToastMessage(t("resetPassword.mailError"));
        setToastType("error");
        setToastOpen(true);
      }
    } else if (step === "code") {
      try {
        await checkCode(mail, code);
        setStep("password");
      } catch (err) {
        setToastMessage(t("resetPassword.codeError"));
        setToastType("error");
        setToastOpen(true);
      }
    } else if (step === "password") {
      if (password !== confirmPassword) {
        setToastMessage(t("resetPassword.passwordMismatch"));
        setToastType("error");
        setToastOpen(true);
        return;
      }
      try {
        await resetPassword({ email: mail, newPassword: password });
        setToastMessage(t("resetPassword.passwordUpdated"));
        setToastType("success");
        setToastOpen(true);
        setStep("mail");
        setMail("");
        setCode("");
        setPassword("");
        setConfirmPassword("");
      } catch (err) {
        setToastMessage(t("resetPassword.passwordUpdateError"));
        setToastType("error");
        setToastOpen(true);
      }
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1740&q=60')] bg-cover bg-center">
      <LanguageSwitcher isLoginPage={true} />

      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md px-10 py-12 m-6 flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {t("resetPassword.title")}
        </h2>

        <Input
          className="w-full"
          placeholder={t("resetPassword.emailPlaceholder")}
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={step !== "mail"}
        />

        {step === "code" && (
          <Input
            className="w-full"
            placeholder={t("resetPassword.codePlaceholder")}
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
              placeholder={t("resetPassword.newPasswordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Input
              type="password"
              className="w-full"
              placeholder={t("resetPassword.confirmPasswordPlaceholder")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </>
        )}

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          {step === "mail"
            ? t("resetPassword.sendMail")
            : step === "code"
            ? t("resetPassword.verifyCode")
            : t("resetPassword.updatePassword")}
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
