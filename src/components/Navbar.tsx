import { Button } from "@/components/ui/button";

export default function Navbar({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <nav className="bg-white border-b border-slate-200 px-8 py-4">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-black tracking-tighter text-slate-900">
            CA <span className="text-blue-600">MONK</span>
          </h1>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
            <span className="text-slate-900 border-b-2 border-blue-600 pb-1">Dashboard</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Resources</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Community</span>
          </div>
        </div>
        <button 
          onClick={onCreateClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-200 active:scale-95"
        >
          + Create New Post
        </button>
      </div>
    </nav>
  );
}