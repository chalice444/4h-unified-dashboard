import React from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import App from "./App.jsx";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
