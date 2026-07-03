// Supabase REST client using plain fetch() — no SDK dependency.
// The @supabase/supabase-js SDK v2.x has compatibility issues in Cloudflare
// Workers Edge Runtime (cookie/auth modules that are not Edge-compatible).
// This helper replicates the essential PostgREST calls using native fetch().

const SUPABASE_URL = "https://qksigxubxkecqffdcgcu.supabase.co";
// sb_publishable_* is the public anon key — safe to embed in source code.
// Tables have RLS disabled and GRANT SELECT/INSERT/UPDATE/DELETE to anon role.
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ??
  "sb_publishable_0hf41d14bVkcmpI8brc5og_jCWm-d5Z";

function getUrl(): string {
  return process.env.SUPABASE_URL ?? SUPABASE_URL;
}
function getKey(): string {
  return process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_ANON_KEY ?? SUPABASE_ANON_KEY;
}

function baseHeaders() {
  return {
    apikey: getKey(),
    Authorization: `Bearer ${getKey()}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

/** SELECT * FROM table WHERE filters, returns array */
export async function supaSelect<T = Record<string, unknown>>(
  table: string,
  opts?: {
    select?: string;
    order?: string;
    filters?: Record<string, string>;
    limit?: number;
    single?: boolean;
    count?: boolean;
  }
): Promise<{ data: T[] | null; count: number | null; error: string | null }> {
  const url = new URL(`${getUrl()}/rest/v1/${table}`);
  url.searchParams.set("select", opts?.select ?? "*");
  if (opts?.order) url.searchParams.set("order", opts.order);
  if (opts?.limit) url.searchParams.set("limit", String(opts.limit));
  if (opts?.filters) {
    for (const [k, v] of Object.entries(opts.filters)) {
      url.searchParams.set(k, `eq.${v}`);
    }
  }

  const headers: Record<string, string> = { ...baseHeaders() };
  if (opts?.count) headers["Prefer"] = "count=exact";
  if (opts?.single) headers["Accept"] = "application/vnd.pgrst.object+json";

  const res = await fetch(url.toString(), { headers });
  const countHeader = res.headers.get("content-range");
  const total = countHeader ? parseInt(countHeader.split("/")[1] ?? "0", 10) : null;

  if (!res.ok) {
    const body = await res.text();
    return { data: null, count: null, error: body };
  }
  const data = await res.json();
  return { data: Array.isArray(data) ? data : [data], count: total, error: null };
}

/** UPDATE table SET payload WHERE colName = colValue */
export async function supaUpdate(
  table: string,
  payload: Record<string, unknown>,
  colName: string,
  colValue: string | number
): Promise<{ data: unknown; error: string | null }> {
  const url = new URL(`${getUrl()}/rest/v1/${table}`);
  url.searchParams.set(colName, `eq.${colValue}`);

  const res = await fetch(url.toString(), {
    method: "PATCH",
    headers: baseHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    return { data: null, error: body };
  }
  const data = await res.json();
  return { data, error: null };
}

/** INSERT INTO table VALUES (rows) */
export async function supaInsert(
  table: string,
  rows: Record<string, unknown> | Record<string, unknown>[]
): Promise<{ error: string | null }> {
  const url = new URL(`${getUrl()}/rest/v1/${table}`);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: baseHeaders(),
    body: JSON.stringify(rows),
  });

  if (!res.ok) {
    const body = await res.text();
    return { error: body };
  }
  return { error: null };
}

/** DELETE FROM table WHERE colName = colValue */
export async function supaDelete(
  table: string,
  colName: string,
  colValue: string | number
): Promise<{ error: string | null }> {
  const url = new URL(`${getUrl()}/rest/v1/${table}`);
  url.searchParams.set(colName, `eq.${colValue}`);

  const res = await fetch(url.toString(), {
    method: "DELETE",
    headers: { ...baseHeaders(), Prefer: "" },
  });

  if (!res.ok) {
    const body = await res.text();
    return { error: body };
  }
  return { error: null };
}

/** COUNT rows in table */
export async function supaCount(table: string): Promise<number> {
  const url = new URL(`${getUrl()}/rest/v1/${table}`);
  url.searchParams.set("select", "*");

  const res = await fetch(url.toString(), {
    method: "HEAD",
    headers: { ...baseHeaders(), Prefer: "count=exact" },
  });

  const range = res.headers.get("content-range");
  if (!range) return 0;
  const total = range.split("/")[1];
  return total ? parseInt(total, 10) : 0;
}

// ─── Supabase Storage helpers ─────────────────────────────────────────────────

/** Upload a file to Supabase Storage. Returns public URL or throws. */
export async function supaUploadFile(
  bucket: string,
  path: string,
  data: ArrayBuffer | Uint8Array,
  contentType: string
): Promise<string> {
  const storageUrl = `${getUrl()}/storage/v1/object/${bucket}/${path}`;

  const res = await fetch(storageUrl, {
    method: "PUT",
    headers: {
      apikey: getKey(),
      Authorization: `Bearer ${getKey()}`,
      "Content-Type": contentType,
      "x-upsert": "true", // overwrite if exists
    },
    body: data,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Storage upload failed: ${body}`);
  }

  return `${getUrl()}/storage/v1/object/public/${bucket}/${path}`;
}

/** Delete a file from Supabase Storage. */
export async function supaDeleteFile(bucket: string, path: string): Promise<void> {
  const storageUrl = `${getUrl()}/storage/v1/object/${bucket}/${path}`;

  const res = await fetch(storageUrl, {
    method: "DELETE",
    headers: {
      apikey: getKey(),
      Authorization: `Bearer ${getKey()}`,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Storage delete failed: ${body}`);
  }
}

/** Returns the public URL for a stored file. */
export function supaFileUrl(bucket: string, path: string): string {
  return `${getUrl()}/storage/v1/object/public/${bucket}/${path}`;
}
