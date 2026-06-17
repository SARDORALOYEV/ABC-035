const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

const testConnection = async () => {
  try {
    const { error } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true });

    if (error) throw error;

    console.log('🚀 Supabase PostgreSQL bazasiga muvaffaqiyatli ulandi!');
  } catch (error) {
    console.error(`❌ Supabase ulanishida kritik xatolik: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { supabase, testConnection };
