import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

const BASE_VIEWS = 34677;

export const getPortfolioViews = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data } = await supabase
    .from("portfolio_views")
    .select("count")
    .order("updated_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return { count: BASE_VIEWS + Number(data?.count ?? 0) };
});

export const bumpPortfolioView = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: row } = await supabaseAdmin
    .from("portfolio_views")
    .select("id, count")
    .order("updated_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (!row) return { count: BASE_VIEWS };
  const next = Number(row.count) + 1;
  await supabaseAdmin
    .from("portfolio_views")
    .update({ count: next, updated_at: new Date().toISOString() })
    .eq("id", row.id);
  return { count: BASE_VIEWS + next };
});
