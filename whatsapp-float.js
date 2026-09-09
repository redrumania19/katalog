(function () {
  "use strict";

  var WHATSAPP_NUMBER = "905469325840";

  function t(key, vars, fallback) {
    var val = window.I18N ? window.I18N.t(key, vars) : null;
    return val != null ? val : fallback;
  }

  var message = t("whatsapp.floatMessage", null, "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.");
  var label = t("whatsapp.floatLabel", null, "WhatsApp'tan yazın");

  var link = document.createElement("a");
  link.className = "whatsapp-float";
  link.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  link.target = "_blank";
  link.rel = "noopener";
  link.setAttribute("aria-label", label);
  link.innerHTML = '<span class="whatsapp-float-icon">💬</span>';
  document.body.appendChild(link);
})();
