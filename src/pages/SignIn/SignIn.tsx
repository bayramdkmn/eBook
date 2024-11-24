import { Input } from "@mui/joy";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { loginUser } from "./SignInAPI";
import { Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");

  async function handleSignIn() {
    try {
      await loginUser(username, password);
      setToastMessage("Giriş başarılı.");
      setToastType("success");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setToastMessage("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      setToastType("error");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      console.log(err);
    }
  }

  return (
    <div className="flex flex-1 justify-center items-center h-screen w-screen flex-col bg-slate-600 fixed top-0 left-0">
      <div className="flex w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex-col bg-slate-400 items-center gap-4 rounded-xl p-5 h-auto justify-center">
        <span className="font-bold w-2/5 h-8 bg-slate-500 items-center justify-center flex rounded-xl mb-5 ">
          GİRİŞ YAP
        </span>

        <Box
          sx={{
            display: "flex",
            width: "50%",
            justifyContent: "center",
          }}
        >
          <TextField
            style={{ width: "100%" }}
            id="input-with-sx"
            label="Kullanıcı adı veya E-mail"
            variant="outlined"
            onChange={(val) => setUsername(val.target.value)}
            value={username}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "50%",
            justifyContent: "center",
          }}
        >
          <TextField
            style={{ width: "100%" }}
            label="Şifre"
            type="password"
            variant="outlined"
            onChange={(val) => setPassword(val.target.value)}
            value={password}
          />
        </Box>
        <Button onClick={handleSignIn} variant="contained">
          Giriş Yap
        </Button>
        <Link
          component={RouterLink}
          className="font-bold text-l mt-3"
          to={"/resetPassword"}
        >
          <span className="text-slate-700 text-xl">
            Şifrenizi mi Unuttunuz?
          </span>
        </Link>

        <Link component={RouterLink} to={"/signUp"}>
          <span className="text-black font-bold text-xl">
            Henüz Hesabınız Yok mu? Hemen Kaydolun.
          </span>
        </Link>
      </div>

      {showToast && (
        <div
          className={`fixed bottom-10 right-10 p-3 rounded-lg shadow-lg ${
            toastType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
          style={{ zIndex: 9999 }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default SignIn;
