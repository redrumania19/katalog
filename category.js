(function () {
  "use strict";

  var products = window.PRODUCTS || [];

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

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function detailUrl(productId, imageIndex) {
    return "p/" + encodeURIComponent(productId) + "-" + imageIndex + ".html";
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function render() {
    var id = getParam("c");
    var p = products.find(function (x) { return x.id === id; });

    if (!p) {
      window.location.href = "index.html#urunler";
      return;
    }

    var catTitle = tCat(p, "title");
    var catSubtitle = tCat(p, "subtitle");
    var catDesc = tCat(p, "description");

    document.getElementById("page-title").textContent = catTitle + " | Troy Soapun";
    document.getElementById("category-eyebrow").textContent = (window.I18N && window.I18N.t("products.eyebrow")) || "Koleksiyon";
    document.getElementById("category-title").textContent = catTitle;
    var subtitleEl = document.getElementById("category-subtitle");
    if (catSubtitle) {
      subtitleEl.textContent = catSubtitle;
      subtitleEl.style.display = "";
    } else {
      subtitleEl.style.display = "none";
    }
    document.getElementById("category-desc").textContent = catDesc;

    var addToQuoteText = (window.I18N && window.I18N.t("item.addToQuote")) || "Teklife ekle";

    var wrap = document.getElementById("item-grid");
    var html = "";
    p.images.forEach(function (file, iIdx) {
      var src = imgSrc(p.folder, file);
      var label = p.variantMode ? labelFor(p, iIdx) : catTitle;
      var fullLabel = catTitle + (p.variantMode ? " — " + label : "");
      html += '' +
        '<div class="item-card">' +
          '<a class="item-card-link" href="' + detailUrl(p.id, iIdx) + '">' +
            '<div class="item-card-image"><picture><source srcset="' + webpSrc(p.folder, file) + '" type="image/webp"><img src="' + src + '" alt="' + escapeHtml(fullLabel) + '" loading="lazy" draggable="false"></picture></div>' +
            '<div class="item-card-label">' + escapeHtml(label) + '</div>' +
          '</a>' +
          '<label class="item-check">' +
            '<input type="checkbox" class="quote-check" data-p="' + escapeHtml(p.id) + '" data-i="' + iIdx + '" data-label="' + escapeHtml(fullLabel) + '">' +
            '<span>' + escapeHtml(addToQuoteText) + '</span>' +
          '</label>' +
        '</div>';
    });
    wrap.innerHTML = html;

    if (window.QuoteCart) {
      wrap.querySelectorAll(".quote-check").forEach(window.QuoteCart.initCheckbox);
    }
  }

  render();
})();
