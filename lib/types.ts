export type ConnectorStatus = 'connected' | 'disconnected' | 'error';

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
}

export interface TalkBubble {
  stage: string;
  text: string;
  confidence: string;
}

export interface Offer {
  id: string;
  title: string;
  ship: string;
  itinerary: string;
  suite: string;
  price: string;
  matchTag?: string;
  highlight?: boolean;
}

export interface Member {
  name: string;
  membershipNumber: string;
  tier: string;
  memberSince: string;
  lifetimeValue: string;
  homeAirport: string;
  pointsBalance: string;
  ivrIntent: string;
}
