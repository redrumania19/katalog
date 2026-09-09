// Her ürün/çeşit için doğru Open Graph (paylaşım önizlemesi) meta etiketleri taşıyan
// statik bir sayfa üretir: p/<urunId>-<gorselIndex>.html
//
// GitHub Pages gibi statik barındırmada, urun.html tek bir dosya olduğu için
// (?p=..&i=..) query string'ine göre içerik JS ile DEĞİŞTİRİLİYOR — ama WhatsApp/
// Instagram gibi paylaşım botları JS çalıştırmadan sadece <head> içindeki meta
// etiketlerini okur. Bu yüzden her ürün için ayrı, meta etiketleri gömülü küçük
// bir HTML dosyası üretiyoruz. Sayfanın geri kalanı (gövde + scriptler) urun.html
// ile birebir aynı; <base href="../"> sayesinde göreli yollar (style.css, görsel
// klasörleri vb.) kökten doğru şekilde çözülüyor.
//
// Kullanım: node scripts/generate-product-pages.js
// products.js her değiştiğinde (yeni ürün/çeşit eklendiğinde) yeniden çalıştırılmalı.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://redrumania19.github.io/katalog/";

function readProducts() {
  const raw = fs.readFileSync(path.join(ROOT, "products.js"), "utf8");
  const sandbox = { window: {} };
  new Function("window", raw)(sandbox.window);
  return sandbox.window.PRODUCTS;
}

function imgSrc(folder, file) {
  return encodeURIComponent(folder) + "/" + encodeURIComponent(file);
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

function escapeAttr(str) {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function extractBody(html) {
  const m = html.match(/<body>([\s\S]*)<\/body>/);
  if (!m) throw new Error("urun.html içinde <body> bulunamadı");
  return m[1];
}

function buildProductJsonLd(opts) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    image: [opts.image],
    description: opts.desc,
    sku: opts.sku,
    category: opts.category,
    brand: { "@type": "Brand", name: "Troy Soapun" },
    url: opts.url
  };
  // Google fiyat/stok bilgisi olmayan Offers'ı geçersiz sayar; sitede fiyat
  // gösterilmediği için offers kasıtlı olarak eklenmiyor.
  return JSON.stringify(data, null, 2).replace(/<\//g, "<\\/");
}

function buildHead(opts) {
  return [
    "<!DOCTYPE html>",
    '<html lang="tr">',
    "<head>",
    '<meta charset="UTF-8">',
    "<!-- Google tag (gtag.js) -->",
    '<script async src="https://www.googletagmanager.com/gtag/js?id=G-L1M5G05SW4"></script>',
    "<script>",
    "  window.dataLayer = window.dataLayer || [];",
    "  function gtag(){dataLayer.push(arguments);}",
    "  gtag('consent', 'default', { analytics_storage: localStorage.getItem('cookieConsent') === 'granted' ? 'granted' : 'denied' });",
    "  gtag('js', new Date());",
    "  gtag('set', { language_pref: localStorage.getItem('lang') || 'tr' });",
    "  gtag('config', 'G-L1M5G05SW4');",
    "</script>",
    '<base href="../">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<title id="page-title">' + escapeAttr(opts.title) + "</title>",
    '<meta name="description" content="' + escapeAttr(opts.desc) + '">',
    '<meta property="og:type" content="product">',
    '<meta property="og:site_name" content="Troy Soapun">',
    '<meta property="og:title" content="' + escapeAttr(opts.title) + '">',
    '<meta property="og:description" content="' + escapeAttr(opts.desc) + '">',
    '<meta property="og:image" content="' + escapeAttr(opts.image) + '">',
    '<meta property="og:url" content="' + escapeAttr(opts.url) + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + escapeAttr(opts.title) + '">',
    '<meta name="twitter:description" content="' + escapeAttr(opts.desc) + '">',
    '<meta name="twitter:image" content="' + escapeAttr(opts.image) + '">',
    '<link rel="canonical" href="' + escapeAttr(opts.url) + '">',
    '<link rel="icon" type="image/png" href="logo-256.png">',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Nunito+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">',
    '<link rel="stylesheet" href="style.css">',
    '<script type="application/ld+json">',
    opts.jsonLd,
    "</script>",
    "</head>"
  ].join("\n");
}

function main() {
  const products = readProducts();
  const urunHtml = fs.readFileSync(path.join(ROOT, "urun.html"), "utf8");
  const bodyTemplate = extractBody(urunHtml);

  const outDir = path.join(ROOT, "p");
  fs.mkdirSync(outDir, { recursive: true });

  const expectedFiles = new Set();
  let count = 0;

  products.forEach(function (p) {
    p.images.forEach(function (file, i) {
      const label = p.variantMode ? labelFor(p, i) : null;
      const fullName = p.title + (label ? " — " + label : "");
      const title = fullName + " | Troy Soapun";
      const desc = p.description || "Troy Soapun el yapımı doğal sabun kataloğu.";
      const imageAbs = SITE_URL + imgSrc(p.folder, p.images[i]);
      const fileName = p.id + "-" + i + ".html";
      const pageUrl = SITE_URL + "p/" + fileName;

      const presetScript = '<script>window.__PRESET_P__=' + JSON.stringify(p.id) + ';window.__PRESET_I__=' + i + ';</script>\n';
      let body = bodyTemplate;
      if (body.indexOf('<script src="detail.js"></script>') === -1) {
        throw new Error("urun.html içinde detail.js script etiketi bulunamadı");
      }
      body = body.replace('<script src="detail.js"></script>', presetScript + '<script src="detail.js"></script>');

      const jsonLd = buildProductJsonLd({
        name: fullName,
        desc: desc,
        image: imageAbs,
        url: pageUrl,
        sku: p.id + "-" + i,
        category: p.title
      });

      const html = buildHead({ title: title, desc: desc, image: imageAbs, url: pageUrl, jsonLd: jsonLd }) +
        "\n<body>" + body + "</body>\n</html>\n";

      fs.writeFileSync(path.join(outDir, fileName), html, "utf8");
      expectedFiles.add(fileName);
      count++;
    });
  });

  // Artık ürün listesinde olmayan eski üretilmiş sayfaları temizle
  const existing = fs.readdirSync(outDir);
  let removed = 0;
  existing.forEach(function (f) {
    if (!expectedFiles.has(f)) {
      fs.unlinkSync(path.join(outDir, f));
      removed++;
    }
  });

  console.log("Oluşturuldu: " + count + " sayfa (p/) — silinen eski sayfa: " + removed);
}

main();
