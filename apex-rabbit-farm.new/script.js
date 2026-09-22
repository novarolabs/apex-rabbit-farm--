/* ============================================
   APEX RABBIT FARM — site script
   Vanilla JS. No build step, no framework.
   ============================================ */

const WHATSAPP_NUMBER = "254119050728"; // 0119050728 in international format

/* ---------- icon system (replaces emoji with clean line icons) ---------- */
const ICONS = {
  rabbit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 9.5C7.5 6.5 8 3.5 9.5 2.5c1 2 1.3 4.5 1.3 6.7"/><path d="M15.5 9.5c1-3 .5-6-1-7-1 2-1.3 4.5-.9 6.7"/><path d="M6.5 13c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2c0 3.6-2 6-3 7.2-.6.7-1.5 1.3-2.5 1.3s-1.9-.6-2.5-1.3c-1-1.2-3-3.6-3-7.2Z"/><circle cx="10" cy="12.3" r=".6" fill="currentColor" stroke="none"/><path d="M9 15.2c.8.6 1.9.9 3 .9s2.2-.3 3-.9"/></svg>`,
  dna: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3c0 4 10 4 10 8s-10 4-10 8"/><path d="M17 3c0 4-10 4-10 8s10 4 10 8"/><path d="M8 6.5h8M7.3 12h9.4M8 17.5h8"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4c.6 7-2 12-6 14.5-3 1.8-6.5 1.8-9 .3C4 12.5 8 5.5 20 4Z"/><path d="M6 19c3-4 7-7.5 13-13.5"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.2c2.3-.9 5-.9 8 0v14c-3-.9-5.7-.9-8 0Z"/><path d="M20 5.2c-2.3-.9-5-.9-8 0v14c3-.9 5.7-.9 8 0Z"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9.5" cy="20" r="1"/><circle cx="17.5" cy="20" r="1"/><path d="M2.5 3h2l2.2 11.4a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 2-1.6L20.5 7H6"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.3-3.6A7.96 7.96 0 0 1 4 12Z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6.5 8 6 8-6"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="7" width="12" height="10" rx="1"/><path d="M13.5 10h4l3 3v4h-7z"/><circle cx="6" cy="18.5" r="1.6"/><circle cx="17" cy="18.5" r="1.6"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.35-4.35"/></svg>`,
  droplet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6.5 7.1 6.5 11.5a6.5 6.5 0 1 1-13 0C5.5 10.1 12 3 12 3Z"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l14 14M19 5 5 19"/></svg>`,
  "chevron-left": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>`,
  "chevron-right": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 5.5 16 12l-6.5 6.5"/></svg>`,
  "arrow-right": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 5.5 19.5 12 13 18.5"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 4.5v15M4.5 12h15"/></svg>`,
  minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4.5 12h15"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V19a1 1 0 0 0 1 1H9.5v-5.5h5V20H17.5a1 1 0 0 0 1-1V9.5"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="4.5" width="13" height="16" rx="1.6"/><rect x="9" y="3" width="6" height="3" rx="1"/><path d="M8.5 11h7M8.5 14.5h7M8.5 18h4.5"/></svg>`,
  coin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.5 9.7c0-1.2 1.1-2.2 2.5-2.2s2.5.8 2.5 2c0 2.7-5 1.5-5 4.2 0 1.2 1.1 2.1 2.5 2.1s2.5-.9 2.5-2.1"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 19 6v6c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6Z"/><path d="m9 12 2 2 4-4.2"/></svg>`,
};

function icon(name, extraClass) {
  return `<span class="icon${extraClass ? " " + extraClass : ""}" data-icon-rendered="${name}">${ICONS[name] || ""}</span>`;
}

function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach(el => {
    const name = el.dataset.icon;
    if (ICONS[name]) el.innerHTML = ICONS[name];
  });
}

/* ---------- 3D emoji system (Microsoft Fluent 3D emoji via CDN) ---------- */
// Same glossy 3D emoji on every phone, instead of each OS's flat built-in
// emoji font. Tries a codepoint-based mirror first, falls back to
// Microsoft's official repo, then finally to the plain native emoji
// character if neither image loads — so nothing ever breaks.
const EMOJI_MS_PATH = {
  "🐇": "Rabbit/3D/rabbit_3d.png",
  "🐰": "Rabbit face/3D/rabbit_face_3d.png",
  "🧬": "Dna/3D/dna_3d.png",
  "🌱": "Seedling/3D/seedling_3d.png",
  "🌾": "Sheaf of rice/3D/sheaf_of_rice_3d.png",
  "📚": "Books/3D/books_3d.png",
  "🛒": "Shopping cart/3D/shopping_cart_3d.png",
  "💬": "Speech balloon/3D/speech_balloon_3d.png",
  "📧": "E-mail/3D/e-mail_3d.png",
  "📍": "Round pushpin/3D/round_pushpin_3d.png",
  "🚚": "Delivery truck/3D/delivery_truck_3d.png",
  "🔍": "Magnifying glass tilted left/3D/magnifying_glass_tilted_left_3d.png",
  "💧": "Droplet/3D/droplet_3d.png",
  "🏠": "House/3D/house_3d.png",
  "🧼": "Soap/3D/soap_3d.png",
  "📋": "Clipboard/3D/clipboard_3d.png",
  "💰": "Money bag/3D/money_bag_3d.png",
  "🟢": "Green circle/3D/green_circle_3d.png",
  "🟡": "Yellow circle/3D/yellow_circle_3d.png",
  "🔴": "Red circle/3D/red_circle_3d.png",
};

function codepoints(str) {
  return Array.from(str).map(c => c.codePointAt(0).toString(16)).join("-");
}

function emoji3d(char, extraClass) {
  const hex = codepoints(char);
  const primary = `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${hex}_3d.png`;
  const msPath = EMOJI_MS_PATH[char];
  const secondary = msPath
    ? `https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/${msPath.split("/").map(encodeURIComponent).join("/")}`
    : "";

  return `<span class="emoji3d${extraClass ? " " + extraClass : ""}">` +
    `<img src="${primary}" alt="" loading="lazy" data-fallback-src="${secondary}" ` +
    `onerror="if(this.dataset.fallbackSrc && this.src!==this.dataset.fallbackSrc){this.src=this.dataset.fallbackSrc;}else{this.style.display='none';this.nextElementSibling.style.display='inline';}">` +
    `<span class="emoji-fallback" style="display:none">${char}</span></span>`;
}

function hydrateEmojis(root = document) {
  root.querySelectorAll("[data-emoji]").forEach(el => {
    const char = el.dataset.emoji;
    const cls = el.dataset.emojiClass || "";
    el.outerHTML = emoji3d(char, `${el.className} ${cls}`.trim());
  });
}

/* ---------- small helpers ---------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (err) {
    console.error("Could not load", path, err);
    return {};
  }
}

function toast(msg) {
  let t = $("#toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.className = "toast";
    document.body.appendChild(t);
  }

  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- mobile nav ---------- */
function initNav() {
  const toggle = $(".menu-toggle");
  const links = $(".nav-links");

  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
    toggle.innerHTML = links.classList.contains("open")
      ? ICONS.close
      : ICONS.menu;
  });

  $$(".nav-links a").forEach(a =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.innerHTML = ICONS.menu;
    })
  );

  const here = location.pathname.split("/").pop() || "index.html";

  $$(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === here) {
      a.classList.add("active");
    }
  });
}

/* ---------- cart (localStorage) ---------- */
const CART_KEY = "apex_cart_v1";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(c => c.id === item.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart(cart);
  toast(`Added "${item.name}" to your enquiry cart`);
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(c => c.id === id);

  if (!item) return;

  item.qty += delta;

  const next = cart.filter(c => c.qty > 0);

  saveCart(item.qty > 0 ? cart : next);
  renderCartDrawer();
}

function removeFromCart(id) {
  saveCart(getCart().filter(c => c.id !== id));
  renderCartDrawer();
}

function cartTotal(cart) {
  return cart.reduce((sum, i) => sum + (i.price || 0) * i.qty, 0);
}

function renderCartCount() {
  const count = getCart().reduce((n, i) => n + i.qty, 0);

  $$(".cart-count").forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

function renderCartDrawer() {
  const cart = getCart();
  const itemsEl = $("#cartItems");
  const footEl = $("#cartFoot");

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        Your enquiry cart is empty.<br>
        Browse rabbits or farm products to add items.
      </div>
    `;

    if (footEl) footEl.innerHTML = "";
    return;
  }

  itemsEl.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img src="${i.photo}" alt="${i.name}">
      <div class="info">
        <div class="name">${i.name}</div>
        <div class="price">${i.priceLabel || "Price on enquiry"}</div>
        <div class="qty">
          <button aria-label="Decrease" onclick="updateQty('${i.id}',-1)">
            ${icon("minus")}
          </button>

          <span>${i.qty}</span>

          <button aria-label="Increase" onclick="updateQty('${i.id}',1)">
            ${icon("plus")}
          </button>
        </div>

        <button class="cart-remove" onclick="removeFromCart('${i.id}')">
          Remove
        </button>
      </div>
    </div>
  `).join("");

  const total = cartTotal(cart);

  if (footEl) {
    footEl.innerHTML = `
      <div class="cart-total">
        <span>Estimated total</span>
        <span>KSh ${total.toLocaleString()}</span>
      </div>

      <p class="form-note" style="margin-bottom:12px;">
        Prices are estimates. We'll confirm final availability and pricing on WhatsApp.
      </p>

      <a class="btn btn-whatsapp btn-block"
         href="${buildCartWhatsAppLink(cart)}"
         target="_blank"
         rel="noopener">
        ${emoji3d("💬")} Send Enquiry on WhatsApp
      </a>
    `;
  }
}

function buildCartWhatsAppLink(cart) {
  const lines = cart.map(i => `• ${i.name} × ${i.qty}`).join("\n");

  const msg = `Hello Apex Rabbit Farm, I would like to enquire about:
