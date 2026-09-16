function haptic(e="light") {
    const n = window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback;
    if (n)
        try {
            return void ("light" === e || "medium" === e || "heavy" === e || "rigid" === e || "soft" === e ? n.impactOccurred(e) : "success" === e || "error" === e || "warning" === e ? n.notificationOccurred(e) : "selection" === e ? n.selectionChanged() : n.impactOccurred("light"))
        } catch (e) {}
    if ("undefined" != typeof navigator && navigator.vibrate) {
        const n = "heavy" === e ? 25 : "medium" === e ? 15 : "success" === e ? [12, 30, 12] : "error" === e ? [30, 50, 30] : 10;
        try {
            navigator.vibrate(n)
        } catch (e) {}
    }
}
function closeModalOnBackdrop(e) {
    if (e.type !== "click" && e.type !== "pointerup") return;
    if (e.target !== e.currentTarget) return;
    const n = e.currentTarget;
    if (n.dataset.modalLocked === "1") return;
    n.classList.add("closing");
    setTimeout(() => { if (n.isConnected) n.remove(); }, 200);
}
function closeTopModal() {
    const e = document.querySelectorAll(".modal-overlay");
    if (!e.length)
        return;
    const n = e[e.length - 1];
    n.classList.add("closing"),
    setTimeout(() => n.remove(), 180)
}
window.closeTopModal = closeTopModal;

function _botUsername() {
    return (window.state && (state.botUsername || state._botUsername)) || ""
}
function _dealDeeplink(tag) {
    return `https://t.me/${_botUsername()}?start=deal_${encodeURIComponent(tag)}`
}
function _openTgLink(url) {
    if (!url) return !1;
    try {
        if (window.FunpayTG && "function" == typeof FunpayTG.openTelegramLink)
            return FunpayTG.openTelegramLink(url), !0
    } catch (e) {}
    try {
        const tg = window.Telegram && window.Telegram.WebApp;
        if (tg && "function" == typeof tg.openTelegramLink)
            return tg.openTelegramLink(url), !0
    } catch (e) {}
    try {
        window.open(url, "_blank")
    } catch (e) {}
    return !1
}
function _bindInstantTap(el, handler) {
    if (!el || el.__fpTapBound) return;
    el.__fpTapBound = !0;
    let lock = 0;
    const run = ev => {
        const now = Date.now();
        if (now - lock < 400) return;
        lock = now;
        try {
            ev && ev.preventDefault && ev.preventDefault();
            ev && ev.stopPropagation && ev.stopPropagation();
        } catch (e) {}
        try { handler(ev) } catch (e) { console && console.warn && console.warn(e) }
    };
    // click is most reliable across TG iOS/Android WebViews for primary actions
    el.addEventListener("click", run, !1);
    el.addEventListener("pointerup", ev => {
        if (ev.pointerType === "mouse" && ev.button !== 0) return;
        run(ev)
    }, {passive: !1});
}
const CONFIG = {
        apiUrl: (window.WERTYXAN_CONFIG && window.WERTYXAN_CONFIG.apiUrl) || "",
        currencies: ["TON", "USDT", "STARS", "RUB", "USD", "EUR", "GBP", "CNY", "JPY", "TRY", "UAH", "KZT", "BTC", "ETH"],
        currencyIcons: {
            TON: "https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png",
            USDT: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
            BTC: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
            ETH: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
        },
        currencySVG: {
            STARS: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            RUB: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M9 7H13C14.66 7 16 8.34 16 10C16 11.66 14.66 13 13 13H9M9 13H14M9 13V17M7 15H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            USD: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6V7M12 17V18M9.5 10.5C9.5 9.67157 10.1716 9 11 9H13C13.8284 9 14.5 9.67157 14.5 10.5C14.5 11.3284 13.8284 12 13 12H11C10.1716 12 9.5 12.6716 9.5 13.5C9.5 14.3284 10.1716 15 11 15H13C13.8284 15 14.5 14.3284 14.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
            EUR: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M16 8.5C15 7.5 13.5 7 12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C13.5 17 15 16.5 16 15.5M7 10H13M7 14H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
            GBP: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M9 16H15M12 7C10.34 7 9 8.34 9 10V12H14M9 12V15C9 16 8 17 7 17H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            CNY: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 7L14 11H10L12 7ZM8 11L10 14H14L16 11M8 11H16M10 14V17H14V14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            JPY: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M8 7L12 12M16 7L12 12M12 12V17M9 13H15M9 15H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
            TRY: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M10 7V17M10 10L15 8M10 12L15 10M13 15C13 16.1 12.1 17 11 17H10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
            UAH: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M8 9V12C8 14.2 9.8 16 12 16C14.2 16 16 14.2 16 12V9M12 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
            KZT: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M9 8H14M11.5 8V16M9 12H14M9 16H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
            TON: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M8 9L12 15L16 9M8 9H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            USDT: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 7V17M9 9H15M10 13C10 14.1 10.9 15 12 15C13.1 15 14 14.1 14 13C14 11.9 13.1 11 12 11C10.9 11 10 11.9 10 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
        },
        currencyGradients: {
            TON: "linear-gradient(135deg, #0088CC, #005F99)",
            USDT: "linear-gradient(135deg, #26A17B, #1E8A66)",
            STARS: "linear-gradient(135deg, #FFD700, #FFA500)",
            RUB: "linear-gradient(135deg, #D52B1E, #0039A6)",
            USD: "linear-gradient(135deg, #85BB65, #6BA54A)",
            EUR: "linear-gradient(135deg, #003399, #0051D5)",
            GBP: "linear-gradient(135deg, #012169, #C8102E)",
            CNY: "linear-gradient(135deg, #DE2910, #FFDE00)",
            JPY: "linear-gradient(135deg, #BC002D, #E60026)",
            BTC: "linear-gradient(135deg, #F7931A, #E07A00)",
            ETH: "linear-gradient(135deg, #627EEA, #4C5FD5)"
        }
    };
if (!CONFIG.apiUrl || window.WERTYXAN_CONFIG && window.WERTYXAN_CONFIG.invalid) {
    console.error("Wertyxan API URL is not configured. Edit js/config.js");
    document.addEventListener("DOMContentLoaded", () => {
        const splash = document.getElementById("app-splash");
        if (splash) splash.innerHTML = '<div style="padding:24px;text-align:center;font-family:system-ui"><b>API не настроен</b><br><small>Укажите URL FastAPI в js/config.js</small></div>';
    });
}
const state = {
        currentPage: "orders",
        user: null,
        balances: {},
        orders: [],
        formData: {},
        navigationHistory: [],
        language: localStorage.getItem("app_language") || null
    };
window.state = state;
const LANGUAGES = {
    ru: { name: "Русский", flag: "🇷🇺" },
    en: { name: "English", flag: "🇬🇧" },
    es: { name: "Español", flag: "🇪🇸" },
    zh: { name: "中文", flag: "🇨🇳" },
    ar: { name: "العربية", flag: "🇸🇦" },
    hi: { name: "हिन्दी", flag: "🇮🇳" },
    pt: { name: "Português", flag: "🇧🇷" },
    ja: { name: "日本語", flag: "🇯🇵" },
    de: { name: "Deutsch", flag: "🇩🇪" },
    fr: { name: "Français", flag: "🇫🇷" },
    uk: { name: "Українська", flag: "🇺🇦" },
    tr: { name: "Türkçe", flag: "🇹🇷" }
};
const SUPPORTED_LANG_CODES = ["ru", "en", "es", "zh", "ar", "hi", "pt", "ja", "de", "fr", "uk", "tr"];
function apiFetch(e, n) {
    n = n || {};
    const t = Object.assign({}, n.headers || {});
    return "X-Telegram-InitData" in t || (t["X-Telegram-InitData"] = window.FunpayTG && FunpayTG.initData || ""), window.__funpay_banned ? new Promise(() => {}) : fetch(e, Object.assign({}, n, {
        headers: t
    })).then(e => (403 === e.status && e.clone().json().then(e => {
        "BANNED" === (e && e.detail && e.detail.code) && showBannedScreen()
    }).catch(() => {}), e))
}
function showBannedScreen() {
    if (window.__funpay_banned)
        return;
    window.__funpay_banned = !0;
    let e = "en";
    try {
        const langState = window.state && state.language;
        if (langState && ["ru", "en", "uk"].includes(langState)) e = langState;
        else {
            const n = window.Telegram && window.Telegram.WebApp,
                t = n && n.initDataUnsafe && n.initDataUnsafe.user && n.initDataUnsafe.user.language_code || "";
            const low = String(t).toLowerCase();
            low.startsWith("ru") ? (e = "ru") : low.startsWith("uk") && (e = "uk")
        }
    } catch (e) {}
    const n = {
            ru: {
                title: "Funpay на технических работах",
                body: "Сервис временно недоступен. Мы уже всё чиним — загляните чуть позже."
            },
            en: {
                title: "Funpay is under maintenance",
                body: "The service is temporarily unavailable. We’re fixing things — please check back soon."
            },
            uk: {
                title: "Funpay на технічних роботах",
                body: "Сервіс тимчасово недоступний. Ми вже все лагодимо — зайдіть трохи пізніше."
            }
        },
        t = n[e] || n.en;
    try {
        const e = setTimeout(() => {}, 0);
        for (let n = 0; n <= e; n++)
            try {
                clearTimeout(n),
                clearInterval(n)
            } catch (e) {}
    } catch (e) {}
    const a = `\n      <div id="pk-banned-overlay" style="\n        position:fixed; inset:0; z-index:2147483647;\n        background:radial-gradient(ellipse at center,#17171a 0%,#0a0a0b 75%);\n        color:#fff;\n        display:flex; flex-direction:column;\n        align-items:center; justify-content:center;\n        font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Roboto,sans-serif;\n        text-align:center; padding:32px;\n        animation:pk-overlay-in .24s ease both;">\n        <div class="pk-dots" style="\n          display:flex; align-items:center; gap:10px;\n          margin-bottom:52px; height:14px;"\n          aria-label="loading" role="status">\n          <span class="pk-dot"></span>\n          <span class="pk-dot"></span>\n          <span class="pk-dot"></span>\n        </div>\n        <div style="\n          font-size:30px; font-weight:800; letter-spacing:-0.025em;\n          line-height:1.1; margin-bottom:14px;\n          background:linear-gradient(180deg,#ededf0 0%,#9a9ba0 100%);\n          -webkit-background-clip:text; background-clip:text;\n          -webkit-text-fill-color:transparent; color:transparent;\n          animation:pk-text-in .5s .12s ease both;">${t.title}</div>\n        <div style="\n          font-size:16px; font-weight:500; letter-spacing:-0.005em;\n          line-height:1.45; color:#6e7077;\n          max-width:300px;\n          animation:pk-text-in .5s .26s ease both;">${t.body}</div>\n      </div>\n      <style>\n        @keyframes pk-overlay-in {\n          from { opacity: 0; }\n          to   { opacity: 1; }\n        }\n        @keyframes pk-text-in {\n          from { opacity: 0; transform: translateY(8px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n        /* Three-dot breath. Scale + opacity together so the dots feel\n           like they're "inhaling" rather than just blinking. */\n        @keyframes pk-dot-breath {\n          0%, 80%, 100% { transform: scale(.7); opacity: .35; }\n          40%           { transform: scale(1);  opacity: .95; }\n        }\n        .pk-dot {\n          width: 9px; height: 9px; border-radius: 50%;\n          background: #b6b8bd;\n          display: inline-block;\n          animation: pk-dot-breath 1.4s ease-in-out infinite both;\n          will-change: transform, opacity;\n        }\n        .pk-dot:nth-child(2) { animation-delay: .18s; }\n        .pk-dot:nth-child(3) { animation-delay: .36s; }\n        /* Accessibility — respect users who explicitly asked for less\n           motion. Keep the visual (so they still see the dead state)\n           but turn off the breathing. */\n        @media (prefers-reduced-motion: reduce) {\n          .pk-dot { animation: none; opacity: .55; transform: none; }\n          #pk-banned-overlay,\n          #pk-banned-overlay * { animation: none !important; }\n        }\n        html, body { overflow:hidden !important; margin:0 !important; padding:0 !important; }\n      </style>`;
    try {
        document.body.innerHTML = a
    } catch (e) {
        document.addEventListener("DOMContentLoaded", () => {
            try {
                document.body.innerHTML = a
            } catch (e) {}
        })
    }
    try {
        window.fetch = function() {
            return new Promise(() => {})
        }
    } catch (e) {}
    try {
        const e = window.Telegram && window.Telegram.WebApp;
        e && "function" == typeof e.disableClosingConfirmation && e.disableClosingConfirmation()
    } catch (e) {}
}
function tL(e) {
    const n = window.state && state.language || "en";
    return e && (e[n] || e.en || e.ru) || ""
}
function initThemeToggle() {
    const e = document.getElementById("theme-toggle");
    if (!e)
        return;
    const n = e => {
        const n = document.getElementById("theme-thumb-icon");
        n && (n.innerHTML = "dark" === e ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>' : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>')
    };
    n(document.documentElement.getAttribute("data-theme") || "light"),
    e.addEventListener("click", () => {
        haptic("selection");
        const e = "dark" === (document.documentElement.getAttribute("data-theme") || "light") ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", e),
        localStorage.setItem("app_theme", e),
        n(e);
        _notifyReviewsFrame({ type: "reviews-theme", theme: e });
        try {
            const n = window.FunpayTG && FunpayTG.sdk;
            if (n) {
                const t = "dark" === e ? "#000000" : "#F2F2F7";
                n.setHeaderColor && n.setHeaderColor(t),
                n.setBackgroundColor && n.setBackgroundColor(t),
                n.setBottomBarColor && n.setBottomBarColor(t)
            }
        } catch (e) {}
    })
}
function syncThemeToggleVisibility(e) {
    const n = document.getElementById("theme-toggle");
    n && n.classList.toggle("hidden", "profile" !== e)
}
async function handleDealDeeplink() {
    const tag = getDealInviteTag();
    if (!tag)
        return;
    const uid = await waitForTelegramUserId(3500);
    if (!uid) {
        // Still open deal view read-only if possible
        return void showOrderDetails(tag)
    }
    let deal = null,
        firstTime = !1;
    try {
        const tgUser = window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user;
        if ((!state.user || !state.user.id) && tgUser)
            state.user = {
                id: tgUser.id,
                first_name: tgUser.first_name,
                last_name: tgUser.last_name || "",
                username: tgUser.username || "",
                photo_url: tgUser.photo_url || ""
            };
        const res = await fetch(`${CONFIG.apiUrl}/deals/${encodeURIComponent(tag)}/join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Telegram-InitData": (window.FunpayTG && FunpayTG.initData) || (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) || ""
            },
            body: JSON.stringify({
                user_id: uid
            })
        });
        if (409 === res.status)
            return haptic("error"), showDealTakenModal(tag), void clearDealInviteFromUrl();
        if (400 === res.status) {
            let detail = "";
            try {
                detail = (await res.json()).detail || ""
            } catch (e) {}
            if ("own_deal" === detail || String(detail).includes("own"))
                return haptic("light"), "function" == typeof showOwnDealModal && showOwnDealModal(tag), showOrderDetails(tag), void clearDealInviteFromUrl();
            // retry once after short wait (auth race)
            await new Promise(r => setTimeout(r, 400));
            const res2 = await fetch(`${CONFIG.apiUrl}/deals/${encodeURIComponent(tag)}/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Telegram-InitData": (window.FunpayTG && FunpayTG.initData) || (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) || ""
                },
                body: JSON.stringify({
                    user_id: uid
                })
            });
            if (res2.ok) {
                try {
                    const j = await res2.json();
                    deal = j && j.deal,
                    firstTime = !!(j && j.first_time)
                } catch (e) {}
            } else
                return showOrderDetails(tag), void clearDealInviteFromUrl()
        } else if (res.ok)
            try {
                const j = await res.json();
                deal = j && j.deal,
                firstTime = !!(j && j.first_time)
            } catch (e) {}
    } catch (e) {}
    clearDealInviteFromUrl();
    if (firstTime && deal && "buy" === (deal.deal_type || "").toLowerCase() && "function" == typeof showCreateDealSafetyWarning)
        return void showCreateDealSafetyWarning(() => {
            showOrderDetails(tag)
        });
    showOrderDetails(tag)
}

