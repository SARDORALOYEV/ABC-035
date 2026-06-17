const { supabase } = require('../config/db');

const getUsers = async (req, res, next) => {
  try {
    const { data, error, count } = await supabase
      .from('users')
      .select('id, name, email, role, created_at', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, count: count || data?.length || 0, data: data || [] });
  } catch (error) {
    next(error);
  }
};

const getUserCount = async (req, res, next) => {
  try {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    res.json({ success: true, count: count || 0 });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Foydalanuvchi topilmadi' });
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ success: true, message: 'Foydalanuvchi o\'chirildi' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUserCount, getUserById, deleteUser };
