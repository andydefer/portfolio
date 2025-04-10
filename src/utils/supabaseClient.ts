import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Singleton : ne crée qu'une seule instance
let supabase: SupabaseClient;

export const createSupabaseClient = () => {
  if (!supabase) {
    supabase = createClient(
      "https://yzobitzbklkzypzbogma.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6b2JpdHpia2xrenlwemJvZ21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNjg3MTMsImV4cCI6MjA1OTg0NDcxM30.AQ5UHu6mPWfKAxIrBLv5zc3WeysHMwD5UYLNza74Jhc"
    );
  }
  return supabase;
};

export default createSupabaseClient;
