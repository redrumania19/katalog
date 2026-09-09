(function () {
  "use strict";

  var KEY = "cookieConsent";

  function t(key, vars, fallback) {
    var val = window.I18N ? window.I18N.t(key, vars) : null;
    return val != null ? val : fallback;
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  var existing = localStorage.getItem(KEY);
  if (existing === "granted" || existing === "denied") return;

  var wrap = document.createElement("div");
  wrap.className = "cookie-banner";
  wrap.innerHTML = '' +
    '<div class="cookie-banner-inner">' +
      '<p class="cookie-banner-text">' + escapeHtml(t("cookie.message", null, "Bu site, deneyiminizi geliştirmek ve ziyaretçi istatistiklerini anlamak için çerez kullanır.")) + '</p>' +
      '<div class="cookie-banner-actions">' +
        '<button type="button" class="btn btn-ghost cookie-reject" id="cookie-reject">' + escapeHtml(t("cookie.reject", null, "Reddet")) + '</button>' +
        '<button type="button" class="btn btn-primary cookie-accept" id="cookie-accept">' + escapeHtml(t("cookie.accept", null, "Kabul Et")) + '</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(wrap);

  function respond(decision) {
    localStorage.setItem(KEY, decision);
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: decision === "granted" ? "granted" : "denied" });
    }
    wrap.remove();
  }

  document.getElementById("cookie-accept").addEventListener("click", function () { respond("granted"); });
  document.getElementById("cookie-reject").addEventListener("click", function () { respond("denied"); });
})();
