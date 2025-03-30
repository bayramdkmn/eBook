import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconBaseProps } from "react-icons";
import AddPost from "../pages/Home/contents/AddPost/AddPost";
import {
  MdOutlineBugReport,
  MdOutlineNightlight,
  MdPostAdd,
} from "react-icons/md";
import { BiBookAdd, BiBookReader, BiCommentDetail } from "react-icons/bi";
import { RiAdvertisementLine, RiCompassDiscoverLine } from "react-icons/ri";
import { TbBooks } from "react-icons/tb";
import { GrMapLocation } from "react-icons/gr";

const IconRenderer = (Icon: any) => (props: IconBaseProps) =>
  React.createElement(Icon, props);

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const menuItems = [
    {
      label: "Etkinlik Haritası",
      path: "/eventMap",
      Icon: IconRenderer(GrMapLocation),
    },
    { label: "Keşfet", path: "/", Icon: IconRenderer(RiCompassDiscoverLine) },
    {
      label: "Okuduğum Kitaplar",
      path: "/readingBooks",
      Icon: IconRenderer(BiBookReader),
    },
    { label: "İstek Listem", path: "/wishList", Icon: IconRenderer(BiBookAdd) },
    {
      label: "Popüler Kitaplar",
      path: "/popularBooks",
      Icon: IconRenderer(TbBooks),
    },
    {
      label: "Reklam Ver",
      path: "/advertise",
      Icon: IconRenderer(RiAdvertisementLine),
    },
    {
      label: "Sorun Bildir",
      path: "/reportProblem",
      Icon: IconRenderer(MdOutlineBugReport),
    },
    {
      label: "Öneri / Şikayet",
      path: "/suggest",
      Icon: IconRenderer(BiCommentDetail),
    },
  ];

  const PostIcon = IconRenderer(MdPostAdd);
  const NightModeIcon = IconRenderer(MdOutlineNightlight);

  return (
    <div
      className={`group relative h-screen border-r transition-all duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } w-[4.5rem] hover:w-72`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center text-2xl h-20 font-bold whitespace-nowrap overflow-hidden transition-all duration-300 group-hover:justify-start px-6">
        <span className="hidden group-hover:inline">
          E-Kitap<span>.com</span>
        </span>
      </div>

      {/* Gönderi Ekle */}
      <div
        className="cursor-pointer h-20 flex items-center hover:text-xl transition-all duration-200 px-6"
        onClick={() => setOpen(true)}
      >
        <span className="text-2xl">
          <PostIcon size={22} />
        </span>
        <span className="ml-6 hidden group-hover:inline">Gönderi Ekle</span>
      </div>

      <AddPost open={open} onClose={() => setOpen(false)} />

      {/* Menü Listesi */}
      {menuItems.map(({ label, path, Icon }) => (
        <div
          key={path}
          className="cursor-pointer h-16 flex items-center hover:text-xl transition-all duration-200 px-6"
          onClick={() => handleMenuClick(path)}
        >
          <span className="text-2xl">
            <Icon size={22} />
          </span>
          <span className="ml-6 hidden group-hover:inline">{label}</span>
        </div>
      ))}

      {/* Gece Modu */}
      <div
        className="cursor-pointer h-16 flex items-center hover:text-xl transition-all duration-200 px-6 absolute bottom-6 w-full"
        onClick={toggleDarkMode}
      >
        <span className="text-2xl">
          <NightModeIcon size={22} color={darkMode ? "white" : "black"} />
        </span>
        <span className="ml-6 hidden group-hover:inline">Gece Modu</span>
      </div>
    </div>
  );
};

export default Sidebar;
