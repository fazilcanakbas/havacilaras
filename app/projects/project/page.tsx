"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Phone,
  Calendar,
  Star,
  X,
  Mail,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Plane,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ProjectDetailPage() {
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07172e] via-[#0b2a57] to-[#07203a] text-white">
      <Header />

      {/* HERO */}
      <header className="relative h-[72vh] md:h-[78vh]">
        <Image
          src="/hero1.jpg"
          alt="Shellwe Maldives"
          fill
          priority
          className="object-cover brightness-75"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07172e]/90 flex items-center">
          <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20">
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                  Shellwe <span className="text-[#3A7BD5]">by Havacılar</span>
                </h1>
                <p className="mt-4 text-slate-100 max-w-xl text-lg md:text-xl">
                  Maldivler — Angolitheemu Adası.{" "}
                  <strong>Yatırım & Lüks yaşam</strong> birleşimi.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 bg-[#3A7BD5] hover:bg-[#2f66b8] text-white px-5 py-3 rounded-full font-medium shadow-lg"
                  >
                    Teklif Al <ArrowRight size={16} />
                  </a>
                  <a
                    href="#gallery"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-full text-white"
                  >
                    Galeri Gör
                  </a>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                <div className="h-64 md:h-72 lg:h-80 w-full">
                  <Image
                    src="/Resim2.png"
                    alt="Shellwe render"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-gradient-to-t from-[#07172e]/60 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-300">Proje Tipi</div>
                      <div className="font-semibold">5⭐ Resort / Konut</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-300">Fiyat</div>
                      <div className="font-semibold text-[#3A7BD5]">
                        250k - 455k USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-10 -mt-24 pb-20">
        {/* Overview card */}
        <section className="bg-white/5 backdrop-blur rounded-2xl p-6 md:p-8 shadow-xl border border-white/6">
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Proje Özeti
              </h2>
              <p className="mt-2 text-slate-200 max-w-2xl">
                Shellwe by Havacılar; sürdürülebilir, izole konumda premium
                konutlar sunan; yatırımcı hakları devlet güvencesi ile korunmuş
                bir Maldivler projesidir. 49+50 yıl kullanım hakkı, yıllık
                yönetim ve kiralama opsiyonları ile yatırımcıya güçlü fırsatlar
                sağlar.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Badge text="Devlet Güvencesi" />
                <Badge text="Schengen & Commonwealth Vize Avantajı" />
                <Badge text="Golden Wings - İşletme Garantisi" />
                <Badge text="Yıllık 1 Hafta Ücretsiz Tatil (2 kişi)" />
              </div>
            </div>

            <div className="mt-6 md:mt-0 grid grid-cols-2 gap-4 w-full md:w-[420px]">
              <QuickStat label="Toplam Ünite" value="76" />
              <QuickStat label="Eşyalı Teslim" value="24 Ay" />
              <QuickStat label="Başlangıç Fiyat" value="250.000 USD" />
              <QuickStat label="Amortisman" value="~11.1 Yıl" />
            </div>
          </div>
        </section>

        {/* Models */}
        <section className="mt-10">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
            Konut Modelleri
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <ModelCard
              title="Iglo Modeli — 1+1"
              size="Net 63.8 m² • Brüt 108 m²"
              price="250.000 - 275.000 USD"
              img="/model-iglo.jpg"
              onClick={() =>
                setSelectedModel({
                  title: "Iglo Modeli — 1+1",
                  desc: "Modern tasarımlı, 1+1 iglo villa. Eşyalı teslim.",
                  price: "250.000 - 275.000 USD",
                  images: ["/model-iglo.jpg", "/gallery-2.jpg"],
                })
              }
            />
            <ModelCard
              title="Karides Modeli — 1+1"
              size="Net 69.6 m² • Brüt 122 m²"
              price="299.000 USD"
              img="/model-karides.jpg"
              onClick={() =>
                setSelectedModel({
                  title: "Karides Modeli — 1+1",
                  desc: "Deniz kabuğu formunda 1+1 villa. Premium yaşam.",
                  price: "299.000 USD",
                  images: ["/model-karides.jpg", "/gallery-3.jpg"],
                })
              }
            />
            <ModelCard
              title="Silindir Modeli — 3+1"
              size="Net 105.6 m² • Brüt 182 m²"
              price="455.000 USD"
              img="/model-silindir.jpg"
              onClick={() =>
                setSelectedModel({
                  title: "Silindir Modeli — 3+1",
                  desc: "Aileler için geniş 3+1 villa. Panoramik manzara.",
                  price: "455.000 USD",
                  images: ["/model-silindir.jpg", "/gallery-4.jpg"],
                })
              }
            />
          </div>
        </section>

        {/* Modal */}
        {selectedModel && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
            <div className="bg-[#0b2a57] max-w-5xl w-full rounded-2xl p-6 relative grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setSelectedModel(null)}
                className="absolute top-4 right-4 text-white hover:text-red-400"
              >
                <X size={24} />
              </button>

              {/* Slider */}
              <div className="relative">
                <Image
                  src={selectedModel.images[slideIndex]}
                  alt="detail"
                  width={600}
                  height={450}
                  className="rounded-lg object-cover w-full h-80"
                />
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
                  onClick={() =>
                    setSlideIndex(
                      (slideIndex - 1 + selectedModel.images.length) %
                        selectedModel.images.length
                    )
                  }
                >
                  <ChevronLeft />
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
                  onClick={() =>
                    setSlideIndex((slideIndex + 1) % selectedModel.images.length)
                  }
                >
                  <ChevronRight />
                </button>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                <h4 className="text-2xl font-bold mb-3">
                  {selectedModel.title}
                </h4>
                <p className="text-slate-200 mb-4">{selectedModel.desc}</p>
                <div className="text-lg font-semibold text-[#3A7BD5] mb-6">
                  {selectedModel.price}
                </div>
                <div className="flex gap-3">
                  <button className="px-5 py-3 bg-[#3A7BD5] hover:bg-[#2f66b8] rounded-full">
                    Teklif Al
                  </button>
                  <button className="px-5 py-3 bg-white/10 hover:bg-white/20 rounded-full">
                    Daha Fazla Bilgi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experiences */}
        <section className="mt-12">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">
            Sadece Bir Tatil Değil, Bir Deneyim
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <HeroStrip
              title="Su Sporları & Aktiviteler"
              subtitle="Scuba, surf, tekne gezintileri ve zengin aktivite seçenekleri."
              img="https://turkey.meridianadventuredive.com/wp-content/uploads/2020/10/meridian-adventure-dive-turkey-activities-2.jpg"
            />
            <HeroStrip
              title="Spa & Wellness"
              subtitle="Doğayla baş başa wellness alanları ve kişiye özel programlar."
              img="https://www.regnumhotels.com/media/v54bwnw3/regnumcarya_greendoor-spa-wellness-5-card.jpg"
            />
            <HeroStrip
              title="Gurme Restoranlar"
              subtitle="Dünya mutfağı, deniz ürünleri ve fine dining deneyimi."
              img="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/92/38/ae/jie-istanbul-atasehir.jpg?w=900&h=500&s=1"
            />
            <HeroStrip
              title="Özel Plaj & Lounge"
              subtitle="İzole plaj alanları, VIP servis ve premium beach club."
              img="https://images.trvl-media.com/lodging/15000000/14630000/14630000/14629943/5545a525.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
            />
          </div>
        </section>

        {/* Financial */}
        <section className="mt-12 bg-white/5 border border-white/6 rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold">Finansal Projeksiyon</h4>
              <p className="text-slate-200 mt-2 max-w-xl">
                Örnek: IGLO 275.000 USD — Golden Wings işletme garantisi ile %9
                yıllık sabit getiri taahhüdü (örnek hesaplama).
              </p>
            </div>
            <div className="mt-6 md:mt-0 w-full md:w-[420px]">
              <MiniChart />
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="mt-12">
          <h4 className="text-xl font-bold mb-4">Galeri</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "/Resim10.png",
              "/Resim11.png",
              "/Resim12.png",
              "/Resim13.png",
              "/Resim14.png",
              "/Resim15.png",
            ].map((g, i) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={i}
                className="rounded-lg overflow-hidden shadow-lg border border-white/6"
              >
                <Image
                  src={g}
                  alt={`gallery-${i}`}
                  width={1200}
                  height={800}
                  className="object-cover w-full h-56"
                />
              </motion.div>
            ))}
          </div>
        </section>

