const jwt = require('jsonwebtoken');
const { supabase } = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ADMIN_EMAIL dan kirgan admin (bazada yo'q)
      if (decoded.id === 'admin-env') {
        req.user = {
          id: 'admin-env',
          name: 'Admin',
          email: process.env.ADMIN_EMAIL,
          role: 'admin',
        };
        return next();
      }

      const { data: user, error } = await supabase
        .from('users')
        .select('id, name, email, role')
        .eq('id', decoded.id)
        .single();

      if (error || !user) {
        return res.status(401).json({ success: false, message: 'Foydalanuvchi topilmadi, kirish taqiqlandi' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Token muddati o\'tgan yoki xato' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Tizimga kirish uchun token taqdim etilmagan' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Faqat adminlar uchun ruxsat berilgan' });
  }
};

module.exports = { protect, admin };
