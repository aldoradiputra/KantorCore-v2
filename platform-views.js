/* KantorCore Platform Engine — static data for the wireframe views */

// ---- Orchestrator node properties (slide-out panel) ----
window.KC_NODES = {
  trigger: {
    kind: 'Trigger', badgeClass: 'text-amber bg-amber-50', title: 'New Invoice Created',
    fields: [
      { label: 'Source model', type: 'select', value: 'res.invoice' },
      { label: 'Event', type: 'select', value: 'on_create' },
      { label: 'Filter', type: 'code', value: 'state == "draft"\n&& move_type == "out_invoice"' },
      { label: 'Debounce', type: 'toggle', value: true, help: 'Collapse bursts within 5s into one run.' },
    ],
    foot: 'Fires ~120×/day · avg 2.1s to first action',
  },
  condition: {
    kind: 'Condition', badgeClass: 'text-slate-500 bg-slate-100', title: 'Amount threshold',
    fields: [
      { label: 'Expression', type: 'code', value: 'record.amount_total > 5_000_000' },
      { label: 'If true', type: 'select', value: '→ Request Manager Approval' },
      { label: 'If false', type: 'select', value: '→ Auto-post to Ledger' },
    ],
    foot: '63% of runs take the approval branch',
  },
  approval: {
    kind: 'Approval', badgeClass: 'text-brand bg-brand-50', title: 'Manager Approval',
    fields: [
      { label: 'Approver', type: 'select', value: 'record.manager_id (Budi S.)' },
      { label: 'Channel', type: 'select', value: 'IS-CHAT + Email' },
      { label: 'SLA', type: 'text', value: '24 hours' },
      { label: 'On timeout', type: 'select', value: 'Escalate to Finance Lead' },
      { label: 'Require comment on reject', type: 'toggle', value: true },
    ],
    foot: 'Median approval time 3h 12m',
  },
  action: {
    kind: 'Action · API', badgeClass: 'text-teal bg-teal-50', title: 'Post to Ledger',
    fields: [
      { label: 'Method', type: 'select', value: 'POST' },
      { label: 'Endpoint', type: 'text', value: '/api/v1/invoices/:id/post' },
      { label: 'Payload', type: 'code', value: '{\n  "posted_by": "{{run.user}}",\n  "journal": "INV"\n}' },
      { label: 'Retry on 5xx', type: 'toggle', value: true },
    ],
    foot: 'Calls Layer 1 · res.invoice.post()',
  },
  notify: {
    kind: 'Notify', badgeClass: 'text-slate-500 bg-slate-100', title: 'Send Chat message',
    fields: [
      { label: 'App', type: 'select', value: 'IS-CHAT' },
      { label: 'Channel', type: 'text', value: '#finance' },
      { label: 'Template', type: 'code', value: 'Invoice {{record.name}} posted ✓\nRp {{record.amount_total}}' },
    ],
    foot: 'Delivered to 8 members',
  },
};

