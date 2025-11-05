import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { useEffect } from 'react';

const icons = {
  success: <CheckCircle className="h-5 w-5 text-green-600" />,
  error: <XCircle className="h-5 w-5 text-red-600" />,
  info: <Info className="h-5 w-5 text-blue-600" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
};

const colors = {
  success: 'border-green-500',
  error: 'border-red-500',
  info: 'border-blue-500',
  warning: 'border-yellow-500',
};

export default function Notification({ notification, onClose }) {
  const delay = 3500;
  useEffect(() => {
    if (!notification) {
      return;
    }
    const timer = setTimeout(() => onClose(), delay);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  return (
    <div className="fixed top-20 right-10 z-50 flex flex-col space-y-3">
      <AnimatePresence>
        {notification && (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className={`relative flex items-center rounded-lg border-[1px] border-l-4 bg-white shadow-lg ${colors[notification.type]} w-80 p-4`}
            exit={{ opacity: 0, x: 80 }}
            initial={{ opacity: 0, x: 80 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          >
            <div className="mr-3">{icons[notification.type]}</div>
            <p className="flex-1 text-gray-800 text-sm">
              {notification.message}
            </p>
            <button
              className="ml-3 text-gray-400 transition-colors hover:text-gray-600"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
