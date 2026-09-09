(function () {
  "use strict";

  var btn = document.getElementById("share-btn");
  var menu = document.getElementById("share-menu");
  var waLink = document.getElementById("share-whatsapp");
  var copyBtn = document.getElementById("share-copy");

  if (!btn || !menu || !waLink || !copyBtn) return;

  function t(key, vars, fallback) {
    var val = window.I18N ? window.I18N.t(key, vars) : null;
    return val != null ? val : fallback;
  }

  function currentUrl() {
    var canonical = document.querySelector('link[rel="canonical"]');
    return canonical ? canonical.href : window.location.href;
  }

  function shareTitle() {
    return document.title;
  }

  function openMenu() {
    waLink.href = "https://wa.me/?text=" + encodeURIComponent(shareTitle() + " — " + currentUrl());
    menu.classList.add("open");
  }

  btn.addEventListener("click", function () {
    if (navigator.share) {
      navigator.share({ title: shareTitle(), url: currentUrl() }).catch(function () {});
      return;
    }
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    } else {
      openMenu();
    }
  });

  copyBtn.addEventListener("click", function () {
    var url = currentUrl();
    var original = copyBtn.textContent;
    var done = function () {
      copyBtn.textContent = t("share.copied", null, "Kopyalandı!");
      setTimeout(function () { copyBtn.textContent = original; menu.classList.remove("open"); }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(function () {});
    } else {
      var temp = document.createElement("textarea");
      temp.value = url;
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      document.body.removeChild(temp);
    }
  });

  document.addEventListener("click", function (e) {
    if (!menu.classList.contains("open")) return;
    if (menu.contains(e.target) || e.target === btn) return;
    menu.classList.remove("open");
  });
})();
