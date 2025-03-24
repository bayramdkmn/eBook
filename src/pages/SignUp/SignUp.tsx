import React, { useState } from "react";
import Input from "@mui/material/Input";
import { MuiTelInput } from "mui-tel-input";
import "./custom.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { createUser } from "./SignUpAPI";
import Snackbar from "@mui/joy/Snackbar";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InputAdornment from "@mui/material/InputAdornment";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showToastError, setShowToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [toastSuccessMessage, setToastSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePhone = (newValue: string) => {
    setPhone(newValue);
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
    console.log(gender);
  };

  async function handleSignUp() {
    const missingFields: string[] = [];

    if (!name) missingFields.push("İsim");
    if (!surname) missingFields.push("Soyisim");
    if (!email) missingFields.push("E-mail");
    if (!username) missingFields.push("Kullanıcı Adı");
    if (!address) missingFields.push("Adres Bilgisi");
    if (!phone) missingFields.push("Telefon");
    if (!gender) missingFields.push("Cinsiyet");
    if (!password) missingFields.push("Şifre");

    if (missingFields.length > 0) {
      setToastMessage(
        `Lütfen kırmızı ile işaretli alanları doldurun: ${missingFields.join(
          ", "
        )}`
      );
      setShowToastError(true);
    } else if (password !== password2) {
      setToastMessage("Şifreler eşleşmiyor");
      setShowToastError(true);
    } else {
      const data = {
        name,
        surname,
        email,
        gender,
        phone,
        username,
        address,
        password,
      };
      try {
        await createUser(data);
        setToastSuccessMessage(
          "Kayıt başarılı, giriş sayfasına yönlendiriliyorsunuz"
        );
        setShowToastSuccess(true);
        setTimeout(() => {
          navigate("/signIn");
        }, 2500);
      } catch (error) {
        setToastMessage("Kayıt işlemi sırasında bir hata oluştu");
        setShowToastError(true);
      }
    }
  }

  return (
    <div className="flex flex-1 fixed top-0 left-0 w-screen justify-center items-center h-screen flex-col bg-slate-600">
      <Snackbar
        autoHideDuration={2000}
        open={showToastError}
        color="danger"
        size="lg"
        variant="solid"
        startDecorator={<ErrorOutlineIcon />}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setShowToastError(false);
        }}
      >
        {toastMessage}
      </Snackbar>

      <Snackbar
        autoHideDuration={2000}
        open={showToastSuccess}
        color="success"
        size="lg"
        variant="solid"
        startDecorator={<CheckCircleIcon />}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setShowToastSuccess(false);
        }}
      >
        {toastSuccessMessage}
      </Snackbar>

      <div className="custom-scrollbar flex h-[90%] sm:h-10/12 md:h-8/12 lg:h-6/12 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex-col bg-slate-400 items-center gap-4 rounded-xl p-5 overflow-y-auto">
        <span className="p-7 font-bold text-xl">Kayıt Ol</span>
        <Input
          className="w-5/12"
          placeholder="İsim"
          value={name}
          onChange={(val) => setName(val.target.value)}
          endAdornment={
            <InputAdornment position="end">
              {name === "" ? (
                <CancelIcon style={{ color: "red" }} />
              ) : (
                <CheckCircleIcon style={{ color: "green" }} />
              )}
            </InputAdornment>
          }
        />
        <Input
          className="w-5/12"
          placeholder="Soyisim"
          value={surname}
          onChange={(val) => setSurname(val.target.value)}
          endAdornment={
            <InputAdornment position="end">
              {surname === "" ? (
                <CancelIcon style={{ color: "red" }} />
              ) : (
                <CheckCircleIcon style={{ color: "green" }} />
              )}
            </InputAdornment>
          }
        />
        <Input
          className="w-5/12"
          placeholder="E-mail"
          value={email}
          onChange={(val) => setEmail(val.target.value)}
          endAdornment={
            <InputAdornment position="end">
              {email === "" || !isEmailValid(email) ? (
                <CancelIcon style={{ color: "red" }} />
              ) : (
                <CheckCircleIcon style={{ color: "green" }} />
              )}
            </InputAdornment>
          }
        />
        <Input
          className="w-5/12"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(val) => setUsername(val.target.value)}
          endAdornment={
            <InputAdornment position="end">
              {username === "" ? (
                <CancelIcon style={{ color: "red" }} />
              ) : (
                <CheckCircleIcon style={{ color: "green" }} />
              )}
            </InputAdornment>
          }
        />
        <Input
          className="w-5/12"
          placeholder="Adres Bilgisi"
          value={address}
          onChange={(val) => setAddress(val.target.value)}
          endAdornment={
            <InputAdornment position="end">
              {address === "" ? (
                <CancelIcon style={{ color: "red" }} />
              ) : (
                <CheckCircleIcon style={{ color: "green" }} />
              )}
            </InputAdornment>
          }
        />
        <Input
          className="w-5/12"
          placeholder="Şifre"
          type="password"
          value={password}
          onChange={(val) => setPassword(val.target.value)}
          endAdornment={
            <InputAdornment position="end">
              {password.length < 4 ? (
                <CancelIcon style={{ color: "red" }} />
              ) : (
                <CheckCircleIcon style={{ color: "green" }} />
              )}
            </InputAdornment>
          }
        />
        <Input
          className="w-5/12"
          placeholder="Şifre Tekrar"
          type="password"
          value={password2}
          onChange={(val) => setPassword2(val.target.value)}
          endAdornment={
            <InputAdornment position="end">
              {password2.length < 4 ? (
                <CancelIcon style={{ color: "red" }} />
              ) : (
                <CheckCircleIcon style={{ color: "green" }} />
              )}
            </InputAdornment>
          }
        />
        <MuiTelInput
          className="w-5/12 bg-white rounded-xl"
          value={phone}
          onChange={handleChangePhone}
          defaultCountry="TR"
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            <span className="font-bold text-lg justify-center flex ">
              Cinsiyet
            </span>
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="male"
            name="radio-buttons-group"
            value={gender}
            onChange={handleChangeGender}
          >
            <FormControlLabel value="male" control={<Radio />} label="Erkek" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Kadın"
            />
            <FormControlLabel value="other" control={<Radio />} label="Diğer" />
          </RadioGroup>
        </FormControl>

        <div className="w-full flex justify-center items-center mt-4">
          <Button
            variant="contained"
            onClick={handleSignUp}
            className="flex bg-blue-400 justify-center p-3 w-3/12 rounded-lg"
          >
            Kayıt Ol
          </Button>
        </div>
        <div className="w-full flex justify-center mt-5">
          <Link to={"/signIn"} component={RouterLink}>
            <span className="text-black text-xl font-bold">
              Zaten bir hesabınız var mı? Giriş yapın.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
