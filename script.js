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

  function buildSections() {
    var wrap = document.getElementById("product-sections");
    var html = "";

    products.forEach(function (p) {
      html += '<div class="category-section" id="cat-' + p.id + '">';
      html += '<div class="category-head">';
      html += '<h3 class="category-title">' + escapeHtml(p.title) + (p.subtitle ? ' <span class="category-subtitle">' + escapeHtml(p.subtitle) + '</span>' : '') + '</h3>';
      html += '<p class="category-desc">' + escapeHtml(p.description || '') + '</p>';
      html += '</div>';

      html += '<div class="item-grid">';
      p.images.forEach(function (file, iIdx) {
        var src = imgSrc(p.folder, file);
        var label = p.variantMode ? labelFor(p, iIdx) : p.title;
        var fullLabel = p.title + (p.variantMode ? " — " + label : "");
        html += '' +
          '<div class="item-card">' +
            '<a class="item-card-link" href="' + detailUrl(p.id, iIdx) + '">' +
              '<div class="item-card-image"><img src="' + src + '" alt="' + escapeHtml(fullLabel) + '" loading="lazy"></div>' +
              '<div class="item-card-label">' + escapeHtml(label) + '</div>' +
            '</a>' +
            '<label class="item-check">' +
              '<input type="checkbox" class="quote-check" data-p="' + escapeHtml(p.id) + '" data-i="' + iIdx + '" data-label="' + escapeHtml(fullLabel) + '">' +
              '<span>Teklife ekle</span>' +
            '</label>' +
          '</div>';
      });
      html += '</div>';

      html += '</div>';
    });

    wrap.innerHTML = html;

    if (window.QuoteCart) {
      wrap.querySelectorAll(".quote-check").forEach(window.QuoteCart.initCheckbox);
    }
  }

  buildSections();
})();