function getDealInviteTag() {
    try {
        const q = new URLSearchParams(window.location.search);
        let tag = q.get("deal") || q.get("startapp") || q.get("start");
        const tg = window.Telegram && window.Telegram.WebApp;
        if (!tag && tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param)
            tag = tg.initDataUnsafe.start_param;
        if (!tag && tg && tg.initData)
            try {
                tag = new URLSearchParams(tg.initData).get("start_param") || tag
            } catch (e) {}
        if (!tag && window.location.hash) {
            try {
                const h = new URLSearchParams(String(window.location.hash).replace(/^#/, ""));
                tag = h.get("tgWebAppStartParam") || h.get("deal") || tag
            } catch (e) {}
        }
        if (!tag)
            return null;
        tag = String(tag).trim().replace(/^deal[_-]?/i, "");
        tag = tag.toUpperCase();
        return /^[A-Z0-9]{4,16}$/.test(tag) ? tag : null
    } catch (e) {
        return null
    }
}

function clearDealInviteFromUrl() {
    try {
        window.history && history.replaceState && history.replaceState({}, "", "/")
    } catch (e) {}
}

async function waitForTelegramUserId(ms) {
    const deadline = Date.now() + (ms || 3000);
    while (Date.now() < deadline) {
        const a = window.state && state.user && state.user.id;
        const b = window.FunpayTG && FunpayTG.user && FunpayTG.user.id;
        const c = window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user && window.Telegram.WebApp.initDataUnsafe.user.id;
        const id = a || b || c;
        if (id)
            return Number(id);
        await new Promise(r => setTimeout(r, 60))
    }
    return null
}
function resolveLanguage() {
    const e = SUPPORTED_LANG_CODES,
        n = n => {
            if (!n)
                return null;
            const t = String(n).toLowerCase().split("-")[0];
            return e.includes(t) ? t : null
        };
    let fromUrl = null;
    try {
        fromUrl = n(new URLSearchParams(window.location.search).get("lang"))
    } catch (err) {}
    if (fromUrl) {
        try { localStorage.setItem("app_language", fromUrl) } catch (err) {}
        return fromUrl
    }
    const t = n(localStorage.getItem("app_language")),
        a = n(window.FunpayTG && FunpayTG.languageCode),
        o = n(navigator.language || navigator.userLanguage);
    return t || a || o || "en"
}
function checkAuth() {
    const e = window.Telegram && window.Telegram.WebApp,
        n = e && e.initDataUnsafe && e.initDataUnsafe.user;
    if (n) {
        state.user = {
            id: n.id,
            first_name: n.first_name,
            last_name: n.last_name || "",
            username: n.username || "",
            photo_url: n.photo_url || "",
            is_premium: n.is_premium || !1,
            language_code: n.language_code || "en"
        };
        try {
            localStorage.setItem("telegram_user", JSON.stringify(state.user)),
            localStorage.setItem("is_authenticated", "true")
        } catch (e) {}
        if (e.initData) {
            let n = null;
            try {
                n = {
                    platform: e.platform || "",
                    version: e.version || "",
                    color_scheme: e.colorScheme || "",
                    viewport_height: e.viewportHeight || 0,
                    is_premium: !!(e.initDataUnsafe && e.initDataUnsafe.user && e.initDataUnsafe.user.is_premium)
                }
            } catch (e) {}
            state.t = fetch(`${CONFIG.apiUrl}/auth/initdata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    init_data: e.initData,
                    client_info: n
                })
            }).then(async e => {
                if (403 === e.status)
                    try {
                        const n = await e.clone().json();
                        if (n && n.detail && "BANNED" === n.detail.code)
                            return showBannedScreen(), null
                    } catch (e) {}
                return e.ok ? e.json() : null
            }).catch(() => null)
        }
        return
    }
    const t = localStorage.getItem("telegram_user");
    if (t)
        try {
            state.user = JSON.parse(t)
        } catch (e) {
            localStorage.removeItem("telegram_user"),
            localStorage.removeItem("is_authenticated")
        }
    else if (!state.user) {
        const a = document.getElementById("page-container");
        a && (a.innerHTML = '\n            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:70vh;padding:24px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif">\n                <div style="font-size:22px;font-weight:700;margin-bottom:12px;color:var(--text-primary,#111)">Funpay</div>\n                <div style="font-size:15px;color:var(--text-secondary,#666);max-width:320px;line-height:1.5">Откройте через Telegram — кнопка Web App в вашем боте</div>\n            </div>');
        return
    }
}
function translateStaticElements() {
    document.querySelectorAll("[data-i18n]").forEach(e => {
        const n = e.getAttribute("data-i18n");
        if (!n)
            return;
        const a = t(n);
        a && a !== n && (e.textContent = a)
    }),
    document.querySelectorAll("[data-i18n-placeholder]").forEach(e => {
        const n = e.getAttribute("data-i18n-placeholder");
        if (!n)
            return;
        const a = t(n);
        a && a !== n && e.setAttribute("placeholder", a)
    }),
    document.querySelectorAll("[data-i18n-aria-label]").forEach(e => {
        const n = e.getAttribute("data-i18n-aria-label");
        if (!n)
            return;
        const a = t(n);
        a && a !== n && e.setAttribute("aria-label", a)
    }),
    document.documentElement.setAttribute("dir", "ar" === state.language ? "rtl" : "ltr")
}
function translatePage() {
    const e = document.querySelector(".page-title");
    if (e)
        switch (state.currentPage) {
        case "orders":
            e.textContent = t("myOrders");
            break;
        case "wallets":
            e.textContent = t("myWallets");
            break;
        case "profile":
            e.textContent = t("profile")
        }
    if ("profile" === state.currentPage) {
        const e = document.querySelectorAll(".card-title");
        e.length >= 3 && (e[0].textContent = t("balances"), e[1].textContent = t("orderStats"), e[2].textContent = t("exchangeRates"));
        const n = document.querySelector(".toggle-label");
        n && (n.textContent = t("hideZero"))
    }
    if ("wallets" === state.currentPage) {
        const e = document.getElementById("deposit-btn");
        e && Array.from(e.childNodes).forEach(e => {
            if (3 === e.nodeType) {
                const n = e.textContent.trim();
                n && "" !== n && (e.textContent = "\n                        " + t("topUp") + "\n                    ")
            }
        });
        const n = document.getElementById("withdraw-btn");
        n && Array.from(n.childNodes).forEach(e => {
            if (3 === e.nodeType) {
                const n = e.textContent.trim();
                n && "" !== n && (e.textContent = "\n                        " + t("withdraw") + "\n                    ")
            }
        })
    }
}
function repositionTabIndicator() {
    const indicator = document.querySelector(".tab-indicator");
    const active = document.querySelector(".tab-button.active");
    const wrapper = document.querySelector(".tabbar-wrapper");
    if (!indicator || !active || !wrapper)
        return;
    const btn = active.getBoundingClientRect();
    const wrap = wrapper.getBoundingClientRect();
    if (!btn.width)
        return;
    const left = btn.left - wrap.left;
    indicator.style.width = `${btn.width}px`;
    indicator.style.transform = `translate3d(${left}px, 0, 0)`
}
function initTabbar() {
    const e = document.querySelectorAll(".tab-button"),
        n = document.querySelector(".tab-indicator");
    e.forEach(e => e.classList.toggle("active", "orders" === e.dataset.page)),
    requestAnimationFrame(() => requestAnimationFrame(repositionTabIndicator));
    let t = null,
        a = 0;
    e.forEach(n => {
        _bindInstantTap(n, () => {
            const s = n.dataset.page,
                i = Date.now();
            s === t && i - a < 350 || (t = s, a = i, haptic("selection"), e.forEach(e => e.classList.remove("active")), n.classList.add("active"), repositionTabIndicator(), playTabSticker(s), loadPage(s))
        })
    }),
    window.addEventListener("resize", repositionTabIndicator);
    const deferTabs = fn => {
        if (typeof requestIdleCallback === "function")
            requestIdleCallback(fn, { timeout: 900 });
        else
            setTimeout(fn, 120)
    };
    deferTabs(() => {
        initTabStickers().then(() => repositionTabIndicator()).catch(() => repositionTabIndicator())
    })
}
window.repositionTabIndicator = repositionTabIndicator;

const _tabStickers = {};
const _tabStickerData = Object.create(null);
const _TAB_STICKER_URLS = {
    orders: "/assets/stickers/orders.json?v=83",
    wallets: "/assets/stickers/wallets.json?v=83",
    leaders: "/assets/stickers/leaders.json?v=83",
    profile: "/assets/stickers/profile.json?v=83"
};
function _ensureLottieForTabs() {
    if (window.lottie)
        return Promise.resolve(window.lottie);
    return new Promise((resolve, reject) => {
        const existing = document.querySelector('script[src*="lottie.min.js"]');
        if (existing) {
            const start = Date.now();
            const tick = () => {
                if (window.lottie)
                    return resolve(window.lottie);
                if (Date.now() - start > 2500)
                    return reject(new Error("lottie wait"));
                setTimeout(tick, 40)
            };
            return tick()
        }
        const s = document.createElement("script");
        s.src = "/vendor/lottie.min.js?v=83";
        s.async = true;
        s.onload = () => window.lottie ? resolve(window.lottie) : reject(new Error("lottie missing"));
        s.onerror = () => reject(new Error("lottie load failed"));
        document.head.appendChild(s)
    })
}
async function _fetchStickerJson(url, cache) {
    if (cache[url])
        return cache[url];
    const res = await fetch(url);
    if (!res.ok)
        throw new Error("sticker " + res.status);
    const data = await res.json();
    cache[url] = data;
    return data
}
async function initTabStickers() {
    try {
        await _ensureLottieForTabs()
    } catch (e) {
        return
    }
    if (!window.lottie)
        return;
    const nodes = Array.from(document.querySelectorAll(".tab-lottie[data-sticker]"));
    await Promise.all(nodes.map(async el => {
        const key = el.dataset.sticker;
        const url = _TAB_STICKER_URLS[key];
        if (!key || !url || _tabStickers[key])
            return;
        try {
            const animationData = await _fetchStickerJson(url, _tabStickerData);
            if (!el.isConnected)
                return;
            el.innerHTML = "";
            const anim = lottie.loadAnimation({
                container: el,
                renderer: "svg",
                loop: false,
                autoplay: false,
                animationData,
                rendererSettings: {
                    progressiveLoad: true,
                    preserveAspectRatio: "xMidYMid meet"
                }
            });
            anim.addEventListener("DOMLoaded", () => {
                try {
                    anim.goToAndStop(0, true)
                } catch (e) {}
                el.classList.add("is-ready")
            });
            _tabStickers[key] = anim
        } catch (e) {}
    }));
    const active = document.querySelector(".tab-button.active");
    if (active && active.dataset.page)
        requestAnimationFrame(() => playTabSticker(active.dataset.page))
}

function playTabSticker(page) {
    const anim = _tabStickers[page];
    if (!anim)
        return;
    try {
        anim.stop(),
        anim.goToAndPlay(0, true)
    } catch (e) {}
}
function loadPage(e) {
    try {
        state.currentPage = e,
        localStorage.setItem("last_page", e),
        "function" == typeof syncThemeToggleVisibility && syncThemeToggleVisibility(e),
        state.o && (clearTimeout(state.o), state.o = null),
        void 0 !== _orderDetailTimer && _orderDetailTimer && (clearInterval(_orderDetailTimer), _orderDetailTimer = null),
        window._leadersCdInterval && (clearInterval(window._leadersCdInterval), window._leadersCdInterval = null),
        _destroyLeadersMani();
        _destroyOrderActionStickers();
        const n = document.getElementById("page-container");
        if (!n)
            return;
        n.scrollTop = 0;
        n.style.opacity = "1";
        n.style.transform = "none";
        n.innerHTML = "";
        switch (e) {
        case "orders":
            renderOrdersPage();
            break;
        case "wallets":
            renderWalletsPage();
            break;
        case "leaders":
            renderLeadersPage();
            break;
        case "profile":
            renderProfilePage()
        }
        translateStaticElements(),
        translatePage()
    } catch (err) {
    }
}
function renderOrdersPage() {
    const e = document.getElementById("orders-page-template").content.cloneNode(!0);
    document.getElementById("page-container").appendChild(e),
    initDealsBannerCarousel(),
    document.getElementById("create-order-btn").addEventListener("click", () => {
        haptic("light");
        playBtnSticker("create");
        try {
            fetch(`${CONFIG.apiUrl}/log/action`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
                },
                body: JSON.stringify({ action: "create_click" })
            }).catch(() => {});
        } catch (e) {}
        showCreateOrderForm();
    });
    const n = document.getElementById("active-orders-btn"),
        t = document.getElementById("history-orders-btn");
    function a(e) {
        n.classList.toggle("active", "active" === e),
        t.classList.toggle("active", "history" === e),
        loadOrdersList(e)
    }
    n.addEventListener("click", () => {
        haptic("selection"),
        playBtnSticker("active"),
        a("active")
    }),
    t.addEventListener("click", () => {
        haptic("selection"),
        playBtnSticker("history"),
        a("history")
    }),
    a("active");
    const r = document.getElementById("reviews-btn");
    r && r.addEventListener("click", () => {
        haptic("light"),
        playBtnSticker("reviews"),
        showReviewsPage()
    });
    const deferStickers = fn => {
        if (typeof requestIdleCallback === "function")
            requestIdleCallback(fn, { timeout: 1200 });
        else
            setTimeout(fn, 180)
    };
    deferStickers(() => initOrderActionStickers())
}

const _btnStickerAnims = Object.create(null);
const _btnStickerData = Object.create(null);
const _BTN_STICKER_URLS = {
    create: "/assets/stickers/btn-create.json?v=83",
    active: "/assets/stickers/btn-active.json?v=83",
    history: "/assets/stickers/btn-history.json?v=83",
    reviews: "/assets/stickers/btn-reviews.json?v=83"
};

function _destroyOrderActionStickers() {
    Object.keys(_btnStickerAnims).forEach(key => {
        try {
            _btnStickerAnims[key].destroy()
        } catch (e) {}
        delete _btnStickerAnims[key]
    })
}

async function initOrderActionStickers() {
    _destroyOrderActionStickers();
    try {
        await _ensureLottieForTabs()
    } catch (e) {
        return
    }
    if (!window.lottie)
        return;
    const nodes = Array.from(document.querySelectorAll(".btn-lottie[data-btn-sticker]"));
    await Promise.all(nodes.map(async el => {
        const key = el.dataset.btnSticker;
        const url = _BTN_STICKER_URLS[key];
        if (!key || !url || !el.isConnected)
            return;
        try {
            if (!_btnStickerData[key])
                _btnStickerData[key] = await _fetchStickerJson(url, _btnStickerData);
            if (!el.isConnected)
                return;
            el.innerHTML = "";
            const anim = lottie.loadAnimation({
                container: el,
                renderer: "svg",
                loop: false,
                autoplay: false,
                animationData: _btnStickerData[key],
                rendererSettings: {
                    progressiveLoad: true,
                    preserveAspectRatio: "xMidYMid meet"
                }
            });
            anim.addEventListener("DOMLoaded", () => {
                try {
                    anim.goToAndStop(0, true)
                } catch (e) {}
                el.classList.add("is-ready")
            });
            _btnStickerAnims[key] = anim
        } catch (e) {}
    }))
}

function playBtnSticker(key) {
    const anim = _btnStickerAnims[key];
    if (!anim)
        return;
    try {
        anim.stop(),
        anim.goToAndPlay(0, true)
    } catch (e) {}
}

function _hydrateBannerSlide(slide) {
    if (!slide)
        return;
    const img = slide.querySelector("img.deals-banner__img[data-src]");
    if (!img)
        return;
    const src = img.getAttribute("data-src");
    if (!src)
        return;
    img.removeAttribute("data-src");
    img.decoding = "async";
    img.src = src
}

function initDealsBannerCarousel() {
    const root = document.querySelector(".deals-banner");
    if (!root || root.dataset.ready === "1")
        return;
    root.dataset.ready = "1";
    const track = root.querySelector("#deals-banner-track");
    const rail = root.querySelector("#deals-banner-rail");
    const slides = Array.from(root.querySelectorAll(".deals-banner__slide"));
    const dots = Array.from(root.querySelectorAll(".deals-banner__dot"));
    if (!track || !rail || slides.length < 2)
        return;

    let index = 0;
    let autoTimer = null;
    let dragging = false;
    let startX = 0;
    let deltaX = 0;
    const AUTO_MS = 5600;
    const THRESHOLD = 36;
    // Keep original PNG quality — only delay loading offscreen slides.
    const warmSlides = () => {
        slides.forEach((slide, i) => {
            if (i !== 0)
                _hydrateBannerSlide(slide)
        })
    };
    if (typeof requestIdleCallback === "function")
        requestIdleCallback(warmSlides, { timeout: 1800 });
    else
        setTimeout(warmSlides, 500);

    function setRail(pct, animate) {
        if (animate === false)
            rail.style.transition = "none";
        else
            rail.style.removeProperty("transition");
        rail.style.transform = `translate3d(${pct}%, 0, 0)`;
    }

    function syncSlideMotion(dragPct) {
        // Parallax disabled — per-frame style thrash kills TG WebView FPS.
        return;
    }

    function apply(i, animate) {
        index = (i + slides.length) % slides.length;
        _hydrateBannerSlide(slides[index]);
        _hydrateBannerSlide(slides[(index + 1) % slides.length]);
        setRail(-100 * index, animate);
        slides.forEach((slide, n) => slide.classList.toggle("is-active", n === index));
        dots.forEach((dot, n) => {
            const on = n === index;
            dot.classList.toggle("is-active", on);
            dot.setAttribute("aria-selected", on ? "true" : "false");
        });
        if (!dragging)
            syncSlideMotion(0);
    }

    function go(i) {
        apply(i, true);
        (window.haptic || (() => {}))("selection");
        restartAuto();
    }

    function restartAuto() {
        if (autoTimer)
            clearInterval(autoTimer);
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        autoTimer = setInterval(() => apply(index + 1, true), AUTO_MS);
    }

    function pointerX(e) {
        return e.clientX != null ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX) || startX;
    }

    function onPointerDown(e) {
        if (e.button != null && e.button !== 0)
            return;
        dragging = true;
        deltaX = 0;
        startX = pointerX(e);
        track.classList.add("is-dragging");
        setRail(-100 * index, false);
        if (autoTimer)
            clearInterval(autoTimer);
    }

    function onPointerMove(e) {
        if (!dragging)
            return;
        deltaX = pointerX(e) - startX;
        const w = track.clientWidth || 1;
        // Soft resistance near edges (only 2 slides — still feels springy)
        let dx = deltaX;
        if ((index === 0 && dx > 0) || (index === slides.length - 1 && dx < 0))
            dx *= 0.35;
        const pct = -100 * index + (dx / w) * 100;
        setRail(pct, false);
        syncSlideMotion(dx / w);
        if (e.cancelable && Math.abs(deltaX) > 8)
            e.preventDefault();
    }

    function onPointerUp() {
        if (!dragging)
            return;
        dragging = false;
        track.classList.remove("is-dragging");
        if (Math.abs(deltaX) > THRESHOLD)
            go(index + (deltaX < 0 ? 1 : -1));
        else
            apply(index, true), restartAuto();
        deltaX = 0;
        syncSlideMotion(0);
    }

    apply(0, false);

    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, {passive: false});
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    track.addEventListener("touchstart", e => onPointerDown(e.touches[0] || e), {passive: true});
    track.addEventListener("touchmove", e => {
        if (!dragging) return;
        onPointerMove(e.touches[0] || e);
        if (Math.abs(deltaX) > 8 && e.cancelable) e.preventDefault();
    }, {passive: false});
    track.addEventListener("touchend", onPointerUp);

    dots.forEach(dot => {
        dot.addEventListener("click", () => go(Number(dot.dataset.index) || 0));
    });

    root.addEventListener("mouseenter", () => autoTimer && clearInterval(autoTimer));
    root.addEventListener("mouseleave", restartAuto);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            if (autoTimer) clearInterval(autoTimer);
        } else restartAuto();
    });

    restartAuto();
}
window.apiFetch = apiFetch,
window.showBannedScreen = showBannedScreen,
window.tL = tL,
"function" == typeof addTranslations && addTranslations({
    nInsufficientFunds: {
        ru: "Недостаточно средств",
        en: "Insufficient balance",
        uk: "Недостатньо коштів",
        ar: "الرصيد غير كافٍ",
        zh: "余额不足"
    },
    nWholeNumbersOnly: {
        ru: "Только целые числа",
        en: "Whole numbers only",
        uk: "Лише цілі числа",
        ar: "أرقام صحيحة فقط",
        zh: "仅限整数"
    },
    minLabel: {
        ru: "Минимум",
        en: "Minimum",
        uk: "Мінімум",
        ar: "الحد الأدنى",
        zh: "最低"
    },
    amountLabel3: {
        ru: "Сумма",
        en: "Amount",
        uk: "Сума",
        ar: "المبلغ",
        zh: "金额"
    },
    starsAmountLabel: {
        ru: "Количество Stars",
        en: "Amount of Stars",
        uk: "Кількість Stars",
        ar: "عدد Stars",
        zh: "Stars 数量"
    },
    minWithCurrency: {
        ru: (e, n) => `Минимум ${e} ${n}`,
        en: (e, n) => `Minimum ${e} ${n}`,
        uk: (e, n) => `Мінімум ${e} ${n}`,
        ar: (e, n) => `الحد الأدنى ${e} ${n}`,
        zh: (e, n) => `最低 ${e} ${n}`
    },
    editLabel: {
        ru: "Изменить",
        en: "Edit",
        uk: "Змінити",
        ar: "تعديل",
        zh: "编辑"
    },
    notBoundLabel: {
        ru: "Не привязан",
        en: "Not bound",
        uk: "Не прив'язано",
        ar: "غير مربوط",
        zh: "未绑定"
    },
    copyLabel: {
        ru: "Копировать",
        en: "Copy",
        uk: "Копіювати",
        ar: "نسخ",
        zh: "复制"
    }
}),
document.addEventListener("DOMContentLoaded", () => {
    /* Never leave Telegram BackButton stuck from a previous reviews visit. */
    try {
        window.Telegram && Telegram.WebApp && Telegram.WebApp.BackButton && Telegram.WebApp.BackButton.hide()
    } catch (e) {}
    if (checkAuth(), !state.user) {
        return;
    }
    // Don't block first paint on /auth/initdata — language can refine later.
    state.language = resolveLanguage();
    try {
        localStorage.setItem("app_language", state.language)
    } catch (e) {}
    document.documentElement.lang = state.language,
    document.documentElement.dir = "function" == typeof getTextDirection ? getTextDirection() : "ltr",
    initTabbar();
    const e = "orders";
    loadPage(e);
    requestAnimationFrame(() => {
        document.querySelectorAll(".tab-button").forEach(n => {
            n.classList.toggle("active", n.dataset.page === e)
        });
        try {
            window.dispatchEvent(new Event("funpay:ready"))
        } catch (err) {}
    });
    translateStaticElements();
    requestAnimationFrame(() => {
        translatePage();
        repositionTabIndicator()
    });
    initThemeToggle();
    if (state.user && state.user.id) {
        (state.t || Promise.resolve()).then(auth => {
            try {
                const langs = ["ru", "en", "uk", "zh", "ar"];
                const code = auth && auth.user && auth.user.language
                    ? String(auth.user.language).toLowerCase().split("-")[0]
                    : null;
                if (code && langs.includes(code) && code !== state.language) {
                    state.language = code;
                    try {
                        localStorage.setItem("app_language", state.language)
                    } catch (e) {}
                    document.documentElement.lang = state.language;
                    document.documentElement.dir = "function" == typeof getTextDirection ? getTextDirection() : "ltr";
                    translateStaticElements();
                    translatePage()
                }
            } catch (e) {}
        }).catch(() => {});
    }
    if (state.user && state.user.id) {
        const bootAuth = state.t || Promise.resolve();
        /* Critical path: deals for orders tab. Rest after idle. */
        bootAuth.then(() => apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/deals`).then(e => e.ok ? e.json() : null).then(e => {
            e && (void 0 !== _dealsCache && (_dealsCache = {
                ts: Date.now(),
                data: e
            }), state.l = e)
        }).catch(() => {}));
        const deferBoot = fn => {
            if (typeof requestIdleCallback === "function")
                requestIdleCallback(fn, { timeout: 2500 });
            else
                setTimeout(fn, 400)
        };
        deferBoot(() => {
            bootAuth.then(() => apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/balance`).then(e => e.ok ? e.json() : null).then(e => {
                e && (state.user.balance = e.balance || {})
            }).catch(() => {})),
            bootAuth.then(() => apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}`).then(e => e.ok ? e.json() : null).then(e => {
                e && (state.user.ton_connect_wallet = e.ton_connect_wallet, state.user.wallet = e.wallet, state.user.card = e.card, state.user.usdt_address = e.usdt_address, state.user.requisites = e.requisites, state.i = e)
            }).catch(() => {})),
            bootAuth.then(() => fetch(`${CONFIG.apiUrl}/rates`).then(e => e.ok ? e.json() : null).then(e => {
                e && e.rates && (state.p = e.rates)
            }).catch(() => {})),
            bootAuth.then(() => apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/transactions?limit=50`).then(e => e.ok ? e.json() : null).then(e => {
                e && Array.isArray(e.transactions) && (state.u = e.transactions)
            }).catch(() => {})),
            fetch(`${CONFIG.apiUrl}/config`).then(e => e.ok ? e.json() : null).then(e => {
                if (e) {
                    state.h = e.escrow_username || e.support_username || null;
                    state.m = e.support_username || state.h || null;
                    state.tonAddress = e.ton_address || "";
                    state.botUsername = e.bot_username || state.botUsername || "FunRelayer";
                    if (window.SUPPORT_USERNAME_OVERRIDE && state.m) {
                        window.SUPPORT_USERNAME_OVERRIDE = state.m;
                    }
                }
            }).catch(() => {})
        })
    }
    if (state.user && state.user.photo_url)
        try {
            const deferAvatar = fn => {
                if (typeof requestIdleCallback === "function")
                    requestIdleCallback(fn, { timeout: 2500 });
                else
                    setTimeout(fn, 800)
            };
            deferAvatar(() => {
                const n = new Image;
                n.decoding = "async";
                n.loading = "lazy";
                n.src = state.user.photo_url
            })
        } catch (e) {}
    handleDealDeeplink()
}),
window.syncThemeToggleVisibility = syncThemeToggleVisibility;
let _dealsCache = {
    ts: 0,
    data: null
};
const DEALS_CACHE_TTL = 2e4;
function invalidateDealsCache() {
    _dealsCache = {
        ts: 0,
        data: null
    }
}
async function _fetchDeals() {
    const e = Date.now();
    if (_dealsCache.data && e - _dealsCache.ts < 2e4)
        return _dealsCache.data;
    if (state.t)
        try {
            await state.t
        } catch (e) {}
    const n = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/deals`);
    if (!n.ok)
        throw new Error(`deals ${n.status}`);
    const t = await n.json();
    return _dealsCache = {
        ts: e,
        data: t
    }, t
}
function _renderOrdersSkeleton(e, n=3) {
    let t = "";
    for (let e = 0; e < n; e++)
        t += '\n            <div class="skeleton-card" aria-busy="true">\n                <div class="skeleton-line skeleton-w-30"></div>\n                <div class="skeleton-line skeleton-w-70"></div>\n                <div class="skeleton-line skeleton-w-50"></div>\n            </div>';
    e.innerHTML = t
}
async function loadOrdersList(e) {
    const n = document.getElementById("orders-list");
    if (n) {
        _renderOrdersSkeleton(n, 3);
        try {
            const a = await _fetchDeals(),
                o = Object.entries(a.as_seller || {}).concat(Object.entries(a.as_buyer || {})),
                s = e => "completed" === e || "cancelled" === e;
            let i = "active" === e ? o.filter(([e, n]) => !s(n.status)) : o.filter(([e, n]) => s(n.status));
            const r = e => {
                const n = e.completed_at || e.paid_at || e.joined_at || e.created_at || "",
                    t = n ? Date.parse(n) : NaN;
                return Number.isFinite(t) ? t : 0
            };
            if (i.sort((e, n) => r(n[1]) - r(e[1])), 0 === i.length) {
                const a = "active" === e ? "noActiveOrders" : "noHistoryOrders",
                    o = "function" == typeof t ? t(a) : null,
                    s = o && o !== a ? o : "active" === e ? "No active deals" : "No completed deals";
                return void (n.innerHTML = `<div class="empty-state">${s}</div>`)
            }
            const l = document.createDocumentFragment();
            for (const [e, n] of i) {
                const t = document.createElement("div");
                t.className = "order-card",
                t.dataset.tag = e,
                t.dataset.status = n.status || "wait_payment";
                const a = window.FunpayIcons ? FunpayIcons.currencyIcon(n.currency || "TON", 28) : "",
                    o = _formatOrderDate(n),
                    s = escapeHtml(e),
                    i = escapeHtml(n.status || ""),
                    r = escapeHtml(getStatusText(n.status)),
                    c = escapeHtml(String(n.amount ?? "")),
                    d = escapeHtml(n.currency || ""),
                    p = n.description || "",
                    u = escapeHtml(p.length > 80 ? p.slice(0, 80) + "…" : p);
                t.innerHTML = `\n                <div class="order-header">\n                    <span class="order-tag">#${s}</span>\n                    <span class="order-status status-${i}">${r}</span>\n                </div>\n                <div class="order-row">\n                    ${a}\n                    <div class="order-amount">${c} ${d}</div>\n                </div>\n                <div class="order-description">${u}</div>\n                ${o ? `<div class="order-date"><span class="order-date-chip">${_ORDER_DATE_CLOCK_SVG}<span>${escapeHtml(o)}</span></span></div>` : ""}\n                <div class="order-progress-mini"></div>\n            `;
                const h = t.querySelector(".order-progress-mini");
                h && window.renderOrderProgress && renderOrderProgress(h, n, {
                    size: "sm"
                }),
                t.addEventListener("click", () => {
                    haptic("light"),
                    showOrderDetails(e)
                }),
                l.appendChild(t)
            }
            n.replaceChildren(l)
        } catch (e) {
            n.innerHTML = `<div class="error">${t("nLoadOrdersError")}</div>`
        }
    }
}
function _parseDealTs(e) {
    if (!e)
        return null;
    let n,
        t = String(e);
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(t) && !/(Z|[+-]\d{2}:?\d{2})$/.test(t) && (t += "Z");
    try {
        n = new Date(t)
    } catch (e) {
        return null
    }
    return n && !isNaN(n.getTime()) ? n : null
}
function _formatOrderDate(e) {
    const n = e.completed_at || e.paid_at || e.joined_at || e.created_at;
    if (!n)
        return "";
    const t = _parseDealTs(n);
    if (!t)
        return "";
    const a = window.state && state.language || "en",
        o = "function" == typeof _intlLocale ? _intlLocale(a) : "en-US",
        s = new Date,
        i = s.getTime() - t.getTime();
    if (i >= 0 && i < 864e5) {
        const e = {
                ru: {
                    now: "только что",
                    min: e => `${e} мин назад`,
                    hr: e => `${e} ч назад`
                },
                en: {
                    now: "just now",
                    min: e => `${e} min ago`,
                    hr: e => `${e}h ago`
                },
                uk: {
                    now: "щойно",
                    min: e => `${e} хв тому`,
                    hr: e => `${e} год тому`
                },
                ar: {
                    now: "الآن",
                    min: e => `قبل ${e} دقيقة`,
                    hr: e => `قبل ${e} ساعة`
                },
                zh: {
                    now: "刚刚",
                    min: e => `${e} 分钟前`,
                    hr: e => `${e} 小时前`
                }
            },
            n = e[a] || e.en;
        if (i < 6e4)
            return n.now;
        const t = Math.floor(i / 6e4);
        return t < 60 ? n.min(t) : n.hr(Math.floor(i / 36e5))
    }
    const r = new Date(s.getFullYear(), s.getMonth(), s.getDate()),
        l = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    if (1 === Math.round((r - l) / 864e5)) {
        const e = {
                ru: "Вчера",
                en: "Yesterday",
                uk: "Вчора",
                ar: "أمس",
                zh: "昨天"
            },
            n = e[a] || e.en;
        try {
            return `${n}, ${new Intl.DateTimeFormat(o, {hour: "2-digit",minute: "2-digit"}).format(t)}`
        } catch (e) {
            return n
        }
    }
    const c = t.getFullYear() === s.getFullYear();
    try {
        const e = c ? {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        } : {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };
        return new Intl.DateTimeFormat(o, e).format(t)
    } catch (e) {
        return t.toLocaleString()
    }
}
window.invalidateDealsCache = invalidateDealsCache,
window._parseDealTs = _parseDealTs,
window._formatOrderDate = _formatOrderDate;
const _ORDER_DATE_CLOCK_SVG = '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12,7 12,12 16,14"/></svg>';
function getStatusText(e) {
    const n = {
        ru: {
            wait_payment: "Ожидание оплаты",
            paid: "Оплачена",
            sent: "В банке",
            completed: "Завершена",
            cancelled: "Отменена"
        },
        en: {
            wait_payment: "Awaiting payment",
            paid: "Paid",
            sent: "In Bank",
            completed: "Completed",
            cancelled: "Cancelled"
        },
        uk: {
            wait_payment: "Очікує оплати",
            paid: "Оплачено",
            sent: "В банку",
            completed: "Завершено",
            cancelled: "Скасовано"
        },
        ar: {
            wait_payment: "بانتظار الدفع",
            paid: "مدفوعة",
            sent: "مع المدير",
            completed: "مكتملة",
            cancelled: "ملغاة"
        },
        zh: {
            wait_payment: "等待付款",
            paid: "已付款",
            sent: "托管中",
            completed: "已完成",
            cancelled: "已取消"
        }
    };
    return (n[state.language || "en"] || n.en)[e] || e
}
const CURRENCY_MIN = {
    TON: 1,
    USDT: 5,
    BTC: 1e-4,
    ETH: .005,
    STARS: 50,
    RUB: 500,
    USD: 5,
    EUR: 5,
    GBP: 5,
    CNY: 30,
    JPY: 500,
    TRY: 200,
    UAH: 200,
    KZT: 2e3
};
function currencyMin(e) {
    return CURRENCY_MIN[(e || "").toUpperCase()] || 1
}
window.currencyMin = currencyMin;
let _orderDetailTimer = null,
    _orderDetailTag = null,
    _bodyScrollLockCount = 0,
    _bodyScrollLockSavedY = 0;
function _lockBodyScroll() {
    0 === _bodyScrollLockCount && (_bodyScrollLockSavedY = window.scrollY || document.documentElement.scrollTop || 0, document.body.style.setProperty("--scroll-y-saved", `-${_bodyScrollLockSavedY}px`), document.body.style.top = `-${_bodyScrollLockSavedY}px`, document.body.classList.add("body-scroll-locked")),
    _bodyScrollLockCount++
}
function _unlockBodyScroll() {
    0 !== _bodyScrollLockCount && (_bodyScrollLockCount--, 0 === _bodyScrollLockCount && (document.body.classList.remove("body-scroll-locked"), document.body.style.top = "", document.body.style.removeProperty("--scroll-y-saved"), window.scrollTo(0, _bodyScrollLockSavedY)))
}
async function showOrderDetails(e) {
    haptic("light"),
    _orderDetailTag = e;
    const n = document.querySelector(".order-detail-overlay");
    n && (n.remove(), _unlockBodyScroll());
    const t = document.createElement("div");
    t.className = "order-detail-overlay",
    t.innerHTML = `\n        <div class="order-detail-page">\n            <div class="page-header">\n                <h1 class="page-title">#${escapeHtml(e)}</h1>\n            </div>\n            <div class="page-content">\n                <div id="order-detail-progress"></div>\n                <div id="order-detail-body">\n                    <div class="skeleton-card">\n                        <div class="skeleton-line skeleton-w-50"></div>\n                        <div class="skeleton-line skeleton-w-70"></div>\n                        <div class="skeleton-line skeleton-w-30"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    `,
    document.body.appendChild(t),
    _lockBodyScroll(),
    requestAnimationFrame(() => t.classList.add("active")),
    window.FunpayTG && FunpayTG.isMiniApp && FunpayTG.pushBack(() => closeOrderDetails()),
    await _renderOrderDetail(),
    _orderDetailTimer = setInterval(_renderOrderDetail, 6e3)
}
function closeOrderDetails() {
    haptic("light"),
    _orderDetailTimer && (clearInterval(_orderDetailTimer), _orderDetailTimer = null),
    _orderDetailTag = null;
    const e = document.querySelector(".order-detail-overlay");
    if (e && (e.classList.remove("active"), setTimeout(() => e.remove(), 300), _unlockBodyScroll(), window.FunpayTG && FunpayTG.sdk && FunpayTG.sdk.BackButton && FunpayTG.sdk.BackButton.isVisible))
        try {
            FunpayTG.popBack()
        } catch (e) {}
}
async function _renderOrderDetail() {
    if (!_orderDetailTag)
        return;
    if (!window.state || !state.user || !state.user.id) {
        for (let e = 0; e < 20 && (await new Promise(e => setTimeout(e, 50)), !(window.state && state.user && state.user.id)); e++)
            ;
        if (!window.state || !state.user || !state.user.id) {
            const e = document.getElementById("order-detail-body");
            return e && (e.innerHTML = `<div class="error">${t("nFailedToLoadUser")}</div>`), void (_orderDetailTimer && (clearInterval(_orderDetailTimer), _orderDetailTimer = null))
        }
    }
    const e = _orderDetailTag;
    let n;
    try {
        if (state.t)
            try {
                await state.t
            } catch (e) {}
        state.user.balance || apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/balance`).then(e => e.ok ? e.json() : null).then(e => {
            e && (state.user.balance = e.balance || {})
        }).catch(() => {});
        const t = await apiFetch(`${CONFIG.apiUrl}/deals/${e}`);
        if (!t.ok)
            throw new Error("http " + t.status);
        const a = await t.json();
        if (n = a && a.deal, !n)
            throw new Error("empty deal payload")
    } catch (e) {
        const n = document.getElementById("order-detail-body");
        if (n) {
            const e = window.state && state.language || "en",
                t = {
                    ru: "Сделка не найдена",
                    en: "Deal not found",
                    uk: "Угоду не знайдено",
                    ar: "الصفقة غير موجودة",
                    zh: "未找到交易"
                };
            n.innerHTML = `<div class="error">${t[e] || t.en}</div>`
        }
        return void (_orderDetailTimer && (clearInterval(_orderDetailTimer), _orderDetailTimer = null))
    }
    try {
        const t = document.getElementById("order-detail-progress");
        if (t && window.renderOrderProgress)
            try {
                renderOrderProgress(t, n, {
                    size: "lg"
                })
            } catch (e) {}
        const a = window.state && state.language || "en",
            o = _detailLabels(a),
            s = resolveRoles(n),
            i = String(window.state && state.user && state.user.id || ""),
            r = s.seller && s.seller === i,
            l = s.buyer && s.buyer === i,
            c = window.FunpayIcons ? FunpayIcons.currencyIcon(n.currency || "TON", 32) : "",
            d = s.seller ? formatUserHandle(s.seller, n) : o.notSet,
            p = s.buyer ? formatUserHandle(s.buyer, n) : o.waitingBuyer,
            u = ` <span class="kv-you">(${o.you})</span>`,
            h = d + (r ? u : ""),
            m = p + (l ? u : "");
        let v = "";
        try {
            v = _renderOrderActions(e, n, r, l)
        } catch (e) {
            v = ""
        }
        let w = "";
        if (n.created_at)
            try {
                const e = _parseDealTs(n.created_at);
                w = e ? e.toLocaleString(_intlLocale(a)) : String(n.created_at)
            } catch (e) {
                w = String(n.created_at)
            }
        const y = document.getElementById("order-detail-body");
        if (!y)
            return;
        "completed" !== n.status && "cancelled" !== n.status || !_orderDetailTimer || (clearInterval(_orderDetailTimer), _orderDetailTimer = null);
        let f = "";
        try {
            f = _renderStageGuide(n, r, l, a)
        } catch (e) {}
        y.classList.add("detail-fading"),
        y.innerHTML = `\n        <div class="info-card order-summary">\n            <div class="order-summary__row">\n                ${c}\n                <div class="order-summary__amount">${n.amount} ${n.currency || ""}</div>\n            </div>\n            <div class="order-summary__desc">${escapeHtml(n.description || "")}</div>\n        </div>\n\n        <div class="info-card">\n            <div class="kv">\n                <span class="kv-key">${o.status}</span>\n                <span class="kv-val">${getStatusText(n.status)}</span>\n            </div>\n            <div class="kv">\n                <span class="kv-key">${o.seller}</span>\n                <span class="kv-val">${h}</span>\n            </div>\n            <div class="kv">\n                <span class="kv-key">${o.buyer}</span>\n                <span class="kv-val">${m}</span>\n            </div>\n            ${w ? `<div class="kv">\n                <span class="kv-key">${o.created}</span>\n                <span class="kv-val">${w}</span>\n            </div>` : ""}\n        </div>\n\n        ${f}\n\n        ${v}\n    `,
        requestAnimationFrame(() => y.classList.remove("detail-fading")),
        y.querySelectorAll("[data-action]").forEach(t => {
            _bindInstantTap(t, () => _handleOrderAction(t.dataset.action, e, n))
        })
    } catch (e) {
        const n = document.getElementById("order-detail-body");
        if (n) {
            const e = window.state && state.language || "en",
                t = {
                    ru: "Ошибка отображения сделки",
                    en: "Failed to render deal",
                    uk: "Помилка відображення угоди",
                    ar: "فشل عرض الصفقة",
                    zh: "渲染交易失败"
                };
            n.innerHTML = `<div class="error">${t[e] || t.en}</div>`
        }
        _orderDetailTimer && (clearInterval(_orderDetailTimer), _orderDetailTimer = null)
    }
}
function escapeHtml(e) {
    return String(e || "").replace(/[&<>"']/g, e => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[e]))
}
function _formatCardWithCaret(e) {
    const n = e.value || "",
        t = e.selectionStart || 0;
    let a = 0;
    for (let e = 0; e < t && e < n.length; e++)
        /[0-9]/.test(n[e]) && a++;
    const o = n.replace(/\D/g, ""),
        s = o.match(/.{1,4}/g)?.join(" ") || o;
    if (s === e.value)
        return;
    e.value = s;
    let i = 0,
        r = 0;
    for (; i < s.length && r < a;)
        /[0-9]/.test(s[i]) && r++,
        i++;
    try {
        e.setSelectionRange(i, i)
    } catch (e) {}
}
function _i18nPick(e, n, t, a, o, s) {
    const i = {
        ru: n,
        en: t,
        uk: a,
        ar: o,
        zh: s,
        es: t,
        hi: t,
        pt: t,
        ja: t,
        de: t,
        fr: t,
        tr: t
    };
    if (null != i[e])
        return i[e];
    if (null != t)
        return t;
    if (null != n)
        return n;
    for (const e of [a, o, s])
        if (null != e)
            return e;
    return ""
}
function resolveRoles(e) {
    if (!e)
        return { seller: null, buyer: null };
    const dtype = (e.deal_type || "sell").toLowerCase();
    const sellerRaw = e.seller_id != null && e.seller_id !== "" ? String(e.seller_id) : null;
    const buyerRaw = e.buyer_id != null && e.buyer_id !== "" ? String(e.buyer_id) : null;
    const creator = e.creator_id != null && e.creator_id !== ""
        ? String(e.creator_id)
        : (e.user_id != null && e.user_id !== "" ? String(e.user_id) : null);
    // New model: creator_id present, roles stored correctly.
    if (e.creator_id != null && e.creator_id !== "")
        return { seller: sellerRaw, buyer: buyerRaw };
    // Legacy buy deals inverted seller/buyer in storage.
    if (dtype === "buy")
        return {
            seller: buyerRaw,
            buyer: sellerRaw || creator
        };
    return {
        seller: sellerRaw || creator,
        buyer: buyerRaw
    }
}
function tgUserLink(e, n) {
    if (!e)
        return "";
    const t = String(e).trim().replace(/^@/, "");
    return t ? /^[A-Za-z0-9_]{3,}$/.test(t) ? `<a class="tg-user-link" href="https://t.me/${t}" target="_blank" rel="noopener noreferrer">${escapeHtml(n || "@" + t)}</a>` : escapeHtml(n || t) : ""
}
function formatUserHandle(e, n) {
    if (!e)
        return "—";
    const id = String(e),
        roles = resolveRoles(n),
        dtype = ((n && n.deal_type) || "sell").toLowerCase(),
        hasCreator = !!(n && n.creator_id != null && n.creator_id !== "");
    let a, o;
    if (roles.seller && id === String(roles.seller)) {
        // New storage: seller_* is always the seller.
        // Legacy buy: seller was stored in buyer_*.
        if (hasCreator || dtype !== "buy") {
            a = n.seller_username;
            o = n.seller_first_name;
        } else {
            a = n.buyer_username;
            o = n.buyer_first_name;
        }
    } else if (roles.buyer && id === String(roles.buyer)) {
        if (hasCreator || dtype !== "buy") {
            a = n.buyer_username || (hasCreator ? n.user_username : null);
            o = n.buyer_first_name || (hasCreator ? n.user_first_name : null);
        } else {
            // Legacy buy: buyer was stored in seller_* / user_*.
            a = n.seller_username || n.user_username;
            o = n.seller_first_name || n.user_first_name;
        }
    } else {
        a = n && (n.user_username || n.seller_username || n.buyer_username);
        o = n && (n.user_first_name || n.seller_first_name || n.buyer_first_name);
    }
    return a && String(a).trim() ? tgUserLink(a) : o && String(o).trim() ? escapeHtml(String(o).trim()) : "id" + escapeHtml(id)
}
function showDealTakenModal(e) {
    const n = document.createElement("div");
    n.className = "modal-overlay active",
    n.onclick = closeModalOnBackdrop,
    n.innerHTML = `\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">${t("dealTakenTitle")}</h2>\n                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                </button>\n            </div>\n            <div class="modal-body">\n                <div class="quote-warning">\n                    <blockquote>${tf("dealTakenLine1", escapeHtml(e))}</blockquote>\n                    <blockquote>${t("dealTakenLine2")}</blockquote>\n                    <blockquote>${t("dealTakenLine3")}</blockquote>\n                </div>\n                <div class="modal-actions">\n                    <button class="btn btn-secondary" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">${t("closeBtn")}</button>\n                </div>\n            </div>\n        </div>\n    `,
    document.body.appendChild(n)
}
function showOwnDealModal(e) {
    const n = state.language || "en",
        t = {
            ru: {
                title: "Это ваша сделка",
                l1: "Сделка #" + e,
                l2: "Вы создатель этой сделки — присоединиться к ней нельзя.",
                l3: "Отправьте ссылку другой стороне, чтобы они вошли в сделку.",
                btn: "Поделиться сделкой",
                close: "Закрыть"
            },
            en: {
                title: "This is your deal",
                l1: "Deal #" + e,
                l2: "You created this deal — you can't join it as the other side.",
                l3: "Send the link to the other party so they can join.",
                btn: "Share deal",
                close: "Close"
            },
            uk: {
                title: "Це ваша угода",
                l1: "Угода #" + e,
                l2: "Ви створили цю угоду — приєднатися до неї не можна.",
                l3: "Надішліть посилання іншій стороні, щоб вона приєдналася.",
                btn: "Поділитися",
                close: "Закрити"
            },
            ar: {
                title: "هذه صفقتك",
                l1: "الصفقة #" + e,
                l2: "لقد أنشأت هذه الصفقة — لا يمكنك الانضمام إليها كطرف آخر.",
                l3: "أرسل الرابط للطرف الآخر للانضمام.",
                btn: "مشاركة الصفقة",
                close: "إغلاق"
            },
            zh: {
                title: "这是您的交易",
                l1: "交易 #" + e,
                l2: "您创建了此交易 — 不能作为另一方加入。",
                l3: "将链接发送给对方以便加入。",
                btn: "分享交易",
                close: "关闭"
            }
        },
        a = t[n] || t.en,
        o = document.createElement("div");
    o.className = "modal-overlay active",
    o.innerHTML = `\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">${a.title}</h2>\n                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                </button>\n            </div>\n            <div class="modal-body">\n                <div class="quote-warning">\n                    <blockquote>${a.l1}</blockquote>\n                    <blockquote>${a.l2}</blockquote>\n                    <blockquote>${a.l3}</blockquote>\n                </div>\n                <div class="modal-actions">\n                    <button class="btn btn-secondary" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">${a.close}</button>\n                    <button class="btn btn-primary" id="own-deal-share">${a.btn}</button>\n                </div>\n            </div>\n        </div>\n    `,
    document.body.appendChild(o),
    o.querySelector("#own-deal-share").addEventListener("click", () => {
        haptic("light"),
        o.remove(),
        "function" == typeof showShareModal && showShareModal(e)
    })
}
function editUsdtNetwork(e) {
    haptic("light");
    const n = state.language || "en",
        t = (e, t, a, o, s) => _i18nPick(n, e, t, a, o, s),
        a = "usdt_" + e,
        o = document.createElement("div");
    o.className = "modal-overlay active",
    o.innerHTML = `\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">USDT · ${{trc20: "TRC20",bep20: "BEP20",ton: "USDT (TON)"}[e]}</h2>\n                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                </button>\n            </div>\n            <div class="modal-body">\n                <div class="form-group">\n                    <label>${t("Адрес", "Address")}</label>\n                    <input type="text" id="req-addr-input" class="form-control"\n                           placeholder="${{trc20: "T... (34 chars)",bep20: "0x... (42 chars)",ton: "UQ... / EQ..."}[e]}"\n                           autocomplete="off" autocapitalize="off" spellcheck="false">\n                    <small class="form-text">${t("Оставьте пустым чтобы удалить", "Leave empty to remove")}</small>\n                </div>\n                <div class="modal-actions">\n                    <button class="btn btn-secondary" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">${t("Отменить", "Cancel")}</button>\n                    <button class="btn btn-primary" id="req-save">${t("Сохранить", "Save")}</button>\n                </div>\n            </div>\n        </div>\n    `,
    document.body.appendChild(o),
    setTimeout(()=>o.querySelector("#req-addr-input")?.focus(), 80),
    o.querySelector("#req-save").addEventListener("click", async () => {
        const e = o.querySelector("#req-addr-input").value.trim();
        haptic("medium");
        try {
            const n = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/requisite`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
                },
                body: JSON.stringify({
                    key: a,
                    value: e
                })
            });
            if (!n.ok) {
                let e = "";
                try {
                    e = (await n.json()).detail
                } catch (e) {}
                return showNotification(e || t("Ошибка", "Failed"), "error"), void haptic("error")
            }
            haptic("success"),
            showNotification(t("Сохранено", "Saved"), "success"),
            closeTopModal(),
            "function" == typeof loadWalletRequisites && loadWalletRequisites()
        } catch (e) {
            haptic("error"),
            showNotification(t("Ошибка", "Failed"), "error")
        }
    })
}
function _actionLabels(e) {
    const n = {
        ru: {
            shareDeal: "Поделиться сделкой",
            cancelDeal: "Отменить сделку",
            markSent: "Передал в банк",
            openMgrChat: "Открыть FunRelayer",
            confirmRecv: "Подтвердить получение",
            dealCancelled: "Сделка отменена",
            dealCompleted: "Сделка успешно завершена"
        },
        en: {
            shareDeal: "Share deal",
            cancelDeal: "Cancel deal",
            markSent: "Sent to Bank",
            openMgrChat: "Open FunRelayer",
            confirmRecv: "Confirm receipt",
            dealCancelled: "Deal cancelled",
            dealCompleted: "Deal completed successfully"
        },
        uk: {
            shareDeal: "Поділитися угодою",
            cancelDeal: "Скасувати угоду",
            markSent: "Передав у банк",
            openMgrChat: "Відкрити FunRelayer",
            confirmRecv: "Підтвердити отримання",
            dealCancelled: "Угода скасована",
            dealCompleted: "Угода успішно завершена"
        },
        ar: {
            shareDeal: "مشاركة الصفقة",
            cancelDeal: "إلغاء الصفقة",
            markSent: "سُلِّمت إلى المدير",
            openMgrChat: "فتح محادثة المدير",
            confirmRecv: "تأكيد الاستلام",
            dealCancelled: "تم إلغاء الصفقة",
            dealCompleted: "اكتملت الصفقة بنجاح"
        },
        zh: {
            shareDeal: "分享交易",
            cancelDeal: "取消交易",
            markSent: "已交付管理员",
            openMgrChat: "打开管理员聊天",
            confirmRecv: "确认收到",
            dealCancelled: "交易已取消",
            dealCompleted: "交易已成功完成"
        }
    };
    return n[e] || n.en
}
function _intlLocale(e) {
    return {
            ru: "ru-RU",
            en: "en-US",
            uk: "uk-UA",
            ar: "ar-SA",
            zh: "zh-CN"
        }[e] || "en-US"
}
function _detailLabels(e) {
    const n = {
        ru: {
            status: "Статус",
            seller: "Продавец",
            buyer: "Покупатель",
            created: "Создана",
            notSet: "Не задан",
            waitingBuyer: "Покупатель не присоединился",
            you: "Вы"
        },
        en: {
            status: "Status",
            seller: "Seller",
            buyer: "Buyer",
            created: "Created",
            notSet: "Not set",
            waitingBuyer: "Waiting for buyer",
            you: "You"
        },
        uk: {
            status: "Статус",
            seller: "Продавець",
            buyer: "Покупець",
            created: "Створено",
            notSet: "Не задано",
            waitingBuyer: "Покупець не приєднався",
            you: "Ви"
        },
        ar: {
            status: "الحالة",
            seller: "البائع",
            buyer: "المشتري",
            created: "أُنشئت",
            notSet: "غير محدَّد",
            waitingBuyer: "في انتظار المشتري",
            you: "أنت"
        },
        zh: {
            status: "状态",
            seller: "卖家",
            buyer: "买家",
            created: "创建时间",
            notSet: "未设置",
            waitingBuyer: "等待买家加入",
            you: "您"
        }
    };
    return n[e] || n.en
}
function _renderStageGuide(e, n, t, a) {
    if (!e)
        return "";
    const o = e.status || "wait_payment",
        roles = resolveRoles(e),
        // Counterparty joined = both seats filled (buy deals set buyer_id at create).
        s = !!(roles.seller && roles.buyer) || !!(e.joined_at),
        i = tgUserLink(window.state && state.h ? String(state.h).replace(/^@/, "") : "FunRelayer"),
        r = {
            ru: {
                wait_share_seller: {
                    title: "Сейчас",
                    body: "Ожидаем покупателя. Поделитесь ссылкой на сделку, чтобы он присоединился."
                },
                wait_share_buyer: {
                    title: "Сейчас",
                    body: "Ожидаем продавца. Поделитесь ссылкой, чтобы он присоединился к сделке."
                },
                wait_pay_seller: {
                    title: "Сейчас",
                    body: `Покупатель в сделке. Ждём, когда он оплатит. После оплаты вы передадите подарок в банк ${i}.`
                },
                wait_pay_buyer: {
                    title: "Что делать",
                    body: "Оплатите сделку с баланса — деньги пойдут в эскроу. Продавец передаст подарок в банк, и банк выдаст его вам."
                },
                paid_seller: {
                    title: "Ваш шаг",
                    body: `Передайте подарок ТОЛЬКО в банк ${i} — никогда напрямую покупателю. После передачи нажмите «Передал в банк».`
                },
                paid_buyer: {
                    title: "Сейчас",
                    body: `Оплата получена эскроу. Продавец сейчас передаёт подарок в банк ${i}. Когда он подтвердит — вы получите уведомление.`
                },
                sent_seller: {
                    title: "Сейчас",
                    body: `Подарок в банке ${i}. Ждём, когда покупатель проверит и подтвердит получение — после этого деньги придут к вам.`
                },
                sent_buyer: {
                    title: "Ваш шаг",
                    body: `Свяжитесь с банком ${i} и проверьте товар. Если всё хорошо — нажмите «Подтвердить получение товара».`
                },
                completed: {
                    title: "Готово",
                    body: "Сделка завершена. Спасибо, что воспользовались Funpay!"
                },
                cancelled: {
                    title: "Сделка отменена",
                    body: "Эта сделка была отменена. Если деньги уже списывались, они возвращены на баланс."
                }
            },
            en: {
                wait_share_seller: {
                    title: "Now",
                    body: "Waiting for a buyer. Share the deal link so they can join."
                },
                wait_share_buyer: {
                    title: "Now",
                    body: "Waiting for a seller. Share the deal link so they can join."
                },
                wait_pay_seller: {
                    title: "Now",
                    body: `Buyer joined. We're waiting for them to pay. Once paid, you'll hand the gift to Bank ${i}.`
                },
                wait_pay_buyer: {
                    title: "Your move",
                    body: "Pay the deal from your balance — funds go into escrow. The seller hands the gift to the Bank, then the Bank delivers it to you."
                },
                paid_seller: {
                    title: "Your move",
                    body: `Hand the gift ONLY to Bank ${i} — never directly to the buyer. After handing it over, tap "Sent to Bank".`
                },
                paid_buyer: {
                    title: "Now",
                    body: `Escrow received your payment. The seller is handing the gift to Bank ${i} right now. You'll be notified once they confirm.`
                },
                sent_seller: {
                    title: "Now",
                    body: `Gift is in Bank ${i}. We're waiting for the buyer to check it and confirm receipt — the money lands in your account right after.`
                },
                sent_buyer: {
                    title: "Your move",
                    body: `Contact Bank ${i} and check the item. If everything is fine — tap "Confirm receipt".`
                },
                completed: {
                    title: "Done",
                    body: "Deal completed. Thanks for using Funpay!"
                },
                cancelled: {
                    title: "Deal cancelled",
                    body: "This deal was cancelled. Any debited funds were returned to your balance."
                }
            },
            uk: {
                wait_share_seller: {
                    title: "Зараз",
                    body: "Очікуємо покупця. Поділіться посиланням на угоду, щоб він приєднався."
                },
                wait_share_buyer: {
                    title: "Зараз",
                    body: "Очікуємо продавця. Поділіться посиланням, щоб він приєднався до угоди."
                },
                wait_pay_seller: {
                    title: "Зараз",
                    body: `Покупець в угоді. Чекаємо оплати. Після оплати ви передасте подарунок у банк ${i}.`
                },
                wait_pay_buyer: {
                    title: "Ваш крок",
                    body: "Сплатіть угоду з балансу — кошти підуть до ескроу. Продавець передасть подарунок у банк, і банк передасть його вам."
                },
                paid_seller: {
                    title: "Ваш крок",
                    body: `Передайте подарунок ЛИШЕ в банк ${i} — ніколи напряму покупцю. Після передачі натисніть «Передав у банк».`
                },
                paid_buyer: {
                    title: "Зараз",
                    body: `Ескроу отримало вашу оплату. Продавець зараз передає подарунок у банк ${i}. Коли він підтвердить — ви отримаєте сповіщення.`
                },
                sent_seller: {
                    title: "Зараз",
                    body: `Подарунок у банку ${i}. Очікуємо, коли покупець перевірить і підтвердить отримання — після цього гроші прийдуть до вас.`
                },
                sent_buyer: {
                    title: "Ваш крок",
                    body: `Зв'яжіться з банком ${i} та перевірте товар. Якщо все добре — натисніть «Підтвердити отримання».`
                },
                completed: {
                    title: "Готово",
                    body: "Угоду завершено. Дякуємо за використання Funpay!"
                },
                cancelled: {
                    title: "Угоду скасовано",
                    body: "Цю угоду було скасовано. Якщо кошти вже списувалися, вони повернуті на баланс."
                }
            },
            ar: {
                wait_share_seller: {
                    title: "الآن",
                    body: "في انتظار المشتري. شارك رابط الصفقة لينضم."
                },
                wait_share_buyer: {
                    title: "الآن",
                    body: "في انتظار البائع. شارك رابط الصفقة لينضم."
                },
                wait_pay_seller: {
                    title: "الآن",
                    body: `انضم المشتري للصفقة. ننتظر الدفع. بعد الدفع ستسلّم الهدية للمدير ${i}.`
                },
                wait_pay_buyer: {
                    title: "دورك",
                    body: "ادفع الصفقة من رصيدك — تذهب الأموال إلى الضمان. سيسلّم البائع الهدية للمدير، ثم يسلّمها لك المدير."
                },
                paid_seller: {
                    title: "دورك",
                    body: `سلِّم الهدية فقط للمدير ${i} — أبدًا مباشرة للمشتري. بعد التسليم، اضغط "سُلِّمت إلى المدير".`
                },
                paid_buyer: {
                    title: "الآن",
                    body: `تم استلام دفعتك من قِبَل الضمان. يقوم البائع الآن بتسليم الهدية للمدير ${i}. ستصلك إشعار عند التأكيد.`
                },
                sent_seller: {
                    title: "الآن",
                    body: `الهدية مع المدير ${i}. ننتظر تأكيد المشتري للاستلام — وستصل الأموال إلى حسابك مباشرة بعد ذلك.`
                },
                sent_buyer: {
                    title: "دورك",
                    body: `تواصل مع المدير ${i} وافحص المنتج. إذا كان كل شيء على ما يرام — اضغط "تأكيد الاستلام".`
                },
                completed: {
                    title: "تم",
                    body: "اكتملت الصفقة. شكرًا لاستخدامك Funpay!"
                },
                cancelled: {
                    title: "تم إلغاء الصفقة",
                    body: "تم إلغاء هذه الصفقة. تم إرجاع أي مبلغ مخصوم إلى رصيدك."
                }
            },
            zh: {
                wait_share_seller: {
                    title: "当前",
                    body: "等待买家加入。请分享交易链接让买家加入。"
                },
                wait_share_buyer: {
                    title: "当前",
                    body: "等待卖家加入。请分享交易链接让卖家加入。"
                },
                wait_pay_seller: {
                    title: "当前",
                    body: `买家已加入。等待付款。付款后您将把礼物交给托管经理 ${i}。`
                },
                wait_pay_buyer: {
                    title: "您的操作",
                    body: "从余额支付交易 — 款项进入托管。卖家将把礼物交给经理，再由经理交付给您。"
                },
                paid_seller: {
                    title: "您的操作",
                    body: `仅将礼物交给托管经理 ${i} — 切勿直接给买家。交付后请点击「已交付管理员」。`
                },
                paid_buyer: {
                    title: "当前",
                    body: `托管已收到您的付款。卖家正在将礼物交给经理 ${i}。经理确认后您会收到通知。`
                },
                sent_seller: {
                    title: "当前",
                    body: `礼物已交给经理 ${i}。等待买家验收并确认收货 — 之后款项即转入您的账户。`
                },
                sent_buyer: {
                    title: "您的操作",
                    body: `联系经理 ${i} 并验货。如一切正常 — 点击「确认收货」。`
                },
                completed: {
                    title: "已完成",
                    body: "交易已完成。感谢您使用 Funpay！"
                },
                cancelled: {
                    title: "交易已取消",
                    body: "此交易已取消。任何已扣款项已退回您的余额。"
                }
            }
        },
        l = r[a] || r.en;
    let c = null;
    return "wait_payment" === o ? c = s ? n ? l.wait_pay_seller : l.wait_pay_buyer : n ? l.wait_share_seller : l.wait_share_buyer : "paid" === o ? c = n ? l.paid_seller : l.paid_buyer : "sent" === o ? c = n ? l.sent_seller : l.sent_buyer : "completed" === o ? c = l.completed : "cancelled" === o && (c = l.cancelled), c ? `\n        <div class="info-card stage-guide stage-guide--${o}">\n            <div class="stage-guide__title">${c.title}</div>\n            <div class="stage-guide__body">${c.body}</div>\n        </div>\n    ` : ""
}
function _confirmLabels(e) {
    const n = {
        ru: {
            cancel: "Отменить сделку?",
            pay: (e, n) => `Оплатить ${e} ${n} с баланса? (включая 1% комиссии)`,
            markPaid: "Подтвердить получение оплаты?",
            confirmRecv: "Подтвердить получение товара?"
        },
        en: {
            cancel: "Cancel this deal?",
            pay: (e, n) => `Pay ${e} ${n} from balance? (incl. 1% fee)`,
            markPaid: "Confirm payment received?",
            confirmRecv: "Confirm you received the item?"
        },
        uk: {
            cancel: "Скасувати угоду?",
            pay: (e, n) => `Оплатити ${e} ${n} з балансу? (включно з 1% комісії)`,
            markPaid: "Підтвердити отримання оплати?",
            confirmRecv: "Підтвердити отримання товару?"
        },
        ar: {
            cancel: "إلغاء الصفقة؟",
            pay: (e, n) => `الدفع ${e} ${n} من الرصيد؟ (شاملاً عمولة 1%)`,
            markPaid: "تأكيد استلام الدفعة؟",
            confirmRecv: "تأكيد استلام البضاعة؟"
        },
        zh: {
            cancel: "取消此交易？",
            pay: (e, n) => `从余额支付 ${e} ${n}？（含 1% 手续费）`,
            markPaid: "确认收款？",
            confirmRecv: "确认收到商品？"
        }
    };
    return n[e] || n.en
}

