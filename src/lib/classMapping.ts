import { CharClass } from './types'

export const CLASS_COLORS: Record<string, string> = {
  'Rune Knight': 'bg-red-600',
  'Royal Guard': 'bg-blue-600',
  'Warlock': 'bg-purple-600',
  'Sorcerer': 'bg-indigo-600',
  'Ranger': 'bg-green-600',
  'Mechanic': 'bg-yellow-600',
  'Guillotine Cross': 'bg-gray-700',
  'Shadow Chaser': 'bg-violet-600',
  'Arch Bishop': 'bg-yellow-400',
  'Sura': 'bg-orange-600',
  'Genetic': 'bg-lime-600',
  'Minstrel': 'bg-teal-600',
  'Wanderer': 'bg-pink-600',
  'Kagerou': 'bg-red-800',
  'Oboro': 'bg-blue-800',
  'Lord Knight': 'bg-red-700',
  'Paladin': 'bg-blue-700',
  'High Wizard': 'bg-purple-700',
  'Professor': 'bg-indigo-700',
  'Sniper': 'bg-green-700',
  'Clown': 'bg-teal-700',
  'Gypsy': 'bg-pink-700',
  'Assassin Cross': 'bg-gray-800',
  'Stalker': 'bg-violet-700',
  'High Priest': 'bg-yellow-500',
  'Champion': 'bg-orange-700',
  'Biochemist': 'bg-lime-700',
  'Soul Linker': 'bg-cyan-600'
}

export const CLASS_ABBREVIATIONS: Record<string, string> = {
  'Rune Knight': 'RK',
  'Royal Guard': 'RG',
  'Warlock': 'WL',
  'Sorcerer': 'SORC',
  'Ranger': 'RNG',
  'Mechanic': 'MECH',
  'Guillotine Cross': 'GX',
  'Shadow Chaser': 'SC',
  'Arch Bishop': 'AB',
  'Sura': 'SUR',
  'Genetic': 'GEN',
  'Minstrel': 'MINS',
  'Wanderer': 'WAND',
  'Kagerou': 'KG',
  'Oboro': 'OB',
  'Lord Knight': 'LK',
  'Paladin': 'PAL',
  'High Wizard': 'HW',
  'Professor': 'PROF',
  'Sniper': 'SNP',
  'Clown': 'CLW',
  'Gypsy': 'GYP',
  'Assassin Cross': 'SIN',
  'Stalker': 'STK',
  'High Priest': 'HP',
  'Champion': 'CHAMP',
  'Biochemist': 'BIO',
  'Soul Linker': 'SL'
}

export function getClassColor(className: string): string {
  return CLASS_COLORS[className] || 'bg-gray-600'
}

export function getClassAbbr(className: string): string {
  return CLASS_ABBREVIATIONS[className] || className.substring(0, 3).toUpperCase()
}
