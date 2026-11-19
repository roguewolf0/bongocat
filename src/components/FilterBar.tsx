import { Search, X } from 'lucide-react';
import type { CollectionCounts, MintFilter } from '../types/nft';

interface FilterBarProps {
  activeFilter: MintFilter;
  onFilterChange: (filter: MintFilter) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  counts: CollectionCounts;
}

export function FilterBar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
}: FilterBarProps) {
  const filters: { id: MintFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'public', label: 'Public Mint', count: counts.public },
    { id: 'reserved', label: 'Team Reserved', count: counts.reserved },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6">
      <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter collection by mint status">
        {filters.map((item) => {
          const isActive = activeFilter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onFilterChange(item.id)}
              className={`px-4 py-2 text-sm font-bold rounded-full border-2 transition-all duration-150 tabular-nums whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B] ${
                isActive
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-[3px_3px_0px_#FF5E5B]'
                  : 'bg-white text-zinc-700 border-zinc-900 hover:bg-[#FFF9E2]'
              }`}
            >
              {item.label} ({item.count})
            </button>
          );
        })}
      </div>

      <div className="relative w-full lg:w-96">
        <label htmlFor="nft-search-input" className="sr-only">
          Search NFTs by ID, name, or on-chain domain or address
        </label>
        <Search
          className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        />
        <input
          id="nft-search-input"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search #ID, name, or domain/address..."
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-white text-zinc-900 placeholder:text-zinc-400 border-2 border-zinc-900 rounded-xl shadow-[2px_2px_0px_#18181B] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-shadow"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B]"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
