/**
 * Müşteri yorumları: WhatsApp ile görüş gönderimi, yayınlanan metinler, fotoğraf ızgarası.
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

  function getPublishedReviews() {
    if (typeof MUSTERI_YORUM_TEXTS === "undefined" || !Array.isArray(MUSTERI_YORUM_TEXTS)) return [];
    return MUSTERI_YORUM_TEXTS.filter(function (r) {
      return r && String(r.comment || "").trim();
    });
  }

  function renderTextReviewCard(r) {
    var dateLine = String(r.date || "").trim();
    return (
      '<article class="review-quote-card">' +
      '<p class="review-quote-card-text">“' +
      escapeHtml(String(r.comment || "").trim()) +
      '”</p>' +
      '<footer class="review-quote-card-meta">' +
      "<span class=\"review-quote-card-name\">" +
      escapeHtml(String(r.name || "").trim() || "—") +
      "</span>" +
      (dateLine ? '<span class="review-quote-card-date">' + escapeHtml(dateLine) + "</span>" : "") +
      "</footer></article>"
    );
  }

  function initReviewTexts() {
    var root = document.getElementById("reviews-text-root");
    if (!root) return;
    var reviews = getPublishedReviews();
    if (!reviews.length) {
      root.innerHTML = '<p class="reviews-text-empty">' + escapeHtml(t("reviews_text_empty")) + "</p>";
      return;
    }
    root.innerHTML = reviews.map(renderTextReviewCard).join("");
  }

  function buildReviewWhatsAppUrl(name, comment) {
    if (typeof SITE === "undefined") return "";
    var num = String(SITE.whatsappE164 || "").replace(/\D/g, "");
    if (!num) return "";
    var msg =
      (typeof window.I18N !== "undefined" && window.I18N.getLocale() === "en"
        ? "Hello, I would like to share my feedback for the website:\n\n"
        : "Merhaba, web sitesi için görüşümü paylaşmak istiyorum:\n\n") +
      name +
      "\n\n" +
      comment;
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
  }

  function initReviewForm() {
    var form = document.getElementById("reviews-submit-form");
    if (!form) return;
    var nameEl = document.getElementById("review-name");
    var commentEl = document.getElementById("review-comment");
    var statusEl = document.getElementById("reviews-form-status");
    if (!nameEl || !commentEl) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = String(nameEl.value || "").trim();
      var comment = String(commentEl.value || "").trim();

      if (statusEl) {
        statusEl.hidden = true;
        statusEl.classList.remove("is-error");
        statusEl.textContent = "";
      }

      if (name.length < 2) {
        if (statusEl) {
          statusEl.hidden = false;
          statusEl.classList.add("is-error");
          statusEl.textContent = t("reviews_form_err_name");
        }
        nameEl.focus();
        return;
      }
      if (comment.length < 10) {
        if (statusEl) {
          statusEl.hidden = false;
          statusEl.classList.add("is-error");
          statusEl.textContent = t("reviews_form_err_comment");
        }
        commentEl.focus();
        return;
      }

      var waUrl = buildReviewWhatsAppUrl(name, comment);
      if (!waUrl) {
        if (statusEl) {
          statusEl.hidden = false;
          statusEl.classList.add("is-error");
          statusEl.textContent = t("reviews_form_wa_unavailable");
        }
        return;
      }

      window.location.href = waUrl;
    });
  }

  function initReviewPhotoGrid() {
    var root = document.getElementById("reviews-gallery-root");
    if (!root) return;

    var urls =
      typeof MUSTERI_YORUM_PHOTOS !== "undefined"
        ? MUSTERI_YORUM_PHOTOS.filter(function (u) {
            return String(u || "").trim();
          })
        : [];

    if (!urls.length) {
      root.innerHTML = '<p class="reviews-photo-empty">' + escapeHtml(t("reviews_page_empty")) + "</p>";
      return;
    }

    root.innerHTML = urls
      .map(function (url, i) {
        return (
          '<button type="button" class="reviews-photo-tile" data-reviews-photo-idx="' +
          i +
          '" aria-label="' +
          escapeHtml(t("photo_n") + " " + (i + 1)) +
          '">' +
          '<img src="' +
          escapeHtml(url) +
          '" alt="" loading="lazy" decoding="async" />' +
          "</button>"
        );
      })
      .join("");

    var lightbox = document.getElementById("listing-lightbox");
    var lbImg = lightbox ? lightbox.querySelector(".listing-lightbox-img") : null;
    var lbPrev = lightbox ? lightbox.querySelector(".listing-lightbox-prev") : null;
    var lbNext = lightbox ? lightbox.querySelector(".listing-lightbox-next") : null;
    var lbClose = lightbox ? lightbox.querySelector(".listing-lightbox-close") : null;
    var lbCounter = lightbox ? lightbox.querySelector(".listing-lightbox-counter") : null;
    var lbIdx = 0;

    function updateLb() {
      if (!lbImg) return;
      lbImg.src = urls[lbIdx];
      lbImg.alt = t("review_alt") + " " + (lbIdx + 1) + "/" + urls.length;
      if (lbCounter) lbCounter.textContent = lbIdx + 1 + "/" + urls.length;
      if (lbPrev) lbPrev.disabled = urls.length < 2;
      if (lbNext) lbNext.disabled = urls.length < 2;
    }

    function openLb(i) {
      if (!lightbox || !lbImg) return;
      lbIdx = i;
      updateLb();
      lightbox.hidden = false;
      document.body.classList.add("listing-lightbox-open");
      if (lbClose) lbClose.focus();
    }

    function closeLb() {
      if (!lightbox) return;
      lightbox.hidden = true;
      document.body.classList.remove("listing-lightbox-open");
      if (lbImg) lbImg.removeAttribute("src");
    }

    function lbStep(d) {
      if (urls.length < 2) return;
      lbIdx = (lbIdx + d + urls.length) % urls.length;
      updateLb();
    }

    root.addEventListener("click", function (e) {
      var tile = e.target.closest("[data-reviews-photo-idx]");
      if (!tile || !root.contains(tile)) return;
      var i = parseInt(tile.getAttribute("data-reviews-photo-idx"), 10);
      if (!isNaN(i)) openLb(i);
    });

    if (lightbox) {
      if (lbClose) lbClose.addEventListener("click", closeLb);
      if (lbPrev) lbPrev.addEventListener("click", function () { lbStep(-1); });
      if (lbNext) lbNext.addEventListener("click", function () { lbStep(1); });
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLb();
      });
      document.addEventListener("keydown", function (e) {
        if (lightbox.hidden) return;
        if (e.key === "Escape") closeLb();
        if (e.key === "ArrowLeft") lbStep(-1);
        if (e.key === "ArrowRight") lbStep(1);
      });
    }
  }

  function initReviewsPage() {
    initReviewForm();
    initReviewTexts();
    initReviewPhotoGrid();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReviewsPage);
  } else {
    initReviewsPage();
  }
})();
