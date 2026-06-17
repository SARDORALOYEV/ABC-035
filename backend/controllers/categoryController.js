const { supabase } = require('../config/db');
const uploadImage = require('../utils/uploadImage');
const deleteImage = require('../utils/deleteImage');

const mapRow = (row) => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  image: { url: row.image_url, path: row.image_path },
  description: row.description,
  isActive: row.is_active,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const getCategories = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    res.json({ success: true, count: data.length, data: data.map(mapRow) });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Kategoriya topilmadi' });
    }

    res.json({ success: true, data: mapRow(data) });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, slug, description } = req.body;
    let image_url = '', image_path = '';

    if (req.file) {
      const uploaded = await uploadImage(req.file);
      image_url = uploaded.url;
      image_path = uploaded.path;
    }

    const { data, error } = await supabase
      .from('categories')
      .insert({ name, slug, description, image_url, image_path })
      .select('*')
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(400).json({ success: false, message: 'Bu kategoriya nomi yoki slug allaqachon mavjud' });
      }
      throw error;
    }

    res.status(201).json({ success: true, data: mapRow(data) });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'Kategoriya topilmadi' });
    }

    const updateData = {};
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.slug !== undefined) updateData.slug = req.body.slug;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.isActive !== undefined) updateData.is_active = req.body.isActive;

    if (req.file) {
      if (existing.image_path) {
        await deleteImage(existing.image_path);
      }
      const uploaded = await uploadImage(req.file);
      updateData.image_url = uploaded.url;
      updateData.image_path = uploaded.path;
    }

    const { data: updated, error: updateError } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', req.params.id)
      .select('*')
      .single();

    if (updateError) throw updateError;

    res.json({ success: true, data: mapRow(updated) });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'Kategoriya topilmadi' });
    }

    const { count, error: countError } = await supabase
      .from('cars')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', req.params.id);

    if (countError) throw countError;

    if (count > 0) {
      return res.status(400).json({
        success: false,
        message: `Bu kategoriyada ${count} ta avtomobil bor. Avval ularni o'chiring yoki boshqa kategoriyaga o'tkazing`,
      });
    }

    if (existing.image_path) {
      await deleteImage(existing.image_path);
    }

    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .eq('id', req.params.id);

    if (deleteError) throw deleteError;

    res.json({ success: true, message: 'Kategoriya muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