${lines}

Please confirm availability and delivery/collection arrangements.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function waLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function initCartDrawer() {
  renderCartCount();

  const drawer = $("#cartDrawer");
  const overlay = $("#cartOverlay");

  if (!drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add("open");
    overlay.classList.add("show");
    document.body.classList.add("no-scroll");

    try {
      renderCartDrawer();
    } catch (err) {
      console.error("Cart render error:", err);
    }
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  };

  $$(".cart-btn").forEach(btn =>
    btn.addEventListener("click", openDrawer)
  );

  $("#cartClose")?.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/* ---------- status helpers ---------- */
/*
   Status badges intentionally use plain text.
   The 3D status-circle emoji images were removed because
   their image dimensions were causing the availability badge
   to become oversized and cover the rabbit photo.
*/
const STATUS_LABEL = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
  not_confirmed: "Not yet confirmed",
};

/* ---------- rabbit store ---------- */
let ALL_RABBITS = [];

function rabbitCard(r) {
  const canBuy = r.status === "available";

  const statusLabel =
    STATUS_LABEL[r.status] ||
    (r.status || "Not yet confirmed")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

  return `
    <div class="p-card"
         data-category="${r.category}"
         data-sex="${r.sex}"
         data-status="${r.status}"
         data-name="${r.name.toLowerCase()} ${r.colour.toLowerCase()}"
         data-price="${r.price}">

      <div class="thumb">
        <span class="status-badge status-${r.status}">
          ${statusLabel}
        </span>

        <img src="${r.photo}"
             alt="${r.name}"
             loading="lazy">
      </div>

      <div class="body">
        <div class="id">${r.id} · ${r.breed}</div>

        <h3>${r.name}</h3>

        <div class="meta">
          <span>${r.sex === "male" ? "♂ Male" : "♀ Female"}</span>
          <span>Age: ${r.age}</span>
        </div>

        <div class="price">${r.priceLabel}</div>

        <div class="actions">
          <button class="btn btn-outline btn-sm"
                  ${canBuy ? "" : "disabled"}
                  onclick='addToCart(${JSON.stringify({
                    id: r.id,
                    name: r.name,
                    photo: r.photo,
                    price: r.price,
                    priceLabel: r.priceLabel
                  }).replace(/'/g, "&apos;")})'>
            Add to Cart
          </button>

          <a class="btn btn-whatsapp btn-sm"
             href="${waLink(`Hello Apex Rabbit Farm, I'd like to enquire about ${r.name} (${r.id}), listed at ${r.priceLabel}.`)}"
             target="_blank"
             rel="noopener">
            ${emoji3d("💬")} WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;
}

