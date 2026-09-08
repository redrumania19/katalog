(function () {
  "use strict";

  var products = window.PRODUCTS || [];
  var WHATSAPP_NUMBER = "905469325840";

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

  function tCat(product, field) {
    return (window.I18N ? window.I18N.tCat(product.id, field, product[field]) : product[field]) || "";
  }

  function t(key, vars, fallback) {
    var val = window.I18N ? window.I18N.t(key, vars) : null;
    return val != null ? val : fallback;
  }

  function detailUrl(productId, imageIndex) {
    return "p/" + encodeURIComponent(productId) + "-" + imageIndex + ".html";
  }

  function getParams() {
    if (window.__PRESET_P__) {
      return { p: window.__PRESET_P__, i: window.__PRESET_I__ };
    }
    var params = new URLSearchParams(window.location.search);
    return { p: params.get("p"), i: parseInt(params.get("i"), 10) };
  }

  function render() {
    var params = getParams();
    var product = products.find(function (x) { return x.id === params.p; }) || products[0];
    if (!product) return;

    var total = product.images.length;
    var index = params.i;
    if (isNaN(index) || index < 0 || index >= total) index = 0;

    var file = product.images[index];
    var catTitle = tCat(product, "title");
    var catSubtitle = tCat(product, "subtitle");
    var catDesc = tCat(product, "description");
    var label = product.variantMode ? labelFor(product, index) : null;
    var fullName = catTitle + (label ? " — " + label : "");

    document.getElementById("page-title").textContent = fullName + " | Troy Soapun";
    document.getElementById("detail-source").setAttribute("srcset", webpSrc(product.folder, file));
    document.getElementById("detail-image").src = imgSrc(product.folder, file);
    document.getElementById("detail-image").alt = fullName;
    document.getElementById("detail-image").setAttribute("draggable", "false");
    document.getElementById("detail-eyebrow").textContent = catSubtitle ? catTitle + " · " + catSubtitle : catTitle;
    document.getElementById("detail-title").textContent = label || catTitle;
    document.getElementById("detail-subtitle").textContent = label ? catTitle + (catSubtitle ? " (" + catSubtitle + ")" : "") : catSubtitle;
    document.getElementById("detail-desc").textContent = catDesc;
    document.getElementById("back-link").href = "kategori.html?c=" + encodeURIComponent(product.id);

    var counter = document.getElementById("detail-counter");
    var prevLink = document.getElementById("prev-link");
    var nextLink = document.getElementById("next-link");
    if (total > 1) {
      counter.textContent = (index + 1) + " / " + total;
      prevLink.href = detailUrl(product.id, (index - 1 + total) % total);
      nextLink.href = detailUrl(product.id, (index + 1) % total);
      prevLink.style.display = "";
      nextLink.style.display = "";
    } else {
      counter.textContent = "";
      prevLink.style.display = "none";
      nextLink.style.display = "none";
    }

    var orderText = t("detail.orderMessage", { name: fullName }, "Merhaba, " + fullName + " hakkında bilgi almak istiyorum.");
    document.getElementById("order-link").href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(orderText);

    var quoteCheck = document.getElementById("detail-quote-check");
    quoteCheck.setAttribute("data-p", product.id);
    quoteCheck.setAttribute("data-i", index);
    quoteCheck.setAttribute("data-label", fullName);
    if (window.QuoteCart) window.QuoteCart.initCheckbox(quoteCheck);

    var variantsWrap = document.getElementById("variant-strip");
    var variantsSection = variantsWrap.closest(".detail-variants");
    if (total > 1) {
      var html = "";
      product.images.forEach(function (imgFile, i) {
        var thumbLabel = product.variantMode ? labelFor(product, i) : catTitle;
        html += '' +
          '<a class="variant-thumb' + (i === index ? " active" : "") + '" href="' + detailUrl(product.id, i) + '">' +
            '<picture>' +
              '<source srcset="' + webpSrc(product.folder, imgFile) + '" type="image/webp">' +
              '<img src="' + imgSrc(product.folder, imgFile) + '" alt="' + thumbLabel.replace(/"/g, "&quot;") + '" loading="lazy" draggable="false">' +
            '</picture>' +
            '<span>' + thumbLabel + '</span>' +
          '</a>';
      });
      variantsWrap.innerHTML = html;
      variantsSection.style.display = "";
    } else {
      variantsSection.style.display = "none";
    }
  }

  render();
})();
