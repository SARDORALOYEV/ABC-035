const { supabase } = require('../config/db');

const mapOrderRow = (row) => ({
  id: row.id,
  car: row.car ? {
    id: row.car.id, title: row.car.title,
    brand: row.car.brand, model: row.car.model,
    year: row.car.year, price: row.car.price,
    images: row.car.images,
  } : row.car_id,
  car_id: row.car_id,
  fullName: row.full_name,
  phone: row.phone,
  message: row.message,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const createOrder = async (req, res, next) => {
  try {
    const { car: carId, fullName, phone, message } = req.body;

    const { data: car, error: carError } = await supabase
      .from('cars')
      .select('id, is_available')
      .eq('id', carId)
      .single();

    if (carError || !car) {
      return res.status(404).json({ success: false, message: 'Avtomobil topilmadi' });
    }
    if (!car.is_available) {
      return res.status(400).json({ success: false, message: 'Bu avtomobil hozirda mavjud emas' });
    }

    const { data: order, error } = await supabase
      .from('orders')
      .insert({ car_id: carId, full_name: fullName, phone, message })
      .select('*, car:car_id(id, title, brand, model, year, price)')
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'So\'rovingiz qabul qilindi. Tez orada siz bilan bog\'lanamiz!',
      data: mapOrderRow(order),
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    let query = supabase
      .from('orders')
      .select('*, car:car_id(id, title, brand, model, year, price)', { count: 'exact' });

    if (status) query = query.eq('status', status);

    query = query.order('created_at', { ascending: false });

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) throw error;

    res.json({
      success: true,
      count: data.length,
      total: count,
      page: pageNum,
      pages: Math.ceil(count / limitNum),
      data: data.map(mapOrderRow),
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, car:car_id(id, title, brand, model, year, price, images)')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'So\'rov topilmadi' });
    }

    res.json({ success: true, data: mapOrderRow(data) });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'So\'rov topilmadi' });
    }

    const { data: updated, error } = await supabase
      .from('orders')
      .update({ status: req.body.status })
      .eq('id', req.params.id)
      .select('*, car:car_id(id, title, brand, model, year)')
      .single();

    if (error) throw error;

    res.json({ success: true, data: mapOrderRow(updated) });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'So\'rov topilmadi' });
    }

    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ success: true, message: 'So\'rov muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder };
