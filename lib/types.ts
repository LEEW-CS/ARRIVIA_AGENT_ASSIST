export type ConnectorStatus = 'connected' | 'disconnected' | 'error' | 'pending';

export type ConnectorType =
  | 'Internal'
  | 'CRM'
  | 'Supplier'
  | 'Cruise'
  | 'Air'
  | 'Hotel'
  | 'Activities'
  | 'Payments'
  | 'Telephony'
  | 'AI';

export type AuthType = 'API Key' | 'OAuth 2.0' | 'Basic' | 'mTLS' | 'MCP Server URL';

export type Environment = 'Sandbox' | 'Staging' | 'Production';

export interface Connector {
  id: string;
  name: string;
  type: ConnectorType;
  status: ConnectorStatus;
  lastSync?: string;
  errorMessage?: string;
  initials: string;
  accent: string;
  authType: AuthType;
  description?: string;
  mcpTools?: string[];
}

export interface Trip {
  id: string;
  kind: 'cruise' | 'flight';
  title: string;
  details: string;
  supplier: string;
  date: string;
  spend: string;
  preferred: boolean;
}

export interface Preference {
  iconKey: 'anchor' | 'bed' | 'ship' | 'plane' | 'seat' | 'wine' | 'passport';
  label: string;
  value: string;
  isMissing?: boolean;
  isInferred?: boolean;
}

export type ConfidencePillTone = 'success' | 'warn' | 'muted';

export interface TalkBubble {
  stage: string;
  text: string;
  confidence: string;
  confidenceTone?: ConfidencePillTone;
}

export interface Offer {
  id: string;
  title: string;
  ship: string;
  itinerary: string;
  suite: string;
  price: string;
  matchTag?: string;
  matchTone?: 'coral' | 'muted' | 'warn';
  highlight?: boolean;
  unavailable?: boolean;
}

export interface Member {
  name: string;
  membershipNumber: string;
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Member';
  memberSince: string;
  lifetimeValue: string;
  homeAirport: string;
  homeAirportMissing?: boolean;
  pointsBalance: string;
  ivrIntent: string;
  ivrIntentMissing?: boolean;
  initials: string;
}

export type DataSourceStatus = 'connected' | 'pending' | 'error' | 'disconnected';

export interface DataSource {
  id: string;
  label: string;
  status: DataSourceStatus;
  detail?: string;
}

export interface Alert {
  level: 'warn' | 'error' | 'info';
  title: string;
  detail: string;
}

export interface Scenario {
  id: string;
  shortLabel: string;
  longLabel: string;
  tagline: string;
  member: Member;
  preferences: Preference[];
  trips: Trip[];
  talkTrack: TalkBubble[];
  talkTrackTone: 'confident' | 'discovery';
  offers: Offer[];
  offersHeader: string;
  offersSubheader: string;
  dataSources: DataSource[];
  alerts?: Alert[];
}
