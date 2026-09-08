(function () {
  "use strict";

  var products = window.PRODUCTS || [];
  var WHATSAPP_NUMBER = "905469325840";

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

  function detailUrl(productId, imageIndex) {
    return "urun.html?p=" + encodeURIComponent(productId) + "&i=" + imageIndex;
  }

  function getParams() {
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
    var label = product.variantMode ? labelFor(product, index) : null;
    var fullName = product.title + (label ? " — " + label : "");

    document.getElementById("page-title").textContent = fullName + " | Troy Soapun";
    document.getElementById("detail-image").src = imgSrc(product.folder, file);
    document.getElementById("detail-image").alt = fullName;
    document.getElementById("detail-eyebrow").textContent = product.subtitle ? product.title + " · " + product.subtitle : product.title;
    document.getElementById("detail-title").textContent = label || product.title;
    document.getElementById("detail-subtitle").textContent = label ? product.title + (product.subtitle ? " (" + product.subtitle + ")" : "") : (product.subtitle || "");
    document.getElementById("detail-desc").textContent = product.description || "";
    document.getElementById("back-link").href = "index.html#cat-" + product.id;

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

    var orderText = "Merhaba, " + fullName + " hakkında bilgi almak istiyorum.";
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
        var thumbLabel = product.variantMode ? labelFor(product, i) : product.title;
        html += '' +
          '<a class="variant-thumb' + (i === index ? " active" : "") + '" href="' + detailUrl(product.id, i) + '">' +
            '<img src="' + imgSrc(product.folder, imgFile) + '" alt="' + thumbLabel.replace(/"/g, "&quot;") + '" loading="lazy">' +
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
