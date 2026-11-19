import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { BONGO_COLLECTION } from '../src/data/collection';
import type { NftItem } from '../src/types/nft';

const execFileAsync = promisify(execFile);

const COAT_COLORS: Record<string, { fur: string; ear: string; blush: string; belly: string }> = {
  'Cloud White': { fur: '#FFFFFF', ear: '#FFA69E', blush: '#FF9E9D', belly: '#F4F4F5' },
  'Cream Calico': { fur: '#FFF7E8', ear: '#FF8C7A', blush: '#FFA394', belly: '#FDE7C8' },
  'Peach Tabby': { fur: '#FFD6BA', ear: '#FF7B72', blush: '#FF857D', belly: '#FFEAD9' },
  'Mint Sorbet': { fur: '#D8F8EC', ear: '#34D399', blush: '#FF9EAA', belly: '#ECFDF5' },
  'Sky Bluebell': { fur: '#DFF2FE', ear: '#60A5FA', blush: '#FF9EBB', belly: '#F0F9FF' },
  'Buttercup': { fur: '#FEF0B8', ear: '#F59E0B', blush: '#FF9A9E', belly: '#FFF9DB' },
  'Lilac Mist': { fur: '#EFE6FF', ear: '#A78BFA', blush: '#FFA0B4', belly: '#F7F2FF' },
  'Tuxedo Ink': { fur: '#2D3039', ear: '#FF8FA3', blush: '#FF8FA3', belly: '#FFFFFF' },
};

const ACCENT_HEX: Record<string, { main: string; soft: string; alt: string }> = {
  coral: { main: '#FF5E5B', soft: '#FFE3E2', alt: '#FFD166' },
  mint: { main: '#2EE59D', soft: '#DCFCE7', alt: '#38BDF8' },
  yellow: { main: '#FFD166', soft: '#FEF3C7', alt: '#FF5E5B' },
  sky: { main: '#38BDF8', soft: '#E0F2FE', alt: '#2EE59D' },
};

