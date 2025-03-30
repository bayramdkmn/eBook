import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import EventListContent from "../pages/Home/contents/EventList/EventListContent";
import DiscoverContent from "../pages/Home/contents/Discover/DiscoverContent";
import SwapContent from "../pages/Home/contents/SwapList/SwapContent";
import ReadingBooksContent from "../pages/Home/contents/ReadingBooks/ReadingBooksContent";
import WishListContent from "../pages/Home/contents/WishList/WishListContent";
import PopularBooksContent from "../pages/Home/contents/PopularBooks/PopularBooksContent";
import AdvertiseContent from "../pages/Home/contents/Advertise/AdvertiseContent";
import ReportProblemContent from "../pages/Home/contents/Report/ReportProblemContent";
import SuggestionContent from "../pages/Home/contents/Suggest/SuggestionContent";
import ChatScreen from "../pages/Chat/ChatScreen";
import AboutUs from "../pages/AboutUs/AboutUs";

const AppRoutes = () => {
  return (
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
  );
};

export default AppRoutes;
