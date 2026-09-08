// Tüm ürün görsellerinin yanına, mobilde daha hızlı yüklenmesi için sıkıştırılmış
// bir .webp kopyası üretir (orijinal dosyalar korunur, silinmez).
//
// Gereksinim: bu klasörde (scripts/) "sharp" paketi kurulu olmalı (node_modules dahil).
// Kullanım: node scripts/generate-webp.js

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const MAX_DIM = 1200;
const QUALITY = 75;
const SKIP_DIRS = new Set([".git", ".claude", "node_modules", "scripts", "p"]);
const EXTS = new Set([".png", ".jpg", ".jpeg", ".jfif"]);

function walk(dir, files) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
    if (entry.name.startsWith(".")) return;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) return;
      walk(full, files);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTS.has(ext)) files.push(full);
    }
  });
}

async function main() {
  const files = [];
  walk(ROOT, files);

  let converted = 0;
  let skipped = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const webpPath = file.replace(/\.[^.]+$/, ".webp");
    const srcStat = fs.statSync(file);

    if (fs.existsSync(webpPath)) {
      const webpStat = fs.statSync(webpPath);
      if (webpStat.mtimeMs >= srcStat.mtimeMs) {
        skipped++;
        continue;
      }
    }

    try {
      await sharp(file)
        .resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(webpPath);
      const webpStat = fs.statSync(webpPath);
      totalBefore += srcStat.size;
      totalAfter += webpStat.size;
      converted++;
    } catch (e) {
      console.error("HATA: " + file + " -> " + e.message);
    }
  }

  console.log("Dönüştürülen: " + converted + ", atlanan (güncel): " + skipped);
  if (converted > 0) {
    const mb = function (n) { return (n / 1024 / 1024).toFixed(1) + " MB"; };
    console.log("Toplam boyut: " + mb(totalBefore) + " -> " + mb(totalAfter));
  }
}

main();