{/* Map (Video) & Advantages */}
<section className="mt-12 grid md:grid-cols-2 gap-6">
  {/* YouTube Video */}
{/* YouTube Video */}
<div className="rounded-2xl overflow-hidden border border-white/6 shadow-lg">
  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src="https://www.youtube.com/embed/YOUTUBE_VIDEO_ID"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>


  {/* Advantages */}
<section className="mt-0">
  <h5 className="text-lg font-bold mb-6">Proje Avantajları</h5>
  <div className="grid md:grid-cols-2 gap-6">
    <AdvantageCard
      icon={<ShieldCheck className="text-[#3A7BD5]" size={24} />}
      text="Devlet güvencesi ile yatırım korunur."
    />
    <AdvantageCard
      icon={<Globe2 className="text-[#3A7BD5]" size={24} />}
      text="Schengen & Commonwealth vize kolaylığı."
    />
    <AdvantageCard
      icon={<Briefcase className="text-[#3A7BD5]" size={24} />}
      text="Golden Wings işletme garantisi ve kiralama desteği."
    />
    <AdvantageCard
      icon={<Plane className="text-[#3A7BD5]" size={24} />}
      text="Yılda 1 hafta ücretsiz tatil hediyesi."
    />
  </div>
</section>

</section>


        {/* Contact */}
        <section
          id="contact"
          className="mt-12 bg-white/6 border border-white/8 rounded-2xl p-6 md:p-8"
        >
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div className="md:flex-1">
              <h4 className="text-2xl font-bold">Bilgi & Teklif Talebi</h4>
              <p className="text-slate-200 mt-2">
                Formu doldurun, satış ekibimiz en kısa sürede dönüş yapsın.
              </p>

              <div className="mt-4 flex flex-wrap gap-4">
  <a
    href="tel:+902427450809"
    className="inline-flex items-center gap-3 bg-white text-[#0b2a57] px-5 py-3 rounded-full font-medium shadow-lg hover:bg-slate-100"
  >
    <Phone size={18} /> +90 242 745 08 09
  </a>
  <a
    href="mailto:info@havacilar.com"
    className="inline-flex items-center gap-3 bg-white text-[#0b2a57] px-5 py-3 rounded-full font-medium shadow-lg hover:bg-slate-100"
  >
    <Mail size={18} /> info@havacilar.com.tr
  </a>
