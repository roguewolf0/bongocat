import { useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Copy, X } from 'lucide-react';
import type { NftItem } from '../types/nft';

interface NftModalProps {
  item: NftItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

type CopyKey = 'mint' | 'download' | 'verify' | 'address' | 'domain';

export function NftModal({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: NftModalProps) {
  const [copiedKey, setCopiedKey] = useState<CopyKey | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setCopiedKey(null);
    setImgError(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  const isReserved = item.status === 'reserved';
  const maskedCmd = '*'.repeat(72);

  async function handleCopy(key: CopyKey, text: string) {
    setCopiedKey(key);
    window.setTimeout(() => {
      setCopiedKey((current) => (current === key ? null : current));
    }, 1800);

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/60 backdrop-blur-xs"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nft-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl border-2 border-zinc-900 shadow-[8px_8px_0px_#18181B]"
      >
        {/* Top Modal Header Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 py-3.5 bg-white border-b-2 border-zinc-900">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-sm font-bold text-zinc-900 tabular-nums shrink-0">
              #{item.paddedId}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              aria-label="Previous BongoCat"
              className="p-2 rounded-xl border-2 border-zinc-900 bg-white text-zinc-900 hover:bg-zinc-100 disabled:opacity-35 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B]"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              aria-label="Next BongoCat"
              className="p-2 rounded-xl border-2 border-zinc-900 bg-white text-zinc-900 hover:bg-zinc-100 disabled:opacity-35 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B]"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-xl border-2 border-zinc-900 bg-[#FFF1EE] text-zinc-900 hover:bg-[#FF5E5B] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B]"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Artwork Column */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="aspect-square w-full rounded-2xl border-2 border-zinc-900 overflow-hidden bg-zinc-100 shadow-[4px_4px_0px_#18181B]">
              {!imgError ? (
                <img
                  src={item.imageUrl}
                  alt={`${item.title} (#${item.paddedId})`}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FFF1EE] to-[#E8F6FF] text-center">
                  <span className="font-mono text-sm font-bold text-zinc-700">#{item.paddedId}</span>
                  <span className="font-display text-xl font-bold text-zinc-900 mt-1">
                    {item.title}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details & One-Click Commands Column */}
          <div className="md:col-span-7 flex flex-col gap-5">
            <div>
              <h2
                id="nft-modal-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight"
              >
                {item.title}
              </h2>
            </div>

            {/* On-Chain Metadata Grid */}
            <dl className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#FAFAFC] border-2 border-zinc-900">
              <div>
                <dt className="text-xs font-medium text-zinc-500">Domain</dt>
                <dd className="mt-0.5 flex items-center gap-1.5">
                  <span className="font-mono text-sm font-semibold text-zinc-900 truncate">
                    {'*'.repeat(18)}
                  </span>
                  <button
                    type="button"
                    disabled
                    aria-label="Domain hidden"
                    className="p-1 text-zinc-400 rounded opacity-45 pointer-events-none"
                  >
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-medium text-zinc-500">Symbol</dt>
                <dd className="mt-0.5 font-mono text-sm font-semibold text-zinc-900">
                  {item.symbol}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-medium text-zinc-500">Supply</dt>
                <dd className="mt-0.5 font-mono text-sm font-semibold text-zinc-900 tabular-nums">
                  {item.supply}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-medium text-zinc-500">Image Address</dt>
                <dd className="mt-0.5 flex items-center gap-1.5">
                  <span className="font-mono text-sm font-semibold text-zinc-900 truncate">
                    {'*'.repeat(18)}
                  </span>
                  <button
                    type="button"
                    disabled
                    aria-label="Image address hidden"
                    className="p-1 text-zinc-400 rounded opacity-45 pointer-events-none"
                  >
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </dd>
              </div>
            </dl>

            {/* One-Click Copy Command Blocks */}
            <div className="flex flex-col gap-3">
              {!isReserved && (
                <>
                  <CommandRow
                    testId="cmd-copy-mint"
                    label="Mint Command"
                    command={maskedCmd}
                    accentClass="bg-[#FFF9E2]"
                    isCopied={false}
                    disabled
                    onCopy={() => {}}
                  />
                  <CommandRow
                    testId="cmd-copy-download"
                    label="Image Download Command"
                    command={maskedCmd}
                    accentClass="bg-[#E9FBF3]"
                    isCopied={false}
                    disabled
                    onCopy={() => {}}
                  />
                </>
              )}
              <CommandRow
                testId="cmd-copy-verify"
                label="On-Chain Verification Command"
                command={maskedCmd}
                accentClass="bg-[#E8F6FF]"
                isCopied={false}
                disabled
                onCopy={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CommandRowProps {
  testId: string;
  label: string;
  command: string;
  accentClass: string;
  isCopied: boolean;
  disabled?: boolean;
  onCopy: () => void;
}

function CommandRow({ testId, label, command, accentClass, isCopied, disabled = false, onCopy }: CommandRowProps) {
  return (
    <div className={`p-3 rounded-xl border-2 border-zinc-900 ${accentClass}`}>
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <span className="text-xs font-bold text-zinc-900">{label}</span>
        <button
          type="button"
          data-testid={testId}
          onClick={onCopy}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border-2 border-zinc-900 bg-white text-zinc-900 hover:bg-zinc-900 hover:text-white disabled:opacity-45 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E5B]"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <code className="block max-h-24 overflow-y-auto font-mono text-xs text-zinc-800 break-words [overflow-wrap:anywhere] leading-relaxed">
        {command}
      </code>
    </div>
  );
}
