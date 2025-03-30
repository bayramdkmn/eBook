import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import EventListContent from "./contents/EventList/EventListContent";
import DiscoverContent from "./contents/Discover/DiscoverContent";
import SwapContent from "./contents/SwapList/SwapContent";
import ReadingBooksContent from "./contents/ReadingBooks/ReadingBooksContent";
import WishListContent from "./contents/WishList/WishListContent";
import PopularBooksContent from "./contents/PopularBooks/PopularBooksContent";
import AdvertiseContent from "./contents/Advertise/AdvertiseContent";
import ReportProblemContent from "./contents/Report/ReportProblemContent";
import SuggestionContent from "./contents/Suggest/SuggestionContent";

const Home = () => {
  const { darkMode } = useTheme();
  const [selectedContent, setSelectedContent] = useState<string>("home");

  return (
    <div
      className={`transition-colors duration-300 min-h-screen ${
        darkMode ? "bg-black text-white" : "bg-gray-400 text-black"
      }`}
    >
      <div className="flex flex-row">
        {selectedContent === "eventList" && <EventListContent />}
        {selectedContent === "discoverContent" && <DiscoverContent />}
        {selectedContent === "swapContent" && <SwapContent />}
        {selectedContent === "readingBooksContent" && <ReadingBooksContent />}
        {selectedContent === "wishContent" && <WishListContent />}
        {selectedContent === "popularBooksContent" && <PopularBooksContent />}
        {selectedContent === "advertiseContent" && <AdvertiseContent />}
        {selectedContent === "reportProblemContent" && <ReportProblemContent />}
        {selectedContent === "suggestContent" && <SuggestionContent />}
      </div>
    </div>
  );
};

export default Home;
