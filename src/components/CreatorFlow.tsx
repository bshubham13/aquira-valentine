import { useMemo, useState } from 'react'
import { encodePayload } from '../lib'
import { defaultData, type Tone, type ValentineData } from '../types'

const tones: Array<{ id: Tone; emoji: string; title: string; copy: string }> = [
  { id: 'chaotic', emoji: '⚡', title: 'Cute chaos', copy: 'Teasing, dramatic, zero chill' },
  { id: 'soft', emoji: '☁', title: 'Soft hours', copy: 'Warm, sincere, thoda dreamy' },
  { id: 'filmy', emoji: '✦', title: 'Full filmy', copy: 'Main character energy only' },
]

const steps = ['Casting', 'Vibe check', 'Secret sauce', 'Transmit']

export default function CreatorFlow() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<ValentineData>(defaultData)
  const [copied, setCopied] = useState(false)
  const [launched, setLaunched] = useState(false)
  const link = useMemo(() => `${window.location.origin}${window.location.pathname}#love=${encodePayload(data)}`, [data])
  const update = (key: keyof ValentineData, value: string) => setData((current) => ({ ...current, [key]: value }))
  const canContinue = step !== 0 || Boolean(data.creatorName.trim() && data.recipientName.trim())

  const copy = async () => {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  if (launched) {
    return (
      <main className="creator success-screen">
        <div className="success-orbit" aria-hidden="true"><span>✦</span><span>♥</span><span>✦</span></div>
        <p className="eyebrow">TRANSMISSION READY</p>
        <h1>Your chaos is<br /><em>officially live.</em></h1>
        <p className="success-copy">Heartline ne {data.nickname || data.recipientName} ke naam pe eight frequencies reserve kar di hain. Ab bas link bhejo aur suspiciously normal act karo.</p>
        <div className="link-ticket">
          <span>PRIVATE HEARTLINE</span>
          <code>{link.slice(0, 48)}…</code>
          <button onClick={copy}>{copied ? 'COPIED! AB BHEJO ↗' : 'COPY SECRET LINK'}</button>
        </div>
        <button className="text-button" onClick={() => window.open(link, '_blank')}>Preview recipient experience →</button>
        <button className="text-button muted" onClick={() => setLaunched(false)}>← Edit transmission</button>
      </main>
    )
  }

  return (
    <main className="creator">
      <header className="creator-nav">
        <a className="brand" href="#"><span className="brand-mark">A</span><span>AQUIRA<br />CRAFT</span></a>
        <div className="on-air"><i /> HEARTLINE 8:08</div>
        <span className="edition">VALENTINE WEEK<br />SPECIAL EDITION</span>
      </header>

      <section className="builder-shell">
        <aside className="builder-intro">
          <p className="eyebrow">A PRIVATE BROADCAST FOR ONE</p>
          <h1>Make their week<br />impossible to <em>scroll past.</em></h1>
          <p>Eight secret frequencies. Eight completely different experiences. One person who deserves something less boring than a forwarded reel.</p>
          <div className="frequency-strip" aria-hidden="true">
            {[12, 38, 20, 54, 28, 68, 42, 18, 62, 32, 49, 25].map((height, index) => <i key={index} style={{ height }} />)}
          </div>
          <blockquote>“website nahi hai.<br />yeh <strong>poora scene</strong> hai.”</blockquote>
        </aside>

        <section className="builder-card">
          <div className="stepper">
            {steps.map((label, index) => (
              <div className={index === step ? 'active' : index < step ? 'done' : ''} key={label}>
                <span>{index < step ? '✓' : `0${index + 1}`}</span><small>{label}</small>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="form-stage stage-enter">
              <span className="stage-number">01 / THE CAST</span>
              <h2>Okay, who are we<br />being extra for?</h2>
              <label>Your name<input value={data.creatorName} onChange={(e) => update('creatorName', e.target.value)} placeholder="The mastermind" /></label>
              <label>Their name<input value={data.recipientName} onChange={(e) => update('recipientName', e.target.value)} placeholder="The main character" /></label>
              <label>Your special name for them <small>(optional but cute)</small><input value={data.nickname} onChange={(e) => update('nickname', e.target.value)} placeholder="sunshine, gadhi, jaan…" /></label>
            </div>
          )}

          {step === 1 && (
            <div className="form-stage stage-enter">
              <span className="stage-number">02 / VIBE CHECK</span>
              <h2>Pick your flavour<br />of pyaar.</h2>
              <div className="tone-grid">
                {tones.map((tone) => <button type="button" key={tone.id} className={data.tone === tone.id ? 'selected' : ''} onClick={() => update('tone', tone.id)}><b>{tone.emoji}</b><strong>{tone.title}</strong><small>{tone.copy}</small></button>)}
              </div>
              <label>The soundtrack in your head<input value={data.song} onChange={(e) => update('song', e.target.value)} placeholder="A song, an inside joke, anything" /></label>
            </div>
          )}

          {step === 2 && (
            <div className="form-stage stage-enter">
              <span className="stage-number">03 / SECRET SAUCE</span>
              <h2>Give us the things<br />only you two know.</h2>
              <label>A core memory<textarea value={data.memory} onChange={(e) => update('memory', e.target.value)} maxLength={160} /><small className="counter">{data.memory.length}/160</small></label>
              <label>Something you mean, properly<textarea value={data.message} onChange={(e) => update('message', e.target.value)} maxLength={160} /><small className="counter">{data.message.length}/160</small></label>
              <label>One promise (sincere or stupid)<textarea value={data.promise} onChange={(e) => update('promise', e.target.value)} maxLength={120} /><small className="counter">{data.promise.length}/120</small></label>
            </div>
          )}

          {step === 3 && (
            <div className="form-stage review-stage stage-enter">
              <span className="stage-number">04 / FINAL CHECK</span>
              <h2>The airwaves are<br />ready for you.</h2>
              <div className="broadcast-preview">
                <div className="preview-top"><span>PRIVATE SIGNAL</span><i>● REC</i></div>
                <div className="preview-heart">♥<div className="orbit-text">FOR {data.recipientName.toUpperCase()} • FROM {data.creatorName.toUpperCase()} • </div></div>
                <h3>Hey, {data.nickname || data.recipientName}.</h3>
                <p>Your person hijacked the internet for you. Casual.</p>
                <div className="preview-days">{['R','P','C','T','P','H','K','V'].map((day, i) => <span key={i}>{day}</span>)}</div>
              </div>
              <p className="privacy-note">🔒 No account. No public gallery. Just one encoded link made for one person.</p>
            </div>
          )}

          <footer className="builder-actions">
            <button className="back-button" disabled={step === 0} onClick={() => setStep((value) => value - 1)}>← Back</button>
            {step < 3 ? <button className="primary-button" disabled={!canContinue} onClick={() => setStep((value) => value + 1)}>Continue <span>↗</span></button> : <button className="primary-button live-button" onClick={() => setLaunched(true)}>Go live <span>●</span></button>}
          </footer>
        </section>
      </section>
      <footer className="page-footer"><span>MADE WITH QUESTIONABLE AMOUNTS OF FEELINGS</span><span>© 2026 AQUIRACRAFT</span></footer>
    </main>
  )
}
