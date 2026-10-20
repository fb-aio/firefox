// Các domain của web app Social AIO — được gọi MỌI hàm của extension (runExtFunc, CustomEvent bridge).
// Giữ khớp với `externalMatches` trong wxt.config.ts (Chrome externally_connectable).
export const WEB_APP_ORIGINS = new Set([
  "https://facebook-all-in-one.com",
  "https://fb-aio.github.io",
  "https://fb-aio.web.app",
  "https://fb-aio.firebaseapp.com",
  "https://fb-aio.xyz",
  "https://fbaio.org",
  "https://fbaio.pages.dev",
  "https://fbaio.vercel.app",
  "https://fbaio.netlify.app",
  "https://hoangtran99.is-a.dev",
  "https://hoangtran0410.github.io",
  "https://useful-scripts-extension.github.io",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:5501",
  "http://127.0.0.1:5501",
]);
