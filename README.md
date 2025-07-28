# eBook Platform

Modern kitap okuma ve paylaşım platformu. React TypeScript ile geliştirilmiş frontend uygulaması.

## 🚀 Deployment

### Frontend - Vercel Deployment

1. **Environment Variables Ayarla:**
   ```bash
   cp .env.example .env
   # .env dosyasını düzenle ve gerekli değerleri ekle
   ```

2. **Vercel'e Deploy Et:**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Environment Variables (Vercel Dashboard):**
   - `REACT_APP_GOOGLE_MAPS_API_KEY`: Google Maps API anahtarı
   - `REACT_APP_API_URL`: Backend API URL'i  
   - `REACT_APP_SOCKET_URL`: Socket server URL'i

### 🛠️ Local Development

```bash
npm install
npm start
```

### 📦 Build

```bash
npm run build
```

## 🔑 Gerekli API Keys

- Google Maps JavaScript API
- Backend API endpoint'leri

## 🌐 Live Demo

Frontend: [Deploy URL'i buraya gelecek]
Backend: [Backend API URL'i buraya gelecek]