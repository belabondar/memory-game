export interface IMemoryCard {
  item: string | undefined;
  active: boolean;
  onclick: Function;
}

export interface IApp {
  length: number;
}

export interface IStats {
  pairs: number;
  tries: number;
}
