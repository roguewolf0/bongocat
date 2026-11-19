import { useState } from 'react';
import type { NftItem } from '../types/nft';

interface NftCardProps {
  item: NftItem;
  onSelect: (item: NftItem) => void;
}

const FALLBACK_BG: Record<string, string> = {
  coral: 'from-[#FFF1EE] to-[#FFE3E2]',
  mint: 'from-[#E9FBF3] to-[#DCFCE7]',
  yellow: 'from-[#FFF9E2] to-[#FEF3C7]',
  sky: 'from-[#E8F6FF] to-[#E0F2FE]',
};

export function NftCard({ item, onSelect }: NftCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-label={`View #${item.paddedId} ${item.title}`}
      className="group w-full text-left bg-white rounded-2xl border-2 border-zinc-900 overflow-hidden shadow-[3px_3px_0px_#18181B] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#18181B] active:translate-y-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B] flex flex-col"
    >
      <div className="relative w-full aspect-square bg-zinc-100 border-b-2 border-zinc-900 overflow-hidden">
        {!imgError ? (
          <img
            src={item.imageUrl}
            alt={`${item.title} (#${item.paddedId})`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-150"
          />
        ) : (
          <div
            className={`w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br ${
              FALLBACK_BG[item.traits.accent] ?? FALLBACK_BG.coral
            }`}
          >
            <span className="font-mono text-xs font-bold text-zinc-700">#{item.paddedId}</span>
            <span className="font-display text-sm font-bold text-zinc-900 text-center mt-1">
              {item.title}
            </span>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-3.5 flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="font-mono text-xs font-semibold text-zinc-600 tabular-nums shrink-0">
            #{item.paddedId}
          </span>
        </div>

        <h3 className="font-display text-sm sm:text-base font-bold text-zinc-900 truncate">
          {item.title}
        </h3>
      </div>
    </button>
  );
}
