/*
 * Azerbaijani landing copy, taken verbatim from the live radioloq.com bundle.
 * Other languages implement the same `Content` shape.
 */

export const links = {
  calendly: 'https://calendly.com/adalat-ganjali/15min',
  email: 'mailto:info@radioloq.com',
  emailLabel: 'info@radioloq.com',
  linkedin: 'https://linkedin.com/in/adalatganjali',
  instagram: 'https://instagram.com/adalat.radiologie',
  courses: 'https://courses.radioloq.com/',
  upload: 'https://sync.luckycloud.de/u/d/47c6a267df094a9a8e65/',
  formspree: 'https://formspree.io/f/xrejnvok',
  api: 'https://radioloq-api.vercel.app',
} as const

export type PackageKey = 'basic' | 'standard' | 'premium'

/** Package identifiers as the payment links, API and Formspree inbox expect them. */
export const packages: Record<PackageKey, { label: string; price: number; stripe: string; paypal: string }> = {
  basic: {
    label: 'Basic — €52',
    price: 52,
    stripe: 'https://buy.stripe.com/00w5kv7ji6nrh258nO8ww04',
    paypal: 'https://www.paypal.com/ncp/payment/FBBSBEV9XZQZ4',
  },
  standard: {
    label: 'Standard — €72',
    price: 72,
    stripe: 'https://buy.stripe.com/fZu9AL6febHL1370Vm8ww05',
    paypal: 'https://www.paypal.com/ncp/payment/MKFVEECTYTEDE',
  },
  premium: {
    label: 'Premium — €83',
    price: 83,
    stripe: 'https://buy.stripe.com/bJe3cn7ji3bf6nrdI88ww06',
    paypal: 'https://www.paypal.com/ncp/payment/KDWLGX32B8B28',
  },
}

export const languages = [
  { code: 'az', label: 'Azərbaycanca', available: true },
  { code: 'en', label: 'English', available: false },
  { code: 'tr', label: 'Türkçe', available: false },
  { code: 'de', label: 'Deutsch', available: false },
  { code: 'ru', label: 'Русский', available: false },
]

type LinkedText = { pre: string; link: string; href: string; post: string }

