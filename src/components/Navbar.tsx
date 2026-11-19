export function Navbar() {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-8">
        <a
          href="#top"
          aria-label="BongoCats home"
          className="inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B] rounded-lg"
        >
          <img
            src="/bongocat-logo.png"
            alt="BongoCats"
            className="h-11 sm:h-12 w-auto object-contain select-none"
          />
        </a>
      </div>
    </header>
  );
}
