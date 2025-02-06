import Navbar from '@/ui/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='container'>{children}</main>
      <Navbar />
    </>
  );
}
