"""
Translation table for Radioloq: every visible text of the site in one workbook, five
languages side by side, so the owner can correct translations by hand.

    python3 scripts/i18n.py export out.xlsx      (run from site/, needs: pip install openpyxl beautifulsoup4)

Tabs and row keys (column A, never edited by hand; an importer maps each row back by it):

  Ana site     site:<path>       a string in src/content/<lang>.ts, path like pricing.tiers.1.features.2
  Kurslar      courses:<path>    a string in src/content/courses.ts, same path scheme
  Leistungen   services:<c>:<i>  block <i> in section <c> of public/services-<lang>.html
  AGB          terms:<c>:<i>     same for terms-<lang>.html (terms.html is a copy of terms-de.html)
  Datenschutz  privacy:<c>:<i>   same for privacy-<lang>.html (privacy.html is a copy of privacy-de.html)
  ...:notice   the "this is a translation" note that only the non-German legal pages have

Sections <c> are counted from 0: 0 is everything before the first <h2 id>, then one per <h2 id>.
Blocks <i> are p, li, h1-h4, th, td, dt, dd in document order, innermost only.

Cell notation, so links and bold survive a round trip:
  [text]         in Ana site / Kurslar: the linked part of a sentence (pre [link] post)
  [text](url)    in legal pages: a link
  **text**       in legal pages: bold
  a line break   <br>
"""

import json
import re
import subprocess
import sys
from pathlib import Path

LANGS = ['de', 'en', 'tr', 'az', 'ru']
SITE = Path(__file__).resolve().parent.parent

# Not text: addresses, codes and switches that are the same in every language.
SKIP_KEYS = {'lang', 'href', 'servicesHref', 'termsHref', 'privacyHref', 'photo', 'icon', 'key', 'external', 'recommended'}