function showAppConfirmModal(message) {
    return new Promise(resolve => {
        const lang = state.language || "en";
        const pick = (ru, en) => _i18nPick(lang, ru, en, ru, en, en);
        const o = document.createElement("div");
        o.className = "modal-overlay active";
        o.onclick = closeModalOnBackdrop;
        o.innerHTML = `
            <div class="modal-content handover-confirm">
                <div class="modal-header">
                    <h2 class="modal-title">${pick("Подтверждение", "Confirm")}</h2>
                    <button type="button" class="btn-close" data-close aria-label="Close">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>
                <div class="modal-body">
                    <p style="font-size:15px;line-height:1.45;margin:0 0 18px">${escapeHtml(message || "")}</p>
                    <div class="action-stack">
                        <button type="button" class="btn btn-primary btn-block" data-yes>${pick("Подтвердить", "Confirm")}</button>
                        <button type="button" class="btn btn-secondary btn-block" data-no>${pick("Отмена", "Cancel")}</button>
                    </div>
                </div>
            </div>`;
        const done = ok => {
            try { o.remove() } catch (e) {}
            resolve(!!ok)
        };
        o.querySelector("[data-yes]").addEventListener("click", () => { haptic("medium"); done(!0) });
        o.querySelector("[data-no]").addEventListener("click", () => { haptic("light"); done(!1) });
        o.querySelector("[data-close]").addEventListener("click", () => done(!1));
        document.body.appendChild(o)
    })
}

