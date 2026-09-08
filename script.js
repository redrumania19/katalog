(function () {
  "use strict";

  var products = window.PRODUCTS || [];

  function imgSrc(folder, file) {
    return encodeURIComponent(folder).replace(/%2F/g, "/") + "/" + encodeURIComponent(file);
  }

  function webpSrc(folder, file) {
    return imgSrc(folder, file.replace(/\.[^.]+$/, ".webp"));
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function categoryUrl(productId) {
    return "kategori.html?c=" + encodeURIComponent(productId);
  }

  function tCat(p, field) {
    return (window.I18N ? window.I18N.tCat(p.id, field, p[field]) : p[field]) || "";
  }

  function tCount(p) {
    if (window.I18N) {
      var key = p.variantMode ? "card.variantCount" : "card.photoCount";
      var txt = window.I18N.t(key, { n: p.images.length });
      if (txt != null) return txt;
    }
    return p.images.length + (p.variantMode ? " çeşit" : " fotoğraf");
  }

  function tView() {
    return (window.I18N && window.I18N.t("card.view")) || "Görüntüle →";
  }

  function buildCategoryGrid() {
    var wrap = document.getElementById("category-grid");
    var html = "";

    products.forEach(function (p) {
      var cover = imgSrc(p.folder, p.images[0]);
      var coverWebp = webpSrc(p.folder, p.images[0]);
      var title = tCat(p, "title");
      var subtitle = tCat(p, "subtitle");
      var desc = tCat(p, "description");
      html += '' +
        '<a class="category-card" href="' + categoryUrl(p.id) + '">' +
          '<div class="category-card-image"><picture><source srcset="' + coverWebp + '" type="image/webp"><img src="' + cover + '" alt="' + escapeHtml(title) + '" loading="lazy" draggable="false"></picture></div>' +
          '<div class="category-card-body">' +
            '<h3 class="category-card-title">' + escapeHtml(title) + '</h3>' +
            (subtitle ? '<div class="category-card-subtitle">' + escapeHtml(subtitle) + '</div>' : '') +
            '<p class="category-card-desc">' + escapeHtml(desc) + '</p>' +
            '<div class="category-card-meta"><span>' + escapeHtml(tCount(p)) + '</span><span>' + escapeHtml(tView()) + '</span></div>' +
          '</div>' +
        '</a>';
    });

    wrap.innerHTML = html;
  }

  buildCategoryGrid();
})();
