import type { NftItem, NftTraits, PaletteKey } from '../types/nft';
import { ONCHAIN_MANIFEST } from './onchainManifest';

const BACKDROP_BY_ID: ReadonlyArray<readonly [string, PaletteKey]> = [
  ['Vibrant Rose', 'coral'], // #001
  ['Tangerine Orange', 'yellow'], // #002
  ['Charcoal Slate', 'sky'], // #003
  ['Obsidian Black', 'sky'], // #004
  ['Steel Grey', 'sky'], // #005
  ['Sage Mint', 'mint'], // #006
  ['Tangerine Orange', 'yellow'], // #007
  ['Cobalt Sky', 'sky'], // #008
  ['Teal Lagoon', 'mint'], // #009
  ['Teal Lagoon', 'mint'], // #010
  ['Sage Mint', 'mint'], // #011
  ['Blush Pink', 'coral'], // #012
  ['Blush Pink', 'coral'], // #013
  ['Blush Pink', 'coral'], // #014
  ['Tangerine Orange', 'yellow'], // #015
  ['Tangerine Orange', 'yellow'], // #016
  ['Sage Mint', 'mint'], // #017
  ['Crimson Red', 'coral'], // #018
  ['Violet Dusk', 'sky'], // #019
  ['Terracotta Amber', 'yellow'], // #020
  ['Terracotta Amber', 'yellow'], // #021
  ['Violet Dusk', 'sky'], // #022
  ['Studio Tone', 'coral'], // #023
  ['Cobalt Sky', 'sky'], // #024
  ['Terracotta Amber', 'yellow'], // #025
  ['Sage Mint', 'mint'], // #026
  ['Violet Dusk', 'sky'], // #027
  ['Mustard Gold', 'yellow'], // #028
  ['Violet Dusk', 'sky'], // #029
  ['Tangerine Orange', 'yellow'], // #030
  ['Teal Lagoon', 'mint'], // #031
  ['Cobalt Sky', 'sky'], // #032
  ['Sage Mint', 'mint'], // #033
  ['Sage Mint', 'mint'], // #034
  ['Violet Dusk', 'sky'], // #035
  ['Violet Dusk', 'sky'], // #036
  ['Tangerine Orange', 'yellow'], // #037
  ['Crimson Red', 'coral'], // #038
  ['Violet Dusk', 'sky'], // #039
  ['Violet Dusk', 'sky'], // #040
  ['Crimson Red', 'coral'], // #041
  ['Tangerine Orange', 'yellow'], // #042
  ['Crimson Red', 'coral'], // #043
  ['Tangerine Orange', 'yellow'], // #044
  ['Tangerine Orange', 'yellow'], // #045
  ['Mustard Gold', 'yellow'], // #046
  ['Violet Dusk', 'sky'], // #047
  ['Cobalt Sky', 'sky'], // #048
  ['Terracotta Amber', 'yellow'], // #049
  ['Violet Dusk', 'sky'], // #050
  ['Studio Tone', 'coral'], // #051
  ['Violet Dusk', 'sky'], // #052
  ['Teal Lagoon', 'mint'], // #053
  ['Tangerine Orange', 'yellow'], // #054
  ['Cobalt Sky', 'sky'], // #055
  ['Studio Tone', 'coral'], // #056
  ['Cobalt Sky', 'sky'], // #057
  ['Studio Tone', 'coral'], // #058
  ['Cobalt Sky', 'sky'], // #059
  ['Crimson Red', 'coral'], // #060
  ['Sage Mint', 'mint'], // #061
  ['Violet Dusk', 'sky'], // #062
  ['Studio Tone', 'coral'], // #063
  ['Cobalt Sky', 'sky'], // #064
  ['Sage Mint', 'mint'], // #065
  ['Vibrant Rose', 'coral'], // #066
  ['Teal Lagoon', 'mint'], // #067
  ['Sage Mint', 'mint'], // #068
  ['Blush Pink', 'coral'], // #069
  ['Cobalt Sky', 'sky'], // #070
  ['Crimson Red', 'coral'], // #071
  ['Blush Pink', 'coral'], // #072
  ['Cobalt Sky', 'sky'], // #073
  ['Cobalt Sky', 'sky'], // #074
  ['Sage Mint', 'mint'], // #075
  ['Crimson Red', 'coral'], // #076
  ['Studio Tone', 'coral'], // #077
  ['Violet Dusk', 'sky'], // #078
  ['Mustard Gold', 'yellow'], // #079
  ['Crimson Red', 'coral'], // #080
  ['Studio Tone', 'coral'], // #081
  ['Tangerine Orange', 'yellow'], // #082
  ['Sage Mint', 'mint'], // #083
  ['Crimson Red', 'coral'], // #084
  ['Sage Mint', 'mint'], // #085
  ['Cobalt Sky', 'sky'], // #086
  ['Studio Tone', 'coral'], // #087
  ['Violet Dusk', 'sky'], // #088
  ['Tangerine Orange', 'yellow'], // #089
  ['Sage Mint', 'mint'], // #090
  ['Cobalt Sky', 'sky'], // #091
  ['Cobalt Sky', 'sky'], // #092
  ['Studio Tone', 'coral'], // #093
  ['Crimson Red', 'coral'], // #094
  ['Sage Mint', 'mint'], // #095
  ['Cobalt Sky', 'sky'], // #096
  ['Cobalt Sky', 'sky'], // #097
  ['Silver Mist', 'sky'], // #098
  ['Charcoal Slate', 'sky'], // #099
  ['Crimson Red', 'coral'], // #100
];

