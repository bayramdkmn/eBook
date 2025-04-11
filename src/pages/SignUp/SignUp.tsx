// SignUpStepper.tsx
import React, { useState } from "react";
import {
  Button,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  LinearProgress,
  Typography,
  Link,
  Snackbar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { MuiTelInput } from "mui-tel-input";
import { AnimatePresence, motion } from "framer-motion";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { createUser } from "../../services/authService";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useUserContext } from "../../context/UserContext";

const SignUpStepper = () => {
  const { t } = useTranslation("common") as {
    t: (key: string, options?: any) => string;
  };
  const [step, setStep] = useState(1);
  const { handleLogin } = useUserContext();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    password2: "",
    phone: "",
    address: "",
    gender: "male",
  });
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();

  const isStepOneValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.surname.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    );
  };

  const handleNext = () => {
    if (step === 1 && !isStepOneValid()) return;
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (step < 3) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    const missingFields = [];
    if (!formData.username) missingFields.push(t("signup.username"));
    if (!formData.password || !formData.password2)
      missingFields.push(t("signup.password"));
    if (formData.password !== formData.password2) {
      setErrorMessage(t("signup.passwordMismatch"));
      setErrorOpen(true);
      return;
    }
    if (!formData.phone) missingFields.push(t("signup.phone"));
    if (!formData.address) missingFields.push(t("signup.address"));

    if (missingFields.length > 0) {
      setErrorMessage(
        `${t("signup.missingFields")}: ${missingFields.join(", ")}`
      );
      setErrorOpen(true);
      return;
    }

    try {
      await createUser(formData);
      await handleLogin(formData.email, formData.password); // ⬅ Giriş işlemi
      setSuccessOpen(true);
      setTimeout(() => navigate("/"), 1000); // ⬅ Giriş sonrası ana sayfaya yönlen
    } catch (error) {
      setErrorMessage(t("signup.error"));
      setErrorOpen(true);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center">
      <LanguageSwitcher isLoginPage={true} />
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-2xl p-10 m-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {t("signup.title", { step })}
        </h2>
        <LinearProgress
          variant="determinate"
          value={progress}
          className="mb-6"
        />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="space-y-4"
            >
              <Input
                fullWidth
                placeholder={t("signup.name")}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onKeyDown={handleKeyDown}
                endAdornment={
                  <InputAdornment position="end">
                    {formData.name ? (
                      <CheckCircleIcon style={{ color: "green" }} />
                    ) : (
                      <CancelIcon style={{ color: "red" }} />
                    )}
                  </InputAdornment>
                }
              />
              <Input
                fullWidth
                placeholder={t("signup.surname")}
                value={formData.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
                onKeyDown={handleKeyDown}
                endAdornment={
                  <InputAdornment position="end">
                    {formData.surname ? (
                      <CheckCircleIcon style={{ color: "green" }} />
                    ) : (
                      <CancelIcon style={{ color: "red" }} />
                    )}
                  </InputAdornment>
                }
              />
              <Input
                fullWidth
                placeholder={t("signup.email")}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onKeyDown={handleKeyDown}
                endAdornment={
                  <InputAdornment position="end">
                    {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? (
                      <CheckCircleIcon style={{ color: "green" }} />
                    ) : (
                      <CancelIcon style={{ color: "red" }} />
                    )}
                  </InputAdornment>
                }
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="space-y-4"
            >
              <Input
                fullWidth
                placeholder={t("signup.username")}
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                onKeyDown={handleKeyDown}
                endAdornment={
                  <InputAdornment position="end">
                    {formData.username ? (
                      <CheckCircleIcon style={{ color: "green" }} />
                    ) : (
                      <CancelIcon style={{ color: "red" }} />
                    )}
                  </InputAdornment>
                }
              />
              <Input
                fullWidth
                placeholder={t("signup.password")}
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onKeyDown={handleKeyDown}
                endAdornment={
                  <InputAdornment position="end">
                    {formData.password.length >= 4 ? (
                      <CheckCircleIcon style={{ color: "green" }} />
                    ) : (
                      <CancelIcon style={{ color: "red" }} />
                    )}
                  </InputAdornment>
                }
              />
              <Input
                fullWidth
                placeholder={t("signup.repeatPassword")}
                type="password"
                value={formData.password2}
                onChange={(e) => handleChange("password2", e.target.value)}
                onKeyDown={handleKeyDown}
                endAdornment={
                  <InputAdornment position="end">
                    {formData.password2 === formData.password &&
                    formData.password2 ? (
                      <CheckCircleIcon style={{ color: "green" }} />
                    ) : (
                      <CancelIcon style={{ color: "red" }} />
                    )}
                  </InputAdornment>
                }
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="space-y-4"
            >
              <MuiTelInput
                fullWidth
                defaultCountry="TR"
                value={formData.phone}
                onChange={(val) => handleChange("phone", val)}
              />
              <Input
                fullWidth
                placeholder={t("signup.address")}
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <FormControl>
                <FormLabel className="text-gray-700">
                  {t("signup.gender")}
                </FormLabel>
                <RadioGroup
                  row
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label={t("signup.male")}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label={t("signup.female")}
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label={t("signup.other")}
                  />
                </RadioGroup>
              </FormControl>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button variant="outlined" disabled={step === 1} onClick={handleBack}>
            {t("signup.back")}
          </Button>
          {step < 3 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={step === 1 && !isStepOneValid()}
            >
              {t("signup.next")}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleSubmit}>
              {t("signup.submit")}
            </Button>
          )}
        </div>

        <div className="mt-6 text-center">
          <Typography variant="body1">
            {t("signup.haveAccount")}{" "}
            <Link component={RouterLink} to="/signIn" underline="hover">
              {t("signup.login")}
            </Link>
          </Typography>
        </div>

        <Snackbar
          open={errorOpen}
          autoHideDuration={3000}
          onClose={() => setErrorOpen(false)}
          message={errorMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          ContentProps={{ sx: { backgroundColor: "#d32f2f", color: "white" } }}
          action={<ErrorOutlineIcon sx={{ mr: 1 }} />}
        />

        <Snackbar
          open={successOpen}
          autoHideDuration={1000}
          onClose={() => setSuccessOpen(false)}
          message={t("signup.success")}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          ContentProps={{ sx: { backgroundColor: "#2e7d32", color: "white" } }}
          action={<CheckCircleOutlineIcon sx={{ mr: 1 }} />}
        />
      </div>
    </div>
  );
};

export default SignUpStepper;