SECTION_TR = {
    'meta': 'Sekme başlığı ve Google açıklaması', 'nav': 'Üst menü', 'hero': 'Giriş', 'stats': 'Rakamlar',
    'process': 'Nasıl çalışır', 'firstAssessment': 'Ücretsiz ön değerlendirme paneli', 'pricing': 'Fiyatlar',
    'about': 'Hakkımda', 'faq': 'SSS', 'contact': 'İletişim', 'doctors': 'Hekimler için', 'footer': 'Alt bilgi',
    'cookie': 'Çerez bandı', 'modal': 'Sipariş penceresi',
    'form': 'Form', 'topics': 'Konular', 'band': 'Alt bant', 'back': 'Geri butonu', 'badge': 'Üst satır',
}
FIELD_TR = {
    'title': 'başlık', 'sub': 'alt metin', 'desc': 'açıklama', 'description': 'açıklama', 'cta': 'buton',
    'cta1': 'buton 1', 'cta2': 'buton 2', 'cta3': 'link', 'q': 'soru', 'a': 'cevap', 'label': 'etiket',
    'name': 'ad', 'value': 'değer', 'note': 'not', 'text': 'metin', 'role': 'unvan', 'bio': 'giriş cümlesi',
    'quote': 'alıntı', 'cite': 'alıntı imzası', 'titleLead': 'başlık 1. satır', 'titleTail': 'başlık 2. satır',
    'per': 'birim', 'tier': 'paket adı', 'flag': 'rozet', 'features': 'madde', 'steps': 'adım', 'items': 'öğe',
    # header and footer
    'how': '"Nasıl çalışır" linki', 'price': '"Fiyatlar" linki', 'about': '"Hakkımda" linki',
    'lang': 'dil seçici etiketi', 'langSoon': '"yakında" ibaresi', 'skip': 'klavye için atlama linki',
    'theme': 'koyu tema düğmesi etiketi', 'services': '"Hizmetler" linki', 'terms': '"Koşullar" linki',
    'privacy': '"Gizlilik" linki', 'cookies': '"Çerez ayarları" linki', 'accept': '"Kabul" butonu',
    'reject': '"Reddet" butonu', 'and': '"ve" bağlacı',
    # hero example panel
    'panel': 'örnek kart', 'example': '"örnek" ibaresi', 'scan': 'rapor başlığı', 'read': 'açıklama başlığı',
    'scanText': 'rapor cümlesi', 'readText': 'sade açıklama', 'type': 'tür',
    # pricing and order window
    'vat': 'KDV notu', 'scope': 'kapsam', 'basic': 'Basic', 'standard': 'Standard', 'premium': 'Premium',
    'close': 'kapat düğmesi', 'discTitle': 'tıbbi uyarı başlığı', 'discText': 'tıbbi uyarı metni',
    'chk1': 'onay kutusu 1', 'chk2': 'onay kutusu 2', 'chk3': 'onay kutusu 3', 'chk4': 'onay kutusu 4 (cayma)',
    'payErr': 'onay eksik uyarısı', 'sumTitle': 'özet başlığı', 'sumTotal': '"toplam" ibaresi', 'sumNote': 'özet notu',
    'bookBtn': 'ödeme butonu', 'payCard': '"kart" ibaresi', 'linkErr': 'ödeme linki hatası', 'opening': 'ödeme açılıyor',
    'secure': 'güvenli ödeme notu', 'pendingTitle': 'ödeme bekleniyor başlığı', 'pendingText': 'ödeme bekleniyor metni',
    'confirmBtn': '"Ödedim" butonu', 'backBtn': '"Geri" butonu', 'uploadTitle': 'yükleme başlığı',
    'uploadSub': 'yükleme alt metni', 'eignungNote': 'uygunluk notu', 'nameLabel': 'ad alanı', 'emailLabel': 'e-posta alanı',
    'langLabel': 'dil alanı', 'langPlaceholder': 'dil alanı ipucu', 'packageLabel': 'paket alanı',
    'noteLabel': 'klinik bilgi alanı', 'notePh': 'klinik bilgi ipucu', 'fnote': 'veri notu', 'submitBtn': 'gönder butonu',
    'sending': '"gönderiliyor" ibaresi', 'fieldsRequiredName': 'ad eksik uyarısı', 'fieldsRequiredEmail': 'e-posta eksik uyarısı',
    'fieldsRequiredBoth': 'ad ve e-posta eksik uyarısı', 'doneTitle': 'bitti başlığı', 'doneText': 'bitti metni',
    'uploadBtn': 'yükleme butonu', 'uploadSecureNote': 'güvenli yükleme notu', 'submitError': 'gönderim hatası',
    # courses form
    'email': 'e-posta alanı', 'emailPh': 'e-posta ipucu', 'consentPre': 'onay kutusu', 'submit': 'gönder butonu',
    'errEmail': 'e-posta hatası', 'errConsent': 'onay hatası', 'errSend': 'gönderim hatası', 'notice': 'bilgi notu',
    'stats': 'kutu', 'rows': 'satır', 'sub': 'alt metin',
}
BLOCK_TR = {'p': 'paragraf', 'li': 'madde', 'h1': 'başlık', 'h2': 'başlık', 'h3': 'ara başlık', 'h4': 'ara başlık',
            'th': 'tablo başlığı', 'td': 'tablo hücresi', 'dt': 'terim', 'dd': 'tanım'}


# ---------------------------------------------------------------- content files

def dump_content():
    raw = subprocess.run(['node', 'scripts/i18n-dump.mjs'], cwd=SITE, check=True, capture_output=True, text=True).stdout
    return json.loads(raw)


def is_linked(v):
    return isinstance(v, dict) and set(v) == {'pre', 'link', 'href', 'post'}


def walk(node, path=()):
    """Yields (path, value) for every text leaf. Linked sentences come out whole as 'pre [link] post'."""
    if is_linked(node):
        yield path, f"{node['pre']}[{node['link']}]{node['post']}"
    elif isinstance(node, dict):
        for k, v in node.items():
            if k not in SKIP_KEYS:
                yield from walk(v, path + (k,))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from walk(v, path + (str(i),))
    elif isinstance(node, str) and re.search(r'[^\W\d_]', node):
        yield path, node


def where(path, sample):
    """Readable location such as 'Fiyatlar › Standard › madde 3'."""
    parts, node = [], sample
    for i, p in enumerate(path):
        nxt = node[int(p)] if isinstance(node, list) else node.get(p) if isinstance(node, dict) else None
        if isinstance(node, list):
            if isinstance(nxt, dict) and 'tier' in nxt:
                parts.append(nxt['tier'])
            else:
                parent = path[i - 1] if i else ''
                parts.append(f"{FIELD_TR.get(parent, parent)} {int(p) + 1}")
        elif i == 0:
            parts.append(SECTION_TR.get(p) or FIELD_TR.get(p, p))
        elif p not in ('tiers', 'features', 'steps', 'items', 'rows'):
            parts.append(FIELD_TR.get(p, p))
        node = nxt
    return ' › '.join(parts)


