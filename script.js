(function () {
  function dispatchIntroFinished() {
    try {
      document.dispatchEvent(new CustomEvent("intro-finished", { bubbles: true }));
    } catch (e) {
      // ignore
    }
  }

  function runHomepageIntro() {
    var intro = document.getElementById("intro-screen");
    if (!intro) return;

    var navEntry = performance.getEntriesByType("navigation")[0];
    var navType = navEntry && navEntry.type ? navEntry.type : "navigate";
    var isReload = navType === "reload";

    var fromInternalPage = false;
    try {
      var ref = document.referrer;
      if (ref) {
        var refUrl = new URL(ref);
        if (refUrl.origin === location.origin) {
          var p = refUrl.pathname.toLowerCase();
          if (
            p.endsWith("ilanlar.html") ||
            p.endsWith("ilan-detay.html") ||
            p.endsWith("hakkimda.html") ||
            p.endsWith("iletisim.html") ||
            p.endsWith("musteri-yorumlari.html")
          ) {
            fromInternalPage = true;
          }
        }
      }
    } catch (e) {
      fromInternalPage = false;
    }

    var entryKey = "turyap_intro_entry_done";
    var entryDone = false;
    try {
      entryDone = sessionStorage.getItem(entryKey) === "1";
    } catch (e) {
      entryDone = false;
    }

    var showIntro = isReload || (!fromInternalPage && !entryDone);

    if (!showIntro) {
      intro.remove();
      dispatchIntroFinished();
      return;
    }

    var introDuration = (typeof SITE !== "undefined" && Number(SITE.introDurationMs)) || 1700;
    var fadeDuration = (typeof SITE !== "undefined" && Number(SITE.introFadeMs)) || 800;
    var enterMs = (typeof SITE !== "undefined" && Number(SITE.introEnterMs)) || 1650;
    if (!Number.isNaN(enterMs) && enterMs > 0) {
      intro.style.setProperty("--intro-enter", enterMs + "ms");
    }
    var overlayOpacity = (typeof SITE !== "undefined" && Number(SITE.introOverlayOpacity));
    var bgImage = (typeof SITE !== "undefined" && SITE.introBackgroundImage) || "";
    var introLogoPath = (typeof SITE !== "undefined" && SITE.introLogoImage) || "";
    var introLogoEl = intro.querySelector(".intro-logo");
    if (introLogoEl && introLogoPath) {
      introLogoEl.setAttribute("src", introLogoPath);
    }
    if (bgImage) {
      intro.style.setProperty("--intro-bg-image", "url('" + bgImage + "')");
    }
    if (!Number.isNaN(overlayOpacity)) {
      var clamped = Math.max(0, Math.min(1, overlayOpacity));
      intro.style.setProperty("--intro-overlay-opacity", String(clamped));
    }
    intro.style.setProperty("--intro-fade", fadeDuration + "ms");

    document.body.classList.add("intro-lock");
    window.setTimeout(function () {
      intro.classList.add("is-done");
      document.body.classList.remove("intro-lock");
      dispatchIntroFinished();
      window.setTimeout(function () {
        intro.remove();
      }, fadeDuration);
    }, introDuration);

    try {
      if (!isReload) {
        sessionStorage.setItem(entryKey, "1");
      }
    } catch (e) {
      // ignore storage errors
    }
  }

  function waUrl() {
    if (typeof SITE === "undefined") return "#";
    var num = String(SITE.whatsappE164 || "").replace(/\D/g, "");
    var text = encodeURIComponent(SITE.whatsappMessage || "Merhaba");
    return num ? "https://wa.me/" + num + "?text=" + text : "#";
  }

  function escapeHtmlLite(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderContactFabPanels() {
    if (typeof SITE === "undefined") return;

    var cf = SITE.contactFab;
    var roots = document.querySelectorAll("[data-contact-fab]");
    if (!roots.length) return;

    if (cf && cf.enabled === false) {
      roots.forEach(function (root) {
        root.setAttribute("hidden", "");
      });
      return;
    }

    roots.forEach(function (root) {
      root.removeAttribute("hidden");
    });

    var def = {
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
    };

    function opt(key) {
      return cf && cf[key] !== undefined ? cf[key] : def[key];
    }

    var wa = waUrl();
    var ig = String(SITE.instagramUrl || "").trim();
    var li = String(SITE.linkedinUrl || "").trim();
    var sb = String(SITE.sahibindenUrl || "").trim();
    var tel = SITE.phoneTel || "";

    var byKind = {};

    if (opt("showInstagram") && ig.indexOf("http") === 0) {
      byKind.ig = {
        kind: "ig",
        href: ig,
        label: String(opt("labelInstagram") || def.labelInstagram),
        blank: true,
      };
    }
    if (opt("showWhatsapp") && wa !== "#") {
      byKind.wa = {
        kind: "wa",
        href: wa,
        label: String(opt("labelWhatsapp") || def.labelWhatsapp),
        blank: true,
      };
    }
    if (opt("showLinkedin") && li.indexOf("http") === 0) {
      byKind.li = {
        kind: "li",
        href: li,
        label: String(opt("labelLinkedin") || def.labelLinkedin),
        blank: true,
      };
    }
    if (opt("showSahibinden") && sb.indexOf("http") === 0) {
      byKind.sb = {
        kind: "sb",
        href: sb,
        label: String(opt("labelSahibinden") || def.labelSahibinden),
        blank: true,
      };
    }
    if (opt("showPhone") && tel) {
      var phoneLabel = String(opt("labelPhone") || "").trim();
      if (!phoneLabel) {
        phoneLabel = SITE.phoneDisplay || tel;
      }
      byKind.tel = {
        kind: "tel",
        href: "tel:" + String(tel).replace(/\s/g, ""),
        label: phoneLabel,
        blank: false,
      };
    }

    var stackTopToBottom = ["li", "sb", "ig", "wa", "tel"];
    var allowedKind = { li: 1, sb: 1, ig: 1, wa: 1, tel: 1 };
    var customOrder = cf && cf.itemOrder;
    if (customOrder && customOrder.length) {
      var filtered = customOrder.filter(function (k) {
        return allowedKind[k];
      });
      if (filtered.length) {
        stackTopToBottom = filtered;
      }
    }
    var ordered = [];
    for (var oi = 0; oi < stackTopToBottom.length; oi++) {
      var k = stackTopToBottom[oi];
      if (byKind[k]) {
        ordered.push(byKind[k]);
      }
    }

    var panelLabel = String(opt("panelLabel") || def.panelLabel);
    var html =
      ordered.length === 0
        ? ""
        : ordered
            .map(function (r) {
              var rel = r.blank ? ' target="_blank" rel="noopener noreferrer"' : "";
              return (
                '<a class="contact-fab-bubble contact-fab-bubble--' +
                r.kind +
                '" href="' +
                escapeHtmlLite(r.href) +
                '"' +
                rel +
                ' aria-label="' +
                escapeHtmlLite(r.label) +
                '"><span class="contact-fab-bubble-icon" aria-hidden="true"></span></a>'
              );
            })
            .join("");

    roots.forEach(function (root) {
      var panel = root.querySelector(".contact-fab-panel");
      if (!panel) return;
      panel.setAttribute("aria-label", panelLabel);
      panel.innerHTML = html;
      if (!ordered.length) {
        panel.setAttribute("hidden", "");
        root.setAttribute("hidden", "");
      } else {
        panel.removeAttribute("hidden");
        root.removeAttribute("hidden");
      }
    });
  }

  function renderHomeFeaturedListings() {
    var root = document.getElementById("home-featured-root");
    if (!root || typeof ILANLAR_DATA === "undefined" || typeof SITE === "undefined") return;

    function escapeHtml(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function listingByIdHome(id) {
      for (var i = 0; i < ILANLAR_DATA.length; i++) {
        if (String(ILANLAR_DATA[i].id) === String(id)) return ILANLAR_DATA[i];
      }
      return null;
    }

    function firstPhotoSrc(l) {
      var raw = l && l.photos ? l.photos : [];
      for (var i = 0; i < raw.length; i++) {
        var p = String(raw[i] || "").trim();
        if (p) return p;
      }
      return "";
    }

    function featuredLocListing(l) {
      if (typeof window.I18N !== "undefined") return window.I18N.listingForLocale(l);
      return l;
    }

    function tFeat(key) {
      if (typeof window.I18N !== "undefined") return window.I18N.t(key);
      var map = {
        listing_badge_rent: "Kiralık",
        listing_badge_sale: "Satılık",
        listing_fallback_title: "İlan",
        konum_placeholder: "Konum bilgisi",
        listing_missing_title: "İlan bulunamadı",
        listing_missing_hint: "site-config homeFeaturedSlots ve ilanlar-data id eşleşmesini kontrol edin.",
        listing_all_card_badge: "Tümü",
      };
      return map[key] || key;
    }

    function compactLocLineFrom(F) {
      var a = String(F.cardLocationShort || "").trim();
      var b = String(F.location || "").trim();
      return a || b || "";
    }

    function cardFromListing(l) {
      var F = featuredLocListing(l);
      var src = firstPhotoSrc(l);
      var badgeClass = l.type === "kiralik" ? "listing-badge--rent" : "listing-badge--sale";
      var badgeText = l.type === "kiralik" ? tFeat("listing_badge_rent") : tFeat("listing_badge_sale");
      var imgBlock = src
        ? '<div class="listing-card-img"><img class="listing-card-img-el" src="' +
          escapeHtml(src) +
          '" alt="" loading="lazy" decoding="async" /></div>'
        : '<div class="listing-card-img listing-card-img--placeholder" aria-hidden="true"></div>';
      var loc = compactLocLineFrom(F);
      return (
        '<article class="listing-card listing-card--compact" data-type="' +
        escapeHtml(l.type) +
        '">' +
        '<a href="ilan-detay.html?id=' +
        encodeURIComponent(l.id) +
        '" class="listing-card-link">' +
        imgBlock +
        '<div class="listing-card-body">' +
        '<span class="listing-badge ' +
        badgeClass +
        '">' +
        escapeHtml(badgeText) +
        "</span>" +
        "<h3>" +
        escapeHtml(F.title || tFeat("listing_fallback_title")) +
        "</h3>" +
        '<p class="listing-price">' +
        escapeHtml(l.price || "—") +
        "</p>" +
        '<p class="listing-loc">' +
        escapeHtml(loc || tFeat("konum_placeholder")) +
        "</p>" +
        "</div></a></article>"
      );
    }

    function cardMissingId(rawId) {
      return (
        '<article class="listing-card listing-card--compact">' +
        '<a href="ilanlar.html" class="listing-card-link">' +
        '<div class="listing-card-img listing-card-img--placeholder" aria-hidden="true"></div>' +
        '<div class="listing-card-body">' +
        '<span class="listing-badge listing-badge--sale">' +
        escapeHtml(tFeat("listing_fallback_title")) +
        "</span>" +
        "<h3>" +
        escapeHtml(tFeat("listing_missing_title")) +
        "</h3>" +
        '<p class="listing-price">ID: ' +
        escapeHtml(rawId) +
        "</p>" +
        '<p class="listing-loc">' +
        escapeHtml(tFeat("listing_missing_hint")) +
        "</p>" +
        "</div></a></article>"
      );
    }

    function cardAll() {
      var title = SITE.homeFeaturedAllTitle || "Tüm ilanlar";
      var price = SITE.homeFeaturedAllPrice || "Güncel liste";
      var loc = SITE.homeFeaturedAllLoc || "";
      var img = String(SITE.homeFeaturedAllImage || "").trim();
      var imgBlock = img
        ? '<div class="listing-card-img"><img class="listing-card-img-el" src="' +
          escapeHtml(img) +
          '" alt="" loading="lazy" decoding="async" /></div>'
        : '<div class="listing-card-img listing-card-img--placeholder" aria-hidden="true"></div>';
      return (
        '<article class="listing-card listing-card--compact">' +
        '<a href="ilanlar.html" class="listing-card-link">' +
        imgBlock +
        '<div class="listing-card-body">' +
        '<span class="listing-badge listing-badge--sale">' +
        escapeHtml(tFeat("listing_all_card_badge")) +
        "</span>" +
        "<h3>" +
        escapeHtml(title) +
        "</h3>" +
        '<p class="listing-price">' +
        escapeHtml(price) +
        "</p>" +
        '<p class="listing-loc">' +
        escapeHtml(loc) +
        "</p>" +
        "</div></a></article>"
      );
    }

    var rawSlots = SITE.homeFeaturedSlots;
    if (!rawSlots || !rawSlots.length) {
      rawSlots = ["1", "2", "all"];
    }
    var slots = rawSlots.slice(0, 3).map(function (s) {
      return String(s == null ? "" : s).trim();
    });
    while (slots.length < 3) {
      slots.push("all");
    }

    root.innerHTML = slots
      .map(function (spec) {
        if (!spec || spec.toLowerCase() === "all") return cardAll();
        var L = listingByIdHome(spec);
        return L ? cardFromListing(L) : cardMissingId(spec);
      })
      .join("");
  }

  function initDiscoverStrip(root) {
    if (!root || root.dataset.discoverInited === "1") return;
    if (typeof SITE === "undefined") return;
    var ds = SITE.discoverStrip;
    if (!ds || ds.enabled === false) return;

    root.dataset.discoverInited = "1";

    var bgs = root.querySelector(".discover-strip-bgs");
    var factsEl = root.querySelector(".js-discover-facts");
    var kickerEl = root.querySelector(".js-discover-kicker");
    var cueEl = root.querySelector(".js-discover-cue");
    var barText = root.querySelector(".js-discover-bar-text");
    var panel = document.getElementById("discover-strip-panel");
    var toggleBtn = document.getElementById("discover-strip-toggle");

    var peekCss = String(ds.peekHeightCss || "").trim();
    if (peekCss) {
      document.documentElement.style.setProperty("--discover-peek-h", peekCss);
    }
    var tallCss = String(ds.dockTallMinCss || "").trim();
    if (tallCss) {
      document.documentElement.style.setProperty("--discover-dock-tall", tallCss);
    }

    function measurePeekPx() {
      var m = document.createElement("div");
      m.setAttribute("aria-hidden", "true");
      m.style.cssText =
        "position:absolute;left:-10000px;top:0;height:var(--discover-peek-h);width:1px;pointer-events:none;visibility:hidden";
      document.body.appendChild(m);
      var h = m.offsetHeight;
      m.remove();
      return h > 48 ? h : Math.round(window.innerHeight * 0.21);
    }

    var peekPx = measurePeekPx();
    root._discoverPeekPx = peekPx;

    var scrollRatio = Number(ds.shrinkScrollRatio);
    if (Number.isNaN(scrollRatio) || scrollRatio <= 0.08 || scrollRatio > 1.2) scrollRatio = 0.3;
    var headEl = document.querySelector(".site-header");
    var headH = headEl ? headEl.offsetHeight : 0;
    function computeScrollDenom() {
      var vh = window.innerHeight;
      var core = Math.round((vh - peekPx) * scrollRatio);
      return Math.max(100, core + Math.round(headH * 0.28));
    }
    var scrollDenom = computeScrollDenom();
    var spacerEl = document.getElementById("discover-fs-spacer");
    var fsProgress = 0;
    var fsProgressTarget = 0;
    var fsAnimRaf = 0;
    var touchStartY = null;
    var touchActive = false;
    var lockedOverflow = "";

    if (kickerEl && ds.kicker) kickerEl.textContent = String(ds.kicker);
    var inviteLineEl = root.querySelector(".js-discover-invite-line");
    var inviteSubEl = root.querySelector(".js-discover-invite-sub");
    if (inviteLineEl) {
      inviteLineEl.textContent = String(ds.discoverInviteLine != null ? ds.discoverInviteLine : "Discover us");
    }
    if (inviteSubEl) {
      inviteSubEl.textContent = String(
        ds.discoverInviteSub != null ? ds.discoverInviteSub : "Scroll down to explore the site"
      );
    }
    if (cueEl) {
      var sc = String(ds.scrollCue != null ? ds.scrollCue : "").trim();
      if (sc) {
        cueEl.removeAttribute("hidden");
        var cueSpan = cueEl.querySelector(".js-discover-cue");
        if (cueSpan) cueSpan.textContent = sc;
      } else {
        cueEl.setAttribute("hidden", "");
      }
    }

    var imgs = Array.isArray(ds.backgroundImages)
      ? ds.backgroundImages
          .map(function (s) {
            return String(s == null ? "" : s).trim();
          })
          .filter(Boolean)
      : [];
    if (bgs) {
      bgs.innerHTML = "";
      for (var i = 0; i < imgs.length; i++) {
        var slide = document.createElement("div");
        slide.className = "discover-strip-slide" + (i === 0 ? " is-active" : "");
        slide.style.backgroundImage = "url(" + JSON.stringify(imgs[i]) + ")";
        bgs.appendChild(slide);
      }
    }

    if (imgs.length > 1 && bgs) {
      var si = 0;
      var interval = Number(ds.slideIntervalMs);
      if (Number.isNaN(interval) || interval < 2500) interval = 8000;
      root._discoverSlideTimer = window.setInterval(function () {
        var nodes = bgs.querySelectorAll(".discover-strip-slide");
        if (!nodes.length) return;
        nodes[si].classList.remove("is-active");
        si = (si + 1) % nodes.length;
        nodes[si].classList.add("is-active");
      }, interval);
    }

    var facts = Array.isArray(ds.facts) ? ds.facts : [];
    if (factsEl) {
      factsEl.innerHTML = facts
        .map(function (f) {
          var t = typeof f === "string" ? f : f && f.text != null ? String(f.text) : "";
          if (!t) return "";
          return "<li>" + escapeHtmlLite(t) + "</li>";
        })
        .filter(Boolean)
        .join("");
    }

    var barSummary = String(ds.barSummary || "").trim();
    if (!barSummary && SITE.advisorName) {
      barSummary = SITE.advisorName;
      if (SITE.yearsExperience != null && String(SITE.yearsExperience).trim()) {
        barSummary += " · " + String(SITE.yearsExperience).trim() + "+ yıl";
      }
      barSummary += " · TURYAP ATAŞEHİR İMZA · ödül ve işlem özeti";
    }
    if (barText) barText.textContent = barSummary || "Özet bilgi";

    var carEl = document.getElementById("discover-strip-carousel");
    var carTrack = carEl && carEl.querySelector(".js-discover-carousel-track");
    var rawCarousel = Array.isArray(ds.carouselSlides) ? ds.carouselSlides : [];
    var carSlides = rawCarousel.filter(function (s) {
      if (typeof s === "string") return String(s).trim().length > 0;
      if (!s) return false;
      var title = s.title != null ? String(s.title).trim() : "";
      var text = s.text != null ? String(s.text).trim() : "";
      return title.length > 0 || text.length > 0;
    });
    var carouselCount = carSlides.length;
    root._discoverCarouselSlideCount = 0;
    if (carTrack) {
      if (carouselCount) {
        root.classList.add("is-carousel");
        carTrack.style.removeProperty("width");
        carTrack.style.removeProperty("transform");
        carTrack.innerHTML = carSlides
          .map(function (s) {
            var title = typeof s === "string" ? String(s) : s && s.title != null ? String(s.title) : "";
            var text = typeof s === "string" ? "" : s && s.text != null ? String(s.text) : "";
            return (
              '<div class="discover-strip-carousel-slide"><strong>' +
              escapeHtmlLite(title) +
              "</strong><span>" +
              escapeHtmlLite(text) +
              "</span></div>"
            );
          })
          .join("");
        root._discoverCarouselSlideCount = carTrack.children.length;
        root._discoverCarouselSlidePx = 0;
        if (carEl) {
          if (carouselCount <= 1) carEl.classList.add("is-single");
          else carEl.classList.remove("is-single");
        }
      } else {
        root.classList.remove("is-carousel");
        carTrack.innerHTML = "";
        if (carEl) {
          carEl.setAttribute("hidden", "");
          carEl.classList.remove("is-single");
        }
      }
    }

    function prefersDiscoverReducedMotion() {
      try {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch (e) {
        return false;
      }
    }

    function clearDiscoverDockTimers() {
      if (root._dockDeferredTimer) {
        window.clearTimeout(root._dockDeferredTimer);
        root._dockDeferredTimer = null;
      }
      if (root._dockStripInTimer) {
        window.clearTimeout(root._dockStripInTimer);
        root._dockStripInTimer = null;
      }
    }

    function sizeDiscoverCarouselTrack() {
      if (!carEl || !carTrack) return;
      var frame = carEl.querySelector(".discover-carousel-frame");
      var n = root._discoverCarouselSlideCount || 0;
      if (!frame || n < 1) return;
      var w = Math.floor(frame.getBoundingClientRect().width);
      if (w < 40) return;
      root._discoverCarouselSlidePx = w;
      carTrack.style.width = n * w + "px";
      var ch = carTrack.children;
      for (var ci = 0; ci < ch.length; ci++) {
        ch[ci].style.flex = "0 0 " + w + "px";
        ch[ci].style.width = w + "px";
        ch[ci].style.minWidth = w + "px";
        ch[ci].style.maxWidth = w + "px";
      }
      applyCarouselTransform();
    }

    function scheduleDockBarRevealAfterFs() {
      clearDiscoverDockTimers();
      root.classList.add("is-dock-deferred");
      var delayMs = Number(ds.dockBarRevealDelayMs);
      if (Number.isNaN(delayMs) || delayMs < 0) delayMs = 5000;
      var stripInMs = prefersDiscoverReducedMotion() ? 80 : 920;
      root._dockDeferredTimer = window.setTimeout(function () {
        root._dockDeferredTimer = null;
        root.classList.remove("is-dock-deferred");
        root.classList.add("discover-dock-strip-in");
        root._dockStripInTimer = window.setTimeout(function () {
          root._dockStripInTimer = null;
          root.classList.remove("discover-dock-strip-in");
          window.requestAnimationFrame(function () {
            sizeDiscoverCarouselTrack();
            window.requestAnimationFrame(function () {
              sizeDiscoverCarouselTrack();
              startDiscoverCarousel();
            });
          });
        }, stripInMs);
      }, delayMs);
    }

    function stopDiscoverCarousel() {
      if (root._discoverCarouselTimer) {
        window.clearInterval(root._discoverCarouselTimer);
        root._discoverCarouselTimer = null;
      }
      root._discoverCarouselIdx = 0;
      if (carTrack) {
        carTrack.style.removeProperty("transform");
      }
    }

    function applyCarouselTransform() {
      var n = root._discoverCarouselSlideCount || 0;
      if (!carTrack || n < 1) return;
      var idx = root._discoverCarouselIdx || 0;
      var wpx = root._discoverCarouselSlidePx;
      if (wpx && wpx > 0) {
        carTrack.style.transform = "translate3d(-" + idx * wpx + "px,0,0)";
      } else {
        var slidePct = 100 / n;
        carTrack.style.transform = "translate3d(-" + idx * slidePct + "%,0,0)";
      }
    }

    function restartDiscoverCarouselAutoplay() {
      if (root._discoverCarouselTimer) {
        window.clearInterval(root._discoverCarouselTimer);
        root._discoverCarouselTimer = null;
      }
      var n = root._discoverCarouselSlideCount || 0;
      if (!carEl || !carTrack || n < 2) return;
      if (prefersDiscoverReducedMotion()) return;
      if (!root.classList.contains("is-docked") || !root.classList.contains("is-compact")) return;
      var interval = Number(ds.carouselIntervalMs);
      if (Number.isNaN(interval) || interval < 4500) interval = 5000;
      root._discoverCarouselTimer = window.setInterval(function () {
        shiftDiscoverCarousel(1, false);
      }, interval);
    }

    function shiftDiscoverCarousel(delta, fromUser) {
      var n = root._discoverCarouselSlideCount || 0;
      if (!carTrack || n < 1) return;
      if (!(root._discoverCarouselSlidePx > 0)) sizeDiscoverCarouselTrack();
      var idx = root._discoverCarouselIdx || 0;
      idx = (idx + delta + n * 100) % n;
      root._discoverCarouselIdx = idx;
      applyCarouselTransform();
      if (fromUser) restartDiscoverCarouselAutoplay();
    }

    function startDiscoverCarousel() {
      stopDiscoverCarousel();
      var n = root._discoverCarouselSlideCount || 0;
      if (!carEl || !carTrack || n < 1) return;
      carEl.removeAttribute("hidden");
      root._discoverCarouselIdx = 0;
      sizeDiscoverCarouselTrack();
      applyCarouselTransform();
      restartDiscoverCarouselAutoplay();
    }

    function onResizeDiscoverCarouselStrip() {
      if (
        root.classList.contains("is-docked") &&
        root.classList.contains("is-compact") &&
        !root.classList.contains("is-dock-deferred") &&
        root._discoverCarouselSlideCount
      ) {
        sizeDiscoverCarouselTrack();
      }
    }

    window.addEventListener("resize", onResizeDiscoverCarouselStrip, { passive: true });

    if (carEl && !root._discoverCarouselNavBound) {
      root._discoverCarouselNavBound = "1";
      var prevNav = carEl.querySelector(".discover-carousel-prev");
      var nextNav = carEl.querySelector(".discover-carousel-next");
      if (prevNav) {
        prevNav.addEventListener("click", function (e) {
          e.stopPropagation();
          shiftDiscoverCarousel(-1, true);
        });
      }
      if (nextNav) {
        nextNav.addEventListener("click", function (e) {
          e.stopPropagation();
          shiftDiscoverCarousel(1, true);
        });
      }
    }

    var hEndProgress = Number(ds.shrinkHeightEndProgress);
    if (Number.isNaN(hEndProgress) || hEndProgress < 0.45 || hEndProgress > 0.97) hEndProgress = 0.78;
    if (prefersDiscoverReducedMotion()) hEndProgress = 1;

    function smoothstep01(t) {
      t = Math.max(0, Math.min(1, t));
      return t * t * (3 - 2 * t);
    }

    function lockPageScroll() {
      lockedOverflow = document.body.style.overflow || "";
      document.body.style.overflow = "hidden";
    }

    function unlockPageScroll() {
      document.body.style.overflow = lockedOverflow;
    }

    function setFsProgress(next) {
      fsProgress = Math.max(0, Math.min(1, Number(next) || 0));
      if (fsProgress > 0.004) root.classList.add("is-shrinking");
      applyShrinkVisual(fsProgress);
      if (fsProgress >= 0.998) dockFromFullscreen();
    }

    function animateFsProgressToTarget() {
      fsAnimRaf = 0;
      if (!root.classList.contains("is-fs")) return;
      var diff = fsProgressTarget - fsProgress;
      if (Math.abs(diff) < 0.0012) {
        setFsProgress(fsProgressTarget);
        return;
      }
      setFsProgress(fsProgress + diff * 0.18);
      fsAnimRaf = window.requestAnimationFrame(animateFsProgressToTarget);
    }

    function setFsProgressTarget(next) {
      fsProgressTarget = Math.max(0, Math.min(1, Number(next) || 0));
      if (!fsAnimRaf) {
        fsAnimRaf = window.requestAnimationFrame(animateFsProgressToTarget);
      }
    }

    function applyShrinkVisual(p) {
      if (!root.classList.contains("is-fs")) return;
      var clamped = Math.max(0, Math.min(1, p));
      var vh = window.innerHeight;
      var eased = smoothstep01(clamped);
      root.style.height = "100vh";
      root.style.maxHeight = "100vh";
      if (hEndProgress >= 0.999) {
        root.style.opacity = "1";
      } else if (clamped <= hEndProgress) {
        root.style.opacity = "1";
      } else {
        var ft = (clamped - hEndProgress) / Math.max(0.0001, 1 - hEndProgress);
        var o = 1 - smoothstep01(ft);
        root.style.opacity = String(Math.max(0, Math.min(1, o)));
      }
      var slideOutY = Math.round(vh * 1.06 * eased);
      root.style.transform = "translate3d(0," + -slideOutY + "px,0)";
    }

    function updateScrollRangeAndSpacer() {
      headH = headEl ? headEl.offsetHeight : 0;
      scrollDenom = computeScrollDenom();
    }

    root.removeAttribute("hidden");
    root.classList.add("is-fs");
    lockPageScroll();
    root.style.opacity = "1";
    fsProgressTarget = 0;
    setFsProgress(0);
    if (spacerEl) {
      spacerEl.setAttribute("hidden", "");
      spacerEl.style.height = "";
    }

    window.requestAnimationFrame(function () {
      root.classList.add("is-revealed");
      syncToggleAria();
      bindDiscoverScrollSync();
    });

    function discoverAria(key) {
      if (typeof window.I18N !== "undefined") return window.I18N.t(key);
      var map = {
        discover_toggle_fs: "Siteye geç",
        discover_toggle_shrink: "Siteye geç — ön izlemeyi küçült",
        discover_toggle_expand: "Ön izlemeyi büyüt",
        discover_toggle_compact: "Ön izlemeyi dar şeride küçült",
        discover_toggle_other: "Ön izlemeyi değiştir",
      };
      return map[key] || key;
    }

    function syncToggleAria() {
      if (!toggleBtn) return;
      var fs = root.classList.contains("is-fs");
      var compact = root.classList.contains("is-compact");
      var tall = root.classList.contains("is-tall");
      if (fs) {
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.setAttribute("aria-label", discoverAria("discover_toggle_shrink"));
      } else if (compact) {
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.setAttribute("aria-label", discoverAria("discover_toggle_expand"));
      } else if (tall) {
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.setAttribute("aria-label", discoverAria("discover_toggle_compact"));
      } else {
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.setAttribute("aria-label", discoverAria("discover_toggle_other"));
      }
    }

    function dockFromFullscreen() {
      if (!root.classList.contains("is-fs")) return;
      root.classList.remove("is-fs", "is-shrinking");
      root.style.removeProperty("transition");
      root.style.removeProperty("opacity");
      root.style.removeProperty("height");
      root.style.removeProperty("max-height");
      root.style.removeProperty("transform");
      root.classList.add("is-docked", "is-compact");
      root.classList.remove("is-tall");
      root.classList.remove("discover-dock-strip-in");
      teardownDiscoverScrollSync();
      unlockPageScroll();
      if (spacerEl) {
        spacerEl.setAttribute("hidden", "");
        spacerEl.style.height = "";
      }
      syncToggleAria();
      stopDiscoverCarousel();
      scheduleDockBarRevealAfterFs();
    }

    function onResizeDiscover() {
      if (!root.classList.contains("is-fs")) return;
      peekPx = measurePeekPx();
      root._discoverPeekPx = peekPx;
      updateScrollRangeAndSpacer();
      applyShrinkVisual(fsProgress);
    }

    function onWheelFs(e) {
      if (!root.classList.contains("is-fs")) return;
      if (e.cancelable) e.preventDefault();
      var d = scrollDenom > 0 ? scrollDenom : 1;
      setFsProgressTarget(fsProgressTarget + e.deltaY / d);
    }

    function onTouchStartFs(e) {
      if (!root.classList.contains("is-fs")) return;
      if (!e.touches || !e.touches.length) return;
      touchActive = true;
      touchStartY = e.touches[0].clientY;
    }

    function onTouchMoveFs(e) {
      if (!root.classList.contains("is-fs") || !touchActive) return;
      if (!e.touches || !e.touches.length) return;
      var y = e.touches[0].clientY;
      var delta = touchStartY - y;
      if (Math.abs(delta) < 1) return;
      touchStartY = y;
      if (e.cancelable) e.preventDefault();
      var d = scrollDenom > 0 ? scrollDenom : 1;
      setFsProgressTarget(fsProgressTarget + delta / d);
    }

    function onTouchEndFs() {
      touchActive = false;
      touchStartY = null;
    }

    function onKeydownFs(e) {
      if (!root.classList.contains("is-fs")) return;
      var step = 0;
      if (e.key === "ArrowDown") step = 0.08;
      else if (e.key === "PageDown" || e.key === " ") step = 0.18;
      else if (e.key === "ArrowUp") step = -0.08;
      else if (e.key === "PageUp") step = -0.18;
      if (!step) return;
      e.preventDefault();
      setFsProgressTarget(fsProgressTarget + step);
    }

    function teardownDiscoverScrollSync() {
      if (fsAnimRaf) {
        window.cancelAnimationFrame(fsAnimRaf);
        fsAnimRaf = 0;
      }
      window.removeEventListener("wheel", onWheelFs);
      window.removeEventListener("touchstart", onTouchStartFs);
      window.removeEventListener("touchmove", onTouchMoveFs);
      window.removeEventListener("touchend", onTouchEndFs);
      window.removeEventListener("keydown", onKeydownFs);
      window.removeEventListener("resize", onResizeDiscover);
    }

    function bindDiscoverScrollSync() {
      teardownDiscoverScrollSync();
      window.addEventListener("wheel", onWheelFs, { passive: false });
      window.addEventListener("touchstart", onTouchStartFs, { passive: true });
      window.addEventListener("touchmove", onTouchMoveFs, { passive: false });
      window.addEventListener("touchend", onTouchEndFs, { passive: true });
      window.addEventListener("keydown", onKeydownFs);
      window.addEventListener("resize", onResizeDiscover, { passive: true });
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (root.classList.contains("is-fs")) {
          setFsProgressTarget(1);
          return;
        }
        if (!root.classList.contains("is-docked")) return;
        if (root.classList.contains("is-compact")) {
          root.classList.remove("is-compact");
          root.classList.add("is-tall");
          clearDiscoverDockTimers();
          root.classList.remove("is-dock-deferred");
          root.classList.remove("discover-dock-strip-in");
          stopDiscoverCarousel();
        } else {
          root.classList.remove("is-tall");
          root.classList.add("is-compact");
          clearDiscoverDockTimers();
          root.classList.remove("is-dock-deferred");
          root.classList.remove("discover-dock-strip-in");
          sizeDiscoverCarouselTrack();
          startDiscoverCarousel();
        }
        syncToggleAria();
      });
    }
  }

  function initDiscoverStripScheduling() {
    var root = document.getElementById("discover-strip-root");
    if (!root) return;

    function startOnce() {
      document.removeEventListener("intro-finished", onIntroFinished);
      initDiscoverStrip(root);
    }

    function onIntroFinished() {
      startOnce();
    }

    document.addEventListener("intro-finished", onIntroFinished);

    if (!document.getElementById("intro-screen")) {
      document.removeEventListener("intro-finished", onIntroFinished);
      startOnce();
    }
  }

  function applySiteConfig() {
    if (typeof SITE === "undefined") return;

    var wa = waUrl();
    document.querySelectorAll(".js-wa").forEach(function (el) {
      el.href = wa;
    });

    var tel = SITE.phoneTel || "";
    document.querySelectorAll(".js-tel").forEach(function (el) {
      el.href = tel ? "tel:" + tel.replace(/\s/g, "") : "#";
      if (el.classList.contains("contact-big")) {
        var phFb = typeof window.I18N !== "undefined" ? window.I18N.t("phone_fallback") : "Telefon ekleyin";
        el.textContent = SITE.phoneDisplay || tel || phFb;
      }
    });

    var mail = SITE.email || "";
    document.querySelectorAll(".js-mailto").forEach(function (el) {
      el.href = mail ? "mailto:" + mail : "#";
      if (mail) el.textContent = mail;
    });

    var igUser = SITE.instagramUsername || "";
    var igUrl = SITE.instagramUrl || "";
    document.querySelectorAll(".js-ig-link").forEach(function (el) {
      el.href = igUrl || "#";
    });
    document.querySelectorAll(".js-ig-username").forEach(function (el) {
      var igFb = typeof window.I18N !== "undefined" ? window.I18N.t("ig_fallback") : "@kullaniciadi";
      el.textContent = igUser ? "@" + igUser : igFb;
    });

    var sbUrl = String(SITE.sahibindenUrl || "").trim();
    document.querySelectorAll(".js-sb-link").forEach(function (el) {
      el.href = sbUrl.indexOf("http") === 0 ? sbUrl : "#";
    });
    document.querySelectorAll(".js-sb-card").forEach(function (el) {
      if (sbUrl.indexOf("http") === 0) {
        el.removeAttribute("hidden");
      } else {
        el.setAttribute("hidden", "");
      }
    });

    var name = SITE.advisorName || "";
    document.querySelectorAll(".js-advisor-name").forEach(function (el) {
      el.textContent = name;
    });

    var shortName = name.split(" ")[0] || "Danışman";
    document.querySelectorAll(".js-advisor-short").forEach(function (el) {
      el.textContent = shortName;
    });

    var region = SITE.regionLabel || "Bölgeniz";
    document.querySelectorAll(".js-region").forEach(function (el) {
      el.textContent = region;
    });

    var y = SITE.yearsExperience;
    document.querySelectorAll(".js-years").forEach(function (el) {
      el.textContent = y != null ? String(y) : "—";
    });

    var mapUrl = SITE.mapsEmbedUrl;
    var mapAddr = SITE.mapsAddress || "";
    document.querySelectorAll(".js-map-address").forEach(function (el) {
      if (mapAddr) {
        el.textContent = mapAddr;
        el.removeAttribute("hidden");
      } else {
        el.textContent = "";
        el.setAttribute("hidden", "");
      }
    });

    var frame = document.querySelector(".js-map-frame");
    var wrap = document.querySelector(".js-map-wrap");
    var note = document.querySelector(".js-map-note");
    if (frame && wrap) {
      var embed = wrap.querySelector(".map-embed");
      if (mapUrl && mapUrl.length > 10 && mapUrl.indexOf("http") === 0) {
        frame.src = mapUrl;
        frame.style.display = "block";
        if (embed) embed.style.display = "block";
        if (note) note.textContent = "";
      } else {
        frame.style.display = "none";
        if (embed) embed.style.display = "none";
        if (note)
          note.textContent =
            "Harita için Google Haritalar’da konumunuzu açın → Paylaş → Haritayı yerleştir → iframe src linkini site-config.js içindeki mapsEmbedUrl alanına yapıştırın.";
      }
    }

    renderContactFabPanels();

    if (typeof window.I18N !== "undefined") {
      window.I18N.applyMapNote();
    }
  }

  function initContactFab() {
    var root = document.querySelector("[data-contact-fab]");
    if (!root) return;
    var toggle = root.querySelector(".contact-fab-toggle");
    var panel = root.querySelector(".contact-fab-panel");
    if (!toggle || !panel) return;

    function fabAria(open) {
      if (typeof window.I18N !== "undefined") {
        return open ? window.I18N.t("fab_close") : window.I18N.t("fab_open");
      }
      return open ? "İletişim menüsünü kapat" : "İletişim menüsünü aç";
    }

    function setOpen(open) {
      root.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", fabAria(open));
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!root.classList.contains("is-open"));
    });

    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    });

    panel.addEventListener("click", function (e) {
      var a = e.target.closest("a.contact-fab-bubble");
      if (!a || !panel.contains(a)) return;
      window.setTimeout(function () {
        setOpen(false);
      }, 0);
    });
  }

  function renderHomeReviewStrip() {
    var track = document.querySelector("[data-review-track]");
    if (!track || typeof MUSTERI_YORUM_PHOTOS === "undefined") return;
    var urls = MUSTERI_YORUM_PHOTOS.filter(function (u) {
      return String(u || "").trim();
    });
    function altLine(i) {
      if (typeof window.I18N !== "undefined") return window.I18N.t("review_alt") + " " + (i + 1);
      return "Müşteri yorumu görseli " + (i + 1);
    }
    var openHint =
      typeof window.I18N !== "undefined" ? window.I18N.t("rotator_open_fs") : "Tam ekranda aç";
    track.innerHTML = urls
      .map(function (url, i) {
        return (
          '<button type="button" class="review-photo-card review-photo-card--zoom" data-home-review-idx="' +
          i +
          '" aria-label="' +
          escapeHtmlLite(altLine(i) + " — " + openHint) +
          '">' +
          '<img src="' +
          escapeHtmlLite(url) +
          '" alt="' +
          escapeHtmlLite(altLine(i)) +
          '" loading="lazy" decoding="async" /></button>'
        );
      })
      .join("");
  }

  function initHomeReviewsLightbox() {
    var lightbox = document.getElementById("home-reviews-lightbox");
    if (!lightbox || typeof MUSTERI_YORUM_PHOTOS === "undefined") return;
    var urls = MUSTERI_YORUM_PHOTOS.filter(function (u) {
      return String(u || "").trim();
    });
    if (urls.length === 0) return;

    var track = document.querySelector("[data-review-track]");
    var img = lightbox.querySelector(".listing-lightbox-img");
    var counter = lightbox.querySelector(".listing-lightbox-counter");
    var closeBtn = lightbox.querySelector(".listing-lightbox-close");
    var touchRoot = lightbox.querySelector("[data-home-review-lb-touch]");
    var idx = 0;

    function altFor(i) {
      var base =
        typeof window.I18N !== "undefined"
          ? window.I18N.t("review_alt")
          : "Müşteri yorumu görseli";
      return base + " " + (i + 1) + "/" + urls.length;
    }

    function syncButtons() {
      var navs = lightbox.querySelectorAll("[data-home-review-lb-step]");
      navs.forEach(function (b) {
        b.disabled = urls.length < 2;
      });
    }

    function updateView() {
      if (!img || !counter) return;
      var i = ((idx % urls.length) + urls.length) % urls.length;
      idx = i;
      img.src = urls[i];
      img.alt = altFor(i);
      counter.textContent = String(i + 1) + "/" + String(urls.length);
    }

    function openAt(i) {
      idx = typeof i === "number" && !isNaN(i) ? i : 0;
      updateView();
      lightbox.hidden = false;
      document.body.classList.add("listing-lightbox-open");
      syncButtons();
      if (closeBtn) closeBtn.focus();
    }

    function closeLb() {
      lightbox.hidden = true;
      document.body.classList.remove("listing-lightbox-open");
      if (img) img.removeAttribute("src");
    }

    function step(delta) {
      if (urls.length < 2) return;
      idx = (idx + delta + urls.length) % urls.length;
      updateView();
    }

    if (track) {
      track.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-home-review-idx]");
        if (!btn || !track.contains(btn)) return;
        var i = parseInt(btn.getAttribute("data-home-review-idx"), 10);
        if (!isNaN(i)) openAt(i);
      });
    }

    lightbox.addEventListener("click", function (e) {
      var t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest(".listing-lightbox-close")) {
        closeLb();
        return;
      }
      var st = t.closest("[data-home-review-lb-step]");
      if (st) {
        var d = parseInt(st.getAttribute("data-home-review-lb-step"), 10);
        if (!isNaN(d)) step(d);
        return;
      }
      if (t === lightbox) closeLb();
    });

    document.addEventListener("keydown", function homeReviewsLbKey(e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });

    var tx = null;
    if (touchRoot) {
      touchRoot.addEventListener(
        "touchstart",
        function (e) {
          if (e.touches && e.touches[0]) tx = e.touches[0].clientX;
        },
        { passive: true }
      );
      touchRoot.addEventListener(
        "touchend",
        function (e) {
          if (tx == null || urls.length < 2) return;
          var endX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : tx;
          var dx = endX - tx;
          tx = null;
          if (Math.abs(dx) < 40) return;
          if (dx < 0) step(1);
          else step(-1);
        },
        { passive: true }
      );
    }
  }

  function initReviewCarousel() {
    var root = document.querySelector("[data-review-carousel]");
    if (!root) return;
    var viewport = root.querySelector(".review-carousel-viewport");
    var track = root.querySelector("[data-review-track]");
    var prev = root.querySelector("[data-review-prev]");
    var next = root.querySelector("[data-review-next]");
    if (!viewport || !track || !prev || !next) return;

    function cardWidth() {
      var first = track.querySelector(".review-photo-card");
      if (!first) return viewport.clientWidth;
      var gap = parseFloat(window.getComputedStyle(track).gap || "0") || 0;
      return first.getBoundingClientRect().width + gap;
    }

    function maxScroll() {
      return Math.max(0, track.scrollWidth - viewport.clientWidth);
    }

    function syncNav() {
      var max = maxScroll();
      var current = viewport.scrollLeft;
      prev.disabled = current <= 4;
      next.disabled = current >= max - 4;
    }

    function slide(delta) {
      var step = Math.max(cardWidth(), viewport.clientWidth * 0.75);
      viewport.scrollBy({ left: delta * step, behavior: "smooth" });
    }

    prev.addEventListener("click", function () {
      slide(-1);
    });
    next.addEventListener("click", function () {
      slide(1);
    });

    viewport.addEventListener("scroll", syncNav, { passive: true });
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(syncNav).observe(viewport);
      new ResizeObserver(syncNav).observe(track);
    } else {
      window.addEventListener("resize", syncNav);
    }

    window.requestAnimationFrame(syncNav);
  }

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var yil = document.getElementById("yil");
  if (yil) {
    yil.textContent = String(new Date().getFullYear());
  }

  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      var bar = btn.closest(".filter-bar");
      if (bar) {
        bar.querySelectorAll(".filter-btn").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
      }
      document.querySelectorAll(".listing-detail[data-type], .listing-card[data-type]").forEach(function (card) {
        var t = card.getAttribute("data-type");
        var show = f === "all" || (f === "satilik" && t === "satilik") || (f === "kiralik" && t === "kiralik");
        card.classList.toggle("is-filtered-out", !show);
      });
    });
  });

  runHomepageIntro();
  initDiscoverStripScheduling();
  applySiteConfig();
  initContactFab();
  renderHomeReviewStrip();
  initHomeReviewsLightbox();
  initReviewCarousel();
  renderHomeFeaturedListings();
})();
