// sitemap.xml ve robots.txt üretir — Google'ın tüm kategori ve ürün sayfalarını
// keşfedip indekslemesi için.
//
// Kullanım: node scripts/generate-sitemap.js
// products.js her değiştiğinde (yeni ürün/çeşit eklendiğinde/silindiğinde)
// yeniden çalıştırılmalı.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://troysoapun.com/";

function readProducts() {
  const raw = fs.readFileSync(path.join(ROOT, "products.js"), "utf8");
  const sandbox = { window: {} };
  new Function("window", raw)(sandbox.window);
  return sandbox.window.PRODUCTS;
}

function main() {
  const products = readProducts();
  const today = new Date().toISOString().slice(0, 10);

  const BLOG_SLUGS = [
    "dogal-sabun-fabrikasyon-sabun-farki",
    "sabun-saklama-onerileri",
    "cilt-tipine-gore-sabun-secimi",
    "toptan-sabun-alirken-dikkat-edilmesi-gerekenler",
    "zeytinyagli-sabunun-faydalari"
  ];

  const urls = [];
  urls.push({ loc: SITE_URL + "index.html", priority: "1.0" });
  urls.push({ loc: SITE_URL + "blog.html", priority: "0.7" });
  BLOG_SLUGS.forEach(function (slug) {
    urls.push({ loc: SITE_URL + "blog/" + slug + ".html", priority: "0.6" });
  });

  products.forEach(function (p) {
    urls.push({ loc: SITE_URL + "kategori.html?c=" + encodeURIComponent(p.id), priority: "0.8" });
    p.images.forEach(function (file, i) {
      urls.push({ loc: SITE_URL + "p/" + encodeURIComponent(p.id) + "-" + i + ".html", priority: "0.6" });
    });
  });

  const body = urls.map(function (u) {
    return "  <url>\n" +
      "    <loc>" + u.loc.replace(/&/g, "&amp;") + "</loc>\n" +
      "    <lastmod>" + today + "</lastmod>\n" +
      "    <priority>" + u.priority + "</priority>\n" +
      "  </url>";
  }).join("\n");

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    body + "\n" +
    "</urlset>\n";

  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml, "utf8");

  const robots = "User-agent: *\n" +
    "Allow: /\n" +
    "Sitemap: " + SITE_URL + "sitemap.xml\n";
  fs.writeFileSync(path.join(ROOT, "robots.txt"), robots, "utf8");

  console.log("sitemap.xml oluşturuldu: " + urls.length + " URL");
  console.log("robots.txt oluşturuldu");
}

main();
