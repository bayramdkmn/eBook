import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAPI } from "../../context/APIContext";
import { UserProfile } from "../../types/User.type";
import { useUserContext } from "../../context/UserContext";

const FaUserCircleIcon = FaUserCircle as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

const Profile = () => {
  const { darkMode } = useTheme();
  const { logout } = useUserContext();
  const { t } = useTranslation() as { t: (key: string) => string };
  const { getUserById, updateUserProfile, updatePassword } = useAPI();

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const userId = localStorage.getItem("requesterId") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserById(userId);
        setProfile(user);
      } catch (error) {
        console.error("Kullanıcı verisi alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getUserById, userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!profile) return;
    setProfile((prev) => ({ ...prev!, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      await updateUserProfile(profile.id, profile);
      setEditMode(false);
      alert(t("profile.profileUpdated"));
    } catch (error) {
      console.error("Profil güncellenemedi:", error);
      alert(t("profile.profileUpdateError"));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Lütfen tüm alanları doldurun.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Yeni şifre en az 6 karakter olmalı.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Yeni şifre ve onay şifresi uyuşmuyor.");
      return;
    }

    try {
      await updatePassword(profile!.id, currentPassword, newPassword);
      setPasswordSuccess("Şifre başarıyla güncellendi.");
      setTimeout(() => {
        logout();
        window.location.href = "/signin";
      }, 1500);
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Bir hata oluştu.";
      setPasswordError(msg);
    }
  };

  if (loading || !profile) {
    return <div className="p-10">{t("loading")}...</div>;
  }

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
        <h1 className="text-3xl font-bold mb-8">{t("profile.title")}</h1>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={t("profile.profileAlt")}
                className="w-40 h-40 object-cover rounded-full border"
              />
            ) : (
              <FaUserCircleIcon className="w-40 h-40 text-gray-400" />
            )}
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 flex justify-end">
              {!editMode && (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  {t("profile.edit")}
                </button>
              )}
            </div>

            {editMode ? (
              <form
                onSubmit={handleSubmit}
                className="contents" // özel trick: form içeriği stil bozmasın diye
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("profile.fullName")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name || ""}
                    onChange={handleChange}
                    placeholder="Ad"
                    className={`w-full px-4 py-2 rounded border mt-1 ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                  <input
                    type="text"
                    name="surname"
                    value={profile.surname || ""}
                    onChange={handleChange}
                    placeholder="Soyad"
                    className={`w-full px-4 py-2 rounded border mt-2 ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("profile.phone")}
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded border ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("profile.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded border ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("profile.gender")}
                  </label>
                  <select
                    name="gender"
                    value={profile.gender || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded border ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option value="Erkek">
                      {t("profile.genderOptions.male")}
                    </option>
                    <option value="Kadın">
                      {t("profile.genderOptions.female")}
                    </option>
                    <option value="Diğer">
                      {t("profile.genderOptions.other")}
                    </option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    {t("profile.address")}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded border ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>

                <div className="col-span-2 flex space-x-4 justify-end">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                  >
                    {t("profile.save")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                  >
                    {t("profile.cancel")}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("profile.fullName")}
                  </label>
                  <p className="mt-1">
                    {profile.name} {profile.surname}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("profile.phone")}
                  </label>
                  <p className="mt-1">{profile.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("profile.email")}
                  </label>
                  <p className="mt-1">{profile.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("profile.gender")}
                  </label>
                  <p className="mt-1">{profile.gender}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    {t("profile.address")}
                  </label>
                  <p className="mt-1">{profile.address}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Şifre Güncelleme Formu: dışarı taşındı */}
        {editMode && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Şifre Güncelle</h3>
            <form
              onSubmit={handlePasswordSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Yeni Şifre (Tekrar)
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-2 rounded border ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
                >
                  Şifreyi Güncelle
                </button>
              </div>

              {passwordError && (
                <div className="md:col-span-2 text-red-500">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="md:col-span-2 text-green-500">
                  {passwordSuccess}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