function renderBackdrop(item: NftItem): string {
  const { backdrop, accent } = item.traits;
  const pal = ACCENT_HEX[accent];

  const halftoneDef = `
    <pattern id="dots-${item.id}" width="18" height="18" patternUnits="userSpaceOnUse">
      <circle cx="9" cy="9" r="3.2" fill="#18181B" fill-opacity="0.11" />
    </pattern>
    <pattern id="grid-${item.id}" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#18181B" stroke-opacity="0.12" stroke-width="2" />
    </pattern>
    <pattern id="checker-${item.id}" width="44" height="44" patternUnits="userSpaceOnUse">
      <rect width="22" height="22" fill="${pal.main}" fill-opacity="0.22" />
      <rect x="22" y="22" width="22" height="22" fill="${pal.main}" fill-opacity="0.22" />
    </pattern>
  `;

  let bgLayer = '';
  switch (backdrop) {
    case 'Halftone Coral':
      bgLayer = `
        <rect width="420" height="420" fill="#FFF1EE" />
        <circle cx="345" cy="78" r="95" fill="#FF5E5B" fill-opacity="0.28" />
        <circle cx="70" cy="110" r="64" fill="#FFD166" fill-opacity="0.55" />
        <rect width="420" height="420" fill="url(#dots-${item.id})" />
      `;
      break;
    case 'Electric Mint Grid':
      bgLayer = `
        <rect width="420" height="420" fill="#E9FBF3" />
        <rect x="28" y="28" width="160" height="160" rx="28" fill="#38BDF8" fill-opacity="0.28" />
        <circle cx="350" cy="115" r="76" fill="#2EE59D" fill-opacity="0.45" />
        <rect width="420" height="420" fill="url(#grid-${item.id})" />
      `;
      break;
    case 'Sunny Starburst':
      bgLayer = `
        <rect width="420" height="420" fill="#FFF9E2" />
        <g transform="translate(210, 175)">
          ${Array.from({ length: 12 }, (_, idx) => {
            const angle = idx * 30;
            return `<polygon points="0,0 -28,-240 28,-240" fill="${idx % 2 === 0 ? '#FFD166' : '#FF5E5B'}" fill-opacity="${idx % 2 === 0 ? '0.45' : '0.16'}" transform="rotate(${angle})" />`;
          }).join('')}
        </g>
        <rect width="420" height="420" fill="url(#dots-${item.id})" />
      `;
      break;
    case 'Sky Polka Pop':
      bgLayer = `
        <rect width="420" height="420" fill="#E8F6FF" />
        <circle cx="95" cy="70" r="46" fill="#FF5E5B" fill-opacity="0.32" />
        <circle cx="340" cy="90" r="56" fill="#FFD166" fill-opacity="0.52" />
        <circle cx="55" cy="210" r="32" fill="#2EE59D" fill-opacity="0.48" />
        <circle cx="365" cy="215" r="38" fill="#38BDF8" fill-opacity="0.42" />
        <rect width="420" height="420" fill="url(#dots-${item.id})" />
      `;
      break;
    case 'Checkerboard Fizz':
      bgLayer = `
        <rect width="420" height="420" fill="#FAFAFC" />
        <rect width="420" height="420" fill="url(#checker-${item.id})" />
        <circle cx="210" cy="175" r="126" fill="#FFFFFF" stroke="#18181B" stroke-width="4" />
      `;
      break;
    case 'Pastel Horizon':
      bgLayer = `
        <rect width="420" height="420" fill="${pal.soft}" />
        <rect y="0" width="420" height="120" fill="#38BDF8" fill-opacity="0.28" />
        <rect y="120" width="420" height="120" fill="#FFD166" fill-opacity="0.32" />
        <circle cx="72" cy="78" r="42" fill="#FF5E5B" stroke="#18181B" stroke-width="4" />
      `;
      break;
    case 'Confetti Splash':
      bgLayer = `
        <rect width="420" height="420" fill="#FFFDF7" />
        <rect x="44" y="48" width="28" height="28" rx="6" fill="#FF5E5B" transform="rotate(18 58 62)" />
        <circle cx="350" cy="64" r="18" fill="#2EE59D" />
        <polygon points="90,150 112,184 68,184" fill="#38BDF8" />
        <rect x="315" y="155" width="32" height="16" rx="8" fill="#FFD166" transform="rotate(-24 331 163)" />
        <circle cx="195" cy="52" r="14" fill="#FFD166" />
        <rect width="420" height="420" fill="url(#dots-${item.id})" />
      `;
      break;
    default:
      bgLayer = `
        <rect width="420" height="420" fill="#F4F7FF" />
        <rect x="0" y="0" width="140" height="290" fill="#FF5E5B" fill-opacity="0.22" />
        <rect x="140" y="0" width="140" height="290" fill="#FFD166" fill-opacity="0.26" />
        <rect x="280" y="0" width="140" height="290" fill="#2EE59D" fill-opacity="0.24" />
        <rect width="420" height="420" fill="url(#dots-${item.id})" />
      `;
  }

  return `<defs>${halftoneDef}</defs>${bgLayer}`;
}

