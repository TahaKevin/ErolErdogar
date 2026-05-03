/**
 * Site ayarları
 */
var SITE = {
  advisorName: "Erol Erdoğar",
  regionLabel: "Fikirtepe, Kadıköy ve Ataşehir",
  yearsExperience: "9",
  whatsappE164: "905325662838",
  whatsappMessage: "Merhaba Erol Bey, ilanlarınız hakkında bilgi almak istiyorum.",
  phoneTel: "+905325662838",
  phoneDisplay: "+90 532 566 28 38",
  email: "erolerdogar@hotmail.com",
  // Instagram bilgisi: kullanıcı adını ve profil linkini buradan değiştirin.
  instagramUsername: "erolerdogar",
  instagramUrl: "https://instagram.com/erolerdogar",
  // LinkedIn profil URL’si (tam https://… link). Boş bırakırsanız mavi ikon gösterilmez.
  linkedinUrl: "https://tr.linkedin.com/in/erol-erdogar-32536ba7",
  // Sahibinden mağaza veya profil sayfanız (tam https://… link). Boşsa sarı ikon ve iletişim kartı gizlenir.
  sahibindenUrl: "https://turyapatasehirimza.sahibinden.com/?userId=aob7CG7f_YIWfID7cYrjbzw",

  /**
   * Sağ alttaki yeşil telefon menüsü (FAB): yukarı doğru renkli daire ikonlar.
   * Adresler: instagramUrl, whatsappE164 + whatsappMessage, linkedinUrl, sahibindenUrl, phoneTel / phoneDisplay.
   */
  contactFab: {
    enabled: true,
    panelLabel: "Hızlı iletişim",
    showInstagram: true,
    showWhatsapp: true,
    showLinkedin: true,
    showSahibinden: true,
    showPhone: true,
    labelInstagram: "Instagram",
    labelWhatsapp: "WhatsApp ile mesaj",
    labelLinkedin: "LinkedIn",
    labelSahibinden: "Sahibinden",
    labelPhone: "",
    // Yukarıdan aşağıya sıra (en üstteki en uzak); değerler: "li" | "sb" | "ig" | "wa" | "tel"
    itemOrder: ["li", "sb", "ig", "wa", "tel"],
  },
  // Intro: sadece index ilk giriş + sayfa yenileme (F5). Diğer sayfalardan ana sayfaya link ile gelince gösterilmez.
  introDurationMs: 3200,
  introFadeMs: 650,
  // Açılışta logo + isim yukarıdan iniş süresi (ms); CSS --intro-enter ile kullanılır.
  introEnterMs: 1650,
  introLogoImage: "assets/intro-turyap-logo-blue.png",
  // 0 ile 1 arası: görselin koyuluk/şeffaflık seviyesi (0.35 önerilir)
  introOverlayOpacity: 0.35,
  introBackgroundImage: "assets/intro-bg.png",

  /**
   * Ana sayfa — intro sonrası önce HEADER DAHİL tam ekran; ilk kaydırmada header altına iner (position: relative, sticky değil).
   * backgroundImages: 6–7 ödül/ofis fotoğrafı; sırayla geçer.
   * peekHeightCss: dar şerit yüksekliği · dockTallMinCss: ortadaki butonla büyütünce minimum yükseklik.
   * shrinkScrollRatio: tam ekran küçülürken sayfa ile senkron kaydırma hızı (düşük = daha hızlı bitiş).
   * barSummary: dar şeritte tek satır; boşsa isim + yıl + TURYAP ATAŞEHİR İMZA özeti.
   */
  discoverStrip: {
    enabled: true,
    backgroundImages: [
      "C:/Users/yenih/.cursor/projects/c-Users-yenih-Projects-my-site/assets/c__Users_yenih_AppData_Roaming_Cursor_User_workspaceStorage_dbd6b88c7acc8b454155f9b859791468_images_WhatsApp_Image_2026-04-30_at_7.20.24_PM-71994f63-8b35-492d-85a9-2847cedd4190.png",
      "assets/intro-bg.png",
    ],
    slideIntervalMs: 8000,
    peekHeightCss: "clamp(6.75rem, 21vh, 11rem)",
    dockTallMinCss: "min(58vh, 32rem)",
    // Tam ekran küçülürken sayfa da kayar: (viewport − peek) × bu oran ≈ kaydırma mesafesi; düşük = daha hızlı (ör. 0.35).
    shrinkScrollRatio: 0.3,
    // 0–1: bu noktaya kadar yükseklik tam ekrandan dar şeride iner; kalan kaydırma solmaya ayrılır (ani kapanma olmaz).
    shrinkHeightEndProgress: 0.78,
    // Tam ekran keşfet bittikten kaç ms sonra header altı şerit yumuşakça görünsün ve karusel başlasın.
    dockBarRevealDelayMs: 5000,
    discoverInviteLine: "Erol Erdoğar",
    discoverInviteSub: "TURYAP ATAŞEHİR İMZA Gayrimenkul Danışmanı",
    kicker: "TURYAP ATAŞEHİR İMZA | Güvenilir ve sonuç odaklı danışmanlık",
    barSummary:
      "Erol Erdoğar · TURYAP ATAŞEHİR İMZA Gayrimenkul Danışmanı · Kadıköy, Ataşehir, Fikirtepe",
    facts: [
      "Erol Erdoğar — TURYAP ATAŞEHİR İMZA Gayrimenkul Danışmanı",
      "9+ yıl saha deneyimi · Kadıköy, Ataşehir ve Fikirtepe bölge uzmanlığı",
      "RE/MAX İmza 2021, 2022 ve 2023 işlem birinciliği · Yıldızlar Kulübü üyesi",
      "2019 ve 2020 yıllarında işlem performansında derece başarıları",
      "Satılık & kiralık portföyde doğru fiyatlandırma, şeffaf süreç ve hızlı geri dönüş",
    ],
    scrollCue: "",
    carouselIntervalMs: 5000,
    carouselSlides: [
      {
        title: "Erol Erdoğar",
        text: "TURYAP ATAŞEHİR İMZA Gayrimenkul Danışmanı olarak satılık ve kiralık işlemlerinizde baştan sona güvenilir, planlı ve şeffaf bir süreç yönetimi sunarım.",
      },
      {
        title: "Bölge Uzmanlığı",
        text: "Kadıköy, Ataşehir ve Fikirtepe odağında; doğru lokasyon analizi, piyasa verisine uygun fiyatlandırma ve hızlı alıcı-kiracı eşleştirmesiyle sonuç odaklı çalışırım.",
      },
      {
        title: "Başarı & Referans",
        text: "RE/MAX İmza’da 2021, 2022 ve 2023 yıllarında işlem birinciliği elde ettim; Yıldızlar Kulübü üyeliği ve önceki yıllardaki derece başarılarımla istikrarlı performans sundum.",
      },
      {
        title: "İletişim",
        text: "Portföyünüz için strateji görüşmesi, değerleme ve randevu planlaması için WhatsApp, telefon veya sosyal medya kanallarından kolayca ulaşabilirsiniz.",
      },
    ],
  },

  // Google Haritalar → konumunuz → Paylaş → Haritayı yerleştir → iframe’deki src=… URL’sini aşağıya yapıştırın (sadece tırnak içi link, iframe etiketi değil).
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d376.43425843806006!2d29.085940229301386!3d40.99299594050158!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac7d1de423021%3A0xfc8a32e527de8e4b!2sRemax%20%C4%B0mza!5e0!3m2!1str!2sus!4v1776070002491!5m2!1str!2sus",

  // İletişim sayfasında haritanın üstünde görünen kısa adres (isteğe bağlı; boş bırakılabilir).
  mapsAddress: "Remax İmza",

  // Ana sayfa — Öne çıkan ilanlar (3 kart, soldan sağa). ilanlar-data.js id ("1", "2" …) veya "all" (tüm ilanlar).
  homeFeaturedSlots: ["1", "2", "all"],
  homeFeaturedAllTitle: "Portföydeki diğer ilanlar",
  homeFeaturedAllPrice: "Güncel liste",
  homeFeaturedAllLoc: "Tüm satılık ve kiralık ilanlar",
  homeFeaturedAllImage:
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=640&q=80",
};
