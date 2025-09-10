"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Phone,
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
import { useLanguage } from "@/contexts/LanguageContext";
import { getProject } from "@/app/services/projects.service";


/* -------------------- DUMMY DATA (İlerde DB'den çekilecek) -------------------- */
const projectsData: Record<string, any> = {
  "shellwe-maldives": {
    slug: "shellwe-maldives",
    mainImage: "/hero1.jpg",
    mainTitle: "Shellwe",
    highlightedText: "by Havacılar",
    plainText: "Maldivler — Angolitheemu Adası. Yatırım & Lüks yaşam birleşimi.",
    plainTextEn: "Maldives — Angolitheemu Island. Investment meets luxury living.",
    logo: "/maldiveslogopng.png",
    slogan: "Sadece Bir Tatil Değil, Bir Deneyim",
    sloganEn: "Not Just a Holiday, an Experience",
    overview: {
      description:
        "Shellwe by Havacılar; sürdürülebilir, izole konumda premium konutlar sunan; yatırımcı hakları devlet güvencesi ile korunmuş bir Maldivler projesidir. 49+50 yıl kullanım hakkı, yıllık yönetim ve kiralama opsiyonları ile yatırımcıya güçlü fırsatlar sağlar.",
      descriptionEn:
        "Shellwe by Havacılar is a Maldives project offering premium homes in a sustainable, secluded location; investor rights are protected under state assurance. With 49+50 years of usage rights and annual management and rental options, it provides strong opportunities for investors.",
      badges: [
        "Devlet Güvencesi",
        "Schengen & Commonwealth Vize Avantajı",
        "Golden Wings - İşletme Garantisi",
        "Yıllık 1 Hafta Ücretsiz Tatil (2 kişi)",
      ],
      badgesEn: [
        "State Assurance",
        "Schengen & Commonwealth Visa Advantage",
        "Golden Wings - Operational Guarantee",
        "1 Week Free Holiday Per Year (2 people)",
      ],
      quickStats: [
        { label: "Toplam Ünite", value: "76" },
        { label: "Teslim", value: "24 Ay" },
        { label: "Başlangıç Fiyat", value: "250.000 USD" },
        { label: "Amortisman", value: "~11.1 Yıl" },
      ],
      quickStatsEn: [
        { label: "Total Units", value: "76" },
        { label: "Delivery", value: "24 Months" },
        { label: "Starting Price", value: "250,000 USD" },
        { label: "Payback Period", value: "~11.1 Years" },
      ],
    },
    models: [
      {
        title: "Iglo Modeli — 1+1",
        titleEn: "Igloo Model — 1+1",
        size: "Net 63.9 m² • Brüt 108 m²",
        sizeEn: "Net 63.9 m² • Gross 108 m²",
        price: "250.000 - 275.000 USD",
        desc: "Modern tasarımlı, 1+1 iglo villa. Eşyalı teslim.",
        descEn: "Modern design 1+1 igloo villa. Fully furnished delivery.",
        images: ["/model-iglo.jpg", "/gallery-2.jpg"],
        img: "/model-iglo.jpg",
      },
      {
        title: "Karides Modeli — 1+1",
        titleEn: "Shrimp Model — 1+1",
        size: "Net 69.6 m² • Brüt 122 m²",
        sizeEn: "Net 69.6 m² • Gross 122 m²",
        price: "299.000 USD",
        desc: "Deniz kabuğu formunda 1+1 villa. Premium yaşam.",
        descEn: "Seashell-inspired 1+1 villa. Premium living.",
        images: ["/model-karides.jpg", "/gallery-3.jpg"],
        img: "/model-karides.jpg",
      },
      {
        title: "Silindir Modeli — 3+1",
        titleEn: "Cylinder Model — 3+1",
        size: "Net 105.6 m² • Brüt 182 m²",
        sizeEn: "Net 105.6 m² • Gross 182 m²",
        price: "455.000 USD",
        desc: "Aileler için geniş 3+1 villa. Panoramik manzara.",
        descEn: "Spacious 3+1 villa for families. Panoramic views.",
        images: ["/model-silindir.jpg", "/gallery-4.jpg"],
        img: "/model-silindir.jpg",
      },
    ],
    experiences: [
      {
        title: "Su Sporları & Aktiviteler",
        titleEn: "Water Sports & Activities",
        subtitle: "Scuba, surf, tekne gezintileri ve zengin aktivite seçenekleri.",
        subtitleEn: "Scuba, surfing, boat trips and a wide range of activities.",
        img: "https://turkey.meridianadventuredive.com/wp-content/uploads/2020/10/meridian-adventure-dive-turkey-activities-2.jpg",
      },
      {
        title: "Spa & Wellness",
        titleEn: "Spa & Wellness",
        subtitle: "Doğayla baş başa wellness alanları ve kişiye özel programlar.",
        subtitleEn: "Nature-inspired wellness areas and personalized programs.",
        img: "https://www.regnumhotels.com/media/v54bwnw3/regnumcarya_greendoor-spa-wellness-5-card.jpg",
      },
      {
        title: "Gurme Restoranlar",
        titleEn: "Gourmet Restaurants",
        subtitle: "Dünya mutfağı, deniz ürünleri ve fine dining deneyimi.",
        subtitleEn: "World cuisine, seafood and fine dining experience.",
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/92/38/ae/jie-istanbul-atasehir.jpg?w=900&h=500&s=1",
      },
      {
        title: "Özel Plaj & Lounge",
        titleEn: "Private Beach & Lounge",
        subtitle: "İzole plaj alanları, VIP servis ve premium beach club.",
        subtitleEn: "Secluded beach areas, VIP service, and a premium beach club.",
        img: "https://images.trvl-media.com/lodging/15000000/14630000/14630000/14629943/5545a525.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      },
    ],
    financial: {
      info: "Örnek: IGLO 275.000 USD — Golden Wings işletme garantisi ile %9 yıllık sabit getiri taahhüdü (örnek hesaplama).",
      infoEn:
        "Example: IGLOO 275,000 USD — With Golden Wings operational guarantee, 9% fixed annual return commitment (sample calculation).",
    },
    gallery: [
      "/Resim10.png",
      "/Resim11.png",
      "/Resim12.png",
      "/Resim13.png",
      "/Resim14.png",
      "/Resim15.png",
    ],
    youtube: "https://www.youtube.com/embed/YOUTUBE_VIDEO_ID",
    advantages: [
      {
        icon: <ShieldCheck className="text-[#3A7BD5]" size={24} />,
        text: "Devlet güvencesi ile yatırım korunur.",
        textEn: "Your investment is protected under state assurance.",
      },
      {
        icon: <Globe2 className="text-[#3A7BD5]" size={24} />,
        text: "Schengen & Commonwealth vize kolaylığı.",
        textEn: "Schengen & Commonwealth visa convenience.",
      },
      {
        icon: <Briefcase className="text-[#3A7BD5]" size={24} />,
        text: "Golden Wings işletme garantisi ve kiralama desteği.",
        textEn: "Golden Wings operational guarantee and rental support.",
      },
      {
        icon: <Plane className="text-[#3A7BD5]" size={24} />,
        text: "Yılda 1 hafta ücretsiz tatil hediyesi.",
        textEn: "One week free holiday per year gift.",
      },
    ],
    contact: {
      phone: "+90 242 745 08 09",
      email: "info@havacilar.com.tr",
    },
  },

  "laventure-cyprus": {
    slug: "laventure-cyprus",
    mainImage: "/hero3.jpg",
    mainTitle: "L’aventure",
    highlightedText: "by Havacılar",
    plainText: "Kuzey Kıbrıs — Tatlısu. Akdeniz’in incisi, lüks yaşam ve yatırım fırsatı.",
    plainTextEn: "Northern Cyprus — Tatlısu. Jewel of the Mediterranean, luxury living and investment opportunity.",
    logo: "/laventurelogo-1.png",
    slogan: "Lüks, Doğa ve Huzurun Buluşma Noktası",
    sloganEn: "Where Luxury Meets Nature and Serenity",
    overview: {
      description:
        "L’aventure by Havacılar; Kuzey Kıbrıs’ın Tatlısu bölgesinde, Akdeniz’in panoramik manzarasına sahip 66 üniteli lüks bir yaşam alanı sunar. 2026 yılında teslim edilecek olan proje, ailelerin, gençlerin ve yatırımcıların güvenle tercih edebileceği ayrıcalıklı bir yaşam tarzı vaat ediyor.",
      descriptionEn:
        "L’aventure by Havacılar, located in Tatlısu, Northern Cyprus, offers 66 luxury units with breathtaking Mediterranean views. Set for delivery in 2026, the project promises an exclusive lifestyle for families, young professionals, and investors alike.",
      badges: [
        "2026 Teslim",
        "Tatlısu’nun En Prestijli Projesi",
        "Akdeniz Panoramik Manzara",
        "Girne Merkez’e 20 dk",
      ],
      badgesEn: [
        "Delivery in 2026",
        "Most Prestigious Project in Tatlısu",
        "Mediterranean Panoramic View",
        "20 min to Kyrenia Center",
      ],
      quickStats: [
        { label: "Toplam Ünite", value: "66" },
        { label: "Teslim", value: "2026" },
        { label: "Başlangıç Fiyat", value: "Sorunuz" },
        { label: "Tipler", value: "1+1, 2+1, Loft & Studio" },
      ],
      quickStatsEn: [
        { label: "Total Units", value: "66" },
        { label: "Delivery", value: "2026" },
        { label: "Starting Price", value: "On Request" },
        { label: "Types", value: "1+1, 2+1, Loft & Studio" },
      ],
    },
    models: [
      {
        title: "1+1 Loft",
        titleEn: "1+1 Loft",
        size: "1 Yatak Odası • 1 Salon • 1 Banyo • Ön Bahçe • Mutfak",
        sizeEn: "1 Bedroom • 1 Living Room • 1 Bathroom • Front Garden • Kitchen",
        // price: "Sorunuz",
        desc: "Modern tasarım ve deniz manzaralı 1+1 loft daireler.",
        descEn: "Modern design 1+1 loft apartments with sea views.",
        images: ["/laventure-1plus1loft2.jpg","/laventure-1plus1loft.jpg","/laventure-1plus1loft3.jpg"],
        img: "/laventure-1plus1loft2.jpg",
      },
      {
        title: "2+1 Loft",
        titleEn: "2+1 Loft",
        size: "2 Yatak Odası • 1 Salon • 1 Banyo • Ön Bahçe • Mutfak • Teras",
        sizeEn: "2 Bedrooms • 1 Living Room • 1 Bathroom • Front Garden • Kitchen • Terrace",
        // price: "Sorunuz",
        desc: "Geniş aileler için şık ve modern 2+1 loft daireler.",
        descEn: "Stylish and modern 2+1 loft apartments ideal for families.",
        images: ["/laventure-2plus1loft.png","/laventure-2plus1loft1.jpg","/laventure-2plus1loft2.jpg","/laventure-2plus1loft3.jpg"],
        img: "/laventure-2plus1loft.png",
      },
      {
        title: "1+1 Daire",
        titleEn: "1+1 Apartment",
        size: "1 Yatak Odası • 1 Salon • 1 Banyo • Ön Bahçe • Mutfak",
        sizeEn: "1 Bedroom • 1 Living Room • 1 Bathroom • Front Garden • Kitchen",
        // price: "Sorunuz",
        desc: "Konforlu ve zarif bir şekilde döşenmiş 1+1 daireler.",
        descEn: "Comfortable and elegantly furnished 1+1 apartments.",
        images: ["/laventure-1plus1.png","/laventure-1plus1-1.jpg","/laventure-1plus1-2.jpg","/laventure-1plus1-3.jpg"],
        img: "/laventure-1plus1.png",
      },
      {
        title: "Stüdyo",
        titleEn: "Studio",
        size: "1 Yatak Odası • 1 Salon • 1 Banyo • Ön Bahçe • Mutfak • Depo Alanı",
        sizeEn: "1 Bedroom • 1 Living Room • 1 Bathroom • Front Garden • Kitchen • Storage",
        // price: "Sorunuz",
        desc: "Minimalist yaşamı tercih edenler için stüdyo daireler.",
        descEn: "Studio apartments designed for minimalist living.",
        images: ["/laventure-studio.png","/laventure-studio1.jpg"],
        img: "/laventure-studio.png",
      },
    ],
    experiences: [
      {
        title: "Doğa & Huzur",
        titleEn: "Nature & Serenity",
        subtitle: "Meditasyon bahçeleri, yürüyüş yolları ve sakin yaşam alanları.",
        subtitleEn: "Meditation gardens, walking paths, and serene living spaces.",
        img: "/dogahuzur.jpg",
      },
      {
        title: "Spor & Aktivite",
        titleEn: "Sports & Activities",
        subtitle: "Bisiklet yolları, açık hava spor alanları ve fitness imkanları.",
        subtitleEn: "Cycling paths, outdoor sports areas, and fitness facilities.",
        img: "/laventure-spor.jpg",
      },
      {
        title: "Restoran & Sosyal Alanlar",
        titleEn: "Restaurant & Social Areas",
        subtitle: "Şık restoran, snack bar ve barbekü alanları.",
        subtitleEn: "Elegant restaurant, snack bar, and barbecue areas.",
        img: "/laventure-restorant.jpg",
      },
    ],
    financial: {
      info: "Yüksek yatırım potansiyeline sahip, Akdeniz’in en prestijli bölgelerinden birinde benzersiz proje.",
      infoEn:
        "A unique project with high investment potential in one of the Mediterranean’s most prestigious regions.",
    },
    gallery: [
      "/laventure-gallery1.jpg",
      "/laventure-gallery2.jpg",
      "/laventure-gallery3.jpg",
      "/laventure-gallery4.jpg",
    ],
    youtube: "https://www.youtube.com/embed/YOUTUBE_VIDEO_ID",
    advantages: [
      {
        icon: <ShieldCheck className="text-[#3A7BD5]" size={24} />,
        text: "2026’da teslim garantisi.",
        textEn: "Guaranteed delivery in 2026.",
      },
      {
        icon: <Globe2 className="text-[#3A7BD5]" size={24} />,
        text: "Girne Merkez’e 20 dakika.",
        textEn: "20 minutes to Kyrenia Center.",
      },
      {
        icon: <Briefcase className="text-[#3A7BD5]" size={24} />,
        text: "Prestijli Tatlısu bölgesinde yatırım fırsatı.",
        textEn: "Investment opportunity in prestigious Tatlısu area.",
      },
      {
        icon: <Plane className="text-[#3A7BD5]" size={24} />,
        text: "Ercan Havalimanı’na 40 dakika.",
        textEn: "40 minutes to Ercan Airport.",
      },
    ],
    contact: {
      phone: "+90 530 620 06 85",
      email: "info@havacilar.com.tr",
    },
  },
 "glorious-deluxe-kemer": {
    slug: "glorious-deluxe-kemer",
    mainImage: "/glorius-bg.png",
    mainTitle: "Glorious Deluxe",
    highlightedText: "Kemer",
    plainText: "Antalya — Kemer. Doğayla iç içe, modern lüks villalar.",
    plainTextEn: "Antalya — Kemer. Modern luxury villas in the heart of nature.",
    logo: "/kemerlogo.png",
    slogan: "İhtişamın Doğayla Buluştuğu Yer",
    sloganEn: "Where Splendor Meets Nature",
    overview: {
      description:
        "Glorious Deluxe Kemer; Antalya’nın gözde beldesi Kemer’de, 2183 m² arsa üzerine Green House konseptiyle inşa edilmiş 6 müstakil tripleks villadan oluşmaktadır. Doğayla iç içe, modern konfor ve tarihi zenginliklerin birleştiği bu proje, size tatil gibi bir yaşam sunar.",
      descriptionEn:
        "Glorious Deluxe Kemer, located in Antalya’s Kemer district, consists of 6 detached triplex villas built on a 2183 m² land with Green House concept. Combining nature, modern comfort, and historical richness, it offers you a life like a holiday.",
      badges: [
        "Green House Konsepti",
        "6 Müstakil Villa",
        "Doğa & Tarih Zenginliği",
        "Kemer’in Kalbinde",
      ],
      badgesEn: [
        "Green House Concept",
        "6 Detached Villas",
        "Nature & Historical Richness",
        "In the Heart of Kemer",
      ],
      quickStats: [
        { label: "Toplam Arsa Alanı", value: "2183 m²" },
        { label: "Villa Sayısı", value: "6" },
        { label: "Net Alan", value: "230 m²" },
        { label: "Brüt Alan", value: "300 m²" },
      ],
      quickStatsEn: [
        { label: "Total Land Area", value: "2183 m²" },
        { label: "Number of Villas", value: "6" },
        { label: "Net Area", value: "230 m²" },
        { label: "Gross Area", value: "300 m²" },
      ],
    },
    models: [
      {
        title: "Tripleks Villa — 5.5+1",
        titleEn: "Triplex Villa — 5.5+1",
        size: "Net 230 m² • Brüt 300 m² • Ortalama Bahçe 370 m²",
        sizeEn: "Net 230 m² • Gross 300 m² • Avg. Garden 370 m²",
        price: "Sorunuz",
        desc: "Her köşesi 1. sınıf malzemelerle inşa edilmiş, Green House konseptli, modern tripleks villalar.",
        descEn: "Triplex villas with Green House concept, built with first-class materials and modern elegance.",
        images: ["/glorious-villa1.jpg", "/glorious-villa2.jpg"],
        img: "/glorious-villa1.jpg",
      },
    ],
    experiences: [
      {
        title: "Doğayla İç İçe",
        titleEn: "In Touch with Nature",
        subtitle: "Dağ manzaraları, orman esintileri ve denize yakın konum.",
        subtitleEn: "Mountain views, forest breezes, and proximity to the sea.",
        img: "/glorious-nature.jpg",
      },
      {
        title: "Green House Özellikleri",
        titleEn: "Green House Features",
        subtitle: "Güneş panelleri, doğal kaynak suyu, elektrikli araç şarjı.",
        subtitleEn: "Solar panels, natural spring water, EV charging.",
        img: "/glorious-greenhouse.jpg",
      },
      {
        title: "Özel Konforlar",
        titleEn: "Exclusive Comforts",
        subtitle: "Özel havuz, sauna, ateş çukuru, akıllı ev sistemi.",
        subtitleEn: "Private pool, sauna, fire pit, smart home system.",
        img: "/glorious-comfort.jpg",
      },
    ],
    financial: {
      info: "Glorious Deluxe Kemer; modern lüks, sürdürülebilir enerji ve yüksek yatırım potansiyelini birleştiriyor.",
      infoEn:
        "Glorious Deluxe Kemer combines modern luxury, sustainable energy, and high investment potential.",
    },
    gallery: [
      "/glorious-gallery1.jpg",
      "/glorious-gallery2.jpg",
      "/glorious-gallery3.jpg",
    ],
    youtube: "https://www.youtube.com/embed/YOUTUBE_VIDEO_ID",
    advantages: [
      {
        icon: <ShieldCheck className="text-[#3A7BD5]" size={24} />,
        text: "Green House konsepti ile sürdürülebilir yaşam.",
        textEn: "Sustainable living with Green House concept.",
      },
      {
        icon: <Globe2 className="text-[#3A7BD5]" size={24} />,
        text: "Kemer’in en özel lokasyonunda.",
        textEn: "Located in the most exclusive area of Kemer.",
      },
      {
        icon: <Briefcase className="text-[#3A7BD5]" size={24} />,
        text: "Modern lüks ve yüksek yatırım potansiyeli.",
        textEn: "Modern luxury and high investment potential.",
      },
      {
        icon: <Plane className="text-[#3A7BD5]" size={24} />,
        text: "Doğa, tarih ve deniz bir arada.",
        textEn: "Nature, history, and sea together.",
      },
    ],
    contact: {
      phone: "+90 242 745 08 09",
      email: "info@havacilar.com.tr",
    },
  },
  "aquamarine-cyprus": {
    slug: "aquamarine-cyprus",
    mainImage: "/aquamarine-hero.jpg",
    mainTitle: "Aquamarine Nuance",
    highlightedText: "by Havacılar",
    plainText: "Kuzey Kıbrıs — Tatlısu. Lüks, manzara ve yatırımın birleştiği yaşam alanı.",
    plainTextEn: "Northern Cyprus — Tatlısu. Luxury living with breathtaking views and investment opportunity.",
    logo: "/aquamarine-logo.png",
    slogan: "Lüks ve Huzurun Senfonisi",
    sloganEn: "A Symphony of Luxury and Serenity",
    overview: {
      description:
        "Aquamarine Nuance; Kuzey Kıbrıs Tatlısu bölgesinde, 106 lüks üniteden oluşan prestijli bir konut projesidir. 34 stüdyo, 36 adet 1+1 ve 36 adet 2+1 daire seçenekleriyle farklı ihtiyaçlara hitap eder. Akdeniz’in nefes kesici manzarasıyla modern yaşamın inceliklerini birleştirir.",
      descriptionEn:
        "Aquamarine Nuance, located in Tatlısu, Northern Cyprus, is a prestigious residential project with 106 luxury units. Offering 34 studios, 36 one-bedroom, and 36 two-bedroom apartments, it combines the elegance of modern living with breathtaking Mediterranean views.",
      badges: [
        "Toplam 106 Ünite",
        "Tatlısu’da Prestijli Lokasyon",
        "Akdeniz Panoramik Manzara",
        "Girne Merkez’e 25 dk",
      ],
      badgesEn: [
        "106 Units in Total",
        "Prestigious Location in Tatlısu",
        "Mediterranean Panoramic View",
        "25 min to Kyrenia Center",
      ],
      quickStats: [
        { label: "Toplam Ünite", value: "106" },
        { label: "Ünite Tipleri", value: "Stüdyo, 1+1, 2+1" },
        { label: "Teslim", value: "Sorunuz" },
        { label: "Başlangıç Fiyat", value: "Sorunuz" },
      ],
      quickStatsEn: [
        { label: "Total Units", value: "106" },
        { label: "Unit Types", value: "Studio, 1+1, 2+1" },
        { label: "Delivery", value: "On Request" },
        { label: "Starting Price", value: "On Request" },
      ],
    },
    models: [
      {
        title: "Stüdyo",
        titleEn: "Studio",
        size: "1 Yatak Odası • 1 Salon • 1 Banyo • Mutfak • Teras",
        sizeEn: "1 Bedroom • 1 Living Room • 1 Bathroom • Kitchen • Terrace",
        price: "Sorunuz",
        desc: "Minimalist yaşamı tercih edenler için modern stüdyo daireler.",
        descEn: "Modern studio apartments designed for minimalist living.",
        images: ["/aquamarine-studio.jpg"],
        img: "/aquamarine-studio.jpg",
      },
      {
        title: "1+1 Daire",
        titleEn: "1+1 Apartment",
        size: "1 Yatak Odası • 1 Salon • 1 Banyo • Ön Bahçe • Mutfak",
        sizeEn: "1 Bedroom • 1 Living Room • 1 Bathroom • Front Garden • Kitchen",
        price: "Sorunuz",
        desc: "Konforlu yaşam alanı sunan 1+1 daireler.",
        descEn: "1+1 apartments offering comfortable living spaces.",
        images: ["/aquamarine-1plus1.jpg"],
        img: "/aquamarine-1plus1.jpg",
      },
      {
        title: "2+1 Daire",
        titleEn: "2+1 Apartment",
        size: "2 Yatak Odası • 1 Salon • 1 Banyo • Ön Bahçe • Mutfak • Teras",
        sizeEn: "2 Bedrooms • 1 Living Room • 1 Bathroom • Front Garden • Kitchen • Terrace",
        price: "Sorunuz",
        desc: "Geniş aileler için şık ve modern 2+1 daireler.",
        descEn: "Stylish and modern 2+1 apartments ideal for families.",
        images: ["/aquamarine-2plus1.jpg"],
        img: "/aquamarine-2plus1.jpg",
      },
    ],
    experiences: [
      {
        title: "Sosyal Alanlar",
        titleEn: "Social Areas",
        subtitle: "Restoran, snack bar, havuz bar, fast food ve dondurmacı.",
        subtitleEn: "Restaurant, snack bar, pool bar, fast food, and ice cream shop.",
        img: "/aquamarine-social.jpg",
      },
      {
        title: "Spor & Wellness",
        titleEn: "Sports & Wellness",
        subtitle: "Yürüyüş yolları, bisiklet parkurları, açık spor alanı, spa & meditasyon bahçesi.",
        subtitleEn: "Walking paths, cycling routes, outdoor sports area, spa & meditation garden.",
        img: "/aquamarine-sport.jpg",
      },
      {
        title: "Aile & Çocuk Alanları",
        titleEn: "Family & Kids Areas",
        subtitle: "Açık/kapalı oyun alanları, mini kulüp ve çocuk havuzu.",
        subtitleEn: "Indoor/outdoor playgrounds, mini club, and kids’ pool.",
        img: "/aquamarine-family.jpg",
      },
    ],
    financial: {
      info: "Aquamarine Nuance, 106 ünitesiyle yüksek yatırım potansiyeli ve yıl boyu lüks yaşam imkanı sunar.",
      infoEn:
        "Aquamarine Nuance offers high investment potential and year-round luxury living with its 106 units.",
    },
    gallery: [
      "/aquamarine-gallery1.jpg",
      "/aquamarine-gallery2.jpg",
      "/aquamarine-gallery3.jpg",
    ],
    youtube: "https://www.youtube.com/embed/YOUTUBE_VIDEO_ID",
    advantages: [
      {
        icon: <ShieldCheck className="text-[#3A7BD5]" size={24} />,
        text: "106 ünitelik prestijli yaşam projesi.",
        textEn: "Prestigious residential project with 106 units.",
      },
      {
        icon: <Globe2 className="text-[#3A7BD5]" size={24} />,
        text: "Tatlısu’nun en değerli lokasyonunda.",
        textEn: "Located in the most valuable area of Tatlısu.",
      },
      {
        icon: <Briefcase className="text-[#3A7BD5]" size={24} />,
        text: "Aileler ve yatırımcılar için cazip fırsatlar.",
        textEn: "Attractive opportunities for families and investors.",
      },
      {
        icon: <Plane className="text-[#3A7BD5]" size={24} />,
        text: "Ercan Havalimanı’na 40 dk, Girne’ye 25 dk.",
        textEn: "40 min to Ercan Airport, 25 min to Kyrenia.",
      },
    ],
    contact: {
      phone: "+90 530 620 06 85",
      email: "info@havacilar.com.tr",
    },
  },
};


/* -------------------- PAGE -------------------- */
export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [apiProject, setApiProject] = useState<any | null>(null);
  const project = useMemo(() => {
    if (apiProject) {
      // Map backend project shape into the local UI model minimally
      return {
        slug: apiProject.slug,
        mainImage: apiProject.coverImage || "/hero1.jpg",
        mainTitle: apiProject.title?.tr || apiProject.title?.en || apiProject.slug,
        highlightedText: "",
        plainText: apiProject.description?.tr || "",
        plainTextEn: apiProject.description?.en || "",
        logo: apiProject.coverImageWithLogo || "/maldiveslogopng.png",
        slogan: "",
        sloganEn: "",
        overview: {
          description: apiProject.description?.tr || "",
          descriptionEn: apiProject.description?.en || "",
          badges: [],
          badgesEn: [],
          quickStats: [],
          quickStatsEn: [],
        },
        models: apiProject.models || [],
        experiences: apiProject.experiences || [],
        financial: apiProject.financial || {},
        gallery: apiProject.gallery || [],
        youtube: apiProject.video?.url || "https://www.youtube.com/embed/YOUTUBE_VIDEO_ID",
        advantages: apiProject.advantages || [],
        contact: { phone: "+90 242 745 08 09", email: "info@havacilar.com.tr" },
      };
    }
    return projectsData[slug as string];
  }, [apiProject, slug]);

  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const { language, t } = useLanguage();
  const letters = (project?.highlightedText || "").split("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (slug) {
          const p = await getProject(String(slug));
          if (mounted) setApiProject(p);
        }
      } catch {
        if (mounted) setApiProject(null);
      }
    })();
    return () => { mounted = false; };
  }, [slug]);

  // Her harf için animasyon ayarları
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // harfler arası gecikme
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">Proje bulunamadı</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07172e] via-[#0b2a57] to-[#07203a] text-white">
      <Header />

      {/* HERO */}
  <header className="relative h-[72vh] md:h-[78vh] pt-6 md:pt-0">
        <Image
          src={project.mainImage}
          alt={project.mainTitle}
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0">
          {/* Üst kısım: header arkasında koyu */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#07172e]/95 to-transparent" />
          {/* Alt kısım: daha hafif opaklık */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07172e]/40 to-[#07172e]/80" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20">
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-4 md:gap-8 items-center mt-8 md:mt-0"
            >
              <div>
<h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
      {project.mainTitle}{" "}
  <motion.span
  className="text-transparent bg-clip-text bg-gradient-to-r 
       from-[#93c5fd] via-[#60a5fa] to-[#22d3ee] drop-shadow-md"
        variants={container}
        initial="hidden"
        animate="visible"
      >

        {letters.map((letter: string, index: number) => (
          <motion.span key={index} variants={child}>
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </h1>



                <p className="mt-6 md:mt-4 text-slate-100 max-w-xl text-lg md:text-xl">
                  {language === 'en' ? project.plainTextEn : project.plainText}
                </p>
        <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 bg-[#3A7BD5] hover:bg-[#2f66b8] text-white px-5 py-3 rounded-full font-medium shadow-lg"
                  >
          {t('project.cta.offer')} <ArrowRight size={16} />
                  </a>
                  <a
                    href="#gallery"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-full text-white"
                  >
          {t('project.cta.gallery')}
                  </a>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <div className="h-64 md:h-72 lg:h-80 w-full">
                  <Image src={project.logo} alt="Logo" fill className="object-contain" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-10 -mt-24 pb-20">
        {/* Overview */}
        <section className="bg-white/5 backdrop-blur rounded-2xl p-6 md:p-8 shadow-xl border border-white/6">
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{t('project.overview')}</h2>
              <p className="mt-2 text-slate-200 max-w-2xl">
                {language === 'en' ? project.overview.descriptionEn : project.overview.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {(language === 'en' ? project.overview.badgesEn : project.overview.badges).map((b: string, i: number) => (
                  <Badge key={i} text={b} />
                ))}
              </div>
            </div>
            <div className="mt-6 md:mt-0 grid grid-cols-2 gap-4 w-full md:w-[420px]">
              {(language === 'en' ? project.overview.quickStatsEn : project.overview.quickStats).map((stat: any, i: number) => (
                <QuickStat key={i} label={stat.label} value={stat.value} />
              ))}
            </div>
          </div>
        </section>

        {/* Models */}
        <section className="mt-10">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">{t('project.models')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {project.models.map((m: any, i: number) => (
              <ModelCard key={i} {...m} onClick={() => setSelectedModel(m)} />
            ))}
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
                      (slideIndex - 1 + selectedModel.images.length) % selectedModel.images.length
                    )
                  }
                >
                  <ChevronLeft />
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
                  onClick={() => setSlideIndex((slideIndex + 1) % selectedModel.images.length)}
                >
                  <ChevronRight />
                </button>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-2xl font-bold mb-3">{language === 'en' ? selectedModel.titleEn ?? selectedModel.title : selectedModel.title}</h4>
                <p className="text-slate-200 mb-4">{language === 'en' ? selectedModel.descEn ?? selectedModel.desc : selectedModel.desc}</p>
                <div className="text-lg font-semibold text-[#3A7BD5] mb-6">{selectedModel.price}</div>
              </div>
            </div>
          </div>
        )}

        {/* Experiences */}
        <section className="mt-12">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">{language === 'en' ? project.sloganEn ?? project.slogan : project.slogan}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {project.experiences.map((e: any, i: number) => (
              <HeroStrip key={i} {...e} />
            ))}
          </div>
        </section>

        {/* Financial */}
        <section className="mt-12 bg-white/5 border border-white/6 rounded-2xl p-6 md:p-8 shadow-lg">
      <div className="md:flex md:items-center md:justify-between gap-6">
            <div>
        <h4 className="text-xl font-bold">{t('project.financial')}</h4>
        <p className="text-slate-200 mt-2 max-w-xl">{language === 'en' ? project.financial.infoEn ?? project.financial.info : project.financial.info}</p>
            </div>
            <div className="mt-6 md:mt-0 w-full md:w-[420px]">
              {/* <MiniChart /> */}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="mt-12">
          <h4 className="text-xl font-bold mb-4">{t('project.gallery')}</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {project.gallery.map((g: string, i: number) => (
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

        {/* Video + Advantages */}
        <section className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-white/6 shadow-lg">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={project.youtube}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-6">{t('project.advantages')}</h5>
            <div className="grid md:grid-cols-2 gap-6">
              {project.advantages.map((a: any, i: number) => (
                <AdvantageCard key={i} icon={a.icon} text={language === 'en' ? a.textEn ?? a.text : a.text} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="mt-12 bg-white/6 border border-white/8 rounded-2xl p-6 md:p-8"
        >
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div className="md:flex-1">
              <h4 className="text-2xl font-bold">{t('project.contact.title')}</h4>
              <p className="text-slate-200 mt-2">
                {language === 'en' ? 'Fill out the form and our sales team will contact you shortly.' : 'Formu doldurun, satış ekibimiz en kısa sürede dönüş yapsın.'}
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <a
                  href={`tel:${project.contact.phone}`}
                  className="inline-flex items-center gap-3 bg-white text-[#0b2a57] px-5 py-3 rounded-full font-medium shadow-lg hover:bg-slate-100"
                >
                  <Phone size={18} /> {project.contact.phone}
                </a>
                <a
                  href={`mailto:${project.contact.email}`}
                  className="inline-flex items-center gap-3 bg-white text-[#0b2a57] px-5 py-3 rounded-full font-medium shadow-lg hover:bg-slate-100"
                >
                  <Mail size={18} /> {project.contact.email}
                </a>
              </div>
            </div>
            <form className="mt-6 md:mt-0 md:w-[520px] grid grid-cols-1 gap-3">
              <input
                placeholder={language === 'en' ? 'Full Name' : 'Ad Soyad'}
                className="p-3 rounded-md bg-transparent border border-white/10 focus:border-[#3A7BD5] outline-none text-white"
              />
              <input
                placeholder={language === 'en' ? 'Email' : 'E-posta'}
                className="p-3 rounded-md bg-transparent border border-white/10 focus:border-[#3A7BD5] outline-none text-white"
              />
              <input
                placeholder={language === 'en' ? 'Phone' : 'Telefon'}
                className="p-3 rounded-md bg-transparent border border-white/10 focus:border-[#3A7BD5] outline-none text-white"
              />
              <textarea
                placeholder={language === 'en' ? 'Your Message' : 'Mesajınız'}
                rows={4}
                className="p-3 rounded-md bg-transparent border border-white/10 focus:border-[#3A7BD5] outline-none text-white"
              />
              <div className="text-right">
                <button className="bg-[#3A7BD5] px-5 py-3 rounded-full font-medium hover:bg-[#2f66b8]">
                  {language === 'en' ? 'Send' : 'Gönder'}
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

function ModelCard({ title, size, price, img, onClick }: any) {
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
          <button onClick={onClick} className="px-4 py-2 bg-white/6 rounded-md hover:bg-white/10">
            Detay
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function HeroStrip({ title, subtitle, img }: any) {
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

// function MiniChart() {
//   const bars = [9, 8, 7, 6, 5, 4, 3, 2];
//   return (
//     <div className="bg-white/4 p-3 rounded-lg">
//       <svg viewBox="0 0 220 100" className="w-full h-28">
//         {bars.map((b, i) => (
//           <rect
//             key={i}
//             x={i * 26 + 6}
//             y={100 - b * 9}
//             width={18}
//             height={b * 9}
//             rx={3}
//             fill="#3A7BD5"
//             opacity={0.95}
//           />
//         ))}
//       </svg>
//       <div className="text-xs text-slate-300 mt-2">Örnek amortisman görselleştirmesi</div>
//     </div>
//   );
// }

function AdvantageCard({ icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/8 shadow">
      <span>{icon}</span>
      <span className="text-slate-100 text-sm">{text}</span>
    </div>
  );
}
