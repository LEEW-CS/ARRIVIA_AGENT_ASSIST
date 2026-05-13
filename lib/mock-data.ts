import type {
  AuthType,
  Connector,
  ConnectorType,
  Scenario,
} from './types';

// ---------------------------------------------------------------------------
// Scenario A: Margaret Chen, Platinum, golden path
// ---------------------------------------------------------------------------

const scenarioA: Scenario = {
  id: 'a',
  shortLabel: 'A, Margaret',
  longLabel: 'Margaret Chen, Platinum, rich profile',
  tagline: 'Platinum member with deep history. Every system green.',
  member: {
    name: 'Margaret Chen',
    membershipNumber: 'ARR-7741-2098',
    tier: 'Platinum',
    memberSince: '2014',
    lifetimeValue: '$184,200',
    homeAirport: 'BNE, Brisbane',
    pointsBalance: '42,800',
    ivrIntent: 'Wants to book a Mediterranean cruise, Sept 2026',
    initials: 'MC',
  },
  preferences: [
    { iconKey: 'anchor', label: 'Travel style', value: 'Ocean cruising' },
    { iconKey: 'bed', label: 'Cabin preference', value: 'Premier Suite' },
    { iconKey: 'ship', label: 'Preferred cruise line', value: 'Royal Caribbean' },
    { iconKey: 'plane', label: 'Preferred airline', value: 'Emirates' },
    { iconKey: 'seat', label: 'Flight class', value: 'Premium Economy' },
    { iconKey: 'wine', label: 'Dietary', value: 'Pescatarian' },
    { iconKey: 'passport', label: 'Passport on file', value: 'AUS, expires 2029' },
  ],
  trips: [
    {
      id: 'a-t1',
      kind: 'cruise',
      title: 'Symphony of the Seas',
      details: 'Caribbean, 7 nights, Premier Suite',
      supplier: 'Royal Caribbean',
      date: 'Mar 2025',
      spend: '$14,800',
      preferred: true,
    },
    {
      id: 'a-t2',
      kind: 'flight',
      title: 'EK435 BNE to DXB',
      details: 'Premium Economy',
      supplier: 'Emirates',
      date: 'Mar 2025',
      spend: '$4,200',
      preferred: true,
    },
    {
      id: 'a-t3',
      kind: 'cruise',
      title: 'Anthem of the Seas',
      details: 'Mediterranean, 10 nights, Premier Suite',
      supplier: 'Royal Caribbean',
      date: 'Sep 2024',
      spend: '$19,400',
      preferred: true,
    },
    {
      id: 'a-t4',
      kind: 'flight',
      title: 'EK432 DXB to BNE',
      details: 'Premium Economy',
      supplier: 'Emirates',
      date: 'Sep 2024',
      spend: '$3,950',
      preferred: true,
    },
    {
      id: 'a-t5',
      kind: 'cruise',
      title: 'Ovation of the Seas',
      details: 'Alaska, 7 nights, Premier Suite',
      supplier: 'Royal Caribbean',
      date: 'Jul 2023',
      spend: '$13,600',
      preferred: true,
    },
    {
      id: 'a-t6',
      kind: 'cruise',
      title: 'Celebrity Edge',
      details: 'Caribbean, 7 nights, suite',
      supplier: 'Celebrity Cruises',
      date: 'Aug 2022',
      spend: '$9,800',
      preferred: false,
    },
  ],
  talkTrack: [
    {
      stage: 'Greeting',
      text: "Hi Margaret, thanks for holding. I can see you're a Platinum member, wonderful to have you back. I noticed you've been looking at Mediterranean cruises for September. Are you thinking of revisiting that route, or would you like to explore somewhere new this time?",
      confidence: 'High confidence, based on tier and IVR intent',
      confidenceTone: 'success',
    },
    {
      stage: 'Anchor on history',
      text: "I'm pulling up your last Mediterranean sailing on Anthem of the Seas in 2024, you stayed in a Premier Suite. Would you like me to look for similar Royal Caribbean itineraries in September 2026, again in a Premier Suite?",
      confidence: 'High confidence, based on 3 prior bookings',
      confidenceTone: 'success',
    },
    {
      stage: 'Inferred preference',
      text: 'And for flights, would you like me to price Emirates Premium Economy out of Brisbane as we did last time?',
      confidence: 'High confidence, based on 4 prior bookings',
      confidenceTone: 'success',
    },
    {
      stage: 'Upsell, gently',
      text: "Royal Caribbean has just released the new Utopia of the Seas, it's sailing the Western Mediterranean from Barcelona this September. The Royal Loft Suite is a step up from your usual Premier Suite, with a private balcony. Would you like me to include a comparison?",
      confidence: 'Medium confidence, suggested upsell',
      confidenceTone: 'warn',
    },
    {
      stage: 'Loyalty tie-in',
      text: 'You currently have 42,800 Arrivia points available. You could redeem these against the flights or apply them as on-board credit, your call.',
      confidence: 'High confidence, live ledger balance',
      confidenceTone: 'success',
    },
    {
      stage: 'Close',
      text: 'Shall I hold two options for you while we work through the details?',
      confidence: 'Standard close',
      confidenceTone: 'muted',
    },
  ],
  talkTrackTone: 'confident',
  offersHeader: 'Recommended offers',
  offersSubheader: "Ranked by match with Margaret's preferences and history.",
  offers: [
    {
      id: 'a-o1',
      title: 'Utopia of the Seas',
      ship: 'Royal Caribbean',
      itinerary: '7 nights, Western Med',
      suite: 'Royal Loft Suite',
      price: 'from $22,400 pp',
      matchTag: 'Matches: cruise line, route, suite tier',
      matchTone: 'coral',
      highlight: true,
    },
    {
      id: 'a-o2',
      title: 'Symphony of the Seas',
      ship: 'Royal Caribbean',
      itinerary: '10 nights, Eastern Med',
      suite: 'Premier Suite',
      price: 'from $18,900 pp',
    },
    {
      id: 'a-o3',
      title: 'Wonder of the Seas',
      ship: 'Royal Caribbean',
      itinerary: '11 nights, Greek Isles',
      suite: 'Premier Suite',
      price: 'from $20,200 pp',
    },
  ],
  dataSources: [
    { id: 'crm', label: 'Arrivia CRM', status: 'connected' },
    { id: 'membership', label: 'Membership System', status: 'connected' },
    { id: 'rci', label: 'Royal Caribbean Inventory', status: 'connected' },
    { id: 'emirates', label: 'Emirates NDC', status: 'connected' },
    { id: 'sabre', label: 'Sabre PNR', status: 'connected' },
    { id: 'loyalty', label: 'Arrivia Loyalty Ledger', status: 'connected' },
  ],
};

