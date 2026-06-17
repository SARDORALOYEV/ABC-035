const { supabase } = require('../config/db');

const allowedTables = ['brands', 'models', 'categories', 'orders', 'users', 'admin_profiles', 'admin_settings', 'cars', 'activity_log'];

function validateTable(table) {
  if (!allowedTables.includes(table)) {
    throw new Error(`Ruxsat etilmagan jadval: ${table}`);
  }
}

const list = async (req, res, next) => {
  try {
    const { table } = req.params;
    validateTable(table);

    const { select, orderBy, orderAsc, limit, offset, eqField, eqValue, ilikeField, ilikeValue } = req.query;

    let query = supabase.from(table).select(select || '*', { count: 'exact' });

    if (orderBy) query = query.order(orderBy, { ascending: orderAsc !== 'false' });
    if (limit) query = query.limit(Number(limit));
    if (offset) query = query.range(Number(offset), Number(offset) + Number(limit || 100) - 1);
    if (eqField && eqValue) query = query.eq(eqField, eqValue);
    if (ilikeField && ilikeValue) query = query.ilike(ilikeField, `%${ilikeValue}%`);

    const { data, error, count } = await query;
    if (error) {
      if (error.code === 'PGRST205' || error.code === '42P01') {
        return res.json({ success: true, count: 0, data: [] });
      }
      throw error;
    }

    res.json({ success: true, count: data?.length || 0, total: count, data: data || [] });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { table, id } = req.params;
    validateTable(table);

    const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST205' || error.code === '42P01') {
        return res.status(404).json({ success: false, message: 'Ma\'lumot topilmadi' });
      }
      throw error;
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { table } = req.params;
    validateTable(table);

    const { data, error } = await supabase.from(table).insert([req.body]).select().single();
    if (error) {
      if (error.code === 'PGRST205' || error.code === '42P01') {
        return res.status(400).json({ success: false, message: 'Jadval mavjud emas' });
      }
      throw error;
    }

    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { table, id } = req.params;
    validateTable(table);

    const { data, error } = await supabase.from(table).update(req.body).eq('id', id).select().single();
    if (error) {
      if (error.code === 'PGRST205' || error.code === '42P01') {
        return res.status(400).json({ success: false, message: 'Jadval mavjud emas' });
      }
      throw error;
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { table, id } = req.params;
    validateTable(table);

    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      if (error.code === 'PGRST205' || error.code === '42P01') {
        return res.json({ success: true, message: 'O\'chirildi' });
      }
      throw error;
    }

    res.json({ success: true, message: 'O\'chirildi' });
  } catch (error) {
    next(error);
  }
};

module.exports = { list, getById, create, update, remove };
