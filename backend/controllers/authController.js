const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { supabase } = require('../config/db');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const { data: exists } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (exists) {
      return res.status(400).json({ success: false, message: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: user, error } = await supabase
      .from('users')
      .insert({ name, email, password: hashedPassword, role: 'admin' })
      .select('id, name, email, role')
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Avval ADMIN_EMAIL/ADMIN_PASSWORD dan tekshiramiz
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const adminId = 'admin-env';
      return res.json({
        success: true,
        data: {
          id: adminId,
          name: 'Admin',
          email: process.env.ADMIN_EMAIL,
          role: 'admin',
          token: generateToken(adminId),
        },
      });
    }

    // 2. Agar env dan topilmasa, bazadan tekshiramiz
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Email yoki parol noto\'g\'ri' });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  let extra = {};
  if (req.user.id === 'admin-env') {
    const { data: saved } = await supabase
      .from('admin_settings')
      .select('value')
      .eq('key', 'env_admin_profile')
      .maybeSingle();
    if (saved) {
      try { extra = JSON.parse(saved.value); } catch {}
    }
  }
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      ...extra,
    },
  });
};

const updateProfile = async (req, res, next) => {
  try {
    const { full_name, phone, bio, avatar_url } = req.body;

    // Admin env orqali kirgan bo'lsa, admin_settings ga saqlaymiz
    if (req.user.id === 'admin-env') {
      const { data: existing } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'env_admin_profile')
        .maybeSingle();

      const profile = {
        full_name: full_name || (existing ? JSON.parse(existing.value).full_name : null) || 'Admin',
        phone: phone || (existing ? JSON.parse(existing.value).phone : null) || '',
        bio: bio || (existing ? JSON.parse(existing.value).bio : null) || '',
        avatar_url: avatar_url || (existing ? JSON.parse(existing.value).avatar_url : null) || '',
      };

      await supabase.from('admin_settings').upsert(
        { key: 'env_admin_profile', value: JSON.stringify(profile) },
        { onConflict: 'key' }
      );

      return res.json({
        success: true,
        data: {
          ...profile,
          role: 'admin',
          email: process.env.ADMIN_EMAIL,
        },
      });
    }

    // Bazadagi foydalanuvchi uchun yangilash
    const updateFields = { name: full_name };
    if (phone !== undefined) updateFields.phone = phone;
    if (bio !== undefined) updateFields.bio = bio;
    if (avatar_url !== undefined) updateFields.avatar_url = avatar_url;

    const { data, error } = await supabase
      .from('users')
      .update(updateFields)
      .eq('id', req.user.id)
      .select('id, name, email, role, phone, bio, avatar_url')
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data: {
        full_name: data.name,
        phone: data.phone || phone || '',
        bio: data.bio || bio || '',
        avatar_url: data.avatar_url || avatar_url || '',
        role: data.role,
        email: data.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, updateProfile };
