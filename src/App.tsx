import { useEffect, useMemo, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ArrowUp } from 'lucide-react';
import { BONGO_COLLECTION } from './data/collection';
import type { MintFilter, NftItem } from './types/nft';
import { filterCollection, getCollectionCounts } from './utils/nftUtils';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { NftCard } from './components/NftCard';
import { NftModal } from './components/NftModal';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<MintFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<NftItem | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 300);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const counts = useMemo(() => getCollectionCounts(BONGO_COLLECTION), []);

  const filteredItems = useMemo(
    () => filterCollection(BONGO_COLLECTION, activeFilter, searchQuery),
    [activeFilter, searchQuery]
  );

  const selectedIndex = useMemo(() => {
    if (!selectedItem) return -1;
    return filteredItems.findIndex((item) => item.id === selectedItem.id);
  }, [filteredItems, selectedItem]);

  function handleResetFilters() {
    setActiveFilter('all');
    setSearchQuery('');
  }

  return (
    <div id="top" className="min-h-screen flex flex-col bg-bongo-canvas text-zinc-900">
      <Navbar />

      <main className="flex-1">
        <section id="gallery" className="scroll-mt-20 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              counts={counts}
            />

            {filteredItems.length > 0 ? (
              <div
                data-testid="nft-gallery-grid"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5"
              >
                {filteredItems.map((item) => (
                  <NftCard key={item.id} item={item} onSelect={setSelectedItem} />
                ))}
              </div>
            ) : (
              <div className="py-16 px-6 text-center rounded-2xl bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_#18181B]">
                <p className="font-display text-xl font-bold text-zinc-900">
                  No BongoCats match &ldquo;{searchQuery.trim()}&rdquo;
                </p>
                <p className="text-sm text-zinc-600 mt-1.5">
                  Try searching by a number like #042, a domain like bcat006.quil, or reset your filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-5 px-5 py-2.5 text-sm font-bold text-zinc-900 bg-[#FFD166] rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181B] hover:-translate-y-0.5 transition-transform"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-[#FFD166] text-zinc-900 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181B] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#18181B] active:translate-y-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B]"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </button>
      )}

      <NftModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        hasPrev={selectedIndex > 0}
        hasNext={selectedIndex >= 0 && selectedIndex < filteredItems.length - 1}
        onPrev={() => {
          if (selectedIndex > 0) {
            setSelectedItem(filteredItems[selectedIndex - 1]);
          }
        }}
        onNext={() => {
          if (selectedIndex >= 0 && selectedIndex < filteredItems.length - 1) {
            setSelectedItem(filteredItems[selectedIndex + 1]);
          }
        }}
      />
      <Analytics />
    </div>
  );
}
