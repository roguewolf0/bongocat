import { PUBLIC_PAYEE_HEX } from '../data/onchainManifest';
import type { CollectionCounts, MintFilter, NftItem } from '../types/nft';

export function getCollectionCounts(items: readonly NftItem[]): CollectionCounts {
  let publicCount = 0;
  let reservedCount = 0;

  for (const item of items) {
    if (item.status === 'public') {
      publicCount += 1;
    } else {
      reservedCount += 1;
    }
  }

  return {
    all: items.length,
    public: publicCount,
    reserved: reservedCount,
  };
}

export function filterCollection(
  items: readonly NftItem[],
  filter: MintFilter,
  query: string
): NftItem[] {
  const normalizedQuery = query.trim().toLowerCase().replace(/^#/, '');

  return items.filter((item) => {
    if (filter === 'public' && item.status !== 'public') {
      return false;
    }
    if (filter === 'reserved' && item.status !== 'reserved') {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    if (/^\d+$/.test(normalizedQuery)) {
      return (
        item.paddedId.includes(normalizedQuery) ||
        String(item.id) === String(Number(normalizedQuery))
      );
    }

    return (
      item.paddedId.includes(normalizedQuery) ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.domain.toLowerCase().includes(normalizedQuery) ||
      item.imageAddress.toLowerCase().includes(normalizedQuery) ||
      item.traits.outfit.toLowerCase().includes(normalizedQuery) ||
      item.traits.headwear.toLowerCase().includes(normalizedQuery) ||
      item.traits.backdrop.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function formatShortAddress(address: string): string {
  if (address.length <= 16) {
    return address;
  }
  return `${address.slice(0, 10)}...${address.slice(-6)}`;
}

export function getMintCommand(item: NftItem): string {
  if (item.status === 'reserved') {
    return `./qclient token custom-mint 1 --application ${item.domain} --authority-key q-prover-key --signature-check=false`;
  }
  return `./qclient token custom-mint 1 --application ${item.domain} --payee ${PUBLIC_PAYEE_HEX} --price ${item.priceBaseUnits} --permissionless --signature-check=false`;
}

export function getDownloadCommand(item: NftItem): string {
  return `./qclient deploy get ${item.imageFullAddress} bcat-${item.paddedId}.webp --signature-check=false`;
}

export function getVerifyCommand(item: NftItem): string {
  return `./qclient token info ${item.domain} --signature-check=false`;
}
