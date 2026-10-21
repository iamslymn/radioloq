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
kaydedilir, "sonra dönerim" denmez.

### 1. Kapanış bölümü başlığı, yaklaşık 27 yer

Raporun kapanışında iki başlık vaat ediliyor. İkincisi kaldırılacak, çünkü kullanım
şartları "hiçbir tıbbi tedbir önerilmez" diyor ve bu başlık tam tersini vaat ediyor.

**Kalacak:** `Was bedeutet das für mich?` ve beş dildeki karşılığı.
**Gidecek:** `Was soll ich jetzt tun?` / `What should I do now?` / `Şimdi ne yapmalıyım?` /
`İndi nə etməliyəm?` / `Что мне теперь делать?`

Yerler: `src/content/{de,en,tr,az,ru}.ts` ve `public/services-{de,en,tr,az,ru}.html`.
`services-*.html` içinde `Und was soll ich jetzt tun` biçiminde, küçük harfle geçiyor.
Büyük harfe duyarlı arama kaçırır.

Başlığın yerine konan cümle tedavi önerisi vaat etmemeli. "Hekiminizle netleştirmeniz
gereken noktaları belirtiyorum" yönünde bir ifade uygundur,
"ne yapmanız gerektiğini söylüyorum" değildir.

### 2. Tedavi önerisi maddesi, hukuki sayfalar

Mevcut hali fazla geniş ve kritik cümle eksik:

> wir verschreiben, empfehlen oder ändern keine Behandlungen, Medikamente
> **oder medizinischen Maßnahmen**

Olması gereken, onaylanmış metin:

> wir verschreiben, empfehlen oder ändern keine Behandlungen oder Medikamente und
> erstellen keine umfassende Therapieplanung. Hinweise auf weiteren ärztlichen
> Abklärungsbedarf können enthalten sein

Bu metin onaylıdır, **yeniden yazılmaz.** Beş dile de aynı anlamla taşınır.
Yerler: `terms.html`, `terms-{de,en,tr,az,ru}.html`.

### 3. Tire temizliği

`src/content/` altındaki `ru.ts` (Rusça istisnası geçerli), `courses.ts`, `de.ts`,
`en.ts`, `tr.ts`, `az.ts`.

### 4. Düzyazı noktalı virgülleri

`courses.ts`, `shared.ts`, `tr.ts`, `az.ts`.

### 5. Cinsiyet çiftlemesi

- `src/content/courses.ts` → `für Ärztinnen und Ärzte` (2 yer)
- `src/content/de.ts` → `Sie sind Ärztin oder Arzt?`

### 6. Impressum, YAPMA, SOR

`public/services-de.html` ve `public/services-az.html` Impressum'a atıf yapıyor
ama öyle bir sayfa yok. Kırık vaat.

Impressum adresi henüz kararlaştırılmadı, bu madde o karar verilmeden tamamlanamaz.
Sayfayı uydurma. Proje sahibine sor: atıfı şimdilik kaldırmak mı, yoksa adres
netleşene kadar böyle bırakmak mı. Impressum'da ayrıca telefon numarası gerekiyor,
o da henüz yok.

### Doğru olan, bozulmaması gerekenler

- `pricing.ts` tek kaynak olarak tutuyor, hiçbir yerde elle yazılmış fiyat yok
- Üç Stripe linki gerçek, placeholder kalmamış
- Hiçbir yerde `Dr.` unvanı geçmiyor
- Beş dil eksiksiz, hiçbir dilde eksik anahtar yok
