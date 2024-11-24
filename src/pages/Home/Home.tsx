import React, { useState } from "react";
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
  const [selectedContent, setSelectedContent] = useState<string>("home");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div className={`${darkMode ? "bg-black " : "bg-gray-400"}`}>
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
