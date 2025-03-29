import { Input } from "@mui/joy";
import { Button } from "@mui/material";

const AdvertiseContent = () => {
  return (
    <div
      className="flex flex-col h-full w-full bg-gray-100"
      style={{ height: "calc(87vh - 64px)" }}
    >
      <div className="h-16 bg-slate-400 flex items-center justify-center px-4 shadow-md ">
        <span className="text-xl font-bold flex justify-center">ADVERTISE</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 flex-grow px-4 py-6 items-center justify-center">
        <div className="border-2 w-4/5 h-3/4 flex items-center justify-center rounded-xl border-green-400">
          <div
            className="flex flex-col justify-center items-center h-full w-full bg-white rounded-xl shadow-md"
            // style={{ height: "calc(60vh - 64px)" }}
          >
            <div className="flex h-full flex-col w-4/5 items-center justify-center">
              <Input
                className="w-3/4 mb-10 h-12"
                placeholder="Lütfen e-mail adresinizi giriniz."
                // value={}
                // onChange={(val) => setUsername(val.target.value)}
              />
              <Input
                className="w-3/4 h-2/5"
                placeholder="Lütfen teklifinizi yazınız. Size en kısa sürede dönüş sağlayacağız."
                // value={}
                // onChange={(val) => setUsername(val.target.value)}
              />
              <div className="flex mt-4 ">
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

export default AdvertiseContent;
