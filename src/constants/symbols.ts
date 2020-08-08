import AnchorIcon from '../assets/symbols/anchor.svg'
import AppleIcon from '../assets/symbols/apple.svg'
import MilkIcon from '../assets/symbols/milk.svg'
import BombIcon from '../assets/symbols/bomb.svg'
import CactusIcon from '../assets/symbols/cactus.svg'
import CandleIcon from '../assets/symbols/candle.svg'
import TaxiCarIcon from '../assets/symbols/taxi.svg'
import CarrotIcon from '../assets/symbols/carrot.svg'
import KnightIcon from '../assets/symbols/knight.svg'
import ClockIcon from '../assets/symbols/clock.svg'
import ClownIcon from '../assets/symbols/clown.svg'
import FlowerIcon from '../assets/symbols/flower.svg'
import DinosaurIcon from '../assets/symbols/dinosaur.svg'
import DolphinIcon from '../assets/symbols/dolphin.svg'
import DragonIcon from '../assets/symbols/dragon.svg'
import ExclamationMarkIcon from '../assets/symbols/exclamationmark.svg'
import EyeIcon from '../assets/symbols/eye.svg'
import FireIcon from '../assets/symbols/fire.svg'
import CloverIcon from '../assets/symbols/clover.svg'
import GhostIcon from '../assets/symbols/ghosts.svg'
import GreenSplash from '../assets/symbols/splash.svg'
import HammerIcon from '../assets/symbols/hammer.svg'
import HeartIcon from '../assets/symbols/heart.svg'
import IceCubeIcon from '../assets/symbols/ice-cube.svg'
import IglooIcon from '../assets/symbols/igloo.svg'
import KeyIcon from '../assets/symbols/key.svg'
import LadyBirdIcon from '../assets/symbols/ladybug.svg'
import LightBulbIcon from '../assets/symbols/light-bulb.svg'
import LightBoltIcon from '../assets/symbols/thunder.svg'
import LockIcon from '../assets/symbols/lock.svg'
import MapleLeafIcon from '../assets/symbols/maple-leaf.svg'
import MoonIcon from '../assets/symbols/moon.svg'
import NoEntryIcon from '../assets/symbols/no-entry-sign.svg'
import ScareCrowIcon from '../assets/symbols/scarecrow.svg'
import PencilIcon from '../assets/symbols/pencil.svg'
import FlamingoIcon from '../assets/symbols/flamingo.svg'
import CatIcon from '../assets/symbols/cat.svg'
import LikeIcon from '../assets/symbols/like.svg'
import RedLipsIcon from '../assets/symbols/lips.svg'
import ScissorsIcon from '../assets/symbols/scissors.svg'
import SkullIcon from '../assets/symbols/skullandbones.svg'
import SnowflakeIcon from '../assets/symbols/snowflake.svg'
import SnowmanIcon from '../assets/symbols/snowman.svg'
import SpiderIcon from '../assets/symbols/spider.svg'
import SpiderWebIcon from '../assets/symbols/spider-web.svg'
import SunIcon from '../assets/symbols/sun.svg'
import SunglassesIcon from '../assets/symbols/glasses.svg'
import CrosshairIcon from '../assets/symbols/crosshair.svg'
import TortoiseIcon from '../assets/symbols/tortoise.svg'
import ClefIcon from '../assets/symbols/clef.svg'
import TreeIcon from '../assets/symbols/tree.svg'
import WaterDropIcon from '../assets/symbols/water.svg'
import DogIcon from '../assets/symbols/dog.svg'
import YinYangIcon from '../assets/symbols/yin-yang.svg'
import ZebraIcon from '../assets/symbols/zebra.svg'
import QuestionMarkIcon from '../assets/symbols/question.svg'
import CheeseIcon from '../assets/symbols/cheese.svg'
import {
  SymbolName,
  CardSymbolData,
} from '../types'


type CardSymbol = {
  [propName in SymbolName]: CardSymbolData
}


