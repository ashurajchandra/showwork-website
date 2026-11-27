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
    var button = form.querySelector("button[type=submit]"), label = button.textContent, error = document.getElementById("lead-error");
    error.style.display = "none"; button.disabled = true; button.textContent = "Sending…";
    submitLead(data).then(function () {
      form.style.display = "none"; document.getElementById("lead-sent").classList.add("show");
    }).catch(function () {
      error.style.display = "block"; button.disabled = false; button.textContent = label;
    });
  });

  // Demo requests are delivered by Web3Forms (https://web3forms.com), which emails each submission to the address registered with this
  // access key. The key is meant to be public (it is visible in the page source); it can only send mail to that one address. To change
  // where requests go, create a new key in the Web3Forms dashboard and replace it here. Restrict it to the live domain there as well.
  var WEB3FORMS_KEY = "a77ab213-c30d-4cc3-94be-9e828cdb1110";

  // Resolves only when Web3Forms confirms the request was accepted; rejects on a network error or any other answer, so the page never
  // shows "Thanks" for a request that was not sent.
  function submitLead(data) {
    var payload = {
      access_key: WEB3FORMS_KEY,
      subject: "Showwork demo request: " + (data.company || data.name || "new lead"),
      from_name: "Showwork website"
    };
    Object.keys(data).forEach(function (k) { payload[k] = data[k]; });
    return fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().then(function (body) {
        if (!res.ok || !body.success) throw new Error((body && body.message) || "Not accepted");
      });
    });
  }
})();
