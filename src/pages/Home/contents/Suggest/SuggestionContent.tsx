import { Button, Checkbox, FormControlLabel, Input } from "@mui/material";
import React, { useState } from "react";

const SuggestionContent = () => {
  const [selected, setSelected] = useState<"öneri" | "şikayet">("öneri");

  const handleChange = (type: "öneri" | "şikayet") => {
    if (selected === type) {
      return;
    }
    setSelected(type);
  };

  const getPlaceholder = () => {
    if (selected === "öneri") {
      return "Lütfen önerinizi yazınız. Size en kısa sürede dönüş sağlayacağız.";
    } else if (selected === "şikayet") {
      return "Lütfen şikayetinizi yazınız. Size en kısa sürede dönüş sağlayacağız.";
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      <div className="h-16 bg-slate-400 flex items-center justify-center px-4 shadow-md ">
        <span className="text-xl font-bold flex justify-center">
          ÖNERİ / ŞİKAYET
        </span>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 flex-grow px-4 py-6">
        <div className="border-2 w-full h-full rounded-xl border-green-400">
          <div className="flex w-full items-center justify-center mt-10">
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected === "öneri"}
                  onChange={() => handleChange("öneri")}
                />
              }
              label="Öneri"
            />
            <FormControlLabel
              required
              control={
                <Checkbox
                  checked={selected === "şikayet"}
                  onChange={() => handleChange("şikayet")}
                />
              }
              label="Şikayet"
            />
          </div>
          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "calc(60vh - 64px)" }}
          >
            <div className="flex h-full flex-col w-5/6 items-center justify-center">
              <Input
                className="w-1/2 mb-10 h-12"
                placeholder="Lütfen e-mail adresinizi giriniz."
              />
              <Input className="w-1/2 h-2/5" placeholder={getPlaceholder()} />
              <div className="flex w-650 justify-end mt-4">
                <Button className="w-24" variant="contained">
                  GÖNDER
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionContent;
