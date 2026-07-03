import React from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import App from "./App.jsx";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const debugStorage = new URLSearchParams(window.location.search).get("debugStorage") === "1";
const diagnosticKeys = [
  "meta",
  "staff",
  "trials",
  "joins",
  "memberMonthly",
  "baselines",
  "budgetTargets",
  "revenueActuals",
  "settings",
  "cancellations",
];
const directQueryKeys = [
  "memberMonthly",
  "trials",
  "joins",
  "revenueActuals",
  "settings",
];

function summarizeStoredValue(value) {
  if (value == null) return { type: "null", count: null };

  let parsed = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return { type: "string", count: value.length };
    }
  }

  if (Array.isArray(parsed)) return { type: "array", count: parsed.length };
  if (typeof parsed === "object") return { type: "object", count: Object.keys(parsed).length };
  return { type: typeof parsed, count: null };
}

async function runStorageDiagnostics() {
  if (!debugStorage) return;

  let supabaseHost = null;
  try {
    supabaseHost = supabaseUrl ? new URL(supabaseUrl).host : null;
  } catch {
    supabaseHost = "invalid-url";
  }

  console.info("[storage-debug] env", JSON.stringify({
    hasSupabaseUrl: Boolean(supabaseUrl),
    hasSupabaseAnonKey: Boolean(supabaseKey),
    supabaseHost,
    anonKeyLength: supabaseKey ? supabaseKey.length : 0,
    anonKeyPrefix: supabaseKey ? `${supabaseKey.slice(0, 6)}...` : null,
  }));

  if (!window.storage?.get) {
    console.warn("[storage-debug] window.storage.get is unavailable");
  } else {
    for (const key of diagnosticKeys) {
      try {
        const result = await window.storage.get(key, true);
        const summary = summarizeStoredValue(result?.value);
        console.info("[storage-debug] window.storage.get", JSON.stringify({
          key,
          success: true,
          isNull: result == null,
          valueType: summary.type,
          count: summary.count,
        }));
      } catch (error) {
        console.warn("[storage-debug] window.storage.get failed", JSON.stringify({
          key,
          success: false,
          message: error?.message || String(error),
        }));
      }
    }
  }

  for (const key of directQueryKeys) {
    try {
      const { data, error, status } = await supabase
        .from("kv_store")
        .select("value")
        .eq("key", key)
        .single();
      const summary = summarizeStoredValue(data?.value);
      console.info("[storage-debug] supabase direct", JSON.stringify({
        key,
        status,
        hasError: Boolean(error),
        errorMessage: error?.message || null,
        dataIsNull: data == null,
        hasValue: data?.value != null,
        valueType: summary.type,
        count: summary.count,
      }));
    } catch (error) {
      console.warn("[storage-debug] supabase direct failed", JSON.stringify({
        key,
        message: error?.message || String(error),
      }));
    }
  }
}

if (!window.storage) {
  window.storage = {
    async get(key) {
      const { data } = await supabase
        .from("kv_store")
        .select("value")
        .eq("key", key)
        .single();
      if (!data) return null;
      return { key, value: data.value };
    },
    async set(key, value) {
      await supabase
        .from("kv_store")
        .upsert({ key, value }, { onConflict: "key" });
      return { key, value };
    },
    async delete(key) {
      await supabase.from("kv_store").delete().eq("key", key);
      return { key };
    },
  };
}

runStorageDiagnostics();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
