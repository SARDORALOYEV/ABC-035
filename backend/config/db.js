const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

const testConnection = async () => {
  try {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL yoki Key topilmadi!');
    }

    const { error } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true });

    if (error) throw error;

    console.log('🚀 Supabase PostgreSQL bazasiga muvaffaqiyatli ulandi!');
  } catch (error) {
    console.error(`❌ Supabase ulanishida xatolik: ${error.message}`);
    // Lokal dev'da processni to'xtatamiz, production'da (Vercel) faqat log qilamiz
    if (process.env.NODE_ENV !== 'production' && require.main === module) {
      process.exit(1);
    }
  }
};

module.exports = { supabase, testConnection };
