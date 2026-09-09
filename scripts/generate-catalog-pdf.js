// Tüm ürün/çeşitleri içeren, WhatsApp'tan tek dosya olarak gönderilebilecek
// veya toptan görüşmelerde gösterilebilecek indirilebilir bir PDF katalog üretir.
//
// Kullanım: node scripts/generate-catalog-pdf.js
// products.js her değiştiğinde (yeni ürün/çeşit eklendiğinde/silindiğinde)
// yeniden çalıştırılmalı.

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

const ROOT = path.join(__dirname, "..");
const OUT_FILE = path.join(ROOT, "katalog-troysoapun.pdf");

const PAGE_W = 595.28; // A4
const PAGE_H = 841.89;
const MARGIN = 40;
const COLS = 3;
const GUTTER = 14;
const CELL_W = (PAGE_W - MARGIN * 2 - GUTTER * (COLS - 1)) / COLS;
const IMG_H = CELL_W * 0.78;
const LABEL_H = 26;
const CELL_H = IMG_H + LABEL_H + 10;

function readProducts() {
  const raw = fs.readFileSync(path.join(ROOT, "products.js"), "utf8");
  const sandbox = { window: {} };
  new Function("window", raw)(sandbox.window);
  return sandbox.window.PRODUCTS;
}

function cleanCaption(filename) {
  return filename.replace(/\.[^.]+$/, "").replace(/_/g, " ").replace(/\s+/g, " ").trim();
}

function labelFor(product, i) {
  if (product.labels && product.labels[i]) return product.labels[i];
  return cleanCaption(product.images[i]);
}

// Türkçe karakterleri PDF standart fontunun (WinAnsi) desteklediği en yakın
// karşılığa çevirir; StandardFonts Unicode desteklemediği için gereklidir.
function toAscii(str) {
  return String(str)
    .replace(/ı/g, "i").replace(/İ/g, "I")
    .replace(/ş/g, "s").replace(/Ş/g, "S")
    .replace(/ğ/g, "g").replace(/Ğ/g, "G")
    .replace(/ü/g, "u").replace(/Ü/g, "U")
    .replace(/ö/g, "o").replace(/Ö/g, "O")
    .replace(/ç/g, "c").replace(/Ç/g, "C");
}

function wrapText(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  words.forEach(function (word) {
    const test = current ? current + " " + word : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  });
  if (current) lines.push(current);
  return lines;
}