async function showHandoverConfirmModal() {
    const e = {
            ru: {
                title: "Передача в банк",
                q: "Вы уже передали подарок в банк?",
                warn: "Нажимайте только если подарок УЖЕ передан в банк. Эту кнопку нельзя отменить — деньги останутся заблокированы до подтверждения покупателя.",
                mgrLbl: "Банк-эскроу:",
                yes: "Да, я передал",
                no: "Ещё нет"
            },
            en: {
                title: "Hand-over to Bank",
                q: "Have you already handed the gift to the Bank?",
                warn: "Tap only if the gift has ALREADY been delivered to the Bank. This action can't be undone — funds stay locked until the buyer confirms.",
                mgrLbl: "Escrow Bank:",
                yes: "Yes, I handed it over",
                no: "Not yet"
            },
            uk: {
                title: "Передача в банк",
                q: "Ви вже передали подарунок у банк?",
                warn: "Натискайте лише якщо подарунок УЖЕ передано в банк. Цю дію не можна скасувати — кошти залишаться заблокованими до підтвердження покупцем.",
                mgrLbl: "Банк-ескроу:",
                yes: "Так, я передав",
                no: "Ще ні"
            },
            ar: {
                title: "التسليم إلى المدير",
                q: "هل سلَّمت الهدية للمدير بالفعل؟",
                warn: "اضغط فقط إذا كانت الهدية قد سُلِّمت بالفعل إلى حساب المدير. لا يمكن التراجع عن هذا الإجراء — تظل الأموال محجوزة حتى يؤكد المشتري.",
                mgrLbl: "مدير الضمان:",
                yes: "نعم، لقد سلَّمت",
                no: "ليس بعد"
            },
            zh: {
                title: "交付给管理员",
                q: "您是否已将礼物交付给管理员？",
                warn: "仅在已经将礼物交付到管理员账户时按下。此操作不可撤销 — 资金将一直冻结，直到买家确认。",
                mgrLbl: "托管管理员：",
                yes: "是，我已交付",
                no: "还没有"
            }
        },
        n = e[state.language || "en"] || e.en;
    return new Promise(e => {
        const t = window.state && state.h ? String(state.h).replace(/^@/, "") : "FunRelayer",
            a = `<a class="tg-user-link handover-mgr-link"\n                              data-mgr-link\n                              href="https://t.me/${t}"\n                              target="_blank" rel="noopener noreferrer">@${t}</a>`,
            o = document.createElement("div");
        o.className = "modal-overlay active handover-confirm-overlay",
        o.innerHTML = `\n            <div class="modal-content handover-confirm">\n                <div class="modal-header">\n                    <h2 class="modal-title">${n.title}</h2>\n                    <button class="btn-close" data-close>\n                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                    </button>\n                </div>\n                <div class="modal-body">\n                    <div class="handover-question">\n                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="result-icon"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\n                        <p>${n.q}</p>\n                    </div>\n                    <div class="handover-mgr">\n                        <span>${n.mgrLbl}</span>\n                        ${a}\n                    </div>\n                    <p class="handover-warn">${n.warn}</p>\n                    <div class="modal-actions">\n                        <button class="btn btn-secondary" data-no>${n.no}</button>\n                        <button class="btn btn-primary handover-yes" data-yes>${n.yes}</button>\n                    </div>\n                </div>\n            </div>\n        `,
        document.body.appendChild(o),
        fetch(`${CONFIG.apiUrl.replace(/\/api$/, "")}/api/config`).then(e => e.ok ? e.json() : null).then(e => {
            if (!e || !o.isConnected)
                return;
            const n = e.escrow_username || e.support_username;
            if (!n)
                return;
            window.state && (state.h = n);
            const t = String(n).replace(/^@/, ""),
                a = o.querySelector("[data-mgr-link]");
            a && (a.textContent = "@" + t, a.setAttribute("href", `https://t.me/${t}`))
        }).catch(() => {});
        const s = n => {
            o.remove(),
            e(n)
        };
        o.querySelector("[data-close]").addEventListener("click", () => {
            haptic("light"),
            s(!1)
        }),
        o.querySelector("[data-no]").addEventListener("click", () => {
            haptic("light"),
            s(!1)
        }),
        o.querySelector("[data-yes]").addEventListener("click", () => {
            haptic("heavy"),
            s(!0)
        }),
        o.addEventListener("click", e => {
            e.target === o && (haptic("light"), s(!1))
        })
    })
}
function _payLabels(e) {
    const n = {
        ru: {
            toPay: "К оплате",
            fee1: "Комиссия 1%",
            totalLbl: "Всего",
            yourBalance: "Ваш баланс",
            payBtn: "Оплатить из баланса",
            payOther: "Оплатить другой валютой",
            openWallet: "Открыть кошелёк",
            insufficient: e => `Недостаточно средств в ${e}.`,
            chooseCur: "Выберите валюту для оплаты",
            chooseCurHelp: "У вас не хватает выбранной валюты. Можно оплатить любой другой — с конвертацией по курсу и комиссией 1% за обмен.",
            rate: "Курс",
            convFee: "Комиссия за обмен 1%",
            willPay: "Будет списано",
            willReceive: "Получит продавец",
            confirmCross: "Оплатить",
            cancel: "Отменить",
            noOptions: "Нет валют с достаточным балансом. Пополните любой кошелёк.",
            loading: "Считаем варианты…"
        },
        en: {
            toPay: "To pay",
            fee1: "Fee 1%",
            totalLbl: "Total",
            yourBalance: "Your balance",
            payBtn: "Pay from balance",
            payOther: "Pay with another currency",
            openWallet: "Open wallet",
            insufficient: e => `Insufficient ${e} balance.`,
            chooseCur: "Choose a currency to pay with",
            chooseCurHelp: "Your selected currency is short. You can settle with any other currency — converted at today's rate with a 1% conversion fee.",
            rate: "Rate",
            convFee: "Conversion fee 1%",
            willPay: "You'll be charged",
            willReceive: "Seller receives",
            confirmCross: "Pay",
            cancel: "Cancel",
            noOptions: "No currency has enough balance. Top up any wallet.",
            loading: "Calculating options…"
        },
        uk: {
            toPay: "До сплати",
            fee1: "Комісія 1%",
            totalLbl: "Всього",
            yourBalance: "Ваш баланс",
            payBtn: "Оплатити з балансу",
            payOther: "Оплатити іншою валютою",
            openWallet: "Відкрити гаманець",
            insufficient: e => `Недостатньо коштів у ${e}.`,
            chooseCur: "Виберіть валюту для оплати",
            chooseCurHelp: "Вам не вистачає обраної валюти. Можна оплатити іншою — з конвертацією за курсом та комісією 1% за обмін.",
            rate: "Курс",
            convFee: "Комісія за обмін 1%",
            willPay: "Буде списано",
            willReceive: "Продавець отримає",
            confirmCross: "Оплатити",
            cancel: "Скасувати",
            noOptions: "Немає валют з достатнім балансом. Поповніть гаманець.",
            loading: "Розраховуємо варіанти…"
        },
        ar: {
            toPay: "للدفع",
            fee1: "رسوم 1%",
            totalLbl: "الإجمالي",
            yourBalance: "رصيدك",
            payBtn: "الدفع من الرصيد",
            payOther: "الدفع بعملة أخرى",
            openWallet: "فتح المحفظة",
            insufficient: e => `رصيد ${e} غير كافٍ.`,
            chooseCur: "اختر عملة الدفع",
            chooseCurHelp: "العملة المحددة غير كافية. يمكنك الدفع بأي عملة أخرى — مع التحويل بسعر اليوم ورسوم تحويل 1%.",
            rate: "سعر الصرف",
            convFee: "رسوم التحويل 1%",
            willPay: "سيتم خصم",
            willReceive: "سيستلم البائع",
            confirmCross: "ادفع",
            cancel: "إلغاء",
            noOptions: "لا توجد عملة برصيد كافٍ. اشحن أي محفظة.",
            loading: "جارٍ حساب الخيارات…"
        },
        zh: {
            toPay: "应付",
            fee1: "手续费 1%",
            totalLbl: "合计",
            yourBalance: "您的余额",
            payBtn: "从余额支付",
            payOther: "使用其他货币支付",
            openWallet: "打开钱包",
            insufficient: e => `${e} 余额不足。`,
            chooseCur: "选择支付货币",
            chooseCurHelp: "所选货币余额不足。可使用其他货币支付，按当日汇率换算并收取 1% 兑换手续费。",
            rate: "汇率",
            convFee: "兑换手续费 1%",
            willPay: "将扣款",
            willReceive: "卖家收到",
            confirmCross: "支付",
            cancel: "取消",
            noOptions: "没有余额足够的货币。请充值任意钱包。",
            loading: "正在计算可选…"
        }
    };
    return n[e] || n.en
}
function _renderOrderActions(e, n, t, a) {
    const o = window.state && state.language || "en",
        s = _actionLabels(o),
        i = [],
        r = String(window.state && state.user && state.user.id || ""),
        roles = resolveRoles(n),
        isCreator = !!r && (
            (n.creator_id != null && String(n.creator_id) === r) ||
            String(n.user_id || "") === r ||
            (!n.creator_id && String(n.seller_id || "") === r && "buy" !== (n.deal_type || "").toLowerCase()) ||
            (!n.creator_id && String(n.seller_id || "") === r && "buy" === (n.deal_type || "").toLowerCase())
        ),
        l = isCreator;
    if (l && "wait_payment" === n.status && (i.push(`<button class="btn btn-primary btn-block" data-action="share">\n            <svg style="width:18px;height:18px;vertical-align:-3px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>\n            ${s.shareDeal}\n        </button>`), i.push(`<button class="btn btn-secondary btn-block" data-action="cancel">\n            ${s.cancelDeal}\n        </button>`)), t && "paid" === n.status && (i.push(`<button class="btn btn-primary btn-block" data-action="mark_sent">\n            ${s.markSent}\n        </button>`), i.push(`<button class="btn btn-secondary btn-block" data-action="manager_chat">\n            <svg style="width:18px;height:18px;vertical-align:-3px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>\n            ${s.openMgrChat}\n        </button>`)), a && "sent" === n.status && i.push(`<button class="btn btn-primary btn-block" data-action="confirm">\n            ${s.confirmRecv}\n        </button>`), a && "wait_payment" === n.status) {
        const e = n.currency || "TON",
            t = Number(n.amount || 0),
            a = +(.01 * t).toFixed(8),
            s = +(t + a).toFixed(8),
            r = Number((state.user.balance || {})[e] || 0),
            c = r >= s,
            d = e => Number(e).toFixed(2).replace(/\.?0+$/, ""),
            p = _payLabels(o),
            u = !!(roles && roles.seller);
        if (i.push(`<div class="info-card pay-summary">\n            <div class="kv"><span class="kv-key">${p.toPay}</span>\n                <span class="kv-val"><strong>${d(t)}</strong> ${e}</span></div>\n            <div class="kv"><span class="kv-key">${p.fee1}</span>\n                <span class="kv-val">${d(a)} ${e}</span></div>\n            <div class="kv"><span class="kv-key">${p.totalLbl}</span>\n                <span class="kv-val pay-total"><strong>${d(s)}</strong> ${e}</span></div>\n            <div class="kv"><span class="kv-key">${p.yourBalance}</span>\n                <span class="kv-val ${c ? "" : "kv-warn"}">${d(r)} ${e}</span></div>\n        </div>`), u)
            c ? i.push(`<button class="btn btn-primary btn-block" data-action="pay">\n                ${p.payBtn}\n            </button>`) : (i.push(`<div class="info-card warn-card">\n                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="result-icon"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>\n                <span>${p.insufficient(e)}</span>\n            </div>`), i.push(`<button class="btn btn-primary btn-block" data-action="cross_pay">\n                ${p.payOther}\n            </button>`), i.push(`<button class="btn btn-secondary btn-block" data-action="goto_wallet">\n                ${p.openWallet}\n            </button>`));
        else {
            const e = {
                    ru: "Ожидание продавца. Поделитесь ссылкой на сделку, чтобы продавец присоединился.",
                    en: "Waiting for the seller. Share the deal link so the seller can join.",
                    uk: "Очікуємо продавця. Поділіться посиланням, щоб продавець приєднався.",
                    ar: "في انتظار البائع. شارك رابط الصفقة لينضم البائع.",
                    zh: "等待卖家加入。请分享交易链接，让卖家加入。"
                },
                n = {
                    ru: "Поделиться сделкой",
                    en: "Share deal",
                    uk: "Поділитися",
                    ar: "مشاركة الصفقة",
                    zh: "分享交易"
                };
            i.push(`<div class="info-card warn-card">\n                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="result-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\n                <span>${e[o] || e.en}</span>\n            </div>`),
            l && i.push(`<button class="btn btn-primary btn-block" data-action="share">\n                    ${n[o] || n.en}\n                </button>`)
        }
    }
    return "cancelled" === n.status && i.push(`<div class="info-card cancel-card">\n            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="result-icon"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>\n            <span>${s.dealCancelled}</span>\n        </div>`), "completed" === n.status && i.push(`<div class="info-card success-card">\n            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="result-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>\n            <span>${s.dealCompleted}</span>\n        </div>`), i.length ? `<div class="action-stack">${i.join("")}</div>` : ""
}
async function _handleOrderAction(e, n, a) {
    if (haptic("cancel" === e ? "heavy" : "pay" === e || "mark_paid" === e || "mark_sent" === e || "confirm" === e ? "medium" : "light"), "goto_wallet" === e)
        return closeOrderDetails(), void loadPage("wallets");
    if ("cross_pay" === e)
        return showCrossPayModal(n, a);
    if ("manager_chat" === e) {
        const u = (window.state && (state.m || state.h)) || "FunRelayer",
            t = `https://t.me/${String(u).replace(/^@/, "")}`;
        return void _openTgLink(t)
    }
    const o = {
        "Content-Type": "application/json",
        "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
    };
    if ("share" === e)
        return showShareModal(n);
    const s = {
        cancel: `/deals/${n}/cancel`,
        pay: `/deals/${n}/pay`,
        mark_paid: `/deals/${n}/paid`,
        mark_sent: `/deals/${n}/sent`,
        confirm: `/deals/${n}/confirm`
    }[e];
    if (!s)
        return;
    const i = a && a.currency || "",
        r = a ? +(1.01 * Number(a.amount)).toFixed(8) : "?",
        l = _confirmLabels(state.language || "en"),
        c = {
            cancel: l.cancel,
            pay: l.pay(r, i),
            mark_paid: l.markPaid,
            confirm: l.confirmRecv
        };
    if ("mark_sent" === e) {
        if (!await showHandoverConfirmModal())
            return
    } else if (!await showAppConfirmModal(c[e] || ""))
        return;
    try {
        const i = await fetch(CONFIG.apiUrl + s, {
            method: "POST",
            headers: o,
            body: JSON.stringify({
                user_id: window.state && state.user && state.user.id || null
            })
        });
        if (!i.ok) {
            let e = "";
            try {
                e = (await i.json()).detail
            } catch (n) {
                e = await i.text()
            }
            haptic("error");
            const n = 402 === i.status ? t("nInsufficientFunds") : e || t("nGenericFailed");
            return void showNotification(n, "error")
        }
        const r = {
            pay: "paid",
            mark_sent: "sent",
            confirm: "completed",
            cancel: "cancelled",
            mark_paid: "paid"
        }[e];
        if (r && a) {
            a.status = r;
            try {
                if (_dealsCache && _dealsCache.data) {
                    const e = ["as_seller", "as_buyer"];
                    for (const t of e) {
                        const e = _dealsCache.data[t] || {};
                        e[n] && (e[n].status = r)
                    }
                }
            } catch (e) {}
        }
        try {
            const e = state.l && state.l.deal_counts || null;
            e && ("completed" === r ? (e.active > 0 && (e.active = Math.max(0, e.active - 1)), e.completed = (e.completed || 0) + 1) : "cancelled" === r && (e.active > 0 && (e.active = Math.max(0, e.active - 1)), e.cancelled = (e.cancelled || 0) + 1))
        } catch (e) {}
        invalidateDealsCache && invalidateDealsCache();
        try {
            const e = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/balance`);
            if (e.ok) {
                const n = await e.json();
                state.user.balance = n.balance || {}
            }
        } catch (e) {}
        void 0 !== state.v && (state.v = null),
        void 0 !== state.$ && (state.$ = null),
        "function" == typeof loadOrdersStats && "profile" === state.currentPage && loadOrdersStats(),
        "cancel" === e ? (closeOrderDetails(), "orders" === state.currentPage && loadOrdersList("active")) : await _renderOrderDetail(),
        haptic("success")
    } catch (e) {
        haptic("error"),
        showNotification(t("nGenericFailed"), "error")
    }
}
async function showCrossPayModal(e, n) {
    haptic("light");
    const t = _payLabels(state.language || "en"),
        a = e => Number(e).toFixed(2).replace(/\.?0+$/, ""),
        o = document.createElement("div");
    o.className = "modal-overlay active",
    o.onclick = closeModalOnBackdrop,
    o.innerHTML = `\n        <div class="modal-content cross-pay-modal">\n            <div class="modal-header">\n                <h2 class="modal-title">${t.chooseCur}</h2>\n                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()" aria-label="Close">\n                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                </button>\n            </div>\n            <div class="modal-body">\n                <p class="cross-pay-help">${t.chooseCurHelp}</p>\n                <div id="cross-pay-list" class="cross-pay-list">\n                    <p class="cross-pay-loading">${t.loading}</p>\n                </div>\n            </div>\n        </div>\n    `,
    document.body.appendChild(o);
    let s = [];
    try {
        const n = await fetch(`${CONFIG.apiUrl}/deals/${e}/pay-quotes`, {
            headers: {
                "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
            }
        });
        if (!n.ok)
            throw new Error(await n.text());
        s = ((await n.json()).quotes || []).filter(e => e.sufficient)
    } catch (e) {}
    const i = o.querySelector("#cross-pay-list");
    s.length ? (i.innerHTML = s.map(e => `\n        <button type="button" class="cross-pay-row" data-cur="${e.src_currency}">\n            <div class="cross-pay-row-head">\n                <span class="cross-pay-cur">${e.src_currency}</span>\n                <span class="cross-pay-amount"><strong>${a(e.src_total)}</strong> ${e.src_currency}</span>\n            </div>\n            <div class="cross-pay-row-meta">\n                <span>${t.rate}: 1 ${e.deal_currency} = ${Number(e.rate).toFixed(6).replace(/\.?0+$/, "")} ${e.src_currency}</span>\n                <span>${t.yourBalance}: ${a(e.have)}</span>\n            </div>\n        </button>\n    `).join(""), i.querySelectorAll("[data-cur]").forEach(t => {
        t.addEventListener("click", () => _confirmCrossPay(e, t.dataset.cur, n, o))
    })) : i.innerHTML = `<div class="info-card warn-card">\n            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="result-icon"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>\n            <span>${t.noOptions}</span>\n        </div>`
}
async function _confirmCrossPay(e, n, t, a) {
    haptic("selection");
    const o = state.language || "en",
        s = _payLabels(o),
        i = e => Number(e).toFixed(2).replace(/\.?0+$/, "");
    let r;
    try {
        const t = await fetch(`${CONFIG.apiUrl}/deals/${e}/pay-quotes`, {
            headers: {
                "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
            }
        });
        r = ((t.ok ? await t.json() : {
            quotes: []
        }).quotes || []).find(e => e.src_currency === n)
    } catch (e) {}
    if (!r)
        return void showNotification("ru" === o ? "Ошибка" : "Failed", "error");
    const l = document.createElement("div");
    l.className = "modal-overlay active",
    l.onclick = closeModalOnBackdrop,
    l.style.zIndex = 6e3,
    l.innerHTML = `\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">${s.confirmCross} ${r.src_currency}</h2>\n                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                </button>\n            </div>\n            <div class="modal-body">\n                <div class="info-card pay-summary">\n                    <div class="kv"><span class="kv-key">${s.rate}</span>\n                        <span class="kv-val">1 ${r.deal_currency} = ${Number(r.rate).toFixed(6).replace(/\.?0+$/, "")} ${r.src_currency}</span></div>\n                    <div class="kv"><span class="kv-key">${s.toPay}</span>\n                        <span class="kv-val">${i(r.src_amount)} ${r.src_currency}</span></div>\n                    <div class="kv"><span class="kv-key">${s.fee1}</span>\n                        <span class="kv-val">${i(r.src_fee - r.conv_fee)} ${r.src_currency}</span></div>\n                    <div class="kv"><span class="kv-key">${s.convFee}</span>\n                        <span class="kv-val">${i(r.conv_fee)} ${r.src_currency}</span></div>\n                    <div class="kv"><span class="kv-key">${s.willPay}</span>\n                        <span class="kv-val pay-total"><strong>${i(r.src_total)}</strong> ${r.src_currency}</span></div>\n                    <div class="kv"><span class="kv-key">${s.willReceive}</span>\n                        <span class="kv-val">${i(r.amount)} ${r.deal_currency}</span></div>\n                </div>\n                <div class="modal-actions">\n                    <button class="btn btn-secondary" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">${s.cancel}</button>\n                    <button class="btn btn-primary" id="cross-pay-go">${s.confirmCross}</button>\n                </div>\n            </div>\n        </div>\n    `,
    document.body.appendChild(l),
    l.querySelector("#cross-pay-go").addEventListener("click", async () => {
        haptic("medium");
        try {
            const t = await fetch(`${CONFIG.apiUrl}/deals/${e}/pay-with`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
                },
                body: JSON.stringify({
                    source_currency: n
                })
            });
            if (!t.ok) {
                let e = "";
                try {
                    e = (await t.json()).detail
                } catch (n) {
                    e = await t.text()
                }
                return haptic("error"), void showNotification(e || ("ru" === o ? "Ошибка" : "Failed"), "error")
            }
            haptic("success"),
            invalidateDealsCache && invalidateDealsCache();
            try {
                const e = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/balance`);
                if (e.ok) {
                    const n = await e.json();
                    state.user.balance = n.balance || {}
                }
            } catch (e) {}
            void 0 !== state.v && (state.v = null),
            void 0 !== state.$ && (state.$ = null),
            l.remove(),
            a && a.parentNode && a.remove(),
            await _renderOrderDetail()
        } catch (e) {
            haptic("error"),
            showNotification("ru" === o ? "Ошибка" : "Failed", "error")
        }
    })
}
async function showShareModal(e) {
    haptic("light");
    const n = state.language || "en",
        t = tL({
            ru: {
                failed: "Не удалось загрузить",
                share: "Поделиться",
                fwd: "Переслать в чат",
                copyTxt: "Скопировать текст",
                copyLink: "Скопировать ссылку"
            },
            en: {
                failed: "Failed to load",
                share: "Share",
                fwd: "Forward to chat",
                copyTxt: "Copy text",
                copyLink: "Copy link"
            },
            uk: {
                failed: "Не вдалося завантажити",
                share: "Поділитись",
                fwd: "Переслати в чат",
                copyTxt: "Копіювати текст",
                copyLink: "Копіювати посилання"
            },
            ar: {
                failed: "فشل التحميل",
                share: "مشاركة",
                fwd: "إعادة توجيه للمحادثة",
                copyTxt: "نسخ النص",
                copyLink: "نسخ الرابط"
            },
            zh: {
                failed: "加载失败",
                share: "分享",
                fwd: "转发到聊天",
                copyTxt: "复制文本",
                copyLink: "复制链接"
            }
        }),
        deeplink = _dealDeeplink(e);
    // Open modal instantly (no await) so the first tap always feels responsive.
    let a = {
        deal_tag: e,
        deeplink,
        text_plain: `${deeplink}\n\n🤝 Вас приглашают в сделку #${e}, Wertyxan`,
        text_html: `<a href="${deeplink}">${escapeHtml(deeplink)}</a><br><br><b>🤝 Вас приглашают в сделку #${escapeHtml(e)}, Wertyxan</b>`
    };
    const o = document.createElement("div");
    o.className = "modal-overlay active",
    o.onclick = closeModalOnBackdrop,
    o.innerHTML = `
        <div class="modal-content share-modal">
            <div class="modal-header">
                <h2 class="modal-title">${t.share} #${escapeHtml(e)}</h2>
                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()" aria-label="Close">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="share-preview">${a.text_html}</div>
            <div class="share-actions">
                <button type="button" class="btn btn-primary btn-block" data-share="forward">
                    <svg style="width:20px;height:20px;vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    ${t.fwd}
                </button>
                <button type="button" class="btn btn-secondary btn-block" data-share="copy">
                    <svg style="width:20px;height:20px;vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    ${t.copyTxt}
                </button>
                <button type="button" class="btn btn-secondary btn-block" data-share="copy_link">
                    <svg style="width:20px;height:20px;vertical-align:-4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    ${t.copyLink}
                </button>
            </div>
        </div>`;
    document.body.appendChild(o);
    const wire = () => {
        o.querySelectorAll("[data-share]").forEach(btn => {
            _bindInstantTap(btn, () => _handleShareAction(btn.dataset.share, a, o))
        })
    };
    wire();
    // Enrich from API in background (preview text), keep buttons working the whole time.
    try {
        const res = await apiFetch(`${CONFIG.apiUrl}/deals/${e}/share?lang=${n}`);
        if (res.ok) {
            const data = await res.json();
            if (data) {
                if (data.deeplink || data.url) a.deeplink = data.deeplink || data.url;
                a.text_plain = data.text_plain || a.text_plain;
                a.text_html = data.text_html || a.text_html;
                a.deal_tag = data.deal_tag || data.tag || e;
                const preview = o.querySelector(".share-preview");
                preview && (preview.innerHTML = a.text_html)
            }
        }
    } catch (err) {}
}
function _handleShareAction(e, n, t) {
    haptic("selection");
    const a = state.language || "en",
        o = (e, n, t, o, s) => _i18nPick(a, e, n, t, o, s);
    if ("forward" === e) {
        // MUST stay sync with the user gesture — never await before openTelegramLink.
        const text = (n.text_plain || "").replace(n.deeplink || "", "").trim(),
            url = `https://t.me/share/url?url=${encodeURIComponent(n.deeplink)}&text=${encodeURIComponent(text)}`;
        _openTgLink(url);
        try { closeTopModal() } catch (e) {}
        return
    }
    return "copy" === e ? (_copyToClip(n.text_plain), void showNotification(o("Текст скопирован", "Text copied"), "success")) : "copy_link" === e ? (_copyToClip(n.deeplink), void showNotification(o("Ссылка скопирована", "Link copied"), "success")) : void 0
}
function _copyToClip(e) {
    try {
        navigator.clipboard.writeText(e)
    } catch (n) {
        const t = document.createElement("textarea");
        t.value = e,
        t.style.position = "fixed",
        t.style.left = "-9999px",
        document.body.appendChild(t),
        t.select();
        try {
            document.execCommand("copy")
        } catch (e) {}
        t.remove()
    }
}
function _ensureTonConnectScript() {
    if (window.initTonConnect || document.querySelector('script[data-funpay-tonconnect]'))
        return Promise.resolve();
    return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "js/tonconnect.js?v=83";
        s.async = true;
        s.dataset.funpayTonconnect = "1";
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("tonconnect.js failed"));
        document.head.appendChild(s)
    })
}
async function renderWalletsPage() {
    const e = document.getElementById("wallets-page-template").content.cloneNode(!0);
    document.getElementById("page-container").appendChild(e),
    await loadWalletRequisites(),
    _ensureTonConnectScript().then(() => {
        "function" == typeof initTonConnect && initTonConnect().catch(() => {})
    }).catch(() => {}),
    setTimeout(() => {
        "function" == typeof updateWalletUI && updateWalletUI(state.user.ton_connect_wallet || null)
    }, 100),
    document.getElementById("deposit-btn").addEventListener("click", () => {
        haptic("light"),
        showDepositModal(localStorage.getItem("wallet_currency") || "TON")
    }),
    document.getElementById("withdraw-btn").addEventListener("click", () => {
        haptic("light");
        const e = localStorage.getItem("wallet_currency") || "TON";
        showWithdrawModal(e, state.user.balance?.[e] || 0)
    })
}
async function loadWalletRequisites() {
    const e = document.getElementById("wallet-requisites");
    try {
        const n = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}`),
            a = await n.json(),
            o = state.user.username || a.username,
            s = localStorage.getItem("wallet_currency") || "TON";
        e.innerHTML = `\n            <div class="info-card">\n                <h3 class="card-title" data-translate="wallets">${t("myWallets")}</h3>\n                <div id="wallet-details-container"></div>\n            </div>\n        `,
        renderCurrencyStrip(s, a, o),
        renderWalletDetails(s, a, o)
    } catch (n) {
        e.innerHTML = '<div class="error">Ошибка загрузки</div>'
    }
}
function renderCurrencyStrip(e, n, t) {
    const a = document.getElementById("wallet-currency-strip");
    if (!a)
        return;
    a.innerHTML = CONFIG.currencies.map(n => `\n        <button type="button" class="cur-chip ${n === e ? "active" : ""}"\n                role="tab" aria-selected="${n === e ? "true" : "false"}"\n                data-currency="${n}">\n            ${(e => window.FunpayIcons ? FunpayIcons.currencyIcon(e, 24) : `<span>${e}</span>`)(n)}\n            <span>${n}</span>\n        </button>\n    `).join(""),
    a.querySelectorAll(".cur-chip").forEach(e => {
        e.addEventListener("click", () => {
            const o = e.dataset.currency;
            haptic("selection"),
            a.querySelectorAll(".cur-chip").forEach(n => {
                n.classList.toggle("active", n === e),
                n.setAttribute("aria-selected", n === e ? "true" : "false")
            }),
            e.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            }),
            changeWalletCurrency(o, n, t)
        })
    });
    const o = a.querySelector(".cur-chip.active");
    o && o.scrollIntoView({
        inline: "center",
        block: "nearest"
    })
}
function renderWalletDetails(e, n, a) {
    const o = document.getElementById("wallet-details-container");
    if ("TON" === e)
        o.innerHTML = `\n            <div class="requisite-group">\n                <div class="requisite-header">\n                    <span class="requisite-label" data-translate="tonWallet">${t("tonWallet")}</span>\n                </div>\n                <div id="ton-wallet-container">\n                    <div id="ton-connect-button"></div>\n                </div>\n            </div>\n        `,
        setTimeout(() => {
            "function" == typeof updateWalletUI && updateWalletUI(state.user.ton_connect_wallet || null)
        }, 100);
    else if ("USDT" === e) {
        const e = n.requisites || {},
            a = (state.language, [{
                id: "trc20",
                label: "TRC20",
                key: "usdt_trc20"
            }, {
                id: "bep20",
                label: "BEP20",
                key: "usdt_bep20"
            }, {
                id: "ton",
                label: "USDT (TON)",
                key: "usdt_ton"
            }]);
        o.innerHTML = a.map(n => {
            const a = (e[n.key] || "").trim(),
                o = a ? `${a.slice(0, 6)}…${a.slice(-6)}` : "";
            return `\n            <div class="requisite-group">\n                <div class="requisite-header">\n                    <span class="requisite-label">${n.label}</span>\n                    <button class="btn-icon" type="button" onclick="editUsdtNetwork('${n.id}')" aria-label="${t("editLabel")}">\n                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>\n                    </button>\n                </div>\n                <span class="requisite-value ${a ? "" : "placeholder"}">\n                    ${a ? o : t("notBoundLabel")}\n                </span>\n                ${a ? `<button class="btn btn-secondary btn-sm copy-btn" type="button" data-clip="${escapeHtml(a)}" style="margin-top:6px">\n                    ${t("copyLabel")}\n                </button>` : ""}\n            </div>`
        }).join("")
    } else if ("STARS" === e)
        o.innerHTML = `\n            <div class="requisite-group">\n                <div class="requisite-header">\n                    <span class="requisite-label">⭐ Telegram Stars</span>\n                    <button class="btn-icon" onclick="editStarsUsername()">\n                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>\n                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>\n                        </svg>\n                    </button>\n                </div>\n                <span class="requisite-value ${a ? "" : "warning"}">\n                    ${a ? "@" + a : "⚠️ Username не установлен в Telegram"}\n                </span>\n            </div>\n        `;
    else {
        const a = n.card || "";
        o.innerHTML = `\n            <div class="requisite-group">\n                <div class="requisite-header">\n                    <span class="requisite-label">\n                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 6px;">\n                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>\n                            <line x1="1" y1="10" x2="23" y2="10"></line>\n                        </svg>\n                        Банковская карта для ${e}\n                    </span>\n                    <button class="btn-icon" onclick="editCard()">\n                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>\n                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>\n                        </svg>\n                    </button>\n                </div>\n                <span class="requisite-value">${a ? escapeHtml(a) : t("notSpecified")}</span>\n                ${a ? `\n                    <button class="btn btn-secondary btn-sm copy-btn" data-clip="${escapeHtml(a)}" style="margin-top: 8px;">\n                        Копировать номер\n                    </button>\n                ` : ""}\n            </div>\n        `
    }
}
function changeWalletCurrency(e, n, t) {
    localStorage.setItem("wallet_currency", e),
    n ? renderWalletDetails(e, n, t || state.user.username || n.username) : loadWalletRequisites()
}
function editCard() {
    haptic("light");
    const e = state.user.card || "",
        n = document.createElement("div");
    n.className = "modal-overlay active",
    n.onclick = closeModalOnBackdrop,
    n.innerHTML = `\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">Банковская карта</h2>\n                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                        <path d="M18 6L6 18M6 6l12 12"/>\n                    </svg>\n                </button>\n            </div>\n            <div class="modal-body">\n                <div class="form-group">\n                    <label>Номер карты</label>\n                    <input type="text" id="card-input" class="form-control" placeholder="0000 0000 0000 0000" value="${e}" maxlength="19">\n                </div>\n                <button class="btn btn-primary btn-block" onclick="saveCard()" style="margin-top: 16px;">\n                    Сохранить\n                </button>\n            </div>\n        </div>\n    `,
    document.body.appendChild(n),
    setTimeout(() => {
        const e = document.getElementById("card-input");
        e.focus(),
        e.addEventListener("input", e => _formatCardWithCaret(e.target))
    }, 100)
}
async function saveCard() {
    haptic("medium");
    const e = document.getElementById("card-input").value.replace(/\s/g, "");
    if (e && e.length < 16)
        showNotification(t("nInvalidCard"), "error");
    else
        try {
            const n = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/card`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        details: e
                    })
                }),
                a = await n.json();
            a.success ? (state.user.card = e, closeTopModal(), showNotification(t("nCardSaved"), "success"), loadWalletRequisites()) : showNotification(a.error || t("nSaveError"), "error")
        } catch (e) {
            showNotification(t("nSaveError"), "error")
        }
}
function editUSDTAddress() {
    haptic("light");
    const e = state.user.usdt_address || "",
        n = document.createElement("div");
    n.className = "modal-overlay active",
    n.onclick = closeModalOnBackdrop,
    n.innerHTML = `\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">USDT TRC20 Адрес</h2>\n                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                        <path d="M18 6L6 18M6 6l12 12"/>\n                    </svg>\n                </button>\n            </div>\n            <div class="modal-body">\n                <div class="form-group">\n                    <label>Адрес кошелька</label>\n                    <input type="text" id="usdt-address-input" class="form-control" placeholder="T..." value="${e}">\n                    <small class="form-text">Только TRC20 (Tron)</small>\n                </div>\n                <button class="btn btn-primary btn-block" onclick="saveUSDTAddress()" style="margin-top: 16px;">\n                    Сохранить\n                </button>\n            </div>\n        </div>\n    `,
    document.body.appendChild(n),
    setTimeout(() => {
        document.getElementById("usdt-address-input").focus()
    }, 100)
}
async function saveUSDTAddress() {
    haptic("medium");
    const e = document.getElementById("usdt-address-input").value.trim();
    if (!e || e.startsWith("T"))
        try {
            const n = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/usdt-address`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        usdt_address: e
                    })
                }),
                a = await n.json();
            a.success ? (state.user.usdt_address = e, closeTopModal(), showNotification(t("nAddressSaved"), "success"), loadWalletRequisites()) : showNotification(a.error || t("nSaveError"), "error")
        } catch (e) {
            showNotification(t("nSaveError"), "error")
        }
    else
        showNotification(t("nTrc20MustStartT"), "error")
}
function editStarsUsername() {
    showNotification(t("nTelegramUsernameInfo"), "warning")
}
function selectStarsRecipient(e) {
    haptic("light"),
    window.starsRecipientType = e;
    const n = document.getElementById("stars-recipient-self"),
        t = document.getElementById("stars-recipient-other");
    n && n.classList.toggle("active", "self" === e),
    t && t.classList.toggle("active", "self" !== e);
    const a = !!window.starsCurrentUsername,
        o = document.getElementById("stars-self-callout"),
        s = document.getElementById("stars-self-no-username");
    o && (o.style.display = "self" === e && a ? "" : "none"),
    s && (s.style.display = "self" !== e || a ? "none" : "");
    const i = document.getElementById("stars-username-group");
    if (i) {
        const n = "self" !== e || "self" === e && !a;
        i.style.display = n ? "block" : "none"
    }
    "self" !== e && setTimeout(() => {
        const e = document.getElementById("withdraw-username-input");
        e && e.focus()
    }, 100)
}
function renderProfilePage() {
    const e = document.getElementById("profile-page-template").content.cloneNode(!0);
    document.getElementById("page-container").appendChild(e);
    const n = window.state && state.user || {},
        t = document.getElementById("profile-avatar-initial"),
        a = document.getElementById("profile-name"),
        o = document.getElementById("profile-username");
    if (t) {
        const e = (n.first_name || n.username || "?").toString().trim();
        t.textContent = (e.charAt(0) || "?").toUpperCase()
    }
    if (a) {
        const e = `${n.first_name || ""} ${n.last_name || ""}`.trim();
        a.textContent = e || (n.username ? `@${n.username}` : "—")
    }
    o && (o.textContent = n.username ? `@${n.username}` : ""),
    setTimeout(() => {
        const e = document.querySelector('[onclick="showTransactionsPage()"]'),
            n = document.getElementById("language-btn");
        e && (e.onclick = e => {
            e.preventDefault(),
            showTransactionsPage()
        }),
        n && (n.onclick = e => {
            e.preventDefault(),
            showLanguageSelector()
        })
    }, 0),
    loadProfileData(),
    maybeMountAdminCard(),
    maybeMountOwnerCard()
}
async function maybeMountAdminCard() {
    try {
        const e = {
                "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
            },
            n = await fetch(`${CONFIG.apiUrl}/admin/me`, {
                headers: e
            });
        if (!n.ok)
            return;
        if (!(await n.json()).is_admin)
            return;
        const t = await fetch(`${CONFIG.apiUrl}/admin/stats`, {
                headers: e
            }),
            a = t.ok ? await t.json() : {
                trading_volume: {},
                deal_counts: {}
            },
            o = state.language || "en",
            s = Number(a.trading_volume_usd || 0),
            i = e => "$" + e.toLocaleString(_intlLocale(o), {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }),
            r = a.deal_counts || {},
            l = _adminLabels(o),
            c = document.createElement("div");
        c.className = "info-card admin-card",
        c.innerHTML = `\n            <h3 class="card-title">${l.title}</h3>\n            <div class="kv">\n                <span class="kv-key">${l.successfulDeals}</span>\n                <span class="kv-val">${r.active || 0}</span>\n            </div>\n            <div class="kv">\n                <span class="kv-key">${l.completed}</span>\n                <span class="kv-val">${r.completed || 0}</span>\n            </div>\n            <div class="kv">\n                <span class="kv-key">${l.cancelled}</span>\n                <span class="kv-val">${r.cancelled || 0}</span>\n            </div>\n            <div class="kv">\n                <span class="kv-key">${l.total}</span>\n                <span class="kv-val">${r.total || 0}</span>\n            </div>\n            <h4 class="kv-section-title">${l.tradingVolume}</h4>\n            <div class="kv">\n                <span class="kv-key">${l.tradingVolume}</span>\n                <span class="kv-val"><strong>${i(s)}</strong></span>\n            </div>\n            <div class="action-stack" style="margin-top:14px">\n                <button class="btn btn-primary btn-block" id="admin-credit-self">\n                    ${l.topupBalance}\n                </button>\n                <button class="btn btn-secondary btn-block" id="admin-volume-set">\n                    ${l.editVolume}\n                </button>\n                <button class="btn btn-secondary btn-block" id="admin-counts-set">\n                    ${l.editCounts}\n                </button>\n            </div>\n        `;
        const d = document.querySelector(".profile-page .page-content");
        d && d.appendChild(c);
        const p = document.getElementById("admin-credit-self");
        p && p.addEventListener("click", () => showAdminCreditModal());
        const u = document.getElementById("admin-volume-set");
        u && u.addEventListener("click", () => showAdminVolumeModal(s));
        const h = document.getElementById("admin-counts-set");
        h && h.addEventListener("click", () => showAdminCountsModal(r))
    } catch (e) {}
}
function _adminLabels(e) {
    const n = {
        ru: {
            title: "Воркер-панель",
            successfulDeals: "Успешных сделок",
            activeDeals: "Успешных сделок",
            completed: "Завершённых",
            cancelled: "Отменённых",
            total: "Всего",
            tradingVolume: "Торговый оборот",
            topupBalance: "Пополнить свой баланс",
            editVolume: "Изменить торговый оборот",
            editCounts: "Изменить счётчики сделок",
            countsTitle: "Счётчики сделок",
            countsHelp: "Поставьте число вручную для любого счётчика. Пустое поле → значение считается автоматически из реальных сделок.",
            amount: "Сумма",
            modalTitle: "Торговый оборот",
            save: "Сохранить",
            cancel: "Отменить",
            help: "Укажите торговый оборот в долларах США. Это значение будет показано в воркер-панели.",
            negative: "Сумма не может быть отрицательной",
            set: "Сохранено",
            topupTitle: "Пополнение",
            currency: "Валюта",
            topup: "Пополнить",
            invalidAmount: "Введите корректную сумму",
            success: "Зачислено"
        },
        en: {
            title: "Worker panel",
            successfulDeals: "Successful deals",
            activeDeals: "Successful deals",
            completed: "Completed",
            cancelled: "Cancelled",
            total: "Total",
            tradingVolume: "Trading volume",
            topupBalance: "Top up own balance",
            editVolume: "Set trading volume",
            editCounts: "Edit deal counters",
            countsTitle: "Deal counters",
            countsHelp: "Set a fixed number for any counter. Leave blank to use the real auto-counted value.",
            amount: "Amount",
            modalTitle: "Trading volume",
            save: "Save",
            cancel: "Cancel",
            help: "Set the trading volume in US dollars. This is the value shown on the worker card.",
            negative: "Amount must be ≥ 0",
            set: "Saved",
            topupTitle: "Top-up",
            currency: "Currency",
            topup: "Top up",
            invalidAmount: "Enter a valid amount",
            success: "Credited"
        },
        uk: {
            title: "Воркер-панель",
            successfulDeals: "Успішних угод",
            activeDeals: "Успішних угод",
            completed: "Завершених",
            cancelled: "Скасованих",
            total: "Усього",
            tradingVolume: "Торговий оборот",
            topupBalance: "Поповнити свій баланс",
            editVolume: "Змінити торговий оборот",
            editCounts: "Редагувати лічильники угод",
            countsTitle: "Лічильники угод",
            countsHelp: "Поставте число вручну для будь-якого лічильника. Порожнє поле → значення обчислюється автоматично.",
            amount: "Сума",
            modalTitle: "Торговий оборот",
            save: "Зберегти",
            cancel: "Скасувати",
            help: "Вкажіть торговий оборот у доларах США. Це значення буде показано в адмін-картці.",
            negative: "Сума не може бути від'ємною",
            set: "Збережено",
            topupTitle: "Поповнення",
            currency: "Валюта",
            topup: "Поповнити",
            invalidAmount: "Введіть коректну суму",
            success: "Зараховано"
        },
        ar: {
            title: "لوحة العامل",
            successfulDeals: "الصفقات الناجحة",
            activeDeals: "الصفقات الناجحة",
            completed: "المكتملة",
            cancelled: "الملغاة",
            total: "الإجمالي",
            tradingVolume: "حجم التداول",
            topupBalance: "شحن رصيدي",
            editVolume: "تعديل حجم التداول",
            editCounts: "تعديل عدادات الصفقات",
            countsTitle: "عدادات الصفقات",
            countsHelp: "حدد رقمًا يدويًا لأي عداد. اتركه فارغًا للاحتساب التلقائي.",
            amount: "المبلغ",
            modalTitle: "حجم التداول",
            save: "حفظ",
            cancel: "إلغاء",
            help: "حدد حجم التداول بالدولار الأمريكي. هذه القيمة هي المعروضة في بطاقة الإدارة.",
            negative: "يجب أن يكون المبلغ ≥ 0",
            set: "تم الحفظ",
            topupTitle: "الشحن",
            currency: "العملة",
            topup: "شحن",
            invalidAmount: "أدخل مبلغًا صحيحًا",
            success: "تم الإيداع"
        },
        zh: {
            title: "工作者面板",
            successfulDeals: "成功交易",
            activeDeals: "成功交易",
            completed: "已完成",
            cancelled: "已取消",
            total: "总计",
            tradingVolume: "交易量",
            topupBalance: "充值自有余额",
            editVolume: "修改交易量",
            editCounts: "编辑交易计数器",
            countsTitle: "交易计数器",
            countsHelp: "为任何计数器手动设置一个数字。留空将按实际交易自动计算。",
            amount: "金额",
            modalTitle: "交易量",
            save: "保存",
            cancel: "取消",
            help: "以美元设置交易量。该值将显示在管理面板上。",
            negative: "金额必须 ≥ 0",
            set: "已保存",
            topupTitle: "充值",
            currency: "币种",
            topup: "充值",
            invalidAmount: "请输入有效金额",
            success: "已入账"
        }
    };
    return n[e] || n.en
}
function showAdminVolumeModal(e) {
    haptic("light");
    const n = state.language || "en",
        t = _adminLabels(n),
        a = Number(e || 0),
        o = document.createElement("div");
    o.className = "modal-overlay active",
    o.onclick = closeModalOnBackdrop,
    o.innerHTML = `\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">${t.modalTitle}</h2>\n                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                </button>\n            </div>\n            <div class="modal-body">\n                <p style="font-size:13px;color:var(--text-secondary);margin:-4px 0 14px;line-height:1.45">\n                    ${t.help}\n                </p>\n                <div class="form-group">\n                    <label>${t.amount} (USD)</label>\n                    <div style="position:relative">\n                        <span style="position:absolute;inset-inline-start:14px;top:50%;transform:translateY(-50%);color:var(--text-secondary);font-weight:600">$</span>\n                        <input type="number" id="vol-amt" class="form-control"\n                               min="0" step="0.01" value="${a}"\n                               style="padding-inline-start:28px"\n                               inputmode="decimal" autocomplete="off">\n                    </div>\n                </div>\n                <div class="modal-actions">\n                    <button class="btn btn-secondary" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">${t.cancel}</button>\n                    <button class="btn btn-primary" id="vol-save">${t.save}</button>\n                </div>\n            </div>\n        </div>\n    `,
    document.body.appendChild(o);
    const s = o.querySelector("#vol-amt");
    setTimeout(() => s.focus(), 80),
    o.querySelector("#vol-save").addEventListener("click", async () => {
        haptic("medium");
        const e = parseFloat(s.value) || 0;
        if (e < 0)
            showNotification(t.negative, "error");
        else
            try {
                const n = await fetch(`${CONFIG.apiUrl}/admin/volume-override`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
                    },
                    body: JSON.stringify({
                        value: e
                    })
                });
                if (!n.ok)
                    throw new Error(await n.text());
                haptic("success"),
                showNotification(t.set, "success");
                const a = document.querySelector(".admin-card");
                a && a.remove(),
                "function" == typeof maybeMountAdminCard && maybeMountAdminCard(),
                closeTopModal()
            } catch (e) {
                haptic("error"),
                showNotification((window.state && state.language || "en") === "ru" ? "Ошибка" : "Failed", "error")
            }
    })
}
function showAdminCountsModal(e) {
    haptic("light");
    const n = _adminLabels(window.state && state.language || "en"),
        a = e || {},
        o = document.createElement("div");
    o.className = "modal-overlay active",
    o.onclick = closeModalOnBackdrop;
    const s = (e, n, t) => `\n        <div class="form-group">\n            <label for="cnt-${e}">${n}</label>\n            <input type="number" id="cnt-${e}" class="form-control"\n                   min="0" step="1" value="${Number(t) || 0}"\n                   placeholder="auto"\n                   inputmode="numeric" autocomplete="off">\n        </div>\n    `;
    o.innerHTML = `\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">${n.countsTitle}</h2>\n                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                </button>\n            </div>\n            <div class="modal-body">\n                <p style="font-size:13px;color:var(--text-secondary);margin:-4px 0 14px;line-height:1.45">\n                    ${n.countsHelp}\n                </p>\n                ${s("successful", n.successfulDeals, a.active)}\n                ${s("completed", n.completed, a.completed)}\n                ${s("cancelled", n.cancelled, a.cancelled)}\n                ${s("total", n.total, a.total)}\n                <div class="modal-actions">\n                    <button class="btn btn-secondary" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">${n.cancel}</button>\n                    <button class="btn btn-primary" id="cnt-save">${n.save}</button>\n                </div>\n            </div>\n        </div>\n    `,
    document.body.appendChild(o),
    setTimeout(() => o.querySelector("#cnt-successful").focus(), 80),
    o.querySelector("#cnt-save").addEventListener("click", async () => {
        haptic("medium");
        const e = e => {
            const n = o.querySelector(`#cnt-${e}`);
            if (!n)
                return -1;
            const t = n.value.trim();
            if ("" === t)
                return -1;
            const a = parseInt(t, 10);
            return !Number.isFinite(a) || a < 0 ? -1 : a
        };
        try {
            const t = await fetch(`${CONFIG.apiUrl}/admin/deal-counts-override`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
                },
                body: JSON.stringify({
                    active: getCount("successful"),
                    completed: getCount("completed"),
                    cancelled: getCount("cancelled"),
                    total: getCount("total")
                })
            });
            if (!t.ok)
                throw new Error(await t.text());
            haptic("success"),
            showNotification(n.set, "success");
            const a = document.querySelector(".admin-card");
            a && a.remove(),
            "function" == typeof maybeMountAdminCard && maybeMountAdminCard(),
            "function" == typeof loadOrdersStats && loadOrdersStats(),
            closeTopModal()
        } catch (e) {
            haptic("error"),
            showNotification((window.state && state.language || "en") === "ru" ? "Ошибка" : "Failed", "error")
        }
    })
}
function showAdminCreditModal() {
    haptic("light");
    const e = state.language || "en",
        n = _adminLabels(e),
        t = document.createElement("div");
    t.className = "modal-overlay active",
    t.innerHTML = `\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">${n.topupTitle}</h2>\n                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                </button>\n            </div>\n            <div class="modal-body">\n                <div class="form-group">\n                    <label>${n.currency}</label>\n                    <select id="admin-credit-cur" class="form-control">\n                        ${["TON", "USDT", "STARS", "RUB", "USD", "EUR", "GBP", "CNY", "JPY", "TRY", "UAH", "KZT", "BTC", "ETH"].map(e => `<option value="${e}">${e}</option>`).join("")}\n                    </select>\n                </div>\n                <div class="form-group">\n                    <label>${n.amount}</label>\n                    <input type="number" id="admin-credit-amt" class="form-control" min="0.01" step="0.01" value="67">\n                </div>\n                <div class="modal-actions">\n                    <button class="btn btn-secondary" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                        ${n.cancel}\n                    </button>\n                    <button class="btn btn-primary" id="admin-credit-go">\n                        ${n.topup}\n                    </button>\n                </div>\n            </div>\n        </div>\n    `,
    document.body.appendChild(t),
    t.querySelector("#admin-credit-go").addEventListener("click", async () => {
        const a = t.querySelector("#admin-credit-cur").value,
            o = parseFloat(t.querySelector("#admin-credit-amt").value);
        if (!o || o <= 0)
            showNotification(n.invalidAmount, "error");
        else {
            haptic("medium");
            try {
                const e = await fetch(`${CONFIG.apiUrl}/admin/credit-self`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
                    },
                    body: JSON.stringify({
                        currency: a,
                        amount: o
                    })
                });
                if (!e.ok) {
                    let detail = "";
                    try {
                        const j = await e.json();
                        detail = (j && (j.detail || j.message)) || "";
                        if (detail && typeof detail === "object")
                            detail = detail.message || detail.code || JSON.stringify(detail);
                    } catch (err) {
                        try { detail = await e.text() } catch (e2) {}
                    }
                    throw new Error(detail || ("HTTP " + e.status));
                }
                const t = await e.json();
                haptic("success"),
                showNotification(`${n.success}: ${o} ${a}`, "success"),
                state.user.balance = state.user.balance || {},
                state.user.balance[a] = (t.balances && t.balances[a] != null) ? t.balances[a] : t.balance,
                closeTopModal(),
                "profile" === state.currentPage && "function" == typeof loadProfileData && loadProfileData()
            } catch (err) {
                haptic("error"),
                showNotification(String(err && err.message || ("ru" === e ? "Ошибка" : "Failed")), "error")
            }
        }
    })
}
window._lockBodyScroll = _lockBodyScroll,
window._unlockBodyScroll = _unlockBodyScroll,
window.showOrderDetails = showOrderDetails,
window.closeOrderDetails = closeOrderDetails,
window._formatCardWithCaret = _formatCardWithCaret,
window._i18nPick = _i18nPick,
window.resolveRoles = resolveRoles,
window.tgUserLink = tgUserLink,
window.formatUserHandle = formatUserHandle,
"function" == typeof addTranslations && addTranslations({
    dealTakenTitle: {
        ru: "Сделка занята",
        en: "Deal taken",
        uk: "Угода зайнята",
        ar: "الصفقة مأخوذة",
        zh: "交易已被接受"
    },
    dealTakenLine1: {
        ru: e => `Сделка #${e}`,
        en: e => `Deal #${e}`,
        uk: e => `Угода #${e}`,
        ar: e => `الصفقة #${e}`,
        zh: e => `交易 #${e}`
    },
    dealTakenLine2: {
        ru: "К этой сделке уже присоединился другой покупатель.",
        en: "Another buyer has already joined this deal.",
        uk: "До цієї угоди вже приєднався інший покупець.",
        ar: "انضم مشترٍ آخر إلى هذه الصفقة بالفعل.",
        zh: "另一位买家已经加入此交易。"
    },
    dealTakenLine3: {
        ru: "Попросите продавца создать новую сделку или напишите в банк.",
        en: "Ask the seller to create a new deal or contact Funpay Bank.",
        uk: "Попросіть продавця створити нову угоду або напишіть у банк.",
        ar: "اطلب من البائع إنشاء صفقة جديدة أو راسل المدير.",
        zh: "请让卖家创建新交易或联系经理。"
    }
}),
window.showDealTakenModal = showDealTakenModal,
window.showOwnDealModal = showOwnDealModal,
window.editUsdtNetwork = editUsdtNetwork,
window._actionLabels = _actionLabels,
window._intlLocale = _intlLocale,
window._detailLabels = _detailLabels,
window._renderStageGuide = _renderStageGuide,
window._confirmLabels = _confirmLabels,
window.showHandoverConfirmModal = showHandoverConfirmModal,
window._payLabels = _payLabels,
window.showCrossPayModal = showCrossPayModal,
window.showShareModal = showShareModal,
window._adminLabels = _adminLabels,
window.showAdminCountsModal = showAdminCountsModal,
window.showAdminVolumeModal = showAdminVolumeModal,
window.showAdminCreditModal = showAdminCreditModal;
const _MI_PATHS = {
    settings: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z",
    lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z",
    group: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
    campaign: "M3 9v6c0 .55.45 1 1 1h1l1.29 4.5c.1.31.4.5.71.5h2c.32 0 .62-.19.71-.5L11 16h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H4c-.55 0-1 .45-1 1zm14-.5v6.94c0 .39.44.61.74.36.93-.77 1.52-1.93 1.52-3.3 0-1.37-.59-2.53-1.52-3.3-.3-.25-.74-.04-.74.3z",
    close: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
    add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    delete: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
    check: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    send: "M2.01 21 23 12 2.01 3 2 10l15 2-15 2z",
    check_circle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    warning: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
    content_copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
    local_offer: "m21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM13 20.01 4 11V4h7v-.01l9 9-7 7.02zM6.5 5C5.67 5 5 5.67 5 6.5S5.67 8 6.5 8 8 7.33 8 6.5 7.33 5 6.5 5z",
    paid: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.88 14.28V18h-1.75v-1.74c-1.1-.23-2.05-.94-2.12-2.18h1.28c.07.66.53 1.17 1.72 1.17 1.27 0 1.56-.63 1.56-1.03 0-.54-.29-1.04-1.73-1.39-1.61-.39-2.71-1.05-2.71-2.39 0-1.12.9-1.85 2.02-2.09V7h1.75v1.76c1.21.29 1.82 1.21 1.86 2.21h-1.27c-.03-.7-.4-1.17-1.36-1.17-.96 0-1.49.34-1.49.91 0 .51.39.84 1.72 1.18 1.33.34 2.72.91 2.72 2.6-.01 1.18-.89 1.84-2 2.04z",
    block: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.55-.63-4.9-1.69L18.31 6.9C19.37 8.25 20 9.95 20 12c0 4.42-3.58 8-8 8zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12z",
    error: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
    restart_alt: "M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.97 20 14.54 20 13c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 8.74C4.46 10.03 4 11.46 4 13c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
};
function _mi(e, n) {
    const t = n || 20;
    return `<svg class="mi" viewBox="0 0 24 24" width="${t}" height="${t}" fill="currentColor" aria-hidden="true"><path d="${_MI_PATHS[e] || ""}"/></svg>`
}
function _ownerLabels(e) {
    const n = {
        ru: {
            title: "Админ-панель",
            botSettings: "Настройки бота",
            editSettings: "Изменить настройки",
            logsChannel: "Канал логов",
            escrowUsername: "Юзернейм эскроу",
            bannerUrl: "Баннер меню",
            tonAddr: "TON адрес",
            usdtAddr: "USDT адрес",
            escrow: "Эскроу-аккаунты",
            escrowActive: "Активный",
            escrowEmpty: "Нет аккаунтов",
            setActive: "Сделать активным",
            remove: "Удалить",
            whitelist: "Воркеры",
            whitelistEmpty: "Нет воркеров",
            addAdmin: "Добавить воркера",
            removeAdmin: "Снять",
            broadcast: "Рассылка",
            broadcastTarget: "Получатели",
            targetAll: "Все пользователи",
            targetAdmins: "Только воркеры",
            broadcastText: "Текст сообщения",
            broadcastSend: "Отправить",
            broadcastHint: "HTML поддерживается. До 4000 символов.",
            recipients: "получателей",
            save: "Сохранить",
            cancel: "Отмена",
            close: "Закрыть",
            userIdLabel: "ID пользователя",
            confirm: "Подтвердить",
            sent: "Отправлено",
            failed: "Ошибок",
            total: "Всего",
            addOk: "Добавлено",
            removed: "Удалено",
            saveOk: "Сохранено",
            error: "Ошибка",
            sending: "Отправляем…",
            required: "Заполните поле",
            invalidId: "Некорректный ID",
            bans: "Баны",
            bansEmpty: "Никто не забанен",
            banAdd: "Забанить",
            banReason: "Причина (необязательно)",
            banReasonPh: "Например: спам в чате",
            banConfirm: "Подтвердить бан",
            unban: "Разбан",
            banOk: "Забанен",
            unbanOk: "Разбанен",
            banNotFound: "Пользователь не найден",
            balances: "Балансы",
            setBalance: "Выставить баланс",
            balanceUser: "ID или @username",
            balanceAmount: "Сумма",
            balanceCurrency: "Валюта",
            balanceSave: "Сохранить баланс",
            balanceOk: "Баланс обновлён",
            zeroBalance: "Обнулить баланс",
            zeroBalanceOk: "Баланс обнулён",
            dealTools: "Сделки",
            cancelDeal: "Отменить сделку",
            payDeal: "Оплатить сделку",
            dealTag: "Тег сделки",
            dealCancelOk: "Сделка отменена",
            dealPayOk: "Сделка оплачена",
            statsUsers: "Пользователи",
            statsWorkers: "Воркеры",
            statsBanned: "Баны",
            statsDeals: "Сделки"
        },
        en: {
            title: "Admin panel",
            botSettings: "Bot settings",
            editSettings: "Edit settings",
            logsChannel: "Logs channel",
            escrowUsername: "Escrow username",
            bannerUrl: "Menu banner",
            tonAddr: "TON address",
            usdtAddr: "USDT address",
            escrow: "Escrow accounts",
            escrowActive: "Active",
            escrowEmpty: "No accounts",
            setActive: "Set active",
            remove: "Remove",
            whitelist: "Workers",
            whitelistEmpty: "No workers",
            addAdmin: "Add worker",
            removeAdmin: "Remove",
            broadcast: "Broadcast",
            broadcastTarget: "Recipients",
            targetAll: "All users",
            targetAdmins: "Workers only",
            broadcastText: "Message text",
            broadcastSend: "Send",
            broadcastHint: "HTML supported. Up to 4000 chars.",
            recipients: "recipients",
            save: "Save",
            cancel: "Cancel",
            close: "Close",
            userIdLabel: "User ID",
            confirm: "Confirm",
            sent: "Sent",
            failed: "Failed",
            total: "Total",
            addOk: "Added",
            removed: "Removed",
            saveOk: "Saved",
            error: "Failed",
            sending: "Sending…",
            required: "Fill the field",
            invalidId: "Invalid user ID",
            bans: "Bans",
            bansEmpty: "Nobody banned",
            banAdd: "Ban user",
            banReason: "Reason (optional)",
            banReasonPh: "e.g. spam in chat",
            banConfirm: "Confirm ban",
            unban: "Unban",
            banOk: "Banned",
            unbanOk: "Unbanned",
            banNotFound: "User not found",
            balances: "Balances",
            setBalance: "Set balance",
            balanceUser: "ID or @username",
            balanceAmount: "Amount",
            balanceCurrency: "Currency",
            balanceSave: "Save balance",
            balanceOk: "Balance updated",
            zeroBalance: "Zero balance",
            zeroBalanceOk: "Balance cleared",
            dealTools: "Deals",
            cancelDeal: "Cancel deal",
            payDeal: "Pay deal",
            dealTag: "Deal tag",
            dealCancelOk: "Deal cancelled",
            dealPayOk: "Deal paid",
            statsUsers: "Users",
            statsWorkers: "Workers",
            statsBanned: "Bans",
            statsDeals: "Deals"
        },
        uk: {
            title: "Адмін-панель",
            botSettings: "Налаштування бота",
            editSettings: "Редагувати",
            logsChannel: "Канал логів",
            escrowUsername: "Юзернейм ескроу",
            bannerUrl: "Банер меню",
            tonAddr: "TON адреса",
            usdtAddr: "USDT адреса",
            escrow: "Ескроу-акаунти",
            escrowActive: "Активний",
            escrowEmpty: "Немає акаунтів",
            setActive: "Зробити активним",
            remove: "Видалити",
            whitelist: "Воркери",
            whitelistEmpty: "Немає воркерів",
            addAdmin: "Додати воркера",
            removeAdmin: "Видалити",
            broadcast: "Розсилка",
            broadcastTarget: "Отримувачі",
            targetAll: "Усі користувачі",
            targetAdmins: "Тільки воркери",
            broadcastText: "Текст повідомлення",
            broadcastSend: "Надіслати",
            broadcastHint: "HTML підтримується. До 4000 символів.",
            recipients: "отримувачів",
            save: "Зберегти",
            cancel: "Скасувати",
            close: "Закрити",
            userIdLabel: "ID користувача",
            confirm: "Підтвердити",
            sent: "Надіслано",
            failed: "Помилок",
            total: "Усього",
            addOk: "Додано",
            removed: "Видалено",
            saveOk: "Збережено",
            error: "Помилка",
            sending: "Надсилаємо…",
            required: "Заповніть поле",
            invalidId: "Некоректний ID",
            bans: "Бан-лист",
            bansEmpty: "Нікого не забанено",
            banAdd: "Забанити",
            banReason: "Причина (необовʼязково)",
            banReasonPh: "Напр. спам у чаті",
            banConfirm: "Підтвердити бан",
            unban: "Розбан",
            banOk: "Забанено",
            unbanOk: "Розбанено",
            banNotFound: "Користувача не знайдено",
            balances: "Баланси",
            setBalance: "Виставити баланс",
            balanceUser: "ID або @username",
            balanceAmount: "Сума",
            balanceCurrency: "Валюта",
            balanceSave: "Зберегти баланс",
            balanceOk: "Баланс оновлено",
            statsUsers: "Користувачі",
            statsWorkers: "Воркери",
            statsBanned: "Бани",
            statsDeals: "Угоди"
        },
        ar: {
            title: "لوحة الإدارة",
            botSettings: "إعدادات البوت",
            editSettings: "تعديل",
            logsChannel: "قناة السجلات",
            escrowUsername: "يوزرنيم الإسكرو",
            bannerUrl: "صورة القائمة",
            tonAddr: "عنوان TON",
            usdtAddr: "عنوان USDT",
            escrow: "حسابات الإسكرو",
            escrowActive: "النشط",
            escrowEmpty: "لا توجد حسابات",
            setActive: "تفعيل",
            remove: "حذف",
            whitelist: "العاملون",
            whitelistEmpty: "فارغ",
            addAdmin: "إضافة عامل",
            removeAdmin: "إزالة",
            broadcast: "بث",
            broadcastTarget: "المستلمون",
            targetAll: "كل المستخدمين",
            targetAdmins: "العاملون فقط",
            broadcastText: "نص الرسالة",
            broadcastSend: "إرسال",
            broadcastHint: "HTML مدعوم. حتى 4000 حرف.",
            recipients: "مستلمين",
            save: "حفظ",
            cancel: "إلغاء",
            close: "إغلاق",
            userIdLabel: "معرف المستخدم",
            confirm: "تأكيد",
            sent: "تم الإرسال",
            failed: "فشل",
            total: "الإجمالي",
            addOk: "تمت الإضافة",
            removed: "تمت الإزالة",
            saveOk: "تم الحفظ",
            error: "فشل",
            sending: "جاري الإرسال…",
            required: "املأ الحقل",
            invalidId: "معرف غير صالح",
            bans: "قائمة الحظر",
            bansEmpty: "لا يوجد محظورون",
            banAdd: "حظر مستخدم",
            banReason: "السبب (اختياري)",
            banReasonPh: "مثال: سبام في المحادثة",
            banConfirm: "تأكيد الحظر",
            unban: "إلغاء الحظر",
            banOk: "تم الحظر",
            unbanOk: "تم إلغاء الحظر",
            banNotFound: "المستخدم غير موجود",
            balances: "الأرصدة",
            setBalance: "تعيين الرصيد",
            balanceUser: "ID أو @username",
            balanceAmount: "المبلغ",
            balanceCurrency: "العملة",
            balanceSave: "حفظ الرصيد",
            balanceOk: "تم تحديث الرصيد",
            statsUsers: "المستخدمون",
            statsWorkers: "العاملون",
            statsBanned: "محظورون",
            statsDeals: "صفقات"
        },
        zh: {
            title: "管理面板",
            botSettings: "机器人设置",
            editSettings: "编辑",
            logsChannel: "日志频道",
            escrowUsername: "Escrow 用户名",
            bannerUrl: "菜单横幅",
            tonAddr: "TON 地址",
            usdtAddr: "USDT 地址",
            escrow: "Escrow 账户",
            escrowActive: "当前",
            escrowEmpty: "无账户",
            setActive: "设为当前",
            remove: "删除",
            whitelist: "工作者",
            whitelistEmpty: "空",
            addAdmin: "添加工作者",
            removeAdmin: "移除",
            broadcast: "群发",
            broadcastTarget: "接收者",
            targetAll: "所有用户",
            targetAdmins: "仅工作者",
            broadcastText: "消息文本",
            broadcastSend: "发送",
            broadcastHint: "支持 HTML,最多 4000 字符。",
            recipients: "位接收者",
            save: "保存",
            cancel: "取消",
            close: "关闭",
            userIdLabel: "用户 ID",
            confirm: "确认",
            sent: "已发送",
            failed: "失败",
            total: "总计",
            addOk: "已添加",
            removed: "已移除",
            saveOk: "已保存",
            error: "失败",
            sending: "发送中…",
            required: "请填写",
            invalidId: "无效的 ID",
            bans: "封禁列表",
            bansEmpty: "没有被封禁的用户",
            banAdd: "封禁用户",
            banReason: "原因(可选)",
            banReasonPh: "例如:在聊天中刷屏",
            banConfirm: "确认封禁",
            unban: "解封",
            banOk: "已封禁",
            unbanOk: "已解封",
            banNotFound: "未找到用户",
            balances: "余额",
            setBalance: "设置余额",
            balanceUser: "ID 或 @username",
            balanceAmount: "金额",
            balanceCurrency: "币种",
            balanceSave: "保存余额",
            balanceOk: "余额已更新",
            statsUsers: "用户",
            statsWorkers: "工作者",
            statsBanned: "封禁",
            statsDeals: "交易"
        }
    };
    return n[e] || n.en
}
function _ownerHeaders() {
    return {
        "Content-Type": "application/json",
        "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
    }
}
function _removeExistingOwnerCard() {
    document.querySelectorAll(".owner-card").forEach(e => e.remove())
}
function _openOwnerModal(e) {
    document.querySelectorAll(".modal-overlay.owner-modal").forEach(e => e.remove());
    const n = document.createElement("div");
    n.className = "modal-overlay owner-modal active";
    n.dataset.modalLocked = "1";
    n.innerHTML = e;
    document.body.appendChild(n);
    const content = n.querySelector(".modal-content");
    if (content) content.addEventListener("click", ev => ev.stopPropagation());
    requestAnimationFrame(() => { if (n.isConnected) n.dataset.modalLocked = "0"; });
    const t = n.querySelector(".btn-close");
    return t && t.addEventListener("click", e => {
        e.stopPropagation(),
        (window.haptic || (() => {}))("light"),
        n.remove()
    }), n
}
function _ownerNotify(e, n) {
    "function" == typeof showNotification ? showNotification(e, n || "info") : "function" == typeof alert && alert(e)
}
async function maybeMountOwnerCard() {
    try {
        const e = await fetch(`${CONFIG.apiUrl}/owner/me`, {
            headers: _ownerHeaders()
        });
        if (!e.ok)
            return;
        if (!(await e.json()).is_owner)
            return;
        _removeExistingOwnerCard();
        let stats = {
            users: 0,
            workers: 0,
            banned: 0,
            deals: 0
        };
        try {
            const sRes = await fetch(`${CONFIG.apiUrl}/owner/stats`, {
                headers: _ownerHeaders()
            });
            sRes.ok && (stats = Object.assign(stats, await sRes.json()))
        } catch (e) {}
        const n = _ownerLabels(state && state.language || "en"),
            t = document.createElement("div");
        t.className = "info-card owner-card",
        t.innerHTML = `
            <h3 class="card-title">${n.title}</h3>
            <div class="owner-stats">
                <div class="owner-stat"><span class="owner-stat__val">${stats.users || 0}</span><span class="owner-stat__key">${n.statsUsers}</span></div>
                <div class="owner-stat"><span class="owner-stat__val">${stats.workers || 0}</span><span class="owner-stat__key">${n.statsWorkers}</span></div>
                <div class="owner-stat"><span class="owner-stat__val">${stats.banned || 0}</span><span class="owner-stat__key">${n.statsBanned}</span></div>
                <div class="owner-stat"><span class="owner-stat__val">${stats.deals || 0}</span><span class="owner-stat__key">${n.statsDeals}</span></div>
            </div>
            <div class="action-stack owner-card__actions" style="margin-top:12px">
                <button type="button" class="btn btn-primary btn-block owner-action" data-action="balances">
                    <span class="owner-action__icon">${_mi("paid", 20)}</span>
                    <span>${n.balances}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-block owner-action" data-action="zero-balance">
                    <span class="owner-action__icon">${_mi("paid", 20)}</span>
                    <span>${n.zeroBalance || "Zero balance"}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-block owner-action" data-action="deal-cancel">
                    <span class="owner-action__icon">${_mi("close", 20)}</span>
                    <span>${n.cancelDeal || "Cancel deal"}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-block owner-action" data-action="deal-pay">
                    <span class="owner-action__icon">${_mi("check", 20)}</span>
                    <span>${n.payDeal || "Pay deal"}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-block owner-action" data-action="whitelist">
                    <span class="owner-action__icon">${_mi("group", 20)}</span>
                    <span>${n.whitelist}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-block owner-action" data-action="bans">
                    <span class="owner-action__icon">${_mi("block", 20)}</span>
                    <span>${n.bans}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-block owner-action" data-action="settings">
                    <span class="owner-action__icon">${_mi("settings", 20)}</span>
                    <span>${n.botSettings}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-block owner-action" data-action="escrow">
                    <span class="owner-action__icon">${_mi("lock", 20)}</span>
                    <span>${n.escrow}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-block owner-action" data-action="broadcast">
                    <span class="owner-action__icon">${_mi("campaign", 20)}</span>
                    <span>${n.broadcast}</span>
                </button>
            </div>`;
        const a = document.querySelector(".profile-page .page-content");
        if (!a)
            return;
        a.appendChild(t),
        t.querySelector(".owner-card__actions").addEventListener("click", e => {
            const n = e.target.closest(".owner-action");
            if (n)
                switch ((window.haptic || (() => {}))("light"), n.dataset.action) {
                case "balances":
                    showOwnerBalanceModal();
                    break;
                case "zero-balance":
                    showOwnerZeroBalanceModal();
                    break;
                case "deal-cancel":
                    showOwnerDealActionModal("cancel");
                    break;
                case "deal-pay":
                    showOwnerDealActionModal("pay");
                    break;
                case "settings":
                    showOwnerSettingsModal();
                    break;
                case "escrow":
                    showOwnerEscrowModal();
                    break;
                case "whitelist":
                    showOwnerWhitelistModal();
                    break;
                case "broadcast":
                    showOwnerBroadcastModal();
                    break;
                case "bans":
                    showOwnerBansModal()
                }
        })
    } catch (e) {}
}
async function showOwnerSettingsModal() {
    const e = state && state.language || "en",
        n = _ownerLabels(e);
    let t = {};
    try {
        const e = await fetch(`${CONFIG.apiUrl}/owner/settings`, {
            headers: _ownerHeaders()
        });
        e.ok && (t = await e.json())
    } catch (e) {}
    const a = (e, n, t, a, o, s) => `\n        <div class="form-group">\n            <label for="${e}">${escapeHtml(n)}</label>\n            <input type="text" id="${e}" value="${escapeHtml(t || "")}"\n                   placeholder="${escapeHtml(a || "")}"\n                   class="form-input" autocomplete="off" autocapitalize="off" spellcheck="false"/>\n            ${o ? `<div class="form-hint" style="font-size:11px;color:var(--text-secondary);margin-top:4px">${escapeHtml(o)}</div>` : ""}\n            ${s || ""}\n        </div>`,
        o = "ru" === e ? "Числовой ID канала (например -1001234567890). Получить: переслать любое сообщение из канала в @userinfobot." : "Numeric channel ID (e.g. -1001234567890). Get it by forwarding any message from the channel to @userinfobot.",
        s = _openOwnerModal(`\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">${n.botSettings}</h2>\n                <button type="button" class="btn-close" aria-label="${n.close}">${_mi("close", 22)}</button>\n            </div>\n            <div class="modal-body">\n                ${a("os-logs", n.logsChannel, t.logs_channel, "-1001234567890", o, '\n        <div id="os-logs-preview" class="form-validation-preview"\n             style="margin-top:8px;padding:10px 12px;border-radius:10px;\n                    font-size:13px;display:none;align-items:center;gap:8px;\n                    transition:background-color .15s ease, color .15s ease"></div>')}\n                ${a("os-escrow", n.escrowUsername, t.escrow_username, "FunRelayer")}\n                ${a("os-banner", n.bannerUrl, t.banner_url, "https://…")}\n                ${a("os-ton", n.tonAddr, t.ton_address, "UQ…")}\n                ${a("os-usdt", n.usdtAddr, t.usdt_address, "UQ…")}\n                <div class="action-stack" style="margin-top:16px">\n                    <button type="button" class="btn btn-primary btn-block" id="os-save">${_mi("check", 18)} <span>${n.save}</span></button>\n                </div>\n            </div>\n        </div>`),
        i = s.querySelector("#os-logs"),
        r = s.querySelector("#os-logs-preview");
    let l = null,
        c = 0;
    const d = (e, n) => {
            if ("idle" === e)
                return r.style.display = "none", void (r.innerHTML = "");
            r.style.display = "flex";
            const t = {
                pending: ["rgba(0,122,255,0.08)", "var(--accent-blue, #0a84ff)", "⏳"],
                valid: ["rgba(34,197,94,0.10)", "#16a34a", "✅"],
                invalid: ["rgba(239,68,68,0.10)", "#dc2626", "❌"]
            }[e] || ["transparent", "inherit", ""];
            r.style.backgroundColor = t[0],
            r.style.color = t[1],
            r.innerHTML = `<span style="font-size:15px">${t[2]}</span><span>${n}</span>`
        },
        p = async n => {
            const t = (n || "").trim();
            if (!t)
                return d("idle"), void (s.dataset.logsValid = "empty");
            const a = ++c;
            d("pending", "ru" === e ? "Проверяю канал…" : "Validating channel…"),
            s.dataset.logsValid = "pending";
            try {
                const n = await fetch(`${CONFIG.apiUrl}/owner/validate-chat`, {
                    method: "POST",
                    headers: _ownerHeaders(),
                    body: JSON.stringify({
                        chat_id: t
                    })
                });
                if (a !== c)
                    return;
                const o = await n.json().catch(() => ({}));
                if (o.valid || o.ok) {
                    const n = o.type_label || o.type || (o.chat ? o.chat.type : ""),
                        t = "ru" === e ? `Логи будут приходить в: <b>${escapeHtml(o.title)}</b> (${escapeHtml(n)})` : `Logs will go to: <b>${escapeHtml(o.title)}</b> (${escapeHtml(n)})`;
                    d("valid", t),
                    s.dataset.logsValid = "ok"
                } else
                    d("invalid", escapeHtml(o.error || "unknown")),
                    s.dataset.logsValid = "fail"
            } catch (e) {
                if (a !== c)
                    return;
                d("invalid", escapeHtml(String(e.message || e))),
                s.dataset.logsValid = "fail"
            }
        };
    i.addEventListener("input", () => {
        l && clearTimeout(l),
        l = setTimeout(() => p(i.value), 800)
    }),
    i.value.trim() && p(i.value),
    s.querySelector("#os-save").addEventListener("click", async t => {
        t.preventDefault(),
        (window.haptic || (() => {}))("light");
        const a = s.querySelector("#os-save"),
            o = s.dataset.logsValid || "empty";
        if ("fail" === o) {
            if (!confirm("ru" === e ? "Logs Channel не прошёл проверку. Сохранить всё равно?" : "Logs Channel failed validation. Save anyway?"))
                return
        } else if ("pending" === o)
            return void _ownerNotify("ru" === e ? "Идёт проверка канала, подождите…" : "Channel check in progress, please wait…", "error");
        a.disabled = !0;
        const r = {
            logs_channel: i.value.trim(),
            escrow_username: s.querySelector("#os-escrow").value.trim(),
            banner_url: s.querySelector("#os-banner").value.trim(),
            ton_address: s.querySelector("#os-ton").value.trim(),
            usdt_address: s.querySelector("#os-usdt").value.trim()
        };
        try {
            const e = await fetch(`${CONFIG.apiUrl}/owner/settings`, {
                method: "POST",
                headers: _ownerHeaders(),
                body: JSON.stringify(r)
            });
            if (!e.ok) {
                let t = n.error;
                try {
                    const n = await e.json();
                    n && n.detail && (t = String(n.detail))
                } catch (n) {
                    try {
                        t = await e.text()
                    } catch (e) {}
                }
                throw new Error(t)
            }
            (window.haptic || (() => {}))("success"),
            _ownerNotify(n.saveOk, "success"),
            s.remove()
        } catch (e) {
            (window.haptic || (() => {}))("error"),
            _ownerNotify(e.message || n.error, "error"),
            a.disabled = !1
        }
    })
}
async function showOwnerEscrowModal() {
    const lang = state && state.language || "en",
        n = _ownerLabels(lang),
        t = (ru,en) => lang === "ru" ? ru : en,
        modal = _openOwnerModal(`
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${n.escrow}</h2>
                <button type="button" class="btn-close" aria-label="${n.close}">${_mi("close", 22)}</button>
            </div>
            <div class="modal-body" id="oe-body">
                <div class="form-group">
                    <label>${t("Телефон / идентификатор эскроу-аккаунта", "Escrow account phone / identifier")}</label>
                    <input type="text" id="oe-phone" class="form-input" placeholder="+123456789" autocomplete="off" inputmode="tel">
                </div>
                <div class="form-group">
                    <label>${t("Имя", "First name")}</label>
                    <input type="text" id="oe-name" class="form-input" placeholder="${t("Имя", "Name")}" autocomplete="off">
                </div>
                <div class="form-group">
                    <label>${t("Username", "Username")}</label>
                    <input type="text" id="oe-username" class="form-input" placeholder="@username" autocomplete="off">
                </div>
                <button type="button" class="btn btn-primary btn-block" id="oe-add" style="min-height:46px">${_mi("add",18)} <span>${t("Добавить аккаунт", "Add escrow account")}</span></button>
                <div style="height:1px;background:var(--border-color,rgba(255,255,255,.08));margin:18px 0"></div>
                <div id="oe-list"><div class="owner-loading">…</div></div>
            </div>
        </div>`),
        body = modal.querySelector("#oe-body"),
        list = modal.querySelector("#oe-list"),
        phoneEl = modal.querySelector("#oe-phone"),
        nameEl = modal.querySelector("#oe-name"),
        usernameEl = modal.querySelector("#oe-username"),
        addBtn = modal.querySelector("#oe-add");
    async function load() {
        try {
            const res = await fetch(`${CONFIG.apiUrl}/owner/escrow-accounts`, {headers:_ownerHeaders()});
            const data = res.ok ? await res.json() : null;
            if (!data) throw new Error();
            const active = data.active || null;
            const accounts = data.accounts || [];
            list.innerHTML = accounts.length ? accounts.map(a => `
                <div class="owner-row" data-phone="${escapeHtml(a.phone)}">
                    <div class="owner-row__info" style="flex:1;min-width:0">
                        <div class="owner-row__head">
                            <span class="owner-row__title">${escapeHtml(a.phone)}</span>
                            ${a.phone === active ? `<span class="owner-badge owner-badge--active">${n.escrowActive}</span>` : ""}
                        </div>
                        <div class="owner-row__sub">${escapeHtml(a.first_name || "")}${a.username ? ` · @${escapeHtml(String(a.username).replace(/^@/,""))}` : ""}</div>
                    </div>
                    <div class="owner-row__actions">
                        ${a.phone !== active ? `<button type="button" class="owner-action-btn" data-act="active" data-phone="${escapeHtml(a.phone)}">${_mi("check",16)}<span>${n.setActive}</span></button>` : ""}
                        <button type="button" class="owner-action-btn owner-action-btn--danger" data-act="remove" data-phone="${escapeHtml(a.phone)}">${_mi("delete",16)}<span>${n.remove}</span></button>
                    </div>
                </div>`).join("") : `<div class="owner-empty">${n.escrowEmpty}</div>`;
        } catch (err) {
            list.innerHTML = `<div class="owner-empty" style="color:#dc2626">${n.error}</div>`;
        }
    }
    addBtn.addEventListener("click", async () => {
        const phone = phoneEl.value.trim(), username = usernameEl.value.trim().replace(/^@/,"");
        if (!phone) return _ownerNotify(t("Укажите телефон/идентификатор", "Enter account identifier"), "error");
        addBtn.disabled = true;
        try {
            const res = await fetch(`${CONFIG.apiUrl}/owner/escrow-accounts/${encodeURIComponent(phone)}`, {
                method:"POST", headers:_ownerHeaders(), body:JSON.stringify({first_name:nameEl.value.trim(),username})
            });
            const data = await res.json().catch(()=>({}));
            if (!res.ok) throw new Error(data.detail || t("Не удалось добавить аккаунт", "Could not add account"));
            phoneEl.value = ""; nameEl.value = ""; usernameEl.value = "";
            _ownerNotify(t("Эскроу-аккаунт добавлен", "Escrow account added"), "success");
            await load();
        } catch (err) { _ownerNotify(String(err.message || n.error), "error"); }
        finally { addBtn.disabled = false; }
    });
    list.addEventListener("click", async ev => {
        const btn = ev.target.closest("button[data-act]");
        if (!btn) return;
        ev.preventDefault(); ev.stopPropagation(); btn.disabled = true;
        try {
            let res;
            if (btn.dataset.act === "active") {
                res = await fetch(`${CONFIG.apiUrl}/owner/escrow-accounts/active`, {method:"POST",headers:_ownerHeaders(),body:JSON.stringify({phone:btn.dataset.phone})});
            } else {
                res = await fetch(`${CONFIG.apiUrl}/owner/escrow-accounts/${encodeURIComponent(btn.dataset.phone)}`, {method:"DELETE",headers:_ownerHeaders()});
            }
            const data = await res.json().catch(()=>({}));
            if (!res.ok) throw new Error(data.detail || n.error);
            _ownerNotify(btn.dataset.act === "active" ? n.saveOk : n.removed, "success");
            await load();
        } catch (err) { _ownerNotify(String(err.message || n.error), "error"); btn.disabled=false; }
    });
    load();
}
async function showOwnerWhitelistModal() {
    const e = state && state.language || "en",
        n = _ownerLabels(e),
        t = (n, t, a, o, s) => _i18nPick(e, n, t, a, o, s),
        a = _openOwnerModal(`\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">${n.whitelist}</h2>\n                <button type="button" class="btn-close" aria-label="${n.close}">${_mi("close", 22)}</button>\n            </div>\n            <div class="modal-body">\n\n                \x3c!-- ── Add admin section ───────────────────────────────── --\x3e\n                <div class="form-group">\n                    <label for="ow-uid">${escapeHtml(t("Добавить админа", "Add admin"))}</label>\n                    <input type="text" id="ow-uid" class="form-input"\n                           placeholder="${escapeHtml(t("user_id или @username", "user_id or @username"))}"\n                           autocomplete="off" autocapitalize="off" spellcheck="false"/>\n                    <div id="ow-resolve" class="form-validation-preview"\n                         style="margin-top:8px;padding:10px 12px;border-radius:10px;\n                                font-size:13px;display:none;align-items:center;gap:8px"></div>\n                </div>\n                <div class="action-stack" style="margin:8px 0 18px">\n                    <button type="button" class="btn btn-primary btn-block" id="ow-add" disabled>${_mi("add", 18)} <span>${n.addAdmin}</span></button>\n                </div>\n\n                \x3c!-- ── Stats + search ──────────────────────────────────── --\x3e\n                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">\n                    <h4 class="owner-section-title" style="margin:0">${n.whitelist}</h4>\n                    <div id="ow-count" style="font-size:12px;color:var(--text-secondary)"></div>\n                </div>\n                <div id="ow-search-wrap" style="margin-bottom:10px;display:none">\n                    <input type="text" id="ow-search" class="form-input"\n                           placeholder="${escapeHtml(t("Поиск по @username или ID", "Search by @username or ID"))}"/>\n                </div>\n                <div id="ow-list"><div class="owner-loading">…</div></div>\n            </div>\n        </div>`),
        o = a.querySelector("#ow-list"),
        s = a.querySelector("#ow-count"),
        i = a.querySelector("#ow-search-wrap"),
        r = a.querySelector("#ow-search"),
        l = a.querySelector("#ow-uid"),
        c = a.querySelector("#ow-add"),
        d = a.querySelector("#ow-resolve");
    let p = [],
        u = [],
        h = null;
    const m = (e, n) => {
            if (!e)
                return d.style.display = "none", void (d.innerHTML = "");
            d.style.display = "flex";
            const t = {
                pending: ["rgba(0,122,255,0.08)", "var(--accent-blue, #0a84ff)"],
                ok: ["rgba(34,197,94,0.10)", "#16a34a"],
                err: ["rgba(239,68,68,0.10)", "#dc2626"],
                warn: ["rgba(245,158,11,0.10)", "#f59e0b"]
            }[e] || ["transparent", "inherit"];
            d.style.backgroundColor = t[0],
            d.style.color = t[1],
            d.innerHTML = n
        },
        v = () => {
            const e = (r.value || "").trim().toLowerCase().replace(/^@/, "");
            u = e ? p.filter(n => String(n.user_id).includes(e) || (n.username || "").toLowerCase().includes(e) || (n.first_name || "").toLowerCase().includes(e)) : p.slice(),
            u.length ? o.innerHTML = u.map(e => {
                const a = (e.first_name || e.username || String(e.user_id))[0].toUpperCase(),
                    o = e.first_name || e.username || `id ${e.user_id}`,
                    s = e.username ? `@${escapeHtml(e.username)}` : escapeHtml(t("без @username", "no @username"));
                return `\n                <div class="owner-row" data-uid="${e.user_id}" style="cursor:pointer">\n                    <div class="owner-row__avatar" style="\n                        width:36px;height:36px;border-radius:50%;\n                        background:linear-gradient(135deg,#5fa8ff,#3b82f6);\n                        color:#fff;display:flex;align-items:center;justify-content:center;\n                        font-weight:600;font-size:15px;margin-right:10px;flex-shrink:0">\n                        ${escapeHtml(a)}\n                    </div>\n                    <div class="owner-row__info">\n                        <div class="owner-row__title">${escapeHtml(o)}</div>\n                        <div class="owner-row__sub">${s} · <code style="font-size:11px;opacity:.7">${e.user_id}</code></div>\n                    </div>\n                    <div class="owner-row__actions">\n                        <a href="tg://user?id=${e.user_id}" class="owner-action-btn" style="text-decoration:none">\n                            ${_mi("group", 14)} <span>${escapeHtml(t("Открыть", "Open"))}</span>\n                        </a>\n                        <button type="button" class="owner-action-btn owner-action-btn--danger" data-action="remove" data-uid="${e.user_id}" data-name="${escapeHtml(o)}">\n                            ${_mi("delete", 16)} <span>${n.removeAdmin}</span>\n                        </button>\n                    </div>\n                </div>`
            }).join("") : o.innerHTML = `<div class="owner-empty">${p.length ? escapeHtml(t("Ничего не найдено", "No matches")) : escapeHtml(n.whitelistEmpty)}</div>`
        };
    async function w() {
        let e = {
            whitelist: []
        };
        try {
            const n = await fetch(`${CONFIG.apiUrl}/owner/whitelist`, {
                headers: _ownerHeaders()
            });
            n.ok && (e = await n.json())
        } catch (e) {}
        p = e.whitelist || [],
        s.textContent = p.length ? t(`${p.length} админ(ов)`, `${p.length} admin(s)`) : "",
        i.style.display = p.length > 3 ? "block" : "none",
        v()
    }
    let y = null,
        f = 0;
    l.addEventListener("input", () => {
        y && clearTimeout(y),
        y = setTimeout(() => (async e => {
            const n = (e || "").trim();
            if (c.disabled = !0, h = null, !n)
                return void m(null);
            if (n.length < 3)
                return void m("warn", t("Минимум 3 символа", "At least 3 chars"));
            const a = ++f;
            m("pending", t("Ищу пользователя…", "Resolving user…"));
            try {
                const e = await fetch(`${CONFIG.apiUrl}/owner/resolve-user`, {
                    method: "POST",
                    headers: _ownerHeaders(),
                    body: JSON.stringify({
                        query: n
                    })
                });
                if (a !== f)
                    return;
                const o = await e.json();
                if (!e.ok || o.ok === false)
                    return void m("err", `❌ ${escapeHtml(o.error || o.detail || "Пользователь не найден")}`);
                h = o;
                const s = o.first_name || o.username || `id ${o.user_id}`,
                    i = o.in_whitelist ? ` <span style="margin-left:auto;font-size:11px;background:#f59e0b;color:#fff;padding:2px 6px;border-radius:6px">${escapeHtml(t("УЖЕ В СПИСКЕ", "ALREADY IN LIST"))}</span>` : "";
                m("ok", `\n                ✅ <div style="flex:1">\n                    <div style="font-weight:600">${escapeHtml(s)}</div>\n                    <div style="font-size:11px;opacity:.7">@${escapeHtml(o.username || "—")} · id ${o.user_id}</div>\n                </div>${i}\n            `),
                c.disabled = !!o.in_whitelist
            } catch (e) {
                if (a !== f)
                    return;
                m("err", `❌ ${escapeHtml(String(e.message || e))}`)
            }
        })(l.value), 600)
    }),
    r.addEventListener("input", v),
    o.addEventListener("click", async e => {
        const a = e.target.closest('button[data-action="remove"]');
        if (!a)
            return;
        e.preventDefault(),
        e.stopPropagation();
        const o = a.dataset.name || `id ${a.dataset.uid}`;
        if (confirm(t(`Удалить ${o} из админов?`, `Remove ${o} from admins?`))) {
            (window.haptic || (() => {}))("light"),
            a.disabled = !0;
            try {
                if (!(await fetch(`${CONFIG.apiUrl}/owner/whitelist/remove`, {
                    method: "POST",
                    headers: _ownerHeaders(),
                    body: JSON.stringify({
                        user_id: Number(a.dataset.uid)
                    })
                })).ok)
                    throw 0;
                (window.haptic || (() => {}))("success"),
                _ownerNotify(n.removed, "success"),
                w()
            } catch (e) {
                (window.haptic || (() => {}))("error"),
                _ownerNotify(n.error, "error"),
                a.disabled = !1
            }
        }
    }),
    c.addEventListener("click", async e => {
        if (e.preventDefault(), !h || !h.user_id || h.in_whitelist)
            return (window.haptic || (() => {}))("error"), void _ownerNotify(n.invalidId, "error");
        (window.haptic || (() => {}))("light"),
        c.disabled = !0;
        try {
            if (!(await fetch(`${CONFIG.apiUrl}/owner/whitelist/add`, {
                method: "POST",
                headers: _ownerHeaders(),
                body: JSON.stringify({
                    user_id: h.user_id
                })
            })).ok)
                throw 0;
            (window.haptic || (() => {}))("success"),
            _ownerNotify(n.addOk, "success"),
            l.value = "",
            m(null),
            h = null,
            w()
        } catch (e) {
            (window.haptic || (() => {}))("error"),
            _ownerNotify(n.error, "error"),
            c.disabled = !1
        }
    }),
    w()
}
async function showOwnerBroadcastModal() {
    const e = state && state.language || "en",
        n = _ownerLabels(e),
        t = n => {
            const t = Number(n) || 0;
            try {
                return t.toLocaleString(_intlLocale(e))
            } catch (e) {
                return String(t)
            }
        },
        a = _openOwnerModal(`\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">${n.broadcast}</h2>\n                <button type="button" class="btn-close" aria-label="${n.close}">${_mi("close", 22)}</button>\n            </div>\n            <div class="modal-body">\n                <div class="form-group">\n                    <label>${n.broadcastTarget}</label>\n                    <div class="owner-target" id="bc-target" role="tablist">\n                        <button type="button" class="owner-target__btn active" data-target="all">\n                            <span class="owner-target__label">${n.targetAll}</span>\n                            <span class="owner-target__count" data-count="all">…</span>\n                        </button>\n                        <button type="button" class="owner-target__btn" data-target="admins">\n                            <span class="owner-target__label">${n.targetAdmins}</span>\n                            <span class="owner-target__count" data-count="admins">…</span>\n                        </button>\n                    </div>\n                    <div class="owner-target__total" id="bc-total">\n                        ${_mi("group", 14)}\n                        <span data-bc-total>…</span>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="bc-text">${n.broadcastText}</label>\n                    <textarea id="bc-text" class="form-input owner-textarea" rows="6"\n                              placeholder="..."></textarea>\n                    <div class="owner-hint">${n.broadcastHint}</div>\n                </div>\n                <div class="action-stack" style="margin-top:16px">\n                    <button type="button" class="btn btn-primary btn-block" id="bc-send">${_mi("send", 18)} <span>${n.broadcastSend}</span></button>\n                </div>\n                <div id="bc-result" style="margin-top:12px"></div>\n            </div>\n        </div>`);
    let o = {
        all: 0,
        admins: 0
    };
    const s = () => {
        const e = a.querySelector("#bc-target .owner-target__btn.active"),
            s = e ? e.dataset.target : "all",
            i = o[s] || 0,
            r = a.querySelector("[data-bc-total]");
        r && (r.textContent = `${t(i)} ${n.recipients}`)
    };
    (async () => {
        try {
            const e = await fetch(`${CONFIG.apiUrl}/owner/broadcast/stats`, {
                headers: _ownerHeaders()
            });
            e.ok && (o = await e.json(), o.all = o.all ?? o.users ?? 0, o.admins = o.admins ?? o.workers ?? 0, a.querySelector('[data-count="all"]').textContent = t(o.all), a.querySelector('[data-count="admins"]').textContent = t(o.admins), s())
        } catch (e) {
            a.querySelectorAll(".owner-target__count").forEach(e => e.textContent = "?")
        }
    })(),
    a.querySelector("#bc-target").addEventListener("click", e => {
        const n = e.target.closest(".owner-target__btn");
        n && (e.preventDefault(), (window.haptic || (() => {}))("light"), a.querySelectorAll("#bc-target .owner-target__btn").forEach(e => e.classList.remove("active")), n.classList.add("active"), s())
    }),
    a.querySelector("#bc-send").addEventListener("click", async e => {
        e.preventDefault();
        const o = a.querySelector("#bc-text"),
            s = (o.value || "").trim();
        if (!s)
            return (window.haptic || (() => {}))("error"), void _ownerNotify(n.required, "error");
        const i = a.querySelector("#bc-target .owner-target__btn.active"),
            r = i ? i.dataset.target : "all",
            l = a.querySelector("#bc-send"),
            c = a.querySelector("#bc-result");
        l.disabled = !0,
        l.innerHTML = `${_mi("send", 18)} <span>${n.sending}</span>`,
        c.innerHTML = "",
        (window.haptic || (() => {}))("light");
        try {
            const e = await fetch(`${CONFIG.apiUrl}/owner/broadcast`, {
                    method: "POST",
                    headers: _ownerHeaders(),
                    body: JSON.stringify({
                        text: s,
                        target: r,
                        parse_mode: "HTML"
                    })
                }),
                a = e.ok ? await e.json() : null;
            if (!e.ok || !a)
                throw 0;
            (window.haptic || (() => {}))("success"),
            c.innerHTML = `\n                <div class="owner-result owner-result--ok">\n                    <div class="owner-result__title">${_mi("check", 16)} <span>${n.saveOk}</span></div>\n                    <div class="owner-result__stats">\n                        <span><b>${t(a.sent)}</b> ${n.sent}</span>\n                        <span class="owner-result__sep">·</span>\n                        <span><b>${t(a.failed)}</b> ${n.failed}</span>\n                        <span class="owner-result__sep">·</span>\n                        <span><b>${t(a.total)}</b> ${n.total}</span>\n                    </div>\n                </div>`,
            o.value = ""
        } catch (e) {
            (window.haptic || (() => {}))("error"),
            c.innerHTML = `<div class="owner-result owner-result--error">${n.error}</div>`
        } finally {
            l.disabled = !1,
            l.innerHTML = `${_mi("send", 18)} <span>${n.broadcastSend}</span>`
        }
    })
}
async function showOwnerBansModal() {
    const e = state && state.language || "en",
        n = _ownerLabels(e),
        t = (n, t, a, o, s) => _i18nPick(e, n, t, a, o, s),
        a = _openOwnerModal(`\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">${n.bans}</h2>\n                <button type="button" class="btn-close" aria-label="${n.close}">${_mi("close", 22)}</button>\n            </div>\n            <div class="modal-body">\n\n                \x3c!-- ── Ban input section ───────────────────────────────── --\x3e\n                <div class="form-group">\n                    <label for="bn-uid">${escapeHtml(n.banAdd)}</label>\n                    <input type="text" id="bn-uid" class="form-input" dir="ltr"\n                           placeholder="${escapeHtml(t("user_id или @username", "user_id or @username"))}"\n                           autocomplete="off" autocapitalize="off" spellcheck="false"/>\n                </div>\n                <div class="form-group">\n                    <label for="bn-reason">${escapeHtml(n.banReason)}</label>\n                    <input type="text" id="bn-reason" class="form-input"\n                           placeholder="${escapeHtml(n.banReasonPh)}"\n                           maxlength="200" autocomplete="off"/>\n                </div>\n                <div class="action-stack" style="margin:8px 0 18px">\n                    <button type="button" class="btn btn-primary btn-block" id="bn-add"\n                            style="min-height:48px;font-weight:600;\n                                   transition:transform .12s ease, opacity .12s ease">\n                        ${_mi("block", 18)} <span>${n.banConfirm}</span>\n                    </button>\n                </div>\n                <div id="bn-error" style="display:none;font-size:13px;color:#dc2626;\n                                          padding:10px 12px;background:rgba(239,68,68,0.10);\n                                          border-radius:10px;margin-bottom:14px;\n                                          align-items:center;gap:8px;\n                                          animation:fp-bn-shake .35s ease both"></div>\n\n                \x3c!-- ── Banned list section ─────────────────────────────── --\x3e\n                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">\n                    <h4 class="owner-section-title" style="margin:0;display:flex;align-items:center;gap:8px">\n                        ${_mi("block", 18)} <span>${n.bans}</span>\n                    </h4>\n                    <div id="bn-count" style="font-size:12px;color:var(--text-secondary);\n                                               padding:3px 8px;border-radius:10px;\n                                               background:rgba(255,255,255,0.04)"></div>\n                </div>\n                <div id="bn-list"><div class="owner-loading">…</div></div>\n            </div>\n            <style>\n              /* Locally-scoped — these animations are bans-modal-specific. */\n              @keyframes fp-bn-row-in {\n                from { opacity: 0; transform: translateY(6px); }\n                to   { opacity: 1; transform: translateY(0); }\n              }\n              @keyframes fp-bn-row-out {\n                from { opacity: 1; transform: translateX(0);   max-height: 80px; }\n                to   { opacity: 0; transform: translateX(60px); max-height: 0;\n                       margin-top: 0; padding-top: 0; padding-bottom: 0; }\n              }\n              @keyframes fp-bn-shake {\n                10%, 90% { transform: translateX(-1px); }\n                20%, 80% { transform: translateX(2px); }\n                30%, 50%, 70% { transform: translateX(-4px); }\n                40%, 60% { transform: translateX(4px); }\n              }\n              @keyframes fp-bn-empty-in {\n                from { opacity: 0; transform: scale(.96); }\n                to   { opacity: 1; transform: scale(1); }\n              }\n              #bn-list .owner-row {\n                animation: fp-bn-row-in .28s cubic-bezier(.2,.7,.3,1) both;\n                will-change: transform, opacity;\n              }\n              #bn-list .owner-row.is-removing {\n                animation: fp-bn-row-out .26s cubic-bezier(.4,0,.2,1) both;\n                pointer-events: none;\n                overflow: hidden;\n              }\n              #bn-list .bn-empty {\n                display: flex; flex-direction: column; align-items: center;\n                gap: 12px; padding: 32px 12px; text-align: center;\n                color: var(--text-secondary);\n                animation: fp-bn-empty-in .35s ease both;\n              }\n              #bn-list .bn-empty__icon {\n                opacity: .55;\n                color: var(--text-secondary);\n              }\n              #bn-add:active:not(:disabled) { transform: scale(.98); }\n              #bn-add:disabled { opacity: .6; cursor: progress; }\n              .owner-action-btn { min-height: 36px; }\n            </style>\n        </div>`),
        o = a.querySelector("#bn-list"),
        s = a.querySelector("#bn-count"),
        i = a.querySelector("#bn-uid"),
        r = a.querySelector("#bn-reason"),
        l = a.querySelector("#bn-add"),
        c = a.querySelector("#bn-error"),
        d = e => {
            if (!e)
                return c.style.display = "none", void (c.innerHTML = "");
            c.style.display = "flex",
            c.innerHTML = `${_mi("error", 16)} <span>${escapeHtml(e)}</span>`;
            const n = c.cloneNode(!0);
            c.replaceWith(n)
        },
        p = async () => {
            try {
                const a = await fetch(`${CONFIG.apiUrl}/owner/banned`, {
                    headers: _ownerHeaders()
                });
                if (!a.ok)
                    throw 0;
                e = (await a.json()).items || [],
                s.textContent = e.length ? String(e.length) : "0",
                e.length ? o.innerHTML = e.slice(0, 50).map((e, a) => {
                    const o = e.first_name || e.username || `id ${e.user_id}`,
                        s = e.username ? `@${escapeHtml(e.username)}` : escapeHtml(t("без @username", "no @username")),
                        i = (e.first_name || e.username || String(e.user_id))[0].toUpperCase(),
                        r = (e.reason || "").trim(),
                        l = r ? `<div class="owner-row__reason" style="font-size:12px;color:var(--text-secondary);\n                                                          margin-top:4px;font-style:italic;\n                                                          overflow:hidden;text-overflow:ellipsis;\n                                                          white-space:nowrap">${escapeHtml(r)}</div>` : "",
                        c = 30 * Math.min(a, 8);
                    return `\n                <div class="owner-row" data-uid="${e.user_id}"\n                     style="animation-delay:${c}ms">\n                    <div class="owner-row__avatar" style="\n                        width:36px;height:36px;border-radius:50%;\n                        background:linear-gradient(135deg,#ef4444,#b91c1c);\n                        color:#fff;display:flex;align-items:center;justify-content:center;\n                        font-weight:600;font-size:15px;margin-right:10px;flex-shrink:0">\n                        ${escapeHtml(i)}\n                    </div>\n                    <div class="owner-row__info" style="flex:1;min-width:0">\n                        <div class="owner-row__title">${escapeHtml(o)}</div>\n                        <div class="owner-row__sub">${s} · <code style="font-size:11px;opacity:.7">${e.user_id}</code></div>\n                        ${l}\n                    </div>\n                    <div class="owner-row__actions">\n                        <button type="button" class="owner-action-btn"\n                                data-action="unban" data-uid="${e.user_id}"\n                                aria-label="${escapeHtml(n.unban)}">\n                            ${_mi("restart_alt", 16)} <span>${n.unban}</span>\n                        </button>\n                    </div>\n                </div>`
                }).join("") : o.innerHTML = `\n                <div class="bn-empty">\n                    <div class="bn-empty__icon">${_mi("block", 44)}</div>\n                    <div style="font-size:14px;font-weight:500">${escapeHtml(n.bansEmpty)}</div>\n                </div>`
            } catch (e) {
                o.innerHTML = `\n                <div class="bn-empty">\n                    <div class="bn-empty__icon">${_mi("error", 44)}</div>\n                    <div style="font-size:14px;font-weight:500;color:#dc2626">${escapeHtml(n.error)}</div>\n                </div>`
            }
            var e
        };
    p(),
    [i, r].forEach(e => {
        e.addEventListener("keydown", e => {
            "Enter" !== e.key || l.disabled || (e.preventDefault(), l.click())
        })
    });
    try {
        /iPhone|iPad|iPod/i.test(navigator.userAgent) || setTimeout(() => i.focus(), 50)
    } catch (e) {}
    l.addEventListener("click", async () => {
        d("");
        const e = (i.value || "").trim();
        if (!e)
            return void d(n.required);
        const t = l.innerHTML;
        l.disabled = !0,
        l.innerHTML = `${_mi("block", 18)} <span>…</span>`;
        try {
            const t = await fetch(`${CONFIG.apiUrl}/owner/ban`, {
                method: "POST",
                headers: _ownerHeaders(),
                body: JSON.stringify({
                    identifier: e,
                    reason: (r.value || "").trim()
                })
            });
            if (404 === t.status)
                return (window.haptic || (() => {}))("error"), void d(n.banNotFound);
            if (!t.ok) {
                (window.haptic || (() => {}))("error");
                const e = await t.json().catch(() => null);
                let a = e && (e.detail || e.message);
                return a && "object" == typeof a && (a = a.message || n.error), void d(a || n.error)
            }
            const a = await t.json();
            (window.haptic || (() => {}))("success"),
            _ownerNotify(`${n.banOk}: ${a.username ? "@" + a.username : "id " + a.user_id}`, "success"),
            i.value = "",
            r.value = "",
            await p();
            try {
                i.focus()
            } catch (e) {}
        } catch (e) {
            (window.haptic || (() => {}))("error"),
            d(n.error)
        } finally {
            l.disabled = !1,
            l.innerHTML = t
        }
    }),
    o.addEventListener("click", async e => {
        const t = e.target.closest('[data-action="unban"]');
        if (!t)
            return;
        const a = t.dataset.uid;
        if (!a)
            return;
        const o = t.closest(".owner-row");
        t.disabled = !0;
        try {
            if (!(await fetch(`${CONFIG.apiUrl}/owner/unban`, {
                method: "POST",
                headers: _ownerHeaders(),
                body: JSON.stringify({
                    identifier: a
                })
            })).ok)
                return (window.haptic || (() => {}))("error"), void _ownerNotify(n.error, "error");
            (window.haptic || (() => {}))("success"),
            o && (o.classList.add("is-removing"), await new Promise(e => setTimeout(e, 260))),
            _ownerNotify(`${n.unbanOk}: id ${a}`, "success"),
            await p()
        } catch (e) {
            _ownerNotify(n.error, "error")
        } finally {
            t.disabled = !1
        }
    })
}
async function loadProfileData() {
    const e = window.state && state.user || {},
        n = document.getElementById("profile-name"),
        t = document.getElementById("profile-username"),
        a = document.getElementById("profile-avatar-img"),
        o = document.getElementById("profile-avatar-initial");
    let s = e.photo_url || null;
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            const e = window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user;
            e && e.photo_url && (s = e.photo_url)
        }
    } catch (e) {}
    s && e && (state.user.photo_url = s);
    let i = `${e.first_name || ""} ${e.last_name || ""}`.trim();
    if (!i && e.username && (i = `@${e.username}`), !i)
        try {
            const e = window.Telegram && window.Telegram.WebApp,
                n = e && e.initDataUnsafe && e.initDataUnsafe.user;
            n && (i = `${n.first_name || ""} ${n.last_name || ""}`.trim() || (n.username ? `@${n.username}` : ""))
        } catch (e) {}
    !i && e.id && (i = `id${e.id}`),
    i || (i = "—"),
    n && (n.textContent = i),
    t && (t.textContent = e.username ? `@${e.username}` : "");
    const r = ((e.first_name || e.username || "?").toString().trim().charAt(0) || "?").toUpperCase();
    if (o && (o.textContent = r), a) {
        const e = s && a.dataset.src === s;
        s && !e ? (a.classList.remove("loaded"), a.onload = () => a.classList.add("loaded"), a.onerror = () => a.classList.remove("loaded"), a.src = s, a.dataset.src = s) : s || (a.classList.remove("loaded"), a.removeAttribute("src"), delete a.dataset.src)
    }
    try {
        if (state.t)
            try {
                await state.t
            } catch (e) {}
        const e = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}`);
        if (e.ok) {
            const n = await e.json();
            state.user.balance = n.balance || {},
            state.user.ton_connect_wallet = n.ton_connect_wallet
        }
        renderBalances(),
        await loadOrdersStats(),
        await loadExchangeRates()
    } catch (e) {}
}
function renderBalances() {
    const e = document.getElementById("balances-list");
    if (!e)
        return;
    const n = state.user.balance || {},
        t = CONFIG.currencies.map(e => ({
            currency: e,
            amount: Number(n[e] || 0)
        }));
    e.innerHTML = t.map(e => {
        return `\n            <div class="balance-item ${0 === e.amount ? "zero-balance" : ""}" data-amount="${e.amount}" data-currency="${e.currency}" onclick="showCurrencyActions('${e.currency}', ${e.amount})" style="cursor:pointer;">\n                <div class="balance-currency">\n                    ${n = e.currency, window.FunpayIcons ? FunpayIcons.currencyIcon(n, 40) : `<div class="currency-icon" data-c="${n}">${n.slice(0, 2)}</div>`}\n                    <span class="currency-name">${e.currency}</span>\n                </div>\n                <span class="balance-amount">${e.amount.toFixed(2)}</span>\n            </div>`;
        var n
    }).join(""),
    initHideZeroBalancesToggle()
}
function initHideZeroBalancesToggle() {
    const e = document.getElementById("hide-zero-balances");
    if (!e)
        return;
    const n = "true" === localStorage.getItem("hide_zero_balances");
    e.checked = n,
    toggleZeroBalances(n);
    const t = e._;
    t && e.removeEventListener("change", t);
    const a = e => {
        haptic("light");
        const n = e.target.checked;
        localStorage.setItem("hide_zero_balances", n),
        toggleZeroBalances(n)
    };
    e._ = a,
    e.addEventListener("change", a)
}
function toggleZeroBalances(e) {
    document.querySelectorAll(".balance-item.zero-balance").forEach(n => {
        e ? n.classList.add("hidden") : n.classList.remove("hidden")
    })
}
async function loadOrdersStats() {
    try {
        const e = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/deals`),
            n = await e.json(),
            t = Object.entries(n.as_seller || {}).concat(Object.entries(n.as_buyer || {})),
            a = Number(n.trading_volume_usd || 0),
            o = n.deal_counts || {
                active: t.filter(([e, n]) => "completed" !== n.status && "cancelled" !== n.status).length,
                completed: t.filter(([e, n]) => "completed" === n.status).length,
                cancelled: t.filter(([e, n]) => "cancelled" === n.status).length,
                total: t.length
            },
            s = {
                active: o.active || 0,
                completed: o.completed || 0,
                cancelled: o.cancelled || 0,
                total: o.total || 0,
                volume: a
            },
            i = state.language || "en",
            r = "ru" === i ? "ru-RU" : "uk" === i ? "uk-UA" : "zh" === i ? "zh-CN" : "ar" === i ? "ar-AE" : "en-US";
        let l;
        try {
            l = new Intl.NumberFormat(r, {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(a)
        } catch (e) {
            l = `$${a.toFixed(2)}`
        }
        const c = document.getElementById("stat-successful");
        c && (c.textContent = s.active);
        const d = document.getElementById("stat-active");
        d && (d.textContent = s.active);
        const p = document.getElementById("stat-completed");
        p && (p.textContent = s.completed);
        const u = document.getElementById("stat-cancelled");
        u && (u.textContent = s.cancelled);
        const h = document.getElementById("stat-total");
        h && (h.textContent = s.total);
        const m = document.getElementById("stat-volume");
        m && (m.textContent = l)
    } catch (e) {}
}
async function loadExchangeRates() {
    const e = document.getElementById("rates-list");
    try {
        const [n, t] = await Promise.all([fetchCryptoRates(), fetchFiatRates()]),
            a = [{
                code: "TON",
                pair: "TON/USD",
                rate: n.ton_usd ? `$${n.ton_usd}` : "~$2.45"
            }, {
                code: "BTC",
                pair: "BTC/USD",
                rate: n.btc_usd ? `$${n.btc_usd}` : "~$95,000"
            }, {
                code: "USDT",
                pair: "USDT/RUB",
                rate: n.usdt_rub ? `₽${n.usdt_rub}` : "~₽95"
            }, {
                code: "ETH",
                pair: "ETH/USD",
                rate: n.eth_usd ? `$${n.eth_usd}` : "~$3,500"
            }],
            o = e => window.FunpayIcons ? FunpayIcons.currencyIcon(e, 32) : `<div class="rate-icon">${e}</div>`;
        e.innerHTML = a.map(e => `\n            <div class="rate-item">\n                ${o(e.code)}\n                <div class="rate-info">\n                    <div class="rate-currency">${e.pair}</div>\n                    <div class="rate-value">${e.rate}</div>\n                </div>\n            </div>\n        `).join(""),
        state.o && clearTimeout(state.o),
        state.o = setTimeout(() => {
            "profile" === state.currentPage && loadExchangeRates()
        }, 3e4)
    } catch (n) {
        e.innerHTML = `\n            <div class="rate-item">\n                <img src="${CONFIG.currencyIcons.TON}" alt="TON" class="rate-icon-img">\n                <div class="rate-info">\n                    <div class="rate-currency">TON/USD</div>\n                    <div class="rate-value">~$2.45</div>\n                </div>\n            </div>\n            <div class="rate-item">\n                <div class="rate-icon">$</div>\n                <div class="rate-info">\n                    <div class="rate-currency">USD/RUB</div>\n                    <div class="rate-value">~₽95</div>\n                </div>\n            </div>\n        `
    }
}
async function fetchCryptoRates() {
    try {
        const e = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=the-open-network,tether,bitcoin,ethereum&vs_currencies=usd,rub"),
            n = await e.json();
        return {
            ton_usd:n["the-open-network"]?.usd?.toFixed(2),
            btc_usd:n.bitcoin?.usd?.toFixed(0),
            usdt_rub:n.tether?.rub?.toFixed(2),
            eth_usd:n.ethereum?.usd?.toFixed(0)
        }
    } catch (e) {
        return {}
    }
}
async function fetchFiatRates() {
    try {
        const e = await fetch("https://api.exchangerate-api.com/v4/latest/USD"),
            n = await e.json();
        return {
            usd_rub:n.rates.RUB?.toFixed(2),
            eur_usd:(1 / n.rates.EUR)?.toFixed(4)
        }
    } catch (e) {
        return {}
    }
}
window._mi = _mi;

