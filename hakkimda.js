(function () {
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var openAboutPhotoLightboxRef = null;

  var aboutLb = {
    el: null,
    img: null,
    cap: null,
    cnt: null,
    prev: null,
    next: null,
    close: null,
    urls: [],
    idx: 0,
    title: "",
  };

  function initAboutLightbox() {
    aboutLb.el = document.getElementById("about-photo-lightbox");
    if (!aboutLb.el) return;
    aboutLb.img = aboutLb.el.querySelector(".about-lightbox-img");
    aboutLb.cap = aboutLb.el.querySelector(".about-lightbox-caption");
    aboutLb.cnt = aboutLb.el.querySelector(".about-lightbox-counter");
    aboutLb.prev = aboutLb.el.querySelector(".about-lightbox-prev");
    aboutLb.next = aboutLb.el.querySelector(".about-lightbox-next");
    aboutLb.close = aboutLb.el.querySelector(".about-lightbox-close");

    function updateAboutLb() {
      var u = aboutLb.urls;
      var i = aboutLb.idx;
      if (!aboutLb.img || !u.length) return;
      aboutLb.img.src = u[i];
      aboutLb.img.alt = aboutLb.title ? aboutLb.title + " " + (i + 1) + "/" + u.length : "Görsel " + (i + 1) + "/" + u.length;
      if (aboutLb.cnt) {
        aboutLb.cnt.textContent = String(i + 1) + " / " + String(u.length);
      }
      if (aboutLb.cap) {
        aboutLb.cap.textContent = aboutLb.title ? aboutLb.title + " · " + String(i + 1) + " / " + String(u.length) : "";
        aboutLb.cap.style.display = aboutLb.title ? "" : "none";
      }
      if (aboutLb.prev) aboutLb.prev.disabled = u.length < 2;
      if (aboutLb.next) aboutLb.next.disabled = u.length < 2;
    }

    function openAboutLightbox(urls, startIdx, title) {
      aboutLb.urls = urls.slice();
      aboutLb.idx = ((startIdx % urls.length) + urls.length) % urls.length;
      aboutLb.title = String(title || "").trim();
      updateAboutLb();
      aboutLb.el.hidden = false;
      document.body.classList.add("about-lightbox-open");
      if (aboutLb.close) aboutLb.close.focus();
    }

    function closeAboutLightbox() {
      if (!aboutLb.el) return;
      aboutLb.el.hidden = true;
      document.body.classList.remove("about-lightbox-open");
      if (aboutLb.img) aboutLb.img.removeAttribute("src");
    }

    function stepAboutLb(delta) {
      var u = aboutLb.urls;
      if (u.length < 2) return;
      aboutLb.idx = (aboutLb.idx + delta + u.length) % u.length;
      updateAboutLb();
    }

    if (aboutLb.close) aboutLb.close.addEventListener("click", closeAboutLightbox);
    if (aboutLb.prev) aboutLb.prev.addEventListener("click", function () {
      stepAboutLb(-1);
    });
    if (aboutLb.next) aboutLb.next.addEventListener("click", function () {
      stepAboutLb(1);
    });

    aboutLb.el.addEventListener("click", function (e) {
      if (e.target === aboutLb.el) closeAboutLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!aboutLb.el || aboutLb.el.hidden) return;
      if (e.key === "Escape") closeAboutLightbox();
      if (e.key === "ArrowLeft") stepAboutLb(-1);
      if (e.key === "ArrowRight") stepAboutLb(1);
    });

    openAboutPhotoLightboxRef = openAboutLightbox;
  }

  function initRotator(root, urls, opts) {
    opts = opts || {};
    var intervalMs = opts.intervalMs || 5500;
    var emptyLabel = opts.emptyLabel || "Yakında";
    var frame = root.querySelector(".about-rotator-frame");
    var viewport = root.querySelector(".about-rotator-viewport");
    var img = root.querySelector(".about-rotator-img");
    var prevBtn = root.querySelector(".about-rotator-prev");
    var nextBtn = root.querySelector(".about-rotator-next");
    var controlsEl = root.querySelector(".about-rotator-controls");
    var galleryTitle =
      opts.galleryTitle || String(root.getAttribute("data-gallery") || "").trim() || "";

    if (!frame || !img) return;

    var list = (urls || []).filter(function (u) {
      return String(u || "").trim();
    });

    if (!list.length) {
      frame.innerHTML =
        '<div class="about-rotator-empty" role="img" aria-label="' +
        escapeHtml(emptyLabel) +
        '">' +
        '<span class="about-rotator-empty-icon" aria-hidden="true"></span>' +
        '<span class="about-rotator-empty-text">' +
        escapeHtml(emptyLabel) +
        "</span></div>";
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
      return;
    }

    var idx = 0;
    var timer = null;

    function applyAlt() {
      img.alt =
        (opts.altBase ? opts.altBase + " — " : "") +
        String(idx + 1) +
        "/" +
        list.length;
    }

    function goTo(i, animate) {
      idx = ((i % list.length) + list.length) % list.length;
      if (animate) {
        img.classList.add("is-switching");
        window.setTimeout(function () {
          img.src = list[idx];
          function done() {
            img.classList.remove("is-switching");
            img.removeEventListener("load", done);
            img.removeEventListener("error", done);
          }
          img.addEventListener("load", done);
          img.addEventListener("error", done);
          applyAlt();
        }, 150);
      } else {
        img.src = list[idx];
        applyAlt();
      }
    }

    function schedule() {
      if (timer) window.clearInterval(timer);
      timer = null;
      if (list.length < 2) return;
      timer = window.setInterval(function () {
        if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
        goTo(idx + 1, true);
      }, intervalMs);
    }

    function resetSchedule() {
      schedule();
    }

    goTo(0, false);
    if (prevBtn) prevBtn.disabled = list.length < 2;
    if (nextBtn) nextBtn.disabled = list.length < 2;

    schedule();

    if (viewport && typeof openAboutPhotoLightboxRef === "function") {
      viewport.setAttribute("aria-label", (opts.altBase || "Görsel") + " — tam boy için tıklayın");
      viewport.addEventListener("click", function (e) {
        e.preventDefault();
        openAboutPhotoLightboxRef(list, idx, galleryTitle);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goTo(idx - 1, true);
        resetSchedule();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goTo(idx + 1, true);
        resetSchedule();
      });
    }

    /* Sadece kontrol şeridine gelince otomatik oynatmayı duraklat (foto alanında imleçle gezmek İşlemler slaydını kilitlenmiş gibi gösterme). */
    function pauseAutoplay() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }
    function resumeAutoplay() {
      schedule();
    }
    if (controlsEl) {
      controlsEl.addEventListener("mouseenter", pauseAutoplay);
      controlsEl.addEventListener("mouseleave", resumeAutoplay);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initAboutLightbox();

    var oduller =
      typeof HAKKIMDA_ODULLER_PHOTOS !== "undefined" ? HAKKIMDA_ODULLER_PHOTOS : [];
    var islemler =
      typeof HAKKIMDA_ISLEMLER_PHOTOS !== "undefined" ? HAKKIMDA_ISLEMLER_PHOTOS : [];

    var r1 = document.getElementById("about-rotator-oduller");
    var r2 = document.getElementById("about-rotator-islemler");

    if (r1) {
      initRotator(r1, oduller, {
        altBase: "Ödül fotoğrafı",
        emptyLabel: "Ödül fotoğrafları eklendiğinde burada görünecek.",
        galleryTitle: "Ödüller",
      });
    }
    if (r2) {
      initRotator(r2, islemler, {
        altBase: "İşlem / başarı fotoğrafı",
        emptyLabel: "İşlem fotoğrafları eklendiğinde burada görünecek.",
        galleryTitle: "İşlemlerim",
      });
    }
  });
})();
