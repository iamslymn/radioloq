# Radioloq

## Proje ve yapı

Radioloq, beş dilde radyolojik ikinci görüş hizmeti. Hasta görüntülerini yükler,
yazılı ve gerekçeli bir değerlendirme alır. Muayene yok, tedavi yok, reçete yok.

Diller: `en`, `tr`, `az`, `de`, `ru`. Beşi eşit önemde, hiçbiri çeviri muamelesi görmez.

**Site henüz yayında değil.** Yayın, iş yapısıyla ilgili açık bir konu çözülene kadar
beklemede. Bu yüzden fiyat, rezervasyon veya "bana yazın" çağrısı içeren yeni bir
tanıtım metni eklenmez, yayın tarihi taahhüdü yazılmaz.

```
site/
  src/content/{de,en,tr,az,ru}.ts   tüm görünür metin, dil başına bir dosya
  src/content/shared.ts             dillerden bağımsız ortak metin
  src/content/courses.ts            courses.radioloq.com içeriği
  src/content/pricing.ts            fiyatların ve Stripe linklerinin TEK kaynağı
  src/content/detect.ts             ziyaretçinin ülkesine göre dil seçimi
  src/components/  src/sections/  src/pages/
  public/terms-*.html  privacy-*.html  services-*.html
  api/country.ts                    Vercel edge, ülke tespiti
```

TypeScript, Vite, oxlint. Vercel'de yayınlanıyor.

Ana site şifre ekranının (`PasswordGate`) arkasında. `courses.radioloq.com` şifresiz açık.

## Kurallar

### Metin kuralları, istisnasız

1. **Uzun tire ve kısa tire yok.** `—` ve `–` sıfır olacak. Yerine nokta, virgül
   veya iki ayrı cümle.
   **Tek istisna Rusça:** Rusçada uzun tire dilbilgisi unsurudur (`Radioloq — это сервис`).
   Rusçada sadece stil amaçlı, yani virgül veya nokta ile değiştirilebilen olanlar kaldırılır.
   Dilbilgisi gerektirenler kalır.
2. **Düzyazıda noktalı virgül yok.** Kodda serbest.
3. **Cinsiyet çiftlemesi yok.** `Patient oder Patientin`, `Ärztinnen und Ärzte`,
   `hasta veya hastamız` gibi yapılar kullanılmaz. Eril tekil, her dilde, her metinde.
   Proje sahibinin ifadesiyle: "Cinsellestirme hicbirseyi sadece ER kullan herseye."
4. **`Dr.` ve Facharzt ünvanı hiçbir yerde geçmez.**
5. **Yapay zekâ metni gibi durmayacak.** Üçlü liste, "ayrıca", "sonuç olarak",
   abartılı sıfat, boş güven cümlesi yok. Kısa, somut, insan sesi.
6. Beş dilde de **anadili konuşanın yazdığı gibi** okunmalı. Birebir çeviri kokusu
   kabul edilmez. Örnek: Almanca `Zahlungspflichtig buchen` doğru, Türkçesi
   `ödeme yükümlülüğüyle sipariş et` değil `ücretli sipariş edin`,
   Azericesi `ödə və sifariş et`.

### Fiyat

`src/content/pricing.ts` tek kaynak. Hiçbir bileşene, metne veya HTML sayfasına
elle fiyat yazılmaz.

Tutarlar sabit: Basic 50, Standard 84, Premium 158 Euro.
**Değiştirilmez, indirim veya kampanya eklenmez.** Proje sahibinin ifadesiyle:
"Hayır ilave fiyat oynaması istemiyorum hiçbiri için, fix olsun."

GOÄ hesabı dosyanın başındaki yorumda duruyor, faktörler kuruşuna kadar doğrulanmış,
hepsi 2,3'ün altında kaldığı için yazılı gerekçe gerekmiyor. Dokunulmaz.

Üç Stripe linki gerçek ve canlı. Her biri ödemeden sonra
`https://radioloq.com/?paid=1&pkg=basic` (ve `standard`, `premium`) adresine yönlendirir.
Sunucu tarafı doğrulama yok, ödeme Stripe panelinden elle kontrol edilir.

Stripe tarafında **otomatik vergi kapalı** ve **Adaptive Pricing kapalı** kalmalı,
çünkü kesilen fatura tahsil edilen tutara kuruşuna kadar eşit olmak zorunda.

### Hukuki metin kuralları

- **Tedavi önerisi verilmez.** Ama şu cümle metinden çıkarılmaz:
  *Hinweise auf weiteren ärztlichen Abklärungsbedarf können enthalten sein*
  ve beş dildeki karşılığı. Bu ikisi birlikte durur, biri olmadan diğeri tutarsız olur.