</div>

            </div>

            <form className="mt-6 md:mt-0 md:w-[520px] grid grid-cols-1 gap-3">
              <input
                placeholder="Ad Soyad"
                className="p-3 rounded-md bg-transparent border border-white/10 focus:border-[#3A7BD5] outline-none text-white"
              />
              <input
                placeholder="E-posta"
                className="p-3 rounded-md bg-transparent border border-white/10 focus:border-[#3A7BD5] outline-none text-white"
              />
              <input
                placeholder="Telefon"
                className="p-3 rounded-md bg-transparent border border-white/10 focus:border-[#3A7BD5] outline-none text-white"
              />
              <textarea
                placeholder="Mesajınız"
                rows={4}
                className="p-3 rounded-md bg-transparent border border-white/10 focus:border-[#3A7BD5] outline-none text-white"
              />
              <div className="text-right">
                <button className="bg-[#3A7BD5] px-5 py-3 rounded-full font-medium hover:bg-[#2f66b8]">
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- Helper components ---------------- */
function Badge({ text }: { text: string }) {
  return (
    <span className="inline-block bg-white/6 text-slate-100 text-xs px-3 py-1 rounded-full border border-white/8">
      {text}
    </span>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/3 p-3 rounded-lg text-center">
      <div className="text-xs text-slate-200">{label}</div>
      <div className="text-lg font-semibold text-white mt-1">{value}</div>
    </div>
  );
}

function ModelCard({
  title,
  size,
  price,
  img,
  onClick,
}: {
  title: string;
  size: string;
  price: string;
  img: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white/5 rounded-2xl overflow-hidden border border-white/6 shadow-lg"
    >
      <div className="relative w-full h-44">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="text-sm text-slate-200">{title}</div>
        <div className="text-xs text-slate-300 mt-1">{size}</div>
        <div className="mt-3 text-[#3A7BD5] font-semibold">{price}</div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={onClick}
            className="px-4 py-2 bg-white/6 rounded-md hover:bg-white/10"
          >
            Detay
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function HeroStrip({
  title,
  subtitle,
  img,
}: {
  title: string;
  subtitle: string;
  img: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden border border-white/6 shadow-lg"
    >
      <div className="relative h-56 w-full">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5 bg-gradient-to-t from-[#07172e]/40 to-transparent">
        <h5 className="font-bold text-lg">{title}</h5>
        <p className="text-slate-200 mt-2">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function MiniChart() {
  const bars = [9, 8, 7, 6, 5, 4, 3, 2];
  return (
    <div className="bg-white/4 p-3 rounded-lg">
      <svg viewBox="0 0 220 100" className="w-full h-28">
        {bars.map((b, i) => (
          <rect
            key={i}
            x={i * 26 + 6}
            y={100 - b * 9}
            width={18}
            height={b * 9}
            rx={3}
            fill="#3A7BD5"
            opacity={0.95}
          />
        ))}
      </svg>
      <div className="text-xs text-slate-300 mt-2">
        Örnek amortisman görselleştirmesi
      </div>
    </div>
  );
}

/* AdvantageCard component */
function AdvantageCard({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/8 shadow">
      <span>{icon}</span>
      <span className="text-slate-100 text-sm">{text}</span>
    </div>
  );
}
