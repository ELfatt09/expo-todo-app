import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = "https://snsfcfusffidynmckvyq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuc2ZjZnVzZmZpZHlubWNrdnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NjA0NDcsImV4cCI6MjA3NDAzNjQ0N30.NZbDmrsbPZlxoLIH8OJbX3EIQQSKkiBNxrL5QTcesLk";

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

