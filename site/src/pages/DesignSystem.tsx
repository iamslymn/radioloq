import { useState, type ReactNode } from 'react'
import { Accordion } from '../components/Accordion'
import { Button, TextLink } from '../components/Button'
import { Checkbox, Select, TextArea, TextField } from '../components/Field'
import { ArrowRight, ArrowUpRight } from '../components/Icon'
import { LangSwitch } from '../components/LangSwitch'
import { Logo, Mark } from '../components/Logo'
import { Modal } from '../components/Modal'
import { PriceTable } from '../components/PriceTable'
import { SectionHeader, SectionLabel } from '../components/Section'
import { MarkSpinner, Starburst } from '../components/StarburstMark'
import content, { languages, packages } from '../content/az'
import './DesignSystem.css'

const colours = [
  { name: 'Midnight Navy', token: '--navy', hex: '#0E1929', share: 30, role: 'Leads the hierarchy: text, inverse bands, footer.', dark: true },
  { name: 'Diagnostic Blue', token: '--blue', hex: '#5180FF', share: 3, role: 'Guides attention: focus rings, markers, link underlines, checks. Never a background area.', dark: false },
  { name: 'Spectrum Blue', token: '--spectrum', hex: '#A3C3FE', share: 7, role: 'Accents on navy, quiet highlights.', dark: false },
  { name: 'Luminescent Ice', token: '--ice', hex: '#D3E2FF', share: 15, role: 'Soft information layers, selection, the starburst.', dark: false },
  { name: 'Clinical Mist', token: '--mist', hex: '#F3F8FE', share: 45, role: 'Default canvas instead of pure white.', dark: false },
]

const typeScale = [
  { cls: 't-h1', name: 'Headline 1', spec: 'Inter Display Regular · 56/64 · -4%', sample: 'Almaniya standartında ikinci baxış' },
  { cls: 't-h2', name: 'Headline 2', spec: 'Inter Display Regular · 40/48 · -4%', sample: 'Tez-tez verilən suallar' },
  { cls: 't-h3', name: 'Headline 3', spec: 'Inter Display Medium · 36/42 · -4%', sample: 'Ədalət Gəncəli' },
  { cls: 't-h4', name: 'Headline 4', spec: 'Inter Display Bold · 28/36 · -2%', sample: 'Rəy + konsultasiya' },
  { cls: 't-sub', name: 'Subheadline', spec: 'Inter Display Regular · 24/32 · -4%', sample: 'Görüntünüzdən aydın izahata dörd sadə addım.' },
  { cls: 't-body', name: 'Body', spec: 'Inter Regular · 17/28 · -1.1%', sample: content.hero.sub },
  { cls: 't-small', name: 'Small', spec: 'Inter Regular · 14/22', sample: content.pricing.vat },
  { cls: 't-label', name: 'Label', spec: 'Inter Medium · 13/18 · +1%', sample: 'Cavab müddəti · Şifrələnmiş · Almaniya' },
]

const spacing = [
  ['1', '4'], ['2', '8'], ['3', '12'], ['4', '16'], ['5', '24'], ['6', '32'], ['7', '48'], ['8', '64'], ['9', '96'], ['10', '128'],
]

const easings = [
  { name: '--ease-out', curve: 'cubic-bezier(0.23, 1, 0.32, 1)', use: 'Entering, pressing, popovers' },
  { name: '--ease-in-out', curve: 'cubic-bezier(0.77, 0, 0.175, 1)', use: 'Things moving on screen' },
  { name: '--ease-drawer', curve: 'cubic-bezier(0.32, 0.72, 0, 1)', use: 'Sheets and the cookie bar' },
]

function Block({ index, title, intro, children }: { index: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section className="ds-block">
      <div className="ds-block__head">
        <SectionLabel index={index}>{title}</SectionLabel>
        {intro && <p className="t-small muted">{intro}</p>}
      </div>
      <div className="ds-block__body">{children}</div>
    </section>
  )
}

