// Showwork marketing site: tiny progressive enhancement. The site works with JS off (except the form's mailto fallback).
(function () {
  // mobile menu
  var btn = document.querySelector(".menu-btn"), links = document.querySelector(".links");
  if (btn && links) btn.addEventListener("click", function () {
    var open = links.classList.toggle("open"); btn.setAttribute("aria-expanded", String(open));
  });

  // tabs
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var tabs = root.querySelectorAll(".tab"), panels = root.querySelectorAll(".panel");
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x, j) { x.setAttribute("aria-selected", String(i === j)); panels[j].classList.toggle("show", i === j); });
      });
    });
  });

  // lightbox for real screenshots (any img.zoomable) and the simulator's thumbnails
  var lb = document.createElement("div"); lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-label", "Screenshot");
  lb.innerHTML = '<button type="button" aria-label="Close">×</button><img alt="">'; document.body.appendChild(lb);
  window.openLightbox = function (src, alt) { lb.querySelector("img").src = src; lb.querySelector("img").alt = alt || ""; lb.classList.add("open"); lb.querySelector("button").focus(); };
  lb.addEventListener("click", function () { lb.classList.remove("open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.classList.remove("open"); });
  document.addEventListener("click", function (e) { var i = e.target.closest("img.zoomable"); if (i) window.openLightbox(i.currentSrc || i.src, i.alt); });

  // demo-request form
  var form = document.getElementById("lead-form");
  if (form) form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (form.elements["website"] && form.elements["website"].value) return; // honeypot
    var data = {};
    new FormData(form).forEach(function (v, k) { if (k !== "website") data[k] = String(v).trim(); });
    submitLead(data).then(function () {
      form.style.display = "none"; document.getElementById("lead-sent").classList.add("show");
    }).catch(function () {
      document.getElementById("lead-error").style.display = "block";
    });
  });

  // TODO(human): decide where a demo request goes.
  // `data` holds name, email, company, role, team, stack and message. This must return a Promise that resolves
  // once the request is delivered and rejects if it is not. The placeholder below only opens the visitor's mail
  // client, which loses the lead if they have none configured. Options: a form service (Formspree, Basin,
  // Google Apps Script) via fetch(), or your own endpoint. Keep the address out of the page source if you can.
  function submitLead(data) {
    var to = "demo@example.com"; // replace
    var body = Object.keys(data).map(function (k) { return k + ": " + data[k]; }).join("\n");
    window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent("Showwork demo request: " + (data.company || data.name)) +
      "&body=" + encodeURIComponent(body);
    return Promise.resolve();
  }
})();
