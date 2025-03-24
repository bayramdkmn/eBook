import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import EventListContent from "./pages/Home/contents/EventList/EventListContent";
import DiscoverContent from "./pages/Home/contents/Discover/DiscoverContent";
import SwapContent from "./pages/Home/contents/SwapList/SwapContent";
import ReadingBooksContent from "./pages/Home/contents/ReadingBooks/ReadingBooksContent";
import WishListContent from "./pages/Home/contents/WishList/WishListContent";
import PopularBooksContent from "./pages/Home/contents/PopularBooks/PopularBooksContent";
import AdvertiseContent from "./pages/Home/contents/Advertise/AdvertiseContent";
import ReportProblemContent from "./pages/Home/contents/Report/ReportProblemContent";
import SuggestionContent from "./pages/Home/contents/Suggest/SuggestionContent";
import {
  MdOutlineBugReport,
  MdOutlineNightlight,
  MdPostAdd,
} from "react-icons/md";
import { BiBookAdd, BiBookReader, BiCommentDetail } from "react-icons/bi";
import { RiAdvertisementLine, RiCompassDiscoverLine } from "react-icons/ri";
import { TbBooks } from "react-icons/tb";
import { IoMdSwap } from "react-icons/io";
import { GrMapLocation } from "react-icons/gr";
import { LoadScript } from "@react-google-maps/api";
import AddPost from "./pages/Home/contents/AddPost/AddPost";
import AboutUs from "./pages/AboutUs/AboutUs";
import ChatScreen from "./pages/Chat/ChatScreen";
import { Badge } from "@mui/base/Badge";
import { MenuItem, Typography } from "@mui/material";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu, MenuButton } from "@mui/base";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isUserJoin, setIsUserJoin] = useState<boolean>(true);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let timer: NodeJS.Timeout;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
  const normalizedPath = location.pathname.replace(/\/$/, "").toLowerCase();
  const hideNavAndMenu = ["/signin", "/signup", "/resetpassword"].includes(normalizedPath);


  const handleMouseEnter = () => {
    clearTimeout(timer);
    setShowAccountMenu(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setShowAccountMenu(false);
    }, 150);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDRHhcR_1wef7UhABZGnuuzvA7sGvqq82M">
      <div className="flex flex-1 flex-col">
        {!hideNavAndMenu && (
          <div
            className={`${darkMode ? "bg-black text-white " : "bg-white text-black"
              } flex flex-row w-full h-16 justify-between items-center font-bold fixed z-50 top-0  `}
          >
            <span className="ml-10 h-full flex justify-center items-center text-2xl">
              E-Kitap<span>.com</span>
            </span>
            <Link
              className="hover:text-2xl transition-all duration-200"
              to={"/"}
            >
              Anasayfa
            </Link>

            <Link
              className="hover:text-2xl transition-all duration-200"
              to={"/aboutUs"}
            >
              Hakkımızda
            </Link>

            {isUserJoin ? (
              <div className="flex flex-row ">
                <div className="relative flex items-center w-80">
                  <Link
                    className="ml-6 hover:text-2xl transition-all duration-200"
                    to="/chat"
                  >
                    Mesajlar
                  </Link>
                  {/* <div className="flex bg-blue-600 rounded-xl w-6 h-6 items-center justify-center">
                    3
                  </div> */}
                  <Badge color="primary">
                    <Typography sx={{ fontSize: "xl" }}>s</Typography>
                  </Badge>
                </div>

                <div
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    className="hover:text-2xl transition-all duration-200 mr-24"
                    to="#"
                  >
                    <Dropdown>
                      <MenuButton>Hesabım</MenuButton>
                      <Menu className="fixed z-20">
                        <MenuItem onClick={createHandleMenuClick("Profile")}>
                          Profile
                        </MenuItem>
                        <MenuItem
                          onClick={createHandleMenuClick("Language settings")}
                        >
                          Language settings
                        </MenuItem>
                        <MenuItem onClick={createHandleMenuClick("Log out")}>
                          Log out
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  </Link>
                  {/* {showAccountMenu && (
                    <div
                      className={`${
                        darkMode
                          ? "bg-black text-white opacity-100"
                          : "bg-white text-black opacity-100"
                      } z-50 absolute right-0 mt-2 w-60 border border-gray-300 rounded-lg shadow-lg`}
                    >
                      <Link
                        to="/account-info"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <FaUser className="mr-2" />
                        Profil
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <FaShoppingCart className="mr-2" />
                        İşlemlerim
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <FaCog className="mr-2" />
                        Ayarlar
                      </Link>
                      <Link
                        to="/logout"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <CgLogOut className="mr-2" />
                        Çıkış Yap
                      </Link>
                    </div>
                  )} */}
                </div>
              </div>
            ) : (
              <Link
                className="hover:text-2xl transition-all duration-200 mr-10"
                to={"/signIn"}
              >
                Giriş Yap / Kaydol
              </Link>
            )}
          </div>
        )}
        <div className="flex flex-row ">
          {!hideNavAndMenu && (
            <div className="flex flex-row w-72 fixed z-50 h-full top-16 ">
              <div
                className={`${darkMode ? "bg-black text-white " : "bg-white text-black"
                  } max-h-screen w-1/6 flex flex-1 flex-col `}
              >
                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    } cursor-pointer w-full h-24 flex items-center hover:text-2xl transition-all duration-200 p-2`}
                  onClick={handleOpen}
                >
                  <MdPostAdd className="ml-10 text-3xl" />
                  <span className="ml-7">Gönderi Ekle</span>
                </div>
                <AddPost open={open} onClose={handleClose} />

                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    } cursor-pointer w-full h-24 flex items-center hover:text-2xl transition-all duration-200 p-2`}
                  onClick={() => handleMenuClick("/eventMap")}
                >
                  <GrMapLocation className="ml-10 text-2xl" />
                  <span className="ml-7">Etkinlik Haritası</span>
                </div>
                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    } cursor-pointer w-full h-24 flex items-center hover:text-2xl transition-all duration-200 p-2`}
                  onClick={() => handleMenuClick("/")}
                >
                  <RiCompassDiscoverLine className="ml-10 text-2xl" />
                  <span className="ml-7">Keşfet</span>
                </div>
                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    } cursor-pointer w-full h-24 flex items-center hover:text-2xl transition-all duration-200 p-2`}
                  onClick={() => handleMenuClick("/swap")}
                >
                  <IoMdSwap className="ml-10 text-2xl" />
                  <span className="ml-7">Takas İlanları</span>
                </div>
                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    } cursor-pointer w-full h-24 flex items-center hover:text-2xl transition-all duration-200 p-2`}
                  onClick={() => handleMenuClick("/readingBooks")}
                >
                  <BiBookReader className="ml-10 text-2xl" />
                  <span className="ml-7">Okuduğum Kitaplar</span>
                </div>
                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    } cursor-pointer w-full h-24 flex items-center hover:text-2xl transition-all duration-200 p-2`}
                  onClick={() => handleMenuClick("/wishList")}
                >
                  <BiBookAdd className="ml-10 text-2xl" />
                  <span className="ml-7">İstek Listem</span>
                </div>
                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    } cursor-pointer w-full h-24 flex items-center hover:text-2xl transition-all duration-200 p-2`}
                  onClick={() => handleMenuClick("/popularBooks")}
                >
                  <TbBooks className="ml-10 text-2xl" />
                  <span className="ml-7">Popüler Kitaplar</span>
                </div>
                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    } cursor-pointer w-full h-24 flex items-center hover:text-2xl transition-all duration-200 p-2`}
                  onClick={() => handleMenuClick("/advertise")}
                >
                  <RiAdvertisementLine className="ml-10 text-2xl" />
                  <span className="ml-7">Reklam Ver</span>
                </div>
                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    } cursor-pointer w-full h-24 flex items-center hover:text-2xl transition-all duration-200 p-2`}
                  onClick={() => handleMenuClick("/reportProblem")}
                >
                  <MdOutlineBugReport className="ml-10 text-2xl" />
                  <span className="ml-7">Sorun Bildir</span>
                </div>
                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    } cursor-pointer w-full h-24 flex items-center hover:text-2xl transition-all duration-200 p-2`}
                  onClick={() => handleMenuClick("/suggest")}
                >
                  <BiCommentDetail className="ml-10 text-2xl" />
                  <span className="ml-7">Öneri / Şikayet</span>
                </div>
                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    } cursor-pointer w-full h-24 flex items-center hover:text-2xl transition-all duration-200 p-2`}
                  onClick={toggleDarkMode}
                >
                  <MdOutlineNightlight
                    className="ml-10 text-2xl"
                    style={{ color: darkMode ? "white" : "black" }}
                  />
                  <span className="ml-7">Gece Modu</span>
                </div>
                <div
                  className={`${darkMode
                    ? "bg-black text-white "
                    : "bg-slate-200 text-black"
                    }  w-full h-24 flex`}
                ></div>
              </div>
            </div>
          )}
          <div className="flex flex-1 w-full ml-72 mt-16 h-full">
            <Routes>
              <Route path="/" element={<DiscoverContent />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/eventMap" element={<EventListContent />} />
              <Route path="/swap" element={<SwapContent />} />
              <Route path="/readingBooks" element={<ReadingBooksContent />} />
              <Route path="/wishList" element={<WishListContent />} />
              <Route path="/popularBooks" element={<PopularBooksContent />} />
              <Route path="/advertise" element={<AdvertiseContent />} />
              <Route path="/reportProblem" element={<ReportProblemContent />} />
              <Route path="/suggest" element={<SuggestionContent />} />
              <Route path="/chat" element={<ChatScreen />} />
            </Routes>
          </div>
        </div>
      </div>
    </LoadScript>
  );
}

export default App;