function applyRabbitFilters() {
  const grid = $("#rabbitGrid");

  if (!grid) return;

  const q = ($("#rabbitSearch")?.value || "").toLowerCase().trim();
  const cat =
    $(".chip[data-filter-cat].active")?.dataset.filterCat || "all";
  const sex =
    $(".chip[data-filter-sex].active")?.dataset.filterSex || "all";
  const sort = $("#rabbitSort")?.value || "default";

  let list = ALL_RABBITS.filter(r => {
    const matchesQ =
      !q ||
      (r.name + " " + r.colour + " " + r.id)
        .toLowerCase()
        .includes(q);

    const matchesCat =
      cat === "all" || r.category === cat;

    const matchesSex =
      sex === "all" || r.sex === sex;

    return matchesQ && matchesCat && matchesSex;
  });

  if (sort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  }

  grid.innerHTML = list.length
    ? list.map(rabbitCard).join("")
    : `
      <div class="empty-state">
        No rabbits match your search right now.
        Try a different filter, or WhatsApp us — new stock is added often.
      </div>
    `;
}

async function initRabbitStore() {
  const grid = $("#rabbitGrid");

  if (!grid) return;

  ALL_RABBITS =
    (await loadJSON("data/rabbits.json")).rabbits || [];

  applyRabbitFilters();

  $("#rabbitSearch")?.addEventListener(
    "input",
    applyRabbitFilters
  );

  $("#rabbitSort")?.addEventListener(
    "change",
    applyRabbitFilters
  );

  $$(".chip[data-filter-cat]").forEach(chip =>
    chip.addEventListener("click", () => {
      $$(".chip[data-filter-cat]").forEach(c =>
        c.classList.remove("active")
      );

      chip.classList.add("active");
      applyRabbitFilters();
    })
  );

  $$(".chip[data-filter-sex]").forEach(chip =>
    chip.addEventListener("click", () => {
      $$(".chip[data-filter-sex]").forEach(c =>
        c.classList.remove("active")
      );

      chip.classList.add("active");
      applyRabbitFilters();
    })
  );
}

