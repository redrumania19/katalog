(function () {
  "use strict";

  var products = window.PRODUCTS || [];
  var MAX_RESULTS = 40;

  function imgSrc(folder, file) {
    return encodeURIComponent(folder).replace(/%2F/g, "/") + "/" + encodeURIComponent(file);
  }

  function webpSrc(folder, file) {
    return imgSrc(folder, file.replace(/\.[^.]+$/, ".webp"));
  }

  function cleanCaption(filename) {
    return filename
      .replace(/\.[^.]+$/, "")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function labelFor(product, i) {
    var raw = (product.labels && product.labels[i]) ? product.labels[i] : cleanCaption(product.images[i]);
    return window.I18N ? window.I18N.tVariant(raw) : raw;
  }

  function tCat(p, field) {
    return (window.I18N ? window.I18N.tCat(p.id, field, p[field]) : p[field]) || "";
  }

  function t(key, vars, fallback) {
    var val = window.I18N ? window.I18N.t(key, vars) : null;
    return val != null ? val : fallback;
  }

  function detailUrl(productId, imageIndex) {
    return "p/" + encodeURIComponent(productId) + "-" + imageIndex + ".html";
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  var TR_MAP = { "ı": "i", "İ": "i", "i": "i", "ş": "s", "Ş": "s", "ğ": "g", "Ğ": "g", "ü": "u", "Ü": "u", "ö": "o", "Ö": "o", "ç": "c", "Ç": "c" };

  function normalize(str) {
    return String(str).toLowerCase().replace(/[ışğüöçİŞĞÜÖÇ]/g, function (ch) {
      return TR_MAP[ch] || ch;
    });
  }

  var index = [];
  products.forEach(function (p) {
    var title = tCat(p, "title");
    var subtitle = tCat(p, "subtitle");
    p.images.forEach(function (file, i) {
      var label = p.variantMode ? labelFor(p, i) : title;
      var fullLabel = title + (p.variantMode ? " — " + label : "");
      index.push({
        p: p.id,
        i: i,
        folder: p.folder,
        file: file,
        title: title,
        subtitle: subtitle,
        label: label,
        fullLabel: fullLabel,
        searchText: normalize(title + " " + label + " " + (subtitle || ""))
      });
    });
  });

  var toggleBtn = document.getElementById("search-toggle");
  var panel = document.getElementById("search-panel");
  var input = document.getElementById("search-input");
  var resultsEl = document.getElementById("search-results");

  if (!toggleBtn || !panel || !input || !resultsEl) return;

  function openPanel() {
    panel.classList.add("open");
    setTimeout(function () { input.focus(); }, 10);
  }

  function closePanel() {
    panel.classList.remove("open");
  }

  toggleBtn.addEventListener("click", function () {
    if (panel.classList.contains("open")) closePanel();
    else openPanel();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePanel();
  });

  document.addEventListener("click", function (e) {
    if (!panel.classList.contains("open")) return;
    if (panel.contains(e.target) || e.target === toggleBtn) return;
    closePanel();
  });

  function renderResults(query) {
    var q = normalize(query.trim());
    if (!q) {
      resultsEl.innerHTML = '<p class="search-hint">' + escapeHtml(t("search.startHint", null, "Aramaya başlamak için ürün veya çeşit adı yazın.")) + '</p>';
      return;
    }

    var matches = index.filter(function (it) { return it.searchText.indexOf(q) !== -1; });

    if (!matches.length) {
      resultsEl.innerHTML = '<p class="search-hint">' + escapeHtml(t("search.noResults", { q: query }, '"' + query + '" için sonuç bulunamadı.')) + '</p>';
      return;
    }

    var shown = matches.slice(0, MAX_RESULTS);
    var html = shown.map(function (it) {
      return '' +
        '<a class="search-result" href="' + detailUrl(it.p, it.i) + '">' +
          '<picture>' +
            '<source srcset="' + webpSrc(it.folder, it.file) + '" type="image/webp">' +
            '<img src="' + imgSrc(it.folder, it.file) + '" alt="" loading="lazy" draggable="false">' +
          '</picture>' +
          '<span class="search-result-text">' +
            '<span class="search-result-title">' + escapeHtml(it.fullLabel) + '</span>' +
            (it.subtitle ? '<span class="search-result-sub">' + escapeHtml(it.subtitle) + '</span>' : '') +
          '</span>' +
        '</a>';
    }).join("");

    if (matches.length > MAX_RESULTS) {
      var n = matches.length - MAX_RESULTS;
      html += '<p class="search-hint">' + escapeHtml(t("search.moreResults", { n: n }, "+" + n + " sonuç daha var, aramayı daraltın.")) + '</p>';
    }

    resultsEl.innerHTML = html;
  }

  input.addEventListener("input", function () {
    renderResults(input.value);
  });

  renderResults("");
})();