- Buton etiketi `Zahlungspflichtig buchen` ve beş dildeki karşılığı, `§ 312j Abs. 3 BGB`.
- Cayma hakkından açık feragat metni kalır, `§ 356 Abs. 4 BGB`.
- KDV gösterilmez, `§ 19 UStG` küçük işletme usulü.
- `§ 5 DDG` gereği Impressum zorunlu.
- Hukuki sayfa metni **sahibi onaylamadan** yazılmaz veya değiştirilmez.

## Yapılacaklar

Sayıları kendin doğrula, dosya değişmiş olabilir. Yarım kalan iş burada açıkça
kaydedilir, "sonra dönerim" denmez. Grep yaparken `LC_ALL=C.UTF-8` kullan, yoksa
`[—–]` gibi aramalar Kiril ve Türkçe harflerin baytlarını da sayar.

### Açık

1. **Impressum, YAPMA, SOR.** Beş `public/services-*.html` dosyasının hepsi
   Impressum'a atıf yapıyor ama öyle bir sayfa yok. Kırık vaat. Footer'da da Impressum
   linki yok. Impressum adresi henüz kararlaştırılmadı, bu madde o karar verilmeden
   tamamlanamaz. Sayfayı uydurma. Proje sahibine sor: atıfı şimdilik kaldırmak mı,
   yoksa adres netleşene kadar böyle bırakmak mı. Impressum'da adres dışında telefon,
   Ärztekammer, meslek unvanı ve veren devlet, Berufsordnung linki ve
   Berufshaftpflicht bilgisi de gerekiyor.
2. **Statik HTML'de fiyatlar elle yazılı:** `services-*.html` (`class="price"`) ve
   `terms*.html` § 6.1. Tutarlar şu an `pricing.ts` ile aynı ama tek kaynak kuralı
   orada tutmuyor. Bu dosyalar `public/` altında statik, `pricing.ts`'i okuyamıyor.
   Çözüm build sırasında basmak ya da build'de karşılaştırıp uyuşmazlıkta durmak,
   sahibi karar verecek. Fiyat değişirse bu 11 dosya da elle güncellenir.
3. **Hukuki sayfalarda tire kalıyor**, sahibi onaylamadan dokunulmaz:
   `terms*.html` iade süresi `5–10`, `privacy*.html` madde aralığı `b–e` ve adres `2–4`.
4. **`terms.html` ve `terms-de.html`:** `wählen Sie sofort den Notruf .` cümlesinde
   numara eksik görünüyor. Hukuki metin, sahibine sorulacak.
5. **Çeviri düzeltmeleri, sahibinde.** Bütün metinler beş dil yan yana bir tabloya
   çıkarıldı (`site/scripts/i18n.py export`). Sahibi tabloyu Google Drive'a koyup elle
   düzeltiyor, adı "Radioloq çeviriler". Geçerli sürümün kaynağı `a61fbf3`, tablonun
   "Nasıl" sekmesinin son satırında yazar. "Bitti" dediğinde: tabloyu Drive'dan oku
   (xlsx olarak indir), A sütunundaki anahtarlarla koda geri yaz, metin kurallarını
   kontrol et, değişenleri dil dil listele, build, push.
   `import` komutu henüz yazılmadı. Anahtar şeması ve hücre gösterimi
   (`[link]`, `[metin](adres)`, `**kalın**`) `i18n.py` dosyasının başında.
   **Import kuralı:** sahibinin değişikliği = tablodaki değer ≠ tablonun kaynak
   commit'indeki değer. Mevcut kodla karşılaştırma, yoksa tablodan sonra kodda yapılan
   düzeltmeler geri alınır. Kaynaktan sonra kodda değişmiş bir hücreye sahibi de
   yazdıysa ikisini yan yana göster, sahibi seçsin.
   Hukuki sayfalardaki düzeltmeler sahibinin onayı sayılır. `terms.html` ve
   `privacy.html`, `-de` sürümlerinin kopyası, ikisi birlikte güncellenir.
   28.10'da eklenen `nav.menu`, `footer.menu`, `cookie.label` anahtarları tabloda yok,
   import onlara dokunmaz.
6. **Yayın günü yapılacaklar**, yayın kararı verilmeden yapılmaz: `index.html` ve
   `public/` altındaki 18 HTML sayfasındaki `noindex, nofollow` kaldırılır, `robots.txt`,
   `sitemap.xml`, Open Graph etiketleri ve görseli, `apple-touch-icon` (PNG, zemin rengi
   seçilecek) eklenir. `courses.radioloq.com` aynı `index.html`'i kullandığı için o da
   şu an `noindex`.

