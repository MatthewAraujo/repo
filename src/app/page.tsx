import Terminal from "@/components/terminal";

export default function Home() {
  return (
    <div className="bg-black text-green-500 min-h-screen p-6 font-mono">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Welcome to Matthew's Portfolio</h1>
        <p className="text-sm text-gray-400">Type <kbd>help</kbd> to see available commands.</p>
      </header>

      <Terminal />
    </div>
  );
}
