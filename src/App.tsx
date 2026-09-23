import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { BookingProvider } from '@/context/BookingContext';
import { ToastProvider } from '@/context/ToastContext';
import { router } from '@/router';

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </BookingProvider>
    </AuthProvider>
  );
}
