// SignIn.tsx
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Typography,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { loginUser } from "./SignInAPI";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");

  async function handleSignIn() {
    try {
      await loginUser(username, password);
      setToastMessage("Giriş başarılı.");
      setToastType("success");
      setToastOpen(true);
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setToastMessage("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      setToastType("error");
      setToastOpen(true);
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1740&q=60')] bg-cover bg-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md px-10 py-12 m-6 flex flex-col justify-center items-center space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Giriş Yap
        </h2>

        <div className="w-full space-y-4">
          <TextField
            fullWidth
            label="Kullanıcı adı veya E-mail"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
          />

          <TextField
            fullWidth
            label="Şifre"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
          />
        </div>

        <Button
          fullWidth
          onClick={handleSignIn}
          variant="contained"
          className="mt-4"
        >
          Giriş Yap
        </Button>

        <Link
          component={RouterLink}
          to="/resetPassword"
          className="text-blue-600 underline"
        >
          Şifrenizi mi Unuttunuz?
        </Link>

        <Typography variant="body2" className="text-center">
          Henüz hesabınız yok mu?{" "}
          <Link component={RouterLink} to="/signUp" underline="hover">
            Hemen kaydolun
          </Link>
        </Typography>

        <Snackbar
          open={toastOpen}
          autoHideDuration={toastType === "success" ? 1000 : 3000}
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

export default SignIn;
