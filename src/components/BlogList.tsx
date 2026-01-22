import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../lib/api";

export default function BlogList({ onSelect, selectedId }: { onSelect: (id: number) => void; selectedId: number | null }) {
  const { data: blogs, isLoading } = useQuery({ 
    queryKey: ['blogs'], 
    queryFn: getBlogs 
  });

  if (isLoading) return (
    <div className="space-y-4 p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-2xl" />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-4 overflow-y-auto px-1 pb-10">
      {blogs?.map((blog: any) => (
        <div 
          key={blog.id}
          onClick={() => onSelect(blog.id)}
          className={`p-5 mb-4 rounded-2xl border transition-all cursor-pointer ${
          String(selectedId) === String(blog.id) 
          ? 'border-blue-600 bg-white ring-1 ring-blue-600' 
          : 'border-slate-100 bg-white'
        }`}
        >
          {/* Active Indicator Bar */}
          {selectedId === Number(blog.id) && (
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-blue-600 rounded-r-full" />
          )}

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {blog.category?.[0] || 'General'}
              </span>
              {blog.id === "1" && (
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  Featured
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium text-slate-400">
              {new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>

          <h3 className={`font-bold text-slate-900 leading-tight mb-2 transition-colors ${
            selectedId === Number(blog.id) ? 'text-blue-700' : 'group-hover:text-blue-600'
          }`}>
            {blog.title}
          </h3>
          
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
            {blog.description}
          </p>
        </div>
      ))}
    </div>
  );
}