import React from "react";
import { useLocation } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/$/, "").toLowerCase();
  const hideNavAndMenu = ["/signin", "/signup", "/resetpassword"].includes(
    normalizedPath
  );

  if (hideNavAndMenu) {
    return (
      <LoadScript googleMapsApiKey="AIzaSyDRHhcR_1wef7UhABZGnuuzvA7sGvqq82M">
        <AppRoutes />
      </LoadScript>
    );
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyDRHhcR_1wef7UhABZGnuuzvA7sGvqq82M">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <AppRoutes />
          </main>
        </div>
      </div>
    </LoadScript>
  );
}

export default App;
