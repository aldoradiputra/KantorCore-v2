/* KantorCore module icon set — 52 icons, duotone.
   Each icon's `svg` is the inner content of an <svg viewBox="0 0 48 48">.
   Root attrs (fill="none", stroke=A, stroke-width=1.5, linecap/linejoin=round)
   are inherited from a wrapping <svg> set at render time.
   Tokens:
     {A}   = Tone A primary hex
     {A15} = Tone A at 15% opacity (8-digit hex, alpha 26)
   Body shapes use fill="{A15}" stroke="none". Detail strokes inherit defaults.
*/
window.KC_ICONS = [
  // ───────── WORKSPACE — Indigo family ─────────
  { code: 'HOME', name: 'Home', sub: 'Beranda', group: 'workspace', toneA: '#3B4FC4',
    metaphor: 'A house with a pitched roof and a chimney.',
    svg: `
      <path d="M10 22 L24 11 L38 22 V37 H10 Z" fill="{A15}" stroke="none"/>
      <path d="M30 13 V19"/>
      <path d="M30 13 H34 V19"/>
      <path d="M8 23 L24 10 L40 23"/>
      <path d="M11 22 V38 H37 V22"/>
      <path d="M20 38 V29 H28 V38"/>
    ` },

  { code: 'IS-CHAT', name: 'Chat', sub: 'real-time conversation', group: 'workspace', toneA: '#3B4FC4',
    metaphor: 'Two overlapping speech bubbles with a lightning bolt inside.',
    svg: `
      <path d="M11 9 H30 Q34 9 34 13 V22 Q34 26 30 26 H18 L13 31 V26 H12 Q8 26 8 22 V13 Q8 9 12 9 Z" fill="{A15}" stroke="none"/>
      <path d="M11 9 H30 Q34 9 34 13 V22 Q34 26 30 26 H18 L13 31 V26 H12 Q8 26 8 22 V13 Q8 9 12 9 Z"/>
      <path d="M22 12 L17 19 H21 L20 23 L25 16 H21 Z" fill="{A}" stroke="none"/>
      <path d="M27 24 H38 Q40 24 40 26 V33 Q40 35 38 35 H33 V38 L30 35 H27 Q25 35 25 33 V26 Q25 24 27 24 Z" fill="{A15}" stroke="none"/>
      <path d="M27 24 H38 Q40 24 40 26 V33 Q40 35 38 35 H33 V38 L30 35 H27 Q25 35 25 33 V26 Q25 24 27 24 Z"/>
    ` },

  { code: 'IS-PROJ', name: 'Projects', sub: 'milestones &amp; delivery', group: 'workspace', toneA: '#3B4FC4',
    metaphor: 'A checkered racing flag — finish line, milestones.',
    svg: `
      <path d="M14 10 H38 V26 H14 Z" fill="{A15}" stroke="none"/>
      <rect x="14" y="10" width="24" height="16" rx="1"/>
      <line x1="22" y1="10" x2="22" y2="26"/>
      <line x1="30" y1="10" x2="30" y2="26"/>
      <line x1="14" y1="18" x2="38" y2="18"/>
      <rect x="14" y="10" width="8" height="8" fill="{A}" stroke="none"/>
      <rect x="30" y="10" width="8" height="8" fill="{A}" stroke="none"/>
      <rect x="22" y="18" width="8" height="8" fill="{A}" stroke="none"/>
      <line x1="13" y1="8" x2="13" y2="42"/>
    ` },

  { code: 'IS-TIME', name: 'Timesheets', sub: 'personal time tracking', group: 'workspace', toneA: '#5B6FE4',
    metaphor: 'A wristwatch with hour and minute hands.',
    svg: `
      <circle cx="24" cy="24" r="10" fill="{A15}" stroke="none"/>
      <path d="M19 14 L17 7 H31 L29 14" />
      <path d="M19 34 L17 41 H31 L29 34" />
      <circle cx="24" cy="24" r="10"/>
      <line x1="24" y1="16" x2="24" y2="17.5"/>
      <line x1="32" y1="24" x2="30.5" y2="24"/>
      <line x1="24" y1="32" x2="24" y2="30.5"/>
      <line x1="16" y1="24" x2="17.5" y2="24"/>
      <line x1="24" y1="24" x2="24" y2="18"/>
      <line x1="24" y1="24" x2="29" y2="22"/>
      <circle cx="24" cy="24" r="1.2" fill="{A}" stroke="none"/>
    ` },

  { code: 'IS-DOCS', name: 'Documents', sub: 'files &amp; text', group: 'workspace', toneA: '#3B4FC4',
    metaphor: 'A stack of paper with the top-right corner folded.',
    svg: `
      <path d="M11 11 H27 V35 H11 Z" fill="{A15}" stroke="none"/>
      <path d="M11 11 H27 V35 H11 Z"/>
      <path d="M16 16 H32 L38 22 V41 H16 Z" fill="{A15}" stroke="none"/>
      <path d="M16 16 H32 L38 22 V41 H16 Z"/>
      <path d="M32 16 V22 H38"/>
      <line x1="20" y1="28" x2="34" y2="28"/>
      <line x1="20" y1="32" x2="34" y2="32"/>
      <line x1="20" y1="36" x2="30" y2="36"/>
    ` },

  { code: 'IS-FLOW', name: 'Workflow', sub: 'Proses', group: 'workspace', toneA: '#5B6FE4',
    metaphor: 'Three circles of growing size connected by arrows.',
    svg: `
      <circle cx="11" cy="24" r="3.5" fill="{A15}" stroke="none"/>
      <circle cx="24" cy="24" r="5" fill="{A15}" stroke="none"/>
      <circle cx="38" cy="24" r="6" fill="{A15}" stroke="none"/>
      <circle cx="11" cy="24" r="3.5"/>
      <circle cx="24" cy="24" r="5"/>
      <circle cx="38" cy="24" r="6"/>
      <path d="M14.8 24 H18.5 M16.5 22.5 L18.5 24 L16.5 25.5"/>
      <path d="M29.2 24 H32 M30.3 22.5 L32 24 L30.3 25.5"/>
    ` },

  // ───────── APPS — Teal family ─────────
  { code: 'IS-CRM', name: 'CRM', sub: 'customer relationships', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A person silhouette with a small uptick chart beside.',
    svg: `
      <circle cx="17" cy="16" r="4.5" fill="{A15}" stroke="none"/>
      <path d="M9 33 V29 Q9 22 17 22 Q25 22 25 29 V33 Z" fill="{A15}" stroke="none"/>
      <circle cx="17" cy="16" r="4.5"/>
      <path d="M9 34 V29 Q9 22.5 17 22.5 Q25 22.5 25 29 V34"/>
      <path d="M29 32 L33.5 27 L36 29.5 L41 24"/>
      <path d="M37 24 H41 V28"/>
    ` },

  { code: 'IS-SALES', name: 'Sales', sub: 'Penjualan', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A tilted price tag with a string hole.',
    svg: `
      <g transform="rotate(-40 24 24)">
        <path d="M16 14 H36 Q39 14 39 17 V31 Q39 34 36 34 H16 L8 24 Z" fill="{A15}" stroke="none"/>
        <path d="M16 14 H36 Q39 14 39 17 V31 Q39 34 36 34 H16 L8 24 Z"/>
        <circle cx="15" cy="24" r="2"/>
      </g>
    ` },

  { code: 'IS-PURCH', name: 'Purchasing', sub: 'Pembelian', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A clipboard with a barcode — receiving supplier goods.',
    svg: `
      <path d="M12 12 H36 V40 H12 Z" fill="{A15}" stroke="none"/>
      <rect x="12" y="12" width="24" height="28" rx="2"/>
      <rect x="18" y="8" width="12" height="6" rx="1.5" fill="{A15}"/>
      <rect x="18" y="8" width="12" height="6" rx="1.5"/>
      <line x1="17" y1="22" x2="17" y2="32"/>
      <line x1="20" y1="22" x2="20" y2="32"/>
      <line x1="22.5" y1="22" x2="22.5" y2="32"/>
      <line x1="26" y1="22" x2="26" y2="32"/>
      <line x1="28.5" y1="22" x2="28.5" y2="32"/>
      <line x1="31" y1="22" x2="31" y2="32"/>
    ` },

  { code: 'IS-INV', name: 'Inventory', sub: 'warehouse', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A box drawn in flat 2D isometric projection.',
    svg: `
      <path d="M8 16 L24 8 L40 16 V32 L24 40 L8 32 Z" fill="{A15}" stroke="none"/>
      <path d="M8 16 L24 8 L40 16 V32 L24 40 L8 32 Z"/>
      <path d="M8 16 L24 24 L40 16"/>
      <line x1="24" y1="24" x2="24" y2="40"/>
      <path d="M14 13 L30 21" opacity="0.7"/>
    ` },

  { code: 'IS-FIN', name: 'Finance', sub: 'Keuangan', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A stack of three coins with a small uptick arrow.',
    svg: `
      <ellipse cx="15" cy="14" rx="9" ry="2.2" fill="{A15}" stroke="none"/>
      <path d="M6 14 V18 A9 2.2 0 0 0 24 18 V14" fill="{A15}" stroke="none"/>
      <ellipse cx="15" cy="22" rx="9" ry="2.2" fill="{A15}" stroke="none"/>
      <path d="M6 22 V26 A9 2.2 0 0 0 24 26 V22" fill="{A15}" stroke="none"/>
      <ellipse cx="15" cy="30" rx="9" ry="2.2" fill="{A15}" stroke="none"/>
      <path d="M6 30 V34 A9 2.2 0 0 0 24 34 V30" fill="{A15}" stroke="none"/>
      <ellipse cx="15" cy="14" rx="9" ry="2.2"/>
      <path d="M6 14 V18 A9 2.2 0 0 0 24 18 V14"/>
      <ellipse cx="15" cy="22" rx="9" ry="2.2"/>
      <path d="M6 22 V26 A9 2.2 0 0 0 24 26 V22"/>
      <ellipse cx="15" cy="30" rx="9" ry="2.2"/>
      <path d="M6 30 V34 A9 2.2 0 0 0 24 34 V30"/>
      <path d="M30 36 L36 30 L40 34"/>
      <path d="M40 28 V34 H34"/>
    ` },

  { code: 'IS-HR', name: 'HR', sub: 'SDM &amp; people', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'Two person silhouettes — a team.',
    svg: `
      <circle cx="29" cy="17" r="4" fill="{A15}" stroke="none"/>
      <path d="M22 35 V31 Q22 25 29 25 Q36 25 36 31 V35 Z" fill="{A15}" stroke="none"/>
      <circle cx="29" cy="17" r="4"/>
      <path d="M22 35 V31 Q22 25.2 29 25.2 Q36 25.2 36 31 V35"/>
      <circle cx="17" cy="15" r="5" fill="{A15}" stroke="none"/>
      <path d="M8 36 V31 Q8 23.5 17 23.5 Q26 23.5 26 31 V36 Z" fill="{A15}" stroke="none"/>
      <circle cx="17" cy="15" r="5"/>
      <path d="M8 37 V31 Q8 23.6 17 23.6 Q26 23.6 26 31 V37"/>
    ` },

  { code: 'IS-PAY', name: 'Payroll', sub: 'Penggajian', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A banknote with a circular denomination watermark.',
    svg: `
      <rect x="6" y="14" width="36" height="20" rx="2" fill="{A15}" stroke="none"/>
      <rect x="6" y="14" width="36" height="20" rx="2"/>
      <circle cx="24" cy="24" r="4"/>
      <line x1="11" y1="20" x2="13" y2="20"/>
      <line x1="11" y1="28" x2="13" y2="28"/>
      <line x1="35" y1="20" x2="37" y2="20"/>
      <line x1="35" y1="28" x2="37" y2="28"/>
    ` },

  { code: 'IS-RENT', name: 'Rental', sub: 'Sewa', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A building with a key — access to a leased asset.',
    svg: `
      <path d="M9 10 H29 V40 H9 Z" fill="{A15}" stroke="none"/>
      <rect x="9" y="10" width="20" height="30" rx="1"/>
      <rect x="13" y="14" width="4" height="4"/>
      <rect x="21" y="14" width="4" height="4"/>
      <rect x="13" y="22" width="4" height="4"/>
      <rect x="21" y="22" width="4" height="4"/>
      <rect x="16" y="32" width="6" height="8"/>
      <circle cx="34" cy="32" r="4" fill="{A15}"/>
      <circle cx="34" cy="32" r="4"/>
      <path d="M37 32 H43 M41 32 V35 M43 32 V34"/>
    ` },

  { code: 'IS-EMAIL', name: 'Email', sub: 'Workspace mail', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A closed envelope with an @ symbol.',
    svg: `
      <rect x="6" y="12" width="36" height="24" rx="2" fill="{A15}" stroke="none"/>
      <rect x="6" y="12" width="36" height="24" rx="2"/>
      <path d="M6 14 L24 26 L42 14"/>
      <circle cx="24" cy="24" r="3.5"/>
      <path d="M27.5 24 V25.5 Q27.5 27 26 27"/>
    ` },

  { code: 'IS-MTG', name: 'Meetings', sub: 'video calls', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A camcorder — video meetings.',
    svg: `
      <rect x="6" y="14" width="26" height="20" rx="2" fill="{A15}" stroke="none"/>
      <rect x="6" y="14" width="26" height="20" rx="2"/>
      <path d="M32 21 L42 16 V32 L32 27 Z" fill="{A15}" stroke="none"/>
      <path d="M32 21 L42 16 V32 L32 27 Z"/>
      <circle cx="13" cy="20" r="1.2" fill="{A}" stroke="none"/>
    ` },

  { code: 'IS-OMNI', name: 'Omnichannel', sub: 'unified inbox', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A hub-and-spoke diagram — many channels into one.',
    svg: `
      <circle cx="24" cy="24" r="6" fill="{A15}" stroke="none"/>
      <circle cx="24" cy="24" r="6"/>
      <line x1="24" y1="18" x2="24" y2="10"/>
      <line x1="24" y1="30" x2="24" y2="38"/>
      <line x1="20" y1="20" x2="13" y2="13"/>
      <line x1="28" y1="20" x2="35" y2="13"/>
      <line x1="28" y1="28" x2="35" y2="35"/>
      <line x1="20" y1="28" x2="13" y2="35"/>
      <circle cx="24" cy="8" r="2.5" fill="{A15}"/>
      <circle cx="24" cy="8" r="2.5"/>
      <circle cx="24" cy="40" r="2.5" fill="{A15}"/>
      <circle cx="24" cy="40" r="2.5"/>
      <circle cx="11" cy="11" r="2.5" fill="{A15}"/>
      <circle cx="11" cy="11" r="2.5"/>
      <circle cx="37" cy="11" r="2.5" fill="{A15}"/>
      <circle cx="37" cy="11" r="2.5"/>
      <circle cx="37" cy="37" r="2.5" fill="{A15}"/>
      <circle cx="37" cy="37" r="2.5"/>
      <circle cx="11" cy="37" r="2.5" fill="{A15}"/>
      <circle cx="11" cy="37" r="2.5"/>
    ` },

  { code: 'IS-MFG', name: 'Manufacturing', sub: 'factory floor', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A factory building with smokestacks.',
    svg: `
      <path d="M6 22 H14 V14 H18 V22 H42 V40 H6 Z" fill="{A15}" stroke="none"/>
      <path d="M6 22 H14 V14 H18 V22 H42 V40 H6 Z"/>
      <rect x="14" y="8" width="2.5" height="6"/>
      <rect x="19" y="8" width="2.5" height="6"/>
      <rect x="21" y="33" width="6" height="7"/>
      <rect x="30" y="26" width="4" height="4"/>
      <rect x="36" y="26" width="4" height="4"/>
    ` },

  { code: 'IS-HD', name: 'Help Desk', sub: 'customer support', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A headset with a boom microphone.',
    svg: `
      <path d="M8 26 V22 A16 16 0 0 1 40 22 V26" fill="{A15}" stroke="none"/>
      <path d="M8 26 V22 A16 16 0 0 1 40 22 V26"/>
      <rect x="6" y="25" width="6" height="11" rx="2" fill="{A15}"/>
      <rect x="6" y="25" width="6" height="11" rx="2"/>
      <rect x="36" y="25" width="6" height="11" rx="2" fill="{A15}"/>
      <rect x="36" y="25" width="6" height="11" rx="2"/>
      <path d="M36 33 H30 Q26 33 26 37 V40"/>
      <circle cx="26" cy="40" r="1.5" fill="{A}" stroke="none"/>
    ` },

  { code: 'IS-KMS', name: 'Knowledge', sub: 'KMS &amp; insight', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'An open book with a lightbulb above the right page.',
    svg: `
      <path d="M6 14 H22 V38 H6 Z M22 14 H42 V38 H22 Z" fill="{A15}" stroke="none"/>
      <path d="M22 16 Q14 14 6 16 V38 Q14 36 22 38 Z"/>
      <path d="M22 16 Q30 14 42 16 V38 Q30 36 22 38 Z"/>
      <line x1="10" y1="22" x2="18" y2="22"/>
      <line x1="10" y1="26" x2="18" y2="26"/>
      <line x1="10" y1="30" x2="16" y2="30"/>
      <path d="M32 22 A4 4 0 1 1 36 28 V30 H30 V28 A4 4 0 0 1 32 22 Z" fill="{A15}"/>
      <path d="M32 22 A4 4 0 1 1 36 28 V30 H30 V28 A4 4 0 0 1 32 22 Z"/>
      <line x1="31" y1="32" x2="35" y2="32"/>
    ` },

  { code: 'IS-PLAN', name: 'Planning', sub: 'forecasting', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A calendar grid with an uptick arrow.',
    svg: `
      <rect x="6" y="10" width="30" height="30" rx="2" fill="{A15}" stroke="none"/>
      <rect x="6" y="10" width="30" height="30" rx="2"/>
      <line x1="6" y1="18" x2="36" y2="18"/>
      <line x1="16" y1="18" x2="16" y2="40"/>
      <line x1="26" y1="18" x2="26" y2="40"/>
      <line x1="6" y1="26" x2="36" y2="26"/>
      <line x1="6" y1="33" x2="36" y2="33"/>
      <path d="M16 36 L24 28 L30 32 L38 22"/>
      <path d="M34 22 H38 V26"/>
    ` },

  { code: 'IS-FLEET', name: 'Fleet', sub: 'vehicles &amp; delivery', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A delivery truck with cab, cargo box and wheels.',
    svg: `
      <path d="M4 18 H28 V32 H4 Z M28 22 H38 L42 26 V32 H28 Z" fill="{A15}" stroke="none"/>
      <path d="M4 18 H28 V32 H4 Z"/>
      <path d="M28 22 H37 L42 27 V32 H28"/>
      <line x1="28" y1="22" x2="28" y2="32"/>
      <circle cx="12" cy="34" r="3" fill="#FFFFFF"/>
      <circle cx="12" cy="34" r="3"/>
      <circle cx="34" cy="34" r="3" fill="#FFFFFF"/>
      <circle cx="34" cy="34" r="3"/>
    ` },

  { code: 'IS-EVT', name: 'Events', sub: 'highlighted dates', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A tear-off calendar page with a star in the center.',
    svg: `
      <path d="M8 14 H40 V40 H8 Z" fill="{A15}" stroke="none"/>
      <path d="M8 14 H40 V40 Q40 41.5 38.5 41.5 H9.5 Q8 41.5 8 40 Z"/>
      <path d="M8 14 L10 12 L12 14 L14 12 L16 14 L18 12 L20 14 L22 12 L24 14 L26 12 L28 14 L30 12 L32 14 L34 12 L36 14 L38 12 L40 14"/>
      <path d="M24 22 L26 27 L31.5 27 L27 30.5 L29 36 L24 32.5 L19 36 L21 30.5 L16.5 27 L22 27 Z" fill="{A15}"/>
      <path d="M24 22 L26 27 L31.5 27 L27 30.5 L29 36 L24 32.5 L19 36 L21 30.5 L16.5 27 L22 27 Z"/>
    ` },

  { code: 'IS-SRV', name: 'Field Service', sub: 'on-site work', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A map pin with a wrench inside.',
    svg: `
      <path d="M24 7 Q11 7 11 20 Q11 30 24 41 Q37 30 37 20 Q37 7 24 7 Z" fill="{A15}" stroke="none"/>
      <path d="M24 7 Q11 7 11 20 Q11 30 24 41 Q37 30 37 20 Q37 7 24 7 Z"/>
      <path d="M27 14 A3.5 3.5 0 1 0 22 19 L18 23 L21 26 L25 22 A3.5 3.5 0 0 0 27 14 Z"/>
    ` },

  { code: 'IS-SUB', name: 'Subscriptions', sub: 'recurring billing', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A credit card wrapped in a circular refresh arrow.',
    svg: `
      <rect x="13" y="17" width="22" height="14" rx="2" fill="{A15}" stroke="none"/>
      <rect x="13" y="17" width="22" height="14" rx="2"/>
      <line x1="13" y1="22" x2="35" y2="22"/>
      <line x1="17" y1="27" x2="22" y2="27"/>
      <path d="M40 18 A18 18 0 0 0 8 18 L8 13 M8 18 H13"/>
      <path d="M8 30 A18 18 0 0 0 40 30 L40 35 M40 30 H35"/>
    ` },

  { code: 'IS-OKR', name: 'OKR &amp; Goals', sub: 'targets', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A bullseye with an arrow striking the center.',
    svg: `
      <circle cx="22" cy="26" r="13" fill="{A15}" stroke="none"/>
      <circle cx="22" cy="26" r="13"/>
      <circle cx="22" cy="26" r="8"/>
      <circle cx="22" cy="26" r="3" fill="{A}" stroke="none"/>
      <line x1="22" y1="26" x2="38" y2="10"/>
      <path d="M34 8 L40 8 L40 14"/>
    ` },

  { code: 'IS-COMP', name: 'Compliance', sub: 'verified &amp; protected', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A shield with a bold checkmark.',
    svg: `
      <path d="M24 7 L10 12 V22 Q10 33 24 41 Q38 33 38 22 V12 Z" fill="{A15}" stroke="none"/>
      <path d="M24 7 L10 12 V22 Q10 33 24 41 Q38 33 38 22 V12 Z"/>
      <path d="M17 23 L22 28 L31 18" stroke-width="2.5"/>
    ` },

  { code: 'IS-MAINT', name: 'Maintenance', sub: 'repair &amp; service', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A wrench and screwdriver crossed in an X.',
    svg: `
      <g transform="rotate(45 24 24)">
        <path d="M24 6 A4 4 0 0 0 21 13 L21 36 A3 3 0 0 0 27 36 L27 13 A4 4 0 0 0 24 6 Z" fill="{A15}" stroke="none"/>
        <path d="M24 6 A4 4 0 0 0 21 13 L21 36 A3 3 0 0 0 27 36 L27 13 A4 4 0 0 0 24 6 Z"/>
        <line x1="21" y1="13" x2="27" y2="13"/>
      </g>
      <g transform="rotate(-45 24 24)">
        <path d="M22 7 L26 7 L26 13 L28 13 L24 19 L20 13 L22 13 Z" fill="{A15}" stroke="none"/>
        <path d="M22 7 L26 7 L26 13 L28 13 L24 19 L20 13 L22 13 Z"/>
        <rect x="22.5" y="19" width="3" height="20" rx="1" fill="{A15}"/>
        <rect x="22.5" y="19" width="3" height="20" rx="1"/>
      </g>
    ` },

  { code: 'IS-PORTAL', name: 'Customer Portal', sub: 'self-service gateway', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'An archway with a person walking through.',
    svg: `
      <path d="M8 40 V20 A16 12 0 0 1 40 20 V40" fill="{A15}" stroke="none"/>
      <path d="M8 40 V20 A16 12 0 0 1 40 20 V40"/>
      <path d="M13 40 V21 A11 8 0 0 1 35 21 V40"/>
      <circle cx="20" cy="19" r="2.5" fill="{A15}"/>
      <circle cx="20" cy="19" r="2.5"/>
      <path d="M16 33 V27 Q16 23.5 20 23.5 Q24 23.5 24 27 V31 L26 36 L22 36 L22 40"/>
    ` },

  { code: 'IS-TEL', name: 'Telephony', sub: 'voice calls', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A classic telephone handset.',
    svg: `
      <g transform="rotate(-30 24 24)">
        <path d="M14 7 H20 Q24 7 24 12 V20 H24 V28 H24 V36 Q24 41 20 41 H14 Q10 41 10 36 V28 H10 V20 H10 V12 Q10 7 14 7 Z" fill="{A15}" stroke="none"/>
        <path d="M14 7 H20 Q24 7 24 12 V20 Q24 21 23 21 H11 Q10 21 10 20 V12 Q10 7 14 7 Z"/>
        <path d="M14 41 H20 Q24 41 24 36 V28 Q24 27 23 27 H11 Q10 27 10 28 V36 Q10 41 14 41 Z"/>
        <path d="M16 21 V27 M18 21 V27"/>
      </g>
    ` },

  { code: 'IS-PUB', name: 'Publishing', sub: 'broadcast', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A megaphone with sound waves.',
    svg: `
      <path d="M8 19 H22 L34 11 V37 L22 29 H8 Z" fill="{A15}" stroke="none"/>
      <path d="M8 19 H22 L34 11 V37 L22 29 H8 Z"/>
      <line x1="8" y1="19" x2="8" y2="29"/>
      <path d="M14 29 V36 Q14 38 16 38 H18 Q20 38 20 36 V29"/>
      <path d="M37 17 Q40 21 40 24 Q40 27 37 31"/>
      <path d="M40 14 Q44 19 44 24 Q44 29 40 34"/>
    ` },

  { code: 'IS-B2B', name: 'B2B Commerce', sub: 'business-to-business', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'Two buildings facing each other with a handshake between.',
    svg: `
      <path d="M4 16 H14 V38 H4 Z" fill="{A15}" stroke="none"/>
      <rect x="4" y="16" width="10" height="22" rx="0.5"/>
      <line x1="6" y1="20" x2="8" y2="20"/>
      <line x1="10" y1="20" x2="12" y2="20"/>
      <line x1="6" y1="24" x2="8" y2="24"/>
      <line x1="10" y1="24" x2="12" y2="24"/>
      <path d="M34 16 H44 V38 H34 Z" fill="{A15}" stroke="none"/>
      <rect x="34" y="16" width="10" height="22" rx="0.5"/>
      <line x1="36" y1="20" x2="38" y2="20"/>
      <line x1="40" y1="20" x2="42" y2="20"/>
      <line x1="36" y1="24" x2="38" y2="24"/>
      <line x1="40" y1="24" x2="42" y2="24"/>
      <path d="M16 28 L20 24 L24 28 L20 32 Z" fill="{A15}"/>
      <path d="M16 28 L20 24 L24 28 L20 32 Z"/>
      <path d="M24 28 L28 24 L32 28 L28 32 Z" fill="{A15}"/>
      <path d="M24 28 L28 24 L32 28 L28 32 Z"/>
    ` },

  { code: 'IS-ECOM', name: 'E-commerce', sub: 'storefront', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A storefront with a striped awning, window and door.',
    svg: `
      <path d="M6 18 H42 V40 H6 Z" fill="{A15}" stroke="none"/>
      <path d="M6 14 H42 L40 18 H8 Z" fill="{A15}"/>
      <path d="M6 14 H42 L40 18 H8 Z"/>
      <line x1="14" y1="14" x2="13" y2="18"/>
      <line x1="22" y1="14" x2="21" y2="18"/>
      <line x1="30" y1="14" x2="29" y2="18"/>
      <line x1="38" y1="14" x2="37" y2="18"/>
      <path d="M8 18 V40 H40 V18"/>
      <rect x="12" y="22" width="10" height="10"/>
      <rect x="26" y="22" width="10" height="14"/>
      <line x1="31" y1="22" x2="31" y2="36"/>
    ` },

  { code: 'IS-STU', name: 'Student', sub: 'education', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A graduation cap with a tassel.',
    svg: `
      <path d="M4 20 L24 11 L44 20 L24 29 Z" fill="{A15}" stroke="none"/>
      <path d="M4 20 L24 11 L44 20 L24 29 Z"/>
      <path d="M12 24 V33 Q12 37 24 37 Q36 37 36 33 V24" fill="{A15}"/>
      <path d="M12 24 V33 Q12 37 24 37 Q36 37 36 33 V24"/>
      <path d="M40 22 V30"/>
      <circle cx="40" cy="32" r="1.5" fill="{A}" stroke="none"/>
    ` },

  { code: 'IS-IOT', name: 'IoT', sub: 'connected devices', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A microchip with pins on each side.',
    svg: `
      <rect x="14" y="14" width="20" height="20" rx="2" fill="{A15}" stroke="none"/>
      <rect x="14" y="14" width="20" height="20" rx="2"/>
      <rect x="19" y="19" width="10" height="10"/>
      <line x1="19" y1="14" x2="19" y2="10"/>
      <line x1="24" y1="14" x2="24" y2="10"/>
      <line x1="29" y1="14" x2="29" y2="10"/>
      <line x1="19" y1="34" x2="19" y2="38"/>
      <line x1="24" y1="34" x2="24" y2="38"/>
      <line x1="29" y1="34" x2="29" y2="38"/>
      <line x1="14" y1="19" x2="10" y2="19"/>
      <line x1="14" y1="24" x2="10" y2="24"/>
      <line x1="14" y1="29" x2="10" y2="29"/>
      <line x1="34" y1="19" x2="38" y2="19"/>
      <line x1="34" y1="24" x2="38" y2="24"/>
      <line x1="34" y1="29" x2="38" y2="29"/>
    ` },

  { code: 'IS-FS', name: 'Financial Services', sub: 'bank', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A classical bank building — pediment with columns.',
    svg: `
      <path d="M6 16 L24 7 L42 16 V20 H6 Z" fill="{A15}" stroke="none"/>
      <path d="M6 16 L24 7 L42 16 V20 H6 Z"/>
      <rect x="10" y="22" width="3" height="14" fill="{A15}"/>
      <rect x="10" y="22" width="3" height="14"/>
      <rect x="22.5" y="22" width="3" height="14" fill="{A15}"/>
      <rect x="22.5" y="22" width="3" height="14"/>
      <rect x="35" y="22" width="3" height="14" fill="{A15}"/>
      <rect x="35" y="22" width="3" height="14"/>
      <line x1="6" y1="40" x2="42" y2="40"/>
    ` },

  { code: 'IS-PLM', name: 'Product Lifecycle', sub: 'concept to EOL', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A product box surrounded by a 360° lifecycle loop.',
    svg: `
      <rect x="18" y="18" width="12" height="12" rx="1" fill="{A15}" stroke="none"/>
      <rect x="18" y="18" width="12" height="12" rx="1"/>
      <line x1="18" y1="22" x2="30" y2="22"/>
      <path d="M40 24 A16 16 0 1 0 24 40" />
      <path d="M40 18 V24 H34"/>
    ` },

  { code: 'IS-LMS', name: 'Learning', sub: 'LMS courses', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A monitor with a play triangle — video courses.',
    svg: `
      <rect x="6" y="10" width="36" height="24" rx="2" fill="{A15}" stroke="none"/>
      <rect x="6" y="10" width="36" height="24" rx="2"/>
      <path d="M20 17 L30 22 L20 27 Z" fill="{A}" stroke="none"/>
      <line x1="18" y1="40" x2="30" y2="40"/>
      <line x1="24" y1="34" x2="24" y2="40"/>
    ` },

  { code: 'IS-IND', name: 'Industries', sub: 'verticals', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A diamond divided into 4 quadrants — many industries.',
    svg: `
      <path d="M24 6 L42 24 L24 42 L6 24 Z" fill="{A15}" stroke="none"/>
      <path d="M24 6 L42 24 L24 42 L6 24 Z"/>
      <path d="M6 24 H42 M24 6 V42"/>
      <rect x="15" y="13" width="3" height="6" fill="{A}" stroke="none"/>
      <rect x="29" y="14" width="6" height="5" fill="{A}" stroke="none"/>
      <circle cx="17" cy="32" r="2.5" fill="{A}" stroke="none"/>
      <path d="M29 32 L32 28 L35 32 L32 36 Z" fill="{A}" stroke="none"/>
    ` },

  { code: 'IS-TPL', name: 'Templates', sub: 'starting points', group: 'apps', toneA: '#1A9E8A',
    metaphor: 'A stack of cards with a spark.',
    svg: `
      <rect x="16" y="14" width="22" height="22" rx="2" fill="{A15}" stroke="none"/>
      <rect x="12" y="10" width="22" height="22" rx="2" fill="{A15}"/>
      <rect x="16" y="14" width="22" height="22" rx="2"/>
      <rect x="12" y="10" width="22" height="22" rx="2"/>
      <line x1="17" y1="17" x2="29" y2="17"/>
      <line x1="17" y1="21" x2="29" y2="21"/>
      <line x1="17" y1="25" x2="25" y2="25"/>
      <path d="M40 6 L42 10 L46 12 L42 14 L40 18 L38 14 L34 12 L38 10 Z" fill="{A}" stroke="none" transform="translate(-3 -1) scale(0.8) translate(3 1)"/>
    ` },

  { code: 'IS-EXT', name: 'Extensions', sub: 'plugins', group: 'apps', toneA: '#0F7B6C',
    metaphor: 'A jigsaw puzzle piece.',
    svg: `
      <path d="M10 10 H20 V14 A3 3 0 0 0 26 14 V10 H36 V20 H32 A3 3 0 0 0 32 26 H36 V36 H26 V32 A3 3 0 0 0 20 32 V36 H10 V26 H14 A3 3 0 0 0 14 20 H10 Z" fill="{A15}" stroke="none"/>
      <path d="M10 10 H20 V14 A3 3 0 0 0 26 14 V10 H36 V20 H32 A3 3 0 0 0 32 26 H36 V36 H26 V32 A3 3 0 0 0 20 32 V36 H10 V26 H14 A3 3 0 0 0 14 20 H10 Z"/>
    ` },

  // ───────── PLATFORM — Amber-gold family ─────────
  { code: 'IS-AIP', name: 'AI Platform', sub: 'models &amp; intelligence', group: 'platform', toneA: '#B35A00',
    metaphor: 'A prism refracting a single ray into a spectrum fan.',
    svg: `
      <path d="M22 8 L34 32 L10 32 Z" fill="{A15}" stroke="none"/>
      <path d="M22 8 L34 32 L10 32 Z"/>
      <line x1="2" y1="20" x2="18" y2="20"/>
      <line x1="28" y1="20" x2="42" y2="14"/>
      <line x1="28" y1="22" x2="42" y2="22"/>
      <line x1="28" y1="24" x2="42" y2="30"/>
      <line x1="28" y1="26" x2="42" y2="38"/>
    ` },

  { code: 'IS-AGENT', name: 'Agent Runtime', sub: 'autonomous workers', group: 'platform', toneA: '#D4750A',
    metaphor: 'A friendly robot face with antenna.',
    svg: `
      <rect x="8" y="14" width="32" height="26" rx="6" fill="{A15}" stroke="none"/>
      <rect x="8" y="14" width="32" height="26" rx="6"/>
      <line x1="24" y1="14" x2="24" y2="9"/>
      <circle cx="24" cy="7" r="2" fill="{A15}"/>
      <circle cx="24" cy="7" r="2"/>
      <circle cx="18" cy="25" r="2.5" fill="{A}" stroke="none"/>
      <circle cx="30" cy="25" r="2.5" fill="{A}" stroke="none"/>
      <line x1="19" y1="32" x2="29" y2="32"/>
    ` },

  { code: 'IS-TRIG', name: 'Triggers', sub: 'automation', group: 'platform', toneA: '#B35A00',
    metaphor: 'A lightning bolt inside a circle.',
    svg: `
      <circle cx="24" cy="24" r="16" fill="{A15}" stroke="none"/>
      <circle cx="24" cy="24" r="16"/>
      <path d="M26 12 L17 26 H23 L22 36 L31 22 H25 Z" fill="{A}" stroke="none"/>
    ` },

  { code: 'IS-MIG', name: 'Migration', sub: 'data import', group: 'platform', toneA: '#D4750A',
    metaphor: 'A legacy table on the left, new system on the right, big arrow between.',
    svg: `
      <rect x="4" y="12" width="14" height="24" rx="1" fill="{A15}" stroke="none"/>
      <rect x="4" y="12" width="14" height="24" rx="1"/>
      <line x1="4" y1="18" x2="18" y2="18"/>
      <line x1="4" y1="24" x2="18" y2="24"/>
      <line x1="4" y1="30" x2="18" y2="30"/>
      <line x1="11" y1="12" x2="11" y2="36"/>
      <rect x="30" y="12" width="14" height="24" rx="1" fill="{A15}"/>
      <rect x="30" y="12" width="14" height="24" rx="1"/>
      <path d="M20 24 H28 M25 21 L28 24 L25 27" stroke-width="2"/>
    ` },

  { code: 'IS-L10N', name: 'Localization', sub: 'multilingual', group: 'platform', toneA: '#B35A00',
    metaphor: 'A globe with a translation speech bubble.',
    svg: `
      <circle cx="20" cy="22" r="12" fill="{A15}" stroke="none"/>
      <circle cx="20" cy="22" r="12"/>
      <line x1="8" y1="22" x2="32" y2="22"/>
      <path d="M20 10 Q12 22 20 34 Q28 22 20 10"/>
      <path d="M28 28 H40 Q42 28 42 30 V36 Q42 38 40 38 H37 V41 L34 38 H28 Q26 38 26 36 V30 Q26 28 28 28 Z" fill="#FFFFFF"/>
      <path d="M28 28 H40 Q42 28 42 30 V36 Q42 38 40 38 H37 V41 L34 38 H28 Q26 38 26 36 V30 Q26 28 28 28 Z"/>
      <path d="M30 35 L32 31 L34 35 M30.7 33.5 H33.3" stroke-width="1"/>
      <path d="M38 33 Q38 36 36 36" stroke-width="1"/>
    ` },

  { code: 'IS-MOB', name: 'Mobile PWA', sub: 'offline-ready', group: 'platform', toneA: '#D4750A',
    metaphor: 'A smartphone with a lightning bolt on screen.',
    svg: `
      <rect x="14" y="6" width="20" height="36" rx="3" fill="{A15}" stroke="none"/>
      <rect x="14" y="6" width="20" height="36" rx="3"/>
      <circle cx="24" cy="9.5" r="0.7" fill="{A}" stroke="none"/>
      <line x1="21" y1="38.5" x2="27" y2="38.5"/>
      <path d="M25 14 L19 25 H23 L22 33 L29 22 H25 Z" fill="{A}" stroke="none"/>
    ` },

  { code: 'IS-CHAT-FED', name: 'Chat Federation', sub: 'cross-tenant', group: 'platform', toneA: '#B35A00',
    metaphor: 'Two speech bubbles linked by a chain in the middle.',
    svg: `
      <path d="M5 10 H17 Q20 10 20 13 V21 Q20 24 17 24 H11 L7 28 V24 H6 Q4 24 4 22 V13 Q4 10 5 10 Z" fill="{A15}" stroke="none"/>
      <path d="M5 10 H17 Q20 10 20 13 V21 Q20 24 17 24 H11 L7 28 V24 H6 Q4 24 4 22 V13 Q4 10 5 10 Z"/>
      <path d="M31 24 H43 Q44 24 44 25 V33 Q44 36 41 36 H37 L41 40 V36 H42 Q44 36 44 34 V25 Q44 24 43 24 Z" fill="{A15}"/>
      <path d="M31 24 H43 Q44 24 44 25 V33 Q44 36 41 36 H37 L41 40 V36 H42 Q44 36 44 34 V25 Q44 24 43 24 Z" transform="scale(-1 1) translate(-48 0)"/>
      <path d="M20 24 L28 24" stroke-width="2"/>
      <circle cx="20" cy="24" r="2.5" fill="#FFFFFF"/>
      <circle cx="20" cy="24" r="2.5"/>
      <circle cx="28" cy="24" r="2.5" fill="#FFFFFF"/>
      <circle cx="28" cy="24" r="2.5"/>
    ` },

  // ───────── CORE UI — Navy ─────────
  { code: 'UI-SETTINGS', name: 'Settings', sub: 'gear', group: 'ui', toneA: '#1A2B5A',
    metaphor: 'An 8-tooth gear with a central hole.',
    svg: `
      <path d="M24 6 L27 9 H32 V14 L35 17 L38 14 L42 18 L39 21 L42 24 L42 28 L37 28 L35 31 L38 35 L34 38 L32 36 H27 V42 H21 V36 H16 L13 38 L10 35 L13 31 L11 28 H6 V24 L9 21 L6 18 L10 14 L13 17 L16 14 V9 H21 Z" fill="{A15}" stroke="none"/>
      <path d="M24 4 V8 M24 40 V44 M4 24 H8 M40 24 H44 M8 8 L11 11 M37 37 L40 40 M8 40 L11 37 M40 8 L37 11" stroke-width="0"/>
      <circle cx="24" cy="24" r="13" fill="{A15}"/>
      <path d="M24 8 L26.5 11 H30 V14.5 L32.5 17 L35.5 14.5 L37.5 17 L35 19.5 L37 22 H40 V26 H37 L35 28.5 L37.5 31 L35.5 33 L32.5 30.5 L30 33 V36 H26.5 L24 39 L21.5 36 H18 V33 L15.5 30.5 L12.5 33 L10.5 31 L13 28.5 L11 26 H8 V22 H11 L13 19.5 L10.5 17 L12.5 14.5 L15.5 17 L18 14.5 V11 H21.5 Z"/>
      <circle cx="24" cy="24" r="4.5"/>
    ` },

  { code: 'UI-ADMIN', name: 'Admin', sub: 'security policy', group: 'ui', toneA: '#1A2B5A',
    metaphor: 'A shield with a crown inside — elevated privilege.',
    svg: `
      <path d="M24 9 L10 14 V23 Q10 34 24 41 Q38 34 38 23 V14 Z" fill="{A15}" stroke="none"/>
      <path d="M24 9 L10 14 V23 Q10 34 24 41 Q38 34 38 23 V14 Z"/>
      <path d="M16 22 L19 26 L24 21 L29 26 L32 22 V30 H16 Z" fill="{A15}"/>
      <path d="M16 22 L19 26 L24 21 L29 26 L32 22 V30 H16 Z"/>
      <circle cx="16" cy="22" r="1.2" fill="{A}" stroke="none"/>
      <circle cx="24" cy="20" r="1.2" fill="{A}" stroke="none"/>
      <circle cx="32" cy="22" r="1.2" fill="{A}" stroke="none"/>
    ` },

  { code: 'UI-AUDIT', name: 'Audit Log', sub: 'history', group: 'ui', toneA: '#1A2B5A',
    metaphor: 'A scroll of paper with rolled ends.',
    svg: `
      <path d="M10 12 H34 Q38 12 38 15 V35 Q38 38 34 38 H14 Q10 38 10 35 Z" fill="{A15}" stroke="none"/>
      <path d="M10 12 H34 Q38 12 38 15 V35 Q38 38 34 38 H14 Q10 38 10 35 Z"/>
      <path d="M10 12 Q14 12 14 15 V35 Q14 38 10 38 Q6 38 6 35 V15 Q6 12 10 12 Z" fill="#FFFFFF"/>
      <path d="M10 12 Q14 12 14 15 V35 Q14 38 10 38 Q6 38 6 35 V15 Q6 12 10 12 Z"/>
      <line x1="18" y1="20" x2="32" y2="20"/>
      <line x1="18" y1="25" x2="32" y2="25"/>
      <line x1="18" y1="30" x2="28" y2="30"/>
    ` },

  { code: 'UI-NOTIF', name: 'Notification', sub: 'bell', group: 'ui', toneA: '#1A2B5A',
    metaphor: 'A bell with a clapper.',
    svg: `
      <path d="M11 32 Q11 18 24 18 Q37 18 37 32 Z" fill="{A15}" stroke="none"/>
      <path d="M24 10 V14"/>
      <path d="M24 14 Q11 14 11 30 Q11 32 9 33 V35 H39 V33 Q37 32 37 30 Q37 14 24 14 Z"/>
      <path d="M20 38 Q20 42 24 42 Q28 42 28 38"/>
      <circle cx="24" cy="40" r="1.2" fill="{A}" stroke="none"/>
    ` },
];