const COATS = [
  'Classic Grey Tabby',
  'Warm Ash Tabby',
  'Silver Stripe Tabby',
  'Charcoal Tabby',
  'Cream Belly Tabby',
  'Slate Stripe Tabby',
] as const;

const EYEWEAR = [
  'Emerald Eyes',
  'Dark Shades',
  'Cyber Optic',
  'Ruby Gaze',
  'Round Glasses',
  'Laser Visor',
  'Gold Monocle',
  'Amber Eyes',
] as const;

const HEADWEAR = [
  'None',
  'Knit Beanie',
  'Fedora Hat',
  'Shinobi Headband',
  'Snapback Cap',
  'Nemes Crown',
  'Spiked Hair',
  'Bucket Hat',
  'Viking Helm',
  'Pilot Cap',
] as const;

const OUTFITS = [
  'Pink Hoodie',
  'Swan Graphic Tee',
  'Shadow Ninja Gi',
  'White Tuxedo',
  'Lionheart Armor',
  'Amber Scarf',
  'Punk Leather Jacket',
  'Pharaoh Regalia',
  'Street Varsity',
  'Cyber Trench',
  'Denim Vest',
  'Royal Cape',
] as const;

const TITLES_BY_ID: ReadonlyArray<string> = [
  'Bongo Catsy', // #001
  'Bongo Swan', // #002
  'Shadow Shinobi', // #003
  'Tuxedo Don', // #004
  'Lionheart Knight', // #005
  'Quilibrium Initiate', // #006
  'Sailor Deckhand', // #007
  'Clout Bandana', // #008
  'Outlaw Cowboy', // #009
  'Teal Noir', // #010
  'Shady Fedora', // #011
  'Blossom Crown', // #012
  'Festival Shades', // #013
  'Flower Sage', // #014
  'Quil Hippie', // #015
  'Crimson Bandana', // #016
  'Pipe Gentleman', // #017
  'Cigar Boss', // #018
  'Fanged Believer', // #019
  'Midnight Vampire', // #020
  'Hooded Smokes', // #021
  'Little Imp', // #022
  'Pure Halo', // #023
  'Crimson Cyborg', // #024
  'Amber Cyber', // #025
  'Fallen Saint', // #026
  'Blonde Surfer', // #027
  'Arctic Puffer', // #028
  'Winter Cigar', // #029
  'Count Dracula', // #030
  'Dockworker Beanie', // #031
  'Sunset Elder', // #032
  'Citrus Nomad', // #033
  'Quil Piper', // #034
  'Bang Red Piper', // #035
  'Bang Violet', // #036
  'Bang Suit', // #037
  'Bionic Piper', // #038
  'Blonde Pompadour', // #039
  'Golden Tycoon', // #040
  'Amethyst Shades', // #041
  'Sunny Groove', // #042
  'Goofy Chains', // #043
  'Delay Saint', // #044
  'QM Grump', // #045
  'Bubblegum Cap', // #046
  'Violet Elder', // #047
  'Cobalt Nomad', // #048
  'Bang Red Quil', // #049
  'Bang Cobalt', // #050
  'Sailor Mint', // #051
  'Dusk Fedora', // #052
  'Unicorn Acolyte', // #053
  'Bongo Piper', // #054
  'Neon Netrunner', // #055
  'Mafia Pinstripe', // #056
  'Alpine Skier', // #057
  'Crimson Samurai', // #058
  'Orbital Astronaut', // #059
  'Biker Rebel', // #060
  'Tactical Commando', // #061
  'Beatmaker Hoodie', // #062
  'Trench Detective', // #063
  'Rainy Day', // #064
  'Minimalist Turtleneck', // #065
  'Retro Synthwave', // #066
  'Varsity Jock', // #067
  'Ace Aviator', // #068
  'Master Chef', // #069
  'Mecha Sentinel', // #070
  'Lumberjack Flannel', // #071
  'Pastel Streamer', // #072
  'Arcane Mage', // #073
  'Aloha Vacation', // #074
  'Terminal Hacker', // #075
  'Quil Racer', // #076
  'Quil Hypebeast', // #077
  'Arcade Gamer', // #078
  'Frontier Sheriff', // #079
  'Exo Trooper', // #080
  'Gothic Vampire', // #081
  'Hoopstar MVP', // #082
  'Casino Dealer', // #083
  'Quil Heavy Mech', // #084
  'Graffiti Artist', // #085
  'Cyber Corsair', // #086
  'Rogue Eyepatch', // #087
  'Frost Viking', // #088
  'Golden Pharaoh', // #089
  'Stitch Zombie', // #090
  'Seraph Angel', // #091
  'Prism Unicorn', // #092
  'Roman Centurion', // #093
  'Infernal Demon', // #094
  'Quil Scientist', // #095
  'Beach Tourist', // #096
  'Sovereign King', // #097
  'Spectral Phantom', // #098
  'Crimson Assassin', // #099
  'Punk Rockstar', // #100
];

