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
import "./customs.css";
import Button from "@mui/material/Button";

dayjs.locale("tr");

// 20 dakikalık aralıklarla zaman dilimlerini oluşturuyoruz
const generateTimeSlots = () => {
  const slots = [];
  let startTime = dayjs().set("hour", 8).set("minute", 0); // Başlangıç saati 08:00
  const endTime = dayjs().set("hour", 20).set("minute", 0); // Bitiş saati 20:00

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
    lat: 41.059,
    lng: 28.99,
    books: ["Kitap A", "Kitap D"],
  },
  {
    id: 4,
    name: "Kütüphane D",
    lat: 41.059,
    lng: 28.99,
    books: ["Kitap E", "Kitap F"],
  },
];

const EventListContent = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [currentPosition, setCurrentPosition] =
    useState<google.maps.LatLng | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLng | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [bookName, setBookName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [availableLibraries, setAvailableLibraries] = useState<string[]>([]);
  const [bookFound, setBookFound] = useState<boolean>(true);
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [filteredBooks, setFilteredBooks] = useState<string[]>([]);
  const [libraryMarkers, setLibraryMarkers] = useState<any[]>([]);
  const [showSecondContent, setShowSecondContent] = useState(false);
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFirstForm, setShowFirstForm] = useState(true);

  const handleSubmit = () => {
    setIsTransitioning(true); // Transition başlat
    setTimeout(() => {
      setShowFirstForm(false);
      setIsTransitioning(false); // Transition bitti
    }, 300); // Geçiş süresi (300ms)
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition(new google.maps.LatLng(latitude, longitude));
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
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

  const searchBook = () => {
    let found = false;
    let markers: any[] = [];
    let libraryNames: string[] = [];

    libraryData.forEach((library) => {
      if (library.books.includes(bookName)) {
        found = true;
        markers.push({
          id: library.id,
          location: new google.maps.LatLng(library.lat, library.lng),
          name: library.name,
        });
        libraryNames.push(library.name);
        setSelectedLocation(new google.maps.LatLng(library.lat, library.lng));
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

  const handleBookClick = (book: string) => {
    setBookName(book);
    setTimeout(() => {
      searchBook();
    }, 0);
  };

  const handleLibraryClick = (
    libraryName: string,
    lat: number,
    lng: number
  ) => {
    const newSelectedLocation = new google.maps.LatLng(lat, lng);
    setSelectedLocation(newSelectedLocation);
    getAddress(lat, lng);
  };

  const handleBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false); // Reset the loading state
      alert(
        `Randevu başarıyla oluşturuldu!\nTarih: ${date}\nKitap: ${bookName}\nKütüphane: ${availableLibraries.join(
          ", "
        )}`
      );
    }, 2000);
  };

  return (
    <div className="flex flex-1 w-full h-full flex-col">
      <div className="fixed top-20 left-0 right-0 z-10">
        <GoogleMap
          key={location.pathname}
          mapContainerStyle={{
            width: "100%",
            height: "500px",
          }}
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

          {selectedLocation && address && (
            <InfoWindow position={selectedLocation}>
              <div>
                <h3>Adres: {address}</h3>
              </div>
            </InfoWindow>
          )}

          {libraryMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.location}
              onClick={() =>
                handleLibraryClick(
                  marker.name,
                  marker.location.lat(),
                  marker.location.lng()
                )
              }
            />
          ))}
        </GoogleMap>
      </div>

      <div className="flex m-5 bg-slate-400 h-450 rounded-xl flex-col mt-[520px]">
        <span className="flex items-center justify-center mt-5 font-bold text-2xl mb-4">
          Kitap Arama Ekranı
        </span>
        <div className="flex flex-row h-full">
          {showFirstForm ? (
            <div className="flex flex-row w-full">
              <div className="flex w-4/6 h-72 rounded-xl pt-5 border-2 items-center ml-14 flex-col mr-5 border-red-500 overflow-y-auto">
                <Input
                  className="w-1/2"
                  type="text"
                  placeholder="Kitap Arayın"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                />
                <List className="overflow-y-scroll max-h-96 w-1/2 scroll-container">
                  {filteredBooks.map((book, index) => (
                    <ListItem key={index}>
                      <ListItemButton onClick={() => handleBookClick(book)}>
                        <ListItemText primary={book} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </div>
              {bookFound ? (
                <div className="flex flex-row w-full h-750 ">
                  <div className="flex flex-col w-3/5 border-2 rounded-xl border-red-500 p-4 h-72">
                    <h2 className="text-xl font-semibold mb-4 flex justify-center border-b-2 w-full pb-2 border-red-500">
                      Bulunan Kütüphaneler
                    </h2>
                    <div className="max-h-64 overflow-y-auto mt-4">
                      <div className="grid grid-cols-1 gap-4">
                        {availableLibraries.map((library, index) => (
                          <div
                            key={index}
                            className="cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out hover:bg-red-100 text-center"
                          >
                            {library}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex  ml-10 w-24  h-16 mt-56">
                    <Button
                      className="h-full w-full"
                      onClick={handleSubmit}
                      variant="contained"
                    >
                      İlerle
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-1/4 border-2 rounded-xl border-red-500 p-4 h-72">
                  <p>Kitap bulunamadı. Lütfen tekrar deneyin.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col w-full  border-2 mx-5 rounded-xl h-350 border-red-500">
              {/* <input
                  className="flex w-1/2"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                >
                  {/* Tarih Seçici */}
                  <Grid
                    item
                    className="flex flex-col justify-center items-center w-full h-24"
                  >
                    <h3 className="text-lg font-semibold text-center mb-2">
                      Randevu Tarihini Seçin:
                    </h3>
                    <DatePicker
                      value={selectedDate}
                      onChange={(newDate) => setSelectedDate(newDate)}
                      disablePast
                    />
                  </Grid>

                  {/* Tarih seçildiyse saat seçeneklerini göster */}
                  {selectedDate && (
                    <Grid item className="w-full mt-6">
                      <h3 className="text-lg font-semibold text-center mb-2">
                        Randevu Saatini Seçin:
                      </h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            className={`py-2 px-4 rounded ${
                              selectedTime && selectedTime.isSame(slot)
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
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
              <div className="flex w-full h-40  items-center justify-center">
                <button
                  onClick={() => {
                    if (selectedDate && selectedTime) {
                      alert(
                        `Randevu Başarıyla Ayarlandı!\nTarih: ${selectedDate.format(
                          "DD-MM-YYYY"
                        )}\nSaat: ${selectedTime.format("HH:mm")}`
                      );
                    } else {
                      alert("Lütfen bir tarih ve saat seçiniz.");
                    }
                  }}
                  className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Randevuyu Onayla
                </button>
                {/* <Button
                    variant="contained"
                    className="flex bg-blue-400 w-1/2 rounded-lg"
                  >
                    Rezervasyon Yap
                  </Button> */}
              </div>
              {/* <button
                  onClick={handleBooking}
                  disabled={isBooking || !date}
                  className="booking-button"
                >
                  {isBooking ? "Rezervasyon Yapılıyor..." : "Rezervasyon Yap"}
                </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventListContent;
