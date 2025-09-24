import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { AnalyticsAPI } from '../lib/api';

export default function LiveAnalytics() {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AnalyticsAPI.platform()
      .then(setData)
      .catch((e) => setError(e?.message || 'Failed to load analytics'));
  }, []);

  return (
    <div className="p-6">
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Live Platform Analytics (from API)</h2>
        {!data && !error && <p className="text-sm text-slate-600">Loading…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {data && (
          <pre className="text-xs mt-3 bg-slate-50 dark:bg-slate-900 p-3 rounded border border-slate-200/60 dark:border-slate-800/60 overflow-auto max-h-80">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </Card>
    </div>
  );
}

