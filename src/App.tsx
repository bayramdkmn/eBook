import React from "react";
import { useLocation } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./App.css";
import "./i18n";
import { UserProvider } from "./context/UserContext";

const Layout = () => {
  const { darkMode } = useTheme();
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/$/, "").toLowerCase();
  const hideNavAndMenu = ["/signin", "/signup", "/resetpassword"].includes(
    normalizedPath
  );

  if (hideNavAndMenu) {
    return <AppRoutes />;
  }

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDRHhcR_1wef7UhABZGnuuzvA7sGvqq82M">
      <UserProvider>
        <ThemeProvider>
          <Layout />
        </ThemeProvider>
      </UserProvider>
    </LoadScript>
  );
}

export default App;
