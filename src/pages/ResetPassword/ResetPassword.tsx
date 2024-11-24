import { Input } from "@mui/joy";
import { Button } from "@mui/material";
import React from "react";

const ResetPassword = () => {
  return (
    <div className="flex flex-1 fixed top-0 left-0 w-screen justify-center items-center h-screen flex-col bg-slate-600">
      <div className="flex w-1/3 flex-col bg-slate-400 items-center gap-4 rounded-xl p-5 h-2/5 justify-center">
        <span className="font-bold text-xl mb-4 ">Parola Sıfırlama Ekranı</span>
        <Input
          className="w-3/4 mb-5 "
          placeholder="Lütfen E-mail Adresinizi Giriniz"
        />
        <div className=" w-3/4 flex justify-end">
          <Button variant="contained">Parolayı Sıfırla</Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