function renderHeadwear(headwear: string, pal: { main: string; soft: string; alt: string }): string {
  switch (headwear) {
    case 'Mint Headphones':
      return `
        <path d="M 128 164 C 128 96, 292 96, 292 164" fill="none" stroke="#18181B" stroke-width="14" stroke-linecap="round" />
        <path d="M 128 164 C 128 96, 292 96, 292 164" fill="none" stroke="#2EE59D" stroke-width="7" stroke-linecap="round" />
        <rect x="108" y="144" width="26" height="48" rx="12" fill="#2EE59D" stroke="#18181B" stroke-width="5" />
        <rect x="286" y="144" width="26" height="48" rx="12" fill="#2EE59D" stroke="#18181B" stroke-width="5" />
      `;
    case 'Artist Beret':
      return `
        <path d="M 145 124 C 138 92, 232 76, 274 108 C 282 115, 274 128, 250 128 Z" fill="#FF5E5B" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
        <line x1="205" y1="86" x2="210" y2="73" stroke="#18181B" stroke-width="5" stroke-linecap="round" />
      `;
    case 'Sunny Crown':
      return `
        <polygon points="164,120 174,80 198,104 210,72 222,104 246,80 256,120" fill="#FFD166" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
        <circle cx="210" cy="105" r="5" fill="#FF5E5B" stroke="#18181B" stroke-width="2.5" />
      `;
    case 'Propeller Cap':
      return `
        <path d="M 158 122 C 160 88, 260 88, 262 122 Z" fill="#38BDF8" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
        <path d="M 244 122 L 284 124" stroke="#18181B" stroke-width="7" stroke-linecap="round" />
        <line x1="210" y1="96" x2="210" y2="79" stroke="#18181B" stroke-width="5" />
        <ellipse cx="195" cy="79" rx="18" ry="5" fill="#FFD166" stroke="#18181B" stroke-width="3.5" />
        <ellipse cx="225" cy="79" rx="18" ry="5" fill="#FF5E5B" stroke="#18181B" stroke-width="3.5" />
      `;
    case 'Bucket Hat':
      return `
        <path d="M 164 116 L 176 82 L 244 82 L 256 116 Z" fill="${pal.main}" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
        <path d="M 140 124 Q 210 108 280 124 Q 210 132 140 124 Z" fill="${pal.alt}" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
      `;
    case 'Studio Beanie':
      return `
        <path d="M 156 122 C 156 80, 264 80, 264 122 Z" fill="#38BDF8" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
        <rect x="150" y="112" width="120" height="18" rx="9" fill="#FFD166" stroke="#18181B" stroke-width="5" />
        <circle cx="210" cy="78" r="10" fill="#FF5E5B" stroke="#18181B" stroke-width="4" />
      `;
    case 'Pop Halo':
      return `
        <ellipse cx="210" cy="82" rx="44" ry="12" fill="none" stroke="#18181B" stroke-width="11" />
        <ellipse cx="210" cy="82" rx="44" ry="12" fill="none" stroke="#FFD166" stroke-width="5" />
      `;
    case 'Party Cone':
      return `
        <polygon points="184,116 210,54 236,116" fill="#FF5E5B" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
        <line x1="194" y1="94" x2="226" y2="94" stroke="#FFD166" stroke-width="6" />
        <circle cx="210" cy="52" r="10" fill="#2EE59D" stroke="#18181B" stroke-width="4" />
      `;
    case 'Retro Visor':
      return `
        <rect x="150" y="108" width="120" height="18" rx="9" fill="#FF5E5B" stroke="#18181B" stroke-width="4.5" />
        <path d="M 152 124 Q 210 144 268 124 Z" fill="#38BDF8" fill-opacity="0.7" stroke="#18181B" stroke-width="4.5" stroke-linejoin="round" />
      `;
    default:
      return '';
  }
}

