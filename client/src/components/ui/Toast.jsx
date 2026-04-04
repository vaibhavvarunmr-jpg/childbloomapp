import { useEffect } from 'react';
import useUiStore from '../../stores/uiStore';

export default function ToastContainer() {
  const toasts = useUiStore((s) => s.toasts);
  const removeToast = useUiStore((s) => s.removeToast);

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    success: 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white',
    error: 'bg-gradient-to-r from-red-500 to-rose-500 text-white',
    info: 'bg-gradient-to-r from-sky-500 to-blue-500 text-white',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
  };

  const icons = {
    success: 'M5 13l4 4L19 7',
    error: 'M6 18L18 6M6 6l12 12',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  };

  return (
    <div className={`px-4 py-3 rounded-2xl shadow-soft-lg flex items-center gap-3 min-w-[300px] animate-toast-in ${styles[toast.type] || styles.info}`}>
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[toast.type] || icons.info} />
      </svg>
      <span className="text-sm font-medium flex-1">{toast.message}</span>
      <button onClick={onDismiss} className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Dismiss">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
