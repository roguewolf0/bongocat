export function Footer() {
  return (
    <footer className="bg-[#FAFAFC] border-t border-zinc-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <p className="font-medium text-zinc-700">
          BongoCat <span aria-hidden="true">·</span> BCAT — 100 1-of-1 On-Chain PFP Collection
        </p>
        <div className="flex items-center gap-6">
          <a href="#top" className="hover:text-zinc-900 transition-colors whitespace-nowrap">
            Back to top
          </a>
          <a href="#gallery" className="hover:text-zinc-900 transition-colors whitespace-nowrap">
            Gallery
          </a>
        </div>
      </div>
    </footer>
  );
}
