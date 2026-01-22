import { useState } from "react";
import Navbar from "@/components/Navbar";
import BlogList from "@/components/BlogList";
import BlogDetail from "@/components/BlogDetail";
import CreateBlogModal from "@/components/CreateBlogModal";

function App() {
  // 1. State for tracking which blog is currently being read (Task 2)
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  // 2. State for controlling the 'Create Blog' Modal (Task 3)
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Module 2: Navigation */}
      <Navbar onCreateClick={() => setIsModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex flex-1 overflow-hidden container mx-auto py-6 gap-6 px-4">
        
        {/* Module 3 (Left): The List of Blogs (Task 1) */}
        <section className="w-full md:w-1/3 flex flex-col">
          <h2 className="text-xl font-bold text-slate-800 mb-4 px-1">Latest Articles</h2>
          <BlogList 
            onSelect={setSelectedId} 
            selectedId={selectedId} 
          />
        </section>

        {/* Module 3 (Right): The Detailed View (Task 2) */}
        <section className="hidden md:flex flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <BlogDetail blogId={selectedId} />
        </section>
      </main>

      {/* Module 4: The Create Form Modal (Task 3) */}
      <CreateBlogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;