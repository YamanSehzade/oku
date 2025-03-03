# 📚 OKU - Modern Okuma Deneyimi

OKU, kitapseverlerin dijital ortamda kitap okuma deneyimini zenginleştirmek için tasarlanmış modern bir web uygulamasıdır. React ve TypeScript kullanılarak geliştirilmiş olan bu platform, kullanıcılara kesintisiz ve keyifli bir okuma deneyimi sunmayı hedeflemektedir.

🌐 **[Uygulamayı Kullanmak İçin Tıklayın](https://kitap--oku.web.app/)**

## 🚀 Özellikler

- 📚 Kitaplık Yönetimi (Favoriler, okuma durumu takibi, sayfa kaydetme)
- 📱 Her cihazda mükemmel görünüm ve PWA desteği
- 📖 Okuma geçmişi ve alışkanlık takibi
- 🔄 Firebase ile gerçek zamanlı senkronizasyon
- 🌙 Karanlık/Aydınlık mod desteği
- 📊 Firebase Analytics ile kullanıcı deneyimi optimizasyonu
- 🎯 Açık kaynak geliştirme

## 🛠️ Teknoloji Yığını

- **Frontend Framework:** React 18
- **Programlama Dili:** TypeScript
- **Stil Kütüphanesi:** Tailwind CSS
- **Routing:** React Router DOM
- **State Yönetimi:** React Context API
- **Backend & Analytics:** Firebase
- **Build Tool:** Vite
- **Animasyonlar:** Framer Motion
- **Kod Kalitesi:** ESLint, Prettier
- **Deployment:** Firebase Hosting

## 📱 Kurulum Kılavuzu

### iOS (Safari):

1. Safari'de paylaş butonuna tıklayın
2. "Ana Ekrana Ekle" seçeneğini seçin
3. "Ekle" butonuna tıklayın

### Android (Chrome):

1. Chrome menüsünü açın (üç nokta)
2. "Ana ekrana ekle" seçeneğini seçin
3. "Yükle" butonuna tıklayın

### Masaüstü (Chrome):

1. Adres çubuğunun sağındaki "Yükle" simgesine tıklayın
2. "Yükle" butonuna tıklayın

## 📊 Gizlilik ve Analytics

Uygulamamızı geliştirmek ve size daha iyi bir deneyim sunmak için Firebase Analytics kullanıyoruz. Bu araç sayesinde:

- Kullanıcı deneyimini iyileştirme
- Uygulama performansını izleme
- Hata tespiti ve çözümü
- Kullanım istatistiklerini analiz etme

Toplanan veriler anonim olarak işlenir ve sadece uygulama geliştirme amacıyla kullanılır.

## 🏗️ Proje Yapısı

```
oku/
├── src/
│   ├── assets/      # Statik dosyalar
│   ├── components/  # Yeniden kullanılabilir bileşenler
│   ├── config/      # Yapılandırma dosyaları
│   ├── context/     # React Context dosyaları
│   ├── helpers/     # Yardımcı fonksiyonlar
│   ├── hooks/       # Özel React hooks
│   ├── pages/       # Sayfa bileşenleri
│   ├── styles/      # Global stil dosyaları
│   ├── types/       # TypeScript tip tanımlamaları
│   └── utils/       # Utility fonksiyonları
├── public/          # Statik public dosyalar
└── dist/           # Build çıktısı
```

## 🚦 Geliştirici Kurulumu

### Ön Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Git

### Kurulum

1. Projeyi klonlayın:

   ```bash
   git clone https://github.com/YamanSehzade/oku.git
   cd oku
   ```

2. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:

   ```bash
   npm run dev
   ```

4. Tarayıcınızda açın:
   ```
   http://localhost:5173
   ```

## 📝 Komutlar

- `npm run dev`: Geliştirme sunucusunu başlatır
- `npm run build`: Projeyi production için derler
- `npm run lint`: ESLint ile kod kontrolü yapar
- `npm run preview`: Build çıktısını önizler
- `npm run deploy`: Firebase'e deploy eder

## 🔧 Yapılandırma

1. `.env.local` dosyası oluşturun ve Firebase yapılandırmanızı ekleyin:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## 📚 İçerik Kaynağı

Kitapların resimleri ve içerikleri [hizmetsource.com](https://www.hizmetsource.com/) sitesinden sağlanmaktadır.

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

Yaman Şehzade - [yamansehzade@gmail.com](mailto:yamansehzade@gmail.com)

Proje Linki: [https://github.com/YamanSehzade/oku](https://github.com/YamanSehzade/oku)

Uygulama: [https://kitap--oku.web.app/](https://kitap--oku.web.app/)

---

⭐️ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
