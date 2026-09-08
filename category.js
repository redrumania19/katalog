(function () {
  "use strict";

  var products = window.PRODUCTS || [];

  function imgSrc(folder, file) {
    return encodeURIComponent(folder).replace(/%2F/g, "/") + "/" + encodeURIComponent(file);
  }

  function cleanCaption(filename) {
    return filename
      .replace(/\.[^.]+$/, "")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function labelFor(product, i) {
    if (product.labels && product.labels[i]) return product.labels[i];
    return cleanCaption(product.images[i]);
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function detailUrl(productId, imageIndex) {
    return "urun.html?p=" + encodeURIComponent(productId) + "&i=" + imageIndex;
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

    document.getElementById("page-title").textContent = p.title + " | Troy Soapun";
    document.getElementById("category-eyebrow").textContent = "Koleksiyon";
    document.getElementById("category-title").textContent = p.title;
    var subtitleEl = document.getElementById("category-subtitle");
    if (p.subtitle) {
      subtitleEl.textContent = p.subtitle;
      subtitleEl.style.display = "";
    } else {
      subtitleEl.style.display = "none";
    }
    document.getElementById("category-desc").textContent = p.description || "";

    var wrap = document.getElementById("item-grid");
    var html = "";
    p.images.forEach(function (file, iIdx) {
      var src = imgSrc(p.folder, file);
      var label = p.variantMode ? labelFor(p, iIdx) : p.title;
      var fullLabel = p.title + (p.variantMode ? " — " + label : "");
      html += '' +
        '<div class="item-card">' +
          '<a class="item-card-link" href="' + detailUrl(p.id, iIdx) + '">' +
            '<div class="item-card-image"><img src="' + src + '" alt="' + escapeHtml(fullLabel) + '" loading="lazy" draggable="false"></div>' +
            '<div class="item-card-label">' + escapeHtml(label) + '</div>' +
          '</a>' +
          '<label class="item-check">' +
            '<input type="checkbox" class="quote-check" data-p="' + escapeHtml(p.id) + '" data-i="' + iIdx + '" data-label="' + escapeHtml(fullLabel) + '">' +
            '<span>Teklife ekle</span>' +
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
