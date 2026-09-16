function formatUserDisplay(e, t) {
    const n = {
            ru: "Неизвестно",
            en: "Unknown",
            uk: "Невідомо",
            ar: "غير معروف",
            zh: "未知"
        },
        a = n[window.state && state.language || "en"] || n.en;
    return e || t ? t ? e ? `${e} (@${t})` : `@${t}` : e || a : a
}
const CREATE_FORM_COPY = {
    ru: {
        title: "Создать сделку",
        stepType: "Выберите тип сделки",
        buy: "Купить",
        sell: "Продать",
        back: "Назад",
        stepCurrency: "Выберите валюту",
        stepAmount: "Введите сумму",
        next: "Далее",
        stepDesc: "Описание товара",
        descHint1: "Если это NFT-подарок:",
        descHintLine: "Профиль Telegram → подарок → ⋯ → «Скопировать ссылку».",
        descHintMulti: "Несколько подарков — каждый со своей строки.",
        descHintElse: "Иначе",
        descHintElseExample: "просто опишите товар, например:",
        descPlaceholder: "Вставьте ссылки или опишите товар...",
        stepConfirm: "Подтверждение",
        sumType: "Тип:",
        sumAmount: "Сумма:",
        sumDescription: "Описание:",
        submit: "Создать сделку"
    },
    en: {
        title: "Create deal",
        stepType: "Choose deal type",
        buy: "Buy",
        sell: "Sell",
        back: "Back",
        stepCurrency: "Choose currency",
        stepAmount: "Enter amount",
        next: "Next",
        stepDesc: "Item description",
        descHint1: "If this is an NFT gift:",
        descHintLine: 'Telegram profile → gift → ⋯ → "Copy link".',
        descHintMulti: "Multiple gifts — one per line.",
        descHintElse: "Otherwise",
        descHintElseExample: "just describe the item, e.g.:",
        descPlaceholder: "Paste links or describe the item...",
        stepConfirm: "Confirmation",
        sumType: "Type:",
        sumAmount: "Amount:",
        sumDescription: "Description:",
        submit: "Create deal"
    },
    uk: {
        title: "Створити угоду",
        stepType: "Виберіть тип угоди",
        buy: "Купити",
        sell: "Продати",
        back: "Назад",
        stepCurrency: "Виберіть валюту",
        stepAmount: "Введіть суму",
        next: "Далі",
        stepDesc: "Опис товару",
        descHint1: "Якщо це NFT-подарунок:",
        descHintLine: "Профіль Telegram → подарунок → ⋯ → «Скопіювати посилання».",
        descHintMulti: "Кілька подарунків — кожен зі свого рядка.",
        descHintElse: "Інакше",
        descHintElseExample: "просто опишіть товар, наприклад:",
        descPlaceholder: "Вставте посилання або опишіть товар...",
        stepConfirm: "Підтвердження",
        sumType: "Тип:",
        sumAmount: "Сума:",
        sumDescription: "Опис:",
        submit: "Створити угоду"
    },
    ar: {
        title: "إنشاء صفقة",
        stepType: "اختر نوع الصفقة",
        buy: "شراء",
        sell: "بيع",
        back: "رجوع",
        stepCurrency: "اختر العملة",
        stepAmount: "أدخل المبلغ",
        next: "التالي",
        stepDesc: "وصف المنتج",
        descHint1: "إذا كانت هدية NFT:",
        descHintLine: "ملف Telegram → الهدية → ⋯ → «نسخ الرابط».",
        descHintMulti: "لعدة هدايا — كل واحدة في سطر.",
        descHintElse: "وإلا",
        descHintElseExample: "فقط صف المنتج، مثلاً:",
        descPlaceholder: "الصق الروابط أو صف المنتج...",
        stepConfirm: "تأكيد",
        sumType: "النوع:",
        sumAmount: "المبلغ:",
        sumDescription: "الوصف:",
        submit: "إنشاء الصفقة"
    },
    zh: {
        title: "创建交易",
        stepType: "选择交易类型",
        buy: "购买",
        sell: "出售",
        back: "返回",
        stepCurrency: "选择货币",
        stepAmount: "输入金额",
        next: "下一步",
        stepDesc: "商品描述",
        descHint1: "如果是 NFT 礼物：",
        descHintLine: 'Telegram 个人资料 → 礼物 → ⋯ → "复制链接"。',
        descHintMulti: "多个礼物——每个一行。",
        descHintElse: "否则",
        descHintElseExample: "只需描述物品，例如：",
        descPlaceholder: "粘贴链接或描述商品…",
        stepConfirm: "确认",
        sumType: "类型：",
        sumAmount: "金额：",
        sumDescription: "描述：",
        submit: "创建交易"
    }
};
function _formCopy() {
    let e = window.state && state.language || null;
    if (!e)
        try {
            e = localStorage.getItem("app_language")
        } catch (e) {}
    return e && CREATE_FORM_COPY[e] || (e = "en"), CREATE_FORM_COPY[e]
}
function showCreateOrderForm() {
    orderFormData = {
        step: 1
    };
    const e = _formCopy(),
        t = createModal(e.title, `\n        <form id="create-order-form" class="form">\n            <div class="form-step" data-step="1">\n                <h3 class="form-step-title">${e.stepType}</h3>\n                <div class="button-group">\n                    <button type="button" class="choice-btn" data-value="buy">\n                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">\n                            <line x1="12" y1="5" x2="12" y2="19"></line>\n                            <polyline points="19 12 12 19 5 12"></polyline>\n                        </svg>\n                        ${e.buy}\n                    </button>\n                    <button type="button" class="choice-btn" data-value="sell">\n                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">\n                            <line x1="12" y1="19" x2="12" y2="5"></line>\n                            <polyline points="5 12 12 5 19 12"></polyline>\n                        </svg>\n                        ${e.sell}\n                    </button>\n                </div>\n            </div>\n\n            <div class="form-step hidden" data-step="2">\n                <button type="button" class="back-btn" onclick="previousFormStep()">\n                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">\n                        <polyline points="15 18 9 12 15 6"></polyline>\n                    </svg>\n                    ${e.back}\n                </button>\n                <h3 class="form-step-title">${e.stepCurrency}</h3>\n                <div class="currency-grid">\n                    ${CONFIG.currencies.map(e => `\n                        <button type="button" class="currency-btn" data-value="${e}">\n                            ${window.FunpayIcons ? FunpayIcons.currencyIcon(e, 40) : `<div class="currency-icon">${e.substring(0, 2)}</div>`}\n                            <span>${e}</span>\n                        </button>\n                    `).join("")}\n                </div>\n            </div>\n\n            <div class="form-step hidden" data-step="3">\n                <button type="button" class="back-btn" onclick="previousFormStep()">\n                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">\n                        <polyline points="15 18 9 12 15 6"></polyline>\n                    </svg>\n                    ${e.back}\n                </button>\n                <h3 class="form-step-title">${e.stepAmount}</h3>\n                <div class="form-group">\n                    <input type="number"\n                           id="order-amount"\n                           class="form-input"\n                           placeholder="0.00"\n                           step="0.01"\n                           min="0.01"\n                           required>\n                    <span class="input-currency" id="selected-currency-display">TON</span>\n                </div>\n                <button type="button" class="btn btn-primary btn-block" onclick="nextFormStep()">${e.next}</button>
            </div>

            <div class="form-step hidden" data-step="4">
                <button type="button" class="back-btn" onclick="previousFormStep()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    ${e.back}
                </button>
                <h3 class="form-step-title">${e.stepDesc}</h3>
                <div class="form-step-help">
                    <p><b>${e.descHint1}</b><br>
                    ${e.descHintLine}
                    ${e.descHintMulti}</p>
                    <pre>https://t.me/nft/PlushPepe-1\nhttps://t.me/nft/DurovsCap-1</pre>
                    <p><b>${e.descHintElse}</b> ${e.descHintElseExample}
                    <code>2 Crystals and 1 Butterfly</code></p>
                </div>
                <div class="form-group">
                    <textarea id="order-description"
                              class="form-textarea"
                              placeholder="${e.descPlaceholder}"
                              rows="5"
                              required></textarea>
                </div>
                <button type="button" class="btn btn-primary btn-block" onclick="nextFormStep()">${e.next}</button>
            </div>

            <div class="form-step hidden" data-step="5">
                <button type="button" class="back-btn" onclick="previousFormStep()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    ${e.back}
                </button>
                <h3 class="form-step-title">${e.stepConfirm}</h3>
                <div class="order-summary">
                    <div class="summary-item">
                        <span>${e.sumType}</span>
                        <span id="summary-type"></span>
                    </div>
                    <div class="summary-item">
                        <span>${e.sumAmount}</span>
                        <span id="summary-amount"></span>
                    </div>
                    <div class="summary-item">
                        <span>${e.sumDescription}</span>
                        <span id="summary-description"></span>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-block">${e.submit}</button>
            </div>\n        </form>\n    `);
    document.body.appendChild(t),
    initOrderForm()
}
let orderFormData = {
    step: 1
};
function initOrderForm() {
    document.querySelectorAll(".choice-btn").forEach(e => {
        e.addEventListener("click", () => {
            orderFormData.deal_type = e.dataset.value,
            nextFormStep()
        })
    }),
    document.querySelectorAll(".currency-btn").forEach(e => {
        e.addEventListener("click", () => {
            orderFormData.currency = e.dataset.value,
            document.getElementById("selected-currency-display").textContent = e.dataset.value,
            nextFormStep()
        })
    }),
    document.getElementById("create-order-form").addEventListener("submit", async e => {
        e.preventDefault(),
        showCreateDealSafetyWarning(async () => {
            await submitOrderForm()
        })
    });

    // UX fix: Close keyboard on Enter/Done for amount and description
    const amountInput = document.getElementById("order-amount");
    if (amountInput) {
        amountInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                amountInput.blur();
                nextFormStep();
            }
        });
    }

    const descInput = document.getElementById("order-description");
    if (descInput) {
        descInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                descInput.blur();
                nextFormStep();
            }
        });
    }
}
function nextFormStep() {
    const e = orderFormData.step;
    if (3 === e) {
        const e = document.getElementById("order-amount").value;
        if (!e || parseFloat(e) <= 0)
            return void showNotification(t("nInvalidAmount"), "error");
        orderFormData.amount = e
    }
    if (4 === e) {
        const e = document.getElementById("order-description").value;
        if (!e || e.trim().length < 5)
            return void showNotification(t("nDescTooShort"), "error");
        orderFormData.description = e
    }
    document.querySelector(`[data-step="${e}"]`).classList.add("hidden"),
    orderFormData.step = e + 1,
    document.querySelector(`[data-step="${orderFormData.step}"]`).classList.remove("hidden"),
    5 === orderFormData.step && updateOrderSummary()
}
function previousFormStep() {
    const e = orderFormData.step;
    document.querySelector(`[data-step="${e}"]`).classList.add("hidden"),
    orderFormData.step = e - 1,
    document.querySelector(`[data-step="${orderFormData.step}"]`).classList.remove("hidden")
}
function updateOrderSummary() {
    const e = {
            ru: {
                buy: "Покупка",
                sell: "Продажа"
            },
            en: {
                buy: "Buy",
                sell: "Sell"
            },
            uk: {
                buy: "Купівля",
                sell: "Продаж"
            },
            ar: {
                buy: "شراء",
                sell: "بيع"
            },
            zh: {
                buy: "购买",
                sell: "出售"
            }
        },
        t = e[window.state && state.language || "en"] || e.en;
    document.getElementById("summary-type").textContent = "buy" === orderFormData.deal_type ? t.buy : t.sell,
    document.getElementById("summary-amount").textContent = `${orderFormData.amount} ${orderFormData.currency}`,
    document.getElementById("summary-description").textContent = orderFormData.description
}
const MAT_ICONS = {
    warn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 21h22L12 2 1 21Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z" fill="currentColor"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z" fill="currentColor"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" fill="currentColor"/></svg>',
    cancel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2Zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59Z" fill="currentColor"/></svg>',
    money: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6v12h20V6H2Zm18 9.93c-1.13.41-2.03 1.31-2.44 2.44L4.44 18.37C4.03 17.24 3.13 16.34 2 15.93V8.07c1.13-.41 2.03-1.31 2.44-2.44h13.12c.41 1.13 1.31 2.03 2.44 2.44v7.86ZM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4Z" fill="currentColor"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2ZM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6Zm9 14H6V10h12v10Z" fill="currentColor"/></svg>',
    crisis: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 8h2v6h-2V8Zm0 8h2v2h-2v-2Zm9.49-4-7.78-7.78a1 1 0 0 0-1.42 0L3.5 12l7.78 7.78a1 1 0 0 0 1.42 0L20.49 12Z" fill="currentColor"/></svg>'
};
function _matIcon(e, t) {
    return `<span class="mat-icon mat-icon--${t || e}" aria-hidden="true">${MAT_ICONS[e] || ""}</span>`
}
function _patchTextPlaceholder(e, t, n) {
    if (!e || !t || t === n)
        return;
    const a = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, null);
    let s;
    for (; s = a.nextNode();)
        s.nodeValue && -1 !== s.nodeValue.indexOf(t) && (s.nodeValue = s.nodeValue.split(t).join(n))
}
const SAFETY_WARNING_COPY = {
    ru: {
        title: "Безопасность сделки",
        readBtn: "Я ознакомился",
        countdownBtn: e => `Прочитайте — ${e}c`,
        body: e => `\n            <p class="safety-headline">${_matIcon("crisis", "crisis")} ВНИМАНИЕ! ВАЖНАЯ ИНФОРМАЦИЯ О БЕЗОПАСНОСТИ</p>\n            <p class="safety-callout">${_matIcon("warn", "warn")} Участились случаи мошенничества!</p>\n            <p>Мошенники возвращают платежи за сделки и просят передать подарок напрямую им, минуя эскроу-аккаунт.</p>\n            <p class="safety-section-title">${_matIcon("shield", "shield")} Правила безопасности:</p>\n            <ul class="safety-list">\n                <li>${_matIcon("check", "check")} Передавайте подарок <b>ТОЛЬКО</b> в банк ${e}</li>\n                <li>${_matIcon("cancel", "cancel")} <b>НИКОГДА</b> не отправляйте напрямую покупателю</li>\n                <li>${_matIcon("warn", "warn")} Даже если покупатель уговаривает — <b>НЕ ДЕЛАЙТЕ ЭТОГО</b>!</li>\n            </ul>\n            <p class="safety-section-title">${_matIcon("money", "money")} Если вы нарушите правила:</p>\n            <ul class="safety-list safety-list--punish">\n                <li>Останетесь без денег</li>\n                <li>Останетесь без подарка</li>\n                <li>Мы не сможем вам помочь</li>\n            </ul>\n            <p class="safety-footer">${_matIcon("lock", "lock")} Помните: только банк ${e} гарантирует безопасность сделки.</p>\n        `
    },
    en: {
        title: "Deal safety",
        readBtn: "I've read it",
        countdownBtn: e => `Read it — ${e}s`,
        body: e => `\n            <p class="safety-headline">${_matIcon("crisis", "crisis")} IMPORTANT SAFETY NOTICE</p>\n            <p class="safety-callout">${_matIcon("warn", "warn")} Fraud cases are on the rise!</p>\n            <p>Scammers refund payments for deals and ask you to hand the gift directly to them, bypassing the escrow account.</p>\n            <p class="safety-section-title">${_matIcon("shield", "shield")} Safety rules:</p>\n            <ul class="safety-list">\n                <li>${_matIcon("check", "check")} Hand the gift <b>ONLY</b> to Bank ${e}</li>\n                <li>${_matIcon("cancel", "cancel")} <b>NEVER</b> send it directly to the buyer</li>\n                <li>${_matIcon("warn", "warn")} Even if the buyer insists — <b>DO NOT DO IT</b>!</li>\n            </ul>\n            <p class="safety-section-title">${_matIcon("money", "money")} If you break the rules:</p>\n            <ul class="safety-list safety-list--punish">\n                <li>You will lose the money</li>\n                <li>You will lose the gift</li>\n                <li>We won't be able to help you</li>\n            </ul>\n            <p class="safety-footer">${_matIcon("lock", "lock")} Remember: only Bank ${e} guarantees a safe deal.</p>\n        `
    },
    uk: {
        title: "Безпека угоди",
        readBtn: "Я ознайомився",
        countdownBtn: e => `Прочитайте — ${e}с`,
        body: e => `\n            <p class="safety-headline">${_matIcon("crisis", "crisis")} УВАГА! ВАЖЛИВА ІНФОРМАЦІЯ ПРО БЕЗПЕКУ</p>\n            <p class="safety-callout">${_matIcon("warn", "warn")} Почастішали випадки шахрайства!</p>\n            <p>Шахраї повертають платежі за угоди та просять передати подарунок безпосередньо їм, оминаючи ескроу-акаунт.</p>\n            <p class="safety-section-title">${_matIcon("shield", "shield")} Правила безпеки:</p>\n            <ul class="safety-list">\n                <li>${_matIcon("check", "check")} Передавайте подарунок <b>ЛИШЕ</b> у банк ${e}</li>\n                <li>${_matIcon("cancel", "cancel")} <b>НІКОЛИ</b> не надсилайте напряму покупцю</li>\n                <li>${_matIcon("warn", "warn")} Навіть якщо покупець вмовляє — <b>НЕ РОБІТЬ ЦЬОГО</b>!</li>\n            </ul>\n            <p class="safety-section-title">${_matIcon("money", "money")} Якщо ви порушите правила:</p>\n            <ul class="safety-list safety-list--punish">\n                <li>Залишитесь без грошей</li>\n                <li>Залишитесь без подарунка</li>\n                <li>Ми не зможемо вам допомогти</li>\n            </ul>\n            <p class="safety-footer">${_matIcon("lock", "lock")} Пам'ятайте: лише банк ${e} гарантує безпеку угоди.</p>\n        `
    },
    ar: {
        title: "أمان الصفقة",
        readBtn: "لقد قرأت",
        countdownBtn: e => `اقرأ — ${e}ث`,
        dir: "rtl",
        body: e => `\n            <p class="safety-headline">${_matIcon("crisis", "crisis")} تنبيه! معلومات أمان مهمة</p>\n            <p class="safety-callout">${_matIcon("warn", "warn")} حالات الاحتيال في ازدياد!</p>\n            <p>يقوم المحتالون بإلغاء مدفوعات الصفقات ويطلبون تسليم الهدية مباشرة إليهم، متجاوزين حساب الضمان.</p>\n            <p class="safety-section-title">${_matIcon("shield", "shield")} قواعد الأمان:</p>\n            <ul class="safety-list">\n                <li>${_matIcon("check", "check")} سلِّم الهدية <b>فقط</b> إلى حساب ${e}</li>\n                <li>${_matIcon("cancel", "cancel")} <b>لا ترسلها أبدًا</b> مباشرة إلى المشتري</li>\n                <li>${_matIcon("warn", "warn")} حتى لو ألحَّ المشتري — <b>لا تفعل ذلك</b>!</li>\n            </ul>\n            <p class="safety-section-title">${_matIcon("money", "money")} إذا خالفت القواعد:</p>\n            <ul class="safety-list safety-list--punish">\n                <li>ستخسر المال</li>\n                <li>ستخسر الهدية</li>\n                <li>لن نتمكن من مساعدتك</li>\n            </ul>\n            <p class="safety-footer">${_matIcon("lock", "lock")} تذكَّر: فقط ${e} يضمن أمان الصفقة.</p>\n        `
    },
    zh: {
        title: "交易安全",
        readBtn: "我已阅读",
        countdownBtn: e => `请先阅读 — ${e}秒`,
        body: e => `\n            <p class="safety-headline">${_matIcon("crisis", "crisis")} 重要安全提示</p>\n            <p class="safety-callout">${_matIcon("warn", "warn")} 欺诈案件在增加！</p>\n            <p>骗子会撤销订单付款，并要求将礼物直接交给他们，绕过托管账户。</p>\n            <p class="safety-section-title">${_matIcon("shield", "shield")} 安全规则：</p>\n            <ul class="safety-list">\n                <li>${_matIcon("check", "check")} 仅将礼物交给 <b>${e}</b> 账户</li>\n                <li>${_matIcon("cancel", "cancel")} <b>切勿</b>直接发送给买家</li>\n                <li>${_matIcon("warn", "warn")} 即使买家劝说也<b>不要这样做</b>！</li>\n            </ul>\n            <p class="safety-section-title">${_matIcon("money", "money")} 如果你违反规则：</p>\n            <ul class="safety-list safety-list--punish">\n                <li>你将失去钱款</li>\n                <li>你将失去礼物</li>\n                <li>我们将无法帮助你</li>\n            </ul>\n            <p class="safety-footer">${_matIcon("lock", "lock")} 请记住：只有 ${e} 能保证交易安全。</p>\n        `
    }
};
function showCreateDealSafetyWarning(e) {
    "function" == typeof haptic && haptic("warning");
    let t = window.state && state.language || null;
    if (!t)
        try {
            t = localStorage.getItem("app_language")
        } catch (e) {}
    t && SAFETY_WARNING_COPY[t] || (t = "en");
    const n = SAFETY_WARNING_COPY[t],
        a = "@FunRelayer",
        s = document.createElement("div");
    s.className = "modal-overlay active safety-warning-overlay",
    "rtl" === n.dir && s.setAttribute("dir", "rtl");
    const r = `<a class="safety-mgr tg-user-link" data-mgr href="https://t.me/${a.replace(/^@/, "")}" target="_blank" rel="noopener noreferrer">${a}</a>`;
    s.innerHTML = `\n        <div class="modal-content safety-warning">\n            <div class="safety-warning-head">\n                <div class="safety-warning-pulse" aria-hidden="true">\n                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\n                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>\n                        <line x1="12" y1="9" x2="12" y2="13"/>\n                        <line x1="12" y1="17" x2="12.01" y2="17"/>\n                    </svg>\n                </div>\n                <h2 class="safety-warning-title">${n.title}</h2>\n            </div>\n            <div class="safety-warning-body">${n.body(r)}</div>\n            <button type="button" class="safety-warning-confirm" disabled>\n                ${n.countdownBtn(10)}\n            </button>\n        </div>\n    `,
    document.body.appendChild(s);
    const i = e => {
        if (!s.isConnected)
            return;
        const t = String(e).replace(/^@/, ""),
            n = "@" + t;
        s.querySelectorAll("[data-mgr]").forEach(e => {
            e.textContent = n,
            "A" === e.tagName && e.setAttribute("href", `https://t.me/${t}`)
        });
        const r = s.querySelector(".safety-warning-body");
        r && _patchTextPlaceholder(r, a, n)
    };
    window.state && state._escrowUsername ? i(state._escrowUsername) : fetch(`${CONFIG.apiUrl.replace(/\/api$/, "")}/api/config`).then(e => e.ok ? e.json() : null).then(e => {
        if (!e)
            return;
        const t = e.escrow_username || e.support_username;
        t && (window.state && (state._escrowUsername = t), i(t))
    }).catch(() => {});
    let o = 10;
    const l = s.querySelector(".safety-warning-confirm"),
        c = setInterval(() => {
            if (s.isConnected) {
                if (o -= 1, o <= 0)
                    return clearInterval(c), l.disabled = !1, l.classList.add("safety-warning-confirm--ready"), l.textContent = n.readBtn, void ("function" == typeof haptic && haptic("selection"));
                l.textContent = n.countdownBtn(o)
            } else
                clearInterval(c)
        }, 1e3),
        d = new MutationObserver(() => {
            s.isConnected || (clearInterval(c), d.disconnect())
        });
    d.observe(document.body, {
        childList: !0,
        subtree: !0
    }),
    l.addEventListener("click", () => {
        if (!l.disabled) {
            "function" == typeof haptic && haptic("success"),
            clearInterval(c),
            d.disconnect(),
            s.classList.add("closing"),
            setTimeout(() => s.remove(), 200);
            try {
                e()
            } catch (e) {}
        }
    })
}
async function submitOrderForm() {
    let e = !1,
        n = null,
        a = null;
    try {
        showNotification(t("dealCreating"), "info");
        const s = await fetch(`${CONFIG.apiUrl}/deals/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Telegram-InitData": window.FunpayTG && FunpayTG.initData || ""
            },
            body: JSON.stringify({
                user_id: state.user.id,
                deal_type: orderFormData.deal_type,
                amount: orderFormData.amount,
                currency: orderFormData.currency,
                description: orderFormData.description
            })
        });
        if (!s.ok) {
            try {
                a = (await s.json()).detail
            } catch (e) {}
            throw new Error(a || "create failed: " + s.status)
        }
        const r = await s.json();
        if (!r || !r.success)
            throw new Error("backend returned non-success");
        e = !0,
        n = r.deal_tag
    } catch (e) {
        return void showNotification(a || t("dealCreateFailed"), "error")
    }
    try {
        showNotification(t("dealCreated"), "success")
    } catch (e) {}
    try {
        closeModal()
    } catch (e) {}
    try {
        document.querySelectorAll(".modal-overlay").forEach(e => {
            try {
                e.remove()
            } catch (e) {}
        })
    } catch (e) {}
    try {
        "function" == typeof invalidateDealsCache && invalidateDealsCache()
    } catch (e) {}
    try {
        n && "function" == typeof showOrderDetails ? Promise.resolve(showOrderDetails(n)).catch(e => {}) : "function" == typeof loadOrdersList && loadOrdersList("active")
    } catch (e) {}
    orderFormData = {
        step: 1
    }
}
async function showOrderDetails(e) {
    try {
        const n = await fetch(`${CONFIG.apiUrl}/deals/${e}`),
            a = (await n.json()).deal,
            s = "buy" === a.deal_type ? t("dealBuyValue") : t("dealSellValue"),
            r = createModal(t("orderDetailsTitle"), `\n            <div class="order-details">\n                <div class="detail-header">\n                    <span class="order-tag">#${e}</span>\n                    <span class="order-status status-${a.status}">${getStatusText(a.status)}</span>\n                </div>\n\n                <div class="detail-section">\n                    <div class="detail-item">\n                        <span class="detail-label">${t("dealTypeLabel")}</span>\n                        <span class="detail-value">${s}</span>\n                    </div>\n                    <div class="detail-item">\n                        <span class="detail-label">${t("amountLabel")}</span>\n                        <span class="detail-value highlight">${a.amount} ${a.currency}</span>\n                    </div>\n                    <div class="detail-item">\n                        <span class="detail-label">${t("sellerLabel")}</span>\n                        <span class="detail-value">${formatUserDisplay(a.seller_first_name, a.seller_username)}</span>\n                    </div>\n                    ${a.buyer_id ? `\n                        <div class="detail-item">\n                            <span class="detail-label">${t("buyerLabel")}</span>\n                            <span class="detail-value">${formatUserDisplay(a.buyer_first_name, a.buyer_username)}</span>\n                        </div>\n                    ` : ""}\n                </div>\n\n                <div class="detail-section">\n                    <h4>${t("descriptionLabel")}</h4>\n                    <p class="detail-description">${a.description}</p>\n                </div>\n\n                ${a.wallet ? `\n                    <div class="detail-section">\n                        <h4>${t("requisitesLabel")}</h4>\n                        <div class="detail-requisites">\n                            <span class="requisite-label">${t("walletColon")}</span>\n                            <span class="requisite-value">${a.wallet}</span>\n                        </div>\n                    </div>\n                ` : ""}\n\n                <div class="detail-actions">\n                    ${"wait_payment" === a.status ? `\n                        <button class="btn btn-primary" onclick="cancelOrder('${e}')">${t("cancelDealBtn")}</button>\n                    ` : ""}\n                </div>\n            </div>\n        `);
        document.body.appendChild(r)
    } catch (e) {
        showNotification(t("nLoadOrderError"), "error")
    }
}
function showDepositModal() {
    const e = createModal(t("depositTitleLegacy"), `\n        <div class="deposit-form">\n            <div class="form-group">\n                <label class="form-label">${t("chooseCurrencyLabel")}</label>\n                <select id="deposit-currency" class="form-select">\n                    ${CONFIG.currencies.map(e => `<option value="${e}">${e}</option>`).join("")}\n                </select>\n            </div>\n\n            <div class="form-group">\n                <label class="form-label">${t("amountLabel2")}</label>\n                <input type="number" id="deposit-amount" class="form-input" placeholder="0.00" step="0.01" min="0.01">\n            </div>\n\n            <div class="info-box">\n                <p>${t("depositInfoLegacy")}</p>\n            </div>\n\n            <button class="btn btn-primary" onclick="processDeposit()">${t("getRequisitesBtn")}</button>\n        </div>\n    `);
    document.body.appendChild(e)
}
function processDeposit() {
    document.getElementById("deposit-currency").value;
    const e = document.getElementById("deposit-amount").value;
    !e || parseFloat(e) <= 0 ? showNotification(t("nInvalidAmount"), "error") : showNotification(t("nFunctionInDevDeposit"), "info")
}
async function showWithdrawModal() {
    try {
        const e = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}`),
            n = await e.json();
        if (!n.wallet && !n.card)
            return void showNotification(t("nAddRequisitesFirst"), "warning");
        const a = createModal(t("withdrawTitleLegacy"), `\n            <div class="withdraw-form">\n                <div class="form-group">\n                    <label class="form-label">${t("chooseCurrencyLabel")}</label>\n                    <select id="withdraw-currency" class="form-select">\n                        ${CONFIG.currencies.map(e => `<option value="${e}">${e}</option>`).join("")}\n                    </select>\n                </div>\n\n                <div class="form-group">\n                    <label class="form-label">${t("amountLabel2")}</label>\n                    <input type="number" id="withdraw-amount" class="form-input" placeholder="0.00" step="0.01" min="0.01">\n                </div>\n\n                <div class="form-group">\n                    <label class="form-label">${t("whereToWithdraw")}</label>\n                    <select id="withdraw-method" class="form-select">\n                        ${n.wallet ? `<option value="wallet">${t("tonWalletColon")} ${n.wallet.substring(0, 10)}...</option>` : ""}\n                        ${n.card ? `<option value="card">${t("cardColon")} ${n.card.substring(0, 10)}...</option>` : ""}\n                    </select>\n                </div>\n\n                <div class="info-box warning">\n                    <p>${t("withdrawWarnLegacy")}</p>\n                </div>\n\n                <button class="btn btn-primary" onclick="processWithdraw()">${t("withdrawBtn")}</button>\n            </div>\n        `);
        document.body.appendChild(a)
    } catch (e) {
        showNotification(t("nLoadRequisitesError"), "error")
    }
}
function processWithdraw() {
    document.getElementById("withdraw-currency").value;
    const e = document.getElementById("withdraw-amount").value;
    document.getElementById("withdraw-method").value,
    !e || parseFloat(e) <= 0 ? showNotification(t("nInvalidAmount"), "error") : showNotification(t("nFunctionInDevWithdraw"), "info")
}
function createModal(e, t) {
    const n = document.createElement("div");
    n.className = "modal-overlay";
    n.dataset.modalLocked = "1";
    n.onclick = ev => {
        if (ev.target === n && n.dataset.modalLocked !== "1") closeModal();
    };
    n.innerHTML = `\n        <div class="modal">\n            <div class="modal-header">\n                <h2 class="modal-title">${e}</h2>\n                <button class="modal-close" onclick="closeModal()">\n                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">\n                        <line x1="18" y1="6" x2="6" y2="18"></line>\n                        <line x1="6" y1="6" x2="18" y2="18"></line>\n                    </svg>\n                </button>\n            </div>\n            <div class="modal-content">\n                ${t}\n            </div>\n        </div>\n    `;
    const content = n.querySelector(".modal");
    if (content) content.addEventListener("click", ev => ev.stopPropagation());
    requestAnimationFrame(() => { if (n.isConnected) n.dataset.modalLocked = "0"; });
    return n;
}
function closeModal() {
    const e = document.querySelector(".modal-overlay");
    e && (e.style.opacity = "0", setTimeout(() => e.remove(), 200))
}
window.showCreateDealSafetyWarning = showCreateDealSafetyWarning,
"function" == typeof addTranslations && addTranslations({
    dealCreating: {
        ru: "Создание сделки…",
        en: "Creating deal…",
        uk: "Створення угоди…",
        ar: "جاري إنشاء الصفقة…",
        zh: "正在创建交易…"
    },
    dealCreated: {
        ru: "Сделка создана!",
        en: "Deal created!",
        uk: "Угоду створено!",
        ar: "تم إنشاء الصفقة!",
        zh: "交易已创建！"
    },
    dealCreateFailed: {
        ru: "Ошибка создания сделки",
        en: "Failed to create deal",
        uk: "Помилка створення угоди",
        ar: "فشل إنشاء الصفقة",
        zh: "创建交易失败"
    }
}),
"function" == typeof addTranslations && addTranslations({
    orderDetailsTitle: {
        ru: "Детали сделки",
        en: "Deal details",
        uk: "Деталі угоди",
        ar: "تفاصيل الصفقة",
        zh: "交易详情"
    },
    dealTypeLabel: {
        ru: "Тип",
        en: "Type",
        uk: "Тип",
        ar: "النوع",
        zh: "类型"
    },
    dealBuyValue: {
        ru: "Покупка",
        en: "Buy",
        uk: "Купівля",
        ar: "شراء",
        zh: "购买"
    },
    dealSellValue: {
        ru: "Продажа",
        en: "Sell",
        uk: "Продаж",
        ar: "بيع",
        zh: "出售"
    },
    amountLabel: {
        ru: "Сумма",
        en: "Amount",
        uk: "Сума",
        ar: "المبلغ",
        zh: "金额"
    },
    sellerLabel: {
        ru: "Продавец",
        en: "Seller",
        uk: "Продавець",
        ar: "البائع",
        zh: "卖家"
    },
    buyerLabel: {
        ru: "Покупатель",
        en: "Buyer",
        uk: "Покупець",
        ar: "المشتري",
        zh: "买家"
    },
    descriptionLabel: {
        ru: "Описание",
        en: "Description",
        uk: "Опис",
        ar: "الوصف",
        zh: "描述"
    },
    requisitesLabel: {
        ru: "Реквизиты",
        en: "Requisites",
        uk: "Реквізити",
        ar: "التفاصيل",
        zh: "凭证"
    },
    walletColon: {
        ru: "Кошелёк:",
        en: "Wallet:",
        uk: "Гаманець:",
        ar: "المحفظة:",
        zh: "钱包："
    },
    cancelDealBtn: {
        ru: "Отменить сделку",
        en: "Cancel deal",
        uk: "Скасувати угоду",
        ar: "إلغاء الصفقة",
        zh: "取消交易"
    }
}),
"function" == typeof addTranslations && addTranslations({
    depositTitleLegacy: {
        ru: "Пополнить баланс",
        en: "Top up balance",
        uk: "Поповнити баланс",
        ar: "إيداع رصيد",
        zh: "充值余额"
    },
    chooseCurrencyLabel: {
        ru: "Выберите валюту",
        en: "Choose currency",
        uk: "Виберіть валюту",
        ar: "اختر العملة",
        zh: "选择货币"
    },
    amountLabel2: {
        ru: "Сумма",
        en: "Amount",
        uk: "Сума",
        ar: "المبلغ",
        zh: "金额"
    },
    depositInfoLegacy: {
        ru: "После нажатия кнопки вы получите реквизиты для пополнения",
        en: "After pressing the button you will receive top-up details",
        uk: "Після натискання кнопки ви отримаєте реквізити для поповнення",
        ar: "بعد الضغط على الزر ستحصل على تفاصيل الإيداع",
        zh: "按下按钮后您将收到充值详细信息"
    },
    getRequisitesBtn: {
        ru: "Получить реквизиты",
        en: "Get requisites",
        uk: "Отримати реквізити",
        ar: "احصل على التفاصيل",
        zh: "获取凭证"
    },
    withdrawTitleLegacy: {
        ru: "Вывести средства",
        en: "Withdraw funds",
        uk: "Вивести кошти",
        ar: "سحب الأموال",
        zh: "提现资金"
    },
    whereToWithdraw: {
        ru: "Куда вывести",
        en: "Where to withdraw",
        uk: "Куди вивести",
        ar: "إلى أين تسحب",
        zh: "提现到哪里"
    },
    tonWalletColon: {
        ru: "TON Кошелёк:",
        en: "TON Wallet:",
        uk: "TON Гаманець:",
        ar: "محفظة TON:",
        zh: "TON 钱包："
    },
    cardColon: {
        ru: "Карта:",
        en: "Card:",
        uk: "Картка:",
        ar: "البطاقة:",
        zh: "卡："
    },
    withdrawWarnLegacy: {
        ru: "⚠️ Проверьте реквизиты перед выводом!",
        en: "⚠️ Check requisites before withdrawal!",
        uk: "⚠️ Перевірте реквізити перед виведенням!",
        ar: "⚠️ تحقق من التفاصيل قبل السحب!",
        zh: "⚠️ 请在提现前检查凭证！"
    },
    withdrawBtn: {
        ru: "Вывести",
        en: "Withdraw",
        uk: "Вивести",
        ar: "سحب",
        zh: "提现"
    }
});
const _TOAST_TR = {
    "Карта сохранена": "Card saved",
    "Адрес сохранен": "Address saved",
    "Адрес сохранён": "Address saved",
    "Ошибка сохранения": "Failed to save",
    "Скопировано": "Copied",
    "Не удалось скопировать": "Failed to copy",
    "Текст скопирован": "Text copied",
    "Ссылка скопирована": "Link copied",
    "Введите корректную сумму": "Enter a valid amount",
    "Введите корректный номер карты": "Enter a valid card number",
    "Введите адрес": "Enter an address",
    "Введите username": "Enter username",
    "У вас не установлен Telegram username": "You don't have a Telegram username",
    "Адрес TRC20 должен начинаться с T": "TRC20 address must start with T",
    "Username настраивается в настройках Telegram": "Username is set in Telegram settings",
    "Ошибка при создании заявки": "Failed to create request",
    "Время ожидания истекло": "Timeout",
    "Оплата отменена": "Payment cancelled",
    "Ошибка оплаты": "Payment failed",
    "Откройте в Telegram для оплаты Stars": "Open in Telegram to pay with Stars",
    "Ошибка создания инвойса": "Failed to create invoice",
    "Недостаточно средств": "Insufficient balance",
    "Только целые числа": "Whole numbers only",
    "Описание должно быть не менее 5 символов": "Description must be at least 5 characters",
    "Сначала подключите TON-кошелёк": "Connect a TON wallet first",
    "Не удалось подключить кошелёк": "Could not connect wallet",
    "Не удалось загрузить": "Failed to load",
    "Минимум 1 Star": "Minimum 1 Star"
};
function showNotification(e, t="info", n) {
    let a = e;
    "undefined" != typeof state && state && "en" === state.language && _TOAST_TR[a] && (a = _TOAST_TR[a]);
    const s = document.createElement("div");
    s.className = `notification notification-${t}`;
    const r = n && n.iconHtml;
    if (r) {
        s.style.display = "inline-flex",
        s.style.alignItems = "center",
        s.style.justifyContent = "center",
        s.style.gap = "8px",
        s.style.textAlign = "left";
        const e = document.createElement("span");
        e.className = "notification__icon",
        e.style.display = "inline-flex",
        e.style.alignItems = "center",
        e.style.flexShrink = "0";
        const n = {
            success: "var(--color-success)",
            error: "var(--color-danger)",
            warning: "var(--color-warning)",
            info: "var(--accent-blue)"
        };
        e.style.color = n[t] || "currentColor",
        e.innerHTML = r;
        const i = document.createElement("span");
        i.className = "notification__text",
        i.textContent = a,
        s.appendChild(e),
        s.appendChild(i)
    } else
        s.textContent = a;
    document.body.appendChild(s),
    setTimeout(() => s.classList.add("show"), 100),
    setTimeout(() => {
        s.classList.remove("show"),
        setTimeout(() => s.remove(), 300)
    }, 3e3)
}
function editRequisites() {
    const e = createModal(t("editRequisitesTitle"), `\n        <div class="edit-requisites-form">\n            <div class="form-group">\n                <label class="form-label">${t("tonWalletLabel")}</label>\n                <input type="text" id="edit-wallet" class="form-input" placeholder="UQ...">\n            </div>\n\n            <div class="form-group">\n                <label class="form-label">${t("bankCardLabel")}</label>\n                <input type="text" id="edit-card" class="form-input" placeholder="0000 0000 0000 0000">\n            </div>\n\n            <button class="btn btn-primary" onclick="saveRequisites()">${t("saveBtn")}</button>\n        </div>\n    `);
    document.body.appendChild(e)
}
function editWallet() {
    const e = createModal(t("tonWalletLabel"), `\n        <div class="edit-form">\n            <div class="form-group">\n                <label class="form-label">${t("walletAddressLabel")}</label>\n                <input type="text" id="edit-wallet-input" class="form-input" placeholder="UQxxxxxxxxxxxxxxxx">\n                <p class="form-hint">${t("walletAddressHint")}</p>\n            </div>\n\n            <button class="btn btn-primary" onclick="saveWallet()">${t("saveBtn")}</button>\n        </div>\n    `);
    document.body.appendChild(e)
}
async function saveWallet() {
    const e = document.getElementById("edit-wallet-input").value.trim();
    if (e)
        try {
            await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/wallet`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    address: e
                })
            }),
            showNotification(t("nWalletUpdated"), "success"),
            closeModal(),
            loadWalletRequisites()
        } catch (e) {
            showNotification(t("nSaveWalletError"), "error")
        }
    else
        showNotification(t("nInvalidWalletAddress"), "warning")
}
function editCard() {
    const e = createModal(t("bankCardLabel"), `\n        <div class="edit-form">\n            <div class="form-group">\n                <label class="form-label">${t("cardNumberLabel")}</label>\n                <input type="text" id="edit-card-input" class="form-input" placeholder="0000 0000 0000 0000" maxlength="19">\n                <p class="form-hint">${t("cardNumberHint")}</p>\n            </div>\n\n            <button class="btn btn-primary" onclick="saveCard()">${t("saveBtn")}</button>\n        </div>\n    `);
    document.body.appendChild(e),
    document.getElementById("edit-card-input").addEventListener("input", e => {
        let t = e.target.value.replace(/\s/g, ""),
            n = t.match(/.{1,4}/g)?.join(" ") || t;
        e.target.value = n
    })
}
async function saveCard() {
    const e = document.getElementById("edit-card-input").value.trim();
    if (e)
        try {
            await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/card`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    details: e
                })
            }),
            showNotification(t("nCardUpdated"), "success"),
            closeModal(),
            loadWalletRequisites()
        } catch (e) {
            showNotification(t("nSaveCardError"), "error")
        }
    else
        showNotification(t("nInvalidCardNumber"), "warning")
}
function editStarsUsername() {
    const e = state.user.username,
        n = createModal(t("starsRecipientTitle"), `\n        <div class="edit-form">\n            <div class="info-box ${e ? "" : "warning"}">\n                ${e ? `<p>${tf("starsCurrentUsernameLine", e)}</p>` : `<p>${t("starsNoUsernameWarning")}</p>\n                       <p>${t("starsSetUsernameHelp")}</p>\n                       <ol style="text-align: left; padding-left: 20px; margin-top: 10px;">\n                           <li>${t("starsStep1OpenTg")}</li>\n                           <li>${t("starsStep2Settings")}</li>\n                           <li>${t("starsStep3TapName")}</li>\n                           <li>${t("starsStep4SetUn")}</li>\n                       </ol>`}\n            </div>\n\n            ${e ? `<p class="form-hint" style="margin-top: 16px;">${t("starsUsernameUsage")}</p>` : `<p class="form-hint" style="margin-top: 16px; color: #FF9F0A;">${t("starsCannotReceive")}</p>`}\n\n            <button class="btn btn-secondary" onclick="closeModal()">${t("closeBtn")}</button>\n        </div>\n    `);
    document.body.appendChild(n)
}
async function saveRequisites() {
    const e = document.getElementById("edit-wallet").value,
        n = document.getElementById("edit-card").value;
    try {
        e && await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/wallet`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                address: e
            })
        }),
        n && await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/card`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                details: n
            })
        }),
        showNotification(t("nRequisitesUpdated"), "success"),
        closeModal(),
        loadWalletRequisites()
    } catch (e) {
        showNotification(t("nSaveRequisitesError"), "error")
    }
}
async function cancelOrder(e) {
    const n = {
        ru: "Вы уверены, что хотите отменить эту сделку?",
        en: "Are you sure you want to cancel this deal?",
        uk: "Ви впевнені, що хочете скасувати цю угоду?",
        ar: "هل أنت متأكد من رغبتك في إلغاء هذه الصفقة؟",
        zh: "确定要取消此交易吗？"
    };
    if (confirm(n[state.language || "en"] || n.en))
        try {
            const n = await fetch(`${CONFIG.apiUrl}/deals/${e}/cancel`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: state.user.id
                })
            });
            n.ok ? (showNotification(t("nOrderCancelled"), "success"), closeModal(), "function" == typeof renderOrdersPage && renderOrdersPage()) : showNotification((await n.json()).detail || t("nGenericFailed"), "error")
        } catch (e) {
            showNotification(t("nConnectionError"), "error")
        }
}
"function" == typeof addTranslations && addTranslations({
    editRequisitesTitle: {
        ru: "Редактировать реквизиты",
        en: "Edit requisites",
        uk: "Редагувати реквізити",
        ar: "تعديل التفاصيل",
        zh: "编辑凭证"
    },
    tonWalletLabel: {
        ru: "TON Кошелёк",
        en: "TON Wallet",
        uk: "TON Гаманець",
        ar: "محفظة TON",
        zh: "TON 钱包"
    },
    bankCardLabel: {
        ru: "Банковская карта",
        en: "Bank card",
        uk: "Банківська картка",
        ar: "بطاقة بنكية",
        zh: "银行卡"
    },
    saveBtn: {
        ru: "Сохранить",
        en: "Save",
        uk: "Зберегти",
        ar: "حفظ",
        zh: "保存"
    },
    closeBtn: {
        ru: "Закрыть",
        en: "Close",
        uk: "Закрити",
        ar: "إغلاق",
        zh: "关闭"
    },
    walletAddressLabel: {
        ru: "Адрес кошелька",
        en: "Wallet address",
        uk: "Адреса гаманця",
        ar: "عنوان المحفظة",
        zh: "钱包地址"
    },
    walletAddressHint: {
        ru: "Введите адрес вашего TON кошелька",
        en: "Enter your TON wallet address",
        uk: "Введіть адресу вашого TON гаманця",
        ar: "أدخل عنوان محفظة TON الخاصة بك",
        zh: "请输入您的 TON 钱包地址"
    },
    cardNumberLabel: {
        ru: "Номер карты",
        en: "Card number",
        uk: "Номер картки",
        ar: "رقم البطاقة",
        zh: "卡号"
    },
    cardNumberHint: {
        ru: "Введите номер карты для получения средств",
        en: "Enter card number to receive funds",
        uk: "Введіть номер картки для отримання коштів",
        ar: "أدخل رقم البطاقة لاستلام الأموال",
        zh: "请输入接收资金的卡号"
    },
    starsRecipientTitle: {
        ru: "Получатель Telegram Stars",
        en: "Telegram Stars recipient",
        uk: "Отримувач Telegram Stars",
        ar: "مستلم Telegram Stars",
        zh: "Telegram Stars 收件人"
    },
    starsCurrentUsernameLine: {
        ru: e => `Ваш текущий username: <strong>@${e}</strong>`,
        en: e => `Your current username: <strong>@${e}</strong>`,
        uk: e => `Ваш поточний username: <strong>@${e}</strong>`,
        ar: e => `اسم المستخدم الحالي: <strong>@${e}</strong>`,
        zh: e => `您的当前用户名: <strong>@${e}</strong>`
    },
    starsNoUsernameWarning: {
        ru: "⚠️ У вас не установлен username в Telegram",
        en: "⚠️ You don't have a Telegram username set",
        uk: "⚠️ У вас не встановлено username у Telegram",
        ar: "⚠️ ليس لديك اسم مستخدم محدد في Telegram",
        zh: "⚠️ 您未设置 Telegram 用户名"
    },
    starsSetUsernameHelp: {
        ru: "Чтобы получать Telegram Stars, установите username в настройках Telegram:",
        en: "To receive Telegram Stars, set a username in Telegram settings:",
        uk: "Щоб отримувати Telegram Stars, встановіть username у налаштуваннях Telegram:",
        ar: "لاستلام Telegram Stars، اضبط اسم مستخدم في إعدادات Telegram:",
        zh: "要接收 Telegram Stars，请在 Telegram 设置中设置用户名："
    },
    starsStep1OpenTg: {
        ru: "Откройте Telegram",
        en: "Open Telegram",
        uk: "Відкрийте Telegram",
        ar: "افتح Telegram",
        zh: "打开 Telegram"
    },
    starsStep2Settings: {
        ru: "Перейдите в Настройки",
        en: "Go to Settings",
        uk: "Перейдіть до Налаштувань",
        ar: "انتقل إلى الإعدادات",
        zh: "进入设置"
    },
    starsStep3TapName: {
        ru: "Нажмите на своё имя",
        en: "Tap your name",
        uk: "Натисніть на своє ім'я",
        ar: "اضغط على اسمك",
        zh: "点击您的姓名"
    },
    starsStep4SetUn: {
        ru: "Установите Username",
        en: "Set a Username",
        uk: "Встановіть Username",
        ar: "اضبط اسم المستخدم",
        zh: "设置用户名"
    },
    starsUsernameUsage: {
        ru: "Username используется для получения Telegram Stars в сделках",
        en: "Username is used to receive Telegram Stars in deals",
        uk: "Username використовується для отримання Telegram Stars в угодах",
        ar: "يستخدم اسم المستخدم لاستلام Telegram Stars في الصفقات",
        zh: "用户名用于在交易中接收 Telegram Stars"
    },
    starsCannotReceive: {
        ru: "Без username вы не сможете получать платежи в Telegram Stars",
        en: "Without a username you cannot receive Telegram Stars payments",
        uk: "Без username ви не зможете отримувати платежі в Telegram Stars",
        ar: "بدون اسم مستخدم لا يمكنك استلام مدفوعات Telegram Stars",
        zh: "没有用户名您将无法接收 Telegram Stars 付款"
    }
}),
window.showCreateOrderForm = showCreateOrderForm,
window.showOrderDetails = showOrderDetails,
window.showDepositModal = showDepositModal,
window.showWithdrawModal = showWithdrawModal,
window.editWallet = editWallet,
window.editCard = editCard,
window.editStarsUsername = editStarsUsername,
window.editRequisites = editRequisites,
window.saveWallet = saveWallet,
window.saveCard = saveCard,
window.saveRequisites = saveRequisites,
window.cancelOrder = cancelOrder,
window.closeModal = closeModal,
window.nextFormStep = nextFormStep,
window.previousFormStep = previousFormStep;
