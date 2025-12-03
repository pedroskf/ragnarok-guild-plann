export interface PresencaData {
  user_id: string
  char: string
  nome: string
  classe: string
  nivel: number
  data: string
}

export interface Member extends PresencaData {
  id: string
  eventType: 'woe' | 'te'
}

export interface Group {
  id: number
  name: string
  members: Member[]
}

export type EventType = 'woe' | 'te'

export const WOE_CLASSES = [
  'Rune Knight',
  'Royal Guard',
  'Warlock',
  'Sorcerer',
  'Ranger',
  'Mechanic',
  'Guillotine Cross',
  'Shadow Chaser',
  'Arch Bishop',
  'Sura',
  'Genetic',
  'Minstrel',
  'Wanderer',
  'Kagerou',
  'Oboro'
] as const

export const TE_CLASSES = [
  'Lord Knight',
  'Paladin',
  'High Wizard',
  'Professor',
  'Sniper',
  'Clown',
  'Gypsy',
  'Assassin Cross',
  'Stalker',
  'High Priest',
  'Champion',
  'Biochemist',
  'Soul Linker'
] as const

export type WoeClass = typeof WOE_CLASSES[number]
export type TeClass = typeof TE_CLASSES[number]
export type CharClass = WoeClass | TeClass
