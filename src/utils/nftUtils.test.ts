import test from 'node:test';
import assert from 'node:assert/strict';
import { BONGO_COLLECTION } from '../data/collection';
import {
  filterCollection,
  formatShortAddress,
  getCollectionCounts,
  getDownloadCommand,
  getMintCommand,
  getVerifyCommand,
} from './nftUtils';

test('collection has exactly 100 unique 1-of-1 NFTs with 95 public and 5 reserved', () => {
  assert.equal(BONGO_COLLECTION.length, 100);
  const counts = getCollectionCounts(BONGO_COLLECTION);
  assert.equal(counts.all, 100);
  assert.equal(counts.public, 95);
  assert.equal(counts.reserved, 5);

  const ids = new Set(BONGO_COLLECTION.map((item) => item.id));
  const domains = new Set(BONGO_COLLECTION.map((item) => item.domain));
  const addresses = new Set(BONGO_COLLECTION.map((item) => item.imageAddress));
  const traitSignatures = new Set(
    BONGO_COLLECTION.map(
      (item) =>
        `${item.traits.backdrop}|${item.traits.coat}|${item.traits.eyewear}|${item.traits.headwear}|${item.traits.outfit}`
    )
  );

  assert.equal(ids.size, 100);
  assert.equal(domains.size, 100);
  assert.equal(addresses.size, 100);
  assert.equal(traitSignatures.size, 100);
});

test('filterCollection filters by mint status correctly', () => {
  assert.equal(filterCollection(BONGO_COLLECTION, 'all', '').length, 100);
  assert.equal(filterCollection(BONGO_COLLECTION, 'public', '').length, 95);
  assert.equal(filterCollection(BONGO_COLLECTION, 'reserved', '').length, 5);
});

test('filterCollection searches by #ID, title, domain, and imageAddress', () => {
  const byHashId = filterCollection(BONGO_COLLECTION, 'all', '#042');
  assert.equal(byHashId.length, 1);
  assert.equal(byHashId[0].id, 42);

  const byNumericId = filterCollection(BONGO_COLLECTION, 'all', '56');
  assert.equal(byNumericId.length, 1);
  assert.equal(byNumericId[0].id, 56);

  const byDomain = filterCollection(BONGO_COLLECTION, 'all', BONGO_COLLECTION[0].domain);
  assert.equal(byDomain.length, 1);
  assert.equal(byDomain[0].id, 1);

  const sample = BONGO_COLLECTION[19];
  const byAddress = filterCollection(BONGO_COLLECTION, 'all', sample.imageAddress.slice(0, 14));
  assert.ok(byAddress.some((item) => item.id === sample.id));

  const byTitle = filterCollection(BONGO_COLLECTION, 'all', 'Bongo Catsy');
  assert.equal(byTitle.length, 1);
  assert.equal(byTitle[0].id, 1);

  const noMatches = filterCollection(BONGO_COLLECTION, 'all', 'does-not-exist-999');
  assert.equal(noMatches.length, 0);
});

test('command generators format mint, download, and verify commands cleanly', () => {
  const reservedItem = BONGO_COLLECTION[0];
  const publicItem = BONGO_COLLECTION[5];

  assert.match(getMintCommand(reservedItem), /^\.\/qclient token custom-mint 1 --application .* --authority-key q-prover-key --signature-check=false$/);
  assert.match(getMintCommand(publicItem), /^\.\/qclient token custom-mint 1 --application .* --payee .* --price 40000000000000 --permissionless --signature-check=false$/);
  assert.match(getDownloadCommand(publicItem), /^\.\/qclient deploy get .* bcat-006\.webp --signature-check=false$/);
  assert.match(getVerifyCommand(publicItem), /^\.\/qclient token info .* --signature-check=false$/);
  assert.equal(formatShortAddress(publicItem.imageAddress).includes('...'), true);
});