function renderEyewear(eyewear: string, isDarkCoat: boolean): string {
  const eyeColor = isDarkCoat ? '#FFFFFF' : '#18181B';
  switch (eyewear) {
    case 'Pop Shades':
      return `
        <rect x="156" y="156" width="44" height="28" rx="8" fill="#18181B" stroke="#FF5E5B" stroke-width="4.5" />
        <rect x="220" y="156" width="44" height="28" rx="8" fill="#18181B" stroke="#FF5E5B" stroke-width="4.5" />
        <line x1="200" y1="168" x2="220" y2="168" stroke="#FF5E5B" stroke-width="5" />
        <line x1="166" y1="164" x2="176" y2="176" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" />
        <line x1="230" y1="164" x2="240" y2="176" stroke="#FFD166" stroke-width="4" stroke-linecap="round" />
      `;
    case 'Starry Eyes':
      return `
        <polygon points="178,154 183,165 195,165 186,173 189,184 178,177 167,184 170,173 161,165 173,165" fill="#FFD166" stroke="#18181B" stroke-width="3.5" stroke-linejoin="round" />
        <polygon points="242,154 247,165 259,165 250,173 253,184 242,177 231,184 234,173 225,165 237,165" fill="#FFD166" stroke="#18181B" stroke-width="3.5" stroke-linejoin="round" />
      `;
    case 'Heart Specs':
      return `
        <path d="M 178 182 C 162 172, 158 156, 170 154 C 176 153, 178 159, 178 159 C 178 159, 180 153, 186 154 C 198 156, 194 172, 178 182 Z" fill="#FF5E5B" stroke="#18181B" stroke-width="3.5" />
        <path d="M 242 182 C 226 172, 222 156, 234 154 C 240 153, 242 159, 242 159 C 242 159, 244 153, 250 154 C 262 156, 258 172, 242 182 Z" fill="#FF5E5B" stroke="#18181B" stroke-width="3.5" />
      `;
    case 'Cyber Visor':
      return `
        <rect x="150" y="155" width="120" height="28" rx="14" fill="#38BDF8" fill-opacity="0.88" stroke="#18181B" stroke-width="4.5" />
        <line x1="168" y1="164" x2="215" y2="164" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" />
      `;
    case 'Round Monocle':
      return `
        <circle cx="178" cy="170" r="8" fill="${eyeColor}" />
        <circle cx="242" cy="170" r="18" fill="#38BDF8" fill-opacity="0.3" stroke="#FFD166" stroke-width="4.5" />
        <circle cx="242" cy="170" r="7" fill="${eyeColor}" />
        <path d="M 260 174 Q 268 198 258 214" fill="none" stroke="#FFD166" stroke-width="3" stroke-linecap="round" />
      `;
    case 'Happy Wink':
      return `
        <path d="M 166 172 Q 178 158 190 172" fill="none" stroke="${eyeColor}" stroke-width="5.5" stroke-linecap="round" />
        <circle cx="242" cy="170" r="8" fill="${eyeColor}" />
        <circle cx="245" cy="167" r="2.5" fill="#FFFFFF" />
      `;
    case 'Mint Goggles':
      return `
        <circle cx="178" cy="169" r="18" fill="#2EE59D" fill-opacity="0.45" stroke="#18181B" stroke-width="4.5" />
        <circle cx="242" cy="169" r="18" fill="#2EE59D" fill-opacity="0.45" stroke="#18181B" stroke-width="4.5" />
        <line x1="196" y1="169" x2="224" y2="169" stroke="#18181B" stroke-width="4.5" />
        <circle cx="178" cy="169" r="6" fill="${eyeColor}" />
        <circle cx="242" cy="169" r="6" fill="${eyeColor}" />
      `;
    case 'Laser Rim':
      return `
        <polygon points="154,158 202,162 198,182 158,180" fill="#FF5E5B" stroke="#18181B" stroke-width="4" stroke-linejoin="round" />
        <polygon points="266,158 218,162 222,182 262,180" fill="#FF5E5B" stroke="#18181B" stroke-width="4" stroke-linejoin="round" />
        <line x1="202" y1="168" x2="218" y2="168" stroke="#18181B" stroke-width="4.5" />
      `;
    default:
      return `
        <circle cx="178" cy="170" r="8.5" fill="${eyeColor}" />
        <circle cx="242" cy="170" r="8.5" fill="${eyeColor}" />
        <circle cx="181" cy="167" r="2.6" fill="#FFFFFF" />
        <circle cx="245" cy="167" r="2.6" fill="#FFFFFF" />
      `;
  }
}

