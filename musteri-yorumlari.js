/**
 * Müşteri yorumları galeri: ilan detayı ile aynı kontroller, lightbox, sürükleme.
 */
(function () {
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function t(key) {
    if (typeof window.I18N !== "undefined" && window.I18N.t) return window.I18N.t(key);
    return key;
  }

  function parseHashIndex(urls) {
    var h = (window.location.hash || "").replace(/^#/, "");
    var m = h.match(/^i=?(\d+)$/i) || h.match(/^(\d+)$/);
    if (m) {
      var n = parseInt(m[1], 10);
      if (n >= 1) return Math.min(n - 1, Math.max(0, urls.length - 1));
    }
    return 0;
  }

  function setHashIndex(i) {
    var n = i + 1;
    try {
      if (window.history && window.history.replaceState) {
        var u = new URL(window.location.href);
        u.hash = String(n);
        window.history.replaceState(null, "", u.pathname + u.search + "#" + n);
      } else {
        window.location.hash = String(n);
      }
    } catch (e) {
      try {
        window.location.hash = String(n);
      } catch (e2) {}
    }
  }

  function initReviewPageGallery() {
    var root = document.getElementById("reviews-gallery-root");
    if (!root) return;

    var urls = typeof MUSTERI_YORUM_PHOTOS !== "undefined" ? MUSTERI_YORUM_PHOTOS : [];
    urls = urls.filter(function (u) {
      return String(u || "").trim();
    });

    if (!urls.length) {
      root.innerHTML =
        '<p class="reviews-page-empty">' + escapeHtml(t("reviews_page_empty")) + "</p>";
      return;
    }

    var state = { index: parseHashIndex(urls) };
    var n = urls.length;
    var progressWord = t("listing_photo_progress");
    var photoLabel = t("photo_n");
    var altBase = t("review_alt");

    var thumbsBlock = "";
    if (n > 1) {
      var thumbBtns = "";
      for (var ti = 0; ti < n; ti++) {
        thumbBtns +=
          '<button type="button" class="listing-thumb reviews-page-thumb" data-reviews-idx="' +
          ti +
          '" aria-label="' +
          escapeHtml(photoLabel + " " + (ti + 1) + " / " + n) +
          '" aria-pressed="false">' +
          '<img src="' +
          escapeHtml(urls[ti]) +
          '" alt="" loading="lazy" decoding="async" />' +
          "</button>";
      }
      thumbsBlock =
        '<div class="listing-thumbs-carousel reviews-page-thumbs">' +
        '<div class="listing-thumbs-carousel-row">' +
        '<button type="button" class="listing-thumbs-nav listing-thumbs-nav--prev" data-reviews-thumbs-nav="prev" aria-label="' +
        escapeHtml(t("thumbs_scroll_prev")) +
        '"></button>' +
        '<div class="listing-thumbs-strip-wrap">' +
        '<div class="listing-thumbs-strip" data-reviews-thumbs-strip>' +
        thumbBtns +
        "</div></div>" +
        '<button type="button" class="listing-thumbs-nav listing-thumbs-nav--next" data-reviews-thumbs-nav="next" aria-label="' +
        escapeHtml(t("thumbs_scroll_next")) +
        '"></button>' +
        "</div></div>";
    }

    root.innerHTML =
      '<article class="listing-detail reviews-page-article" data-reviews-article>' +
      '<div class="listing-detail-gallery">' +
      '<div class="listing-gallery-view">' +
      '<button type="button" class="listing-nav listing-nav--prev" data-reviews-step="-1" aria-label="' +
      escapeHtml(t("lightbox_prev_ph")) +
      '"' +
      (n < 2 ? " disabled" : "") +
      "></button>" +
      '<div class="listing-main-frame reviews-page-main-frame" data-reviews-touch-root tabindex="0">' +
      '<img class="listing-main-img reviews-page-main-img" src="' +
      escapeHtml(urls[state.index]) +
      '" alt="' +
      escapeHtml(altBase + " " + (state.index + 1) + "/" + n) +
      '" decoding="async" />' +
      "</div>" +
      '<button type="button" class="listing-nav listing-nav--next" data-reviews-step="1" aria-label="' +
      escapeHtml(t("lightbox_next_ph")) +
      '"' +
      (n < 2 ? " disabled" : "") +
      "></button>" +
      "</div>" +
      '<p class="listing-photo-count" aria-live="polite">' +
      '<span class="listing-photo-count-num" data-reviews-count-num>' +
      String(state.index + 1) +
      "</span> / " +
      n +
      " " +
      escapeHtml(progressWord) +
      "</p>" +
      '<div class="listing-gallery-toolbar">' +
      '<button type="button" class="listing-tool-btn" data-reviews-open-lb>' +
      escapeHtml(t("listing_photo_big")) +
      "</button>" +
      "</div>" +
      thumbsBlock +
      "</div>" +
      "</article>";

    var article = root.querySelector("[data-reviews-article]");
    var imgEl = root.querySelector(".reviews-page-main-img");
    var countNum = root.querySelector("[data-reviews-count-num]");
    var prevBtn = root.querySelector("[data-reviews-step=\"-1\"]");
    var nextBtn = root.querySelector("[data-reviews-step=\"1\"]");
    var openLbBtn = root.querySelector("[data-reviews-open-lb]");
    var touchRoot = root.querySelector("[data-reviews-touch-root]");
    var thumbStrip = root.querySelector("[data-reviews-thumbs-strip]");

    function syncThumbsActive() {
      if (!thumbStrip) return;
      thumbStrip.querySelectorAll(".reviews-page-thumb").forEach(function (btn, i) {
        btn.classList.toggle("is-active", i === state.index);
        btn.setAttribute("aria-pressed", i === state.index ? "true" : "false");
      });
      var active = thumbStrip.querySelector(".reviews-page-thumb.is-active");
      var wrap = root.querySelector(".listing-thumbs-strip-wrap");
      if (active && wrap) {
        var ar = active.getBoundingClientRect();
        var wr = wrap.getBoundingClientRect();
        if (ar.left < wr.left + 4 || ar.right > wr.right - 4) {
          active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      }
    }

    function updateGallery(animate) {
      var i = ((state.index % n) + n) % n;
      state.index = i;
      if (!imgEl) return;

      function applySrc() {
        imgEl.src = urls[i];
        imgEl.alt = altBase + " " + (i + 1) + "/" + n;
        if (countNum) countNum.textContent = String(i + 1);
        syncThumbsActive();
        setHashIndex(i);
      }

      if (animate) {
        imgEl.classList.add("is-switching");
        window.setTimeout(function () {
          applySrc();
          imgEl.onload = function () {
            imgEl.classList.remove("is-switching");
          };
          window.setTimeout(function () {
            imgEl.classList.remove("is-switching");
          }, 400);
        }, 120);
      } else {
        applySrc();
      }
    }

    function step(delta) {
      if (n < 2) return;
      state.index = (state.index + delta + n) % n;
      updateGallery(true);
    }

    root.addEventListener("click", function (e) {
      var tgt = e.target;
      if (!(tgt instanceof Element)) return;

      var stepEl = tgt.closest("[data-reviews-step]");
      if (stepEl && root.contains(stepEl)) {
        var d = parseInt(stepEl.getAttribute("data-reviews-step"), 10);
        if (!isNaN(d)) step(d);
        return;
      }

      var thumb = tgt.closest("[data-reviews-idx]");
      if (thumb && root.contains(thumb)) {
        var idx = parseInt(thumb.getAttribute("data-reviews-idx"), 10);
        if (!isNaN(idx)) {
          state.index = idx;
          updateGallery(true);
        }
        return;
      }

      if (tgt.closest("[data-reviews-open-lb]") || tgt.classList.contains("reviews-page-main-img")) {
        openLightbox();
      }

      var tn = tgt.closest("[data-reviews-thumbs-nav]");
      if (tn && thumbStrip) {
        var wrap = root.querySelector(".listing-thumbs-strip-wrap");
        var dir = tn.getAttribute("data-reviews-thumbs-nav");
        if (wrap && dir === "prev") wrap.scrollBy({ left: -Math.max(120, wrap.clientWidth * 0.6), behavior: "smooth" });
        if (wrap && dir === "next") wrap.scrollBy({ left: Math.max(120, wrap.clientWidth * 0.6), behavior: "smooth" });
      }
    });

    /* Dokunmatik kaydırma — önceki / sonraki görsel */
    var touchStartX = null;
    if (touchRoot) {
      touchRoot.addEventListener(
        "touchstart",
        function (e) {
          if (e.touches && e.touches[0]) touchStartX = e.touches[0].clientX;
        },
        { passive: true }
      );
      touchRoot.addEventListener(
        "touchend",
        function (e) {
          if (touchStartX == null || n < 2) return;
          var endX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : touchStartX;
          var dx = endX - touchStartX;
          touchStartX = null;
          if (Math.abs(dx) < 48) return;
          if (dx < 0) step(1);
          else step(-1);
        },
        { passive: true }
      );
      touchRoot.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          step(-1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          step(1);
        }
      });
    }

    var thumbsWrap = root.querySelector(".listing-thumbs-strip-wrap");
    var thumbsPrevNav = root.querySelector('[data-reviews-thumbs-nav="prev"]');
    var thumbsNextNav = root.querySelector('[data-reviews-thumbs-nav="next"]');
    function syncThumbStripNav() {
      if (!thumbsWrap || !thumbsPrevNav || !thumbsNextNav) return;
      var maxS = thumbsWrap.scrollWidth - thumbsWrap.clientWidth;
      if (maxS <= 2) {
        thumbsPrevNav.disabled = true;
        thumbsNextNav.disabled = true;
        return;
      }
      thumbsPrevNav.disabled = thumbsWrap.scrollLeft <= 2;
      thumbsNextNav.disabled = thumbsWrap.scrollLeft >= maxS - 2;
    }
    if (thumbsWrap) {
      thumbsWrap.addEventListener("scroll", syncThumbStripNav, { passive: true });
      if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(syncThumbStripNav).observe(thumbsWrap);
      } else {
        window.addEventListener("resize", syncThumbStripNav);
      }
      syncThumbStripNav();
    }

    window.addEventListener("hashchange", function () {
      var ni = parseHashIndex(urls);
      if (ni !== state.index) {
        state.index = ni;
        updateGallery(false);
      }
    });

    syncThumbsActive();

    /* Lightbox — ilan sayfası ile aynı DOM */
    var lightbox = document.getElementById("listing-lightbox");
    var lbImg = lightbox ? lightbox.querySelector(".listing-lightbox-img") : null;
    var lbPrev = lightbox ? lightbox.querySelector(".listing-lightbox-prev") : null;
    var lbNext = lightbox ? lightbox.querySelector(".listing-lightbox-next") : null;
    var lbClose = lightbox ? lightbox.querySelector(".listing-lightbox-close") : null;
    var lbCounter = lightbox ? lightbox.querySelector(".listing-lightbox-counter") : null;

    var lbIdx = 0;

    function updateLbCounter() {
      if (lbCounter) lbCounter.textContent = String(lbIdx + 1) + "/" + String(n);
    }

    function openLightbox() {
      if (!lightbox || !lbImg || !urls.length) return;
      lbIdx = state.index;
      lbImg.src = urls[lbIdx];
      lbImg.alt = altBase + " " + (lbIdx + 1) + "/" + n;
      lightbox.hidden = false;
      document.body.classList.add("listing-lightbox-open");
      if (lbPrev) lbPrev.disabled = n < 2;
      if (lbNext) lbNext.disabled = n < 2;
      updateLbCounter();
      if (lbClose) lbClose.focus();
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.hidden = true;
      document.body.classList.remove("listing-lightbox-open");
      if (lbImg) lbImg.removeAttribute("src");
      state.index = lbIdx;
      updateGallery(false);
    }

    function lbStep(delta) {
      if (!lbImg || n < 2) return;
      lbIdx = (lbIdx + delta + n) % n;
      lbImg.src = urls[lbIdx];
      lbImg.alt = altBase + " " + (lbIdx + 1) + "/" + n;
      updateLbCounter();
    }

    if (lightbox) {
      if (lbClose) lbClose.addEventListener("click", closeLightbox);
      if (lbPrev) lbPrev.addEventListener("click", function () { lbStep(-1); });
      if (lbNext) lbNext.addEventListener("click", function () { lbStep(1); });
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
      });
      document.addEventListener("keydown", function reviewsLbKey(e) {
        if (!lightbox || lightbox.hidden) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") lbStep(-1);
        if (e.key === "ArrowRight") lbStep(1);
      });
    }

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReviewPageGallery);
  } else {
    initReviewPageGallery();
  }
})();
