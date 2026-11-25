export type Tone = 'chaotic' | 'soft' | 'filmy'

export type ValentineData = {
  creatorName: string
  recipientName: string
  nickname: string
  memory: string
  message: string
  promise: string
  song: string
  tone: Tone
}

export const defaultData: ValentineData = {
  creatorName: 'Kabir',
  recipientName: 'Aashi',
  nickname: 'sunshine',
  memory: 'Woh chai wali evening, jab 20 minute ki coffee 3 ghante chali thi.',
  message: 'Tumhare saath normal days bhi highlight reel jaise lagte hain.',
  promise: 'Main tumhare fries bina pooche nahi khaunga. Mostly.',
  song: 'our very dramatic background score',
  tone: 'chaotic',
}