// ---------------------------------------------------------------------------
// Scenario B: David Okafor, Silver, sparse profile, degraded connectors
// ---------------------------------------------------------------------------

const scenarioB: Scenario = {
  id: 'b',
  shortLabel: 'B, David',
  longLabel: 'David Okafor, Silver, sparse profile',
  tagline: 'New Silver member with one trip on file. Two data feeds degraded.',
  member: {
    name: 'David Okafor',
    membershipNumber: 'ARR-4419-0033',
    tier: 'Silver',
    memberSince: '2024',
    lifetimeValue: '$1,800',
    homeAirport: 'Not on file',
    homeAirportMissing: true,
    pointsBalance: '1,250',
    ivrIntent: 'Caller did not state intent, please discover',
    ivrIntentMissing: true,
    initials: 'DO',
  },
  preferences: [
    { iconKey: 'anchor', label: 'Travel style', value: 'Cruise, inferred from 1 trip', isInferred: true },
    { iconKey: 'bed', label: 'Cabin preference', value: 'Not on file', isMissing: true },
    { iconKey: 'ship', label: 'Preferred cruise line', value: 'Norwegian, inferred', isInferred: true },
    { iconKey: 'plane', label: 'Preferred airline', value: 'Not on file', isMissing: true },
    { iconKey: 'seat', label: 'Flight class', value: 'Not on file', isMissing: true },
    { iconKey: 'wine', label: 'Dietary', value: 'Not on file', isMissing: true },
    { iconKey: 'passport', label: 'Passport on file', value: 'Not on file', isMissing: true },
  ],
  trips: [
    {
      id: 'b-t1',
      kind: 'cruise',
      title: 'Norwegian Encore',
      details: 'Caribbean, 7 nights, Inside cabin',
      supplier: 'Norwegian Cruise Line',
      date: 'Oct 2024',
      spend: '$1,800',
      preferred: false,
    },
  ],
  talkTrack: [
    {
      stage: 'Greeting and open question',
      text: "Hi David, thanks for waiting. I can see you joined Arrivia last year and took a Caribbean cruise with Norwegian, fantastic choice. What can I help you with today?",
      confidence: 'Open, no stated intent yet',
      confidenceTone: 'muted',
    },
    {
      stage: 'Discover intent',
      text: 'Before we dive in, can I ask a couple of quick questions to make sure I show you the right options? Are you thinking another cruise, or considering air or a hotel package this time? Solo, couple, or family?',
      confidence: 'Discovery, limited history',
      confidenceTone: 'muted',
    },
    {
      stage: 'Capture missing data, gently',
      text: "Whatever we book, I want to make sure your details are right. I can see we don't have your passport on file yet, and we haven't captured any dietary preferences. Could we grab those while we chat, it will speed up checkout later.",
      confidence: 'High value, capture 4 missing fields',
      confidenceTone: 'success',
    },
    {
      stage: 'Connector caveat',
      text: 'Quick note for me. Our Norwegian inventory feed is unavailable right now, so for Norwegian specifically I will need to check current availability after the call. Royal Caribbean and Carnival are live, so I can quote those instantly if you are open to other lines.',
      confidence: 'Norwegian inventory offline, transparent caveat',
      confidenceTone: 'warn',
    },
    {
      stage: 'Loyalty tie-in',
      text: "You're on Silver with 1,250 Arrivia points. Today's booking will get you closer to Gold, I can show you what Gold unlocks if that is useful.",
      confidence: 'Live ledger sync pending, balance may be stale',
      confidenceTone: 'warn',
    },
    {
      stage: 'Close',
      text: 'Want me to walk you through a couple of cruise options first, then circle back to air and a hotel package?',
      confidence: 'Soft close, no commitment requested',
      confidenceTone: 'muted',
    },
  ],
  talkTrackTone: 'discovery',
  offersHeader: 'Starter options',
  offersSubheader:
    "Limited confidence. Built from one prior booking, and missing preferences. Treat as starter ideas.",
  offers: [
    {
      id: 'b-o1',
      title: 'Norwegian Encore',
      ship: 'Norwegian Cruise Line',
      itinerary: '7 nights, Caribbean',
      suite: 'Inside cabin',
      price: 'pricing unavailable',
      matchTag: 'Matches last booking, inventory feed offline',
      matchTone: 'warn',
      unavailable: true,
    },
    {
      id: 'b-o2',
      title: 'Symphony of the Seas',
      ship: 'Royal Caribbean',
      itinerary: '7 nights, Caribbean',
      suite: 'Ocean view cabin',
      price: 'from $1,950 pp',
      matchTag: 'New line, similar itinerary',
      matchTone: 'muted',
    },
    {
      id: 'b-o3',
      title: 'Carnival Mardi Gras',
      ship: 'Carnival Cruise Line',
      itinerary: '7 nights, Caribbean',
      suite: 'Balcony cabin',
      price: 'from $2,400 pp',
      matchTag: 'Step up from prior cabin tier',
      matchTone: 'muted',
    },
  ],
  dataSources: [
    {
      id: 'crm',
      label: 'Arrivia CRM',
      status: 'pending',
      detail: 'Partial sync, last 4 hours ago',
    },
    { id: 'membership', label: 'Membership System', status: 'connected' },
    {
      id: 'ncl',
      label: 'Norwegian Inventory',
      status: 'error',
      detail: 'Feed unavailable',
    },
    { id: 'rci', label: 'Royal Caribbean Inventory', status: 'connected' },
    { id: 'sabre', label: 'Sabre PNR', status: 'connected' },
    {
      id: 'loyalty',
      label: 'Arrivia Loyalty Ledger',
      status: 'pending',
      detail: 'Sync pending, 47 min ago',
    },
  ],
  alerts: [
    {
      level: 'warn',
      title: 'Limited recommendations for this caller',
      detail:
        'Norwegian Cruise Line inventory feed is unavailable, and the Arrivia loyalty ledger is mid-sync, last update 47 minutes ago. Royal Caribbean, Carnival, and Emirates feeds are live.',
    },
    {
      level: 'info',
      title: 'Profile is sparse',
      detail:
        'Four preference fields and the passport are not on file. The talk track below includes a soft prompt to capture them during the call.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Scenario registry
// ---------------------------------------------------------------------------

export const scenarios: Record<string, Scenario> = {
  a: scenarioA,
  b: scenarioB,
};

export const scenarioList: Scenario[] = [scenarioA, scenarioB];

export function getScenario(id?: string | null): Scenario {
  if (id && scenarios[id]) return scenarios[id];
  return scenarioA;
}

// ---------------------------------------------------------------------------
// Connector catalogue, page 2 data, lightly scenario-aware
// ---------------------------------------------------------------------------

const palette = [
  'bg-arrivia-blue-600 text-white',
  'bg-arrivia-coral-500 text-white',
  'bg-arrivia-slate-700 text-white',
  'bg-arrivia-blue-400 text-white',
  'bg-arrivia-coral-300 text-arrivia-slate-900',
  'bg-arrivia-slate-500 text-white',
];

function pickAccent(i: number) {
  return palette[i % palette.length];
}

const baseConnectors: Connector[] = [
  {
    id: 'crm',
    name: 'Arrivia CRM',
    type: 'Internal',
    status: 'connected',
    lastSync: '2 min ago',
    initials: 'AC',
    accent: pickAccent(0),
    authType: 'MCP Server URL',
    description: 'Primary CRM with member, trip, and preference data.',
    mcpTools: [
      'crm.getMember(membershipNumber)',
      'crm.getTripHistory(memberId)',
      'crm.getPreferences(memberId)',
      'crm.updatePreference(memberId, key, value)',
      'crm.createBooking(memberId, payload)',
      'crm.getLoyaltyBalance(memberId)',
    ],
  },
  {
    id: 'membership',
    name: 'Arrivia Membership System',
    type: 'Internal',
    status: 'connected',
    lastSync: '5 min ago',
    initials: 'AM',
    accent: pickAccent(1),
    authType: 'API Key',
    description: 'Tier, status, and benefits engine.',
  },
  {
    id: 'loyalty',
    name: 'Arrivia Loyalty Ledger',
    type: 'Internal',
    status: 'connected',
    lastSync: '1 min ago',
    initials: 'LL',
    accent: pickAccent(2),
    authType: 'API Key',
    description: 'Points balance, accrual, and redemption ledger.',
  },
  {
    id: 'rci',
    name: 'Royal Caribbean Inventory API',
    type: 'Supplier',
    status: 'connected',
    lastSync: '3 min ago',
    initials: 'RC',
    accent: pickAccent(3),
    authType: 'OAuth 2.0',
  },
  {
    id: 'carnival',
    name: 'Carnival Cruise Line API',
    type: 'Supplier',
    status: 'connected',
    lastSync: '12 min ago',
    initials: 'CC',
    accent: pickAccent(4),
    authType: 'OAuth 2.0',
  },
  {
    id: 'ncl',
    name: 'Norwegian Cruise Line',
    type: 'Supplier',
    status: 'disconnected',
    lastSync: '4 days ago',
    initials: 'NC',
    accent: pickAccent(5),
    authType: 'OAuth 2.0',
  },
  {
    id: 'emirates',
    name: 'Emirates NDC',
    type: 'Air',
    status: 'connected',
    lastSync: '6 min ago',
    initials: 'EK',
    accent: pickAccent(0),
    authType: 'OAuth 2.0',
  },
  {
    id: 'sabre',
    name: 'Sabre GDS',
    type: 'Air',
    status: 'connected',
    lastSync: '2 min ago',
    initials: 'SG',
    accent: pickAccent(1),
    authType: 'Basic',
  },
  {
    id: 'amadeus',
    name: 'Amadeus GDS',
    type: 'Air',
    status: 'error',
    errorMessage: 'Credentials expired',
    lastSync: '2 days ago',
    initials: 'AG',
    accent: pickAccent(2),
    authType: 'Basic',
  },
  {
    id: 'expedia',
    name: 'Expedia TAAP',
    type: 'Hotel',
    status: 'connected',
    lastSync: '15 min ago',
    initials: 'ET',
    accent: pickAccent(3),
    authType: 'API Key',
  },
  {
    id: 'hotelbeds',
    name: 'HotelBeds',
    type: 'Hotel',
    status: 'connected',
    lastSync: '20 min ago',
    initials: 'HB',
    accent: pickAccent(4),
    authType: 'API Key',
  },
  {
    id: 'viator',
    name: 'Viator Activities',
    type: 'Activities',
    status: 'connected',
    lastSync: '8 min ago',
    initials: 'VA',
    accent: pickAccent(5),
    authType: 'API Key',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    type: 'Payments',
    status: 'connected',
    lastSync: '4 min ago',
    initials: 'St',
    accent: pickAccent(0),
    authType: 'API Key',
  },
  {
    id: 'twilio',
    name: 'Twilio Voice',
    type: 'Telephony',
    status: 'connected',
    lastSync: 'just now',
    initials: 'Tw',
    accent: pickAccent(1),
    authType: 'API Key',
  },
  {
    id: 'claude',
    name: 'Anthropic Claude (Symphony AI)',
    type: 'AI',
    status: 'connected',
    lastSync: '1 min ago',
    initials: 'AI',
    accent: pickAccent(2),
    authType: 'API Key',
  },
  {
    id: 'salesforce',
    name: 'Salesforce Service Cloud',
    type: 'CRM',
    status: 'connected',
    lastSync: '7 min ago',
    initials: 'SF',
    accent: pickAccent(3),
    authType: 'OAuth 2.0',
  },
];

// Scenario B overrides on the connectors page, so the admin reflects the
// same state the agent screen reflects.
const scenarioBConnectorOverrides: Record<string, Partial<Connector>> = {
  crm: { status: 'pending', lastSync: '4 hours ago' },
  loyalty: { status: 'pending', lastSync: '47 min ago' },
};

export function getConnectors(scenarioId: string): Connector[] {
  if (scenarioId !== 'b') return baseConnectors;
  return baseConnectors.map((c) =>
    scenarioBConnectorOverrides[c.id]
      ? { ...c, ...scenarioBConnectorOverrides[c.id] }
      : c
  );
}

// Re-exported for backwards compatibility, defaults to scenario A view.
export const connectors = baseConnectors;

export interface CatalogueItem {
  id: string;
  name: string;
  type: ConnectorType;
  category: string;
  initials: string;
  accent: string;
  recommended?: boolean;
  authType: AuthType;
  description: string;
}

export const catalogue: CatalogueItem[] = [
  {
    id: 'arrivia-crm-mcp',
    name: 'Arrivia CRM (MCP)',
    type: 'Internal',
    category: 'Internal',
    initials: 'AC',
    accent: 'bg-arrivia-coral-500 text-white',
    recommended: true,
    authType: 'MCP Server URL',
    description:
      'Recommended. Exposes member, trip, preference, and loyalty tools via the Arrivia MCP server. Best path for agentic flows.',
  },
  {
    id: 'princess',
    name: 'Princess Cruises',
    type: 'Supplier',
    category: 'Supplier, Cruise',
    initials: 'PC',
    accent: 'bg-arrivia-blue-500 text-white',
    authType: 'OAuth 2.0',
    description: 'Inventory and pricing for Princess Cruises sailings worldwide.',
  },
  {
    id: 'holland',
    name: 'Holland America',
    type: 'Supplier',
    category: 'Supplier, Cruise',
    initials: 'HA',
    accent: 'bg-arrivia-blue-400 text-white',
    authType: 'OAuth 2.0',
    description: 'Inventory and pricing for Holland America Line.',
  },
  {
    id: 'msc',
    name: 'MSC Cruises',
    type: 'Supplier',
    category: 'Supplier, Cruise',
    initials: 'MS',
    accent: 'bg-arrivia-slate-700 text-white',
    authType: 'OAuth 2.0',
    description: 'European and Caribbean inventory from MSC.',
  },
  {
    id: 'qantas',
    name: 'Qantas',
    type: 'Air',
    category: 'Air',
    initials: 'QF',
    accent: 'bg-arrivia-coral-600 text-white',
    authType: 'API Key',
    description: 'Direct NDC connection to Qantas, including frequent flyer fares.',
  },
  {
    id: 'singapore-airlines',
    name: 'Singapore Airlines',
    type: 'Air',
    category: 'Air',
    initials: 'SQ',
    accent: 'bg-arrivia-blue-600 text-white',
    authType: 'API Key',
    description: 'Inventory and KrisFlyer redemption availability.',
  },
  {
    id: 'marriott-bonvoy',
    name: 'Marriott Bonvoy',
    type: 'Hotel',
    category: 'Hotel',
    initials: 'MB',
    accent: 'bg-arrivia-slate-500 text-white',
    authType: 'OAuth 2.0',
    description: 'Hotel inventory, Bonvoy points pricing, and member status pass-through.',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    type: 'CRM',
    category: 'CRM',
    initials: 'HS',
    accent: 'bg-arrivia-coral-500 text-white',
    authType: 'OAuth 2.0',
    description: 'Sync agent activity, callbacks, and follow-ups into HubSpot.',
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    type: 'CRM',
    category: 'CRM',
    initials: 'ZD',
    accent: 'bg-arrivia-slate-700 text-white',
    authType: 'OAuth 2.0',
    description: 'Bring service tickets and case history into the agent console.',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'AI',
    category: 'AI',
    initials: 'OA',
    accent: 'bg-arrivia-slate-900 text-white',
    authType: 'API Key',
    description: 'Alternative model provider for Symphony AI components.',
  },
  {
    id: 'pinecone',
    name: 'Pinecone',
    type: 'AI',
    category: 'AI',
    initials: 'PN',
    accent: 'bg-arrivia-blue-500 text-white',
    authType: 'API Key',
    description: 'Vector database for retrieval over Arrivia knowledge base.',
  },
];
