import { Player } from '../api/players'

export type SymbolName = 'ANCHOR' | 'APPLE' | 'BABY_BOTTLE' | 'BOMB' | 'CACTUS' | 'CANDLE' | 'TAXI_CAR' | 'CARROT' | 'CHESS_KNIGHT' |
                  'CLOCK' | 'CLOWN' | 'DIASY_FLOWER' | 'DINOSAUR' | 'DOLPHIN' | 'DRAGON' | 'EXCLAMATION_MARK' | 'EYE' | 'FIRE' |
                  'FOUR_LEAF_CLOVER' | 'GHOST' | 'GREEN_SPLATS' | 'HAMMER' | 'HEART' | 'ICE_CUBE' | 'IGLOO' | 'KEY' | 'LADYBIRD' |
                  'LIGHT_BULB' | 'LIGHTNING_BOLT' | 'LOCK' | 'MAPLE_LEAF' | 'MOON' | 'NO_ENTRY_SIGN' | 'ORANGE_SCARECROW_MAN' |
                  'PENCIL' | 'FLAMINGO' | 'CAT' | 'LIKE' | 'RED_LIPS' | 'SCISSORS' | 'SKULL_AND_CROSSBONES' |
                  'SNOWFLAKE' | 'SNOWMAN' | 'SPIDER' | 'SPIDER_WEB' | 'SUN' | 'SUNGLASSES' | 'CROSSHAIR' | 'TORTOISE' | 'TREBLE_CLEF' |
                  'TREE' | 'WATER_DROP' | 'DOG' | 'YIN_AND_YANG' | 'ZEBRA' | 'QUESTION_MARK' | 'CHEESE'



export enum GameTableStatus {
  Joining = "JOINING",
  Waiting = "WAITING",
  Countdown = "COUNTDOWN",
  Processing = "PROCESSING",
}

export type Card = SymbolName[]

export type StyledCard = {
  symbols: SymbolName[];
  rotation: number;
  symbolScales: string[];
}

export type CardSymbolData = {
  name: string;
  icon: string;
}

export type CardsByPlayerId = {
  [id: string]: {
    card: Card;
    howManyCardsLeft: number;
  };
}

export type WinGame = {
  timestamp: string;
  durationOfGame: string;
}

export type Message = {
  _id: string;
  sender: Player;
  content: string;
}

export interface MappedGameRound {
  id: string;
  tableId: string;
  isGameRoundInProcess: boolean;
  spotterId: string;
  centerCard: Card;
  experienceForSpotter: number;
  cardsByPlayerId: CardsByPlayerId;
  players: Player[];
}

export type RoomData = {
  name: string;
  maxPlayers: 2 | 3 | 4 | 5 | 6 | 7 | 8;
  players: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  isPrivateRoom: boolean;
}

export type TableChangeData = {
  gameStatus: GameTableStatus;
  roundStartCountdown: 0 | 1 | 2 | 3;
  players: Player[];
}

export enum NotificationType { SUCCESS, ERROR, INFO }
export type NotificationProps = {
  type: NotificationType;
  text: string;
}

export interface PaginatedData<T> {
  data: T[];
  chunkNumber: number;
  howManyChunks: number;
}

export type ResponseError = {
  message: string;
  status: string;
  statusCode: 400 | 401 | 404 | 409 | 500;
}
