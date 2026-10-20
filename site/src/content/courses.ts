import type { Lang } from './shared'

/** Copy for the courses "coming soon" page. Kept apart from the main site content. */
export type CoursesCopy = {
  meta: { title: string; description: string }
  back: string
  badge: string
  titleLead: string
  titleTail: string
  sub: string
  form: {
    email: string
    emailPh: string
    consentPre: string
    privacy: string
    consentPost: string
    submit: string
    sending: string
    errEmail: string
    errConsent: string
    errSend: string
    doneTitle: string
    doneText: string
  }
  topics: { label: string; title: string; sub: string; items: { title: string; desc: string }[] }
  band: { title: string; sub: string }
  note: string
}

const en: CoursesCopy = {
  meta: {
    title: 'Radioloq Courses: coming soon',
    description: 'Structured radiology education for doctors, from your first report to reading scans with confidence. Leave your email and we will tell you when it opens.',
  },
  back: 'Back to radioloq.com',
  badge: 'Radioloq Courses · Coming soon',
  titleLead: 'Radiology education,',
  titleTail: 'built step by step.',
  sub: 'Structured courses for doctors, from understanding your first report to reading scans with confidence. We are still preparing the first course. Leave your email and you will get one message the day it opens.',
  form: {
    email: 'Your email',
    emailPh: 'name@example.com',
    consentPre: 'I agree to receive one email when the courses launch. See the',
    privacy: 'Privacy Policy',
    consentPost: '.',
    submit: 'Remind me',
    sending: 'Sending…',
    errEmail: 'Please enter a valid email address.',
    errConsent: 'Please confirm that you agree to be contacted.',
    errSend: 'Something went wrong. Please try again in a moment.',
    doneTitle: 'You are on the list',
    doneText: 'Thank you. We will write to you once, when the courses open.',
  },
  topics: {
    label: 'What to expect',
    title: 'A clear path from basics to practice.',
    sub: 'The plan for the first courses. Details may change before launch.',
    items: [
      { title: 'Foundations', desc: 'How X-ray, CT and MRI create an image, and what each one is best at.' },
      { title: 'Reading scans', desc: 'A repeatable, systematic way to look at a study, so nothing is missed.' },
      { title: 'Real cases', desc: 'Worked examples with the reasoning shown, from first look to conclusion.' },
      { title: 'Reports', desc: 'How a radiology report is structured, and how to read and write one well.' },
    ],
  },
  band: { title: 'Be the first to know.', sub: 'One email when the courses open. Nothing else.' },
  note: 'Your email is used only for this reminder and can be removed on request.',
}

const az: CoursesCopy = {
  meta: {
    title: 'Radioloq Kurslar: tezliklə',
    description: 'Həkimlər üçün mərhələli radiologiya təhsili: ilk hesabatı anlamaqdan görüntüləri arxayın oxumağa qədər. E-poçtunuzu qoyun, açılanda xəbər verək.',
  },
  back: 'radioloq.com-a qayıt',
  badge: 'Radioloq Kurslar · Tezliklə',
  titleLead: 'Radiologiya təhsili,',
  titleTail: 'addım-addım qurulub.',
  sub: 'Həkimlər üçün strukturlaşdırılmış kurslar: ilk hesabatı anlamaqdan görüntüləri arxayın oxumağa qədər. İlk kurs hələ hazırlanır. E-poçtunuzu qoyun, açıldığı gün sizə bir məktub göndərək.',
  form: {
    email: 'E-poçtunuz',
    emailPh: 'ad@example.com',
    consentPre: 'Kurslar açılanda mənə bir e-poçt göndərilməsinə razıyam.',
    privacy: 'Məxfilik siyasəti',
    consentPost: '.',
    submit: 'Mənə xatırlat',
    sending: 'Göndərilir…',
    errEmail: 'Zəhmət olmasa düzgün e-poçt ünvanı daxil edin.',
    errConsent: 'Zəhmət olmasa əlaqə saxlanmasına razılığınızı təsdiqləyin.',
    errSend: 'Xəta baş verdi. Bir az sonra yenidən cəhd edin.',
    doneTitle: 'Siyahıdasınız',
    doneText: 'Təşəkkür edirik. Kurslar açılanda sizə bir dəfə yazacağıq.',
  },
  topics: {
    label: 'Nə gözləməli',
    title: 'Əsaslardan təcrübəyə aydın yol.',
    sub: 'İlk kurslar üçün plan. Detallar açılışdan əvvəl dəyişə bilər.',
    items: [
      { title: 'Əsaslar', desc: 'Rentgen, KT və MRT görüntünü necə yaradır və hansı nədə daha yaxşıdır.' },
      { title: 'Görüntü oxumaq', desc: 'Heç nə qaçmasın deyə müayinəyə sistemli və təkrarlana bilən yanaşma.' },
      { title: 'Real hallar', desc: 'İlk baxışdan nəticəyə qədər mülahizənin göstərildiyi işlənmiş nümunələr.' },
      { title: 'Hesabatlar', desc: 'Radioloji hesabat necə qurulur, onu necə yaxşı oxumaq və yazmaq olar.' },
    ],
  },
  band: { title: 'Xəbəri ilk siz alın.', sub: 'Kurslar açılanda bir e-poçt. Başqa heç nə.' },
  note: 'E-poçtunuz yalnız bu xatırlatma üçün istifadə olunur və xahiş etsəniz silinir.',
}

