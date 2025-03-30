import React from "react";
import { useTheme } from "../../context/ThemeContext";

const AboutUs = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`flex flex-col h-full w-full transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header */}
      <div
        className={`h-16 flex items-center justify-center px-4 shadow-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-slate-400 text-black"
        }`}
      >
        <span className="text-xl font-bold">ABOUT US</span>
      </div>

      <div
        className="mt-2 flex w-full h-full items-center justify-center"
        style={{ maxHeight: "calc(94vh - 65px)" }}
      >
        <div
          className={`flex w-11/12 h-850 rounded-2xl p-10 flex-col gap-6 text-xl font-sans transition-colors duration-300 ${
            darkMode ? "bg-gray-800 text-white" : "bg-slate-300 text-black"
          }`}
        >
          <span>
            <span className="font-bold">E-Kitap</span>, 1 Eylül 2024'de
            Türkiye'de kurulmuş, kitap odaklı bir sosyal kataloglama ve sosyal
            ağıdır. <span className="font-bold">E-Kitap</span>, bir sonraki
            okuyacağınız kitabı seçmenize yardımcı olur, diğer insanlarla ortak
            okuma alanları sayesinde tanışma fırsatı sunar, ayrıca belirli
            kütüphanelere randevu ve kitap sorgulama hizmeti sunar. Okuma
            zevkinizin benzediği okurları, farklı yazarları keşfetmenizi sağlar.
            Akış sayesinde takip ettiğiniz okurlar, yazarlar ve kitaplar ile
            ilgili son güncellemeleri takip etmenizi sağlar.
          </span>
          <span>
            <span className="font-bold">E-Kitap</span>'ta okurlar okudukları ve
            okumak istedikleri kitapları profillerine işaretlerler. Bunu
            işaretlerken kitabı beğenip beğenmediklerini, 5 üzerinden kaç puan
            verdiğini ve isterse de kitap hakkındaki görüşlerini ekleyebilir. Bu
            sayede her okurun, her kitabın ve her yazarın bir profil sayfası
            oluşur. <span className="font-bold">E-Kitap</span>'ta okurlar
            sosyalleşip, gönderi paylaştıkça kitap ve yazar profilleri daha
            fazla bilgi ile dolar. Bu sayede de o kitap ve yazarları incelemek
            isteyen okurlar için daha fazla bilgi oluşur.
          </span>
          <span>
            <span className="font-bold">E-Kitap</span>'ın ilk sürümü İlk olarak
            Eylül 2024'de kodlanmaya başlanan ve 1 Haziran 2025'de yayına giren{" "}
            <span className="font-bold">E-Kitap</span>'ın şuan için amacı
            yukarıda bahsedildiği gibi kullanıcıları kitap okumaya teşvik etme,
            alınacak kitap hakkında ön bilgi sahibi olma, kitap takası yaparak
            fazladan ücret ödemekten kaçınma gibi birçok alandaki kullanıcı
            dostu olmaktır. Ancak ilerleyen zamanlarda kullanıcıların
            isteklerine göre geliştirmeler sağlanacaktır.
          </span>

          <div
            className={`flex border-2 flex-row rounded-2xl ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            <img
              alt="e-kitap-logo"
              src={"/e-kitap-logo.jpg"}
              className="w-72 h-4/5 object-contain rounded-xl p-4 mt-2"
            />
            <div className="flex flex-col mt-6 mb-20 w-full mr-6 pl-5 font-bold font-sans gap-4">
              <span>Bayram DİKMEN</span>
              <span>bayramdikmenn@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
