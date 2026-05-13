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

export type TripKind = 'cruise' | 'flight' | 'hotel' | 'car' | 'insurance';

export interface Trip {
  id: string;
  kind: TripKind;
  title: string;
  details: string;
  supplier: string;
  date: string;
  spend: string;
  preferred: boolean;
}

export type PrefStatus = 'on-file' | 'not-on-file' | 'feed-unavailable' | 'inferred';

export type PreferenceIcon =
  | 'anchor'
  | 'bed'
  | 'ship'
  | 'plane'
  | 'seat'
  | 'wine'
  | 'passport'
  | 'car'
  | 'shield';

export interface Preference {
  iconKey: PreferenceIcon;
  label: string;
  value: string;
  status?: PrefStatus;
}

export type ConfidencePillTone = 'success' | 'warn' | 'muted';

export interface TalkBubble {
  stage: string;
  text: string;
  confidence: string;
  confidenceTone?: ConfidencePillTone;
  kind?: 'standard' | 'cross-sell' | 'capture-data' | 'pre-cruise' | 'platinum';
}

export type OfferKind = 'cruise' | 'hotel' | 'package';

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
  kind?: OfferKind;
}

export type MemberTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface MemberAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface MemberSocial {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter';
  handle: string;
  url: string;
}

export type Ownership =
  | {
      kind: 'timeshare';
      brand:
        | 'Wyndham Destinations'
        | 'Marriott Vacation Club'
        | 'Hilton Grand Vacations'
        | 'Disney Vacation Club'
        | 'Hyatt Vacation Club';
      since?: string;
    }
  | {
      kind: 'business';
      partner: 'American Express' | 'USAA' | 'Other';
      programLabel?: string;
    };

export interface Member {
  name: string;
  membershipNumber: string;
  tier: MemberTier;
  memberSince: string;
  tenureYears: number;
  lifetimeValue: string;
  homeAirport: string;
  homeAirportStatus?: PrefStatus;
  pointsBalance: string;
  ivrIntent: string;
  ivrIntentMissing?: boolean;
  initials: string;
  address?: MemberAddress;
  socials?: MemberSocial[];
  ownership?: Ownership;
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

export type UpsellCategory =
  | 'flight'
  | 'accommodation'
  | 'car'
  | 'insurance'
  | 'upgrade'
  | 'pre-cruise';

export interface UpsellItem {
  id: string;
  category: UpsellCategory;
  title: string;
  pitch: string;
  rationale?: string;
  priceHint?: string;
  highlight?: boolean;
}

export interface PlatinumPitch {
  headline: string;
  bullets: string[];
  example: string;
  ctaLine: string;
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
  upsell: UpsellItem[];
  upsellHeader: string;
  platinumPitch?: PlatinumPitch;
}
