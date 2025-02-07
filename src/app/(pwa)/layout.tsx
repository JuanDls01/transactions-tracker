import Navbar from '@/ui/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='container pt-5 pb-20'>{children}</main>
      <Navbar />
    </>
  );
}
