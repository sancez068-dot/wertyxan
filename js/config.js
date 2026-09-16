window.WERTYXAN_CONFIG = {
    // ОБЯЗАТЕЛЬНО укажи URL своего FastAPI без завершающего /
    // Пример: https://wertyxanapi.onrender.com/api
    apiUrl: "https://wertyxanapi.onrender.com/api"
};

(function () {
    var value = String(window.WERTYXAN_CONFIG.apiUrl || "").trim().replace(/\/$/, "");
    if (!value || /YOUR-API-DOMAIN/i.test(value)) {
        console.error("Wertyxan: set js/config.js -> WERTYXAN_CONFIG.apiUrl before deploying the static site.");
        window.WERTYXAN_CONFIG.apiUrl = "";
        window.WERTYXAN_CONFIG.invalid = true;
    } else {
        try { new URL(value); } catch (e) {
            console.error("Wertyxan: invalid API URL in js/config.js", value);
            value = "";
            window.WERTYXAN_CONFIG.invalid = true;
        }
        window.WERTYXAN_CONFIG.apiUrl = value;
    }
})();