def content_rows(prefix, by_lang):
    leaves = {l: dict(walk(by_lang[l])) for l in LANGS}
    order = list(dict.fromkeys(p for l in LANGS for p in leaves[l]))
    rows = []
    for path in order:
        vals = [leaves[l].get(path, '') for l in LANGS]
        if len(set(vals)) == 1:  # identical everywhere: a name or a code, not a translation
            continue
        rows.append([f"{prefix}:{'.'.join(path)}", where(path, by_lang['de']), *vals, hint(vals)])
    return rows


APPROVED = ('Hinweise auf weiteren ärztlichen Abklärungsbedarf', 'mit vollständiger Erbringung erlischt')


def hint(vals):
    """A pre-filled note where a cell carries an approved legal sentence or a fixed price."""
    de = vals[0]
    if any(a in de for a in APPROVED):
        return 'Onaylı hukuki cümle var. Anlamı aynı kalmalı.'
    if re.search(r'\b(50|84|158)\s?(€|Euro)|€\s?(50|84|158)\b', de):
        return 'Fiyat sabit, rakamlara dokunma.'
    return ''


# ---------------------------------------------------------------- legal pages

BLOCKS = ['p', 'li', 'h1', 'h2', 'h3', 'h4', 'th', 'td', 'dt', 'dd']


def to_cell(el):
    """Inner HTML of a block as editable text: **bold**, [text](url), line breaks."""
    from bs4 import NavigableString

    def render(node):
        if isinstance(node, NavigableString):
            return re.sub(r'\s+', ' ', str(node))
        inner = ''.join(render(c) for c in node.children)
        if node.name == 'br':
            return '\n'
        if node.name in ('strong', 'b'):
            return f'**{inner.strip()}**' + (' ' if inner.endswith(' ') else '')
        if node.name == 'a':
            return f"[{inner.strip()}]({node.get('href', '')})"
        return inner

    text = ''.join(render(c) for c in el.children)
    return re.sub(r'[ \t]+\n', '\n', re.sub(r'\n[ \t]+', '\n', text)).strip()


def legal_blocks(kind, lang):
    """[(section, tag, text, is_notice)] for one legal page, innermost blocks only."""
    from bs4 import BeautifulSoup
    html = (SITE / 'public' / f'{kind}-{lang}.html').read_text(encoding='utf-8')
    main = BeautifulSoup(html, 'html.parser').find('main')
    out, section = [], 0
    for el in main.find_all(BLOCKS):
        if el.name == 'h2' and el.get('id'):
            section += 1
        if el.find(BLOCKS):  # has a block inside: the inner one is the row
            continue
        in_banner = el.find_parent(class_='mt-banner') is not None
        in_note = section == 0 and el.find_parent('div', class_='note') is not None
        out.append((section, el.name, to_cell(el), in_banner, in_note))
    return out


def mark_notices(per):
    """Finds the translation note that only non-German pages carry: a .mt-banner block, or a
    .note block at the top of the page when the German page has none there."""
    de_notes = sum(1 for b in per['de'] if b[4])
    marked = {}
    for lang, blocks in per.items():
        extra_note = lang != 'de' and sum(1 for b in blocks if b[4]) > de_notes
        rows, taken = [], False
        for section, tag, text, in_banner, in_note in blocks:
            notice = in_banner or (extra_note and in_note and not taken)
            taken = taken or (notice and in_note)
            rows.append((section, tag, text, notice))
        marked[lang] = rows
    return marked


