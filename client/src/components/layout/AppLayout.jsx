import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';
import { useChildren } from '../../hooks/useChild';
import ErrorBoundary from '../shared/ErrorBoundary';

export default function AppLayout() {
  useChildren();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <Header />
        <main className="flex-1 px-3 sm:px-4 lg:px-8 py-4 sm:py-6 pb-28 lg:pb-6 max-w-5xl w-full mx-auto">
          <ErrorBoundary>
            <div className="animate-fade-in-up">
              <Outlet />
            </div>
          </ErrorBoundary>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
