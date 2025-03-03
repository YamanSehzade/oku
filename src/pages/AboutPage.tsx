import {
  BiBook,
  BiBookHeart,
  BiCopyright,
  BiDevices,
  BiDownload,
  BiEnvelope,
  BiGitBranch,
  BiHistory,
  BiInfoCircle,
  BiLineChart,
} from 'react-icons/bi';
import useAnalytics from '../hooks/useAnalytics';

const AboutPage = () => {
  const currentYear = new Date().getFullYear();
  const analytics = useAnalytics();

  // Sayfa görüntüleme analizi
  analytics.usePageView('about');

  return (
    <div className="space-y-8">
      {/* Başlık */}
      <div className="rounded-lg border-l-2 border-primary-400 bg-white p-3 shadow-sm sm:p-4">
        <h2 className="mb-2 flex items-center text-lg font-medium text-gray-800 sm:text-xl">
          <BiInfoCircle className="mr-2 h-5 w-5 text-primary-400 sm:h-6 sm:w-6" />
          Oku Uygulaması
        </h2>
        <p className="text-sm text-gray-500">
          Kitapseverlerin dijital ortamda kitap okuma deneyimini zenginleştirmek için tasarlanmış
          bir web uygulaması.
        </p>
      </div>

      {/* Özellikler */}
      <section className="space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <BiBookHeart className="mr-2 h-5 w-5 text-gray-700" />
          Özellikler
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 transition-shadow hover:shadow-xl">
            <div className="mb-3 flex items-center">
              <BiBookHeart className="mr-2 h-5 w-5 text-primary-500" />
              <h4 className="font-medium">Kitaplık Yönetimi</h4>
            </div>
            <p className="text-sm text-gray-600">
              Kitaplarınızı favorilere ekleyebilir, okuma durumunuzu takip edebilir ve kaldığınız
              sayfayı kaydedebilirsiniz.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 transition-shadow hover:shadow-xl">
            <div className="mb-3 flex items-center">
              <BiHistory className="mr-2 h-5 w-5 text-primary-500" />
              <h4 className="font-medium">Okuma Geçmişi</h4>
            </div>
            <p className="text-sm text-gray-600">
              Son okuduğunuz kitapları ve biten kitaplarınızı görüntüleyebilir, okuma
              alışkanlıklarınızı takip edebilirsiniz.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 transition-shadow hover:shadow-xl">
            <div className="mb-3 flex items-center">
              <BiGitBranch className="mr-2 h-5 w-5 text-primary-500" />
              <h4 className="font-medium">Açık Kaynak</h4>
            </div>
            <p className="text-sm text-gray-600">
              Oku, açık kaynak bir projedir. GitHub üzerinden katkıda bulunabilir, özellik
              önerilerinde bulunabilirsiniz.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 transition-shadow hover:shadow-xl">
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
      <section className="space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <BiDownload className="mr-2 h-5 w-5 text-gray-700" />
          Kurulum
        </h3>
        <div className="rounded-lg bg-gray-50 p-4">
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

      {/* Gizlilik ve Analytics */}
      <section className="space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <BiLineChart className="mr-2 h-5 w-5 text-gray-700" />
          Gizlilik ve Analytics
        </h3>
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Firebase Analytics</h4>
              <p className="mt-1 text-sm text-gray-600">
                Uygulamamızı geliştirmek ve size daha iyi bir deneyim sunmak için Firebase Analytics
                kullanıyoruz. Bu araç sayesinde:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                <li>Kullanıcı deneyimini iyileştirme</li>
                <li>Uygulama performansını izleme</li>
                <li>Hata tespiti ve çözümü</li>
                <li>Kullanım istatistiklerini analiz etme</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                Toplanan veriler anonim olarak işlenir ve sadece uygulama geliştirme amacıyla
                kullanılır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* İletişim */}
      <section className="space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <BiEnvelope className="mr-2 h-5 w-5 text-gray-700" />
          İletişim
        </h3>
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <BiEnvelope className="mt-1 h-5 w-5 flex-shrink-0 text-primary-500" />
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
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <BiGitBranch className="mt-1 h-5 w-5 flex-shrink-0 text-primary-500" />
              <div>
                <h4 className="font-medium">GitHub</h4>
                <a
                  href="https://github.com/YamanSehzade/oku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  github.com/YamanSehzade/oku
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <BiBook className="mt-1 h-5 w-5 flex-shrink-0 text-primary-500" />
              <div>
                <h4 className="font-medium">Kitap İçerikleri</h4>
                <div>
                  <a
                    href="https://www.hizmetsource.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    hizmetsource.com
                  </a>
                  <span className="ml-1 block text-xs text-gray-500">
                    (Kitapların resimleri ve içerikleri kaynak siteden sağlanmaktadır)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sürüm Bilgisi */}
      <div className="text-center text-sm text-gray-500">
        <p className="flex items-center justify-center">
          <BiCopyright className="mr-1.5 h-4 w-4" />
          Oku Uygulaması v1.0.0
        </p>
        <p className="mt-1">© {currentYear} Tüm hakları saklıdır.</p>
      </div>
    </div>
  );
};

export default AboutPage;
