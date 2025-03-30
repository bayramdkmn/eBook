import { Input, Button } from "@mui/material";
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
    <div
      className="flex flex-col h-full w-full bg-gray-100"
      style={{ height: "calc(87vh - 64px)" }}
    >
      {/* HEADER */}
      <div className="h-16 bg-slate-500 flex items-center justify-center px-4 shadow-md">
        <span className="text-xl font-bold text-white font-serif">
          SORUN BİLDİR
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-grow px-4 py-6 items-center justify-center">
        <div className="border-2 w-4/5 h-3/4 flex items-center justify-center rounded-xl border-indigo-500">
          <div className="flex flex-col justify-center items-center h-full w-full bg-white rounded-xl shadow-md">
            <div className="flex flex-col h-full w-4/5 items-center justify-center">
              {/* EMAIL */}
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-3/4 mb-8 h-12 border border-indigo-300 px-4 rounded-md bg-white"
                placeholder="Lütfen Mail Adresinizi Giriniz"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-3/4 h-2/5 resize-none bg-slate-100 border border-indigo-300 rounded-md p-4 text-sm"
                placeholder="Lütfen yaşadığınız problemi detaylı bir şekilde yazınız."
              ></textarea>

              <div className="flex mt-6">
                <Button variant="contained" onClick={sendButton}>
                  Gönder
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportProblemContent;
