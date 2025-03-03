import { BiBook, BiBookHeart, BiDevices, BiEnvelope, BiGitBranch, BiHistory } from 'react-icons/bi';

const AboutPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-8">
      {/* Başlık */}
      <div className="rounded-lg border-l-2 border-primary-400 bg-white p-3 shadow-sm sm:p-4">
        <h2 className="mb-2 flex items-center text-lg font-medium text-gray-800 sm:text-xl">
          <BiBook className="mr-2 h-5 w-5 text-primary-400 sm:h-6 sm:w-6" />
          Oku Uygulaması
        </h2>
        <p className="text-sm text-gray-500">
          Kitapseverlerin dijital ortamda kitap okuma deneyimini zenginleştirmek için tasarlanmış
          bir web uygulaması.
        </p>
      </div>

      {/* Özellikler */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Özellikler</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="mb-3 flex items-center">
              <BiBookHeart className="mr-2 h-5 w-5 text-primary-500" />
              <h4 className="font-medium">Kitaplık Yönetimi</h4>
            </div>
            <p className="text-sm text-gray-600">
              Kitaplarınızı favorilere ekleyebilir, okuma durumunuzu takip edebilir ve kaldığınız
              sayfayı kaydedebilirsiniz.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <div className="mb-3 flex items-center">
              <BiHistory className="mr-2 h-5 w-5 text-primary-500" />
              <h4 className="font-medium">Okuma Geçmişi</h4>
            </div>
            <p className="text-sm text-gray-600">
              Son okuduğunuz kitapları ve biten kitaplarınızı görüntüleyebilir, okuma
              alışkanlıklarınızı takip edebilirsiniz.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <div className="mb-3 flex items-center">
              <BiGitBranch className="mr-2 h-5 w-5 text-primary-500" />
              <h4 className="font-medium">Açık Kaynak</h4>
            </div>
            <p className="text-sm text-gray-600">
              Oku, açık kaynak bir projedir. GitHub üzerinden katkıda bulunabilir, özellik
              önerilerinde bulunabilirsiniz.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <div className="mb-3 flex items-center">
              <BiDevices className="mr-2 h-5 w-5 text-primary-500" />
              <h4 className="font-medium">Mobil Uygulama</h4>
            </div>
            <p className="text-sm text-gray-600">
              Oku bir PWA uygulamasıdır. Tarayıcınızın adres çubuğundaki "Yükle" veya "Ana Ekrana
              Ekle" butonunu kullanarak cihazınıza kurabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Kurulum */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Kurulum</h3>
        <div className="rounded-lg bg-white p-4 shadow">
          <h4 className="mb-3 font-medium">Cihazınıza Nasıl Kurarsınız?</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <p className="font-medium">iOS (Safari):</p>
            <ol className="ml-4 list-decimal space-y-1">
              <li>Safari'de paylaş butonuna tıklayın</li>
              <li>"Ana Ekrana Ekle" seçeneğini seçin</li>
              <li>"Ekle" butonuna tıklayın</li>
            </ol>

            <p className="mt-4 font-medium">Android (Chrome):</p>
            <ol className="ml-4 list-decimal space-y-1">
              <li>Chrome menüsünü açın (üç nokta)</li>
              <li>"Ana ekrana ekle" seçeneğini seçin</li>
              <li>"Yükle" butonuna tıklayın</li>
            </ol>

            <p className="mt-4 font-medium">Masaüstü (Chrome):</p>
            <ol className="ml-4 list-decimal space-y-1">
              <li>Adres çubuğunun sağındaki "Yükle" simgesine tıklayın</li>
              <li>"Yükle" butonuna tıklayın</li>
            </ol>
          </div>
        </div>
      </section>

      {/* İletişim */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">İletişim</h3>
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center space-x-4">
            <BiEnvelope className="h-5 w-5 text-primary-500" />
            <div>
              <h4 className="font-medium">Bize Ulaşın</h4>
              <p className="mt-1 text-sm text-gray-600">
                Soru, öneri ve geri bildirimleriniz için:
                <a
                  href="mailto:yamansehzade@gmail.com"
                  className="ml-1 text-primary-600 hover:text-primary-700"
                >
                  yamansehzade@gmail.com
                </a>
              </p>
              <p className="mt-2 text-sm text-gray-600">
                GitHub:
                <a
                  href="https://github.com/ahmetsametoglu/oku-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-primary-600 hover:text-primary-700"
                >
                  github.com/ahmetsametoglu/oku-app
                </a>
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Kitap İçerikleri:
                <a
                  href="https://www.hizmetsource.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-primary-600 hover:text-primary-700"
                >
                  hizmetsource.com
                </a>
                <span className="ml-1 block text-xs text-gray-500">
                  (Kitapların resimleri ve içerikleri kaynak siteden sağlanmaktadır)
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sürüm Bilgisi */}
      <div className="text-center text-sm text-gray-500">
        <p>Oku Uygulaması v1.0.0</p>
        <p className="mt-1">© {currentYear} Tüm hakları saklıdır.</p>
      </div>
    </div>
  );
};

export default AboutPage;
