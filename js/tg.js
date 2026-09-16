!function() {
    "use strict";
    const t = window.Telegram && window.Telegram.WebApp;
    if (!t)
        return window.FunpayTG = {
            sdk: null,
            haptic: () => {},
            pushBack: () => {},
            popBack: () => {},
            openInvoice: () => !1,
            openTelegramLink: t => (window.open(t, "_blank"), !1),
            shareToStory: () => !1,
            get languageCode() {
                return navigator.language?.slice(0, 2) || "en"
            },
            get user() {
                return null
            },
            get initData() {
                return ""
            },
            isMiniApp: !1,
            supports: () => !1
        }, void function() {
            const t = document.documentElement.style;
            t.setProperty("--safe-area-top", "env(safe-area-inset-top, 0px)"),
            t.setProperty("--safe-area-bottom", "env(safe-area-inset-bottom, 0px)"),
            t.setProperty("--safe-area-left", "env(safe-area-inset-left, 0px)"),
            t.setProperty("--safe-area-right", "env(safe-area-inset-right, 0px)"),
            t.setProperty("--content-safe-top", "0px"),
            t.setProperty("--content-safe-bottom", "0px"),
            t.setProperty("--content-safe-left", "0px"),
            t.setProperty("--content-safe-right", "0px"),
            t.setProperty("--tg-viewport-height", "100vh")
        }();
    try {
        t.ready()
    } catch (t) {}
    const n = n => {
        try {
            return t.isVersionAtLeast && t.isVersionAtLeast(n)
        } catch (t) {
            return !1
        }
    };
    if (function() {
        if ("function" == typeof t.expand)
            try {
                t.expand()
            } catch (t) {}
    }(), function() {
        if (n("8.0") && "function" == typeof t.requestFullscreen)
            try {
                return t.requestFullscreen(), !0
            } catch (t) {}
    }(), n("7.7") && "function" == typeof t.disableVerticalSwipes)
        try {
            t.disableVerticalSwipes()
        } catch (t) {}
    let e = !1;
    function c() {
        const n = document.documentElement,
            e = t.themeParams || {};
        n.style.setProperty("--tg-bg", e.bg_color || "#000000"),
        n.style.setProperty("--tg-text", e.text_color || "#FFFFFF"),
        n.style.setProperty("--tg-hint", e.hint_color || "#8E8E93"),
        n.style.setProperty("--tg-link", e.link_color || "#0A84FF"),
        n.style.setProperty("--tg-button", e.button_color || "#0A84FF"),
        n.style.setProperty("--tg-button-text", e.button_text_color || "#FFFFFF"),
        n.style.setProperty("--tg-secondary-bg", e.secondary_bg_color || "#1C1C1E");
        var c = "dark" === (document.documentElement.getAttribute("data-theme") || "light") ? "#000000" : "#F2F2F7";
        try {
            t.setHeaderColor && t.setHeaderColor(c)
        } catch (t) {}
        try {
            t.setBackgroundColor && t.setBackgroundColor(c)
        } catch (t) {}
        try {
            t.setBottomBarColor && t.setBottomBarColor(c)
        } catch (t) {}
    }
    c();
    try {
        t.onEvent && t.onEvent("themeChanged", c)
    } catch (t) {}
    function a(t, n) {
        if (!n)
            return;
        const e = document.documentElement.style;
        e.setProperty(`--${t}-top`, `${n.top || 0}px`),
        e.setProperty(`--${t}-bottom`, `${n.bottom || 0}px`),
        e.setProperty(`--${t}-left`, `${n.left || 0}px`),
        e.setProperty(`--${t}-right`, `${n.right || 0}px`)
    }
    function o() {
        a("safe-area", t.safeAreaInset),
        a("content-safe", t.contentSafeAreaInset);
        const n = t.viewportStableHeight || t.viewportHeight || window.innerHeight;
        document.documentElement.style.setProperty("--tg-viewport-height", `${n}px`)
    }
    o();
    try {
        t.onEvent && t.onEvent("safeAreaChanged", o),
        t.onEvent && t.onEvent("contentSafeAreaChanged", o),
        t.onEvent && t.onEvent("viewportChanged", o),
        t.onEvent && t.onEvent("fullscreenChanged", o)
    } catch (t) {}
    const r = [];
    if (t.BackButton && "function" == typeof t.BackButton.onClick)
        try {
            t.BackButton.onClick(function() {
                const t = r[r.length - 1];
                "function" == typeof t && t()
            })
        } catch (t) {}
    document.addEventListener("click", function n() {
        !function() {
            if (!e && "function" == typeof t.enableClosingConfirmation)
                try {
                    t.enableClosingConfirmation(),
                    e = !0
                } catch (t) {}
        }(),
        document.removeEventListener("click", n)
    }, {
        passive: !0,
        once: !0
    }),
    window.FunpayTG = {
        sdk: t,
        haptic: function(n) {
            if (t.HapticFeedback)
                try {
                    switch (n) {
                    case "light":
                    case "medium":
                    case "heavy":
                    case "rigid":
                    case "soft":
                        t.HapticFeedback.impactOccurred(n);
                        break;
                    case "success":
                    case "warning":
                    case "error":
                        t.HapticFeedback.notificationOccurred(n);
                        break;
                    case "selection":
                        t.HapticFeedback.selectionChanged();
                        break;
                    default:
                        t.HapticFeedback.impactOccurred("light")
                    }
                } catch (t) {}
        },
        pushBack: function(n) {
            if (r.push(n), t.BackButton)
                try {
                    t.BackButton.show()
                } catch (t) {}
        },
        popBack: function() {
            if (r.pop(), 0 === r.length && t.BackButton)
                try {
                    t.BackButton.hide()
                } catch (t) {}
        },
        openInvoice: function(n, e) {
            if ("function" == typeof t.openInvoice)
                try {
                    return t.openInvoice(n, e), !0
                } catch (t) {}
            return !1
        },
        openTelegramLink: function(n) {
            if ("function" == typeof t.openTelegramLink)
                try {
                    return t.openTelegramLink(n), !0
                } catch (t) {}
            return window.open(n, "_blank"), !1
        },
        shareToStory: function(n, e) {
            if ("function" == typeof t.shareToStory)
                try {
                    return t.shareToStory(n, e), !0
                } catch (t) {}
            return !1
        },
        get languageCode() {
            return t.initDataUnsafe && t.initDataUnsafe.user ? t.initDataUnsafe.user.language_code : null
        },
        get user() {
            return t.initDataUnsafe ? t.initDataUnsafe.user : null
        },
        get initData() {
            return t.initData || ""
        },
        isMiniApp: !0,
        supports: n
    }
}();
