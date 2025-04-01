import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, Circle, InfoWindow } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/tr";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Button from "@mui/material/Button";
import "./customs.css";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

dayjs.locale("tr");

const generateTimeSlots = () => {
  const slots = [];
  let startTime = dayjs().set("hour", 8).set("minute", 0);
  const endTime = dayjs().set("hour", 20).set("minute", 0);
  while (startTime.isBefore(endTime)) {
    slots.push(startTime);
    startTime = startTime.add(20, "minute");
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const defaultCenter = {
  lat: 41.0574,
  lng: 28.9871,
};

const libraryData = [
  {
    id: 1,
    name: "Kütüphane A",
    lat: 41.058,
    lng: 28.988,
    books: ["Kitap A", "Kitap B"],
  },
  {
    id: 2,
    name: "Kütüphane B",
    lat: 41.059,
    lng: 28.99,
    books: ["Kitap A", "Kitap C"],
  },
  {
    id: 3,
    name: "Kütüphane C",
    lat: 41.06,
    lng: 28.991,
    books: ["Kitap A", "Kitap D"],
  },
  {
    id: 4,
    name: "Kütüphane D",
    lat: 41.057,
    lng: 28.986,
    books: ["Kitap E", "Kitap F"],
  },
];

const EventListContent = () => {
  const { t } = useTranslation() as {
    t: (key: string, options?: Record<string, any>) => string;
  };
  const { darkMode } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [currentPosition, setCurrentPosition] =
    useState<google.maps.LatLng | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLng | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [bookName, setBookName] = useState<string>("");
  const [availableLibraries, setAvailableLibraries] = useState<string[]>([]);
  const [bookFound, setBookFound] = useState<boolean>(true);
  const [filteredBooks, setFilteredBooks] = useState<string[]>([]);
  const [libraryMarkers, setLibraryMarkers] = useState<any[]>([]);
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const location = useLocation();

  const getUserLocation = (retryCount = 0) => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition(new google.maps.LatLng(latitude, longitude));
      },
      () => {
        if (retryCount < 5) {
          setTimeout(() => getUserLocation(retryCount + 1), 4000);
        } else {
          alert(t("eventList.locationError"));
        }
      },
      { timeout: 10000, enableHighAccuracy: true, maximumAge: 0 }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const getAddress = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  };

  const searchBook = (book: string) => {
    setHasSearched(true);
    let found = false;
    let markers: any[] = [];
    let libraryNames: string[] = [];

    libraryData.forEach((library) => {
      if (library.books.includes(book)) {
        found = true;
        const location = new google.maps.LatLng(library.lat, library.lng);
        markers.push({ id: library.id, location, name: library.name });
        libraryNames.push(library.name);
        setSelectedLocation(location);
        getAddress(library.lat, library.lng);
      }
    });

    if (found) {
      setLibraryMarkers(markers);
      setAvailableLibraries(libraryNames);
      setBookFound(true);
    } else {
      setLibraryMarkers([]);
      setAvailableLibraries([]);
      setBookFound(false);
    }
  };

  const handleBookClick = (book: string) => {
    setBookName(book);
    searchBook(book);
  };

  const handleLibraryClick = (
    libraryName: string,
    lat: number,
    lng: number
  ) => {
    const location = new google.maps.LatLng(lat, lng);
    setSelectedLocation(location);
    getAddress(lat, lng);
    setSelectedMarker({ name: libraryName, location });
    if (mapRef) {
      mapRef.panTo(location);
      mapRef.setZoom(15);
    }
  };

  const handleSubmit = () => {
    setShowFirstForm(false);
  };

  useEffect(() => {
    if (bookName.trim() !== "") {
      const suggestions = libraryData
        .flatMap((library) => library.books)
        .filter((book) => book.toLowerCase().includes(bookName.toLowerCase()));
      setFilteredBooks(Array.from(new Set(suggestions)));
    } else {
      setFilteredBooks([]);
    }
  }, [bookName]);

  const resetState = () => {
    setShowFirstForm(true);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookName("");
    setAvailableLibraries([]);
    setFilteredBooks([]);
    setHasSearched(false);
    setLibraryMarkers([]);
    setSelectedLocation(null);
    setSelectedMarker(null);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <GoogleMap
        key={location.pathname}
        onLoad={(map) => setMapRef(map)}
        mapContainerStyle={{ width: "100%", height: "500px" }}
        center={currentPosition || defaultCenter}
        zoom={12}
      >
        {currentPosition && (
          <>
            <Circle
              center={currentPosition}
              radius={50}
              options={{
                fillColor: "#4285F4",
                fillOpacity: 0.3,
                strokeColor: "#4285F4",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
            <Marker
              position={currentPosition}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 6,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "#FFFFFF",
                strokeWeight: 2,
              }}
            />
          </>
        )}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.location}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.name}</h3>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.location.lat()},${selectedMarker.location.lng()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {t("eventList.getDirections")}
              </a>
            </div>
          </InfoWindow>
        )}
        {libraryMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.location}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
      </GoogleMap>

      <div
        className={`m-5 rounded-xl p-6 shadow transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-slate-100 text-black"
        }`}
      >
        {showFirstForm ? (
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } w-full md:w-2/3 p-4 rounded-xl shadow`}
            >
              <h2 className="text-xl font-bold mb-4 text-center py-2 rounded">
                {t("eventList.searchBook")}
              </h2>
              <Input
                className={`w-full mb-4 border rounded px-3 py-2 shadow-sm ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
                type="text"
                placeholder={t("eventList.enterBookName")}
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />

              <List className="overflow-y-auto max-h-60 border-t">
                {filteredBooks.map((book, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => handleBookClick(book)}
                      className={`transition ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-red-100"
                      }`}
                    >
                      <ListItemText primary={book} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>

            {hasSearched && !bookFound ? (
              <div
                className={`flex flex-col w-full md:w-1/3 border-2 border-red-400 rounded-xl p-4 shadow justify-center text-center ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <p className="text-red-500 font-medium">
                  {t("eventList.bookNotFound")}
                </p>
              </div>
            ) : (
              bookFound &&
              availableLibraries.length > 0 && (
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } flex flex-col w-full md:w-1/3 border-2 border-red-400 rounded-xl p-4 shadow`}
                >
                  <h2 className="text-xl font-semibold mb-4 text-center">
                    {t("eventList.foundLibraries")}
                  </h2>
                  <div className="flex flex-col gap-3 overflow-y-auto max-h-60">
                    {availableLibraries.map((lib, index) => {
                      const data = libraryData.find((l) => l.name === lib);
                      return (
                        <div
                          key={index}
                          className={`cursor-pointer border rounded-lg p-3 text-center transition shadow ${
                            darkMode
                              ? "bg-gray-800 text-white hover:bg-gray-700"
                              : "bg-white hover:bg-red-50"
                          }`}
                          onClick={() =>
                            handleLibraryClick(
                              lib,
                              data?.lat || 0,
                              data?.lng || 0
                            )
                          }
                        >
                          🏛️ {lib}
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 text-white"
                    disabled={!bookFound || availableLibraries.length === 0}
                  >
                    {t("eventList.proceed")}
                  </Button>
                </div>
              )
            )}
          </div>
        ) : (
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } w-full border-2 border-red-400 rounded-xl p-6 shadow`}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
              >
                <Grid item className="w-full text-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded">
                    {t("eventList.appointmentScreenTitle")}
                  </h2>
                </Grid>

                <Grid item>
                  <h3 className="text-lg font-semibold text-center mt-4">
                    {t("eventList.selectDate")}
                  </h3>
                  <DatePicker
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    disablePast
                  />
                </Grid>

                {selectedDate && (
                  <Grid item className="w-full mt-4">
                    <h3 className="text-lg font-semibold text-center mb-2">
                      {t("eventList.selectTime")}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          className={`text-black py-2 px-4 rounded-lg shadow ${
                            selectedTime && selectedTime.isSame(slot)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100"
                          } hover:scale-105 transition`}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot.format("HH:mm")}
                        </button>
                      ))}
                    </div>
                  </Grid>
                )}
              </Grid>
            </LocalizationProvider>

            <div className="mt-6">
              <button
                onClick={() => {
                  if (selectedDate && selectedTime) {
                    alert(
                      t("eventList.appointmentConfirmed", {
                        date: selectedDate.format("DD-MM-YYYY"),
                        time: selectedTime.format("HH:mm"),
                      })
                    );
                    resetState();
                  } else {
                    alert(t("eventList.selectDateTimeWarning"));
                  }
                }}
                className={`w-full mt-4 py-3 rounded-lg font-semibold ${
                  darkMode ? "text-black" : "text-white"
                } shadow transition ${
                  selectedDate && selectedTime
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!selectedDate || !selectedTime}
              >
                {t("eventList.confirmAppointment")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventListContent;
