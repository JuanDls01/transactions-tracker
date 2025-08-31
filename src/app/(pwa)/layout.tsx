import BottomNav from '@/components/features/navigation/bottom-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='bg-background container self-center'>{children}</main>
      <BottomNav />
    </>
  );
}
