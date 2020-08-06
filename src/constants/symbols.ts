import { CardSymbolData } from '../types'


type SymbolName = 'ANCHOR' | 'APPLE' | 'BABY_BOTTLE' | 'BOMB' | 'CACTUS' | 'CANDLE' | 'TAXI_CAR' | 'CARROT' | 'CHESS_KNIGHT' |
                  'CLOCK' | 'CLOWN' | 'DIASY_FLOWER' | 'DINOSAUR' | 'DOLPHIN' | 'DRAGON' | 'EXCLAMATION_MARK' | 'EYE' | 'FIRE' |
                  'FOUR_LEAF_CLOVER' | 'GHOST' | 'GREEN_SPLATS' | 'HAMMER' | 'HEART' | 'ICE_CUBE' | 'IGLOO' | 'KEY' | 'LADYBIRD' |
                  'LIGHT_BULB' | 'LIGHTNING_BOLT' | 'LOCK' | 'MAPLE_LEAF' | 'MOON' | 'NO_ENTRY_SIGN' | 'ORANGE_SCARECROW_MAN' |
                  'PENCIL' | 'PURPLE_BIRD' | 'PURPLE_CAT' | 'PURPLE_DOBBLE_HAND_MAN' | 'RED_LIPS' | 'SCISSORS' | 'SKULL_AND_CROSSBONES' |
                  'SNOWFLAKE' | 'SNOWMAN' | 'SPIDER' | 'SPIDER_WEB' | 'SUN' | 'SUNGLASSES' | 'CROSSHAIR' | 'TORTOISE' | 'TREBLE_CLEF' |
                  'TREE' | 'WATER_DRIP' | 'DOG' | 'YIN_AND_YANG' | 'ZEBRA' | 'QUESTION_MARK' | 'CHEESE'


type CardSymbol = {
  [propName in SymbolName]: CardSymbolData
}


const CARD_SYMBOLS: CardSymbol = {
  'ANCHOR': {
    name: 'Anchor',
  },
  'APPLE': {
    name: 'Apple',
  },
  'BABY_BOTTLE': {
    name: 'Baby bottle',
  },
  'BOMB': {
    name: 'Bomb',
  },
  'CACTUS': {
    name: 'Cactus',
  },
  'CANDLE': {
    name: 'Candle',
  },
  'TAXI_CAR': {
    name: 'Taxi car',
  },
  'CARROT': {
    name: 'Carrot',
  },
  'CHESS_KNIGHT': {
    name: 'Chess knight',
  },
  'CLOCK': {
    name: 'Clock',
  },
  'CLOWN': {
    name: 'Clown',
  },
  'DIASY_FLOWER': {
    name: 'Diasy flower'
  },
  'DINOSAUR': {
    name: 'Dinosaur',
  },
  'DOLPHIN': {
    name: 'Dolphin',
  },
  'DRAGON': {
    name: 'Dragon',
  },
  'EXCLAMATION_MARK': {
    name: 'Exclamation mark',
  },
  'EYE': {
    name: 'Eye',
  },
  'FIRE': {
    name: 'Fire',
  },
  'FOUR_LEAF_CLOVER': {
    name: 'Four leaf clover',
  },
  'GHOST': {
    name: 'Ghost',
  },
  'GREEN_SPLATS': {
    name: 'Green splats',
  },
  'HAMMER': {
    name: 'Hammer',
  },
  'HEART': {
    name: 'Heart',
  },
  'ICE_CUBE': {
    name: 'Ice cube',
  },
  'IGLOO': {
    name: 'Igloo',
  },
  'KEY': {
    name: 'Key',
  },
  'LADYBIRD': {
    name: 'Ladybird',
  },
  'LIGHT_BULB': {
    name: 'Light bulb',
  },
  'LIGHTNING_BOLT': {
    name: 'Lightning bolt',
  },
  'LOCK': {
    name: 'Lock',
  },
  'MAPLE_LEAF': {
    name: 'Maple leaf',
  },
  'MOON': {
    name: 'Moon',
  },
  'NO_ENTRY_SIGN': {
    name: 'No Entry sign',
  },
  'ORANGE_SCARECROW_MAN': {
    name: 'Orange scarecrow man',
  },
  'PENCIL': {
    name: 'Pencil',
  },
  'PURPLE_BIRD': {
    name: 'Purple bird',
  },
  'PURPLE_CAT': {
    name: 'Purple cat',
  },
  'PURPLE_DOBBLE_HAND_MAN': {
    name: 'Purple dobble hand man',
  },
  'RED_LIPS': {
    name: 'Red lips',
  },
  'SCISSORS': {
    name: 'Scissors',
  },
  'SKULL_AND_CROSSBONES': {
    name: 'Skull and crossbones',
  },
  'SNOWFLAKE': {
    name: 'Snowflake',
  },
  'SNOWMAN': {
    name: 'Snowman',
  },
  'SPIDER': {
    name: 'Spider',
  },
  'SPIDER_WEB': {
    name: "Spider’s web"
  },
  'SUN': {
    name: 'Sun',
  },
  'SUNGLASSES': {
    name: 'Sunglasses',
  },
  'CROSSHAIR': {
    name: 'Crosshair',
  },
  'TORTOISE': {
    name: 'Tortoise',
  },
  'TREBLE_CLEF': {
    name: 'Treble clef',
  },
  'TREE': {
    name: 'Tree',
  },
  'WATER_DRIP': {
    name: 'Water drip',
  },
  'DOG': {
    name: 'Dog',
  },
  'YIN_AND_YANG': {
    name: 'Yin and Yang',
  },
  'ZEBRA': {
    name: 'Zebra',
  },
  'QUESTION_MARK': {
    name: 'Question mark',
  },
  'CHEESE': {
    name: 'Cheese',
  },
}

export default CARD_SYMBOLS