def legal_rows(kind):
    per = mark_notices({l: legal_blocks(kind, l) for l in LANGS})
    notes = {l: next((b[2] for b in per[l] if b[3]), '') for l in LANGS}
    plain = {l: [b for b in per[l] if not b[3]] for l in LANGS}
    lengths = {l: len(v) for l, v in plain.items()}
    if len(set(lengths.values())) != 1:
        sys.exit(f'{kind}: pages do not line up block for block: {lengths}')

    rows = []
    if any(notes.values()):
        rows.append([f'{kind}:notice', 'Çeviri notu (Almanca sayfada yok)', *[notes[l] for l in LANGS], ''])

    headings = {0: 'Sayfa başı'}
    for section, tag, text, _ in plain['de']:
        if tag == 'h2' and section not in headings:
            headings[section] = re.sub(r'\*\*', '', text)
    counters = {}
    for i, (section, tag, _, _) in enumerate(plain['de']):
        idx = counters.get(section, 0)
        counters[section] = idx + 1
        tags = {plain[l][i][1] for l in LANGS}
        if len(tags) != 1:
            sys.exit(f'{kind}: block {i} has different element types across languages: {tags}')
        vals = [plain[l][i][2] for l in LANGS]
        rows.append([f'{kind}:{section}:{idx}', f"{headings.get(section, section)} › {BLOCK_TR[tag]}", *vals, hint(vals)])
    return rows


# ---------------------------------------------------------------- workbook

HELP = [
    'Radioloq çeviri tablosu',
    '',
    'Her satır sitedeki bir metin. Beş dil yan yana: DE, EN, TR, AZ, RU.',
    'Yanlış olan hücreyi düzelt. Not sütununa istediğini yazabilirsin.',
    '',
    'Lütfen:',
    '• A sütununa (Anahtar) dokunma, satır ekleme veya silme. Metni koda geri bulduran o.',
    '• Ana site ve Kurslar: [köşeli parantez] içindeki kısım bağlantı. Parantezleri bırak.',
    '• Hukuki sayfalar: **kalın** ve [bağlantı metni](adres) işaretlerini bırak.',
    '• Fiyatlar sabit, onlara dokunma.',
    '',
    'Bitince bana "bitti" yaz. Değişiklikleri koda alırken tire, noktalı virgül,',
    'cinsiyet çiftlemesi ve Dr. kurallarını kontrol eder, takıldığım yeri sorarım.',
]


def write_workbook(path, tabs, source):
    from openpyxl import Workbook
    from openpyxl.styles import Alignment, Font, PatternFill

    wb = Workbook()
    ws = wb.active
    ws.title = 'Nasıl'
    for i, line in enumerate(HELP + ['', f'Kaynak: {source}'], start=1):
        ws.cell(row=i, column=1, value=line)
    ws['A1'].font = Font(bold=True, size=14)
    ws.column_dimensions['A'].width = 110

    head_fill = PatternFill('solid', fgColor='D3E2FF')
    key_font = Font(size=8, color='8A94A3')
    wrap = Alignment(wrap_text=True, vertical='top')
    header = ['Anahtar', 'Nerede', 'DE', 'EN', 'TR', 'AZ', 'RU', 'Not']
    widths = [12, 30, 46, 46, 46, 46, 46, 28]

    for title, rows in tabs:
        ws = wb.create_sheet(title)
        ws.append(header)
        for c in ws[1]:
            c.font = Font(bold=True)
            c.fill = head_fill
        for r in rows:
            ws.append(r)
        for row in ws.iter_rows(min_row=2):
            for c in row:
                c.alignment = wrap
                c.number_format = '@'  # text, so nothing turns into a number or a date
            row[0].font = key_font
        for i, w in enumerate(widths):
            ws.column_dimensions['ABCDEFGH'[i]].width = w
        ws.freeze_panes = 'C2'
    wb.save(path)


def export(out):
    data = dump_content()
    source = subprocess.run(['git', 'rev-parse', '--short', 'HEAD'], cwd=SITE, capture_output=True, text=True).stdout.strip()
    tabs = [
        ('Ana site', content_rows('site', data['site'])),
        ('Kurslar', content_rows('courses', data['courses'])),
        ('Leistungen', legal_rows('services')),
        ('AGB', legal_rows('terms')),
        ('Datenschutz', legal_rows('privacy')),
    ]
    write_workbook(out, tabs, f'radioloq main @ {source}')
    for title, rows in tabs:
        print(f'{title}: {len(rows)} rows')


if __name__ == '__main__':
    if len(sys.argv) == 3 and sys.argv[1] == 'export':
        export(sys.argv[2])
    else:
        sys.exit(__doc__)
