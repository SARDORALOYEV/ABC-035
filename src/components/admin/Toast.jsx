import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-white border-slate-200 text-slate-900',
    error: 'bg-white border-slate-300 text-slate-900',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-slate-700" />,
    error: <XCircle className="w-5 h-5 text-slate-500" />,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 80, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 80, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg shadow-slate-200/50 ${styles[type]}`}
      >
        {icons[type]}
        <span className="text-sm font-medium">{message}</span>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="ml-2 p-0.5 rounded hover:bg-slate-100"
        >
          <X className="w-4 h-4 text-slate-400" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
