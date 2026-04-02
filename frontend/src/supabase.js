import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mmbwinkjtmqeqpflczye.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tYndpbmtqdG1xZXFwZmxjenllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3Mjk5NDYsImV4cCI6MjA4MzMwNTk0Nn0.Um9wfTSbOhaqN7weTzt36odlmMdj0iUmnwbCGe65Zes";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
