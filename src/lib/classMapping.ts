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
  'Doram': 'bg-cyan-600',
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
  'Soul Linker': 'bg-cyan-600',
  'Coringa': 'bg-purple-500'
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
  'Doram': 'DORAM',
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
  'Soul Linker': 'SL',
  'Coringa': 'COR'
}

export const CLASS_ICONS: Record<string, string> = {
  // WOE 3rd Classes
  'Rune Knight': '/src/WOE_3RD/Cavaleiros_Rúnicospartyicn.png',
  'Royal Guard': '/src/WOE_3RD/Guardiões_Reaispartyicn.png',
  'Warlock': '/src/WOE_3RD/Arcanospartyicn.png',
  'Sorcerer': '/src/WOE_3RD/Feiticeirospartyicn.png',
  'Ranger': '/src/WOE_3RD/Sentinelaspartyicn.png',
  'Mechanic': '/src/WOE_3RD/Mecânicospartyicn.png',
  'Guillotine Cross': '/src/WOE_3RD/Sicáriospartyicn.png',
  'Shadow Chaser': '/src/WOE_3RD/Renegadospartyicn.png',
  'Arch Bishop': '/src/WOE_3RD/Arcebispospartyicn.png',
  'Sura': '/src/WOE_3RD/Shuraspartyicn.png',
  'Genetic': '/src/WOE_3RD/Bioquímicospartyicn.png',
  'Minstrel': '/src/WOE_3RD/Trovadorespartyicn.png',
  'Wanderer': '/src/WOE_3RD/Musaspartyicn.png',
  'Doram': '/src/WOE_3RD/Dorampartyicn.png',
  'Soul Linker': '/src/TE/Espiritualistaspartyicn.png',
  // WOE TE Classes
  'Lord Knight': '/src/TE/Lordespartyicn.png',
  'Paladin': '/src/TE/Paladinospartyicn.png',
  'High Wizard': '/src/TE/Arquimagospartyicn.png',
  'Professor': '/src/TE/Professorespartyicn.png',
  'Sniper': '/src/TE/Atiradores_de_Elitepartyicn.png',
  'Clown': '/src/TE/Menestréispartyicn.png',
  'Gypsy': '/src/TE/Ciganaspartyicn.png',
  'Assassin Cross': '/src/TE/Algozespartyicn.png',
  'Stalker': '/src/TE/Desordeirospartyicn.png',
  'High Priest': '/src/TE/Sumo_Sacerdotespartyicn.png',
  'Champion': '/src/TE/Mestrespartyicn.png',
  'Biochemist': '/src/TE/Criadorespartyicn.png',
  'Soul Linker': '/src/TE/Espiritualistaspartyicn.png',
  'Coringa': '/src/WOE_3RD/coringa.png'
}

export function getClassColor(className: string): string {
  return CLASS_COLORS[className] || 'bg-gray-600'
}

export function getClassAbbr(className: string): string {
  return CLASS_ABBREVIATIONS[className] || className.substring(0, 3).toUpperCase()
}

export function getClassIcon(className: string): string | null {
  return CLASS_ICONS[className] || null
}
