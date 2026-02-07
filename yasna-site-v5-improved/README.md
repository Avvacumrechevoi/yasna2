# Русская Ясна — сайт сообщества

## Быстрый старт

```bash
npm install
cp .env.example .env.local   # заполните ключи EmailJS
npm run dev
```

## Настройка отправки заявок (EmailJS)

Заявки отправляются через [EmailJS](https://www.emailjs.com) — бесплатно до 200 писем/мес, работает прямо из браузера, без бэкенда.

### Пошагово (5 минут):

1. **Регистрация** → https://www.emailjs.com → Sign Up
2. **Подключите почту** → Dashboard → Email Services → Add New Service → выберите Gmail/Yandex/Outlook → подключите аккаунт → скопируйте **Service ID**
3. **Создайте шаблон** → Email Templates → Create New Template:
   - **To Email**: ваш-email@для-заявок.ru
   - **Subject**: `Заявка от {{from_name}} — Русская Ясна`
   - **Body**:
     ```
     Имя: {{from_name}}
     Контакт: {{contact}}
     Направления: {{directions}}
     Сообщение: {{message}}
     Откуда узнали: {{referral}}
     Источник: {{source}}
     ```
   - Сохраните → скопируйте **Template ID**
4. **Public Key** → Account → General → скопируйте **Public Key**
5. **Заполните `.env.local`**:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_ABCDEF123456
   ```

### Деплой на свой сервер

```bash
npm run build
npm start          # по умолчанию порт 3000
```

Или через PM2:
```bash
npm install -g pm2
npm run build
pm2 start npm --name "yasna" -- start
pm2 save
```

С nginx:
```nginx
server {
    listen 80;
    server_name russkaya-yasna.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Что нужно заменить
1. **Ключи EmailJS** в `.env.local`
2. **Фото** в `/public/images/` — замените SVG-плейсхолдеры на реальные фото
3. **URL соцсетей** в `components/layout/Footer.tsx`
4. **Telegram-ссылки** — замените `russkaya_yasna` на реальный username
