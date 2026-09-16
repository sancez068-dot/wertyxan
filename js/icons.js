!function() {
    "use strict";
    const t = {
            TON: {
                bg: "#0098EA",
                fg: "#FFFFFF"
            },
            USDT: {
                bg: "#26A17B",
                fg: "#FFFFFF"
            },
            BTC: {
                bg: "#F7931A",
                fg: "#FFFFFF"
            },
            ETH: {
                bg: "#627EEA",
                fg: "#FFFFFF"
            },
            STARS: {
                bg: "#FFB400",
                fg: "#FFFFFF"
            },
            RUB: {
                bg: "#2E54FF",
                fg: "#FFFFFF"
            },
            USD: {
                bg: "#1B7F4F",
                fg: "#FFFFFF"
            },
            EUR: {
                bg: "#0F4FB7",
                fg: "#FFFFFF"
            },
            GBP: {
                bg: "#5A2A82",
                fg: "#FFFFFF"
            },
            CNY: {
                bg: "#C82A1A",
                fg: "#FFFFFF"
            },
            JPY: {
                bg: "#1F1F1F",
                fg: "#FFFFFF"
            },
            TRY: {
                bg: "#E4002B",
                fg: "#FFFFFF"
            },
            UAH: {
                bg: "#1463A8",
                fg: "#FFFFFF"
            },
            KZT: {
                bg: "#00A1E0",
                fg: "#FFFFFF"
            },
            DEFAULT: {
                bg: "#3A3A3C",
                fg: "#FFFFFF"
            }
        },
        e = {
            TON: "/assets/coins/ton.svg",
            USDT: "/assets/coins/usdt.svg",
            BTC: "/assets/coins/btc.svg",
            ETH: "/assets/coins/eth.svg"
        },
        f = {
            STARS: '<path d="M16 9 L17.8 13.7 L23 14.1 L19 17.4 L20.3 22.3 L16 19.6 L11.7 22.3 L13 17.4 L9 14.1 L14.2 13.7 Z" fill="#fff"/>',
            RUB: '<text x="16" y="22" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="14" font-weight="700" fill="#fff">₽</text>',
            USD: '<text x="16" y="22" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="14" font-weight="700" fill="#fff">$</text>',
            EUR: '<text x="16" y="22" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="14" font-weight="700" fill="#fff">€</text>',
            GBP: '<text x="16" y="22" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="14" font-weight="700" fill="#fff">£</text>',
            CNY: '<text x="16" y="22" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="14" font-weight="700" fill="#fff">¥</text>',
            JPY: '<text x="16" y="22" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="14" font-weight="700" fill="#fff">¥</text>',
            TRY: '<text x="16" y="22" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="14" font-weight="700" fill="#fff">₺</text>',
            UAH: '<text x="16" y="22" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="14" font-weight="700" fill="#fff">₴</text>',
            KZT: '<text x="16" y="22" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="14" font-weight="700" fill="#fff">₸</text>',
            DEFAULT: '<text x="16" y="22" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="14" font-weight="700" fill="#fff">¤</text>'
        };
    window.FunpayIcons = {
        currencyIcon: function(s, F) {
            const n = String(s || "DEFAULT").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12) || "DEFAULT",
                i = Number(F) || 40,
                l = e[n];
            if (l)
                return `<span class="cur-icon cur-icon-${n}"\n                       style="display:inline-flex;width:${i}px;height:${i}px;\n                              align-items:center;justify-content:center;flex-shrink:0">\n                <img src="${l}" alt="${n}"\n                     style="width:100%;height:100%;display:block" />\n            </span>`;
            const o = f[n] || f.DEFAULT;
            return `<svg class="cur-icon cur-icon-${n}" viewBox="0 0 32 32" width="${i}" height="${i}" xmlns="http://www.w3.org/2000/svg" aria-label="${n}">\n            <circle cx="16" cy="16" r="15" fill="${(t[n] || t.DEFAULT).bg}"/>\n            ${o}\n        </svg>`
        },
        currencyGlyph: function(t, e) {
            const s = String(t || "DEFAULT").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12) || "DEFAULT",
                F = f[s] || f.DEFAULT,
                n = Number(e) || 24;
            return `<svg viewBox="0 0 32 32" width="${n}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-label="${s}">${F}</svg>`
        },
        currencyColor: function(e) {
            const f = (e || "DEFAULT").toUpperCase();
            return (t[f] || t.DEFAULT).bg
        },
        COLORS: t
    }
}();
