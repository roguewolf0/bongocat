import { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';

interface HeroSectionProps {
  onBrowseClick: () => void;
  onSelectFeatured?: (id: number) => void;
}

const HERO_SHOWCASE = [
  {
    id: 1,
    paddedId: '001',
    title: 'Genesis BongoCat',
    src: '/artworks/bcat-001.webp',
    alt: 'BongoCat #001',
    badgeBg: 'bg-[#FFF1EE]',
  },
  {
    id: 3,
    paddedId: '003',
    title: 'Shadow Shinobi',
    src: '/artworks/bcat-003.webp',
    alt: 'BongoCat #003',
    badgeBg: 'bg-[#E8F6FF]',
  },
  {
    id: 4,
    paddedId: '004',
    title: 'Tuxedo Don',
    src: '/artworks/bcat-004.webp',
    alt: 'BongoCat #004',
    badgeBg: 'bg-[#FAFAFC]',
  },
  {
    id: 5,
    paddedId: '005',
    title: 'Lionheart Knight',
    src: '/artworks/bcat-005.webp',
    alt: 'BongoCat #005',
    badgeBg: 'bg-[#E8F6FF]',
  },
  {
    id: 89,
    paddedId: '089',
    title: 'Golden Pharaoh',
    src: '/artworks/bcat-089.webp',
    alt: 'BongoCat #089',
    badgeBg: 'bg-[#FFF9E2]',
  },
  {
    id: 100,
    paddedId: '100',
    title: 'Punk Rockstar',
    src: '/artworks/bcat-100.webp',
    alt: 'BongoCat #100',
    badgeBg: 'bg-[#FFF1EE]',
  },
] as const;

export function HeroSection({ onBrowseClick, onSelectFeatured }: HeroSectionProps) {
  const [failedIds, setFailedIds] = useState<Record<number, boolean>>({});

  return (
    <section id="top" className="pt-6 pb-8 sm:pt-8 sm:pb-10 border-b border-zinc-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        {/* Art-First 6-Card Showcase */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4"
          aria-label="Featured BongoCat artworks"
        >
          {HERO_SHOWCASE.map((art) => {
            const hasError = Boolean(failedIds[art.id]);
            return (
              <button
                key={art.id}
                type="button"
                onClick={() => (onSelectFeatured ? onSelectFeatured(art.id) : onBrowseClick())}
                aria-label={`Inspect ${art.title} (#${art.paddedId})`}
                className="group relative aspect-square rounded-2xl border-2 border-zinc-900 overflow-hidden bg-zinc-100 shadow-[4px_4px_0px_#18181B] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#18181B] active:translate-y-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B]"
              >
                {!hasError ? (
                  <img
                    src={art.src}
                    alt={art.alt}
                    referrerPolicy="no-referrer"
                    onError={() => setFailedIds((prev) => ({ ...prev, [art.id]: true }))}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-[#FFF1EE] to-[#E8F6FF] text-center">
                    <span className="font-mono text-xs font-bold text-zinc-700">#{art.paddedId}</span>
                    <span className="font-display text-xs font-bold text-zinc-900 mt-1">{art.title}</span>
                  </div>
                )}
                <span
                  className={`absolute bottom-2.5 left-2.5 px-2 py-0.5 text-[11px] font-mono font-bold text-zinc-900 rounded-md border border-zinc-900 ${art.badgeBg} shadow-[1px_1px_0px_#18181B]`}
                >
                  #{art.paddedId}
                </span>
              </button>
            );
          })}
        </div>

        {/* Compact Action & Spec Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2.5" aria-label="Collection summary">
            <h1 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 mr-1">
              BongoCat<span className="text-[#FF5E5B] mx-1.5">·</span>BCAT
            </h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF1EE] border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] text-xs font-bold text-zinc-900 tabular-nums whitespace-nowrap">
              100 1-of-1
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#E9FBF3] border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] text-xs font-bold text-zinc-900 tabular-nums whitespace-nowrap">
              5,000 QUIL
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#E8F6FF] border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] text-xs font-bold text-zinc-900 whitespace-nowrap">
              On-Chain
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onBrowseClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-zinc-900 bg-[#FFD166] rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181B] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#18181B] active:translate-y-0 transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B]"
            >
              Explore Gallery
              <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <a
              href="#how-to-mint"
              className="px-4 py-2.5 text-sm font-semibold text-zinc-800 bg-zinc-100 rounded-xl border-2 border-zinc-900 hover:bg-[#DCFCE7] transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EE59D]"
            >
              How to Mint
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
