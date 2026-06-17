const { createClient } = require('@supabase/supabase-js');

// Supabase client yaratish (service role key bilan — admin huquqlari)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = supabase;
