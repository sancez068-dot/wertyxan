!function() {
    "use strict";
    function e(e) {
        /* Prefer status, then counterparty join.
           Buy deals set buyer_id at create — don't treat that as "joined".
           joined_at is the reliable signal; else both seats filled. */
        if (!e) return 1;
        if ("completed" === e.status) return 5;
        if ("sent" === e.status) return 4;
        if ("paid" === e.status) return 3;
        var joined = !!e.joined_at;
        if (!joined && typeof resolveRoles === "function") {
            var r = resolveRoles(e);
            joined = !!(r && r.seller && r.buyer);
        } else if (!joined) {
            joined = !!(e.buyer_id && e.seller_id);
        }
        return joined ? 2 : 1
    }
    const s = {
            en: ["Created", "Buyer joined", "Paid", "In escrow", "Delivered"],
            ru: ["Создана", "Покупатель", "Оплачена", "В эскроу", "Получена"],
            uk: ["Створена", "Покупець", "Оплачена", "В ескроу", "Доставлена"],
            ar: ["أُنشئت", "المشتري", "مدفوعة", "في الضمان", "تم التسليم"],
            zh: ["已创建", "买家加入", "已付款", "托管中", "已交付"]
        },
        r = {
            en: (e, r) => `Step ${e} of ${r} — ${s.en[e - 1]}`,
            ru: (e, r) => `Шаг ${e} из ${r} — ${s.ru[e - 1]}`,
            uk: (e, r) => `Крок ${e} з ${r} — ${s.uk[e - 1]}`,
            ar: (e, r) => `الخطوة ${e} من ${r} — ${s.ar[e - 1]}`,
            zh: (e, r) => `第 ${e} 步，共 ${r} 步 — ${s.zh[e - 1]}`
        };
    window.renderOrderProgress = function(n, a, i) {
        const l = (i = i || {}).size || "lg",
            o = i.lang || window.state && state.language || "en",
            t = s[o] || s.en,
            d = e(a),
            c = t.length,
            p = `<div class="progress-track">${function(e, s, r) {const n = [];for (let a = 1; a <= s; a++) {const i = a === s,l = a < e ? "progress-dot done" : a === e ? i ? "progress-dot done active" : "progress-dot active" : "progress-dot";if (n.push(`\n                <div class="${i ? "progress-segment-last" : "progress-segment"}">\n                    <div class="${l}"></div>\n                    <p class="progress-caption">${r[a - 1] || ""}</p>\n                </div>`), !i) {let s = 0,r = "progress-line-fill";a < e ? (s = 1, r += " animated done") : a === e && (s = .5, r += " animated active"),n.push(`\n                <div class="progress-connector" aria-hidden="true">\n                    <div class="progress-line-track">\n                        <div class="${r}" style="--line-fill:${s};--line-delay:${.1 * (a - 1)}s"></div>\n                    </div>\n                </div>`)}}return n.join("")}(d, c, t)}</div>`;
        let $;
        if ("sm" === l)
            $ = `<div class="progress progress--sm" role="progressbar"\n                         aria-valuemin="1" aria-valuemax="${c}" aria-valuenow="${d}">\n                ${p}\n            </div>`;
        else {
            const e = (r[o] || r.en)(d, c).replace(new RegExp("(^|[^0-9])(" + d + ")(?=[^0-9]|$)"), (e, s, r) => `${s}<span class="ratio">${r}</span>`),
                s = {
                    ru: "Статус сделки",
                    en: "Deal status",
                    uk: "Статус угоди",
                    ar: "حالة الصفقة",
                    zh: "交易状态"
                },
                n = {
                    ru: "Безопасно через Telegram",
                    en: "Secured by Telegram",
                    uk: "Безпечно через Telegram",
                    ar: "مؤمَّن عبر Telegram",
                    zh: "由 Telegram 安全保护"
                };
            $ = `\n                <div class="progress-shell" role="progressbar"\n                     aria-valuemin="1" aria-valuemax="${c}" aria-valuenow="${d}">\n                    <div class="progress-inner">\n                        <p class="progress-title-label">${s[o] || s.en}</p>\n                        <p class="progress-subtitle">${e}</p>\n                        ${p}\n                        <p class="progress-secured">${n[o] || n.en}</p>\n                    </div>\n                </div>`
        }
        n.innerHTML = $
    },
    window.dealStage = e
}();