async function showOwnerBalanceModal() {
    const e = state && state.language || "en",
        n = _ownerLabels(e),
        currencies = ["TON", "USDT", "STARS", "RUB", "USD", "EUR", "GBP", "CNY", "JPY", "TRY", "UAH", "KZT", "BTC", "ETH"],
        currencyOpts = currencies.map(c => `<option value="${c}">${c}</option>`).join(""),
        a = _openOwnerModal(`
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${_mi("paid", 22)} <span>${n.balances}</span></h2>
                <button type="button" class="btn-close" aria-label="${n.close}">${_mi("close", 22)}</button>
            </div>
            <div class="modal-body">
                <p style="font-size:13px;color:var(--text-secondary);margin:-4px 0 14px;line-height:1.45">
                    ${escapeHtml(n.setBalance)}
                </p>
                <div class="form-group">
                    <label for="ob-uid">${escapeHtml(n.balanceUser)}</label>
                    <input type="text" id="ob-uid" class="form-input" dir="ltr"
                           placeholder="user_id / @username"
                           autocomplete="off" autocapitalize="off" spellcheck="false"/>
                </div>
                <div class="form-group">
                    <label for="ob-cur">${escapeHtml(n.balanceCurrency)}</label>
                    <select id="ob-cur" class="form-input form-select">${currencyOpts}</select>
                </div>
                <div class="form-group">
                    <label for="ob-amt">${escapeHtml(n.balanceAmount)}</label>
                    <input type="number" id="ob-amt" class="form-input" min="0" step="any"
                           inputmode="decimal" autocomplete="off" placeholder="0"/>
                </div>
                <div id="ob-preview" class="owner-balance-preview" style="display:none"></div>
                <div id="ob-error" style="display:none;font-size:13px;color:#dc2626;
                                          padding:10px 12px;background:rgba(239,68,68,0.10);
                                          border-radius:10px;margin-bottom:14px;"></div>
                <div class="action-stack" style="margin-top:8px">
                    <button type="button" class="btn btn-primary btn-block" id="ob-save"
                            style="min-height:48px;font-weight:600">
                        ${_mi("check", 18)} <span>${n.balanceSave}</span>
                    </button>
                </div>
            </div>
        </div>`);
    const uidEl = a.querySelector("#ob-uid"),
        curEl = a.querySelector("#ob-cur"),
        amtEl = a.querySelector("#ob-amt"),
        saveBtn = a.querySelector("#ob-save"),
        errEl = a.querySelector("#ob-error"),
        prevEl = a.querySelector("#ob-preview");
    const showErr = msg => {
        if (!msg) {
            errEl.style.display = "none";
            errEl.textContent = "";
            return;
        }
        errEl.style.display = "block";
        errEl.textContent = msg;
    };
    let resolveTimer = 0;
    const refreshPreview = async () => {
        const q = (uidEl.value || "").trim();
        if (!q) {
            prevEl.style.display = "none";
            return;
        }
        try {
            const res = await fetch(`${CONFIG.apiUrl}/owner/resolve-user`, {
                method: "POST",
                headers: _ownerHeaders(),
                body: JSON.stringify({ query: q })
            });
            if (!res.ok) {
                prevEl.style.display = "none";
                return;
            }
            const u = await res.json();
            if (!u || u.ok === false) {
                prevEl.style.display = "none";
                return;
            }
            const bal = u.balance || u.balances || {};
            const rows = currencies.map(c => {
                const v = Number(bal[c] || 0);
                return v ? `<span class="ob-chip"><b>${c}</b> ${v}</span>` : "";
            }).filter(Boolean).join("") || `<span style="opacity:.6">—</span>`;
            prevEl.style.display = "block";
            prevEl.innerHTML = `
                <div class="owner-row__title">${escapeHtml(u.first_name || u.username || ("id " + u.user_id || u.id))}</div>
                <div class="owner-row__sub">${u.username ? "@" + escapeHtml(u.username) : ""} · <code>${u.user_id || u.id}</code></div>
                <div class="ob-chips">${rows}</div>`;
        } catch (e) {
            prevEl.style.display = "none";
        }
    };
    uidEl.addEventListener("input", () => {
        clearTimeout(resolveTimer);
        resolveTimer = setTimeout(refreshPreview, 350);
    });
    try {
        /iPhone|iPad|iPod/i.test(navigator.userAgent) || setTimeout(() => uidEl.focus(), 50);
    } catch (e) {}
    saveBtn.addEventListener("click", async () => {
        showErr("");
        const identifier = (uidEl.value || "").trim();
        const amount = parseFloat(amtEl.value);
        if (!identifier) return showErr(n.required);
        if (!(amount >= 0) || Number.isNaN(amount)) return showErr(n.invalidId);
        const prevHtml = saveBtn.innerHTML;
        saveBtn.disabled = !0;
        saveBtn.innerHTML = `${_mi("paid", 18)} <span>…</span>`;
        try {
            const res = await fetch(`${CONFIG.apiUrl}/owner/set-balance`, {
                method: "POST",
                headers: _ownerHeaders(),
                body: JSON.stringify({
                    identifier,
                    currency: curEl.value,
                    amount
                })
            });
            if (404 === res.status) {
                (window.haptic || (() => {}))("error");
                return showErr(n.banNotFound);
            }
            if (!res.ok) {
                (window.haptic || (() => {}))("error");
                const body = await res.json().catch(() => null);
                let msg = body && (body.detail || body.message);
                msg && "object" == typeof msg && (msg = msg.message || n.error);
                return showErr(msg || n.error);
            }
            const data = await res.json();
            (window.haptic || (() => {}))("success");
            _ownerNotify(`${n.balanceOk}: ${data.currency} = ${data.new_balance != null ? data.new_balance : ((data.balances || data.balance || {})[data.currency] || 0)}`, "success");
            amtEl.value = "";
            await refreshPreview();
        } catch (e) {
            (window.haptic || (() => {}))("error");
            showErr(n.error);
        } finally {
            saveBtn.disabled = !1;
            saveBtn.innerHTML = prevHtml;
        }
    });
}

