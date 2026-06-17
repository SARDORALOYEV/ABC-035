import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

export default function PagePlaceholder({ title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <Construction className="w-12 h-12 text-slate-300 mb-4" />
      <h2 className="text-lg font-semibold text-slate-700 tracking-tight">{title}</h2>
      <p className="text-sm text-slate-500 mt-1 max-w-md">
        {description || 'Bu sahifa ishlab chiqilmoqda'}
      </p>
    </motion.div>
  );
}