// small inline icon helper
const I = (p) => `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

window.KC_DATA = {
  // ---- View 1: schemas ----
  schemas: [
    { name: 'Users',      model: 'res.users',    fields: 24, records: '1,204',  core: true,  api: 'REST + GQL', bind: ['HR App'] },
    { name: 'Invoices',   model: 'res.invoice',  fields: 38, records: '18,940', core: true,  api: 'REST + GQL', bind: ['Approval WF','Expense App'] },
    { name: 'Inventory',  model: 'stock.quant',  fields: 19, records: '52,310', core: true,  api: 'REST + GQL', bind: ['Reorder WF'] },
    { name: 'Partners',   model: 'res.partner',  fields: 31, records: '6,772',  core: true,  api: 'REST + GQL', bind: ['CRM App'] },
    { name: 'Expenses',   model: 'res.expense',  fields: 16, records: '3,418',  core: false, api: 'REST + GQL', bind: ['Expense App'] },
    { name: 'Sales Order',model: 'sale.order',   fields: 27, records: '9,051',  core: false, api: 'REST + GQL', bind: [] },
    { name: 'Products',   model: 'product.tmpl', fields: 22, records: '2,108',  core: false, api: 'REST only',  bind: [] },
    { name: 'Journals',   model: 'account.move', fields: 41, records: '44,209', core: true,  api: 'REST only',  bind: ['Approval WF'] },
  ],
  // ---- View 1: traffic graph (per 3h bucket: ok/warn/err heights in px) ----
  traffic: [
    {ok:34,warn:4,err:1},{ok:28,warn:3,err:0},{ok:22,warn:2,err:1},{ok:40,warn:5,err:2},
    {ok:62,warn:7,err:1},{ok:78,warn:9,err:3},{ok:71,warn:6,err:1},{ok:88,warn:8,err:2},
    {ok:95,warn:10,err:2},{ok:82,warn:7,err:1},{ok:69,warn:6,err:4},{ok:74,warn:5,err:1},
    {ok:90,warn:9,err:2},{ok:101,warn:8,err:1},{ok:86,warn:6,err:2},{ok:58,warn:4,err:1},
    {ok:44,warn:3,err:1},{ok:36,warn:3,err:0},{ok:52,warn:5,err:2},{ok:67,warn:6,err:1},
    {ok:79,warn:7,err:2},{ok:63,warn:5,err:1},{ok:48,warn:4,err:1},{ok:38,warn:3,err:1},
  ],
  apiKeys: [
    { id:1, name:'Workspace Web Client', key:'kc_live_pk_2f9a…c41', scope:'read/write', used:'1.2k req/m' },
    { id:2, name:'Mobile PWA',           key:'kc_live_pk_77be…9d2', scope:'read/write', used:'340 req/m' },
    { id:3, name:'Power BI Connector',   key:'kc_live_rk_a13c…5ef', scope:'read only',  used:'12 req/m' },
    { id:4, name:'e-Faktur Gateway',     key:'kc_live_sk_0c8d…b90', scope:'read/write', used:'88 req/m' },
  ],
  webhooks: [
    { url:'https://hooks.kantor.id/finance', ok:true,  rate:'99.9%', events:['invoice.created','invoice.posted'] },
    { url:'https://erp.partner.co/sync',     ok:true,  rate:'99.4%', events:['partner.updated','order.confirmed'] },
    { url:'https://legacy.sap.local/bridge', ok:false, rate:'71.2%', events:['stock.moved'] },
  ],
  eventLogs: [
    {ts:'14:02:11.482', m:'POST',   path:'/api/v1/inventory/update',        code:200, ms:42,  src:'PWA'},
    {ts:'14:02:11.327', m:'GET',    path:'/api/v1/invoices?state=draft',    code:200, ms:18,  src:'Web'},
    {ts:'14:02:10.991', m:'POST',   path:'/api/v1/invoices/18940/post',     code:201, ms:88,  src:'Workflow'},
    {ts:'14:02:10.774', m:'PUT',    path:'/api/v1/res.partner/6772',        code:200, ms:51,  src:'CRM App'},
    {ts:'14:02:10.402', m:'POST',   path:'/api/v1/expense',                 code:201, ms:64,  src:'Builder'},
    {ts:'14:02:09.988', m:'GET',    path:'/api/v1/stock.quant?loc=JKT-01',  code:200, ms:23,  src:'Web'},
    {ts:'14:02:09.551', m:'DELETE', path:'/api/v1/webhooks/12',             code:204, ms:31,  src:'Admin'},
    {ts:'14:02:09.203', m:'POST',   path:'/api/v1/sale.order/9051/confirm', code:200, ms:77,  src:'Web'},
    {ts:'14:02:08.870', m:'GET',    path:'/api/v1/res.users/me',            code:200, ms:12,  src:'Web'},
    {ts:'14:02:08.441', m:'POST',   path:'/api/v1/inventory/update',        code:409, ms:19,  src:'Legacy SAP'},
    {ts:'14:02:08.119', m:'GET',    path:'/api/v1/account.move?unposted',   code:200, ms:34,  src:'Power BI'},
    {ts:'14:02:07.702', m:'PUT',    path:'/api/v1/res.expense/3418',        code:200, ms:46,  src:'Workflow'},
    {ts:'14:02:07.388', m:'POST',   path:'/api/v1/auth/refresh',            code:200, ms:9,   src:'PWA'},
    {ts:'14:02:06.955', m:'POST',   path:'/api/v1/notify/chat',             code:202, ms:28,  src:'Workflow'},
    {ts:'14:02:06.610', m:'GET',    path:'/api/v1/product.tmpl/2108',       code:500, ms:120, src:'Web'},
  ],
  // ---- View 2: palette ----
  palette: {
    triggers: [
      { t:'Record event', ic: I('<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>') },
      { t:'Schedule',      ic: I('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>') },
      { t:'Webhook',       ic: I('<path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8"/>') },
    ],
    actions: [
      { t:'Approval',   ic: I('<path d="M5 12l4 4 10-10"/>') },
      { t:'API call',   ic: I('<path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/>') },
      { t:'Notify',     ic: I('<path d="M12 4a6 6 0 016 6c0 5 2 6 2 6H4s2-1 2-6a6 6 0 016-6z"/>') },
      { t:'Condition',  ic: I('<path d="M12 3l9 9-9 9-9-9z"/>') },
    ],
  },
  // ---- View 3: component library ----
  library: {
    inputs: [
      { t:'Text Field', ic: I('<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M7 12h2"/>') },
      { t:'Number',     ic: I('<path d="M8 6v12M16 6v12M5 10h14M5 14h14"/>') },
      { t:'Dropdown',   ic: I('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 11l3 3 3-3"/>') },
      { t:'Date',       ic: I('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>') },
      { t:'Upload',     ic: I('<path d="M12 16V6M8 10l4-4 4 4M5 18h14"/>') },
      { t:'Toggle',     ic: I('<rect x="3" y="8" width="18" height="8" rx="4"/><circle cx="16" cy="12" r="2.5" fill="currentColor" stroke="none"/>') },
    ],
    data: [
      { t:'Data Table', ic: I('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 9v11"/>') },
      { t:'Button',     ic: I('<rect x="4" y="9" width="16" height="6" rx="3"/>') },
      { t:'Record Card',ic: I('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h5"/>') },
      { t:'Chart',      ic: I('<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6"/>') },
    ],
  },
  // ---- View 3: canvas elements (reactive) ----
  canvasEls: [
    { id:'e1', kind:'text',   label:'Title',        placeholder:'e.g. Client lunch — Jakarta', bind:'name' },
    { id:'e2', kind:'select', label:'Category',     placeholder:'Select category…',            bind:'category_id' },
    { id:'e3', kind:'number', label:'Amount (IDR)', placeholder:'0',                           bind:'amount_total' },
    { id:'e4', kind:'upload', label:'Receipt',      placeholder:'Drop receipt image or PDF',   bind:'attachment_ids' },
    { id:'e5', kind:'button', label:'',             placeholder:'Submit claim',                bind:'' },
  ],
  expenseFields: [
    { name:'name',           type:'char' },
    { name:'category_id',    type:'m2o' },
    { name:'amount_total',   type:'monetary' },
    { name:'attachment_ids', type:'o2m' },
    { name:'date',           type:'date' },
    { name:'employee_id',    type:'m2o' },
    { name:'state',          type:'selection' },
  ],
};

// Render the API traffic bar chart with plain DOM (SVG can't host <template x-for>)
(function renderTraffic() {
  function draw() {
    const g = document.getElementById('trafficBars');
    if (!g) return;
    const NS = 'http://www.w3.org/2000/svg';
    g.innerHTML = '';
    window.KC_DATA.traffic.forEach((b, i) => {
      const x = i * 25 + 8;
      [['#0F7B6C', b.ok, 150 - b.ok],
       ['#E89A3C', b.warn, 150 - b.ok - b.warn],
       ['#F87171', b.err, 150 - b.ok - b.warn - b.err]].forEach(([fill, h, y]) => {
        if (h <= 0) return;
        const r = document.createElementNS(NS, 'rect');
        r.setAttribute('x', x); r.setAttribute('y', y);
        r.setAttribute('width', 14); r.setAttribute('height', h);
        r.setAttribute('rx', 2); r.setAttribute('fill', fill);
        g.appendChild(r);
      });
    });
  }
  // chart lives in a hidden tab; draw on load and whenever it may have appeared
  if (document.readyState !== 'loading') setTimeout(draw, 60);
  else document.addEventListener('DOMContentLoaded', () => setTimeout(draw, 60));
  document.addEventListener('click', () => setTimeout(draw, 30));
})();
