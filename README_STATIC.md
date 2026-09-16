# Wertyxan static frontend

Этот архив предназначен для GitHub Pages, Cloudflare Pages, Netlify, Vercel Static или другого static hosting.

## API URL

Открой `js/config.js` и ОБЯЗАТЕЛЬНО укажи URL отдельного FastAPI:

```js
window.WERTYXAN_CONFIG = {
    apiUrl: "https://wertyxanapi.onrender.com/api"
};
```

URL должен заканчиваться на `/api`. Если оставить `YOUR-API-DOMAIN`, приложение специально покажет ошибку и не будет пытаться использовать same-origin API.

Пример:
`https://wertyxanapi.onrender.com/api`
