import TransactionForm from "@/ui/components/TransactionForm";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="">
        <TransactionForm />
      </main>
      <footer className="flex gap-6 items-center justify-center">
        This is the footer
      </footer>
    </div>
  );
}