function renderInstrument(instrument: string): string {
  switch (instrument) {
    case 'Neon Synth':
      return `
        <rect x="115" y="276" width="190" height="58" rx="12" fill="#38BDF8" stroke="#18181B" stroke-width="5" />
        <rect x="130" y="290" width="160" height="32" rx="6" fill="#FFFFFF" stroke="#18181B" stroke-width="3.5" />
        <rect x="148" y="290" width="12" height="19" fill="#18181B" />
        <rect x="172" y="290" width="12" height="19" fill="#18181B" />
        <rect x="208" y="290" width="12" height="19" fill="#18181B" />
        <rect x="232" y="290" width="12" height="19" fill="#18181B" />
        <rect x="256" y="290" width="12" height="19" fill="#18181B" />
      `;
    case 'Turntable Deck':
      return `
        <rect x="112" y="274" width="196" height="62" rx="12" fill="#FFD166" stroke="#18181B" stroke-width="5" />
        <circle cx="172" cy="305" r="22" fill="#18181B" />
        <circle cx="172" cy="305" r="7" fill="#FF5E5B" />
        <circle cx="248" cy="305" r="22" fill="#18181B" />
        <circle cx="248" cy="305" r="7" fill="#2EE59D" />
      `;
    case 'Snare & Sticks':
      return `
        <rect x="148" y="276" width="124" height="56" rx="14" fill="#FF5E5B" stroke="#18181B" stroke-width="5" />
        <ellipse cx="210" cy="276" rx="62" ry="14" fill="#FFFFFF" stroke="#18181B" stroke-width="5" />
        <line x1="164" y1="286" x2="184" y2="330" stroke="#FFD166" stroke-width="4" />
        <line x1="256" y1="286" x2="236" y2="330" stroke="#FFD166" stroke-width="4" />
      `;
    case 'Pop Tambourine':
      return `
        <ellipse cx="210" cy="300" rx="66" ry="28" fill="#2EE59D" stroke="#18181B" stroke-width="5" />
        <ellipse cx="210" cy="296" rx="52" ry="18" fill="#FFFDF7" stroke="#18181B" stroke-width="4" />
        <circle cx="146" cy="300" r="8" fill="#FFD166" stroke="#18181B" stroke-width="3.5" />
        <circle cx="274" cy="300" r="8" fill="#FFD166" stroke="#18181B" stroke-width="3.5" />
        <circle cx="210" cy="326" r="8" fill="#FFD166" stroke="#18181B" stroke-width="3.5" />
      `;
    case 'Keytar Mini':
      return `
        <polygon points="118,288 292,272 302,324 126,336" fill="#FF5E5B" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
        <polygon points="154,292 272,281 278,314 160,324" fill="#FFFFFF" stroke="#18181B" stroke-width="3.5" stroke-linejoin="round" />
      `;
    case 'Sampler Pad':
      return `
        <rect x="132" y="272" width="156" height="64" rx="12" fill="#18181B" stroke="#18181B" stroke-width="5" />
        <rect x="148" y="284" width="26" height="20" rx="4" fill="#FF5E5B" />
        <rect x="181" y="284" width="26" height="20" rx="4" fill="#FFD166" />
        <rect x="214" y="284" width="26" height="20" rx="4" fill="#2EE59D" />
        <rect x="247" y="284" width="26" height="20" rx="4" fill="#38BDF8" />
        <rect x="148" y="310" width="26" height="16" rx="4" fill="#38BDF8" />
        <rect x="181" y="310" width="26" height="16" rx="4" fill="#2EE59D" />
        <rect x="214" y="310" width="26" height="16" rx="4" fill="#FFD166" />
        <rect x="247" y="310" width="26" height="16" rx="4" fill="#FF5E5B" />
      `;
    case 'Cowbell & Drum':
      return `
        <path d="M 134 274 L 188 274 L 180 332 L 142 332 Z" fill="#FFD166" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
        <ellipse cx="161" cy="274" rx="27" ry="10" fill="#FFFDF7" stroke="#18181B" stroke-width="4.5" />
        <polygon points="228,274 268,274 280,328 216,328" fill="#38BDF8" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
      `;
    case 'Bass Groove':
      return `
        <rect x="116" y="280" width="188" height="54" rx="14" fill="#2EE59D" stroke="#18181B" stroke-width="5" />
        <circle cx="162" cy="307" r="18" fill="#18181B" />
        <circle cx="162" cy="307" r="7" fill="#FFD166" />
        <circle cx="258" cy="307" r="18" fill="#18181B" />
        <circle cx="258" cy="307" r="7" fill="#FFD166" />
        <rect x="194" y="294" width="32" height="26" rx="5" fill="#FF5E5B" stroke="#18181B" stroke-width="3.5" />
      `;
    default: // Twin Bongos
      return `
        <path d="M 122 276 L 194 276 L 184 334 L 132 334 Z" fill="#FF5E5B" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
        <ellipse cx="158" cy="276" rx="36" ry="12" fill="#FFFDF7" stroke="#18181B" stroke-width="5" />
        <path d="M 226 280 L 294 280 L 284 334 L 236 334 Z" fill="#FFD166" stroke="#18181B" stroke-width="5" stroke-linejoin="round" />
        <ellipse cx="260" cy="280" rx="34" ry="11" fill="#FFFDF7" stroke="#18181B" stroke-width="5" />
      `;
  }
}