const tr: CoursesCopy = {
  meta: {
    title: 'Radioloq Kurslar: çok yakında',
    description: 'Doktorlar için adım adım radyoloji eğitimi: ilk raporu anlamaktan görüntüleri güvenle okumaya. E-postanızı bırakın, açılınca haber verelim.',
  },
  back: 'radioloq.com’a dön',
  badge: 'Radioloq Kurslar · Çok yakında',
  titleLead: 'Radyoloji eğitimi,',
  titleTail: 'adım adım kuruldu.',
  sub: 'Doktorlar için yapılandırılmış kurslar: ilk raporu anlamaktan görüntüleri güvenle okumaya. İlk kurs hâlâ hazırlanıyor. E-postanızı bırakın, açıldığı gün size tek bir mesaj gönderelim.',
  form: {
    email: 'E-posta adresiniz',
    emailPh: 'ad@example.com',
    consentPre: 'Kurslar açıldığında bana tek bir e-posta gönderilmesini kabul ediyorum.',
    privacy: 'Gizlilik Politikası',
    consentPost: '.',
    submit: 'Bana hatırlat',
    sending: 'Gönderiliyor…',
    errEmail: 'Lütfen geçerli bir e-posta adresi girin.',
    errConsent: 'Lütfen iletişime geçilmesini kabul ettiğinizi onaylayın.',
    errSend: 'Bir şeyler ters gitti. Lütfen biraz sonra tekrar deneyin.',
    doneTitle: 'Listedesiniz',
    doneText: 'Teşekkürler. Kurslar açıldığında size bir kez yazacağız.',
  },
  topics: {
    label: 'Neler bekleyebilirsiniz',
    title: 'Temelden uygulamaya net bir yol.',
    sub: 'İlk kurslar için plan. Ayrıntılar açılıştan önce değişebilir.',
    items: [
      { title: 'Temeller', desc: 'Röntgen, BT ve MR görüntüyü nasıl oluşturur, hangisi neyde daha iyidir.' },
      { title: 'Görüntü okuma', desc: 'Hiçbir şey gözden kaçmasın diye tetkike sistemli ve tekrarlanabilir bir yaklaşım.' },
      { title: 'Gerçek vakalar', desc: 'İlk bakıştan sonuca kadar akıl yürütmenin gösterildiği çözümlü örnekler.' },
      { title: 'Raporlar', desc: 'Radyoloji raporu nasıl yapılandırılır, nasıl iyi okunur ve yazılır.' },
    ],
  },
  band: { title: 'Haberi ilk siz alın.', sub: 'Kurslar açıldığında tek bir e-posta. Başka hiçbir şey.' },
  note: 'E-postanız yalnızca bu hatırlatma için kullanılır ve talep üzerine silinir.',
}

