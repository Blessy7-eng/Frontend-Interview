<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
=======
import { useState } from "react";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import CreateBlogModal from "./components/CreateBlogModal";

function App() {
  // Using 'any' ensures that both initial numbers and new string IDs work perfectly
  const [selectedId, setSelectedId] = useState<any>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#fcfcfd] font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar onCreateClick={() => setIsModalOpen(true)} />

      {/* Main Dashboard Workspace */}
      <main className="flex flex-1 overflow-hidden p-4 lg:p-6 gap-6">
        
        {/* Creative Sidebar: Glassmorphism Effect */}
        <aside className="w-[380px] hidden md:flex flex-col bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <h2 className="text-2xl font-black tracking-tighter text-slate-900">Feed</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Community Insights</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" title="Live System" />
          </div>
          
          {/* Scrollable List Container */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <BlogList onSelect={setSelectedId} selectedId={selectedId} />
          </div>

          {/* Mini Sidebar Footer (Creative addition) */}
          <div className="mt-6 pt-6 border-t border-slate-100 px-2">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
              © 2026 CA Monk Community
            </p>
          </div>
        </aside>

        {/* Right Stage: Detailed Content View */}
        <section className="flex-1 flex flex-col bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden border border-slate-100/80 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <BlogDetail id={selectedId ? selectedId.toString() : null} />
        </section>
      </main>

      {/* Action Modals */}
      <CreateBlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
>>>>>>> master
