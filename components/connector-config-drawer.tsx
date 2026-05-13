'use client';

import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Sheet, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AuthType, Environment } from '@/lib/types';
import type { CatalogueItem } from '@/lib/mock-data';

interface ConnectorConfigDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: CatalogueItem | null;
}

const mcpTools = [
  'crm.getMember(membershipNumber)',
  'crm.getTripHistory(memberId)',
  'crm.getPreferences(memberId)',
  'crm.updatePreference(memberId, key, value)',
  'crm.createBooking(memberId, payload)',
  'crm.getLoyaltyBalance(memberId)',
];

export function ConnectorConfigDrawer({ open, onOpenChange, item }: ConnectorConfigDrawerProps) {
  const [authType, setAuthType] = useState<AuthType>('API Key');
  const [environment, setEnvironment] = useState<Environment>('Sandbox');
  const [rateLimit, setRateLimit] = useState('60');
  const [syncOnSchedule, setSyncOnSchedule] = useState(false);
  const [cron, setCron] = useState('*/15 * * * *');
  const [tags, setTags] = useState('');
  const [testing, setTesting] = useState(false);
  const [discovered, setDiscovered] = useState(false);
  const [discovering, setDiscovering] = useState(false);

  useEffect(() => {
    if (item) {
      setAuthType(item.authType);
      setEnvironment('Sandbox');
      setRateLimit('60');
      setSyncOnSchedule(false);
      setCron('*/15 * * * *');
      setTags('');
      setDiscovered(false);
    }
  }, [item]);

  const handleTest = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      toast.success('Connection successful', {
        description: `${item?.name} responded in 412 ms.`,
      });
    }, 1500);
  };

  const handleDiscover = () => {
    setDiscovering(true);
    setTimeout(() => {
      setDiscovering(false);
      setDiscovered(true);
      toast.success('Tools discovered', { description: `Found ${mcpTools.length} MCP tools.` });
    }, 1200);
  };

  const handleSave = () => {
    toast.success('Connector saved', {
      description: `${item?.name} is now available to Symphony AI.`,
    });
    onOpenChange(false);
  };

  if (!item) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetHeader>
        <div className="flex items-start gap-3 pr-8">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${item.accent}`}>
            {item.initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <SheetTitle>{item.name}</SheetTitle>
              {item.recommended && (
                <Badge variant="coral" className="text-[10px]">
                  <Sparkles className="h-2.5 w-2.5" />
                  Recommended
                </Badge>
              )}
            </div>
            <SheetDescription>{item.description}</SheetDescription>
          </div>
        </div>
      </SheetHeader>

      <SheetBody>
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
          This is a conceptual demo. Credentials entered here are stored in browser memory only and discarded on refresh.
        </div>

        <Field label="Connector name">
          <Input value={item.name} readOnly className="bg-arrivia-slate-50 text-arrivia-slate-500" />
        </Field>

        <Field label="Auth type">
          <Select value={authType} onChange={(e) => setAuthType(e.target.value as AuthType)}>
            <option>API Key</option>
            <option>OAuth 2.0</option>
            <option>Basic</option>
            <option>mTLS</option>
            <option>MCP Server URL</option>
          </Select>
        </Field>

        {authType === 'API Key' && (
          <>
            <Field label="API key">
              <Input type="password" placeholder="sk_live_*****************" defaultValue="sk_live_arr_demo_q9f2x8" />
            </Field>
            <Field label="API secret">
              <Input type="password" placeholder="****" defaultValue="••••••••••••" />
            </Field>
            <Field label="Base URL">
              <Input placeholder="https://api.example.com/v1" defaultValue="https://api.example.com/v1" />
            </Field>
          </>
        )}

        {authType === 'OAuth 2.0' && (
          <>
            <Field label="Client ID">
              <Input placeholder="client-id" defaultValue="arr-demo-oauth-client" />
            </Field>
            <Field label="Client secret">
              <Input type="password" placeholder="****" defaultValue="••••••••••••••••" />
            </Field>
            <Field label="Auth URL">
              <Input defaultValue="https://auth.example.com/oauth/authorize" />
            </Field>
            <Field label="Token URL">
              <Input defaultValue="https://auth.example.com/oauth/token" />
            </Field>
            <Field label="Scopes">
              <Input defaultValue="read:inventory read:pricing write:booking" />
            </Field>
          </>
        )}

        {authType === 'Basic' && (
          <>
            <Field label="Username">
              <Input defaultValue="arr_demo_user" />
            </Field>
            <Field label="Password">
              <Input type="password" defaultValue="••••••••••••" />
            </Field>
            <Field label="Base URL">
              <Input defaultValue="https://api.example.com" />
            </Field>
          </>
        )}

        {authType === 'mTLS' && (
          <>
            <Field label="Endpoint URL">
              <Input defaultValue="https://mtls.example.com" />
            </Field>
            <Field label="Client certificate">
              <Input placeholder="Upload .pem" readOnly className="bg-arrivia-slate-50" defaultValue="client.pem, uploaded" />
            </Field>
            <Field label="Private key">
              <Input placeholder="Upload .key" readOnly className="bg-arrivia-slate-50" defaultValue="client.key, uploaded" />
            </Field>
          </>
        )}

        {authType === 'MCP Server URL' && (
          <>
            <Field label="MCP Server URL">
              <Input defaultValue="https://mcp.arrivia.com/crm" />
            </Field>
            <Field label="Bearer token">
              <Input type="password" defaultValue="••••••••••••••••••••" />
            </Field>
            <div className="rounded-lg border border-arrivia-slate-200 bg-arrivia-cream-50/50 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-arrivia-slate-800">Available tools</div>
                  <p className="text-[11px] text-arrivia-slate-500">
                    Discover MCP tools the agent can call.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleDiscover} disabled={discovering}>
                  {discovering ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                  Discover tools
                </Button>
              </div>
              {discovered && (
                <ul className="mt-3 space-y-1.5">
                  {mcpTools.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-[11px] font-mono text-arrivia-slate-700">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Field label="Environment">
            <Select value={environment} onChange={(e) => setEnvironment(e.target.value as Environment)}>
              <option>Sandbox</option>
              <option>Staging</option>
              <option>Production</option>
            </Select>
          </Field>
          <Field label="Rate limit (req/min)">
            <Input type="number" value={rateLimit} onChange={(e) => setRateLimit(e.target.value)} />
          </Field>
        </div>

        <div className="rounded-lg border border-arrivia-slate-200 px-3 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <Label className="text-sm text-arrivia-slate-800 font-medium">Sync on schedule</Label>
            <p className="text-[11px] text-arrivia-slate-500 mt-0.5">
              Run periodic syncs on a cron schedule.
            </p>
          </div>
          <Switch checked={syncOnSchedule} onCheckedChange={setSyncOnSchedule} />
        </div>

        {syncOnSchedule && (
          <Field label="Cron schedule">
            <Input value={cron} onChange={(e) => setCron(e.target.value)} placeholder="*/15 * * * *" />
          </Field>
        )}

        <Field label="Tags">
          <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="cruise, supplier, tier-1" />
        </Field>
      </SheetBody>

      <SheetFooter>
        <Button variant="outline" onClick={handleTest} disabled={testing}>
          {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          Test connection
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save connector
        </Button>
      </SheetFooter>
    </Sheet>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
