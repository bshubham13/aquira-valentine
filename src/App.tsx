import { useEffect, useState } from 'react'
import './App.css'
import CreatorFlow from './components/CreatorFlow'
import RecipientWorld from './components/RecipientWorld'
import { decodePayload } from './lib'
import type { ValentineData } from './types'

function readSharedExperience() {
  const match = window.location.hash.match(/^#love=(.+)$/)
  return match ? decodePayload(match[1]) : null
}

function App() {
  const [sharedData, setSharedData] = useState<ValentineData | null>(() => readSharedExperience())

  useEffect(() => {
    const onHash = () => setSharedData(readSharedExperience())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return sharedData ? (
    <RecipientWorld data={sharedData} onCreateOwn={() => { window.location.hash = ''; setSharedData(null) }} />
  ) : <CreatorFlow />
}

export default App
