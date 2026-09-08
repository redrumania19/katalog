(function () {
  "use strict";

  var products = window.PRODUCTS || [];

  function imgSrc(folder, file) {
    return encodeURIComponent(folder).replace(/%2F/g, "/") + "/" + encodeURIComponent(file);
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function categoryUrl(productId) {
    return "kategori.html?c=" + encodeURIComponent(productId);
  }

  function buildCategoryGrid() {
    var wrap = document.getElementById("category-grid");
    var html = "";

    products.forEach(function (p) {
      var cover = imgSrc(p.folder, p.images[0]);
      html += '' +
        '<a class="category-card" href="' + categoryUrl(p.id) + '">' +
          '<div class="category-card-image"><img src="' + cover + '" alt="' + escapeHtml(p.title) + '" loading="lazy"></div>' +
          '<div class="category-card-body">' +
            '<h3 class="category-card-title">' + escapeHtml(p.title) + '</h3>' +
            (p.subtitle ? '<div class="category-card-subtitle">' + escapeHtml(p.subtitle) + '</div>' : '') +
            '<p class="category-card-desc">' + escapeHtml(p.description || '') + '</p>' +
            '<div class="category-card-meta"><span>' + p.images.length + (p.variantMode ? ' çeşit' : ' fotoğraf') + '</span><span>Görüntüle →</span></div>' +
          '</div>' +
        '</a>';
    });

    wrap.innerHTML = html;
  }

  buildCategoryGrid();
})();
