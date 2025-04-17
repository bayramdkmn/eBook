import React, { useEffect, useState } from "react";
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
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const IconRenderer = (Icon: any) => (props: IconBaseProps) =>
  React.createElement(Icon, props);

const Sidebar = ({
  onHoverChange,
}: {
  onHoverChange?: (isHovering: boolean) => void;
}) => {
  const [isUserJoin, setIsUserJoin] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation("common") as { t: (key: string) => string };

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsUserJoin(false);
    }
  }, []);

  const menuItems = [
    {
      label: t("sidebar.eventMap"),
      path: "/eventMap",
      Icon: IconRenderer(GrMapLocation),
      protected: true, // sadece giriş yapan kullanıcılar görebilecek
    },
    {
      label: t("sidebar.explore"),
      path: "/",
      Icon: IconRenderer(RiCompassDiscoverLine),
      protected: true,
    },
    {
      label: t("sidebar.readingBooks"),
      path: "/readingBooks",
      Icon: IconRenderer(BiBookReader),
      protected: true,
    },
    {
      label: t("sidebar.wishList"),
      path: "/wishList",
      Icon: IconRenderer(BiBookAdd),
      protected: true,
    },
    {
      label: t("sidebar.popularBooks"),
      path: "/popularBooks",
      Icon: IconRenderer(TbBooks),
      protected: false,
    },
    {
      label: t("sidebar.advertise"),
      path: "/advertise",
      Icon: IconRenderer(RiAdvertisementLine),
      protected: false,
    },
    {
      label: t("sidebar.reportProblem"),
      path: "/reportProblem",
      Icon: IconRenderer(MdOutlineBugReport),
      protected: false,
    },
    {
      label: t("sidebar.suggest"),
      path: "/suggest",
      Icon: IconRenderer(BiCommentDetail),
      protected: false,
    },
  ];

  const PostIcon = IconRenderer(MdPostAdd);
  const NightModeIcon = IconRenderer(MdOutlineNightlight);

  return (
    <div
      className={`group fixed h-screen border-r transition-all duration-300 select-none z-50 ${
        darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
      } w-[4.5rem] hover:w-72`}
      onMouseEnter={() => {
        onHoverChange?.(true);
      }}
      onMouseLeave={() => {
        onHoverChange?.(false);
      }}
    >
      <div className="flex items-center justify-center text-2xl h-20 font-bold whitespace-nowrap overflow-hidden transition-all duration-300 group-hover:justify-start px-6">
        <span className="hidden group-hover:inline">
          E-Kitap<span>.com</span>
        </span>
      </div>

      {isUserJoin && (
        <div
          className="cursor-pointer h-20 flex items-center hover:text-xl transition-all duration-200 px-6"
          onClick={() => setOpen(true)}
        >
          <span className="text-2xl">
            <PostIcon size={22} />
          </span>
          <span className="ml-6 hidden group-hover:inline">
            {t("sidebar.addPost")}
          </span>
        </div>
      )}
      <AddPost open={open} onClose={() => setOpen(false)} />
      {menuItems
        .filter((item) => isUserJoin || !item.protected)
        .map(({ label, path, Icon }) => (
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

      <div
        className="cursor-pointer h-16 flex items-center hover:text-xl transition-all duration-200 px-6 absolute bottom-6 w-full"
        onClick={toggleDarkMode}
      >
        <span className="text-2xl">
          <NightModeIcon size={22} color={darkMode ? "white" : "black"} />
        </span>
        <span className="ml-6 hidden group-hover:inline">
          {t("sidebar.darkMode")}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