const CURATED_TRAITS: Record<number, Partial<NftTraits>> = {
  1: {
    coat: 'Classic Grey Tabby',
    eyewear: 'Emerald Eyes',
    headwear: 'Knit Beanie',
    outfit: 'Pink Hoodie',
  },
  2: {
    coat: 'Warm Ash Tabby',
    eyewear: 'Emerald Eyes',
    headwear: 'None',
    outfit: 'Swan Graphic Tee',
  },
  3: {
    coat: 'Classic Grey Tabby',
    eyewear: 'Emerald Eyes',
    headwear: 'Shinobi Headband',
    outfit: 'Shadow Ninja Gi',
  },
  4: {
    coat: 'Classic Grey Tabby',
    eyewear: 'Emerald Eyes',
    headwear: 'None',
    outfit: 'White Tuxedo',
  },
  5: {
    coat: 'Classic Grey Tabby',
    eyewear: 'Emerald Eyes',
    headwear: 'None',
    outfit: 'Lionheart Armor',
  },
  10: {
    coat: 'Warm Ash Tabby',
    eyewear: 'Dark Shades',
    headwear: 'Fedora Hat',
    outfit: 'Classic Coat',
  },
  25: {
    coat: 'Warm Ash Tabby',
    eyewear: 'Cyber Optic',
    headwear: 'None',
    outfit: 'Amber Scarf',
  },
  50: {
    coat: 'Classic Grey Tabby',
    eyewear: 'Emerald Eyes',
    headwear: 'Snapback Cap',
    outfit: 'Classic Coat',
  },
  89: {
    coat: 'Classic Grey Tabby',
    eyewear: 'Emerald Eyes',
    headwear: 'Nemes Crown',
    outfit: 'Pharaoh Regalia',
  },
  100: {
    coat: 'Classic Grey Tabby',
    eyewear: 'Ruby Gaze',
    headwear: 'Spiked Hair',
    outfit: 'Punk Leather Jacket',
  },
};

function mixTraitIndex(id: number, salt: number, length: number): number {
  const mixed = (Math.imul(id ^ salt, 2654435761) >>> 0) + salt * 31;
  return mixed % length;
}

const seenSignatures = new Set<string>();

export const BONGO_COLLECTION: NftItem[] = ONCHAIN_MANIFEST.map((entry, index) => {
  const id = entry.id;
  const paddedId = String(id).padStart(3, '0');
  const isReserved = entry.isTeamReserved;

  const [backdrop, accent] = BACKDROP_BY_ID[index];
  const curated = CURATED_TRAITS[id];

  const coat = curated?.coat ?? COATS[mixTraitIndex(id, 43, COATS.length)];
  const eyewear = curated?.eyewear ?? EYEWEAR[mixTraitIndex(id, 79, EYEWEAR.length)];
  const headwear = curated?.headwear ?? HEADWEAR[mixTraitIndex(id, 113, HEADWEAR.length)];
  let outfit = curated?.outfit ?? OUTFITS[mixTraitIndex(id, 157, OUTFITS.length)];

  if (!curated) {
    let offset = 0;
    while (seenSignatures.has(`${backdrop}|${coat}|${eyewear}|${headwear}|${outfit}`) && offset < OUTFITS.length) {
      offset += 1;
      outfit = OUTFITS[(mixTraitIndex(id, 157, OUTFITS.length) + offset) % OUTFITS.length];
    }
  }
  seenSignatures.add(`${backdrop}|${coat}|${eyewear}|${headwear}|${outfit}`);

  const title = TITLES_BY_ID[index];

  return {
    id,
    paddedId,
    title,
    status: isReserved ? 'reserved' : 'public',
    priceQuil: isReserved ? null : entry.priceQuil,
    priceBaseUnits: entry.priceBaseUnits,
    symbol: 'BCAT',
    supply: `${id}/100`,
    domain: entry.domain,
    imageAddress: entry.imageAddress,
    imageFullAddress: entry.imageFullAddress,
    imageUrl: `/artworks/bcat-${paddedId}.webp`,
    traits: {
      backdrop,
      coat,
      eyewear,
      headwear,
      outfit,
      accent,
    },
  };
});
