(function () {
  "use strict";

  var STORAGE_KEY = "teklifListesi";
  var EMAIL_KEY = "teklifEmail";
  var TO_EMAIL = "troysoapun@gmail.com";
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/" + TO_EMAIL;

  function t(key, vars, fallback) {
    var val = window.I18N ? window.I18N.t(key, vars) : null;
    return val != null ? val : fallback;
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  var items = load();

  function isSelected(p, i) {
    return items.some(function (it) { return it.p === p && it.i === i; });
  }

  function addItem(item) {
    if (!isSelected(item.p, item.i)) {
      items.push(item);
      save();
      renderPanel();
    }
  }

  function removeItem(p, i) {
    items = items.filter(function (it) { return !(it.p === p && it.i === i); });
    save();
    renderPanel();
    document.querySelectorAll('input.quote-check[data-p="' + p + '"][data-i="' + i + '"]').forEach(function (cb) {
      cb.checked = false;
    });
  }

  function toggle(item) {
    if (isSelected(item.p, item.i)) removeItem(item.p, item.i);
    else addItem(item);
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  var panelEl, listEl, badgeEl, emailInput, statusEl, submitBtn;

  function buildUI() {
    var wrap = document.createElement("div");
    wrap.className = "quote-widget";
    wrap.innerHTML = '' +
      '<button class="quote-fab" id="quote-fab" type="button" aria-label="' + escapeHtml(t("quote.fabLabel", null, "Teklif Listesi")) + '">' +
        '<span class="quote-fab-icon">🧺</span>' +
        '<span>' + escapeHtml(t("quote.fabLabel", null, "Teklif Listem")) + '</span>' +
        '<span class="quote-badge" id="quote-badge">0</span>' +
      '</button>' +
      '<div class="quote-panel" id="quote-panel">' +
        '<div class="quote-panel-head">' +
          '<h4>' + escapeHtml(t("quote.panelTitle", null, "Teklif Listeniz")) + '</h4>' +
          '<button class="quote-panel-close" id="quote-panel-close" type="button" aria-label="Kapat">✕</button>' +
        '</div>' +
        '<div class="quote-list" id="quote-list"></div>' +
        '<div class="quote-panel-footer">' +
          '<label class="quote-email-label" for="quote-email">' + escapeHtml(t("quote.emailLabel", null, "E-posta adresiniz")) + '</label>' +
          '<input type="email" id="quote-email" placeholder="' + escapeHtml(t("quote.emailPlaceholder", null, "ornek@eposta.com")) + '" required>' +
          '<button class="btn btn-primary quote-submit" id="quote-submit" type="button">' + escapeHtml(t("quote.submit", null, "Teklif Al")) + '</button>' +
          '<p class="quote-status" id="quote-status"></p>' +
          '<p class="quote-note">' + escapeHtml(t("quote.note", null, "Seçtiğiniz ürünler e-posta adresinizle birlikte tarafımıza iletilir.")) + '</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);

    panelEl = document.getElementById("quote-panel");
    listEl = document.getElementById("quote-list");
    badgeEl = document.getElementById("quote-badge");
    emailInput = document.getElementById("quote-email");
    statusEl = document.getElementById("quote-status");
    submitBtn = document.getElementById("quote-submit");

    document.getElementById("quote-fab").addEventListener("click", function () {
      panelEl.classList.toggle("open");
    });
    document.getElementById("quote-panel-close").addEventListener("click", function () {
      panelEl.classList.remove("open");
    });
    submitBtn.addEventListener("click", submitQuote);

    var savedEmail = localStorage.getItem(EMAIL_KEY);
    if (savedEmail) emailInput.value = savedEmail;
  }

  function renderPanel() {
    if (!badgeEl) return;
    badgeEl.textContent = items.length;
    badgeEl.style.display = items.length ? "inline-flex" : "none";

    if (!items.length) {
      listEl.innerHTML = '<p class="quote-empty">' + escapeHtml(t("quote.empty", null, 'Henüz ürün eklemediniz. Beğendiğiniz ürünlerin altındaki "Teklife ekle" kutucuğunu işaretleyin.')) + '</p>';
      return;
    }

    listEl.innerHTML = items.map(function (it) {
      return '' +
        '<div class="quote-item">' +
          '<span>' + escapeHtml(it.label) + '</span>' +
          '<button class="quote-remove" data-p="' + escapeHtml(it.p) + '" data-i="' + it.i + '" type="button" aria-label="Kaldır">✕</button>' +
        '</div>';
    }).join("");

    listEl.querySelectorAll(".quote-remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        removeItem(btn.getAttribute("data-p"), parseInt(btn.getAttribute("data-i"), 10));
      });
    });
  }

  function setStatus(text, kind) {
    statusEl.textContent = text || "";
    statusEl.className = "quote-status" + (kind ? " quote-status-" + kind : "");
  }

  function buildMailtoFallback(email, lines) {
    var body = t("quote.mailIntro", null, "Merhaba,\n\nAşağıdaki ürünler için teklif almak istiyorum:\n\n") +
      lines.join("\n") +
      t("quote.mailEmailLine", { email: email }, "\n\nBana ulaşabileceğiniz e-posta adresim: " + email + "\n");
    var subject = t("quote.mailSubject", null, "Teklif Talebi - Troy Soapun");
    return "mailto:" + TO_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function submitQuote() {
    var email = emailInput.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      emailInput.classList.add("quote-email-error");
      emailInput.focus();
      setStatus(t("quote.invalidEmail", null, "Lütfen geçerli bir e-posta adresi girin."), "error");
      return;
    }
    emailInput.classList.remove("quote-email-error");

    if (!items.length) {
      setStatus(t("quote.noItems", null, "Önce listeye ürün eklemelisiniz."), "error");
      return;
    }

    localStorage.setItem(EMAIL_KEY, email);

    var lines = items.map(function (it, idx) { return (idx + 1) + ". " + it.label; });
    var messageText = t("quote.mailIntro", null, "Aşağıdaki ürünler için teklif almak istiyorum:\n\n") + lines.join("\n");

    submitBtn.disabled = true;
    setStatus(t("quote.sending", null, "Gönderiliyor…"), "pending");

    var fields = {
      _subject: t("quote.mailSubject", null, "Teklif Talebi - Troy Soapun"),
      _template: "table",
      _replyto: email
    };
    fields[t("quote.fieldCustomerEmail", null, "Müşteri e-postası")] = email;
    fields[t("quote.fieldRequestedProducts", null, "Talep edilen ürünler")] = lines.join(" | ");
    fields[t("quote.fieldMessage", null, "Mesaj")] = messageText;

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(fields)
    }).then(function (res) {
      if (!res.ok) throw new Error("network");
      return res.json();
    }).then(function () {
      setStatus(t("quote.success", null, "Teşekkürler! Teklifiniz tarafımıza iletildi."), "success");
      items = [];
      save();
      renderPanel();
    }).catch(function () {
      var mailto = buildMailtoFallback(email, lines);
      statusEl.innerHTML = escapeHtml(t("quote.failedPrefix", null, "Gönderilemedi. ")) +
        '<a href="' + mailto + '">' + escapeHtml(t("quote.failedLink", null, "Buraya tıklayarak")) + '</a>' +
        escapeHtml(t("quote.failedSuffix", null, " e-posta programınızdan gönderebilirsiniz."));
      statusEl.className = "quote-status quote-status-error";
    }).finally(function () {
      submitBtn.disabled = false;
    });
  }

  function initCheckbox(cb) {
    var p = cb.getAttribute("data-p");
    var i = parseInt(cb.getAttribute("data-i"), 10);
    var label = cb.getAttribute("data-label");
    cb.checked = isSelected(p, i);
    cb.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    cb.addEventListener("change", function () {
      toggle({ p: p, i: i, label: label });
    });
  }

  buildUI();
  renderPanel();

  window.QuoteCart = {
    isSelected: isSelected,
    toggle: toggle,
    initCheckbox: initCheckbox
  };
})();
