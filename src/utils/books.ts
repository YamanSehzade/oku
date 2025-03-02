export type Book = {
  name: string;
  writer: string | null;
  publisher: string;
  series: string | null;
  pageCount: number;
  link: string;
};

export const books: Book[] = [
  {
    name: "En Yüce Dost",
    writer: "Erol ERGÜN",
    publisher: "Muştu Yayınları",
    series: "Allahın Güzel İsimleri Serisi",
    pageCount: 81,
    link: "https://www.hizmetsource.com/book/mustu-yayinlari-allahin-guzel-isimleri-serisi-8-en-yuce-dost-erol-ergun",
  },
  {
    name: "Denizler Kralı",
    writer: null,
    publisher: "Muştu Yayınları",
    series: "Altın Kuş Masal Serisi",
    pageCount: 41,
    link: "https://www.hizmetsource.com/book/mustu-yayinlari-altin-kus-serisi-1-denizler-krali",
  },
  {
    name: "Altın Kuş",
    writer: null,
    publisher: "Muştu Yayınları",
    series: "Altın Kuş Masal Serisi",
    pageCount: 41,
    link: "https://www.hizmetsource.com/book/mustu-yayinlari-altin-kus-serisi-2-altin-kus",
  },
  {
    name: "Allah Kimleri Sever",
    writer: "Abdülkadir NEŞELİ",
    publisher: "Muştu Yayınları",
    series: null,
    pageCount: 145,
    link: "https://www.hizmetsource.com/book/mustu-yayinlari-allah-kimleri-sever-abdulkadir-neseli",
  },
  {
    name: "Hud Peygamberin Diyarında",
    writer: null,
    publisher: "Muştu Yayınları",
    series: null,
    pageCount: 73,
    link: "https://www.hizmetsource.com/book/mustu-yayinlari-alican-ile-arican-hud-peygamberin-diyarinda",
  },
  {
    name: "Şifalı İlaç",
    writer: "Erol ERGÜN",
    publisher: "Muştu Yayınları",
    series: "Allahın Güzel İsimleri Serisi",
    pageCount: 17,
    link: "https://www.hizmetsource.com/book/mustu-yayinlari-allahin-guzel-isimleri-4-sifali-ilac-erol-ergun",
  },
  {
    name: "Kitap-1",
    writer: null,
    publisher: "Muştu Yayınları",
    series: "Afacanlar Serisi",
    pageCount: 145,
    link: "https://www.hizmetsource.com/book/mustu-yayinlari-afacanlar-kitap-1",
  },
  {
    name: "Top Kuyrukların Cevizleri",
    writer: "Erol ERGÜN",
    publisher: "Muştu Yayınları",
    series: "Allahın Güzel İsimleri Serisi",
    pageCount: 17,
    link: "https://www.hizmetsource.com/book/mustu-yayinlari-allahin-guzel-isimleri-3-top-kuyruklarin-cevizleri-erol-ergun",
  },
  {
    name: "Bal Balina",
    writer: null,
    publisher: "Muştu Yayınları",
    series: "Altın Kuş Masal Serisi",
    pageCount: 41,
    link: "https://www.hizmetsource.com/book/mustu-yayinlari-altin-kus-serisi-10-bal-balina",
  },
];
