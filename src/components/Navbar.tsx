import { Button } from "@/components/ui/button";

export default function Navbar({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <nav className="border-b bg-white p-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CA MONK</h1>
          <p className="text-[10px] text-blue-600 font-bold tracking-widest uppercase">Assignment</p>
        </div>
        
        {/* Real Shadcn Button */}
        <Button onClick={onCreateClick} className="bg-blue-600 hover:bg-blue-700">
          + Create New Post
        </Button>
      </div>
    </nav>
  );
}