const de: CoursesCopy = {
  meta: {
    title: 'Radioloq Kurse: bald verfügbar',
    description: 'Strukturierte Radiologie-Weiterbildung für Ärztinnen und Ärzte, vom ersten Befund bis zum sicheren Lesen von Bildern. E-Mail hinterlassen, wir melden uns zum Start.',
  },
  back: 'Zurück zu radioloq.com',
  badge: 'Radioloq Kurse · Bald verfügbar',
  titleLead: 'Radiologie lernen,',
  titleTail: 'Schritt für Schritt.',
  sub: 'Strukturierte Kurse für Ärztinnen und Ärzte, vom ersten Befund bis zum sicheren Lesen von Bildern. Der erste Kurs ist noch in Vorbereitung. Hinterlassen Sie Ihre E-Mail, und Sie erhalten am Starttag eine einzige Nachricht.',
  form: {
    email: 'Ihre E-Mail',
    emailPh: 'name@example.com',
    consentPre: 'Ich bin einverstanden, beim Start der Kurse eine E-Mail zu erhalten. Siehe',
    privacy: 'Datenschutzerklärung',
    consentPost: '.',
    submit: 'Erinnere mich',
    sending: 'Wird gesendet…',
    errEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    errConsent: 'Bitte bestätigen Sie, dass wir Sie kontaktieren dürfen.',
    errSend: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es gleich noch einmal.',
    doneTitle: 'Sie stehen auf der Liste',
    doneText: 'Danke. Wir schreiben Ihnen einmal, wenn die Kurse starten.',
  },
  topics: {
    label: 'Was Sie erwartet',
    title: 'Ein klarer Weg von den Grundlagen zur Praxis.',
    sub: 'Der Plan für die ersten Kurse. Details können sich vor dem Start ändern.',
    items: [
      { title: 'Grundlagen', desc: 'Wie Röntgen, CT und MRT ein Bild erzeugen und wofür sich jedes am besten eignet.' },
      { title: 'Bilder lesen', desc: 'Ein systematisches, wiederholbares Vorgehen, damit nichts übersehen wird.' },
      { title: 'Echte Fälle', desc: 'Durchgearbeitete Beispiele mit sichtbarer Argumentation, vom ersten Blick bis zum Schluss.' },
      { title: 'Befunde', desc: 'Wie ein radiologischer Befund aufgebaut ist und wie man ihn gut liest und schreibt.' },
    ],
  },
  band: { title: 'Seien Sie die Ersten.', sub: 'Eine E-Mail, wenn die Kurse starten. Sonst nichts.' },
  note: 'Ihre E-Mail wird nur für diese Erinnerung verwendet und auf Wunsch gelöscht.',
}

const ru: CoursesCopy = {
  meta: {
    title: 'Radioloq Курсы: скоро',
    description: 'Пошаговое обучение радиологии для врачей: от первого заключения до уверенного чтения снимков. Оставьте почту, и мы сообщим об открытии.',
  },
  back: 'Назад на radioloq.com',
  badge: 'Radioloq Курсы · Скоро',
  titleLead: 'Обучение радиологии,',
  titleTail: 'шаг за шагом.',
  sub: 'Структурированные курсы для врачей: от понимания первого заключения до уверенного чтения снимков. Первый курс ещё готовится. Оставьте почту, и в день открытия вы получите одно письмо.',
  form: {
    email: 'Ваша почта',
    emailPh: 'name@example.com',
    consentPre: 'Я согласен получить одно письмо, когда курсы откроются. См.',
    privacy: 'Политику конфиденциальности',
    consentPost: '.',
    submit: 'Напомнить мне',
    sending: 'Отправка…',
    errEmail: 'Пожалуйста, введите корректный адрес почты.',
    errConsent: 'Пожалуйста, подтвердите согласие на связь.',
    errSend: 'Что-то пошло не так. Попробуйте ещё раз чуть позже.',
    doneTitle: 'Вы в списке',
    doneText: 'Спасибо. Мы напишем вам один раз, когда курсы откроются.',
  },
  topics: {
    label: 'Что вас ждёт',
    title: 'Понятный путь от основ к практике.',
    sub: 'План первых курсов. Детали могут измениться до запуска.',
    items: [
      { title: 'Основы', desc: 'Как рентген, КТ и МРТ создают изображение и в чём сильна каждая методика.' },
      { title: 'Чтение снимков', desc: 'Системный, повторяемый подход к исследованию, чтобы ничего не упустить.' },
      { title: 'Реальные случаи', desc: 'Разобранные примеры с показанным ходом рассуждений, от первого взгляда до вывода.' },
      { title: 'Заключения', desc: 'Как устроено радиологическое заключение и как его хорошо читать и писать.' },
    ],
  },
  band: { title: 'Узнайте первыми.', sub: 'Одно письмо, когда курсы откроются. Больше ничего.' },
  note: 'Ваша почта используется только для этого напоминания и удаляется по запросу.',
}

export const coursesContent: Record<Lang, CoursesCopy> = { az, en, tr, de, ru }