export default function DesignSystem() {
  const [modal, setModal] = useState(false)
  const [checked, setChecked] = useState(true)
  const [unchecked, setUnchecked] = useState(false)
  const [play, setPlay] = useState(false)

  return (
    <div className="ds">
      <header className="ds-top container">
        <a href="/" aria-label="Radioloq">
          <Logo className="ds-top__logo" />
        </a>
        <TextLink href="/" icon={<ArrowRight size={14} />}>
          Landing page
        </TextLink>
      </header>

      <div className="container">
        <div className="ds-intro">
          <p className="t-label faint">Radioloq · Design system · v1</p>
          <h1 className="t-h1">The report.</h1>
          <p className="t-sub muted ds-intro__sub">
            A patient-facing radiology report should be precise, quiet and readable. Every part of this system follows
            from that: a mist canvas, navy text, hairline rules, field labels, and one blue for the thing you should do next.
          </p>
        </div>

        <Block index="01" title="Colour" intro="Proportions from the brand book. Blue is the smallest share on purpose.">
          <div className="ds-share" aria-hidden>
            {colours.map((c) => (
              <span key={c.token} style={{ flexGrow: c.share, background: `var(${c.token})` }} />
            ))}
          </div>
          <div className="ds-swatches">
            {colours.map((c) => (
              <div className="ds-swatch" key={c.token}>
                <div className="ds-swatch__chip" style={{ background: `var(${c.token})`, color: c.dark ? '#fff' : 'var(--navy)' }}>
                  <span className="t-label t-num">{c.share}%</span>
                </div>
                <p className="ds-swatch__name">{c.name}</p>
                <p className="t-small faint t-num">
                  {c.hex} · {c.token}
                </p>
                <p className="t-small muted">{c.role}</p>
              </div>
            ))}
          </div>
          <div className="ds-pairs">
            <div className="ds-pair" style={{ background: 'var(--navy)', color: 'var(--mist-text)' }}>
              <strong>#DFE2E2 on Midnight Navy</strong>
              <span className="t-small">13.3 : 1 · passes AAA. The primary button.</span>
            </div>
            <div className="ds-pair" style={{ background: 'var(--mist-text)', color: 'var(--navy)' }}>
              <strong>Midnight Navy on #DFE2E2</strong>
              <span className="t-small">13.3 : 1 · the primary button on navy bands.</span>
            </div>
            <div className="ds-pair" style={{ background: 'var(--navy)', color: 'var(--spectrum)' }}>
              <strong>Spectrum on Navy</strong>
              <span className="t-small">9.6 : 1 · accents on dark bands.</span>
            </div>
          </div>
        </Block>

        <Block index="02" title="Typography" intro="Inter for everything. Large sizes switch to Inter Display through the optical-size axis. Alethia Next stays inside the logo.">
          <div className="ds-type">
            {typeScale.map((t) => (
              <div className="ds-type__row" key={t.cls}>
                <div className="ds-type__meta">
                  <p className="t-label">{t.name}</p>
                  <p className="t-small faint">{t.spec}</p>
                </div>
                <p className={t.cls}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block index="03" title="Space, shape, depth" intro="A 4px base. Corners stay small (4 to 16px); pills are not part of the system. Depth comes from hairlines first, shadows only on overlays.">
          <div className="ds-space">
            {spacing.map(([k, px]) => (
              <div className="ds-space__row" key={k}>
                <span className="t-label t-num faint">--space-{k}</span>
                <span className="ds-space__bar" style={{ width: `${px}px` }} />
                <span className="t-small t-num">{px}px</span>
              </div>
            ))}
          </div>
          <div className="ds-shapes">
            {['xs · 4', 'sm · 8', 'md · 12', 'lg · 16'].map((r, i) => (
              <div key={r} className="ds-shape" style={{ borderRadius: [4, 8, 12, 16][i] }}>
                <span className="t-label">{r}</span>
              </div>
            ))}
            <div className="ds-shape ds-shape--raised">
              <span className="t-label">shadow-raised</span>
            </div>
            <div className="ds-shape ds-shape--overlay">
              <span className="t-label">shadow-overlay</span>
            </div>
          </div>
        </Block>

        <Block index="04" title="Motion" intro="Fast, ease-out, and only where it explains something. UI motion stays under 300ms; exits are quicker than entries. Hover effects only on devices that can hover.">
          <div className="ds-motion">
            {easings.map((e) => (
              <div className="ds-motion__row" key={e.name} data-play={play}>
                <div>
                  <p className="t-label">{e.name}</p>
                  <p className="t-small faint">{e.use}</p>
                </div>
                <div className="ds-motion__track">
                  <span className="ds-motion__dot" style={{ transitionTimingFunction: e.curve }} />
                </div>
              </div>
            ))}
            <div>
              <Button size="sm" variant="secondary" onClick={() => setPlay((p) => !p)}>
                Play curves
              </Button>
            </div>
            <table className="ds-table t-small">
              <tbody>
                <tr><td>Button press</td><td className="t-num">140ms · scale(0.97)</td></tr>
                <tr><td>Hover colour</td><td className="t-num">160ms · ease</td></tr>
                <tr><td>Popover, accordion</td><td className="t-num">200–260ms · ease-out</td></tr>
                <tr><td>Modal in / out</td><td className="t-num">260ms in · 180ms out</td></tr>
                <tr><td>Scroll reveal</td><td className="t-num">560ms · 12px · 40ms stagger · once</td></tr>
              </tbody>
            </table>
          </div>
        </Block>

        <Block index="05" title="Brand mark" intro="Logo artwork is used as supplied. The radial mark appears once at scale per page, and as a small waiting indicator.">
          <div className="ds-logos">
            <div className="ds-logo-tile">
              <Logo />
            </div>
            <div className="ds-logo-tile inverse">
              <Logo />
            </div>
            <div className="ds-logo-tile ds-logo-tile--mark">
              <Mark />
              <MarkSpinner label="Loading" size={32} />
            </div>
            <div className="ds-logo-tile ds-logo-tile--burst">
              <Starburst />
            </div>
          </div>
        </Block>

        <Block index="06" title="Actions">
          <div className="ds-row">
            <Button icon={<ArrowRight />}>Qiymətlərə baxın</Button>
            <Button variant="secondary">Necə işləyir</Button>
            <Button size="sm">Small</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="ds-row">
            <TextLink href="#" icon={<ArrowRight size={14} />}>
              Pulsuz 15 dəq tanışlıq
            </TextLink>
            <TextLink href="#" icon={<ArrowUpRight size={14} />}>
              Kurslara bax
            </TextLink>
          </div>
          <div className="ds-row inverse ds-row--inverse">
            <Button icon={<ArrowRight />}>Pulsuz 15 dəq görüş təyin et</Button>
            <Button variant="secondary">Secondary on navy</Button>
            <TextLink href="#">Text link on navy</TextLink>
          </div>
        </Block>

        <Block index="07" title="Structure">
          <SectionHeader index="01" label="Proses" title="Necə işləyir" lead="Görüntünüzdən aydın izahata dörd sadə addım." />
          <div className="ds-row" style={{ justifyContent: 'flex-end' }}>
            <LangSwitch languages={languages} current="az" label="Select language" unavailableHint="Tezliklə" />
          </div>
        </Block>

        <Block index="08" title="Pricing table">
          <PriceTable
            tiers={content.pricing.tiers.map((t) => ({ ...t, price: packages[t.key].price }))}
            onSelect={() => setModal(true)}
          />
        </Block>

        <Block index="09" title="Disclosure">
          <Accordion items={content.faq.items.slice(0, 3)} />
        </Block>

        <Block index="10" title="Forms and overlays">
          <div className="ds-form">
            <TextField label="Adınız" placeholder="Ədalət Gəncəli" />
            <TextField label="E-mail ünvanınız" placeholder="ad@example.com" invalid />
            <Select label="Dil" defaultValue="">
              <option value="">Language preference...</option>
              <option>Azərbaycanca</option>
            </Select>
            <TextArea label="Klinik kontekst (istəyə bağlı)" placeholder="Simptomlar, görüntü tarixi..." />
            <Checkbox checked={checked} onChange={setChecked}>
              Checked consent with a <a href="#">linked document</a>.
            </Checkbox>
            <Checkbox checked={unchecked} onChange={setUnchecked} invalid>
              Required consent that has not been given yet.
            </Checkbox>
          </div>
          <div className="ds-row">
            <Button variant="secondary" onClick={() => setModal(true)}>
              Open modal
            </Button>
          </div>
        </Block>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} labelledBy="ds-modal-title" closeLabel="Close">
        <div className="ds-modal">
          <p className="t-label faint">Modal</p>
          <h2 className="t-h4" id="ds-modal-title">
            İkinci rəyinizi alın
          </h2>
          <p className="muted">Centred, scales in from 0.96 over 260ms, leaves in 180ms. Becomes a bottom sheet on phones.</p>
          <Button block onClick={() => setModal(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  )
}
