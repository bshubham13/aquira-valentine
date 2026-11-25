import type { ValentineData } from './types'

export function encodePayload(data: ValentineData) {
  const bytes = new TextEncoder().encode(JSON.stringify(data))
  let binary = ''
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodePayload(value: string): ValentineData | null {
  try {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((value.length + 3) % 4)
    const binary = atob(padded)
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    return JSON.parse(new TextDecoder().decode(bytes)) as ValentineData
  } catch {
    return null
  }
}

export const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')
