# مکتب آیین

اپ آموزشی فارسی قانون آیین دادرسی مدنی، با متن مواد، شرح، مثال، یادداشت و آزمون.

## انتشار و تبدیل به APK

این پروژه برای انتشار روی یک سرویس HTTPS و سپس استفاده در **PWABuilder** آماده شده است. پیشنهاد می‌شود ریپازیتوری را در GitHub قرار دهید و آن را روی Vercel یا سرویس سازگار با TanStack Start مستقر کنید؛ سپس آدرس HTTPS نهایی را به PWABuilder بدهید.

### وضعیت PWA
- Web App Manifest در `public/manifest.webmanifest`
- آیکون‌های 192 و 512 پیکسل
- آیکون iOS در `public/icon-180.png`
- Service Worker در `public/sw.js`
- حالت standalone و portrait
- رنگ و عنوان برنامه برای نصب روی موبایل تنظیم شده است
- درخواست‌های API/auth توسط Service Worker کش نمی‌شوند

## توسعه محلی

```bash
npm install
npm run dev
```

برای build: `npm run build`

> نکته: GitHub محل نگهداری کد است؛ برای اینکه PWABuilder بتواند نسخه وب را ببیند، باید پروژه روی یک آدرس HTTPS عمومی نیز deploy شود.