### Tamamlanan, 21.10.2026

- Raporun kapanışındaki ikinci başlık (`Was soll ich jetzt tun?` ve beş dildeki
  karşılığı) her yerden kaldırıldı. Kalan başlık `Was bedeutet das für mich?`.
  Gerekli yerlerde yerine, tedavi eden hekimle netleştirilecek noktalara atıf kondu.
- Terms sayfalarında tedavi maddesi onaylı metinle değiştirildi, beş dil:

  > wir verschreiben, empfehlen oder ändern keine Behandlungen oder Medikamente und
  > erstellen keine umfassende Therapieplanung. Hinweise auf weiteren ärztlichen
  > Abklärungsbedarf können enthalten sein

  Bu metin onaylıdır, **yeniden yazılmaz.**
- Hukuki sayfalar dışında tire, düzyazı noktalı virgülü ve cinsiyet çiftlemesi kalmadı.
  `ru.ts` içinde bilinçli olarak iki uzun tire duruyor, ikisi de dilbilgisi gereği:
  `48 часов — наша цель` (iki isim arasında yüklem tiresi) ve
  `и никогда — для обучения` (atlanan fiilin yerini tutan tire).

### Tamamlanan, 25.10.2026

- Terms § 6.1 fiyatları 50/84/158 olarak düzeltildi (önce 52/72/83 yazıyordu).
- Terms'teki `fachärztliche Einschätzung` ve TR/AZ karşılıkları kaldırıldı.
- PayPal her yerden çıkarıldı. Ödeme sadece Stripe.
- Privacy'de hosting Vercel olarak düzeltildi, Cloudflare ve GitHub Pages çıkarıldı.
- Calendly (ücretsiz tanışma görüşmesi) privacy'ye eklendi.
- Terms'teki Premium e-posta takibi maddesi tamamen kaldırıldı, § 6 numaraları kaydırıldı.
- Terms ve privacy tarihi: 26.10.2026.

### Tamamlanan, 28.10.2026

- Çerezler engelliyken çerez çubuğu sayfayı beyaz bırakıyordu. Depolama erişimi artık
  hata yakalayarak yapılıyor.
- Formspree gönderimi başarısız olursa hata tarayıcı `alert()` kutusu yerine formun içinde görünüyor.
- Statik sayfalara `index.html` ile aynı `noindex, nofollow` eklendi.
- Erişilebilirlik etiketleri (`Primary`, `Footer`, `Cookies`) beş dile çevrildi.
- `vercel.json`: güvenlik başlıkları (`nosniff`, `Referrer-Policy`, `X-Frame-Options: DENY`,
  `Permissions-Policy`) ve `/design-system` yolu. Stripe ödeme formu ileride sayfanın
  içine gömülürse `Permissions-Policy` içindeki `payment=()` kaldırılmalı.
- Vite 8.3.5'e yükseltildi, `npm audit` temiz. README yazıldı.

### Doğru olan, bozulmaması gerekenler

- `localStorage` ve `sessionStorage` her yerde `try/catch` içinde okunur ve yazılır.

- Cayma hakkı konusu kapandı. Modaldaki `chk4` işaret kutusu ve mevcut yapı sahibi
  tarafından onaylı, yeniden eksik olarak açılmaz. `chk4` metni değiştirilmez.
- Ödeme sadece Stripe. PayPal hiçbir metinde geçmez.
- Hosting Vercel. Yeni bir hizmet sağlayıcı eklenirse privacy'deki tabloya da girer.
- Açık ve koyu tema var. Varsayılan herkes için açık tema, cihazın koyu mod ayarına
  bakılmaz. Koyu tema sadece ziyaretçi düğmeyle seçerse açılır ve hatırlanır. Bileşenler renkleri `src/styles/tokens.css` içindeki rol
  token'larından alır (`--surface-raised`, `--tint`, `--ink`, `--strong` gibi). Palet
  değişkenleri (`--navy`, `--white`, `--mist`, `--ice`) bileşende doğrudan kullanılmaz,
  yoksa koyu tema bozulur. `public/legal.css` aynı rolleri kendi içinde tekrarlar.
- React tarafında fiyat sadece `pricing.ts`'ten geliyor (statik HTML istisnası yukarıda)
- Üç Stripe linki gerçek, placeholder kalmamış
- Hiçbir yerde `Dr.` unvanı geçmiyor
- Beş dil eksiksiz, hiçbir dilde eksik anahtar yok