const az = {
  lang: 'az',
  meta: {
    title: 'Radioloq — Almaniya standartında ikinci baxış, öz dilinizdə.',
    description:
      'Almaniyada lisenziyalı həkim tərəfindən MRT və KT görüntülərinizə ikinci baxış. 48 saat ərzində öz dilinizdə aydın izah.',
  },
  nav: {
    how: 'Necə işləyir',
    price: 'Qiymətlər',
    about: 'Haqqımda',
    cta: 'Görüntünüzü paylaşın',
    lang: 'Select language',
    langSoon: 'Tezliklə',
    skip: 'Əsas məzmuna keç',
  },
  hero: {
    badge: 'Almaniya · Radiologiya · İkinci baxış',
    titleLead: 'Almaniya standartında ikinci baxış,',
    titleTail: 'öz dilinizdə.',
    sub: 'Almaniyada lisenziyalı həkiməm və hal-hazırda Radiologiya üzrə rezidenturadayam. Müayinə görüntülərinizi hər gün klinikada tətbiq etdiyim standartlarla nəzərdən keçirir və hər nəticəni 48 saat ərzində öz dilimizdə aydın izah edirəm.',
    cta1: 'Qiymətlərə baxın',
    cta2: 'Necə işləyir',
    cta3: 'Pulsuz 15 dəq tanışlıq',
    panel: {
      scan: 'Your scan',
      read: 'Plain-language read',
      example: 'Nümunə',
      scanText: 'Bandscheibenprotrusion LWK 4/5 mit Kontakt zur Nervenwurzel L5 links, ohne Kompression.',
      readText: 'Belinizin aşağı hissəsində bir disk bir qədər çıxıb və sol tərəfdəki sinirə toxunur, amma onu sıxmır.',
    },
  },
  stats: [
    { value: '48 saat', label: 'Cavab müddəti' },
    { value: '5', label: 'Dil' },
    { value: 'DE', label: 'Alman standartı' },
    { value: '100%', label: 'Şifrələnmiş · Almaniya' },
  ],
  process: {
    label: 'Proses',
    title: 'Necə işləyir',
    sub: 'Görüntünüzdən aydın izahata dörd sadə addım.',
    steps: [
      { title: 'Görüntünüzü paylaşın', desc: 'Görüntü fayllarınızı yükləyin, varsa orijinal hesabatınızı da əlavə edin.' },
      { title: 'Yenidən baxış', desc: 'Müayinələriniz Alman standartlarına uyğun nəzərdən keçirilir.' },
      {
        title: 'Birlikdə müzakirə edirik',
        desc: 'Görüntünün nə göstərdiyinin, nə demək olduğunun və həkiminizə nə soruşmalı olduğunuzun aydın izahını alırsınız.',
      },
      {
        title: 'Arxayın gedin',
        desc: 'Birlikdə müzakirə etdiklərimizlə müalicə həkiminizə gedirsiniz. Nə soruşacağınızı bilirsiniz.',
      },
    ],
  },
  firstAssessment: {
    label: 'Pulsuz ilkin dəyərləndirmə',
    title: 'Hələ əmin deyilsiniz? Pulsuz ilkin dəyərləndirmə ilə başlayın.',
    sub: 'Hər hansı ödəniş etməzdən və ya paket seçməzdən əvvəl danışaq. Pulsuz 15 dəqiqəlik görüşdə vəziyyətinizə baxıb sizə kömək edə biləcəyimi dürüst şəkildə deyəcəyəm. Uyğun deyilsə, heç bir ödəniş etmirsiniz.',
    cta: 'Pulsuz 15 dəq görüş təyin et',
    note: 'Ödəniş yoxdur · Öhdəlik yoxdur',
  },
  pricing: {
    label: 'Qiymət',
    title: 'Tək qiymət, güvənli xidmət',
    sub: 'Birdəfəlik ödəniş. Ödəməzdən əvvəl sualınız varsa yazın.',
    vat: 'Bütün qiymətlərdə §19 UStG (Almaniyanın kiçik müəssisələr haqqında qanunu) əsasında ƏDV tutulmur.',
    tiers: [
      {
        key: 'basic' as PackageKey,
        tier: 'Əsas',
        name: 'Yazılı rəy',
        per: '/hesabat',
        desc: 'Yazılı qiymətləndirmə + dilimizdə sadə izahat',
        features: ['Bir görüntü baxışı', 'PDF hesabat', '48 saat dəyərləndirmə', 'Öz dilimizdə izahat'],
        cta: 'Yüklə & başla',
      },
      {
        key: 'standard' as PackageKey,
        tier: 'Standart',
        flag: 'Ən populyar',
        recommended: true,
        name: 'Rəy + konsultasiya',
        per: '/hesabat',
        desc: 'Tam qiymətləndirmə + 15 dəq video konsultasiya',
        features: ['Əsasın hamısı', '15 dəq video görüş', 'Prioritet 24 saat'],
        cta: 'Yüklə & başla',
      },
      {
        key: 'premium' as PackageKey,
        tier: 'Premium',
        name: 'Tam ikinci rəy',
        per: '/hesabat',
        desc: 'Hərtərəfli qiymətləndirmə + 30 dəq konsultasiya + 3 günlük e-mail təqibi',
        features: [
          'Standartın hamısı',
          '30 dəq konsultasiya',
          '3 günlük e-mail təqibi (24 saat ərzində cavab)',
          'Əvvəlki görüntülərlə müqayisə',
        ],
        cta: 'Yüklə & başla',
      },
    ],
  },
  about: {
    label: 'Haqqımda',
    name: 'Ədalət Gəncəli',
    /** Portrait lives in site/public/. Until the file exists, a branded placeholder is shown. */
    photo: '/adalat.jpg',
    role: 'Almaniya Lisenziyalı Həkim · Radiologiya üzrə Rezident · Bielefeld, Almaniya',
    bio: 'Radioloq-u yaratmağımın səbəbi sadədir: keyfiyyətli tibbi xidmət anlaşılan və hər kəs üçün əlçatan olmalıdır.',
    notice: 'Bütün ikinci rəylər şəxsi imkanlarım çərçivəsində təqdim edilir.',
    quote: 'Bu xidməti bir sual əsasında qurdum: öz ailə üzvüm üçün nə istərdim?',
    cite: 'Ədalət Gəncəli · Radioloq',
  },
  faq: {
    label: 'TSS',
    title: 'Tez-tez verilən suallar',
    items: [
      {
        q: 'Qiymətləndirməmi kim aparır?',
        a: 'Görüntülərinizi şəxsən özüm nəzərdən keçirir, hesabatınızı özüm hazırlayıram, heç bir süni intellekt və ya avtomatik sistem istifadə edilmir. Müalicənizə dəstək məqsədli göstərilən ikinci rəy xidməti yerli müalicə həkiminizin aparacağı növbəti müayinələrin yerini tutmur. Klinik qərarlar üçün mütləq yerli müalicə həkiminizə müraciət edin.',
      },
      {
        q: 'EvKB və ya başqa bir qurumla əlaqəniz varmı?',
        a: 'Bu xidmət tamamilə müstəqil və şəxsi imkanlarım çərçivəsində təqdim edilir. EvKB Bielefeld və ya hər hansı bir qurumla əlaqəsi yoxdur.',
      },
      {
        q: 'Hansı görüntü formatlarını qəbul edirsiniz?',
        a: 'DICOM (.dcm), JPEG, PNG və PDF formatlarını qəbul edirik. Mümkünsə orijinal DICOM fayllarını üstün tuturuq, ən yüksək keyfiyyəti təmin edirlər. Hesabatınız varsa onu da əlavə edin.',
      },
      {
        q: 'DICOM fayllarını necə ala bilərəm?',
        a: 'Çəkilişi aparan xəstəxana və ya mərkəzdən CD, DVD və ya rəqəmsal fayl kimi tələb edə bilərsiniz.',
      },
      {
        q: '48 saatlik müddət zəmanətlidirmi?',
        a: '48 saat hədəfimizdir. Sıx dövrlərdə bir qədər uzana bilər, amma həmişə əvvəlcədən sizi məlumatlandırıram.',
      },
      {
        q: 'Fayllarım başqa məqsədlər üçün istifadə ediləcəkmi?',
        a: 'Qətiyyən yox. Görüntüləriniz yalnız qiymətləndirmənizi hazırlamaq üçün istifadə edilir, təlim, tədqiqat və ya süni intellekt üçün heç vaxt istifadə edilmir.',
      },
      {
        q: 'Məlumatlarım harada saxlanılır?',
        a: 'Tibbi görüntüləriniz Almaniyada, ISO 27001 (BSI) sertifikatlı şifrələnmiş serverlərdə saxlanılır. Ödənişiniz Stripe və ya PayPal vasitəsilə təhlükəsiz şəkildə işlənir. Kart məlumatlarınızı heç vaxt görmürük və ya saxlamırıq.',
      },
    ],
  },
  contact: {
    label: 'Əlaqə',
    title: 'Qərar verməzdən əvvəl sualınız var?',
    rows: [
      { type: 'E-mail', label: 'info@radioloq.com', cta: 'E-mail göndər', href: links.email, external: false },
      { type: 'Video görüş', label: 'Ödənişsiz tanışlıq', cta: '15 dəq. rezervasiya', href: links.calendly, external: true },
      { type: 'LinkedIn', label: 'Ədalət Gəncəli', cta: 'Profili gör', href: links.linkedin, external: true },
      { type: 'Instagram', label: '@adalat.radiologie', cta: 'İzlə', href: links.instagram, external: true },
    ],
  },
  doctors: {
    title: 'Həkimsiniz?',
    sub: 'Strukturlaşdırılmış radiologiya təhsili, ilk hesabatınızı başa düşməkdən görüntüləri əminliklə oxumağa qədər.',
    cta: 'Kurslara bax',
  },
  footer: {
    terms: 'Terms',
    termsHref: '/terms-az.html',
    privacy: 'Privacy',
    privacyHref: '/privacy-az.html',
    cookies: 'Kuki Tənzimləmələri',
    text: '© 2026 Radioloq · Klinik qərarlar üçün müalicə həkiminizə müraciət edin · info@radioloq.com',
  },
  cookie: {
    text: 'Əsas sayt funksiyaları üçün və razılığınızla analitika üçün kukilər istifadə edirik. Bax',
    terms: 'İstifadə Şərtləri',
    and: 'və',
    privacy: 'Məxfilik Siyasəti',
    reject: 'Rədd Et',
    accept: 'Qəbul Et',
  },
  modal: {
    close: 'Bağla',
    title: 'İkinci rəyinizi alın',
    sub: 'Ödəniş üsulunu seçin. Ödəmədən sonra görüntünüzü yükləyə bilərsiniz.',
    discTitle: 'Tibbi Məlumat',
    discText:
      'Bu, Almaniyada approbiyasiyalı həkim tərəfindən təqdim edilən müstəqil radiologiya ikinci rəyidir. Müalicə həkiminizin yerini tutmur. Fövqəladə hallarda yerli təcili yardım xidmətinə zəng edin.',
    chk1: {
      pre: '',
      link: 'İstifadə Şərtlərini',
      href: '/terms-az.html',
      post: ' qəbul edirəm. Bu ikinci rəy, yerində müayinənin və ya həkimimin yerini tutmur.',
    } as LinkedText,
    chk2: {
      pre: 'Şəxsi məlumatlarımın və tibbi görüntülərimin ',
      link: 'Məxfilik Siyasəti',
      href: '/privacy-az.html',
      post: ' (GDPR/DSGVO) əsasında, 30 günlük silmə müddəti ilə işlənməsinə razılıq verirəm.',
    } as LinkedText,
    chk3: 'Bu ödənişin şəxsi xidmət olduğunu və səhiyyə sığortamın ödəməyə bilməcəyini anlayıram. Qiymətləndirmənin dərhal başlamasını tələb edirəm və tamamlandıqdan sonra geri qaytarma hüququmu itirdiyimi bilirəm.',
    payErr: 'Davam etmək üçün bütün razılıqları verməlisiniz.',
    payLabel: 'Təhlükəsiz ödəniş üsulunu seçin',
    stripe: 'Kartla ödə',
    paypal: 'PayPal ilə ödə',
    or: 'və ya',
    opening: 'Opening payment...',
    secure: 'Təhlükəsiz ödəniş · SSL şifrəli · Kart məlumatı saxlanılmır',
    pendingTitle: 'Ödəniş təsdiqi gözlənilir',
    pendingText: 'Açılan nişanda ödənişi tamamlayın. Tamamladıqdan sonra aşağıdakı düyməni basın.',
    confirmBtn: 'Ödənişi tamamladım',
    backBtn: 'Geri qayıt',
    uploadTitle: 'Görüntünüzü yükləyin',
    uploadSub: 'Ödəniş təsdiqləndi. İndi görüntünüzü yükləyin.',
    steps: [
      'Fill in your details below and click Submit.',
      'Upload your scan files via the secure upload link that appears.',
    ],
    nameLabel: 'Adınız',
    emailLabel: 'E-mail ünvanınız',
    langLabel: 'Dil',
    langPlaceholder: 'Language preference...',
    langOptions: ['Türkçe', 'Azərbaycanca', 'Русский', 'Deutsch', 'English'],
    packageLabel: 'Paket',
    noteLabel: 'Klinik kontekst (istəyə bağlı)',
    notePh: 'Simptomlar, görüntü tarixi, əvvəlki diaqnoz...',
    fnote: 'Məlumatlarınız etibarlı şəkildə saxlanılır və 30 gün sonra silinir.',
    submitBtn: 'Görüntünü göndər',
    sending: 'Sending...',
    fieldsRequiredName: 'Zəhmət olmasa adınızı daxil edin.',
    fieldsRequiredEmail: 'Zəhmət olmasa e-poçt ünvanınızı daxil edin.',
    fieldsRequiredBoth: 'Zəhmət olmasa adınızı və e-poçt ünvanınızı daxil edin.',
    doneTitle: 'Details received!',
    doneText: 'Now please upload your scan files using the button below.',
    uploadBtn: 'Upload scan files',
    uploadSecureNote: 'Şifrələnmiş yükləmə · Almaniyada serverlər · Hesab tələb olunmur',
    submitError: 'Something went wrong — please try again or email info@radioloq.com directly.',
  },
}

export type Content = typeof az
export default az
