(function () {
  if (typeof ILANLAR_DATA === "undefined") return;

  var listRoot = document.getElementById("ilanlar-list-root");
  var detailRoot = document.getElementById("ilan-detay-root");
  var statsRoot = document.getElementById("ilanlar-stats");

  function renderListingStatsPanel() {
    if (!statsRoot) return;
    var data = ILANLAR_DATA;
    var total = data.length;
    var kir = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].type === "kiralik") kir++;
    }
    var sat = total - kir;
    statsRoot.setAttribute(
      "aria-label",
      "Toplam " + total + " ilan: " + sat + " satılık, " + kir + " kiralık"
    );
    statsRoot.innerHTML =
      '<div class="listing-stats-panel-inner">' +
      '<div class="listing-stats-total">' +
      '<span class="listing-stats-total-num">' +
      String(total) +
      "</span>" +
      '<span class="listing-stats-total-label">toplam ilan</span>' +
      "</div>" +
      '<div class="listing-stats-breakdown">' +
      '<span class="listing-stats-pill listing-stats-pill--sale">' +
      '<span class="listing-stats-pill-num">' +
      String(sat) +
      "</span>" +
      '<span class="listing-stats-pill-text">Satılık</span>' +
      "</span>" +
      '<span class="listing-stats-pill listing-stats-pill--rent">' +
      '<span class="listing-stats-pill-num">' +
      String(kir) +
      "</span>" +
      '<span class="listing-stats-pill-text">Kiralık</span>' +
      "</span>" +
      "</div></div>";
  }

  renderListingStatsPanel();

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDescriptionHtml(text) {
    if (!text || !String(text).trim()) return "";
    return escapeHtml(text).replace(/\n/g, "<br />");
  }

  function youtubeEmbedUrl(url) {
    var u = String(url || "").trim();
    if (!u) return "";
    if (u.indexOf("youtube.com/embed/") !== -1) {
      return u.split("&")[0];
    }
    var m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    if (m) return "https://www.youtube.com/embed/" + m[1];
    return u;
  }

  function listingById(id) {
    for (var i = 0; i < ILANLAR_DATA.length; i++) {
      if (String(ILANLAR_DATA[i].id) === String(id)) return ILANLAR_DATA[i];
    }
    return null;
  }

  function getPhotosList(L) {
    var raw = L && L.photos ? L.photos : [];
    var photos = raw.filter(function (p) {
      return String(p || "").trim();
    });
    return photos.length ? photos : [""];
  }

  function hasRealPhotos(L) {
    var photos = L && L.photos ? L.photos : [];
    return photos.some(function (p) {
      return String(p || "").trim();
    });
  }

  function getListingMapsEmbedUrl(L) {
    var u = L && L.mapsEmbedUrl != null ? String(L.mapsEmbedUrl).trim() : "";
    if (!u) return "";
    var low = u.toLowerCase();
    if (low.indexOf("https://") !== 0 && low.indexOf("http://") !== 0) return "";
    return u;
  }

  function renderListingMapBlock(l) {
    var url = getListingMapsEmbedUrl(l);
    if (!url) return "";
    var loc = String(l.location || "").trim();
    var locHtml = loc ? '<p class="listing-map-text">' + escapeHtml(loc) + "</p>" : "";
    var titleAttr = escapeHtml("İlan konumu — " + (l.title || "harita"));
    return (
      '<div class="listing-map-block">' +
      '<h3 class="listing-map-title">Konum</h3>' +
      locHtml +
      '<div class="listing-map-frame">' +
      '<iframe class="listing-map-iframe" src="' +
      escapeHtml(url) +
      '" title="' +
      titleAttr +
      '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
      "</div></div>"
    );
  }

  function renderSpecs(specs) {
    if (!specs || !specs.length) return "";
    var rows = specs
      .map(function (row) {
        return (
          '<div class="listing-spec-row">' +
          '<span class="listing-spec-k">' +
          escapeHtml(row.label) +
          "</span>" +
          '<span class="listing-spec-v">' +
          escapeHtml(row.value) +
          "</span></div>"
        );
      })
      .join("");
    return '<div class="listing-spec-grid">' + rows + "</div>";
  }

  function renderThumbs(photos, listingId) {
    if (!photos || !photos.length) return "";
    return photos
      .map(function (src, idx) {
        return (
          '<button type="button" class="listing-thumb' +
          (idx === 0 ? " is-active" : "") +
          '" data-listing-id="' +
          escapeHtml(listingId) +
          '" data-photo-index="' +
          idx +
          '" aria-label="Fotoğraf ' +
          (idx + 1) +
          '"><img src="' +
          escapeHtml(src) +
          '" alt="" loading="lazy" decoding="async" /></button>'
        );
      })
      .join("");
  }

  function renderThumbsCarousel(photos, listingId) {
    if (!photos || photos.length < 2) return "";
    var inner = renderThumbs(photos, listingId);
    var pages = Math.max(1, Math.ceil(photos.length / 4));
    var dots = "";
    for (var p = 0; p < pages; p++) {
      dots +=
        '<button type="button" class="listing-thumbs-dot' +
        (p === 0 ? " is-active" : "") +
        '" aria-label="Küçük resim grubu ' +
        (p + 1) +
        "/" +
        pages +
        '" data-thumb-page="' +
        p +
        '"></button>';
    }
    return (
      '<div class="listing-thumbs-carousel">' +
      '<div class="listing-thumbs-carousel-row">' +
      '<button type="button" class="listing-thumbs-nav listing-thumbs-nav--prev" aria-label="Küçük resimleri sola kaydır"></button>' +
      '<div class="listing-thumbs-strip-wrap">' +
      '<div class="listing-thumbs-strip">' +
      inner +
      "</div></div>" +
      '<button type="button" class="listing-thumbs-nav listing-thumbs-nav--next" aria-label="Küçük resimleri sağa kaydır"></button>' +
      "</div>" +
      '<div class="listing-thumbs-dots" role="presentation">' +
      dots +
      "</div></div>"
    );
  }

  function renderArticle(l, opts) {
    opts = opts || {};
    var headingTag = opts.headingTag || "h2";
    var photos = getPhotosList(l);
    var realPhotos = (l.photos || []).filter(function (p) {
      return String(p || "").trim();
    });
    var mainSrc = photos[0] || "";
    var badgeClass = l.type === "kiralik" ? "listing-badge--rent" : "listing-badge--sale";
    var badgeText = l.type === "kiralik" ? "Kiralık" : "Satılık";
    var videoRaw = String(l.videoUrl || "").trim();
    var embed = youtubeEmbedUrl(videoRaw);
    var hasVideo = !!embed;

    var metaParts = [];
    if (l.listingNo) metaParts.push('<span class="listing-meta-no">İlan no: ' + escapeHtml(l.listingNo) + "</span>");
    if (l.listingDate) metaParts.push('<span class="listing-meta-date">' + escapeHtml(l.listingDate) + "</span>");
    var metaHtml = metaParts.length ? '<p class="listing-meta-line">' + metaParts.join(" · ") + "</p>" : "";

    var descHtml = formatDescriptionHtml(l.description);
    var descBlock = descHtml
      ? '<div class="listing-detail-desc-block"><h3 class="listing-desc-title">İlan hakkında</h3><div class="listing-detail-desc prose">' +
        descHtml +
        "</div></div>"
      : "";

    var videoPanel =
      '<div class="listing-video-panel" id="video-panel-' +
      escapeHtml(l.id) +
      '" hidden>' +
      (hasVideo
        ? '<div class="listing-video-frame"><iframe src="" title="İlan videosu" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe></div>'
        : "") +
      "</div>";

    var toolbarVideo = hasVideo
      ? '<button type="button" class="listing-tool-btn js-toggle-video" data-listing-id="' +
        escapeHtml(l.id) +
        '" aria-expanded="false">Video</button>'
      : "";

    var openTag = "<" + headingTag + ">";
    var closeTag = "</" + headingTag + ">";

    return (
      '<article class="listing-detail" data-type="' +
      escapeHtml(l.type) +
      '" data-listing-id="' +
      escapeHtml(l.id) +
      '" id="ilan-' +
      escapeHtml(l.id) +
      '">' +
      '<div class="listing-detail-gallery">' +
      metaHtml +
      '<div class="listing-gallery-view">' +
      '<button type="button" class="listing-nav listing-nav--prev" data-listing-id="' +
      escapeHtml(l.id) +
      '" aria-label="Önceki fotoğraf"' +
      (realPhotos.length < 2 ? " disabled" : "") +
      "></button>" +
      '<div class="listing-main-frame">' +
      '<img class="listing-main-img" src="' +
      escapeHtml(mainSrc) +
      '" alt="' +
      escapeHtml(l.title) +
      '" loading="eager" />' +
      "</div>" +
      '<button type="button" class="listing-nav listing-nav--next" data-listing-id="' +
      escapeHtml(l.id) +
      '" aria-label="Sonraki fotoğraf"' +
      (realPhotos.length < 2 ? " disabled" : "") +
      "></button>" +
      "</div>" +
      '<p class="listing-photo-count" aria-live="polite"><span class="listing-photo-count-num">1</span> / ' +
      (realPhotos.length || 1) +
      " fotoğraf</p>" +
      '<div class="listing-gallery-toolbar">' +
      '<button type="button" class="listing-tool-btn js-open-lightbox" data-listing-id="' +
      escapeHtml(l.id) +
      '"' +
      (!hasRealPhotos(l) ? " disabled" : "") +
      ">Büyük fotoğraf</button>" +
      toolbarVideo +
      "</div>" +
      videoPanel +
      (realPhotos.length > 1 ? renderThumbsCarousel(realPhotos, l.id) : "") +
      renderListingMapBlock(l) +
      "</div>" +
      '<div class="listing-detail-body">' +
      '<span class="listing-badge ' +
      badgeClass +
      '">' +
      badgeText +
      "</span>" +
      openTag +
      escapeHtml(l.title) +
      closeTag +
      '<p class="listing-detail-price">' +
      escapeHtml(l.price) +
      "</p>" +
      '<p class="listing-detail-loc">' +
      escapeHtml(l.location) +
      "</p>" +
      renderSpecs(l.specs) +
      descBlock +
      '<div class="listing-cta-row"><a class="btn btn-wa js-wa" href="#">WhatsApp</a><a class="btn btn-primary js-tel" href="#">Ara</a></div>' +
      "</div>" +
      "</article>"
    );
  }

  function specMatch(specs, sub) {
    if (!specs) return "";
    var needle = String(sub).toLowerCase();
    for (var i = 0; i < specs.length; i++) {
      if (String(specs[i].label).toLowerCase().indexOf(needle) !== -1) return String(specs[i].value || "").trim();
    }
    return "";
  }

  function cardAreaLabel(l) {
    if (l.cardArea && String(l.cardArea).trim()) return String(l.cardArea).trim();
    return specMatch(l.specs, "m²") || specMatch(l.specs, "m2") || "";
  }

  function cardRoomsLabel(l) {
    if (l.cardRooms && String(l.cardRooms).trim()) return String(l.cardRooms).trim();
    return specMatch(l.specs, "oda") || "";
  }

  function cardLocShort(l) {
    if (l.cardLocationShort && String(l.cardLocationShort).trim()) return String(l.cardLocationShort).trim();
    var loc = l.location || "";
    var parts = loc.split("/").map(function (s) {
      return s.trim();
    }).filter(Boolean);
    if (parts.length >= 2) return parts[0] + " / " + parts[1];
    return loc.trim();
  }

  function svgIco(children) {
    return (
      '<svg class="listing-card-ico-svg" width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      children +
      "</svg>"
    );
  }

  function renderCardIconRow(l) {
    var loc = cardLocShort(l);
    var area = cardAreaLabel(l);
    var rooms = cardRoomsLabel(l);
    if (!loc && !area && !rooms) return "";
    var pin = svgIco(
      '<path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="2"/>'
    );
    var sqr = svgIco(
      '<rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2"/>'
    );
    var bed = svgIco(
      '<path d="M2 14v4h20v-4M2 14V9a2 2 0 012-2h2v7M22 14V8h-8v6M6 7h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    );
    var parts = [];
    if (loc) {
      parts.push('<span class="listing-card-ico-item">' + pin + "<span>" + escapeHtml(loc) + "</span></span>");
    }
    if (area) {
      parts.push('<span class="listing-card-ico-item">' + sqr + "<span>" + escapeHtml(area) + "</span></span>");
    }
    if (rooms) {
      parts.push('<span class="listing-card-ico-item">' + bed + "<span>" + escapeHtml(rooms) + "</span></span>");
    }
    return '<div class="listing-card-icon-row">' + parts.join("") + "</div>";
  }

  function renderListCard(l) {
    var realPhotos = (l.photos || []).filter(function (p) {
      return String(p || "").trim();
    });
    var first = realPhotos[0] || "";
    var badgeText = l.type === "kiralik" ? "Kiralık" : "Satılık";
    var imgHtml = first
      ? '<img class="listing-card-cover" src="' + escapeHtml(first) + '" alt="" loading="lazy" decoding="async" />'
      : '<div class="listing-card-cover listing-card-cover--placeholder" aria-hidden="true"></div>';
    var no = String(l.listingNo || "").trim();
    var overlayId = no ? '<span class="listing-card-overlay-id">#' + escapeHtml(no) + "</span>" : "";
    var dateStr = String(l.listingDate || "").trim();
    var dateHtml = dateStr ? '<span class="listing-card-datetime">' + escapeHtml(dateStr) + "</span>" : "";
    var priceRow =
      '<div class="listing-card-price-row">' +
      '<span class="listing-card-price-main">' +
      escapeHtml(l.price) +
      "</span>" +
      dateHtml +
      "</div>";
    return (
      '<article class="listing-card listing-card--ilanlar listing-card--row" data-type="' +
      escapeHtml(l.type) +
      '">' +
      '<a href="ilan-detay.html?id=' +
      encodeURIComponent(l.id) +
      '" class="listing-card-link listing-card-link--row">' +
      '<div class="listing-card-media">' +
      overlayId +
      imgHtml +
      '<span class="listing-badge listing-badge--overlay">' + badgeText + "</span>" +
      "</div>" +
      '<div class="listing-card-body listing-card-body--row">' +
      "<h3>" +
      escapeHtml(l.title) +
      "</h3>" +
      priceRow +
      renderCardIconRow(l) +
      "</div></a></article>"
    );
  }

  if (listRoot) {
    listRoot.innerHTML =
      '<div class="listing-grid listing-grid--ilanlar">' + ILANLAR_DATA.map(renderListCard).join("") + "</div>";
  }

  var lightbox = document.getElementById("listing-lightbox");
  var lbImg = lightbox ? lightbox.querySelector(".listing-lightbox-img") : null;
  var lbPrev = lightbox ? lightbox.querySelector(".listing-lightbox-prev") : null;
  var lbNext = lightbox ? lightbox.querySelector(".listing-lightbox-next") : null;
  var lbClose = lightbox ? lightbox.querySelector(".listing-lightbox-close") : null;
  var lbCounter = lightbox ? lightbox.querySelector(".listing-lightbox-counter") : null;
  var lbState = { id: null, index: 0 };

  function updateLightboxCounter() {
    if (!lbCounter) return;
    var L = listingById(lbState.id);
    var photos = L ? getPhotosList(L) : [];
    var total = photos.length || 1;
    lbCounter.textContent = String(lbState.index + 1) + "/" + String(total);
  }

  function getPhotosForArticle(article) {
    return getPhotosList(listingById(article.getAttribute("data-listing-id")));
  }

  function setActiveThumb(article, index) {
    article.querySelectorAll(".listing-thumb").forEach(function (btn, i) {
      btn.classList.toggle("is-active", i === index);
    });
  }

  function scrollActiveThumbIntoStrip(article) {
    var wrap = article.querySelector(".listing-thumbs-strip-wrap");
    var active = article.querySelector(".listing-thumb.is-active");
    if (!wrap || !active) return;
    var ar = active.getBoundingClientRect();
    var wr = wrap.getBoundingClientRect();
    if (ar.left < wr.left + 4 || ar.right > wr.right - 4) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }

  function updateGalleryPhoto(article, index) {
    var photos = getPhotosForArticle(article);
    if (!photos.length) return;
    var i = ((index % photos.length) + photos.length) % photos.length;
    var img = article.querySelector(".listing-main-img");
    var countEl = article.querySelector(".listing-photo-count-num");
    if (!img) return;
    img.classList.add("is-switching");
    window.setTimeout(function () {
      img.src = photos[i];
      img.onload = function () {
        img.classList.remove("is-switching");
      };
      if (!img.complete) {
        window.setTimeout(function () {
          img.classList.remove("is-switching");
        }, 400);
      } else {
        img.classList.remove("is-switching");
      }
      if (countEl) countEl.textContent = String(i + 1);
      setActiveThumb(article, i);
      article.dataset.photoIndex = String(i);
      scrollActiveThumbIntoStrip(article);
    }, 120);
  }

  function openLightbox(listingId, index) {
    if (!lightbox || !lbImg) return;
    var L = listingById(listingId);
    if (!hasRealPhotos(L)) return;
    var photos = getPhotosList(L);
    lbState.id = listingId;
    lbState.index = ((index % photos.length) + photos.length) % photos.length;
    lbImg.src = photos[lbState.index];
    lbImg.alt = L.title || "";
    lightbox.hidden = false;
    document.body.classList.add("listing-lightbox-open");
    if (lbPrev) lbPrev.disabled = photos.length < 2;
    if (lbNext) lbNext.disabled = photos.length < 2;
    updateLightboxCounter();
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("listing-lightbox-open");
    if (lbImg) lbImg.removeAttribute("src");
  }

  function lightboxStep(delta) {
    if (!lbImg) return;
    var L = listingById(lbState.id);
    var photos = getPhotosList(L);
    if (!photos.length) return;
    lbState.index = (lbState.index + delta + photos.length) % photos.length;
    lbImg.src = photos[lbState.index];
    updateLightboxCounter();
  }

  function bindGalleryInteractions(root) {
    if (!root) return;

    root.querySelectorAll(".listing-detail").forEach(function (article) {
      article.dataset.photoIndex = "0";
    });

    root.addEventListener("click", function (e) {
      var t = e.target;
      if (!(t instanceof Element)) return;

      var thumb = t.closest(".listing-thumb");
      if (thumb) {
        var id = thumb.getAttribute("data-listing-id");
        var idx = parseInt(thumb.getAttribute("data-photo-index"), 10);
        var art = root.querySelector('.listing-detail[data-listing-id="' + id + '"]');
        if (art && !isNaN(idx)) updateGalleryPhoto(art, idx);
        return;
      }

      if (t.classList.contains("listing-nav--prev")) {
        var idp = t.getAttribute("data-listing-id");
        var artp = root.querySelector('.listing-detail[data-listing-id="' + idp + '"]');
        if (artp) {
          var cur = parseInt(artp.dataset.photoIndex || "0", 10);
          updateGalleryPhoto(artp, cur - 1);
        }
        return;
      }

      if (t.classList.contains("listing-nav--next")) {
        var idn = t.getAttribute("data-listing-id");
        var artn = root.querySelector('.listing-detail[data-listing-id="' + idn + '"]');
        if (artn) {
          var curN = parseInt(artn.dataset.photoIndex || "0", 10);
          updateGalleryPhoto(artn, curN + 1);
        }
        return;
      }

      if (t.classList.contains("js-open-lightbox")) {
        var idL = t.getAttribute("data-listing-id");
        var artL = root.querySelector('.listing-detail[data-listing-id="' + idL + '"]');
        var curL = artL ? parseInt(artL.dataset.photoIndex || "0", 10) : 0;
        openLightbox(idL, curL);
        return;
      }

      if (t.classList.contains("js-toggle-video")) {
        var idV = t.getAttribute("data-listing-id");
        var panel = document.getElementById("video-panel-" + idV);
        var LV = listingById(idV);
        var embedUrl = youtubeEmbedUrl(LV && LV.videoUrl);
        if (!panel || !embedUrl) return;
        var iframeV = panel.querySelector("iframe");
        var expanded = t.getAttribute("aria-expanded") === "true";
        if (!expanded) {
          if (iframeV) iframeV.setAttribute("src", embedUrl);
          panel.hidden = false;
          t.setAttribute("aria-expanded", "true");
        } else {
          panel.hidden = true;
          t.setAttribute("aria-expanded", "false");
          if (iframeV) iframeV.removeAttribute("src");
        }
      }
    });
  }

  function initListingThumbCarousels(root) {
    if (!root) return;
    root.querySelectorAll(".listing-thumbs-carousel").forEach(function (car) {
      var wrap = car.querySelector(".listing-thumbs-strip-wrap");
      var prev = car.querySelector(".listing-thumbs-nav--prev");
      var next = car.querySelector(".listing-thumbs-nav--next");
      var dots = car.querySelectorAll(".listing-thumbs-dot");
      if (!wrap || !prev || !next) return;

      function syncThumbNav() {
        var maxS = wrap.scrollWidth - wrap.clientWidth;
        if (maxS <= 2) {
          prev.disabled = true;
          next.disabled = true;
        } else {
          var sl = wrap.scrollLeft;
          prev.disabled = sl <= 2;
          next.disabled = sl >= maxS - 2;
        }
        syncDots();
      }

      function syncDots() {
        if (!dots.length) return;
        var maxS = wrap.scrollWidth - wrap.clientWidth;
        var pageW = wrap.clientWidth;
        var p = 0;
        if (maxS > 2 && pageW > 0) {
          p = Math.floor((wrap.scrollLeft + pageW * 0.15) / pageW);
          if (p < 0) p = 0;
          if (p >= dots.length) p = dots.length - 1;
        }
        dots.forEach(function (d, i) {
          d.classList.toggle("is-active", i === p);
        });
      }

      wrap.addEventListener("scroll", syncThumbNav, { passive: true });
      wrap.addEventListener(
        "wheel",
        function (e) {
          if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
          e.preventDefault();
          wrap.scrollLeft += e.deltaY;
        },
        { passive: false }
      );

      prev.addEventListener("click", function () {
        var step = Math.max(72, Math.round(wrap.clientWidth * 0.85));
        wrap.scrollBy({ left: -step, behavior: "smooth" });
      });
      next.addEventListener("click", function () {
        var step = Math.max(72, Math.round(wrap.clientWidth * 0.85));
        wrap.scrollBy({ left: step, behavior: "smooth" });
      });

      dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
          var page = parseInt(dot.getAttribute("data-thumb-page"), 10);
          if (isNaN(page)) return;
          var pageW = wrap.clientWidth;
          var maxS = Math.max(0, wrap.scrollWidth - wrap.clientWidth);
          var left = Math.min(page * pageW, maxS);
          wrap.scrollTo({ left: left, behavior: "smooth" });
        });
      });

      if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(syncThumbNav).observe(wrap);
      } else {
        window.addEventListener("resize", syncThumbNav);
      }
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(syncThumbNav);
      });
    });
  }

  if (detailRoot) {
    var params = new URLSearchParams(location.search);
    var qid = params.get("id");
    var L = qid ? listingById(qid) : null;

    if (!L) {
      detailRoot.innerHTML =
        '<div class="listing-not-found">' +
        "<p>Bu ilan bulunamadı veya kaldırılmış olabilir.</p>" +
        '<p><a class="btn btn-primary" href="ilanlar.html">İlanlara dön</a></p>' +
        "</div>";
      var tnf = document.querySelector("title");
      if (tnf) tnf.textContent = "İlan bulunamadı | Erol Erdoğar";
    } else {
      detailRoot.innerHTML = renderArticle(L, { headingTag: "h1" });
      var td = document.querySelector("title");
      if (td) td.textContent = L.title + " | İlan | Erol Erdoğar";
      var meta = document.querySelector('meta[name="description"]');
      if (meta) {
        var snippet = String(L.description || L.title || "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 160);
        if (snippet) meta.setAttribute("content", snippet);
      }
      var art = detailRoot.querySelector(".listing-detail");
      if (art) art.dataset.photoIndex = "0";
      bindGalleryInteractions(detailRoot);
      initListingThumbCarousels(detailRoot);
    }
  }

  if (lightbox && lbClose) {
    lbClose.addEventListener("click", closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  if (lbPrev) {
    lbPrev.addEventListener("click", function () {
      lightboxStep(-1);
    });
  }
  if (lbNext) {
    lbNext.addEventListener("click", function () {
      lightboxStep(1);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lightboxStep(-1);
    if (e.key === "ArrowRight") lightboxStep(1);
  });
})();
