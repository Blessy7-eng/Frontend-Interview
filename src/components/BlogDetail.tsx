import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogDetail({ blogId }: { blogId: number | null }) {
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId!),
    enabled: !!blogId, // Only fetch if an ID is selected
  });

  if (!blogId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <p className="text-lg font-medium">Select a blog to start reading</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 space-y-6 w-full">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="p-8 w-full max-w-4xl mx-auto overflow-y-auto">
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-72 object-cover rounded-2xl shadow-lg mb-8"
      />
      
      <div className="space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
          {blog.category.join(" & ")}
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {blog.title}
        </h1>

        {/* Info Bar - Matches Reference Image */}
        <div className="grid grid-cols-3 border-y border-slate-100 py-6 my-8 text-center bg-slate-50/50 rounded-lg">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Category</p>
            <p className="text-sm font-bold text-slate-800">{blog.category[0]}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Read Time</p>
            <p className="text-sm font-bold text-slate-800">5 Mins</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Date</p>
            <p className="text-sm font-bold text-slate-800">
              {new Date(blog.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </p>
        </div>
      </div>
    </div>
  );
}