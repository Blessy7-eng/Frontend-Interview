import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../lib/api";

export default function BlogDetail({ id }: { id: string | null }) {
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      if (!id) throw new Error("ID required");
      return getBlogById(id);
    },
    enabled: !!id
  });

  if (!id) return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-300 bg-slate-50/50">
      <div className="text-6xl mb-4 opacity-20">📖</div>
      <p className="text-lg font-semibold tracking-tight">Select an article to start reading</p>
    </div>
  );

  if (isLoading) return (
    <div className="flex-1 p-12 bg-white">
      <div className="h-64 bg-slate-100 animate-pulse rounded-3xl mb-8" />
      <div className="h-10 w-3/4 bg-slate-100 animate-pulse rounded mb-4" />
      <div className="h-4 w-full bg-slate-100 animate-pulse rounded mb-2" />
      <div className="h-4 w-full bg-slate-100 animate-pulse rounded" />
    </div>
  );

  return (
  <div className="flex-1 overflow-y-auto min-h-0 bg-white custom-scrollbar scroll-smooth">
    <div className="relative h-[45vh] w-full overflow-hidden">
      <img 
        src={blog.coverImage} 
        className="w-full h-full object-cover scale-105 blur-[2px] opacity-30 absolute inset-0"
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <img 
          src={blog.coverImage} 
          className="w-full max-w-2xl h-full object-cover rounded-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500" 
          alt={blog.title}
        />
      </div>
    </div>

    <div className="max-w-3xl mx-auto px-8 pb-24 relative">
      <div className="flex items-center gap-4 mb-8">
        <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-blue-200">
          {blog.category?.[0] || 'Uncategorized'}
        </span>
        <span className="h-[1px] flex-1 bg-slate-100" />
      </div>

      <h1 className="text-5xl font-black text-slate-900 mb-10 tracking-tight leading-[1.1] hover:text-blue-600 transition-colors">
        {blog.title}
      </h1>

      <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
        {blog?.content ? (
          blog.content.split('\n').map((para: string, i: number) => (
            <p key={i} className="mb-6">
              {para}
            </p>
          ))
        ) : (
          <p>Loading content...</p>
        )}
      </div>

      <footer className="mt-16 pt-10 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm mb-4">Enjoyed this AI insight?</p>
        <div className="flex justify-center gap-4">
          <button className="text-xs font-bold text-blue-600 hover:underline">Twitter</button>
          <button className="text-xs font-bold text-blue-600 hover:underline">LinkedIn</button>
        </div>
      </footer>
    </div>
  </div>
);
}