/* ---------- farm products ---------- */
function productCard(p) {
  const statusLabel =
    STATUS_LABEL[p.status] ||
    (p.status || "Not yet confirmed")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

  return `
    <div class="p-card" data-category="${p.category}">

      <div class="thumb">
        <span class="status-badge status-${p.status}">
          ${statusLabel}
        </span>

        <img src="${p.photo}"
             alt="${p.name}"
             loading="lazy">
      </div>

      <div class="body">
        <div class="id">${p.quantity}</div>

        <h3>${p.name}</h3>

        <p style="font-size:.88rem;margin:0 0 4px;">
          ${p.description}
        </p>

        <div class="price">${p.priceLabel}</div>

        <div class="actions">
          <button class="btn btn-outline btn-sm"
                  onclick='addToCart(${JSON.stringify({
                    id: p.id,
                    name: `${p.name} (${p.quantity})`,
                    photo: p.photo,
                    price: p.price,
                    priceLabel: p.priceLabel
                  }).replace(/'/g, "&apos;")})'>
            Add to Cart
          </button>

          <a class="btn btn-whatsapp btn-sm"
             href="${waLink(`Hello Apex Rabbit Farm, I'd like to enquire about ${p.name} (${p.quantity}).`)}"
             target="_blank"
             rel="noopener">
            ${emoji3d("💬")} WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;
}

async function initProducts() {
  const grid = $("#productGrid");

  if (!grid) return;

  const products =
    (await loadJSON("data/products.json")).products || [];

  grid.innerHTML = products.map(productCard).join("");

  $$(".chip[data-filter-prod]").forEach(chip =>
    chip.addEventListener("click", () => {
      $$(".chip[data-filter-prod]").forEach(c =>
        c.classList.remove("active")
      );

      chip.classList.add("active");

      const val = chip.dataset.filterProd;

      $$("#productGrid .p-card").forEach(card => {
        card.style.display =
          val === "all" ||
          card.dataset.category === val
            ? ""
            : "none";
      });
    })
  );
}

