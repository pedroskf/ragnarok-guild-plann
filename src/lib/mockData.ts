import { PresencaData } from './types'

export const MOCK_WOE_DATA: PresencaData[] = []

export const MOCK_TE_DATA: PresencaData[] = []

/*
// Dados de teste removidos - use Importar Dados ou Adicionar Membro
export const MOCK_WOE_DATA_OLD: PresencaData[] = [
  {
    user_id: '96717004202844160',
    char: 'analmad',
    nome: 'kr1s',
    classe: 'Sorcerer',
    nivel: 175,
    data: '2025-12-02T19:44:32.153782'
  },
  {
    user_id: '12345678901234567',
    char: 'KnightSlayer',
    nome: 'Pedro',
    classe: 'Rune Knight',
    nivel: 175,
    data: '2025-12-02T20:15:00.000000'
  },
  {
    user_id: '23456789012345678',
    char: 'HolyShield',
    nome: 'Maria',
    classe: 'Royal Guard',
    nivel: 175,
    data: '2025-12-02T20:20:00.000000'
  },
  {
    user_id: '34567890123456789',
    char: 'DarkMagic',
    nome: 'João',
    classe: 'Warlock',
    nivel: 175,
    data: '2025-12-02T20:25:00.000000'
  },
  {
    user_id: '45678901234567890',
    char: 'ShadowStrike',
    nome: 'Ana',
    classe: 'Guillotine Cross',
    nivel: 175,
    data: '2025-12-02T20:30:00.000000'
  },
  {
    user_id: '56789012345678901',
    char: 'DivinePrayer',
    nome: 'Carlos',
    classe: 'Arch Bishop',
    nivel: 175,
    data: '2025-12-02T20:35:00.000000'
  },
  {
    user_id: '67890123456789012',
    char: 'RangerElite',
    nome: 'Lucia',
    classe: 'Ranger',
    nivel: 175,
    data: '2025-12-02T20:40:00.000000'
  },
  {
    user_id: '78901234567890123',
    char: 'MechWarrior',
    nome: 'Rafael',
    classe: 'Mechanic',
    nivel: 175,
    data: '2025-12-02T20:45:00.000000'
  },
  {
    user_id: '89012345678901234',
    char: 'ShadowThief',
    nome: 'Beatriz',
    classe: 'Shadow Chaser',
    nivel: 175,
    data: '2025-12-02T20:50:00.000000'
  },
  {
    user_id: '90123456789012345',
    char: 'MonkFist',
    nome: 'Diego',
    classe: 'Sura',
    nivel: 175,
    data: '2025-12-02T20:55:00.000000'
  },
  {
    user_id: '01234567890123456',
    char: 'PotionMaster',
    nome: 'Fernanda',
    classe: 'Genetic',
    nivel: 175,
    data: '2025-12-02T21:00:00.000000'
  },
  {
    user_id: '11234567890123456',
    char: 'SongBard',
    nome: 'Thiago',
    classe: 'Minstrel',
    nivel: 175,
    data: '2025-12-02T21:05:00.000000'
  },
  {
    user_id: '21234567890123457',
    char: 'DanceDiva',
    nome: 'Camila',
    classe: 'Wanderer',
    nivel: 175,
    data: '2025-12-02T21:10:00.000000'
  },
  {
    user_id: '31234567890123458',
    char: 'MeowMeow',
    nome: 'Ricardo',
    classe: 'Doram',
    nivel: 175,
    data: '2025-12-02T21:15:00.000000'
  },
  {
    user_id: '41234567890123459',
    char: 'FireSword',
    nome: 'Lucas',
    classe: 'Rune Knight',
    nivel: 175,
    data: '2025-12-02T21:20:00.000000'
  },
  {
    user_id: '51234567890123460',
    char: 'IceShield',
    nome: 'Patricia',
    classe: 'Royal Guard',
    nivel: 175,
    data: '2025-12-02T21:25:00.000000'
  },
  {
    user_id: '61234567890123461',
    char: 'ThunderMage',
    nome: 'Vinicius',
    classe: 'Warlock',
    nivel: 175,
    data: '2025-12-02T21:30:00.000000'
  },
  {
    user_id: '71234567890123462',
    char: 'ElementalSage',
    nome: 'Juliana',
    classe: 'Sorcerer',
    nivel: 175,
    data: '2025-12-02T21:35:00.000000'
  },
  {
    user_id: '81234567890123463',
    char: 'PoisonBlade',
    nome: 'Marcelo',
    classe: 'Guillotine Cross',
    nivel: 175,
    data: '2025-12-02T21:40:00.000000'
  },
  {
    user_id: '91234567890123464',
    char: 'HolyLight',
    nome: 'Priscila',
    classe: 'Arch Bishop',
    nivel: 175,
    data: '2025-12-02T21:45:00.000000'
  },
  {
    user_id: '10234567890123465',
    char: 'SwiftArrow',
    nome: 'Andre',
    classe: 'Ranger',
    nivel: 175,
    data: '2025-12-02T21:50:00.000000'
  },
  {
    user_id: '11334567890123466',
    char: 'RobotArmy',
    nome: 'Fabiana',
    classe: 'Mechanic',
    nivel: 175,
    data: '2025-12-02T21:55:00.000000'
  },
  {
    user_id: '12434567890123467',
    char: 'StealthRogue',
    nome: 'Henrique',
    classe: 'Shadow Chaser',
    nivel: 175,
    data: '2025-12-02T22:00:00.000000'
  },
  {
    user_id: '13534567890123468',
    char: 'IronFist',
    nome: 'Monica',
    classe: 'Sura',
    nivel: 175,
    data: '2025-12-02T22:05:00.000000'
  }
]

export const MOCK_TE_DATA: PresencaData[] = [
  {
    user_id: '51234567890123460',
    char: 'OldKnight',
    nome: 'Marcos',
    classe: 'Lord Knight',
    nivel: 99,
    data: '2025-12-02T21:25:00.000000'
  },
  {
    user_id: '61234567890123461',
    char: 'HolyDefender',
    nome: 'Julia',
    classe: 'Paladin',
    nivel: 99,
    data: '2025-12-02T21:30:00.000000'
  },
  {
    user_id: '71234567890123462',
    char: 'ArcaneWizard',
    nome: 'Gabriel',
    classe: 'High Wizard',
    nivel: 99,
    data: '2025-12-02T21:35:00.000000'
  },
  {
    user_id: '81234567890123463',
    char: 'ScholarMage',
    nome: 'Amanda',
    classe: 'Professor',
    nivel: 99,
    data: '2025-12-02T21:40:00.000000'
  },
  {
    user_id: '91234567890123464',
    char: 'DeadlyArrow',
    nome: 'Felipe',
    classe: 'Sniper',
    nivel: 99,
    data: '2025-12-02T21:45:00.000000'
  },
  {
    user_id: '02234567890123465',
    char: 'BardSong',
    nome: 'Laura',
    classe: 'Clown',
    nivel: 99,
    data: '2025-12-02T21:50:00.000000'
  },
  {
    user_id: '12234567890123466',
    char: 'DancerGrace',
    nome: 'Bruno',
    classe: 'Gypsy',
    nivel: 99,
    data: '2025-12-02T21:55:00.000000'
  },
  {
    user_id: '22234567890123467',
    char: 'AssassinDark',
    nome: 'Isabela',
    classe: 'Assassin Cross',
    nivel: 99,
    data: '2025-12-02T22:00:00.000000'
  },
  {
    user_id: '32234567890123468',
    char: 'RogueStrike',
    nome: 'Gustavo',
    classe: 'Stalker',
    nivel: 99,
    data: '2025-12-02T22:05:00.000000'
  },
  {
    user_id: '42234567890123469',
    char: 'PriestHoly',
    nome: 'Renata',
    classe: 'High Priest',
    nivel: 99,
    data: '2025-12-02T22:10:00.000000'
  },
  {
    user_id: '52234567890123470',
    char: 'MonkPower',
    nome: 'Leonardo',
    classe: 'Champion',
    nivel: 99,
    data: '2025-12-02T22:15:00.000000'
  },
  {
    user_id: '62234567890123471',
    char: 'AlchemistBrew',
    nome: 'Carla',
    classe: 'Biochemist',
    nivel: 99,
    data: '2025-12-02T22:20:00.000000'
  },
  {
    user_id: '72234567890123472',
    char: 'SpiritLinker',
    nome: 'Rodrigo',
    classe: 'Soul Linker',
    nivel: 99,
    data: '2025-12-02T22:25:00.000000'
  },
  {
    user_id: '82234567890123473',
    char: 'BladeKnight',
    nome: 'Adriana',
    classe: 'Lord Knight',
    nivel: 99,
    data: '2025-12-02T22:30:00.000000'
  },
  {
    user_id: '92234567890123474',
    char: 'ShieldMaster',
    nome: 'Paulo',
    classe: 'Paladin',
    nivel: 99,
    data: '2025-12-02T22:35:00.000000'
  },
  {
    user_id: '03234567890123475',
    char: 'FrostWizard',
    nome: 'Vanessa',
    classe: 'High Wizard',
    nivel: 99,
    data: '2025-12-02T22:40:00.000000'
  },
  {
    user_id: '13234567890123476',
    char: 'BookMaster',
    nome: 'Roberto',
    classe: 'Professor',
    nivel: 99,
    data: '2025-12-02T22:45:00.000000'
  },
  {
    user_id: '23234567890123477',
    char: 'PrecisionShot',
    nome: 'Sandra',
    classe: 'Sniper',
    nivel: 99,
    data: '2025-12-02T22:50:00.000000'
  },
  {
    user_id: '33234567890123478',
    char: 'MelodyMaker',
    nome: 'Antonio',
    classe: 'Clown',
    nivel: 99,
    data: '2025-12-02T22:55:00.000000'
  },
  {
    user_id: '43234567890123479',
    char: 'RhythmDancer',
    nome: 'Daniela',
    classe: 'Gypsy',
    nivel: 99,
    data: '2025-12-02T23:00:00.000000'
  },
  {
    user_id: '53234567890123480',
    char: 'SilentKiller',
    nome: 'Sergio',
    classe: 'Assassin Cross',
    nivel: 99,
    data: '2025-12-02T23:05:00.000000'
  },
  {
    user_id: '63234567890123481',
    char: 'TricksterThief',
    nome: 'Natalia',
    classe: 'Stalker',
    nivel: 99,
    data: '2025-12-02T23:10:00.000000'
  },
  {
    user_id: '73234567890123482',
    char: 'BlessingPriest',
    nome: 'Eduardo',
    classe: 'High Priest',
    nivel: 99,
    data: '2025-12-02T23:15:00.000000'
  },
  {
    user_id: '83234567890123483',
    char: 'DragonFist',
    nome: 'Claudia',
    classe: 'Champion',
    nivel: 99,
    data: '2025-12-02T23:20:00.000000'
  }
]
*/