function buildSvg(item: NftItem): string {
  const coat = COAT_COLORS[item.traits.coat] ?? COAT_COLORS['Cloud White'];
  const pal = ACCENT_HEX[item.traits.accent] ?? ACCENT_HEX.coral;
  const isDarkCoat = item.traits.coat === 'Tuxedo Ink';
  const strokeMain = '#18181B';
  const deskColor = item.status === 'reserved' ? '#FFD166' : pal.soft;
  const pawLiftLeft = item.id % 2 === 0 ? -12 : 2;
  const pawLiftRight = item.id % 2 === 1 ? -12 : 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="420" viewBox="0 0 420 420">
    ${renderBackdrop(item)}

    <!-- Cat Tail -->
    <path d="M 118 272 C 74 268, 72 206, 98 194 C 110 189, 118 202, 110 214 C 98 232, 102 252, 126 254" fill="${coat.fur}" stroke="${strokeMain}" stroke-width="6" stroke-linecap="round" />

    <!-- Cat Body & Head -->
    <path d="M 122 290 C 122 214, 134 152, 146 130 L 142 96 L 176 118 C 198 112, 222 112, 244 118 L 278 96 L 274 130 C 286 152, 298 214, 298 290 Z" fill="${coat.fur}" stroke="${strokeMain}" stroke-width="6" stroke-linejoin="round" />

    <!-- Inner Ears -->
    <polygon points="150,108 153,130 172,122" fill="${coat.ear}" />
    <polygon points="270,108 267,130 248,122" fill="${coat.ear}" />

    <!-- Blush Cheeks -->
    <ellipse cx="156" cy="192" rx="14" ry="8" fill="${coat.blush}" fill-opacity="0.72" />
    <ellipse cx="264" cy="192" rx="14" ry="8" fill="${coat.blush}" fill-opacity="0.72" />

    <!-- Mouth -->
    <path d="M 196 184 Q 203 196 210 186 Q 217 196 224 184" fill="none" stroke="${isDarkCoat ? '#FFFFFF' : strokeMain}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <ellipse cx="210" cy="182" rx="5" ry="3.5" fill="${coat.ear}" />

    <!-- Eyewear & Headwear -->
    ${renderEyewear(item.traits.eyewear, isDarkCoat)}
    ${renderHeadwear(item.traits.headwear, pal)}

    <!-- Pop-Art Desk -->
    <polygon points="28,288 392,288 420,420 0,420" fill="${deskColor}" stroke="${strokeMain}" stroke-width="6" stroke-linejoin="round" />
    <line x1="28" y1="308" x2="392" y2="308" stroke="${strokeMain}" stroke-width="3" stroke-opacity="0.16" />

    <!-- Instrument -->
    ${renderInstrument(item.traits.outfit)}

    <!-- Paws -->
    <g transform="translate(0, ${pawLiftLeft})">
      <path d="M 134 228 C 134 256, 152 272, 168 268 C 180 264, 178 242, 164 230" fill="${coat.fur}" stroke="${strokeMain}" stroke-width="5.5" stroke-linecap="round" />
      <circle cx="158" cy="256" r="5" fill="${coat.ear}" />
    </g>
    <g transform="translate(0, ${pawLiftRight})">
      <path d="M 286 228 C 286 256, 268 272, 252 268 C 240 264, 242 242, 256 230" fill="${coat.fur}" stroke="${strokeMain}" stroke-width="5.5" stroke-linecap="round" />
      <circle cx="262" cy="256" r="5" fill="${coat.ear}" />
    </g>

    ${
      item.status === 'reserved'
        ? `<g transform="translate(362, 54)">
             <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" fill="#FFD166" stroke="#18181B" stroke-width="3" />
           </g>`
        : ''
    }
  </svg>`;
}

async function main() {
  const tmpDir = '/tmp/bcat-svgs';
  const outDir = path.resolve(process.cwd(), 'public/artworks');
  fs.mkdirSync(tmpDir, { recursive: true });
  fs.mkdirSync(outDir, { recursive: true });

  const items: { id: string; svg: string }[] = [];
  for (const item of BONGO_COLLECTION) {
    const svg = buildSvg(item);
    const svgPath = path.join(tmpDir, `bcat-${item.paddedId}.svg`);
    fs.writeFileSync(svgPath, svg, 'utf8');
    items.push({ id: item.paddedId, svg });
  }

  fs.writeFileSync(path.join(tmpDir, 'items.json'), JSON.stringify(items), 'utf8');
  console.log(`Prepared ${BONGO_COLLECTION.length} SVGs in ${tmpDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