const CARD_SYMBOLS: CardSymbol = {
  'ANCHOR': {
    name: 'Anchor',
    icon: AnchorIcon,
  },
  'APPLE': {
    name: 'Apple',
    icon: AppleIcon,
  },
  'BABY_BOTTLE': {
    name: 'Baby bottle',
    icon: MilkIcon,
  },
  'BOMB': {
    name: 'Bomb',
    icon: BombIcon,
  },
  'CACTUS': {
    name: 'Cactus',
    icon: CactusIcon,
  },
  'CANDLE': {
    name: 'Candle',
    icon: CandleIcon,
  },
  'TAXI_CAR': {
    name: 'Taxi car',
    icon: TaxiCarIcon,
  },
  'CARROT': {
    name: 'Carrot',
    icon: CarrotIcon,
  },
  'CHESS_KNIGHT': {
    name: 'Chess knight',
    icon: KnightIcon,
  },
  'CLOCK': {
    name: 'Clock',
    icon: ClockIcon,
  },
  'CLOWN': {
    name: 'Clown',
    icon: ClownIcon,
  },
  'DIASY_FLOWER': {
    name: 'Diasy flower',
    icon: FlowerIcon,
  },
  'DINOSAUR': {
    name: 'Dinosaur',
    icon: DinosaurIcon,
  },
  'DOLPHIN': {
    name: 'Dolphin',
    icon: DolphinIcon,
  },
  'DRAGON': {
    name: 'Dragon',
    icon: DragonIcon,
  },
  'EXCLAMATION_MARK': {
    name: 'Exclamation mark',
    icon: ExclamationMarkIcon,
  },
  'EYE': {
    name: 'Eye',
    icon: EyeIcon,
  },
  'FIRE': {
    name: 'Fire',
    icon: FireIcon,
  },
  'FOUR_LEAF_CLOVER': {
    name: 'Four leaf clover',
    icon: CloverIcon,
  },
  'GHOST': {
    name: 'Ghost',
    icon: GhostIcon,
  },
  'GREEN_SPLATS': {
    name: 'Green splats',
    icon: GreenSplash,
  },
  'HAMMER': {
    name: 'Hammer',
    icon: HammerIcon,
  },
  'HEART': {
    name: 'Heart',
    icon: HeartIcon,
  },
  'ICE_CUBE': {
    name: 'Ice cube',
    icon: IceCubeIcon,
  },
  'IGLOO': {
    name: 'Igloo',
    icon: IglooIcon,
  },
  'KEY': {
    name: 'Key',
    icon: KeyIcon,
  },
  'LADYBIRD': {
    name: 'Ladybird',
    icon: LadyBirdIcon,
  },
  'LIGHT_BULB': {
    name: 'Light bulb',
    icon: LightBulbIcon,
  },
  'LIGHTNING_BOLT': {
    name: 'Lightning bolt',
    icon: LightBoltIcon,
  },
  'LOCK': {
    name: 'Lock',
    icon: LockIcon,
  },
  'MAPLE_LEAF': {
    name: 'Maple leaf',
    icon: MapleLeafIcon,
  },
  'MOON': {
    name: 'Moon',
    icon: MoonIcon,
  },
  'NO_ENTRY_SIGN': {
    name: 'No Entry sign',
    icon: NoEntryIcon,
  },
  'ORANGE_SCARECROW_MAN': {
    name: 'Orange scarecrow man',
    icon: ScareCrowIcon,
  },
  'PENCIL': {
    name: 'Pencil',
    icon: PencilIcon,
  },
  'FLAMINGO': {
    name: 'Flamingo',
    icon: FlamingoIcon,
  },
  'CAT': {
    name: 'Cat',
    icon: CatIcon,
  },
  'LIKE': {
    name: 'Like',
    icon: LikeIcon,
  },
  'RED_LIPS': {
    name: 'Red lips',
    icon: RedLipsIcon,
  },
  'SCISSORS': {
    name: 'Scissors',
    icon: ScissorsIcon,
  },
  'SKULL_AND_CROSSBONES': {
    name: 'Skull and crossbones',
    icon: SkullIcon,
  },
  'SNOWFLAKE': {
    name: 'Snowflake',
    icon: SnowflakeIcon,
  },
  'SNOWMAN': {
    name: 'Snowman',
    icon: SnowmanIcon,
  },
  'SPIDER': {
    name: 'Spider',
    icon: SpiderIcon,
  },
  'SPIDER_WEB': {
    name: "Spider’s web",
    icon: SpiderWebIcon,
  },
  'SUN': {
    name: 'Sun',
    icon: SunIcon,
  },
  'SUNGLASSES': {
    name: 'Sunglasses',
    icon: SunglassesIcon,
  },
  'CROSSHAIR': {
    name: 'Crosshair',
    icon: CrosshairIcon,
  },
  'TORTOISE': {
    name: 'Tortoise',
    icon: TortoiseIcon,
  },
  'TREBLE_CLEF': {
    name: 'Treble clef',
    icon: ClefIcon,
  },
  'TREE': {
    name: 'Tree',
    icon: TreeIcon,
  },
  'WATER_DROP': {
    name: 'Water drop',
    icon: WaterDropIcon,
  },
  'DOG': {
    name: 'Dog',
    icon: DogIcon,
  },
  'YIN_AND_YANG': {
    name: 'Yin and Yang',
    icon: YinYangIcon,
  },
  'ZEBRA': {
    name: 'Zebra',
    icon: ZebraIcon,
  },
  'QUESTION_MARK': {
    name: 'Question mark',
    icon: QuestionMarkIcon,
  },
  'CHEESE': {
    name: 'Cheese',
    icon: CheeseIcon,
  },
}

export default CARD_SYMBOLS
