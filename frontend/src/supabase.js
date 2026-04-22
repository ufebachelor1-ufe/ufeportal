import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kbodjxuxrbsxuzntrbau.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtib2RqeHV4cmJzeHV6bnRyYmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NTYzOTQsImV4cCI6MjA5MjIzMjM5NH0.-xXJJFrQZv_j7z2GNMPA9IgyRvvaQHSOo0Kq_qDBDX0";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