async function compressImage(fullPath) {
  const buf = await sharp(fullPath)
    .resize({ width: 500, height: 500, fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#f7f1e6" })
    .jpeg({ quality: 62 })
    .toBuffer();
  return buf;
}

async function main() {
  const products = readProducts();
  const pdf = await PDFDocument.create();
  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const ink = rgb(0.235, 0.196, 0.149);
  const inkSoft = rgb(0.42, 0.37, 0.31);
  const olive = rgb(0.435, 0.49, 0.31);
  const terracotta = rgb(0.757, 0.478, 0.306);
  const cream = rgb(0.969, 0.945, 0.902);

  // --- Kapak sayfası ---
  const paper = rgb(1, 0.992, 0.976);
  const line = rgb(0.886, 0.839, 0.749);
  const white = rgb(1, 1, 1);

  const cover = pdf.addPage([PAGE_W, PAGE_H]);
  cover.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: cream });

  function centerText(pg, text, y, size, font, color) {
    const w = font.widthOfTextAtSize(text, size);
    pg.drawText(text, { x: (PAGE_W - w) / 2, y, size, font, color });
    return w;
  }

  // Üst marka bandı
  const TOP_BAND_H = 92;
  cover.drawRectangle({ x: 0, y: PAGE_H - TOP_BAND_H, width: PAGE_W, height: TOP_BAND_H, color: olive });

  var logoImg = null;
  try {
    const logoBytes = fs.readFileSync(path.join(ROOT, "logo-256.png"));
    logoImg = await pdf.embedPng(logoBytes);
  } catch (e) {}

  var bandContentW = 0;
  const brandText = "TROY SOAPUN";
  const brandSize = 26;
  const brandTextW = fontBold.widthOfTextAtSize(brandText, brandSize);
  const logoSizeBand = 52;
  const logoGap = 14;
  if (logoImg) bandContentW = logoSizeBand + logoGap + brandTextW;
  else bandContentW = brandTextW;
  var bandStartX = (PAGE_W - bandContentW) / 2;
  const bandCenterY = PAGE_H - TOP_BAND_H / 2;

  if (logoImg) {
    cover.drawImage(logoImg, { x: bandStartX, y: bandCenterY - logoSizeBand / 2, width: logoSizeBand, height: logoSizeBand });
    bandStartX += logoSizeBand + logoGap;
  }
  cover.drawText(brandText, { x: bandStartX, y: bandCenterY - brandSize * 0.36, size: brandSize, font: fontBold, color: white });

  // Fotoğraf mozaiği
  const mosaicPhotos = [
    { folder: "Kalp Sünger Sabun 135 gr", file: "Gül Sabunu Kalp Ambalajı ve Güller.png" },
    { folder: "Kesme Sabun 125 gr", file: "Lavanta.png" },
    { folder: "Taş Dövme Sabun 120gr", file: "ChatGPT Image 7 Eyl 2026 01_53_36.png" },
    { folder: "Askılı Sabun", file: "Nazar Sabunu.jpg" }
  ];
  const mosaicCount = mosaicPhotos.length;
  const mosaicW = 118;
  const mosaicH = 140;
  const mosaicGap = 16;
  const mosaicTotalW = mosaicCount * mosaicW + (mosaicCount - 1) * mosaicGap;
  const mosaicStartX = (PAGE_W - mosaicTotalW) / 2;
  const mosaicTopY = PAGE_H - TOP_BAND_H - 26;
  const mosaicBottomY = mosaicTopY - mosaicH;

  for (let i = 0; i < mosaicPhotos.length; i++) {
    const mx = mosaicStartX + i * (mosaicW + mosaicGap);
    cover.drawRectangle({
      x: mx - 5, y: mosaicBottomY - 5, width: mosaicW + 10, height: mosaicH + 10,
      color: white, borderColor: line, borderWidth: 1
    });
    try {
      const fullPath = path.join(ROOT, mosaicPhotos[i].folder, mosaicPhotos[i].file);
      const jpegBuf = await compressImage(fullPath);
      const jpegImg = await pdf.embedJpg(jpegBuf);
      cover.drawImage(jpegImg, { x: mx, y: mosaicBottomY, width: mosaicW, height: mosaicH });
    } catch (e) {}
  }

  // Başlık
  const titleY = mosaicBottomY - 46;
  centerText(cover, toAscii("TOPTAN SABUN KATALOGU"), titleY, 25, fontBold, ink);
  centerText(cover, toAscii("El Yapimi Dogal Sabun Koleksiyonu - 2026"), titleY - 22, 12.5, fontRegular, terracotta);

  // Ayırıcı çizgi
  const dividerY = titleY - 42;
  cover.drawLine({
    start: { x: PAGE_W / 2 - 90, y: dividerY }, end: { x: PAGE_W / 2 + 90, y: dividerY },
    thickness: 1.4, color: terracotta
  });

  // İletişim kartı
  const cardW = 380;
  const cardX = (PAGE_W - cardW) / 2;
  const rowH = 25;
  const cardPadding = 20;
  const infoRows = [
    ["Adres", "Mercan Mah., Ismetiye Cad. No:19, Fatih / Istanbul"],
    ["WhatsApp / Tel", "+90 546 932 58 40"],
    ["E-posta", "troysoapun@gmail.com"],
    ["Web", "troysoapun.com"]
  ];
  const cardH = infoRows.length * rowH + cardPadding * 2 - 6;
  const cardTopY = dividerY - 26;
  const cardBottomY = cardTopY - cardH;

  cover.drawRectangle({
    x: cardX, y: cardBottomY, width: cardW, height: cardH,
    color: paper, borderColor: line, borderWidth: 1
  });

  let rowY = cardTopY - cardPadding - 8;
  infoRows.forEach(function (row) {
    const bulletSize = 7;
    cover.drawRectangle({
      x: cardX + cardPadding, y: rowY - bulletSize + 2, width: bulletSize, height: bulletSize,
      color: terracotta
    });
    const labelText = toAscii(row[0]) + ":";
    cover.drawText(labelText, {
      x: cardX + cardPadding + bulletSize + 10, y: rowY - 8, size: 10.5, font: fontBold, color: ink
    });
    const labelW = fontBold.widthOfTextAtSize(labelText, 10.5);
    cover.drawText(toAscii(row[1]), {
      x: cardX + cardPadding + bulletSize + 10 + labelW + 8, y: rowY - 8, size: 10.5, font: fontRegular, color: inkSoft
    });
    rowY -= rowH;
  });

  const noteText = toAscii("Fiyat ve minimum siparis adedi icin WhatsApp'tan iletisime gecebilirsiniz.");
  centerText(cover, noteText, cardBottomY - 26, 10.5, fontRegular, olive);

  // Alt marka bandı
  const BOTTOM_BAND_H = 30;
  cover.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: BOTTOM_BAND_H, color: olive });
  centerText(cover, toAscii("troysoapun.com  -  Fatih, Istanbul  -  Toptan ve Perakende Satis"), 11, 9.5, fontRegular, cream);

  // --- Ürün sayfaları ---
  for (const p of products) {
    let page = pdf.addPage([PAGE_W, PAGE_H]);
    let cursorY = PAGE_H - MARGIN;

    function ensureSpace(neededH) {
      if (cursorY - neededH < MARGIN) {
        page = pdf.addPage([PAGE_W, PAGE_H]);
        cursorY = PAGE_H - MARGIN;
      }
    }

    const catTitle = toAscii(p.title + (p.subtitle ? " (" + p.subtitle + ")" : ""));
    page.drawText(catTitle, { x: MARGIN, y: cursorY - 20, size: 18, font: fontBold, color: ink });
    cursorY -= 32;

    if (p.description) {
      const descLines = wrapText(toAscii(p.description), fontRegular, 10, PAGE_W - MARGIN * 2);
      descLines.forEach(function (line) {
        page.drawText(line, { x: MARGIN, y: cursorY - 10, size: 10, font: fontRegular, color: inkSoft });
        cursorY -= 14;
      });
    }
    cursorY -= 10;

    let col = 0;
    for (let i = 0; i < p.images.length; i++) {
      ensureSpace(CELL_H);

      const x = MARGIN + col * (CELL_W + GUTTER);
      const label = p.variantMode ? labelFor(p, i) : p.title;

      try {
        const fullPath = path.join(ROOT, p.folder, p.images[i]);
        const jpegBuf = await compressImage(fullPath);
        const jpegImg = await pdf.embedJpg(jpegBuf);
        const dims = jpegImg.scaleToFit(CELL_W, IMG_H);
        const drawX = x + (CELL_W - dims.width) / 2;
        const drawY = cursorY - IMG_H + (IMG_H - dims.height) / 2;
        page.drawRectangle({ x, y: cursorY - IMG_H, width: CELL_W, height: IMG_H, color: cream });
        page.drawImage(jpegImg, { x: drawX, y: drawY, width: dims.width, height: dims.height });
      } catch (e) {
        console.error("Gorsel eklenemedi: " + p.folder + "/" + p.images[i] + " -> " + e.message);
      }

      const labelText = toAscii(label);
      const labelSize = 9;
      const labelLines = wrapText(labelText, fontRegular, labelSize, CELL_W);
      let labelY = cursorY - IMG_H - 12;
      labelLines.slice(0, 2).forEach(function (line) {
        const lw = fontRegular.widthOfTextAtSize(line, labelSize);
        page.drawText(line, { x: x + (CELL_W - lw) / 2, y: labelY, size: labelSize, font: fontRegular, color: ink });
        labelY -= 11;
      });

      col++;
      if (col >= COLS) {
        col = 0;
        cursorY -= CELL_H;
      }
    }

    if (col !== 0) cursorY -= CELL_H;
  }

  const pageCount = pdf.getPageCount();
  for (let i = 1; i < pageCount; i++) {
    const pg = pdf.getPage(i);
    const text = "Troy Soapun  ·  " + (i) + " / " + (pageCount - 1);
    pg.drawText(text, { x: MARGIN, y: 20, size: 8, font: fontRegular, color: inkSoft });
  }

  const bytes = await pdf.save();
  fs.writeFileSync(OUT_FILE, bytes);

  const sizeMb = (bytes.length / 1024 / 1024).toFixed(2);
  console.log("katalog-troysoapun.pdf olusturuldu: " + pageCount + " sayfa, " + sizeMb + " MB");
}

main().catch(function (e) {
  console.error(e);
  process.exit(1);
});
