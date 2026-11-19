export type MintStatus = 'public' | 'reserved';

export type MintFilter = 'all' | 'public' | 'reserved';

export type PaletteKey = 'coral' | 'mint' | 'yellow' | 'sky';

export interface NftTraits {
  backdrop: string;
  coat: string;
  eyewear: string;
  headwear: string;
  outfit: string;
  accent: PaletteKey;
}

export interface NftItem {
  id: number;
  paddedId: string;
  title: string;
  status: MintStatus;
  priceQuil: number | null;
  priceBaseUnits: string;
  symbol: 'BCAT';
  supply: string;
  domain: string;
  imageAddress: string;
  imageFullAddress: string;
  imageUrl: string;
  traits: NftTraits;
}

export interface CollectionCounts {
  all: number;
  public: number;
  reserved: number;
}