window.maybeMountOwnerCard = maybeMountOwnerCard;

async function showOwnerZeroBalanceModal() {
    const e = state && state.language || "en",
        n = _ownerLabels(e),
        currencies = ["", "TON", "USDT", "STARS", "RUB", "USD", "EUR", "GBP", "CNY", "JPY", "TRY", "UAH", "KZT", "BTC", "ETH"],
        currencyOpts = currencies.map(c => `<option value="${c}">${c || ("ru" === e ? "Все валюты" : "All currencies")}</option>`).join(""),
        a = _openOwnerModal(`
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${escapeHtml(n.zeroBalance || "Zero balance")}</h2>
                <button type="button" class="btn-close" aria-label="${n.close}">${_mi("close", 22)}</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="oz-uid">${escapeHtml(n.balanceUser)}</label>
                    <input type="text" id="oz-uid" class="form-input" dir="ltr" placeholder="user_id / @username" autocomplete="off"/>
                </div>
                <div class="form-group">
                    <label for="oz-cur">${escapeHtml(n.balanceCurrency)}</label>
                    <select id="oz-cur" class="form-input form-select">${currencyOpts}</select>
                </div>
                <div id="oz-error" style="display:none;font-size:13px;color:#dc2626;padding:10px 12px;background:rgba(239,68,68,0.10);border-radius:10px;margin-bottom:14px;"></div>
                <button type="button" class="btn btn-primary btn-block" id="oz-save" style="min-height:48px;font-weight:600">
                    ${escapeHtml(n.confirm)}
                </button>
            </div>
        </div>`);
    const errEl = a.querySelector("#oz-error");
    const showErr = msg => {
        errEl.style.display = msg ? "block" : "none";
        errEl.textContent = msg || "";
    };
    a.querySelector("#oz-save").addEventListener("click", async () => {
        showErr("");
        const identifier = (a.querySelector("#oz-uid").value || "").trim();
        const currency = a.querySelector("#oz-cur").value || "";
        if (!identifier) return showErr(n.required);
        try {
            const res = await fetch(`${CONFIG.apiUrl}/owner/zero-balance`, {
                method: "POST",
                headers: _ownerHeaders(),
                body: JSON.stringify({ identifier, currency: currency || null })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.detail || n.error);
            haptic("success");
            showNotification(n.zeroBalanceOk || "OK", "success");
            closeTopModal();
        } catch (err) {
            haptic("error");
            showErr(String(err.message || n.error));
        }
    });
}

async function showOwnerDealActionModal(kind) {
    const e = state && state.language || "en",
        n = _ownerLabels(e),
        isPay = kind === "pay",
        title = isPay ? (n.payDeal || "Pay deal") : (n.cancelDeal || "Cancel deal"),
        okMsg = isPay ? (n.dealPayOk || "OK") : (n.dealCancelOk || "OK"),
        endpoint = isPay ? "/owner/deal-pay" : "/owner/deal-cancel",
        a = _openOwnerModal(`
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${escapeHtml(title)}</h2>
                <button type="button" class="btn-close" aria-label="${n.close}">${_mi("close", 22)}</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="od-tag">${escapeHtml(n.dealTag || "Deal tag")}</label>
                    <input type="text" id="od-tag" class="form-input" dir="ltr" placeholder="ABCD1234" autocomplete="off" autocapitalize="characters"/>
                </div>
                <div id="od-error" style="display:none;font-size:13px;color:#dc2626;padding:10px 12px;background:rgba(239,68,68,0.10);border-radius:10px;margin-bottom:14px;"></div>
                <button type="button" class="btn btn-primary btn-block" id="od-save" style="min-height:48px;font-weight:600">
                    ${escapeHtml(n.confirm)}
                </button>
            </div>
        </div>`);
    const errEl = a.querySelector("#od-error");
    const showErr = msg => {
        errEl.style.display = msg ? "block" : "none";
        errEl.textContent = msg || "";
    };
    a.querySelector("#od-save").addEventListener("click", async () => {
        showErr("");
        const tag = (a.querySelector("#od-tag").value || "").trim().replace(/^#/, "");
        if (!tag) return showErr(n.required);
        try {
            const res = await fetch(`${CONFIG.apiUrl}${endpoint}`, {
                method: "POST",
                headers: _ownerHeaders(),
                body: JSON.stringify({ tag })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                const d = data.detail;
                throw new Error(typeof d === "string" ? d : (d && d.message) || n.error);
            }
            haptic("success");
            showNotification(okMsg, "success");
            closeTopModal();
        } catch (err) {
            haptic("error");
            showErr(String(err.message || n.error));
        }
    });
}

window.showOwnerSettingsModal = showOwnerSettingsModal;
window.showOwnerEscrowModal = showOwnerEscrowModal;
window.showOwnerWhitelistModal = showOwnerWhitelistModal;
window.showOwnerBroadcastModal = showOwnerBroadcastModal;
window.showOwnerBansModal = showOwnerBansModal;
window.showOwnerBalanceModal = showOwnerBalanceModal;
window.showOwnerZeroBalanceModal = showOwnerZeroBalanceModal;
window.showOwnerDealActionModal = showOwnerDealActionModal;
function _defaultLeadersSeason() {
    return {
        launch_at: "2026-08-01T00:00:00+00:00",
        prize_pool_usd: 5e4,
        total_winners: 100,
        participants_count: 1284,
        first_deal_bonus_usd: 5e3,
        prizes: [{
            place: 1,
            amount_usd: 1e4
        }, {
            place: 2,
            amount_usd: 5e3
        }, {
            place: 3,
            amount_usd: 3e3
        }],
        shared_tiers: [{
            places_from: 4,
            places_to: 10,
            amount_usd: 12e3
        }, {
            places_from: 11,
            places_to: 50,
            amount_usd: 1e4
        }, {
            places_from: 51,
            places_to: 100,
            amount_usd: 1e4,
            random: !0
        }]
    }
}
function _fmtPrizePoolUsd(e) {
    return "$" + Math.round(Number(e) || 0).toLocaleString()
}
function _leadersCountdown(e) {
    const n = new Date(e).getTime();
    let t = Math.max(0, n - Date.now());
    const a = Math.floor(t / 864e5);
    t -= 864e5 * a;
    const o = Math.floor(t / 36e5);
    t -= 36e5 * o;
    const s = Math.floor(t / 6e4);
    return t -= 6e4 * s, {
        days: a,
        hours: o,
        minutes: s,
        seconds: Math.floor(t / 1e3),
        total_ms: n - Date.now()
    }
}
function _fmtPrizeUsd(e) {
    const n = Math.round(Number(e) || 0);
    return n >= 1e3 ? "$" + (n / 1e3).toFixed(n % 1e3 == 0 ? 0 : 1).replace(".0", "") + "K" : "$" + n.toLocaleString()
}

let _lottieLoaderPromise = null;
function _ensureLottie() {
    if (window.lottie)
        return Promise.resolve(window.lottie);
    if (_lottieLoaderPromise)
        return _lottieLoaderPromise;
    _lottieLoaderPromise = new Promise((resolve, reject) => {
        const start = Date.now();
        const tick = () => {
            if (window.lottie)
                return resolve(window.lottie);
            if (Date.now() - start > 2000)
                return reject(new Error("lottie missing"));
            setTimeout(tick, 40)
        };
        tick()
    }).catch(e => {
        _lottieLoaderPromise = null;
        throw e
    });
    return _lottieLoaderPromise
}

async function _loadLeadersManiData() {
    const jsonUrl = "/assets/stickers/Mani.json?v=55";
    const res = await fetch(jsonUrl);
    if (!res.ok)
        throw new Error("mani json " + res.status);
    return await res.json()
}

function _destroyLeadersMani() {
    try {
        if (window._leadersManiFailTimer) {
            clearTimeout(window._leadersManiFailTimer);
            window._leadersManiFailTimer = null
        }
    } catch (e) {}
    try {
        if (window._leadersManiAnim) {
            window._leadersManiAnim.destroy();
            window._leadersManiAnim = null
        }
    } catch (e) {}
}

async function _mountLeadersMani(container) {
    if (!container)
        return;
    _destroyLeadersMani();
    container.classList.remove("is-ready", "is-fallback");
    /* Always visible — never leave opacity:0 waiting for Lottie "ready". */
    let shown = false;
    const reveal = (asFallback) => {
        if (!container.isConnected)
            return;
        if (asFallback)
            container.classList.add("is-fallback");
        else
            container.classList.add("is-ready");
        if (shown)
            return;
        shown = true;
        try {
            if (window._leadersManiFailTimer) {
                clearTimeout(window._leadersManiFailTimer);
                window._leadersManiFailTimer = null
            }
        } catch (e) {}
    };
    window._leadersManiFailTimer = setTimeout(() => {
        try {
            console.warn("[leaders] Lottie not ready in time, forcing fallback")
        } catch (e) {}
        reveal(true)
    }, 2500);
    try {
        const lottieApi = await _ensureLottie();
        const animationData = await _loadLeadersManiData();
        if (!container.isConnected || state.currentPage !== "leaders")
            return;
        const host = container.querySelector(".ld-hero__sticker-anim") || container;
        let anim = null;
        try {
            anim = lottieApi.loadAnimation({
                container: host,
                renderer: "canvas",
                loop: true,
                autoplay: true,
                animationData,
                rendererSettings: {
                    clearCanvas: true,
                    progressiveLoad: true,
                    preserveAspectRatio: "xMidYMid meet"
                }
            })
        } catch (e) {
            try {
                console.error("[leaders] lottie load threw", e)
            } catch (err) {}
            return void reveal(true)
        }
        window._leadersManiAnim = anim;
        try {
            anim.addEventListener("DOMLoaded", () => reveal(false))
        } catch (e) {}
        try {
            anim.addEventListener("data_ready", () => reveal(false))
        } catch (e) {}
        try {
            anim.addEventListener("data_failed", () => {
                try {
                    console.warn("[leaders] lottie data_failed")
                } catch (err) {}
                reveal(true)
            })
        } catch (e) {}
        /* If canvas paints silently, still flip to ready after a short beat. */
        setTimeout(() => {
            if (container.isConnected && !container.classList.contains("is-fallback"))
                reveal(false)
        }, 600)
    } catch (e) {
        try {
            console.warn("[leaders] mani sticker failed", e)
        } catch (err) {}
        reveal(true)
    }
}

function renderLeadersSplash() {
    const e = document.getElementById("page-container");
    if (!e)
        return;
    const a = _defaultLeadersSeason(),
        title = t("leadersTitle") || "Leaders",
        launchLabel = t("leadersSplashLaunchIn") || "Launches in",
        dLabel = t("leadersSplashDays") || "days",
        hLabel = t("leadersSplashHours") || "hours",
        mLabel = t("leadersSplashMinutes") || "minutes",
        sLabel = t("leadersSplashSeconds") || "seconds",
        poolLabel = t("leadersSplashPoolLabel") || "Prize pool",
        howTitle = t("leadersSplashHowTitle") || "How it works",
        randomBadge = t("leadersSplashRandomBadge") || "Random",
        h = a.launch_at,
        cd = _leadersCountdown(h),
        pad = n => String(Math.max(0, n)).padStart(2, "0"),
        prizes = (Array.isArray(a.prizes) ? a.prizes : []).slice(0, 3),
        placeLabel = place => place === 1 ? (t("leadersPrize1st") || "1st") : place === 2 ? (t("leadersPrize2nd") || "2nd") : (t("leadersPrize3rd") || "3rd"),
        prizeHtml = prizes.map(p => `\n                <div class="ld-prize">\n                    <span class="ld-prize__place">${escapeHtml(placeLabel(p.place))}</span>\n                    <span class="ld-prize__amount">${_fmtPrizeUsd(p.amount_usd)}</span>\n                </div>`).join(""),
        tiers = Array.isArray(a.shared_tiers) ? a.shared_tiers : [],
        tiersHtml = tiers.length ? `\n            <section class="ld-card">\n                <h3 class="ld-card__title">${escapeHtml(t("leadersSplashShared") || "Other places")}</h3>\n                <div class="ld-list">\n                    ${tiers.map(row => `\n                    <div class="ld-row${row.random ? " ld-row--muted" : ""}">\n                        <span class="ld-row__left">${row.places_from}–${row.places_to}${row.random ? ` · ${escapeHtml(randomBadge)}` : ""}</span>\n                        <span class="ld-row__right">${_fmtPrizeUsd(row.amount_usd)}</span>\n                    </div>`).join("")}\n                </div>\n            </section>` : "",
        bonusHtml = a.first_deal_bonus_usd ? (() => {
            const amt = _fmtPrizePoolUsd(a.first_deal_bonus_usd);
            return `\n            <section class="ld-card ld-card--accent">\n                <div class="ld-bonus">\n                    <span class="ld-bonus__amount">${amt}</span>\n                    <span class="ld-bonus__badge">${escapeHtml(t("leadersFirstDealBadge") || "Welcome bonus")}</span>\n                </div>\n                <p class="ld-bonus__title">${escapeHtml(t("leadersFirstDealTitle") || "Close your first deal — get a guaranteed share")}</p>\n                <p class="ld-bonus__body">${escapeHtml((t("leadersFirstDealBody") || "{amount} split between everyone with 1+ deal").replace("{amount}", amt))}</p>\n            </section>`
        })() : "",
        howHtml = `\n            <section class="ld-card">\n                <h3 class="ld-card__title">${escapeHtml(howTitle)}</h3>\n                <ol class="ld-steps">\n                    <li class="ld-steps__item">\n                        <span class="ld-steps__n">1</span>\n                        <span class="ld-steps__t">${escapeHtml(t("leadersSplashHow1Title") || "Complete deals")}</span>\n                    </li>\n                    <li class="ld-steps__item">\n                        <span class="ld-steps__n">2</span>\n                        <span class="ld-steps__t">${escapeHtml(t("leadersSplashHow2Title") || "Climb the ranks")}</span>\n                    </li>\n                    <li class="ld-steps__item">\n                        <span class="ld-steps__n">3</span>\n                        <span class="ld-steps__t">${escapeHtml(t("leadersSplashHow3Title") || "Get rewarded")}</span>\n                    </li>\n                </ol>\n            </section>`,
        noteHtml = a.total_winners ? `<p class="ld-note">${escapeHtml((t("leadersSplashWinnersCount") || "{n} winners get rewards").replace("{n}", String(a.total_winners)))}</p>` : "";

    e.innerHTML = `\n        <div class="page leaders-page">\n            <div class="page-header">\n                <h1 class="page-title">${escapeHtml(title)}</h1>\n            </div>\n            <div class="page-content" id="leaders-content">\n                <div class="ld">\n                    <section class="ld-hero">\n                        <div class="ld-hero__sticker" id="ld-mani" aria-hidden="true">
                            <div class="ld-hero__sticker-anim"></div>
                            <img class="ld-hero__sticker-fallback" src="/assets/stickers/Mani.svg?v=55" alt="" decoding="async" loading="eager">
                        </div>\n                        <p class="ld-hero__pool">${_fmtPrizePoolUsd(a.prize_pool_usd || 0)}</p>\n                        <p class="ld-hero__label">${escapeHtml(poolLabel)}</p>\n                        <p class="ld-hero__sub">${escapeHtml(t("leadersSplashSubtitle") || "Win prizes")}</p>\n                    </section>\n\n                    <section class="ld-card ld-card--timer">\n                        <p class="ld-timer__label">${escapeHtml(launchLabel)}</p>\n                        <div class="ld-timer" id="leaders-cd">\n                            <div class="ld-timer__unit">\n                                <span class="ld-timer__num" data-cd="days">${pad(cd.days)}</span>\n                                <span class="ld-timer__cap">${escapeHtml(dLabel)}</span>\n                            </div>\n                            <span class="ld-timer__sep" aria-hidden="true">:</span>\n                            <div class="ld-timer__unit">\n                                <span class="ld-timer__num" data-cd="hours">${pad(cd.hours)}</span>\n                                <span class="ld-timer__cap">${escapeHtml(hLabel)}</span>\n                            </div>\n                            <span class="ld-timer__sep" aria-hidden="true">:</span>\n                            <div class="ld-timer__unit">\n                                <span class="ld-timer__num" data-cd="minutes">${pad(cd.minutes)}</span>\n                                <span class="ld-timer__cap">${escapeHtml(mLabel)}</span>\n                            </div>\n                            <span class="ld-timer__sep" aria-hidden="true">:</span>\n                            <div class="ld-timer__unit">\n                                <span class="ld-timer__num" data-cd="seconds">${pad(cd.seconds)}</span>\n                                <span class="ld-timer__cap">${escapeHtml(sLabel)}</span>\n                            </div>\n                        </div>\n                    </section>\n\n                    <section class="ld-card">\n                        <h3 class="ld-card__title">${escapeHtml(t("leadersSplashPlacesLabel") || "Top places")}</h3>\n                        <div class="ld-prizes">\n                            ${prizeHtml}\n                        </div>\n                    </section>\n\n                    ${bonusHtml}\n                    ${tiersHtml}\n                    ${howHtml}\n                    ${noteHtml}\n                </div>\n            </div>\n        </div>`;

    window._leadersCdInterval && clearInterval(window._leadersCdInterval);
    const cdRoot = document.getElementById("leaders-cd");
    if (!cdRoot)
        return;
    const nodes = {
        days: cdRoot.querySelector('[data-cd="days"]'),
        hours: cdRoot.querySelector('[data-cd="hours"]'),
        minutes: cdRoot.querySelector('[data-cd="minutes"]'),
        seconds: cdRoot.querySelector('[data-cd="seconds"]')
    };
    const paintCd = () => {
        if (state.currentPage !== "leaders" || !document.getElementById("leaders-cd")) {
            clearInterval(window._leadersCdInterval),
            window._leadersCdInterval = null;
            return
        }
        const n = _leadersCountdown(h);
        const set = (el, val) => {
            if (!el) return;
            const o = pad(val);
            if (el.textContent !== o) el.textContent = o
        };
        set(nodes.days, n.days),
        set(nodes.hours, n.hours),
        set(nodes.minutes, n.minutes),
        set(nodes.seconds, n.seconds)
    };
    window._leadersCdInterval = setInterval(paintCd, 1000);
    _mountLeadersMani(document.getElementById("ld-mani"))
}
function renderLeadersPage() {
    return renderLeadersSplash()
}
function renderButton2Page() {
    return renderLeadersPage()
}

function showCurrencyActions(e, n) {
    haptic("light");
    const t = state.language || "en",
        a = (e, n, a, o, s) => _i18nPick(t, e, n, a, o, s),
        o = Number(n) || 0,
        s = document.createElement("div");
    s.className = "modal-overlay active",
    s.onclick = closeModalOnBackdrop,
    s.innerHTML = `\n        <div class="modal-content">\n            <div class="modal-header">\n                <h2 class="modal-title">${e}</h2>\n                <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                </button>\n            </div>\n            <div class="modal-body">\n                <div class="info-card" style="margin-bottom:18px;text-align:center">\n                    <div style="font-size:13px;color:var(--text-secondary);margin-bottom:6px">${a("Текущий баланс", "Current balance")}</div>\n                    <div style="font-size:28px;font-weight:700">${o.toFixed(2)} ${e}</div>\n                </div>\n                <div class="action-stack">\n                    <button class="btn btn-primary btn-block" data-act="deposit">\n                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>\n                        ${a("Пополнить", "Top up")}\n                    </button>\n                    <button class="btn btn-secondary btn-block" data-act="withdraw">\n                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>\n                        ${a("Вывести", "Withdraw")}\n                    </button>\n                </div>\n            </div>\n        </div>\n    `,
    document.body.appendChild(s),
    s.querySelector('[data-act="deposit"]').addEventListener("click", () => {
        closeTopModal(),
        setTimeout(() => showDepositModal(e), 220)
    }),
    s.querySelector('[data-act="withdraw"]').addEventListener("click", () => {
        closeTopModal(),
        setTimeout(() => showWithdrawModal(e, o), 220)
    })
}
function editBalance(e) {
    showCurrencyActions(e, state.user.balance[e] || 0)
}
async function showTransactionsPage() {
    haptic("light");
    const e = document.getElementById("transactions-page-template").content.cloneNode(!0),
        n = document.createElement("div");
    n.className = "transactions-overlay",
    n.appendChild(e),
    document.body.appendChild(n),
    requestAnimationFrame(() => n.classList.add("active"));
    const t = n.querySelector(".btn-back");
    t && (t.style.display = "none");
    window.FunpayTG && FunpayTG.isMiniApp ? FunpayTG.pushBack(() => {
        window.FunpayTG && FunpayTG.popBack(),
        closeTransactionsPage()
    }) : t && (t.style.display = "", t.onclick = e => {
        e.preventDefault(),
        closeTransactionsPage()
    }),
    await loadTransactions()
}
function closeTransactionsPage() {
    haptic("light");
    const e = document.querySelector(".transactions-overlay");
    if (e && (e.classList.remove("active"), setTimeout(() => e.remove(), 300), window.FunpayTG && FunpayTG.sdk && FunpayTG.sdk.BackButton && FunpayTG.sdk.BackButton.isVisible))
        try {
            FunpayTG.popBack()
        } catch (e) {}
}

/* ==================== ОТЗЫВЫ О СДЕЛКАХ ==================== */
function showReviewsPage() {
    haptic("light");
    const theme = document.documentElement.getAttribute("data-theme") || localStorage.getItem("app_theme") || "light";
    const lang = (state && state.language) || localStorage.getItem("app_language") || "ru";
    // Full page — iframe/postMessage breaks in Telegram WebView on mobile.
    window.location.href = `reviews/index.html?theme=${encodeURIComponent(theme)}&lang=${encodeURIComponent(lang)}&v=62`;
}

function closeReviewsPage() {
    haptic("light");
    const e = document.querySelector(".reviews-overlay");
    if (!e)
        return;
    e._onReviewsMsg && window.removeEventListener("message", e._onReviewsMsg),
    e.classList.remove("active"),
    setTimeout(() => e.remove(), 280);
    try {
        window.FunpayTG && FunpayTG.popBack && FunpayTG.popBack()
    } catch (e) {}
}

function _notifyReviewsFrame() {}
function _showCancelWithdrawConfirm(e, n, t) {
    return new Promise(a => {
        const o = t || {},
            s = void 0 !== state && state && state.language || "en",
            i = {
                ru: "Отмена",
                en: "Cancel",
                uk: "Скасувати",
                ar: "إلغاء",
                zh: "取消"
            },
            r = {
                ru: "OK",
                en: "OK",
                uk: "OK",
                ar: "موافق",
                zh: "确定"
            },
            l = o.cancelLabel || i[s] || i.en,
            c = o.confirmLabel || r[s] || r.en,
            d = document.createElement("div");
        d.className = "modal-overlay active",
        d.style.zIndex = "10010",
        d.innerHTML = `\n            <div class="modal-content" style="max-width:420px">\n                <div class="modal-header">\n                    <h2 class="modal-title">${escapeHtml(e)}</h2>\n                    <button class="btn-close" type="button" aria-label="close">\n                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                    </button>\n                </div>\n                <div class="modal-body">\n                    <div style="padding:6px 0 14px;font-size:14px;line-height:1.55;color:var(--text-secondary)">\n                        ${escapeHtml(n)}\n                    </div>\n                    <div class="modal-actions">\n                        <button type="button" class="btn btn-secondary" data-act="keep">${escapeHtml(l)}</button>\n                        <button type="button" class="btn btn-primary" data-act="confirm"\n                                style="background:#dc2626;border-color:#dc2626">${escapeHtml(c)}</button>\n                    </div>\n                </div>\n            </div>`;
        const p = e => {
            d.classList.remove("active"),
            setTimeout(() => d.remove(), 200),
            a(e)
        };
        d.addEventListener("click", e => {
            if (e.target === d)
                return p(!1);
            const n = e.target.closest("button");
            return n ? n.classList.contains("btn-close") || "keep" === n.dataset.act ? p(!1) : "confirm" === n.dataset.act ? p(!0) : void 0 : void 0
        }),
        document.body.appendChild(d)
    })
}
async function loadTransactions() {
    const e = document.getElementById("transactions-list"),
        n = state.language || "en",
        t = (e, t, a, o, s) => _i18nPick(n, e, t, a, o, s);
    try {
        const a = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/transactions`),
            o = (a.ok ? (await a.json()).transactions : []) || [];
        if (o.forEach(e => {
            e.timestamp = e.timestamp || e.created_at,
            e.amount = Number(e.amount || 0)
        }), 0 === o.length)
            return void (e.innerHTML = `\n                <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">\n                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 16px; opacity: 0.3;">\n                        <circle cx="12" cy="12" r="10"></circle>\n                        <line x1="12" y1="8" x2="12" y2="12"></line>\n                        <line x1="12" y1="16" x2="12.01" y2="16"></line>\n                    </svg>\n                    <p style="font-size: 16px; margin: 0;">${t("Транзакций пока нет", "No transactions yet")}</p>\n                </div>\n            `);
        const s = o.sort((e, n) => new Date(n.timestamp) - new Date(e.timestamp)),
            i = {
                deal_pay: "M12 3v3M12 18v3M5.5 8.5l2.1 2.1M16.4 13.4l2.1 2.1M3 12h3M18 12h3M5.5 15.5l2.1-2.1M16.4 10.6l2.1-2.1M9 9h6v6H9z",
                deal_receive: "M19 12l-7 7-7-7M12 19V5",
                deal_refund: "M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z",
                admin_credit: "M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z",
                withdrawal_pending: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
                withdrawal_approved: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
                withdrawal_rejected: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z",
                withdrawal_cancelled: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z",
                withdrawal_legacy: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            },
            r = (e, n) => {
                const t = i[e] || (e && e.startsWith("withdrawal_") ? i.withdrawal_pending : "");
                return t ? `<svg viewBox="0 0 24 24" fill="currentColor" width="${n || 18}" height="${n || 18}" aria-hidden="true"><path d="${t}"/></svg>` : ""
            };
        e.innerHTML = s.map(e => {
            const a = "credit" === e.type,
                o = a ? "+" : "−",
                s = (e.kind || "").startsWith("withdrawal_"),
                i = e.status || (s ? (e.kind || "").split("_")[1] : null);
            let l = a ? "tx-deposit" : "tx-withdrawal";
            "rejected" === i || "cancelled" === i ? l = "tx-cancelled" : "pending" === i && (l = "tx-pending");
            const c = {
                    deal_pay: t("Оплата сделки", "Deal payment", "Оплата угоди", "دفع الصفقة", "交易付款"),
                    deal_receive: t("Получено по сделке", "Deal received", "Отримано", "تم استلام الصفقة", "交易已收"),
                    deal_refund: t("Возврат по сделке", "Deal refund", "Повернення", "استرداد الصفقة", "交易退款"),
                    admin_credit: t("Зачисление", "Top-up", "Зарахування", "إيداع", "充值"),
                    topup: t("Зачисление", "Top-up", "Зарахування", "إيداع", "充值"),
                    deposit: t("Пополнение", "Deposit", "Поповнення", "إيداع", "存款"),
                    withdrawal_pending: t("Вывод", "Withdrawal", "Виведення", "سحب", "提现"),
                    withdrawal_approved: t("Вывод", "Withdrawal", "Виведення", "سحب", "提现"),
                    withdrawal_rejected: t("Вывод", "Withdrawal", "Виведення", "سحب", "提现"),
                    withdrawal_cancelled: t("Вывод", "Withdrawal", "Виведення", "سحب", "提现"),
                    withdrawal_legacy: t("Вывод", "Withdrawal", "Виведення", "سحب", "提现"),
                    withdrawal_refund: t("Возврат", "Refund", "Повернення", "استرداد", "退款"),
                    deposit_ton: t("Пополнение TON", "TON deposit", "Поповнення TON", "إيداع TON", "TON 充值")
                }[e.kind] || (a ? t("Зачисление", "Credit", "Зарахування", "رصيد", "入账") : t("Списание", "Debit", "Списання", "خصم", "扣款")),
                d = _parseDealTs(e.timestamp) || _parseDealTs(e.decided_at) || _parseDealTs(e.created_at) || new Date(e.timestamp),
                p = "function" == typeof _intlLocale ? _intlLocale(n) : "en-US",
                u = d.toLocaleDateString(p, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }),
                h = d.toLocaleTimeString(p, {
                    hour: "2-digit",
                    minute: "2-digit"
                }),
                m = e.currency || "RUB",
                v = window.FunpayIcons ? FunpayIcons.currencyIcon(m, 36) : `<div class="tx-currency-icon">${m.substring(0, 1)}</div>`;
            let w = "";
            if (s && i && "legacy" !== i) {
                const e = {
                        pending: t("ОЖИДАНИЕ", "PENDING", "ОЧІКУВАННЯ", "قيد الانتظار", "待处理"),
                        approved: t("ОДОБРЕНО", "APPROVED", "СХВАЛЕНО", "تمت الموافقة", "已批准"),
                        rejected: t("ОТКЛОНЕНО", "REJECTED", "ВІДХИЛЕНО", "مرفوض", "已拒绝"),
                        cancelled: t("ОТМЕНЕНО", "CANCELLED", "СКАСОВАНО", "مُلغى", "已取消")
                    },
                    n = {
                        pending: ["#f59e0b", "rgba(245,158,11,0.12)"],
                        approved: ["#16a34a", "rgba(34,197,94,0.12)"],
                        rejected: ["#dc2626", "rgba(239,68,68,0.12)"],
                        cancelled: ["#6b7280", "rgba(107,114,128,0.12)"]
                    },
                    [a, o] = n[i] || ["var(--text-secondary)", "transparent"];
                w = `<span class="tx-status" style="\n                    display:inline-flex;align-items:center;gap:4px;\n                    font-size:10px;font-weight:600;letter-spacing:0.4px;\n                    padding:3px 7px;border-radius:6px;margin-left:6px;\n                    color:${a};background:${o}">${r(`withdrawal_${i}`, 11)}${e[i] || i.toUpperCase()}</span>`
            }
            const y = a ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>',
                f = s && "pending" === i && e.withdrawal_id ? `\n                <button class="tx-cancel-btn" data-wid="${escapeHtml(e.withdrawal_id)}"\n                        style="margin-left:8px;padding:6px 10px;border:1px solid var(--border-color, #e5e7eb);\n                               background:transparent;border-radius:8px;font-size:12px;font-weight:500;\n                               color:var(--text-secondary);cursor:pointer;display:inline-flex;align-items:center;gap:4px">\n                    ${_mi ? _mi("close", 13) : "✕"} <span>${t("Отменить", "Cancel", "Скасувати", "إلغاء", "取消")}</span>\n                </button>` : "",
                b = "rejected" === i && e.reason ? `\n                <div class="tx-reason-block" style="\n                    margin-top:8px;\n                    padding:8px 10px 8px 12px;\n                    border-radius:10px;\n                    background:rgba(239,68,68,0.07);\n                    border-left:3px solid #dc2626;\n                    box-shadow:0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(220,38,38,0.07);\n                    font-size:12.5px;\n                    line-height:1.45;\n                    color:#b91c1c;\n                    overflow-wrap:anywhere;\n                    word-break:break-word;\n                    max-width:100%;\n                ">\n                    <span style="font-weight:600;letter-spacing:0.2px;margin-right:4px">${t("Причина:", "Reason:", "Причина:", "السبب:", "原因：")}</span><span style="font-weight:500">${escapeHtml(e.reason)}</span>\n                </div>` : "",
                g = s && e.destination ? `<div class="tx-dest" style="font-size:11px;color:var(--text-secondary);margin-top:2px;font-family:monospace">${escapeHtml(String(e.destination).slice(0, 32))}${String(e.destination).length > 32 ? "…" : ""}</div>` : "";
            return `\n                <div class="transaction-item ${l}" data-currency="${m}">\n                    <div class="tx-icon-wrapper">\n                        ${v}\n                        <span class="tx-arrow ${l}">${y}</span>\n                    </div>\n                    <div class="tx-details">\n                        <div class="tx-type">${c}${w}</div>\n                        <div class="tx-date">${u} ${t("в", "at", "о", "في", "于")} ${h}</div>\n                        ${g}\n                        ${b}\n                        ${e.tx_hash ? `<div class="tx-hash">${e.tx_hash.substring(0, 20)}...</div>` : ""}\n                        ${e.partner ? `<div class="tx-partner">@${e.partner}</div>` : ""}\n                    </div>\n                    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">\n                        <div class="tx-amount ${l}">\n                            ${o}${e.amount.toFixed(2)} ${m}\n                        </div>\n                        ${f}\n                    </div>\n                </div>\n            `
        }).join(""),
        e.dataset.cancelWired || (e.dataset.cancelWired = "1", e.addEventListener("click", async e => {
            const n = e.target.closest(".tx-cancel-btn");
            if (!n)
                return;
            e.preventDefault(),
            e.stopPropagation();
            const a = n.dataset.wid;
            if (!a)
                return;
            if (n.disabled)
                return;
            const o = t("Отменить заявку на вывод?", "Cancel this withdrawal request?"),
                s = t("Средства останутся на вашем балансе. Вы сможете подать заявку заново в любой момент.", "Your funds will stay on your balance. You can submit a new request whenever you want.");
            if (await _showCancelWithdrawConfirm(o, s, {
                confirmLabel: t("Да, отменить", "Yes, cancel"),
                cancelLabel: t("Не отменять", "Keep it")
            })) {
                (window.haptic || (() => {}))("light"),
                n.disabled = !0;
                try {
                    const e = await apiFetch(`${CONFIG.apiUrl}/user/withdraw/cancel`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            withdrawal_id: a
                        })
                    });
                    if (!e.ok) {
                        let n = "";
                        try {
                            n = (await e.json()).detail || ""
                        } catch (e) {}
                        throw new Error(n || `HTTP ${e.status}`)
                    }
                    (window.haptic || (() => {}))("success"),
                    showNotification(t("Заявка отменена", "Request cancelled"), "success"),
                    loadTransactions()
                } catch (e) {
                    (window.haptic || (() => {}))("error"),
                    showNotification(String(e.message || e), "error"),
                    n.disabled = !1
                }
            }
        }))
    } catch (n) {
        e.innerHTML = '\n            <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">\n                <p>Ошибка загрузки транзакций</p>\n            </div>\n        '
    }
}
function showLanguageSelector(e=!1) {
    haptic("light");
    const n = document.getElementById("language-btn");
    if (n) {
        const e = n.querySelector(".language-icon");
        e && (e.style.transition = "transform 0.3s ease", e.style.transform = "rotate(180deg)", setTimeout(() => {
            e.style.transform = "rotate(0deg)"
        }, 300))
    }
    const a = state.language || "ru",
        o = document.createElement("div");
    o.className = "modal-overlay active",
    o.onclick = closeModalOnBackdrop;
    const s = e ? "Выберите язык / Choose Language / Оберіть мову / 选择语言 / اختر اللغة" : t("language"),
        i = Object.entries(LANGUAGES).map(([e, n]) => `\n        <div class="language-item ${a === e ? "active" : ""}" onclick="selectLanguage('${e}')">\n            <span class="language-name-centered">${n.name}</span>\n            ${a === e ? '\n                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="language-check">\n                    <polyline points="20 6 9 17 4 12"></polyline>\n                </svg>\n            ' : ""}\n        </div>\n    `).join("");
    o.innerHTML = `\n        <div class="modal-content language-modal">\n            <div class="modal-header">\n                <h2 class="modal-title">${s}</h2>\n                ${e ? "" : '\n                    <button class="btn-close" onclick="(window.haptic||function(){})(\'light\');this.closest(\'.modal-overlay\').remove()">\n                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                            <path d="M18 6L6 18M6 6l12 12"/>\n                        </svg>\n                    </button>\n                '}\n            </div>\n            <div class="modal-body">\n                <div class="language-list">\n                    ${i}\n                </div>\n            </div>\n        </div>\n    `,
    document.body.appendChild(o)
}
async function selectLanguage(e) {
    haptic("success"),
    state.language = e,
    localStorage.setItem("app_language", e),
    state.user && state.user.id && apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/language`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            language: e
        })
    }).catch(e => {});
    const n = document.querySelector(".modal-overlay");
    n && n.remove(),
    document.documentElement.lang = e,
    document.documentElement.dir = "function" == typeof getTextDirection ? getTextDirection() : "ltr",
    "function" == typeof translateStaticElements && translateStaticElements(),
    "function" == typeof translatePage && translatePage(),
    "function" == typeof loadPage && loadPage(state.currentPage),
    "function" == typeof repositionTabIndicator && repositionTabIndicator(),
    _notifyReviewsFrame({ type: "reviews-lang", lang: e }),
    LANGUAGES[e] && showNotification(`${LANGUAGES[e].name} ✓`, "success")
}
async function confirmCardDeposit(e) {
    haptic("error");
    showNotification(t("nCreateRequestError") || "Пополнение временно недоступно (заглушка)", "error");
}
function copyToClipboard(e) {
    haptic("light"),
    navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(e).then(() => {
        showNotification(t("nCopied"), "success")
    }).catch(n => {
        fallbackCopy(e)
    }) : fallbackCopy(e)
}
function fallbackCopy(e) {
    const n = document.createElement("textarea");
    n.value = e,
    n.style.position = "fixed",
    n.style.left = "-999999px",
    document.body.appendChild(n),
    n.focus(),
    n.select();
    try {
        document.execCommand("copy"),
        showNotification(t("nCopied"), "success")
    } catch (e) {
        showNotification(t("nCouldNotCopy"), "error")
    }
    document.body.removeChild(n)
}
async function createStarsInvoice() {
    haptic("error");
    showNotification("Пополнение Stars временно недоступно (заглушка)", "error");
}
async function showDepositModal(e="TON") {
    haptic("light");
    const n = document.createElement("div");
    n.className = "modal-overlay active",
    n.onclick = closeModalOnBackdrop;
    const a = state.language || "en",
        o = (e, n, t, o, s) => _i18nPick(a, e, n, t, o, s);
    if ("TON" === e)
        n.innerHTML = `\n            <div class="modal-content">\n                <div class="modal-header">\n                    <h2 class="modal-title">${t("depositTon")}</h2>\n                    <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                            <path d="M18 6L6 18M6 6l12 12"/>\n                        </svg>\n                    </button>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label>${t("tonAmount")}</label>\n                        <input type="number" id="ton-amount-input" class="form-control"\n                               placeholder="${currencyMin("TON")}.00"\n                               min="${currencyMin("TON")}" step="0.01"\n                               value="${currencyMin("TON")}">\n                        <small class="form-text">${t("minLabel")}: ${currencyMin("TON")} TON</small>\n                    </div>\n                    <button class="btn btn-primary btn-block" onclick="sendDepositTransaction()" style="margin-top: 16px;">\n                        ${t("send")}\n                    </button>\n                </div>\n            </div>\n        `,
        document.body.appendChild(n),
        setTimeout(() => {
            document.getElementById("ton-amount-input").focus()
        }, 100);
    else if ("STARS" === e)
        n.innerHTML = `\n            <div class="modal-content">\n                <div class="modal-header">\n                    <h2 class="modal-title">Пополнить ⭐ Stars</h2>\n                    <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                            <path d="M18 6L6 18M6 6l12 12"/>\n                        </svg>\n                    </button>\n                </div>\n                <div class="modal-body">\n                    <div class="info-card" style="margin-bottom: 16px; text-align: center;">\n                        <div style="font-size: 48px; margin-bottom: 8px;">⭐</div>\n                        <div style="font-size: 14px; color: var(--text-secondary);">Пополнение через Telegram Stars</div>\n                    </div>\n                    \n                    <div class="form-group">\n                        <label>${t("starsAmountLabel")}</label>\n                        <input type="number" id="stars-amount-input" class="form-control"\n                               placeholder="${currencyMin("STARS")}" min="${currencyMin("STARS")}"\n                               step="1" value="${currencyMin("STARS")}">\n                        <small class="form-text">${t("minLabel")}: ${currencyMin("STARS")} ⭐</small>\n                    </div>\n                    \n                    <button class="btn btn-primary btn-block" onclick="createStarsInvoice()" style="margin-top: 16px;">\n                        Оплатить Stars\n                    </button>\n                </div>\n            </div>\n        `,
        document.body.appendChild(n),
        setTimeout(() => {
            document.getElementById("stars-amount-input").focus()
        }, 100);
    else if ("USDT" === e) {
        const e = state.language || "en",
            t = (n, t, a, o, s) => _i18nPick(e, n, t, a, o, s);
        try {
            if (!state.T) {
                const e = await fetch(`${CONFIG.apiUrl.replace(/\/api$/, "")}/api/config`);
                e.ok && (state.T = await e.json())
            }
        } catch (e) {}
        const a = state.T && state.T.usdt_networks || {},
            o = [{
                id: "trc20",
                label: "TRC20",
                addr: a.trc20 || "",
                warn: t("Только USDT TRC20 (Tron).", "TRC20 (Tron) only.", "Лише USDT TRC20 (Tron).", "USDT TRC20 (Tron) فقط.", "仅限 USDT TRC20 (Tron)。")
            }, {
                id: "bep20",
                label: "BEP20",
                addr: a.bep20 || "",
                warn: t("Только USDT BEP20 (BSC).", "BEP20 (BSC) only.", "Лише USDT BEP20 (BSC).", "USDT BEP20 (BSC) فقط.", "仅限 USDT BEP20 (BSC)。")
            }, {
                id: "ton",
                label: "TON",
                addr: a.ton || "",
                warn: t("Только USDT в сети TON.", "USDT on TON only.", "Лише USDT у мережі TON.", "USDT على شبكة TON فقط.", "仅限 TON 网络上的 USDT。")
            }],
            s = t("Не настроен", "Not configured", "Не налаштовано", "غير مُهيأ", "未配置"),
            i = `fp${state.user && state.user.id}`;
        n.innerHTML = `\n            <div class="modal-content">\n                <div class="modal-header">\n                    <h2 class="modal-title">${t("Пополнить", "Top up", "Поповнити", "إيداع", "充值")} USDT</h2>\n                    <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                    </button>\n                </div>\n                <div class="modal-body">\n                    <div class="form-group">\n                        <label>${t("Сеть", "Network", "Мережа", "الشبكة", "网络")}</label>\n                        <div class="net-strip">\n                            ${o.map((e, n) => `\n                                <button type="button" class="net-chip ${0 === n ? "active" : ""}" data-net="${e.id}">\n                                    <span class="net-name">${escapeHtml(e.label)}</span>\n                                </button>`).join("")}\n                        </div>\n                    </div>\n                    <div class="info-card" style="margin-bottom:14px">\n                        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:6px" id="dep-addr-label">\n                            ${t("Адрес для пополнения", "Deposit address", "Адреса для поповнення", "عنوان الإيداع", "充值地址")} (${escapeHtml(o[0].label)}):\n                        </div>\n                        <div style="display:flex;align-items:center;gap:10px;background:var(--overlay-1);padding:12px;border-radius:10px">\n                            <code style="flex:1;font-size:13px;word-break:break-all" id="usdt-address">${escapeHtml(o[0].addr || s)}</code>\n                            <button class="btn-icon copy-btn" type="button" data-clip="${escapeHtml(o[0].addr || "")}" aria-label="copy">\n                                ${_mi("content_copy", 18)}\n                            </button>\n                        </div>\n                        <small class="form-text" id="dep-warn" style="margin-top:8px">${o[0].warn}</small>\n                    </div>\n\n                    \x3c!-- Per-user MEMO card — the "how do we know it's\n                         your deposit" identifier. Lives in its own\n                         emphasised block with a bright warning so the\n                         user does not skip including it. Icons via the\n                         Material Symbols inline-SVG helper (_mi) so\n                         the whole block matches the owner-panel and\n                         transaction-history visual system. --\x3e\n                    <div class="info-card" style="margin-bottom:14px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.30);border-radius:12px;padding:12px 14px">\n                        <div style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#b45309;margin-bottom:6px">\n                            <span style="display:inline-flex;align-items:center;color:#b45309">${_mi("local_offer", 18)}</span>\n                            <span>${t("Ваш комментарий к переводу", "Your transfer comment / memo", "Ваш коментар до переказу", "تعليق التحويل / المذكرة", "您的转账留言 / 备注")}</span>\n                        </div>\n                        <div style="display:flex;align-items:center;gap:10px;background:var(--bg);padding:10px 12px;border-radius:8px">\n                            <code style="flex:1;font-size:15px;font-weight:700;letter-spacing:0.5px" id="usdt-memo">${escapeHtml(i)}</code>\n                            <button class="btn-icon copy-btn" type="button" data-clip="${escapeHtml(i)}" aria-label="copy memo">\n                                ${_mi("content_copy", 18)}\n                            </button>\n                        </div>\n                        <div style="display:flex;align-items:flex-start;gap:6px;margin-top:8px;font-size:12px;line-height:1.45;color:#92400e">\n                            <span style="display:inline-flex;align-items:center;flex-shrink:0;color:#b45309;margin-top:1px">${_mi("warning", 14)}</span>\n                            <span>\n                                ${t("Обязательно укажите этот комментарий при переводе — иначе средства невозможно идентифицировать.", "You MUST include this comment in your transfer — otherwise we can’t identify the sender.", "Обов’язково вкажіть цей коментар при переказі — інакше неможливо буде ідентифікувати.", "يجب تضمين هذا التعليق في تحويلك — وإلا لا يمكن تحديد المرسل.", "转账时必须包含此备注 — 否则我们无法识别发送者。")}\n                            </span>\n                        </div>\n                    </div>\n\n                    \x3c!-- Amount input + "I sent" submit. After sending\n                         the transfer the user comes back here, types\n                         the amount they sent, and submits a claim. The\n                         owner sees a pending claim in the log channel\n                         and approves/rejects after verifying on-chain. --\x3e\n                    <div class="form-group">\n                        <label>${t("Сколько вы отправили", "Amount you sent", "Скільки ви відправили", "المبلغ الذي أرسلته", "您发送的金额")} (USDT)</label>\n                        <input type="number" id="usdt-claim-amt" class="form-control" min="1" step="0.01" placeholder="50.00">\n                        <small class="form-text">${t("Минимум", "Minimum", "Мінімум", "الحد الأدنى", "最低")}: 1 USDT</small>\n                    </div>\n                    <div class="form-group">\n                        <label>${t("Tx hash (необязательно)", "Tx hash (optional)", "Tx hash (необов’язково)", "رمز المعاملة (اختياري)", "交易哈希（可选）")}</label>\n                        <input type="text" id="usdt-claim-tx" class="form-control" placeholder="0x… / T…" autocomplete="off" spellcheck="false">\n                    </div>\n                    <div class="modal-actions">\n                        <button class="btn btn-secondary" type="button" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                            ${t("Закрыть", "Close", "Закрити", "إغلاق", "关闭")}\n                        </button>\n                        <button class="btn btn-primary" type="button" id="usdt-claim-submit" style="display:inline-flex;align-items:center;justify-content:center;gap:6px">\n                            ${_mi("paid", 18)}\n                            <span>${t("Я отправил", "I sent", "Я надіслав", "لقد أرسلت", "我已发送")}</span>\n                        </button>\n                    </div>\n                </div>\n            </div>\n        `,
        document.body.appendChild(n);
        const r = n.querySelector("#usdt-address"),
            l = n.querySelector("#dep-addr-label"),
            c = n.querySelector("#dep-warn"),
            d = n.querySelector(".copy-btn");
        n.dataset.usdtNetwork = o[0].id,
        n.querySelectorAll(".net-chip").forEach(e => {
            e.addEventListener("click", () => {
                haptic("selection"),
                n.querySelectorAll(".net-chip").forEach(e => e.classList.remove("active")),
                e.classList.add("active");
                const a = o.find(n => n.id === e.dataset.net);
                a && (n.dataset.usdtNetwork = a.id, l.textContent = `${t("Адрес для пополнения", "Deposit address", "Адреса для поповнення", "عنوان الإيداع", "充值地址")} (${a.label}):`, r.textContent = a.addr || s, d && (d.dataset.clip = a.addr || ""), c.textContent = a.warn)
            })
        });
        const p = n.querySelector("#usdt-claim-submit");
        p.addEventListener("click", async () => {
            haptic("medium");
            const e = n.querySelector("#usdt-claim-amt"),
                a = n.querySelector("#usdt-claim-tx"),
                o = parseFloat(e.value);
            if (!o || o < 1)
                return void showNotification(t("Введите сумму (минимум 1 USDT)", "Enter the amount (min 1 USDT)", "Введіть суму (мін 1 USDT)", "أدخل المبلغ (1 USDT كحد أدنى)", "请输入金额（最低 1 USDT）"), "error");
            const s = n.dataset.usdtNetwork || "trc20",
                i = (a.value || "").trim();
            p.disabled = !0;
            try {
                const e = await apiFetch(`${CONFIG.apiUrl}/user/usdt/deposit-claim`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        network: s,
                        amount: o,
                        tx_hash: i
                    })
                });
                if (!e.ok) {
                    let n = "";
                    try {
                        n = (await e.json()).detail || ""
                    } catch (e) {}
                    throw new Error(n || `HTTP ${e.status}`)
                }
                haptic("success"),
                showNotification(t("Заявка отправлена. После проверки администратором баланс будет зачислен.", "Claim submitted. Your balance will credit after admin verification.", "Заявку надіслано. Після перевірки адміністратором баланс буде зараховано.", "تم إرسال الطلب. سيتم إيداع رصيدك بعد تحقق المسؤول.", "请求已提交。管理员核实后将存入您的余额。"), "success", {
                    iconHtml: _mi("check_circle", 20)
                });
                try {
                    n.remove()
                } catch (e) {}
                setTimeout(() => {
                    "function" == typeof loadTransactions && loadTransactions()
                }, 400)
            } catch (e) {
                haptic("error"),
                showNotification(String(e && e.message || e), "error"),
                p.disabled = !1
            }
        })
    } else {
        let a = "";
        try {
            if (!state.C) {
                const e = await fetch(`${CONFIG.apiUrl.replace(/\/api$/, "")}/api/config`);
                if (e.ok) {
                    const n = await e.json();
                    state.C = n.deposit_cards || {}
                }
            }
            a = state.C && state.C[e] || ""
        } catch (e) {
            a = ""
        }
        a || (a = "RUB" === e ? "2202208544180481" : "4937243010671153");
        const s = o(`Пополнить ${e}`, `Top up ${e}`, `Поповнити ${e}`, `إيداع ${e}`, `充值 ${e}`);
        n.innerHTML = `\n            <div class="modal-content">\n                <div class="modal-header">\n                    <h2 class="modal-title">${escapeHtml(s)}</h2>\n                    <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                            <path d="M18 6L6 18M6 6l12 12"/>\n                        </svg>\n                    </button>\n                </div>\n                <div class="modal-body">\n                    <div class="info-card" style="margin-bottom: 16px;">\n                        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">${o("Номер карты для пополнения:", "Card number for the top-up:", "Номер картки для поповнення:", "رقم البطاقة للإيداع:", "充值的银行卡号：")}</div>\n                        <div style="display: flex; align-items: center; gap: 8px; background: var(--secondary-bg); padding: 12px; border-radius: 8px;">\n                            <code style="flex: 1; font-size: 16px; font-weight: 600; letter-spacing: 2px;" id="card-number">${escapeHtml(a)}</code>\n                            <button class="btn-icon copy-btn" data-clip="${escapeHtml(a)}" style="flex-shrink: 0;">\n                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>\n                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>\n                                </svg>\n                            </button>\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <label>${t("amountLabel3")} ${e}</label>\n                        <input type="number" id="deposit-amount-input" class="form-control"\n                               placeholder="${currencyMin(e)}.00" min="${currencyMin(e)}" step="0.01">\n                        <small class="form-text">${t("minLabel")}: ${currencyMin(e)} ${e}</small>\n                    </div>\n\n                    <div class="form-group">\n                        <label>${o("Комментарий к переводу (необязательно)", "Transfer comment (optional)", "Коментар до переказу (не обов’язково)", "تعليق على التحويل (اختياري)", "转账留言（可选）")}</label>\n                        <input type="text" id="deposit-comment-input" class="form-control" placeholder="${o("Ваш комментарий", "Your comment", "Ваш коментар", "تعليقك", "您的留言")}">\n                    </div>\n\n                    <div style="display: flex; gap: 8px; margin-top: 20px;">\n                        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove();" style="flex: 1;">\n                            ${o("Отменить", "Cancel", "Скасувати", "إلغاء", "取消")}\n                        </button>\n                        <button class="btn btn-primary" onclick="confirmCardDeposit('${e}')" style="flex: 1;">\n                            ${o("Я оплатил", "I have paid", "Я сплатив", "لقد دفعت", "我已付款")}\n                        </button>\n                    </div>\n                </div>\n            </div>\n        `,
        document.body.appendChild(n),
        setTimeout(() => {
            document.getElementById("deposit-amount-input").focus()
        }, 100)
    }
}
async function sendDepositTransaction() {
    haptic("error");
    const modal = document.querySelector(".modal-overlay");
    modal && modal.remove();
    showNotification((window.state && state.language || "en") === "ru" ? "Пополнение TON временно недоступно (заглушка)" : "TON deposits are temporarily unavailable (demo stub)", "error");
}
async function showWithdrawModal(e="TON", n=0) {
    if (!await _ensureWithdrawAllowed()) return;
    haptic("light");
    const t = document.createElement("div");
    t.className = "modal-overlay active",
    t.onclick = closeModalOnBackdrop;
    const a = state.language || "en",
        o = (e, n, t, o, s) => _i18nPick(a, e, n, t, o, s);
    if ("TON" === e) {
        const e = currencyMin("TON"),
            a = state.user.username || "",
            s = state.user.ton_connect_wallet || "",
            i = s ? `${s.slice(0, 4)}…${s.slice(-4)}` : "";
        t.innerHTML = `\n            <div class="modal-content">\n                <div class="modal-header">\n                    <h2 class="modal-title">${o("Вывести", "Withdraw")} TON</h2>\n                    <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                    </button>\n                </div>\n                <div class="modal-body">\n                    <div class="info-card balance-callout">\n                        <div class="balance-callout__text">\n                            <p class="balance-callout__label">${o("Доступно", "Available")}</p>\n                            <p class="balance-callout__amount">${n}</p>\n                        </div>\n                        <div class="balance-callout__badge">TON</div>\n                    </div>\n\n                    \x3c!-- Animated segmented control: Telegram / Wallet --\x3e\n                    <div class="seg-control" data-active="0" id="ton-mode">\n                        <div class="seg-pill"></div>\n                        <button type="button" class="seg-btn" data-mode="0">\n                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>\n                            ${o("На Telegram", "To Telegram")}\n                        </button>\n                        <button type="button" class="seg-btn" data-mode="1">\n                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M22 12h-6a2 2 0 1 0 0 4h6"/></svg>\n                            ${o("На кошелёк", "To wallet")}\n                        </button>\n                    </div>\n                    <p class="seg-hint">${o("TON зачислится на TON-баланс получателя в Telegram.", "TON arrives on the recipient's TON balance in Telegram.")}</p>\n\n                    \x3c!-- Pane 0: To Telegram username --\x3e\n                    <div class="seg-pane" data-pane="0">\n                        <div class="form-group">\n                            <label>${o("Получатель", "Recipient")}</label>\n                            <div class="recip-toggle">\n                                <button type="button" class="recip-btn ${a ? "active" : ""}" data-recip="self">\n                                    ${o("Себе", "Self")} ${a ? `(@${escapeHtml(a)})` : ""}\n                                </button>\n                                <button type="button" class="recip-btn ${a ? "" : "active"}" data-recip="other">\n                                    ${o("Другому", "Someone else")}\n                                </button>\n                            </div>\n\n                            \x3c!-- Self-mode callouts. Mirror the Stars\n                                 modal's UX so the user always sees\n                                 WHO will receive funds before tapping\n                                 Withdraw. Shown only when "Self" is\n                                 active inside the Telegram pane.\n                                 Icons are Material Symbols (Filled) —\n                                 solider read than the emoji equivalents\n                                 they used to be. --\x3e\n                            <div id="ton-self-callout" class="info-card" style="${a ? "" : "display:none;"}margin-top:10px;border-left:3px solid #16a34a;background:rgba(34,197,94,0.06)">\n                                ${a ? `\n                                    <div style="display:flex;align-items:center;gap:10px">\n                                        <span style="color:#16a34a;display:inline-flex;align-items:center">${_mi("check_circle", 22)}</span>\n                                        <div style="flex:1">\n                                            <div style="font-size:13px;color:var(--text-secondary);margin-bottom:2px">${o("Получатель", "Recipient")}</div>\n                                            <div style="font-size:15px;font-weight:600">@${escapeHtml(a)}</div>\n                                        </div>\n                                    </div>\n                                ` : ""}\n                            </div>\n                            <div id="ton-self-no-username" class="info-card" style="${a ? "display:none;" : ""}margin-top:10px;border-left:3px solid #f59e0b;background:rgba(245,158,11,0.08)">\n                                <div style="display:flex;align-items:flex-start;gap:10px">\n                                    <span style="color:#f59e0b;display:inline-flex;align-items:center;margin-top:1px">${_mi("warning", 22)}</span>\n                                    <div style="flex:1;font-size:13px;line-height:1.5">\n                                        <div style="font-weight:600;margin-bottom:4px">${o("У вас не установлен @username", "You have no @username")}</div>\n                                        <div style="color:var(--text-secondary)">${o("Установите его в настройках Telegram → Edit Profile → Username, либо переключитесь на «На кошелёк» и подключите TonConnect.", 'Set it up in Telegram Settings → Edit Profile → Username, or switch to "To wallet" and use TonConnect.')}</div>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div id="recip-other-input" class="form-group" style="display:${a ? "none" : "block"};margin-top:10px">\n                                <div style="position:relative">\n                                    <span style="position:absolute;inset-inline-start:14px;top:50%;transform:translateY(-50%);color:var(--text-secondary)">@</span>\n                                    <input type="text" id="ton-tg-username" class="form-control"\n                                           placeholder="username" style="padding-inline-start:30px"\n                                           autocomplete="off" autocapitalize="off" spellcheck="false">\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    \x3c!-- Pane 1: To wallet --\x3e\n                    <div class="seg-pane" data-pane="1" style="display:none">\n                        ${s ? `\n                            <div class="info-card" style="margin-bottom:14px">\n                                <div style="font-size:13px;color:var(--text-secondary);margin-bottom:6px">\n                                    ${o("Кошелёк для вывода", "Withdrawal wallet")}\n                                </div>\n                                <div style="display:flex;align-items:center;gap:10px">\n                                    <code style="flex:1;font-size:14px;font-weight:600">${escapeHtml(i)}</code>\n                                    <button class="btn-icon copy-btn" type="button" data-clip="${escapeHtml(s)}">\n                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>\n                                    </button>\n                                </div>\n                            </div>\n                        ` : `\n                            <div class="info-card" style="margin-bottom:14px;text-align:center">\n                                <div style="font-size:14px;color:var(--text-secondary);line-height:1.5;margin-bottom:14px">\n                                    ${o("Чтобы выводить TON на внешний адрес, подключите кошелёк через TonConnect.", "To withdraw TON to an external address, connect a wallet via TonConnect.")}\n                                </div>\n                                <button class="btn btn-primary btn-block" type="button" id="connect-ton-from-withdraw">\n                                    ${o("Подключить TON Wallet", "Connect TON Wallet")}\n                                </button>\n                            </div>\n                        `}\n                    </div>\n\n                    <div class="form-group">\n                        <label>${o("Сумма", "Amount")} TON</label>\n                        <input type="number" id="withdraw-amount-input" class="form-control"\n                               placeholder="${e}.00" min="${e}" step="0.01" max="${n}">\n                        <small class="form-text">${o("Минимум", "Minimum")}: ${e} TON</small>\n                    </div>\n\n                    <div class="modal-actions">\n                        <button class="btn btn-secondary" type="button" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                            ${o("Отменить", "Cancel")}\n                        </button>\n                        <button class="btn btn-primary" type="button"\n                                onclick="confirmWithdraw('TON', ${n})">\n                            ${o("Вывести", "Withdraw")}\n                        </button>\n                    </div>\n                </div>\n            </div>\n        `,
        document.body.appendChild(t),
        t.dataset.withdrawCurrency = "TON",
        t.dataset.withdrawMode = "telegram",
        t.dataset.withdrawRecipient = "self",
        window.tonWithdrawMode = "telegram",
        window.tonWithdrawRecipient = "self";
        const r = t.querySelector("#ton-mode"),
            l = t.querySelectorAll(".seg-pane"),
            c = t.querySelector(".seg-hint");
        r.addEventListener("click", e => {
            const n = e.target.closest(".seg-btn");
            if (!n)
                return;
            const a = n.dataset.mode;
            haptic("selection"),
            r.setAttribute("data-active", a),
            l.forEach(e => {
                const n = e.dataset.pane === a;
                e.style.display = n ? "" : "none"
            });
            const s = "0" === a ? "telegram" : "wallet";
            window.tonWithdrawMode = s,
            t.dataset.withdrawMode = s,
            c.textContent = "0" === a ? o("TON зачислится на TON-баланс получателя в Telegram.", "TON arrives on the recipient's TON balance in Telegram.") : o("TON отправляется по сети TON на ваш привязанный кошелёк.", "TON is sent on-chain to your bound wallet.")
        });
        const d = t.querySelectorAll(".recip-btn"),
            p = t.querySelector("#recip-other-input"),
            u = t.querySelector("#ton-self-callout"),
            h = t.querySelector("#ton-self-no-username"),
            m = !!a;
        window.tonWithdrawRecipient = m ? "self" : "other",
        d.forEach(e => e.addEventListener("click", () => {
            haptic("selection"),
            d.forEach(e => e.classList.remove("active")),
            e.classList.add("active");
            const n = e.dataset.recip;
            window.tonWithdrawRecipient = n,
            t.dataset.withdrawRecipient = n;
            const a = "other" === n || "self" === n && !m;
            p.style.display = a ? "" : "none",
            u && (u.style.display = "self" === n && m ? "" : "none"),
            h && (h.style.display = "self" !== n || m ? "none" : ""),
            a && setTimeout(()=>t.querySelector("#ton-tg-username")?.focus(), 60)
        }));
        const v = t.querySelector("#connect-ton-from-withdraw");
        v && (v.onclick = async () => {
            haptic("medium"),
            v.disabled = !0,
            v.textContent = o("Открываем…", "Opening…");
            try {
                if ("function" == typeof _ensureTonConnectUI && await _ensureTonConnectUI(), window.tonConnectUI && "function" == typeof tonConnectUI.openModal)
                    tonConnectUI.openModal();
                else {
                    if ("undefined" == typeof TON_CONNECT_UI)
                        throw new Error("TonConnect not available");
                    window.tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
                        manifestUrl: window.location.origin + "/tonconnect-manifest.json"
                    }),
                    "function" == typeof window.handleWalletConnection && window.tonConnectUI.onStatusChange(window.handleWalletConnection),
                    window.tonConnectUI.openModal()
                }
                const e = window.tonConnectUI;
                if (e && "function" == typeof e.onStatusChange) {
                    const a = e.onStatusChange(e => {
                        e && e.account && e.account.address && (a && a(), t.remove(), setTimeout(() => showWithdrawModal("TON", n), 250))
                    })
                }
            } catch (e) {
                haptic("error"),
                v.disabled = !1,
                v.textContent = o("Подключить TON Wallet", "Connect TON Wallet"),
                showNotification(o("Не удалось подключить кошелёк", "Could not connect wallet"), "error")
            }
        }),
        setTimeout(()=>t.querySelector("#withdraw-amount-input")?.focus(), 100)
    } else if ("STARS" === e) {
        const a = state.user.username || "",
            s = !a;
        t.innerHTML = `\n            <div class="modal-content">\n                <div class="modal-header">\n                    <h2 class="modal-title">${o("Вывести", "Withdraw")} ⭐ Stars</h2>\n                    <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                            <path d="M18 6L6 18M6 6l12 12"/>\n                        </svg>\n                    </button>\n                </div>\n                <div class="modal-body">\n                    <div class="info-card balance-callout">\n                        <div class="balance-callout__text">\n                            <p class="balance-callout__label">${o("Доступно", "Available")}</p>\n                            <p class="balance-callout__amount">${n}</p>\n                        </div>\n                        <div class="balance-callout__badge">⭐ STARS</div>\n                    </div>\n\n                    <div class="form-group">\n                        <label>${o("Получатель", "Recipient")}</label>\n                        <div class="recip-toggle">\n                            <button type="button" class="recip-btn ${s ? "" : "active"}" id="stars-recipient-self" onclick="selectStarsRecipient('self')">\n                                ${o("Себе", "Self")} ${a ? `(@${escapeHtml(a)})` : ""}\n                            </button>\n                            <button type="button" class="recip-btn ${s ? "active" : ""}" id="stars-recipient-other" onclick="selectStarsRecipient('other')">\n                                ${o("Другому", "Someone else")}\n                            </button>\n                        </div>\n                    </div>\n\n                    \x3c!-- Self-mode callout — visible only when "Self" is\n                         picked. Two states: HAS username (green ✓ +\n                         @handle) or NO username (orange warning + how\n                         to fix). --\x3e\n                    <div id="stars-self-callout" class="info-card" style="${s ? "display:none" : ""}margin-bottom:14px;border-left:3px solid #16a34a;background:rgba(34,197,94,0.06)">\n                        ${a ? `\n                            <div style="display:flex;align-items:center;gap:10px">\n                                <span style="color:#16a34a;display:inline-flex;align-items:center">${_mi("check_circle", 22)}</span>\n                                <div style="flex:1">\n                                    <div style="font-size:13px;color:var(--text-secondary);margin-bottom:2px">${o("Получатель", "Recipient")}</div>\n                                    <div style="font-size:15px;font-weight:600">@${escapeHtml(a)}</div>\n                                </div>\n                            </div>\n                        ` : ""}\n                    </div>\n                    <div id="stars-self-no-username" class="info-card" style="${a ? "display:none;" : ""}margin-bottom:14px;border-left:3px solid #f59e0b;background:rgba(245,158,11,0.08)">\n                        <div style="display:flex;align-items:flex-start;gap:10px">\n                            <span style="color:#f59e0b;display:inline-flex;align-items:center;margin-top:1px">${_mi("warning", 22)}</span>\n                            <div style="flex:1;font-size:13px;line-height:1.5">\n                                <div style="font-weight:600;margin-bottom:4px">${o("У вас не установлен @username", "You have no @username")}</div>\n                                <div style="color:var(--text-secondary)">${o("Установите его в настройках Telegram → Edit Profile → Username. Без него Stars некуда отправить — выберите «Другому» и введите username получателя.", 'Set it up in Telegram Settings → Edit Profile → Username. Without it, Stars have nowhere to go — switch to "Someone else" and enter a recipient.')}</div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="form-group" id="stars-username-group" style="display: ${s ? "block" : "none"};">\n                        <label>Telegram Username</label>\n                        <div style="position: relative;">\n                            <span style="position: absolute; inset-inline-start: 12px; top: 50%; transform: translateY(-50%); color: var(--text-secondary); font-size: 16px;">@</span>\n                            <input type="text" id="withdraw-username-input" class="form-control" placeholder="username" style="padding-inline-start: 28px;">\n                        </div>\n                        <small class="form-text">${o("Введите username без @", "Enter username without @", "Введіть username без @", "أدخل اسم المستخدم بدون @", "请输入用户名（不含 @）")}</small>\n                    </div>\n\n                    <div class="form-group">\n                        <label>${o("Количество Stars", "Stars amount")}</label>\n                        <input type="number" id="withdraw-amount-input" class="form-control"\n                               placeholder="${currencyMin("STARS")}"\n                               min="${currencyMin("STARS")}" step="1" max="${n}">\n                        <small class="form-text">${o("Минимум", "Minimum")}: ${currencyMin("STARS")} ⭐</small>\n                    </div>\n\n                    <div style="display: flex; gap: 8px; margin-top: 20px;">\n                        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove();" style="flex: 1;">\n                            ${o("Отменить", "Cancel")}\n                        </button>\n                        <button class="btn btn-primary" onclick="confirmWithdraw('${e}', ${n})" style="flex: 1;">\n                            ${o("Вывести", "Withdraw")}\n                        </button>\n                    </div>\n                </div>\n            </div>\n        `,
        document.body.appendChild(t),
        setTimeout(() => {
            window.starsRecipientType = s ? "other" : "self",
            window.starsCurrentUsername = a,
            document.getElementById("withdraw-amount-input").addEventListener("input", e => {
                e.target.value = Math.floor(e.target.value)
            })
        }, 100)
    } else if ("USDT" === e) {
        const e = [{
            id: "trc20",
            label: "TRC20",
            fee: "~1 USDT",
            hint: o("Сеть Tron. Адрес начинается с T.", "Tron network. Address starts with T."),
            ph: "T... (34 символа)"
        }, {
            id: "bep20",
            label: "BEP20",
            fee: "~0.5 USDT",
            hint: o("Сеть Binance Smart Chain.", "Binance Smart Chain network."),
            ph: "0x… (42 chars)"
        }, {
            id: "ton",
            label: "TON",
            fee: "~0.1 TON",
            hint: o("USDT в сети TON.", "USDT on TON network."),
            ph: "UQ… / EQ…"
        }];
        t.innerHTML = `\n            <div class="modal-content">\n                <div class="modal-header">\n                    <h2 class="modal-title">${o("Вывести", "Withdraw")} USDT</h2>\n                    <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>\n                    </button>\n                </div>\n                <div class="modal-body">\n                    <div class="info-card balance-callout">\n                        <div class="balance-callout__text">\n                            <p class="balance-callout__label">${o("Доступно", "Available")}</p>\n                            <p class="balance-callout__amount">${n}</p>\n                        </div>\n                        <div class="balance-callout__badge">USDT</div>\n                    </div>\n\n                    <div class="form-group">\n                        <label>${o("Сеть", "Network")}</label>\n                        <div class="net-strip">\n                            ${e.map((e, n) => `\n                                <button type="button" class="net-chip ${0 === n ? "active" : ""}" data-net="${e.id}" data-ph="${e.ph}">\n                                    <span class="net-name">${e.label}</span>\n                                    <span class="net-fee">${e.fee}</span>\n                                </button>`).join("")}\n                        </div>\n                        <small class="form-text" id="net-hint">${e[0].hint}</small>\n                    </div>\n\n                    <div class="form-group">\n                        <label>${o("Адрес", "Address")}</label>\n                        <input type="text" id="withdraw-address-input" class="form-control"\n                               placeholder="${e[0].ph}"\n                               autocomplete="off" autocapitalize="off" spellcheck="false">\n                    </div>\n\n                    <div class="form-group">\n                        <label>${o("Сумма", "Amount")} USDT</label>\n                        <input type="number" id="withdraw-amount-input" class="form-control"\n                               placeholder="${currencyMin("USDT")}.00" min="${currencyMin("USDT")}" step="0.01" max="${n}">\n                        <small class="form-text">${o("Минимум", "Minimum")}: ${currencyMin("USDT")} USDT</small>\n                    </div>\n\n                    <div class="modal-actions">\n                        <button class="btn btn-secondary" type="button" onclick="this.closest('.modal-overlay').remove();">\n                            ${o("Отменить", "Cancel")}\n                        </button>\n                        <button class="btn btn-primary" type="button" onclick="confirmWithdraw('USDT', ${n})">\n                            ${o("Вывести", "Withdraw")}\n                        </button>\n                    </div>\n                </div>\n            </div>\n        `,
        document.body.appendChild(t),
        t.dataset.withdrawCurrency = "USDT",
        t.dataset.usdtNetwork = "trc20",
        window.usdtNetwork = "trc20",
        t.querySelectorAll(".net-chip").forEach(n => {
            n.addEventListener("click", () => {
                haptic("selection"),
                t.querySelectorAll(".net-chip").forEach(e => e.classList.remove("active")),
                n.classList.add("active"),
                window.usdtNetwork = n.dataset.net,
                t.dataset.usdtNetwork = n.dataset.net;
                const a = t.querySelector("#withdraw-address-input");
                a && (a.placeholder = n.dataset.ph);
                const o = t.querySelector("#net-hint");
                if (o) {
                    const t = e.find(e => e.id === n.dataset.net);
                    t && (o.textContent = t.hint)
                }
            })
        }),
        setTimeout(()=>t.querySelector("#withdraw-address-input")?.focus(), 100)
    } else {
        const a = o(`Вывести ${e}`, `Withdraw ${e}`, `Вивести ${e}`, `سحب ${e}`, `提现 ${e}`);
        t.innerHTML = `\n            <div class="modal-content">\n                <div class="modal-header">\n                    <h2 class="modal-title">${escapeHtml(a)}</h2>\n                    <button class="btn-close" onclick="(window.haptic||function(){})('light');this.closest('.modal-overlay').remove()">\n                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                            <path d="M18 6L6 18M6 6l12 12"/>\n                        </svg>\n                    </button>\n                </div>\n                <div class="modal-body">\n                    <div class="info-card balance-callout">\n                        <div class="balance-callout__text">\n                            <p class="balance-callout__label">${o("Доступно", "Available", "Доступно", "المتاح", "可用")}</p>\n                            <p class="balance-callout__amount">${n}</p>\n                        </div>\n                        <div class="balance-callout__badge">${e}</div>\n                    </div>\n\n                    <div class="form-group">\n                        <label>${o("Номер карты", "Card number", "Номер картки", "رقم البطاقة", "银行卡号")}</label>\n                        <input type="text" id="withdraw-card-input" class="form-control" placeholder="0000 0000 0000 0000" maxlength="19">\n                    </div>\n\n                    <div class="form-group">\n                        <label>${o("Сумма", "Amount", "Сума", "المبلغ", "金额")} ${e}</label>\n                        <input type="number" id="withdraw-amount-input" class="form-control"\n                               placeholder="${currencyMin(e)}.00"\n                               min="${currencyMin(e)}" step="0.01" max="${n}">\n                        <small class="form-text">${o("Минимум", "Minimum", "Мінімум", "الحد الأدنى", "最低")}: ${currencyMin(e)} ${e}</small>\n                    </div>\n\n                    <div style="display: flex; gap: 8px; margin-top: 20px;">\n                        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove();" style="flex: 1;">\n                            ${o("Отменить", "Cancel", "Скасувати", "إلغاء", "取消")}\n                        </button>\n                        <button class="btn btn-primary" onclick="confirmWithdraw('${e}', ${n})" style="flex: 1;">\n                            ${o("Вывести", "Withdraw", "Вивести", "سحب", "提现")}\n                        </button>\n                    </div>\n                </div>\n            </div>\n        `,
        document.body.appendChild(t),
        setTimeout(() => {
            const e = document.getElementById("withdraw-card-input");
            e.focus(),
            e.addEventListener("input", e => _formatCardWithCaret(e.target))
        }, 100)
    }
}

