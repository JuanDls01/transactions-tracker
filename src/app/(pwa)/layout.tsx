import BottomNav from '@/components/features/navigation/bottom-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='container pb-24'>{children}</main>
      <BottomNav />
    </>
  );
}
