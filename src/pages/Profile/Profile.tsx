import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const FaUserCircleIcon = FaUserCircle as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

const Profile = () => {
  const { darkMode } = useTheme();

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Ali Veli",
    phone: "0555 123 4567",
    address: "İstanbul, Türkiye",
    gender: "Erkek",
    email: "ali.veli@example.com",
    password: "123456",
    profilePicture: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    alert("Profil güncellendi!");
  };

  return (
    <div
      className={`w-full px-16 py-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto p-8 shadow-lg rounded-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <h1 className="text-3xl font-bold mb-8">Profilim</h1>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Profil Resmi */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profil"
                className="w-40 h-40 object-cover rounded-full border"
              />
            ) : (
              <FaUserCircleIcon className="w-40 h-40 text-gray-400" />
            )}
          </div>

          {/* Bilgiler */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="col-span-2 flex justify-end">
              {!editMode && (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Düzenle
                </button>
              )}
            </div>

            {/* Ad Soyad */}
            <div>
              <label className="block text-sm font-medium mb-1">Ad Soyad</label>
              {editMode ? (
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              ) : (
                <p className="mt-1">{profile.fullName}</p>
              )}
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-sm font-medium mb-1">Telefon</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              ) : (
                <p className="mt-1">{profile.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              ) : (
                <p className="mt-1">{profile.email}</p>
              )}
            </div>

            {/* Cinsiyet */}
            <div>
              <label className="block text-sm font-medium mb-1">Cinsiyet</label>
              {editMode ? (
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option value="Erkek">Erkek</option>
                  <option value="Kadın">Kadın</option>
                  <option value="Diğer">Diğer</option>
                </select>
              ) : (
                <p className="mt-1">{profile.gender}</p>
              )}
            </div>

            {/* Adres */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Adres</label>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              ) : (
                <p className="mt-1">{profile.address}</p>
              )}
            </div>

            {/* Şifre */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Şifre</label>
              {editMode ? (
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              ) : (
                <p className="mt-1">********</p>
              )}
            </div>

            {/* Butonlar */}
            {editMode && (
              <div className="col-span-2 flex space-x-4 justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                >
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                >
                  Vazgeç
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
