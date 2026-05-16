/**
 * TR / EN locale: UI copy, discover strip (EN), SITE overlays, language switcher.
 * Listings use ilanlar-en.js (ILANLAR_EN_BY_ID) when locale is "en".
 */
(function () {
  var STORAGE_KEY = "turyap_site_lang";
  var VALID = { tr: true, en: true };

  var STRINGS = {
    tr: {
      lang_switch_label: "Dil",
      lang_btn_tr: "Türkçe",
      lang_btn_en: "İngilizce",
      advisor_title: "TURYAP ATAŞEHİR İMZA Gayrimenkul danışmanı",
      hero_slogan_mid: " Gayrimenkul Danışmanı | ",
      hero_slogan_suffix: " uzmanı",
      skip_to_content: "İçeriğe geç",
      nav_open: "Menüyü aç",
      nav_main: "Ana menü",
      nav_home: "Ana Sayfa",
      nav_listings: "İlanlarım",
      nav_about: "Hakkımda",
      nav_contact: "İletişim",
      discover_kicker_default: "Kısa bilgilerle bizi keşfedin",
      discover_cue_default: "Aşağı kaydırarak siteye geçin",
      whatsapp_cta: "WhatsApp ile yazın",
      listings_cta: "İlanlarım",
      about_cta: "Hakkımda",
      contact_cta: "İletişim",
      featured_title: "Öne çıkan ilanlar",
      featured_intro:
        "Güncel fiyat ve detay için iletişime geçin; ilanlar düzenli güncellenir.",
      view_all_listings: "Tüm ilanları gör",
      trust_1_h: "TURYAP ATAŞEHİR İMZA Gayrimenkul",
      trust_1_p: "Çalıştığım marka; süreçte şeffaflık ve profesyonel destek.",
      trust_2_h: "Güncel ilanlar",
      trust_2_p: "Yayındaki portföyü düzenli kontrol ediyorum.",
      trust_3_h: "Hızlı dönüş",
      trust_3_p: "Telefon ve WhatsApp ile ulaşabilirsiniz.",
      reviews_title: "Müşteri görüşleri",
      reviews_carousel_label: "Müşteri yorum görselleri",
      reviews_prev: "Önceki yorum görselleri",
      reviews_next: "Sonraki yorum görselleri",
      review_alt: "Müşteri yorumu görseli",
      view_all_reviews: "Tüm görüşleri görüntüle",
      reviews_add_yours: "Görüşünüzü ekleyin",
      reviews_page_h1: "Müşteri görüşleri",
      reviews_back_home: "← Ana sayfaya dön",
      reviews_page_empty: "Henüz görsel eklenmedi.",
      reviews_page_lead:
        "Onaylı görüşleri okuyabilir; kendi deneyiminizi formu doldurup WhatsApp ile iletebilirsiniz.",
      reviews_text_heading: "Yayınlanan görüşler",
      reviews_text_empty: "Henüz yayınlanmış görüş yok. İlk görüşü siz WhatsApp ile iletebilirsiniz.",
      reviews_photos_heading: "Müşteri mesajları",
      reviews_photos_intro: "Ekran görüntülerine dokunarak büyütebilirsiniz.",
      reviews_form_heading: "Görüşünüzü paylaşın",
      reviews_form_intro: "Formu doldurun, WhatsApp ile bize iletin. Onayladıktan sonra bu sayfaya ekleriz.",
      reviews_step_1: "Adınızı ve görüşünüzü yazın",
      reviews_step_2: "WhatsApp ile gönderin",
      reviews_step_3: "Onay sonrası sitede yayınlanır",
      reviews_form_name_label: "Adınız",
      reviews_form_name_ph: "Örn. Ayşe K.",
      reviews_form_comment_label: "Görüşünüz",
      reviews_form_comment_ph: "Deneyiminizi kısaca yazın…",
      reviews_form_submit: "WhatsApp ile gönder",
      reviews_form_wa_unavailable: "WhatsApp şu an kullanılamıyor. Lütfen iletişim sayfasından ulaşın.",
      reviews_form_err_name: "Lütfen adınızı yazın (en az 2 karakter).",
      reviews_form_err_comment: "Lütfen görüşünüzü yazın (en az 10 karakter).",
      cta_bottom_html:
        "Detay veya randevu için <a class=\"js-wa wa-inline\" href=\"#\">WhatsApp</a> veya <a class=\"js-tel\" href=\"#\">telefon</a>.",
      footer_role: " · TURYAP ATAŞEHİR İMZA Gayrimenkul danışmanı",
      fab_quick: "Hızlı iletişim",
      fab_open: "İletişim menüsünü aç",
      fab_close: "İletişim menüsünü kapat",
      listings_page_title: "İlanlarım",
      listings_page_lead:
        "Satılık ve kiralık portföy. Güncel fiyat ve detay için hemen ulaşın.",
      listings_filter_group: "İlan tipi",
      filter_all: "Tümü",
      filter_sale: "Satılık",
      filter_rent: "Kiralık",
      about_page_badge: "TURYAP ATAŞEHİR İMZA Gayrimenkul",
      about_page_h1: "Hakkımda",
      about_page_lead: "Güvenilir iletişim, doğru fiyatlandırma ve net süreç.",
      about_gallery_h2: "Ödüller ve işlemlerim",
      awards_h: "Ödüller",
      awards_tag: "Plaketler ve ödül töreni görselleri",
      works_h: "İşlemlerim",
      works_tag: "İşlem hacmi ve başarı belgeleri",
      rotator_open_fs: "Tam ekranda aç",
      rotator_hint: "Tam boy görmek için görselin üzerine tıklayın.",
      rotator_prev: "Önceki görsel",
      rotator_next: "Sonraki görsel",
      about_lightbox_label: "Görsel önizleme",
      close: "Kapat",
      contact_page_h1: "İletişim",
      contact_page_lead: "Telefon, WhatsApp veya e-posta ile ulaşın.",
      contact_phone: "Telefon",
      contact_wa_btn: "WhatsApp ile mesaj gönder",
      contact_ig_go: "Instagram'a git",
      contact_sb_h: "Sahibinden",
      contact_sb_go: "Sahibinden'de görüntüle",
      contact_email: "E-posta",
      contact_map_h: "Konum",
      contact_map_iframe_title: "Ofis konumu — harita",
      map_note_tr:
        "Harita için Google Haritalar’da konumunuzu açın → Paylaş → Haritayı yerleştir → iframe src linkini site-config.js içindeki mapsEmbedUrl alanına yapıştırın.",
      detail_back: "← İlanlara dön",
      lightbox_photo_label: "Fotoğraf büyütülmüş görünüm",
      lightbox_prev_ph: "Önceki fotoğraf",
      lightbox_next_ph: "Sonraki fotoğraf",
      discover_toggle_fs: "Siteye geç",
      discover_toggle_shrink: "Siteye geç — ön izlemeyi küçült",
      discover_toggle_expand: "Ön izlemeyi büyüt",
      discover_toggle_compact: "Ön izlemeyi dar şeride küçült",
      discover_toggle_other: "Ön izlemeyi değiştir",
      carousel_prev: "Önceki",
      carousel_next: "Sonraki",
      phone_fallback: "Telefon ekleyin",
      ig_fallback: "@kullaniciadi",
      meta_home_title: "Ana Sayfa | Erol Erdoğar",
      meta_home_desc:
        "TURYAP ATAŞEHİR İMZA Gayrimenkul danışmanı Erol Erdoğar - güvenilir emlak danışmanlığı, satılık ve kiralık ilanlar.",
      meta_listings_title: "İlanlarım | Erol Erdoğar",
      meta_listings_desc: "Satılık ve kiralık güncel ilanlar — Erol Erdoğar, TURYAP ATAŞEHİR İMZA.",
      meta_about_title: "Hakkımda | Erol Erdoğar",
      meta_about_desc:
        "Erol Erdoğar — RE/MAX İmza işlem birincisi, Yıldızlar Kulübü üyesi, TURYAP ATAŞEHİR İMZA Gayrimenkul danışmanı.",
      meta_contact_title: "İletişim | Erol Erdoğar",
      meta_contact_desc: "İletişim - telefon, WhatsApp, e-posta.",
      meta_reviews_title: "Müşteri görüşleri | Erol Erdoğar",
      meta_reviews_desc:
        "Müşteri yorumları ve ekran görüntüleri — Erol Erdoğar, TURYAP ATAŞEHİR İMZA gayrimenkul danışmanı.",
      meta_detail_title_suffix: " | İlan | Erol Erdoğar",
      meta_listing_not_found: "İlan bulunamadı | Erol Erdoğar",
      listing_badge_sale: "Satılık",
      listing_badge_rent: "Kiralık",
      listing_meta_no_prefix: "İlan no:",
      listing_about_heading: "İlan hakkında",
      listing_video: "Video",
      listing_photo_big: "Büyük fotoğraf",
      listing_photo_progress: "fotoğraf",
      listing_map_heading: "Konum",
      listing_map_iframe_suffix: "— harita",
      listing_whatsapp: "WhatsApp",
      listing_call: "Ara",
      listing_share: "Paylaş",
      listing_share_copied: "İlan linki kopyalandı",
      listing_share_fail: "Paylaşım yapılamadı",
      listing_all_card_badge: "Tümü",
      listing_fallback_title: "İlan",
      listing_missing_title: "İlan bulunamadı",
      listing_missing_hint: "site-config homeFeaturedSlots ve ilanlar-data id eşleşmesini kontrol edin.",
      stats_aria_suffix: " ilan:",
      stats_total_label: "toplam ilan",
      stats_aria: "Toplam {total} ilan: {sat} satılık, {kir} kiralık",
      thumbs_group: "Küçük resim grubu",
      thumbs_scroll_prev: "Küçük resimleri sola kaydır",
      thumbs_scroll_next: "Küçük resimleri sağa kaydır",
      photo_n: "Fotoğraf",
      konum_placeholder: "Konum bilgisi",
      hero_slogan_before_region: "TURYAP ATAŞEHİR İMZA Gayrimenkul Danışmanı | ",
      hero_slogan_after_region: " uzmanı",
      hero_lead_1:
        "Doğru fiyatlandırma, güvenilir iletişim ve hızlı sonuç odaklı danışmanlık sunuyorum.",
      hero_lead_2: "Satılık ve kiralık ilanlar için hemen iletişime geçebilirsiniz.",
      stats_summary_label: "İlan sayıları özeti",
      about_cta_listings: "İlanlarımı inceleyin",
      about_intro_galleries:
        "Ödül plaketlerim ile gerçekleştirdiğim işlem belgelerinden seçilmiş görseller.",
    },
    en: {
      lang_switch_label: "Language",
      lang_btn_tr: "Turkish",
      lang_btn_en: "English",
      advisor_title: "TURYAP ATAŞEHİR İMZA — Real estate consultant",
      hero_slogan_mid: "Real estate consultant | ",
      hero_slogan_suffix: " specialist",
      skip_to_content: "Skip to content",
      nav_open: "Open menu",
      nav_main: "Main navigation",
      nav_home: "Home",
      nav_listings: "Listings",
      nav_about: "About",
      nav_contact: "Contact",
      discover_kicker_default: "Discover us in a few highlights",
      discover_cue_default: "Scroll down to enter the site",
      whatsapp_cta: "Message on WhatsApp",
      listings_cta: "My listings",
      about_cta: "About",
      contact_cta: "Contact",
      featured_title: "Featured listings",
      featured_intro:
        "Reach out for the latest price and details; listings are updated regularly.",
      view_all_listings: "View all listings",
      trust_1_h: "TURYAP ATAŞEHİR İMZA real estate brand",
      trust_1_p: "My brokerage — transparency and professional support throughout.",
      trust_2_h: "Up-to-date inventory",
      trust_2_p: "I keep the published portfolio monitored on a steady basis.",
      trust_3_h: "Prompt replies",
      trust_3_p: "Reach me by phone or WhatsApp.",
      reviews_title: "Client feedback",
      reviews_carousel_label: "Client feedback screenshots",
      reviews_prev: "Previous feedback",
      reviews_next: "Next feedback",
      review_alt: "Client feedback image",
      view_all_reviews: "View all feedback",
      reviews_add_yours: "Add your feedback",
      reviews_page_h1: "Client feedback",
      reviews_back_home: "← Back to home",
      reviews_page_empty: "No images yet.",
      reviews_page_lead:
        "Read approved feedback or fill in the form and send it to us via WhatsApp.",
      reviews_text_heading: "Published feedback",
      reviews_text_empty: "No published feedback yet. Be the first to send yours via WhatsApp.",
      reviews_photos_heading: "Client messages",
      reviews_photos_intro: "Tap an image to view it larger.",
      reviews_form_heading: "Share your feedback",
      reviews_form_intro: "Fill in the form and send it via WhatsApp. We will publish it after approval.",
      reviews_step_1: "Enter your name and feedback",
      reviews_step_2: "Send via WhatsApp",
      reviews_step_3: "Published on the site after approval",
      reviews_form_name_label: "Your name",
      reviews_form_name_ph: "e.g. Ayşe K.",
      reviews_form_comment_label: "Your feedback",
      reviews_form_comment_ph: "Briefly describe your experience…",
      reviews_form_submit: "Send via WhatsApp",
      reviews_form_wa_unavailable: "WhatsApp is unavailable. Please use the contact page.",
      reviews_form_err_name: "Please enter your name (at least 2 characters).",
      reviews_form_err_comment: "Please enter your feedback (at least 10 characters).",
      cta_bottom_html:
        "For details or an appointment: <a class=\"js-wa wa-inline\" href=\"#\">WhatsApp</a> or <a class=\"js-tel\" href=\"#\">phone</a>.",
      footer_role: " · TURYAP ATAŞEHİR İMZA — real estate consultant",
      fab_quick: "Quick contact",
      fab_open: "Open contact menu",
      fab_close: "Close contact menu",
      listings_page_title: "Listings",
      listings_page_lead:
        "Sales and rentals portfolio. Contact me anytime for pricing and particulars.",
      listings_filter_group: "Listing type",
      filter_all: "All",
      filter_sale: "For sale",
      filter_rent: "For rent",
      about_page_badge: "TURYAP ATAŞEHİR İMZA real estate brand",
      about_page_h1: "About me",
      about_page_lead: "Straightforward communication, solid pricing guidance, transparent process.",
      about_gallery_h2: "Awards and transactions",
      awards_h: "Awards",
      awards_tag: "Plaques and ceremony photos",
      works_h: "Transactions",
      works_tag: "Volume and achievement records",
      rotator_open_fs: "Open fullscreen",
      rotator_hint: "Click an image for full-size view.",
      rotator_prev: "Previous image",
      rotator_next: "Next image",
      about_lightbox_label: "Image preview",
      close: "Close",
      contact_page_h1: "Contact",
      contact_page_lead: "Reach me by phone, WhatsApp or email.",
      contact_phone: "Phone",
      contact_wa_btn: "Send a WhatsApp message",
      contact_ig_go: "Open Instagram",
      contact_sb_h: "sahibinden.com",
      contact_sb_go: "View on sahibinden.com",
      contact_email: "Email",
      contact_map_h: "Location",
      contact_map_iframe_title: "Office location — map",
      map_note_en:
        'To embed a map: open your place in Google Maps → Share → Embed a map → copy the iframe\'s src URL into <code style="font-size:0.9em">mapsEmbedUrl</code> in site-config.js.',
      detail_back: "← Back to listings",
      lightbox_photo_label: "Enlarged photo",
      lightbox_prev_ph: "Previous photo",
      lightbox_next_ph: "Next photo",
      discover_toggle_fs: "Enter the site",
      discover_toggle_shrink: "Enter the site — shrink preview",
      discover_toggle_expand: "Expand preview",
      discover_toggle_compact: "Shrink preview to slim strip",
      discover_toggle_other: "Change preview size",
      carousel_prev: "Previous",
      carousel_next: "Next",
      phone_fallback: "Add a phone number",
      ig_fallback: "@username",
      meta_home_title: "Home | Erol Erdoğar",
      meta_home_desc:
        "Erol Erdoğar — TURYAP ATAŞEHİR İMZA real estate consultant. Trusted guidance; sales and rental listings.",
      meta_listings_title: "Listings | Erol Erdoğar",
      meta_listings_desc: "Current sales and rentals — Erol Erdoğar, TURYAP ATAŞEHİR İMZA.",
      meta_about_title: "About | Erol Erdoğar",
      meta_about_desc:
        "Erol Erdoğar — Transaction leader at RE/MAX İmza, Stars Club member, consultant with TURYAP ATAŞEHİR İMZA.",
      meta_contact_title: "Contact | Erol Erdoğar",
      meta_contact_desc: "Contact — phone, WhatsApp, email.",
      meta_reviews_title: "Client feedback | Erol Erdoğar",
      meta_reviews_desc:
        "Client feedback and screenshots — Erol Erdoğar, TURYAP ATAŞEHİR İMZA real estate consultant.",
      meta_detail_title_suffix: " | Listing | Erol Erdoğar",
      meta_listing_not_found: "Listing not found | Erol Erdoğar",
      listing_badge_sale: "For sale",
      listing_badge_rent: "For rent",
      listing_meta_no_prefix: "Listing no.:",
      listing_about_heading: "About this listing",
      listing_video: "Video",
      listing_photo_big: "Large photos",
      listing_photo_progress: "photos",
      listing_map_heading: "Location",
      listing_map_iframe_suffix: "— map",
      listing_whatsapp: "WhatsApp",
      listing_call: "Call",
      listing_share: "Share",
      listing_share_copied: "Listing link copied",
      listing_share_fail: "Could not share",
      listing_all_card_badge: "All",
      listing_fallback_title: "Listing",
      listing_missing_title: "Listing not found",
      listing_missing_hint: "Check homeFeaturedSlots and matching ids in ilanlar-data.",
      stats_aria_suffix: " listings:",
      stats_total_label: "listings total",
      stats_aria: "Total {total} listings: {sat} for sale, {kir} for rent",
      thumbs_group: "Thumbnail group",
      thumbs_scroll_prev: "Scroll thumbnails left",
      thumbs_scroll_next: "Scroll thumbnails right",
      photo_n: "Photo",
      konum_placeholder: "Location details",
      hero_slogan_before_region: "TURYAP ATAŞEHİR İMZA real estate consultant | ",
      hero_slogan_after_region: " specialist",
      hero_lead_1:
        "I guide sales and rentals with fair pricing, clear communication and fast, results-focused support.",
      hero_lead_2: "Get in touch any time about current listings.",
      stats_summary_label: "Listing count summary",
      about_cta_listings: "Browse my listings",
      about_intro_galleries:
        "A curated look at plaques and ceremonies, alongside selected transaction snapshots.",
    },
  };

  var DISCOVER_EN = {
    kicker: "TURYAP ATAŞEHİR İMZA | Reliable, results-focused consultancy",
    discoverInviteLine: "Erol Erdoğar",
    discoverInviteSub: "TURYAP ATAŞEHİR İMZA — Real estate consultant",
    barSummary:
      "Erol Erdoğar · TURYAP ATAŞEHİR İMZA consultant · Kadıköy, Ataşehir, Fikirtepe",
    facts: [
      "Erol Erdoğar — TURYAP ATAŞEHİR İMZA real estate consultant",
      "9+ years on the ground · Kadıköy, Ataşehir and Fikirtepe neighbourhood focus",
      "RE/MAX İmza #1 producer 2021, 2022 and 2023 · Stars Club member",
      "Top-ranked transaction performance in 2019 and 2020",
      "Sales & rentals with honest pricing, clear process and fast follow-up",
    ],
    scrollCue: "",
    carouselSlides: [
      {
        title: "Erol Erdoğar",
        text:
          "As a TURYAP ATAŞEHİR İMZA consultant I offer dependable, end-to-end guidance on sales and rentals — structured, transparent and professional.",
      },
      {
        title: "Local expertise",
        text:
          "Focused on Kadıköy, Ataşehir and Fikirtepe: location insight, market-based pricing and efficient buyer–tenant matching.",
      },
      {
        title: "Track record",
        text:
          "RE/MAX İmza #1 producer in 2021–2023; Stars Club member with consistent award-level performance in prior years.",
      },
      {
        title: "Contact",
        text:
          "For portfolio strategy, valuations or viewings, reach me easily on WhatsApp, phone or social channels.",
      },
    ],
  };

  var SITE_OVERLAY_EN = {
    regionLabel: "Fikirtepe, Kadıköy and Ataşehir",
    whatsappMessage:
      "Hello Mr. Erdoğar, I would like more information about your listings.",
    homeFeaturedAllTitle: "Other listings in the portfolio",
    homeFeaturedAllPrice: "Current list",
    homeFeaturedAllLoc: "All properties for sale and rent",
    contactFab: {
      panelLabel: "Quick contact",
      labelInstagram: "Instagram",
      labelWhatsapp: "Message on WhatsApp",
      labelLinkedin: "LinkedIn",
      labelSahibinden: "sahibinden.com",
    },
  };

  /** Common Turkish spec labels → English */
  var SPEC_LABEL_EN = {
    "Emlak tipi": "Property type",
    "m² (Brüt / Net)": "m² (gross / net)",
    "m² (Net)": "m² (net)",
    "Oda sayısı": "Rooms",
    "Bina yaşı": "Building age",
    "Bina Yaşı": "Building age",
    "Bulunduğu kat": "Floor",
    "Kat sayısı": "Total floors",
    "Isıtma": "Heating",
    "Banyo Sayısı": "Bathrooms",
    "Mutfak": "Kitchen",
    "Balkon": "Balcony",
    "Asansör": "Elevator",
    "Otopark": "Parking",
    "Eşyalı": "Furnished",
    "Kullanım Durumu": "Occupancy",
    "Site İçerisinde": "In a gated community",
    "Site Adı": "Complex name",
    "Aidat (TL)": "Monthly fee (TRY)",
    "Depozito (TL)": "Deposit (TRY)",
    "Krediye Uygun": "Mortgage eligible",
    "Tapu Durumu": "Title deed status",
    "Kimden": "Listed by",
    "Takas": "Swap / trade",
    "İmar durumu": "Zoning status",
    "m²": "m²",
    "m² fiyatı": "Price per m²",
    "Ada no": "Island (block) no.",
    "Parsel no": "Parcel no.",
    "Pafta no": "Sheet no.",
    "Kaks (emsal)": "FAR / floor area ratio",
    Gabari: "Height limit",
    "Enerji Kimlik Belgesi": "Energy performance certificate",
    Kategori: "Category",
    Durumu: "Status",
    Türü: "Type",
    "Bölüm & Oda Sayısı": "Sections & rooms",
    "Masa Sayısı": "Table count",
    "Alkol ruhsatı": "Alcohol licence",
  };

  var SPEC_VALUE_EN = {
    Var: "Yes",
    Yok: "No",
    Evet: "Yes",
    Hayır: "No",
    "Satılık daire": "Apartment for sale",
    "Kiralık daire": "Apartment for rent",
    "Satılık arsa": "Land for sale",
    "Satılık dükkan": "Retail unit for sale",
    "Kiralık dükkan": "Retail unit for rent",
    "Kiralık işyeri": "Commercial space for rent",
    "Kiralık iş yeri": "Commercial space for rent",
    "Satılık işyeri": "Commercial space for sale",
    Kiracılı: "Tenant-occupied",
    Belirtilmemiş: "Not specified",
    "Emlak Ofisinden": "Estate agency",
    "Kat Mülkiyetli": "Condominium title",
    "Kat Mülkiyeti": "Condominium title",
    "Kat İrtifaklı": "Construction servitude",
    "Müstakil Tapu": "Freehold parcel",
    Boş: "Vacant",
    "Mülk sahibi": "Owner-occupied / owner use",
    Kapalı: "Closed / separate",
    "Açık (Amerikan)": "Open-plan (American kitchen)",
    "Yerden Isıtma": "Underfloor heating",
    "Kombi (Doğalgaz)": "Combi boiler (natural gas)",
    "Merkezi (Pay Ölçer)": "Central (metered share)",
    "Açık & Kapalı Otopark": "Outdoor & indoor parking",
    "Kapalı Otopark": "Indoor parking",
    "Açık Otopark": "Outdoor parking",
    "Bahçe katı": "Ground / garden level",
    "Yüksek giriş": "Raised ground",
    "30 ve üzeri": "30+",
    "Tarla + Bağ": "Field + vineyard",
    Konut: "Residential zoning",
    "Stüdyo (1+0)": "Studio (1+0)",
    "İş Yeri": "Commercial property",
    Satılık: "For sale",
    Kiralık: "For rent",
    "Dükkan & Mağaza": "Shop & retail unit",
    "Restoran & Lokanta": "Restaurant & dining",
    "Kafe & Bar": "Café & bar",
    "İkinci El": "Pre-owned",
    Klima: "Air conditioning",
    "6–10 arası": "~6–10 yrs (building age)",
    "5–10 arası": "~5–10 yrs (building age)",
    "5-10 arası": "~5–10 yrs (building age)",
    "11–15 arası": "~11–15 yrs (building age)",
    "16–20 arası": "~16–20 yrs (building age)",
    "21–25 arası": "~21–25 yrs (building age)",
    "0,75": "0.75",
    "527 TL": "527 TRY",
    "7.825 TL": "7,825 TRY",
    "9.750": "9,750 TRY",
    "9.900": "9,900 TRY",
    "7.500": "7,500 TRY",
    "6.000": "6,000 TRY",
    "2.350": "2,350 TRY",
    "600": "600 TRY",
    "30.000": "30,000 TRY",
    "300.000": "300,000 TRY",
  };

  function getLocale() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s && VALID[s]) return s;
    } catch (e) {}
    return "tr";
  }

  function setLocale(lang) {
    if (!VALID[lang]) lang = "tr";
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    document.documentElement.lang = lang === "en" ? "en" : "tr";
    try {
      document.dispatchEvent(new CustomEvent("site-locale-change", { detail: { lang: lang } }));
    } catch (e) {}
  }

  function t(key) {
    var loc = getLocale();
    var pack = STRINGS[loc] || STRINGS.tr;
    return Object.prototype.hasOwnProperty.call(pack, key) ? pack[key] : STRINGS.tr[key] || key;
  }

  function format(key, vars) {
    var s = String(t(key));
    if (!vars) return s;
    Object.keys(vars).forEach(function (k) {
      s = s.split("{" + k + "}").join(String(vars[k]));
    });
    return s;
  }

  function applyDiscoverStripLocalized(root) {
    if (!root || getLocale() !== "en") return;
    var ds = DISCOVER_EN;
    var kickerEl = root.querySelector(".js-discover-kicker");
    var inviteLineEl = root.querySelector(".js-discover-invite-line");
    var inviteSubEl = root.querySelector(".js-discover-invite-sub");
    var cueEl = root.querySelector(".js-discover-cue");
    var barText = root.querySelector(".js-discover-bar-text");
    var factsEl = root.querySelector(".js-discover-facts");
    if (kickerEl && ds.kicker) kickerEl.textContent = ds.kicker;
    if (inviteLineEl && ds.discoverInviteLine) inviteLineEl.textContent = ds.discoverInviteLine;
    if (inviteSubEl && ds.discoverInviteSub) inviteSubEl.textContent = ds.discoverInviteSub;
    if (cueEl) {
      var sc = String(ds.scrollCue != null ? ds.scrollCue : "").trim();
      if (sc) {
        cueEl.removeAttribute("hidden");
        var cueSpan = cueEl.querySelector(".js-discover-cue");
        if (cueSpan) cueSpan.textContent = sc;
      }
    }
    if (factsEl && ds.facts && ds.facts.length) {
      function esc(s) {
        return String(s == null ? "" : s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      factsEl.innerHTML = ds.facts
        .map(function (f) {
          return "<li>" + esc(f) + "</li>";
        })
        .join("");
    }
    if (barText && ds.barSummary) barText.textContent = ds.barSummary;

    var carTrack = root.querySelector(".js-discover-carousel-track");
    if (carTrack && ds.carouselSlides && ds.carouselSlides.length) {
      function esc2(s) {
        return String(s == null ? "" : s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      carTrack.innerHTML = ds.carouselSlides
        .map(function (s) {
          var title = s.title != null ? String(s.title) : "";
          var text = s.text != null ? String(s.text) : "";
          return (
            '<div class="discover-strip-carousel-slide"><strong>' +
            esc2(title) +
            "</strong><span>" +
            esc2(text) +
            "</span></div>"
          );
        })
        .join("");
      root._discoverCarouselSlideCount = carTrack.children.length;
    }
  }

  function translateSpecRows(specs) {
    if (!specs || !specs.length || getLocale() !== "en") return specs;
    function lookupLabel(lk) {
      var k = String(lk || "").trim().replace(/\s+/g, " ");
      if (SPEC_LABEL_EN[k]) return SPEC_LABEL_EN[k];
      if (k === "Bina Yaşı") return SPEC_LABEL_EN["Bina yaşı"];
      return lk;
    }
    function normalizeDashes(s) {
      return String(s).replace(/\u2013|\u2014/g, "-");
    }
    function lookupValue(lv) {
      var k = String(lv || "").trim().replace(/\s+/g, " ");
      if (SPEC_VALUE_EN[k]) return SPEC_VALUE_EN[k];
      var kHyp = normalizeDashes(k);
      if (kHyp !== k && SPEC_VALUE_EN[kHyp]) return SPEC_VALUE_EN[kHyp];
      var kEn = kHyp.replace(/-/g, "\u2013");
      if (SPEC_VALUE_EN[kEn]) return SPEC_VALUE_EN[kEn];
      var age = k.match(/^(\d+)[\u2013\-](\d+)\s+arası$/);
      if (age) return "~" + age[1] + "\u2013" + age[2] + " yrs (building age)";
      return lv;
    }
    return specs.map(function (row) {
      var lk = row.label != null ? String(row.label).trim() : "";
      var lv = row.value != null ? String(row.value).trim() : "";
      return {
        label: lookupLabel(lk),
        value: lookupValue(lv),
      };
    });
  }

  function listingForLocale(l) {
    if (!l || getLocale() !== "en" || typeof ILANLAR_EN_BY_ID === "undefined") return l;
    var en = ILANLAR_EN_BY_ID[l.id];
    if (!en) return l;
    var out = Object.assign({}, l, {
      title: en.title || l.title,
      description: en.description != null ? en.description : l.description,
      location: en.location || l.location,
      cardLocationShort: en.cardLocationShort != null ? en.cardLocationShort : l.cardLocationShort,
      listingDate: en.listingDate != null ? en.listingDate : l.listingDate,
      specs: l.specs ? translateSpecRows(l.specs) : l.specs,
    });
    return out;
  }

  function overlaySiteForLocale() {
    if (typeof SITE === "undefined") return;
    if (getLocale() !== "en") return;
    var o = SITE_OVERLAY_EN;
    if (o.regionLabel) SITE.regionLabel = o.regionLabel;
    if (o.whatsappMessage) SITE.whatsappMessage = o.whatsappMessage;
    if (o.homeFeaturedAllTitle) SITE.homeFeaturedAllTitle = o.homeFeaturedAllTitle;
    if (o.homeFeaturedAllPrice) SITE.homeFeaturedAllPrice = o.homeFeaturedAllPrice;
    if (o.homeFeaturedAllLoc) SITE.homeFeaturedAllLoc = o.homeFeaturedAllLoc;
    if (o.contactFab && SITE.contactFab) {
      var cf = o.contactFab;
      if (cf.panelLabel != null) SITE.contactFab.panelLabel = cf.panelLabel;
      if (cf.labelInstagram != null) SITE.contactFab.labelInstagram = cf.labelInstagram;
      if (cf.labelWhatsapp != null) SITE.contactFab.labelWhatsapp = cf.labelWhatsapp;
      if (cf.labelLinkedin != null) SITE.contactFab.labelLinkedin = cf.labelLinkedin;
      if (cf.labelSahibinden != null) SITE.contactFab.labelSahibinden = cf.labelSahibinden;
    }
    var ds = SITE.discoverStrip;
    if (ds && getLocale() === "en" && DISCOVER_EN) {
      if (DISCOVER_EN.kicker) ds.kicker = DISCOVER_EN.kicker;
      if (DISCOVER_EN.discoverInviteLine) ds.discoverInviteLine = DISCOVER_EN.discoverInviteLine;
      if (DISCOVER_EN.discoverInviteSub) ds.discoverInviteSub = DISCOVER_EN.discoverInviteSub;
      if (DISCOVER_EN.barSummary) ds.barSummary = DISCOVER_EN.barSummary;
      if (DISCOVER_EN.facts) ds.facts = DISCOVER_EN.facts.slice();
      if (DISCOVER_EN.carouselSlides) ds.carouselSlides = DISCOVER_EN.carouselSlides.map(function (x) {
        return { title: x.title, text: x.text };
      });
      if (DISCOVER_EN.scrollCue !== undefined) ds.scrollCue = DISCOVER_EN.scrollCue;
    }
  }

  function applyI18nPanels() {
    var loc = getLocale();
    document.querySelectorAll("[data-i18n-panel]").forEach(function (el) {
      var p = el.getAttribute("data-i18n-panel");
      if (p === loc) {
        el.removeAttribute("hidden");
      } else {
        el.setAttribute("hidden", "");
      }
    });
  }

  function applyDataI18nAttributes() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      el.innerHTML = t(key);
    });
    document.querySelectorAll("[data-i18n-text]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-text");
      if (key) el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var raw = el.getAttribute("data-i18n-attr");
      if (!raw) return;
      var parts = raw.split("|");
      for (var i = 0; i < parts.length; i++) {
        var seg = parts[i].split(":");
        if (seg.length >= 2) {
          var attr = seg[0].trim();
          var key = seg.slice(1).join(":").trim();
          el.setAttribute(attr, t(key));
        }
      }
    });
  }

  function applyPageMeta() {
    var path = (location.pathname || "").replace(/\\/g, "/").split("/").pop() || "";
    if (!path) path = "index.html";
    var loc = getLocale();
    var metaKey = "meta_home";
    if (path === "ilanlar.html") metaKey = "listings";
    else if (path === "hakkimda.html") metaKey = "about";
    else if (path === "iletisim.html") metaKey = "contact";
    else if (path === "musteri-yorumlari.html") metaKey = "reviews";
    else if (path === "ilan-detay.html") return;
    else if (path === "index.html" || path === "") metaKey = "home";

    var titleKey = "meta_" + metaKey + "_title";
    var descKey = "meta_" + metaKey + "_desc";
    if (STRINGS[loc] && STRINGS[loc][titleKey]) {
      document.title = t(titleKey);
    }
    var m = document.querySelector('meta[name="description"]');
    if (m && STRINGS[loc] && STRINGS[loc][descKey]) {
      m.setAttribute("content", t(descKey));
    }
  }

  function buildLangSwitcher() {
    var loc = getLocale();
    var wrap = document.createElement("div");
    wrap.className = "lang-switch";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", t("lang_switch_label"));

    function flagImg(src) {
      return (
        '<img class="lang-switch-flag-img" src="' +
        src +
        '" width="20" height="14" alt="" decoding="async" />'
      );
    }

    function btn(code, flagHtml, ariaKey, shortLabel) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lang-switch-btn" + (loc === code ? " is-active" : "");
      b.setAttribute("data-set-lang", code);
      b.setAttribute("aria-pressed", loc === code ? "true" : "false");
      b.setAttribute("aria-label", t(ariaKey));
      b.innerHTML =
        '<span class="lang-switch-btn-visual" aria-hidden="true">' +
        '<span class="lang-switch-flag lang-switch-flag--icons">' +
        flagHtml +
        "</span>" +
        '<span class="lang-switch-code">' +
        shortLabel +
        "</span>" +
        "</span>";
      return b;
    }

    wrap.appendChild(btn("tr", flagImg("assets/flags/tr.svg"), "lang_btn_tr", "TR"));
    wrap.appendChild(
      btn(
        "en",
        flagImg("assets/flags/gb.svg") + flagImg("assets/flags/us.svg"),
        "lang_btn_en",
        "EN"
      )
    );
    return wrap;
  }

  function bindLangSwitcher(root) {
    if (!root) return;
    root.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        var lang = b.getAttribute("data-set-lang");
        if (!VALID[lang]) return;
        setLocale(lang);
        window.location.reload();
      });
    });
  }

  function mountLangSwitchers() {
    var hosts = document.querySelectorAll("[data-lang-host]");
    hosts.forEach(function (host) {
      host.innerHTML = "";
      var sw = buildLangSwitcher();
      host.appendChild(sw);
      bindLangSwitcher(host);
    });
  }

  function applyNavAndChrome() {
    document.querySelectorAll(".skip-link[href]").forEach(function (a) {
      a.textContent = t("skip_to_content");
    });
    document.querySelectorAll(".nav-toggle").forEach(function (bt) {
      bt.setAttribute("aria-label", t("nav_open"));
    });
    document.querySelectorAll("#site-nav.site-nav").forEach(function (nav) {
      nav.setAttribute("aria-label", t("nav_main"));
    });

    document.querySelectorAll(".site-nav a[href]").forEach(function (a) {
      var href = (a.getAttribute("href") || "").split("#")[0].split("?")[0].trim().toLowerCase();
      var tail = href.split("/").pop();
      if (tail === "index.html" || tail === "") {
        a.textContent = t("nav_home");
      } else if (tail === "ilanlar.html" || tail.indexOf("ilanlar") === 0) {
        a.textContent = t("nav_listings");
      } else if (tail === "hakkimda.html" || tail.indexOf("hakkimda") === 0) {
        a.textContent = t("nav_about");
      } else if (tail === "iletisim.html" || tail.indexOf("iletisim") === 0) {
        a.textContent = t("nav_contact");
      }
    });

    var waBtns = document.querySelectorAll(".js-wa:not(.wa-inline)");
    waBtns.forEach(function (a) {
      if (a.classList.contains("btn-wa")) {
        if (!a.hasAttribute("data-i18n-text")) {
          a.textContent = t("whatsapp_cta");
        }
      }
    });

    document.querySelectorAll('.hero-actions a[href="ilanlar.html"].btn-primary').forEach(function (x) {
      x.textContent = t("listings_cta");
    });
    document.querySelectorAll('.hero-actions a[href="hakkimda.html"]').forEach(function (x) {
      x.textContent = t("about_cta");
    });
    document.querySelectorAll('.hero-actions a[href="iletisim.html"]').forEach(function (x) {
      x.textContent = t("contact_cta");
    });
  }

  function applyFirstPaint() {
    overlaySiteForLocale();
    applyI18nPanels();
    applyDataI18nAttributes();
    applyPageMeta();
    mountLangSwitchers();
    applyNavAndChrome();

    document.querySelectorAll("[data-i18n-hero-slogan]").forEach(function (el) {
      var which = el.getAttribute("data-i18n-hero-slogan");
      if (which === "before") el.textContent = t("hero_slogan_before_region");
      if (which === "after") el.textContent = t("hero_slogan_after_region");
    });

    var dk = document.querySelector(".js-discover-kicker");
    if (dk && getLocale() === "tr" && (!dk.textContent || dk.textContent.indexOf("Kısa") === 0)) {
      dk.textContent = t("discover_kicker_default");
    }
    var dc = document.querySelector(".discover-strip-cue .js-discover-cue");
    if (dc && getLocale() === "tr" && !dc.textContent.trim()) {
      dc.textContent = t("discover_cue_default");
    }
  }

  window.I18N = {
    STORAGE_KEY: STORAGE_KEY,
    getLocale: getLocale,
    setLocale: setLocale,
    t: t,
    format: format,
    applyDiscoverStripLocalized: applyDiscoverStripLocalized,
    overlaySiteForLocale: overlaySiteForLocale,
    listingForLocale: listingForLocale,
    translateSpecRows: translateSpecRows,
    applyFirstPaint: applyFirstPaint,
    applyMapNote: function () {
      var note = document.querySelector(".js-map-note");
      if (!note || typeof SITE === "undefined") return;
      if (!SITE.mapsEmbedUrl || SITE.mapsEmbedUrl.length < 10) {
        note.innerHTML = getLocale() === "en" ? t("map_note_en") : t("map_note_tr");
      }
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyFirstPaint);
  } else {
    applyFirstPaint();
  }
})();
