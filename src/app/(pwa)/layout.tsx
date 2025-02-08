import Navbar from '@/ui/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='container pb-24'>{children}</main>
    </>
  );
}