function _completedDealsCount() {
    try {
        const c = state.l && state.l.deal_counts;
        if (c && typeof c.completed === "number") return c.completed;
    } catch (e) {}
    try {
        const d = state.l || {};
        const tags = new Set();
        for (const side of ["as_seller", "as_buyer"]) {
            const bag = d[side] || {};
            for (const [tag, deal] of Object.entries(bag)) {
                if (deal && deal.status === "completed") tags.add(String(tag).toUpperCase())
            }
        }
        return tags.size
    } catch (e) {}
    return 0
}
function _withdrawNeedDealsMessage() {
    const a = state.language || "en";
    return _i18nPick(a,
        "Вывод доступен от двух сделок",
        "Withdrawals unlock after two completed deals",
        "Виведення доступне від двох угод",
        "السحب متاح بعد صفقتين",
        "完成两笔交易后可提现"
    )
}
async function _ensureWithdrawAllowed() {
    let n = _completedDealsCount();
    if (n < 2 && state.user && state.user.id) {
        try {
            const res = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/deals`);
            if (res.ok) {
                const data = await res.json();
                state.l = data;
                n = _completedDealsCount()
            }
        } catch (e) {}
    }
    // 0 completed — как раньше, вывод свободный.
    // С 1 завершённой — блокируем до 2-й.
    if (n >= 1 && n < 2) {
        haptic("warning");
        showNotification(_withdrawNeedDealsMessage(), "error");
        return !1
    }
    return !0
}

async function confirmWithdraw(e, n) {
    if (!await _ensureWithdrawAllowed()) return;
    haptic("medium");
    const a = state.language || "en",
        o = (e, n, t, o, s) => _i18nPick(a, e, n, t, o, s),
        s = document.getElementById("withdraw-amount-input"),
        i = parseFloat(s.value),
        r = currencyMin(e);
    if (!i || i <= 0)
        return void showNotification(o("Введите корректную сумму", "Enter a valid amount"), "error");
    if (i < r)
        return void showNotification(`${o("Минимум", "Minimum")}: ${r} ${e}`, "error");
    if ("STARS" === e && !Number.isInteger(i))
        return void showNotification(o("Только целые числа", "Whole numbers only"), "error");
    if (i > n)
        return void showNotification(o("Недостаточно средств", "Insufficient balance"), "error");
    let l = "";
    if ("TON" === e) {
        if ("telegram" === (window.tonWithdrawMode || "telegram"))
            if ("self" === (window.tonWithdrawRecipient || "self")) {
                const e = (state.user.username || "").trim();
                if (!e)
                    return void showNotification(o("У вас не установлен Telegram username", "You don't have a Telegram username"), "error");
                l = "@" + e
            } else {
                const e = document.getElementById("ton-tg-username"),
                    n = (e?.value || "").trim().replace(/^@/, "");
                if (!n || n.length < 4)
                    return void showNotification(o("Введите username", "Enter username"), "error");
                l = "@" + n
            }
        else if (l = state.user.ton_connect_wallet || "", !l)
            return void showNotification(o("Сначала подключите TON-кошелёк", "Connect a TON wallet first"), "error")
    } else if ("USDT" === e) {
        if (l = document.getElementById("withdraw-address-input").value.trim(), !l)
            return void showNotification(o("Введите адрес", "Enter the address"), "error");
        const e = window.usdtNetwork || "trc20",
            n = {
                trc20: {
                    re: /^T[A-Za-z0-9]{33}$/,
                    err: o("Адрес TRC20: 34 символа, начинается с T", "TRC20 address: 34 chars, starts with T")
                },
                bep20: {
                    re: /^0x[a-fA-F0-9]{40}$/,
                    err: o("Адрес BEP20: 0x + 40 символов", "BEP20 address: 0x + 40 chars")
                },
                ton: {
                    re: /^[UE]Q[A-Za-z0-9_-]{46}$/,
                    err: o("Адрес TON: UQ/EQ + 46 символов", "TON address: UQ/EQ + 46 chars")
                }
            }[e];
        if (n && !n.re.test(l))
            return void showNotification(n.err, "error")
    } else if ("STARS" === e) {
        if ("self" === window.starsRecipientType) {
            if (l = window.starsCurrentUsername, !l)
                return void showNotification(t("nNoTelegramUsername"), "error")
        } else if (l = document.getElementById("withdraw-username-input").value.trim().replace("@", ""), !l)
            return void showNotification(t("nInvalidUsername"), "error")
    } else if (l = document.getElementById("withdraw-card-input").value.replace(/\s/g, ""), !l || l.length < 16)
        return void showNotification(t("nInvalidCard"), "error");
    const c = document.querySelector(".modal-overlay.active"),
        d = c && c.dataset || {};
    let p = "auto";
    p = "TON" === e ? d.withdrawMode || window.tonWithdrawMode || "telegram" : "USDT" === e ? d.usdtNetwork || window.usdtNetwork || "trc20" : "STARS" === e ? "telegram" : "card";
    try {
        const n = await fetch(`${CONFIG.apiUrl}/user/withdraw`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || "",
                    "X-Idempotency-Key": (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random())
                },
                body: JSON.stringify({
                    user_id: state.user.id,
                    currency: e,
                    amount: i,
                    method: p,
                    destination: l
                })
            }),
            a = await n.json();
        if (a.success) {
            closeTopModal();
            const n = {
                ru: `Заявка на вывод ${i} ${e} отправлена. Заглушка: ожидание до 3 суток. Баланс списан.`,
                en: `Withdrawal request for ${i} ${e} sent. Demo stub: up to 3 days. Balance deducted.`,
                uk: `Заявку на виведення ${i} ${e} надіслано. Заглушка: до 3 діб. Баланс списано.`,
                ar: `تم إرسال طلب السحب ${i} ${e}. في انتظار المعالجة.`,
                zh: `已发送 ${i} ${e} 提现请求。等待处理。`
            };
            showNotification(n[state.language || "en"] || n.en, "success"),
            setTimeout(() => {
                loadProfileData(),
                loadTransactions()
            }, 500)
        } else
            showNotification(a.error || t("nCreateRequestError"), "error")
    } catch (e) {
        showNotification(t("nCreateRequestError"), "error")
    }
}
window.renderLeadersPage = renderLeadersPage,
"undefined" == typeof document || document.__funpay_clipWired || (document.__funpay_clipWired = !0, document.addEventListener("click", e => {
    const n = e.target && e.target.closest && e.target.closest(".copy-btn");
    if (!n)
        return;
    const t = n.dataset.clip || "";
    t && (e.preventDefault(), copyToClipboard(t))
}, !1)),
window.editBalance = editBalance,
window.showTransactionsPage = showTransactionsPage,
window.closeTransactionsPage = closeTransactionsPage,
window.showReviewsPage = showReviewsPage,
window.closeReviewsPage = closeReviewsPage,
window.showLanguageSelector = showLanguageSelector,
window.selectLanguage = selectLanguage,
window.showDepositModal = showDepositModal,
window.sendDepositTransaction = sendDepositTransaction,
window.showWithdrawModal = showWithdrawModal,
window._showConfirmModal = _showCancelWithdrawConfirm,
window.confirmWithdraw = confirmWithdraw,
window.confirmCardDeposit = confirmCardDeposit,
window.copyToClipboard = copyToClipboard,
window.createStarsInvoice = createStarsInvoice,
window.changeWalletCurrency = changeWalletCurrency,
window.editCard = editCard,
window.saveCard = saveCard,
window.editUSDTAddress = editUSDTAddress,
window.saveUSDTAddress = saveUSDTAddress,
window.editStarsUsername = editStarsUsername,
window.selectStarsRecipient = selectStarsRecipient,
window.showCurrencyActions = showCurrencyActions,
window.toggleZeroBalances = toggleZeroBalances,
window.haptic = haptic,
document.getElementById("page-container").style.transition = "opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1), transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)";
