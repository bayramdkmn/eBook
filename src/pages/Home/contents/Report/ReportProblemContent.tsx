import { Button, Input } from "@mui/material";
import React, { useState } from "react";

const ReportProblemContent = () => {
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const sendButton = () => {
    if (email && description) {
      alert("Başarılı");
      setEmail("");
      setDescription("");
    } else if (!email && description) {
      alert("email boş bırakılamaz!");
    } else if (email && !description) {
      alert("desc boş bırakma");
    } else {
      alert("yuh aq");
    }
  };

  return (
    <div className="flex bg-slate-300 w-full h-936 items-center justify-center">
      <div className="bg-indigo-400 h-3/4 w-3/4 rounded-xl flex flex-col items-center">
        <span className="mt-6 w-full h-10 text-2xl bg-slate-500 text-white font-serif flex justify-center">
          SORUN BİLDİR
        </span>
        <div className="flex flex-col h-4/6 w-full items-center mt-24">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-2/6 border-2 border-white mb-5 px-10 rounded-xl h-12 "
            placeholder="Lütfen Mail Adresinizi Giriniz"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-2/3 h-2/3 resize-none bg-slate-300 rounded-xl p-2"
            placeholder="Lütfen Yaşadığınız Problemi Anlatınız"
          ></textarea>
        </div>
        <div>
          <Button onClick={sendButton} variant="contained">
            Gönder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportProblemContent;
