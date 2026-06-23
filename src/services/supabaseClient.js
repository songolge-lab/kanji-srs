export const SUPABASE_URL = 'https://ugrplersscohvsclgxqp.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncnBsZXJzc2NvaHZzY2xneHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2NTAyNTUsImV4cCI6MjA5NzIyNjI1NX0.uFzTdr5PuXz97x0o-nkr8quioKB1jj96FSyPdE-mvJQ';
export const SYNC_TABLE = 'app_state';

export async function sbFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  return res;
}
