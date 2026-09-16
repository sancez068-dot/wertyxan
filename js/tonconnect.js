function haptic(n="light") {
    window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback && ("light" === n ? window.Telegram.WebApp.HapticFeedback.impactOccurred("light") : "medium" === n ? window.Telegram.WebApp.HapticFeedback.impactOccurred("medium") : "heavy" === n ? window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy") : "success" === n ? window.Telegram.WebApp.HapticFeedback.notificationOccurred("success") : "error" === n && window.Telegram.WebApp.HapticFeedback.notificationOccurred("error"))
}
function getDepositAddress(){return window.state&&window.state.tonAddress||""}
let tonConnectUI = null,
    isDisconnecting = !1,
    _tonUserInitiatedConnect = !1,
    _tonLastDisconnectAt = 0;
const _TON_DISCONNECT_COOLDOWN_MS = 8e3;
function _clearTonConnectStorage() {
    try {
        const n = [];
        for (let t = 0; t < localStorage.length; t++) {
            const e = localStorage.key(t);
            e && (e.startsWith("ton-connect") || e.startsWith("tc-") || e.toLowerCase().includes("tonconnect")) && n.push(e)
        }
        n.forEach(n => localStorage.removeItem(n)),
        n.length
    } catch (n) {}
}
function rawToUserFriendly(n) {
    if (!n || !n.startsWith("0:"))
        return n;
    try {
        const t = n.slice(2);
        if (64 !== t.length || !/^[0-9a-fA-F]+$/.test(t))
            return n;
        const e = new Uint8Array(t.match(/.{1,2}/g).map(n => parseInt(n, 16))),
            o = new Uint8Array(34);
        o[0] = 81,
        o[1] = 0,
        o.set(e, 2);
        const i = crc16(o.slice(0, 34)),
            c = new Uint8Array(36);
        return c.set(o, 0), c[34] = i >> 8, c[35] = 255 & i, btoa(String.fromCharCode.apply(null, c)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    } catch (t) {
        return n
    }
}
function crc16(n) {
    let t = 0;
    for (let e = 0; e < n.length; e++) {
        t ^= n[e] << 8;
        for (let n = 0; n < 8; n++)
            t = 32768 & t ? t << 1 ^ 4129 : t << 1
    }
    return 65535 & t
}
async function initTonConnect() {
    state && state.user && updateWalletUI(state.user.ton_connect_wallet || null)
}
async function handleWalletConnection(n) {
    if (n) {
        let e = n.account.address,
            o = e;
        e.startsWith("0:") && (o = rawToUserFriendly(e));
        const i = state.user.ton_connect_wallet;
        if (Date.now() - _tonLastDisconnectAt < 8e3) {
            try {
                isDisconnecting = !0,
                tonConnectUI && await tonConnectUI.disconnect(),
                _clearTonConnectStorage()
            } catch (n) {} finally {
                setTimeout(() => {
                    isDisconnecting = !1
                }, 8e3)
            }
            return
        }
        if (i === o || i === e)
            return void updateWalletUI(o);
        if (!i && !_tonUserInitiatedConnect) {
            try {
                isDisconnecting = !0,
                tonConnectUI && await tonConnectUI.disconnect(),
                _clearTonConnectStorage()
            } catch (n) {} finally {
                _tonLastDisconnectAt = Date.now(),
                setTimeout(() => {
                    isDisconnecting = !1
                }, 8e3)
            }
            return
        }
        _tonUserInitiatedConnect = !1;
        try {
            const n = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/ton_wallet`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    address: o
                })
            });
            if (n.ok)
                haptic("success"),
                state.user.ton_connect_wallet = o,
                updateWalletUI(o),
                showNotification(t("nWalletLinked"), "success");
            else {
                const e = await n.json();
                haptic("error"),
                showNotification(`${t("error")}: ${e.detail || t("nSaveWalletError")}`, "error")
            }
        } catch (n) {
            haptic("error"),
            showNotification(t("nSaveWalletError"), "error")
        }
    } else
        !isDisconnecting && state.user.ton_connect_wallet && (state.user.ton_connect_wallet = null, updateWalletUI(null)),
        setTimeout(() => {
            isDisconnecting = !1
        }, 500)
}
function updateWalletUI(n) {
    const e = document.getElementById("ton-wallet-container");
    if (e)
        if (n) {
            const t = `${n.slice(0, 4)}...${n.slice(-4)}`,
                o = {
                    ru: {
                        wallet: "TON Кошелёк",
                        disconnect: "Отвязать"
                    },
                    en: {
                        wallet: "TON Wallet",
                        disconnect: "Disconnect"
                    },
                    uk: {
                        wallet: "TON Гаманець",
                        disconnect: "Відв’язати"
                    },
                    ar: {
                        wallet: "محفظة TON",
                        disconnect: "فصل"
                    },
                    zh: {
                        wallet: "TON 钱包",
                        disconnect: "断开"
                    }
                },
                i = o[window.state && state.language || "en"] || o.en;
            e.innerHTML = `\n            <div class="connected-wallet">\n                <div class="wallet-info">\n                    <div class="wallet-details">\n                        <div class="wallet-label">${i.wallet}</div>\n                        <div class="wallet-address">${t}</div>\n                    </div>\n                </div>\n                <button class="btn-disconnect" onclick="disconnectTonWallet()">\n                    ${i.disconnect}\n                </button>\n            </div>\n        `
        } else {
            const n = {
                    ru: "Подключить TON кошелёк",
                    en: "Connect TON wallet",
                    uk: "Підключити TON гаманець",
                    ar: "ربط محفظة TON",
                    zh: "连接 TON 钱包"
                },
                o = {
                    ru: "Загрузка кошелька…",
                    en: "Loading wallet…",
                    uk: "Завантаження гаманця…",
                    ar: "جاري تحميل المحفظة…",
                    zh: "正在加载钱包…"
                },
                i = window.state && state.language || "en",
                c = n[i] || n.en,
                a = o[i] || o.en,
                r = "undefined" != typeof TON_CONNECT_UI && window.tonConnectUI;
            e.innerHTML = `\n            <div class="ton-connect-mount">\n                <button type="button" class="btn btn-primary btn-block ton-connect-btn"\n                        id="ton-connect-btn-custom"\n                        ${r ? "" : "disabled"}\n                        aria-label="${c}">\n                    <span class="ton-connect-btn__sticker" id="ton-connect-btn-sticker" aria-hidden="true"></span>\n                    <span class="ton-connect-btn__label">${r ? c : a}</span>\n                </button>\n            </div>\n        `;
            _mountTonConnectBtnSticker(e.querySelector("#ton-connect-btn-sticker"));
            const s = e.querySelector("#ton-connect-btn-custom"),
                l = () => {
                    if (!s || !s.isConnected)
                        return;
                    s.disabled = !1;
                    const n = s.querySelector(".ton-connect-btn__label");
                    n && (n.textContent = c)
                };
            if (s && s.addEventListener("click", async () => {
                "function" == typeof haptic && haptic("light"),
                _tonUserInitiatedConnect = !0,
                setTimeout(() => {
                    _tonUserInitiatedConnect = !1
                }, 9e4);
                try {
                    await _ensureTonConnectUI(),
                    await _initTonConnectUIOnce(),
                    await window.tonConnectUI.openModal()
                } catch (n) {
                    "function" == typeof showNotification && showNotification(t("nDisconnectWalletError") || "Failed", "error")
                }
            }), r)
                return void l();
            _ensureTonConnectUI().then(() => _initTonConnectUIOnce()).then(() => {
                l()
            }).catch(n => {
                _renderTonConnectError(e)
            })
        }
}

let _tonBtnStickerAnim = null;
async function _mountTonConnectBtnSticker(host) {
    if (!host)
        return;
    try {
        if (_tonBtnStickerAnim) {
            try { _tonBtnStickerAnim.destroy() } catch (e) {}
            _tonBtnStickerAnim = null
        }
        const ensureLottie = () => {
            if (window.lottie)
                return Promise.resolve(window.lottie);
            return new Promise((resolve, reject) => {
                const existing = document.querySelector('script[src*="lottie.min.js"]');
                if (existing) {
                    const start = Date.now();
                    const tick = () => {
                        if (window.lottie) return resolve(window.lottie);
                        if (Date.now() - start > 2500) return reject(new Error("lottie wait"));
                        setTimeout(tick, 40)
                    };
                    return tick()
                }
                const s = document.createElement("script");
                s.src = "/vendor/lottie.min.js?v=62";
                s.async = true;
                s.onload = () => window.lottie ? resolve(window.lottie) : reject(new Error("lottie missing"));
                s.onerror = () => reject(new Error("lottie load failed"));
                document.head.appendChild(s)
            })
        };
        const lottieApi = await ensureLottie();
        const res = await fetch("/assets/stickers/ton.json?v=62");
        if (!res.ok)
            throw new Error("ton sticker " + res.status);
        const animationData = await res.json();
        if (!host.isConnected)
            return;
        host.innerHTML = "";
        _tonBtnStickerAnim = lottieApi.loadAnimation({
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
        });
        host.classList.add("is-ready")
    } catch (e) {
        try { host.classList.add("is-fallback") } catch (err) {}
    }
}
function _renderTonConnectError(n) {
    const t = {
            ru: {
                msg: "Не удалось загрузить кошелёк",
                btn: "Повторить"
            },
            en: {
                msg: "Failed to load wallet",
                btn: "Retry"
            },
            uk: {
                msg: "Не вдалося завантажити гаманець",
                btn: "Повторити"
            },
            ar: {
                msg: "فشل تحميل المحفظة",
                btn: "إعادة المحاولة"
            },
            zh: {
                msg: "加载钱包失败",
                btn: "重试"
            }
        },
        e = t[window.state && state.language || "en"] || t.en;
    n.innerHTML = `\n        <div class="ton-connect-failed">\n            <div class="ton-connect-failed__msg">${e.msg}</div>\n            <button class="btn btn-primary btn-block ton-connect-failed__retry">\n                ${e.btn}\n            </button>\n        </div>\n    `;
    const o = n.querySelector(".ton-connect-failed__retry");
    o && o.addEventListener("click", () => {
        haptic("light"),
        _tonConnectUiPromise = null,
        "function" == typeof updateWalletUI && updateWalletUI(null)
    })
}
let _tonConnectUiPromise = null,
    _tonConnectInitOnce = null;
function _initTonConnectUIOnce() {
    return window.tonConnectUI ? Promise.resolve(window.tonConnectUI) : _tonConnectInitOnce || (_tonConnectInitOnce = (async () => {
        if ("undefined" == typeof TON_CONNECT_UI)
            throw new Error("TON_CONNECT_UI namespace not loaded");
        const n = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: window.location.origin + "/tonconnect-manifest.json",
            uiPreferences: {
                theme: "DARK",
                borderRadius: "M"
            }
        });
        return tonConnectUI = n, window.tonConnectUI = n, n.onStatusChange(handleWalletConnection), n
    })(), _tonConnectInitOnce.catch(() => {
        _tonConnectInitOnce = null
    }), _tonConnectInitOnce)
}
function _ensureTonConnectUI() {
    return "undefined" != typeof TON_CONNECT_UI ? Promise.resolve() : _tonConnectUiPromise || (_tonConnectUiPromise = new Promise((n, t) => {
        const e = document.createElement("script"),
            o = (document.querySelector('meta[name="funpay-build"]') || {}).content || "";
        e.src = "/vendor/tonconnect-ui.min.js" + (o ? `?v=${o}` : ""),
        e.async = !0;
        const i = setTimeout(() => {
            try {
                e.remove()
            } catch (n) {}
            _tonConnectUiPromise = null,
            t(new Error("tonconnect script load timeout (12s)"))
        }, 12e3);
        e.onload = () => {
            if (clearTimeout(i), "undefined" == typeof TON_CONNECT_UI)
                return _tonConnectUiPromise = null, void t(new Error("tonconnect loaded but TON_CONNECT_UI is undefined"));
            n()
        },
        e.onerror = () => {
            clearTimeout(i),
            _tonConnectUiPromise = null,
            t(new Error("tonconnect script failed (network/404)"))
        },
        document.head.appendChild(e)
    }), _tonConnectUiPromise)
}
function preloadTonConnectSDK() {
    try {
        _ensureTonConnectUI().catch(() => {})
    } catch (n) {}
}
async function disconnectTonWallet() {
    haptic("light");
    const n = {
            ru: {
                title: "Отвязать TON кошелёк?",
                body: "Вы сможете подключить тот же или другой кошелёк в любой момент. Баланс TON останется на вашем счёте.",
                ok: "Отвязать",
                keep: "Оставить"
            },
            en: {
                title: "Disconnect TON wallet?",
                body: "You can connect this wallet or a different one whenever you want. Your TON balance stays in your account.",
                ok: "Disconnect",
                keep: "Keep"
            },
            uk: {
                title: "Відв’язати TON гаманець?",
                body: "Ви зможете підключити цей чи інший гаманець у будь-який момент. Баланс TON залишиться на вашому рахунку.",
                ok: "Відв’язати",
                keep: "Залишити"
            },
            ar: {
                title: "فصل محفظة TON؟",
                body: "يمكنك ربط هذه المحفظة أو محفظة أخرى في أي وقت. سيبقى رصيد TON في حسابك.",
                ok: "فصل",
                keep: "إبقاء"
            },
            zh: {
                title: "断开 TON 钱包？",
                body: "您可以随时重新连接相同或不同的钱包。您的 TON 余额将保留在您的账户中。",
                ok: "断开连接",
                keep: "保留"
            }
        },
        e = n[window.state && state.language || "en"] || n.en;
    let o = !1;
    if (o = "function" == typeof window._showConfirmModal ? await window._showConfirmModal(e.title, e.body, {
        confirmLabel: e.ok,
        cancelLabel: e.keep
    }) : confirm(e.title), !o)
        return;
    isDisconnecting = !0;
    let i = !1;
    try {
        const n = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/ton_wallet`, {
            method: "DELETE"
        });
        i = !(!n || !n.ok),
        i || (haptic("error"), showNotification(t("nDisconnectWalletError"), "error"))
    } catch (n) {
        haptic("error"),
        showNotification(t("nDisconnectWalletError"), "error")
    }
    if (i) {
        state.user.ton_connect_wallet = null;
        try {
            tonConnectUI && await tonConnectUI.disconnect()
        } catch (n) {}
        _clearTonConnectStorage(),
        _tonLastDisconnectAt = Date.now(),
        _tonUserInitiatedConnect = !1,
        updateWalletUI(null),
        haptic("success"),
        showNotification(t("nWalletUnlinked"), "success"),
        setTimeout(() => {
            isDisconnecting = !1
        }, 1500)
    } else
        setTimeout(() => {
            isDisconnecting = !1
        }, 500)
}
async function sendTonTransaction() {
    return void showNotification("Пополнение TON временно недоступно (заглушка)", "error");
    const n = parseFloat(document.getElementById("ton-deposit-amount").value);
    if (!n || n < .1)
        return haptic("error"), void showNotification(t("nMinAmount010Ton"), "error");
    if (!tonConnectUI || !tonConnectUI.wallet)
        return haptic("error"), void showNotification(t("nWalletNotConnected"), "error");
    try {
        const t = {
                validUntil: Math.floor(Date.now() / 1e3) + 600,
                messages: [{
                    address: getDepositAddress(),
                    amount: String(Math.floor(1e9 * n))
                }]
            },
            e = await tonConnectUI.sendTransaction(t),
            o = tonConnectUI.wallet.account.address,
            i = window.state && state.language || "en",
            c = {
                ru: "⏳ Проверяем транзакцию в блокчейне… попытка 1/4",
                en: "⏳ Verifying transaction on-chain… attempt 1/4",
                uk: "⏳ Перевіряємо транзакцію в блокчейні… спроба 1/4",
                ar: "⏳ نتحقق من المعاملة على البلوكشين… محاولة 1/4",
                zh: "⏳ 正在验证链上交易… 尝试 1/4"
            };
        showNotification(c[i] || c.en, "info");
        let a = null,
            r = "";
        const s = [0, 1e4, 2e4, 3e4];
        for (let t = 0; t < s.length; t++) {
            if (s[t] > 0) {
                await new Promise(n => setTimeout(n, s[t]));
                const n = {
                    ru: `⏳ Проверяем транзакцию в блокчейне… попытка ${t + 1}/4`,
                    en: `⏳ Verifying transaction on-chain… attempt ${t + 1}/4`,
                    uk: `⏳ Перевіряємо транзакцію в блокчейні… спроба ${t + 1}/4`,
                    ar: `⏳ نتحقق من المعاملة على البلوكشين… محاولة ${t + 1}/4`,
                    zh: `⏳ 正在验证链上交易… 尝试 ${t + 1}/4`
                };
                showNotification(n[i] || n.en, "info")
            }
            if (a = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}/deposit/ton`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: n,
                    tx_hash: e.boc,
                    from_address: o
                })
            }), a.ok)
                break;
            try {
                const n = await a.clone().json();
                r = n.detail || n.error || ""
            } catch (n) {
                r = `HTTP ${a.status}`
            }
            if (400 !== a.status || !/not.*confirmed|not.*found|timeout/i.test(r))
                break
        }
        if (a && a.ok) {
            const t = await a.json();
            haptic("success");
            try {
                const n = await apiFetch(`${CONFIG.apiUrl}/user/${state.user.id}`);
                if (n.ok) {
                    const t = await n.json();
                    state.user.balance = t.balance || {}
                }
            } catch (n) {}
            try {
                document.querySelector(".modal-overlay").remove()
            } catch (n) {}
            const e = t.credited_amount || n,
                o = !!t.already_credited,
                c = state.user.balance?.TON || 0,
                r = {
                    ru: o ? `ℹ️ Эта транзакция уже была зачислена. Баланс: ${c.toFixed(2)} TON` : `✅ Пополнение на ${e} TON успешно! Новый баланс: ${c.toFixed(2)} TON`,
                    en: o ? `ℹ️ This transaction was already credited. Balance: ${c.toFixed(2)} TON` : `✅ Top-up of ${e} TON successful! New balance: ${c.toFixed(2)} TON`,
                    uk: o ? `ℹ️ Цю транзакцію вже зараховано. Баланс: ${c.toFixed(2)} TON` : `✅ Поповнення на ${e} TON успішне! Новий баланс: ${c.toFixed(2)} TON`,
                    ar: o ? `ℹ️ تم إيداع هذه المعاملة بالفعل. الرصيد: ${c.toFixed(2)} TON` : `✅ تم إيداع ${e} TON بنجاح! الرصيد الجديد: ${c.toFixed(2)} TON`,
                    zh: o ? `ℹ️ 此交易已存入。余额: ${c.toFixed(2)} TON` : `✅ 充值 ${e} TON 成功！新余额: ${c.toFixed(2)} TON`
                };
            showNotification(r[i] || r.en, "success"),
            "function" == typeof renderWalletsPage && renderWalletsPage()
        } else {
            const n = {
                ru: `⚠️ Транзакция отправлена, но не подтверждена в блокчейне за минуту. Через 1–2 минуты попробуйте «Пополнить» с той же суммой — баланс зачислится без повторной отправки. (${r.slice(0, 80)})`,
                en: `⚠️ Transaction sent but not confirmed on-chain within a minute. In 1–2 minutes click "Top up" with the same amount — the balance will credit without re-sending. (${r.slice(0, 80)})`,
                uk: `⚠️ Транзакцію відправлено, але не підтверджено в блокчейні за хвилину. Через 1–2 хвилини натисніть «Поповнити» з тією ж сумою — баланс зарахується без повторного надсилання. (${r.slice(0, 80)})`,
                ar: `⚠️ تم إرسال المعاملة ولكن لم يتم تأكيدها على البلوكشين في غضون دقيقة. خلال 1-2 دقيقة، اضغط على "إيداع" بنفس المبلغ - سيتم إيداع الرصيد دون إعادة الإرسال. (${r.slice(0, 80)})`,
                zh: `⚠️ 交易已发送但一分钟内未在链上确认。在1-2分钟内，点击"充值"输入相同金额—将自动入账，无需重新发送。(${r.slice(0, 80)})`
            };
            haptic("error"),
            showNotification(n[i] || n.en, "warning")
        }
    } catch (n) {
        n.message && n.message.includes("user rejected") ? (haptic("light"), showNotification(t("nTransactionCancelled"), "warning")) : (haptic("error"), showNotification(t("nTransactionSendError"), "error"))
    }
}
function validateTonAmount(n) {
    const e = parseFloat(n.value);
    e && e < .1 && (n.value = "0.10", haptic("error"), showNotification(t("nMinAmount010Ton"), "warning"))
}
window.preloadTonConnectSDK = preloadTonConnectSDK,
window.initTonConnect = initTonConnect,
window.updateWalletUI = updateWalletUI,
window.tonConnectUI = tonConnectUI,
window.disconnectTonWallet = disconnectTonWallet,
window.sendTonTransaction = sendTonTransaction,
window.validateTonAmount = validateTonAmount;