/* ---------- updates feed ---------- */
function updateCard(u) {
  const d = new Date(u.date);

  const dateStr = isNaN(d)
    ? u.date
    : d.toLocaleDateString("en-KE", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

  return `
    <article class="update-card">
      <img src="${u.photo}"
           alt="${u.title}"
           loading="lazy">

      <div class="body">
        <span class="update-tag">${u.category}</span>

        <div class="update-date">${dateStr}</div>

        <h3>${u.title}</h3>

        <p>${u.excerpt}</p>
      </div>
    </article>
  `;
}

async function initUpdates() {
  const grid = $("#updatesGrid");

  if (!grid) return;

  const updates =
    (await loadJSON("data/updates.json")).updates || [];

  updates.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  grid.innerHTML =
    updates.map(updateCard).join("") ||
    `
      <div class="empty-state">
        No updates posted yet — check back soon.
      </div>
    `;
}

/* ---------- farming guide ---------- */
async function initGuide() {
  const wrap = $("#guideList");

  if (!wrap) return;

  const guides = await loadJSON("data/guides.json");

  const list = Array.isArray(guides)
    ? guides
    : (guides.guides || []);

  wrap.innerHTML = list.map((g, i) => `
    <details class="guide-item" ${i === 0 ? "open" : ""}>
      <summary>
        ${emoji3d(g.icon, "icon-lg")}
        ${g.title}
        <span class="sub">${g.summary}</span>
      </summary>

      <div class="guide-body">
        <ul>
          ${g.points.map(pt => `<li>${pt}</li>`).join("")}
        </ul>
      </div>
    </details>
  `).join("");
}

/* ---------- gallery ---------- */
async function initGallery() {
  const grid = $("#galleryGrid");

  if (!grid) return;

  const data = await loadJSON("data/gallery.json");
  const images = data.images || [];

  grid.innerHTML = images.length
    ? images
        .map(img =>
          `<img src="${img.photo}"
                alt="${img.alt || ""}"
                loading="lazy">`
        )
        .join("")
    : `
      <div class="empty-state">
        No photos yet — check back soon.
      </div>
    `;

  initLightbox();
}

/* ---------- gallery lightbox ---------- */
function initLightbox() {
  const imgs = $$(".gallery-grid img");
  const lb = $("#lightbox");

  if (!imgs.length || !lb) return;

  const lbImg = $("#lightboxImg");
  let idx = 0;

  function show(i) {
    idx = (i + imgs.length) % imgs.length;
    lbImg.src = imgs[idx].src;
    lbImg.alt = imgs[idx].alt;
    lb.classList.add("open");
  }

  imgs.forEach((img, i) =>
    img.addEventListener("click", () => show(i))
  );

  $("#lightboxClose")?.addEventListener(
    "click",
    () => lb.classList.remove("open")
  );

  $("#lightboxPrev")?.addEventListener(
    "click",
    () => show(idx - 1)
  );

  $("#lightboxNext")?.addEventListener(
    "click",
    () => show(idx + 1)
  );

  lb.addEventListener("click", e => {
    if (e.target === lb) {
      lb.classList.remove("open");
    }
  });

  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;

    if (e.key === "Escape") {
      lb.classList.remove("open");
    }

    if (e.key === "ArrowRight") {
      show(idx + 1);
    }

    if (e.key === "ArrowLeft") {
      show(idx - 1);
    }
  });
}

/* ---------- reviews (stored locally, pending moderation) ---------- */
const REVIEWS_KEY = "apex_reviews_pending_v1";

function initReviewForm() {
  const form = $("#reviewForm");

  if (!form) return;

  let rating = 0;

  const starBtns = $$(".star-input button");

  starBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      rating = i + 1;

      starBtns.forEach((b, j) =>
        b.classList.toggle("active", j < rating)
      );

      $("#reviewRating").value = rating;
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = $("#reviewName").value.trim();
    const text = $("#reviewText").value.trim();

    if (!name || !text || rating === 0) {
      toast(
        "Please add your name, a star rating, and a short review."
      );
      return;
    }

    const pending = JSON.parse(
      localStorage.getItem(REVIEWS_KEY) || "[]"
    );

    pending.push({
      name,
      text,
      rating,
      date: new Date().toISOString()
    });

    localStorage.setItem(
      REVIEWS_KEY,
      JSON.stringify(pending)
    );

    form.reset();

    starBtns.forEach(b =>
      b.classList.remove("active")
    );

    rating = 0;

    toast(
      "Thank you! Your review has been submitted for approval."
    );
  });
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  hydrateIcons();
  hydrateEmojis();

  initNav();
  initCartDrawer();
  initRabbitStore();
  initProducts();
  initUpdates();
  initGuide();
  initGallery();
  initReviewForm();

  // WhatsApp buttons with class .wa-generic use a default message
  $$(".wa-generic").forEach(a => {
    if (!a.href || a.href.includes("wa.me/undefined")) {
      a.href = waLink(
        "Hello Apex Rabbit Farm, I have a question."
      );
    }
  });
});