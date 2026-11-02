(function () {
  var d = document, root = d.documentElement;
  root.classList.remove("no-js");
  var cfg = window.CAMNEXO || { downloads: {}, contactEmail: "" };

  // Navigation: solid bar after scrolling, menu on phones.
  var nav = d.querySelector(".nav");
  function onScroll() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 12); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  var btn = d.querySelector(".menu-btn");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); });
    });
  }

  // Reveal on scroll.
  var items = d.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Soft spotlight that follows the pointer on cards.
  d.querySelectorAll(".card").forEach(function (c) {
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", e.clientX - r.left + "px");
      c.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  // Resolution chips: click to preview the label in the hero.
  var chips = d.querySelectorAll(".res");
  var resChip = d.querySelector(".chip.rez");
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      chips.forEach(function (x) { x.classList.remove("on"); });
      c.classList.add("on");
      if (resChip) resChip.textContent = c.getAttribute("data-label");
    });
  });

  // Downloads: filled from config.js. Buttons stay disabled until a URL is set.
  function os() {
    var u = navigator.userAgent || "", p = navigator.platform || "";
    if (/Android/i.test(u)) return "android";
    if (/Win/i.test(p) || /Windows/i.test(u)) return "windows";
    if (/Mac/i.test(p) && !/iPhone|iPad/i.test(u)) return "macos";
    if (/Linux|X11/i.test(p + u)) return "linux";
    return "";
  }
  var mine = os();
  var names = { windows: "Windows", macos: "macOS", linux: "Linux", android: "Android" };
  d.querySelectorAll("[data-dl]").forEach(function (el) {
    var key = el.getAttribute("data-dl"), info = cfg.downloads[key] || { status: "soon", url: "" };
    var ready = !!info.url;
    var badge = el.querySelector(".badge");
    if (badge) {
      badge.textContent = info.status === "early" ? "Early access" : ready ? "Available" : "Coming soon";
      badge.className = "badge " + (ready || info.status === "early" ? "early" : "soon");
    }
    var fine = el.querySelector(".fine");
    if (fine) {
      fine.textContent = info.note || "";
      if (ready && info.sha256) {
        // The checksum is for people who want to verify the file; keep it folded away.
        var det = d.createElement("details");
        det.className = "verify";
        var sum = d.createElement("summary");
        sum.textContent = "Verify download";
        var h = d.createElement("span");
        h.className = "hash";
        h.textContent = "SHA-256: " + info.sha256;
        det.appendChild(sum);
        det.appendChild(h);
        fine.appendChild(det);
      }
    }
    var a = el.querySelector("a.btn");
    if (a) {
      if (ready && info.store) {
        // A store page: opens in a new tab, no file is downloaded from here.
        a.href = info.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.removeAttribute("aria-disabled");
        a.textContent = "Get it on Google Play";
      }
      else if (ready) {
        a.href = info.url;
        a.setAttribute("download", "");
        a.removeAttribute("aria-disabled");
        a.textContent = "Download" + (info.size ? " (" + info.size + ")" : "");
      }
      else {
        a.href = "mailto:" + cfg.contactEmail + "?subject=" + encodeURIComponent("CamNexo early access: " + names[key]);
        a.textContent = info.status === "early" ? "Ask for early access" : "Notify me";
      }
    }
    if (key === mine) el.classList.add("me");
  });
  var hero = d.querySelector("[data-hero-dl]");
  if (hero) {
    var mineInfo = cfg.downloads[mine] || {};
    var label = names[mine] && mineInfo.url ? (mineInfo.store ? "Get it on Google Play" : "Download for " + names[mine]) : "Get CamNexo";
    var t = hero.querySelector("span"); if (t) t.textContent = label;
  }
  d.querySelectorAll("[data-mail]").forEach(function (a) {
    a.href = "mailto:" + cfg.contactEmail;
    if (!a.textContent.trim()) a.textContent = cfg.contactEmail;
  });
  d.querySelectorAll(".year").forEach(function (y) { y.textContent = new Date().getFullYear(); });

  // Table of contents highlight on document pages.
  var toc = d.querySelectorAll(".toc a");
  if (toc.length && "IntersectionObserver" in window) {
    var map = {};
    toc.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { toc.forEach(function (a) { a.classList.remove("on"); }); var a = map[e.target.id]; if (a) a.classList.add("on"); }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    d.querySelectorAll(".prose h2[id]").forEach(function (h) { so.observe(h); });
  }
})();
