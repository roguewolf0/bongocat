import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface MintStep {
  number: string;
  title: string;
  description: string;
  command: string;
  bgClass: string;
}

const STEPS: MintStep[] = [
  {
    number: '01',
    title: 'Verify On-Chain',
    description:
      'Pick any available BongoCat from the gallery and verify its 1/1 supply, BCAT symbol, and image hash directly on Quilibrium.',
    command: 'quil-nft verify --domain bcat006.quil --symbol BCAT --supply 1/1',
    bgClass: 'bg-[#E8F6FF]',
  },
  {
    number: '02',
    title: 'Mint Your 1-of-1',
    description:
      'Send the mint transaction for 5,000 QUIL using the token domain. Public Mint covers pieces #006 through #100.',
    command: 'quil-nft mint --domain bcat006.quil --symbol BCAT --price 5000',
    bgClass: 'bg-[#FFF9E2]',
  },
  {
    number: '03',
    title: 'Download the Artwork',
    description:
      'Fetch the original lossless .webp artwork file directly from its immutable on-chain image address anytime.',
    command: 'quil-storage fetch 0x... --out bcat-006.webp',
    bgClass: 'bg-[#E9FBF3]',
  },
];

export function HowToMintSection() {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  async function handleCopy(stepNumber: string, cmd: string) {
    setCopiedStep(stepNumber);
    window.setTimeout(() => {
      setCopiedStep((prev) => (prev === stepNumber ? null : prev));
    }, 1800);

    try {
      await navigator.clipboard.writeText(cmd);
    } catch {
      // ignore if clipboard blocked
    }
  }

  return (
    <section id="how-to-mint" className="scroll-mt-20 py-14 sm:py-18 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-zinc-500 mb-2">
            Beginner Guide <span aria-hidden="true">·</span> 3 Simple Steps
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 text-balance">
            How to Verify, Mint, and Download
          </h2>
          <p className="mt-3 text-base text-zinc-600 leading-relaxed">
            Every BongoCat NFT lives 100% on-chain. Click any piece in the gallery above to copy its exact pre-filled commands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => {
            const isCopied = copiedStep === step.number;
            return (
              <div
                key={step.number}
                className={`p-6 rounded-2xl border-2 border-zinc-900 shadow-[4px_4px_0px_#18181B] flex flex-col justify-between gap-5 ${step.bgClass}`}
              >
                <div>
                  <span className="inline-block font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-white border-2 border-zinc-900 text-zinc-900 tabular-nums">
                    Step {step.number}
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-zinc-900 mt-4">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border-2 border-zinc-900">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-bold text-zinc-500">Example CLI</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(step.number, step.command)}
                      aria-label={`Copy step ${step.number} example command`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md border border-zinc-900 bg-zinc-50 hover:bg-zinc-900 hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B]"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <code className="block font-mono text-xs text-zinc-800 break-all">
                    {step.command}
                  </code>
                </div>
              </div>
            );
          })}
        </div>

        {/* Collection On-Chain Specs Summary */}
        <div
          id="collection-specs"
          className="scroll-mt-24 mt-10 p-6 rounded-2xl bg-[#FAFAFC] border-2 border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          <div>
            <p className="text-xs font-medium text-zinc-500">Collection Symbol</p>
            <p className="font-mono text-lg font-bold text-zinc-900 mt-1">BCAT</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500">Total Supply</p>
            <p className="font-mono text-lg font-bold text-zinc-900 mt-1 tabular-nums">100 (1/1)</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500">Public Mint Price</p>
            <p className="font-mono text-lg font-bold text-zinc-900 mt-1 tabular-nums">5,000 QUIL</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500">Allocation Split</p>
            <p className="font-mono text-lg font-bold text-zinc-900 mt-1 tabular-nums">95 Public / 5 Team</p>
          </div>
        </div>
      </div>
    </section>
  );
}
