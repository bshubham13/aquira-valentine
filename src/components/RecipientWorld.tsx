import { useEffect, useState } from 'react'
import type { ValentineData } from '../types'
import DailyExperience from './DailyExperiences'

export type DayId = 'rose' | 'propose' | 'chocolate' | 'teddy' | 'promise' | 'hug' | 'kiss' | 'valentine'

const days: Array<{ id: DayId; no: string; date: string; title: string; sub: string; icon: string; className: string }> = [
  { id: 'rose', no: '01', date: 'FEB 07', title: 'The Illegal Garden', sub: 'Grow something suspiciously personal', icon: '✿', className: 'rose-card' },
  { id: 'propose', no: '02', date: 'FEB 08', title: 'Court of Delulu', sub: 'The allegations are extremely romantic', icon: '⚖', className: 'propose-card' },
  { id: 'chocolate', no: '03', date: 'FEB 09', title: 'Mood Kitchen', sub: 'Cook a dangerously specific feeling', icon: '▦', className: 'chocolate-card' },
  { id: 'teddy', no: '04', date: 'FEB 10', title: 'Soft Toy ER', sub: 'One teddy. Several emotional issues.', icon: '●', className: 'teddy-card' },
  { id: 'promise', no: '05', date: 'FEB 11', title: 'The Night Sky Dept.', sub: 'Put your promises where space can see', icon: '✦', className: 'promise-card' },
  { id: 'hug', no: '06', date: 'FEB 12', title: 'Warmth Chamber', sub: 'Clinical trial: can a screen hug back?', icon: '⌇', className: 'hug-card' },
  { id: 'kiss', no: '07', date: 'FEB 13', title: 'Censor Board After Dark', sub: 'A very serious film certification issue', icon: '◉', className: 'kiss-card' },
  { id: 'valentine', no: '08', date: 'FEB 14', title: 'The Final Broadcast', sub: 'Everything was leading here', icon: '♥', className: 'valentine-card' },
]

type Props = { data: ValentineData; onCreateOwn: () => void }

export default function RecipientWorld({ data, onCreateOwn }: Props) {
  const params = new URLSearchParams(window.location.search)
  const requestedDay = params.get('day')
  const previewDay = days.some((day) => day.id === requestedDay) ? requestedDay as DayId : null
  const storageKey = `heartline:${data.creatorName}:${data.recipientName}`
  const [intro, setIntro] = useState(params.has('skipIntro') ? 3 : 0)
  const [activeDay, setActiveDay] = useState<DayId | null>(previewDay)
  const [completed, setCompleted] = useState<Set<DayId>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem(storageKey) || '[]') as DayId[]) }
    catch { return new Set() }
  })
  const recipient = data.nickname || data.recipientName

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify([...completed]))
  }, [completed, storageKey])

  if (intro < 3) {
    return (
      <main className={`signal-intro intro-${intro}`} onClick={() => setIntro((value) => value + 1)}>
        <div className="signal-noise" />
        {intro === 0 && <div className="intro-frame"><span className="tiny-label">INCOMING PRIVATE SIGNAL</span><div className="tuning-circle"><i /><b>8:08</b></div><h1>Hey, {recipient}.</h1><p>Someone hijacked a tiny corner of the internet for you.</p><small>TAP ANYWHERE TO TUNE IN</small></div>}
        {intro === 1 && <div className="intro-frame second"><span className="giant-quote">“</span><h1>This is not<br />a normal link.</h1><p>It has eight frequencies, questionable emotional stability, and your name all over it.</p><small>OKAY, CONTINUE →</small></div>}
        {intro === 2 && <div className="intro-frame third"><div className="from-stamp">FROM<br /><strong>{data.creatorName}</strong></div><h1>Headphones on.<br /><em>Guard down.</em></h1><p>Heartline 8:08 is now broadcasting exclusively to one main character.</p><button>ENTER THE AIRWAVES ↗</button></div>}
      </main>
    )
  }

  return (
    <main className={`recipient-world tone-${data.tone}`}>
      <div className="world-noise" />
      <header className="world-nav">
        <div className="world-brand"><span>♥</span> HEARTLINE <b>8:08</b></div>
        <div className="signal-status"><i /> PRIVATE SIGNAL / FOR {data.recipientName.toUpperCase()}</div>
        <div className="completion-count">{String(completed.size).padStart(2, '0')} / 08 DISCOVERED</div>
      </header>

      <section className="world-hero">
        <p className="eyebrow">VALENTINE WEEK • PIRATE FREQUENCY</p>
        <h1>Eight reasons to<br /><em>stay on this frequency.</em></h1>
        <div className="dedication"><span>TRANSMITTED BY</span><strong>{data.creatorName}</strong><i>for</i><strong>{recipient}</strong></div>
        <p className="hero-note">Pick a frequency. Har room ka apna scene hai.<br />Order optional; curiosity compulsory.</p>
      </section>

      <section className="days-grid">
        {days.map((day) => (
          <button key={day.id} onClick={() => setActiveDay(day.id)} className={`day-card ${day.className} ${completed.has(day.id) ? 'completed' : ''}`}>
            <div className="card-meta"><span>{day.no} / 08</span><span>{day.date}</span></div>
            <div className="day-icon">{day.icon}</div>
            <div className="day-copy"><small>{completed.has(day.id) ? '✓ FREQUENCY FOUND' : 'TUNE IN'}</small><h2>{day.title}</h2><p>{day.sub}</p></div>
            <span className="card-arrow">↗</span>
          </button>
        ))}
      </section>

      <footer className="world-footer"><p>Broadcasting feelings at an unnecessarily high production value.</p><button onClick={onCreateOwn}>Make one for your person →</button></footer>

      {activeDay && <DailyExperience key={activeDay} day={activeDay} data={data} onExit={() => setActiveDay(null)} onComplete={() => { setCompleted((current) => new Set(current).add(activeDay)); setActiveDay(null) }} />}
    </main>
  )
}
