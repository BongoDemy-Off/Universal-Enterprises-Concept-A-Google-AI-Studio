import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-light">
      <Header />
      
      <main className="flex-grow w-full pb-20 lg:pb-0" id="main-content">
        {children}
      </main>
      
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
