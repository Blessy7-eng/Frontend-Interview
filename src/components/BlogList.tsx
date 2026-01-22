import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogList({ onSelect, selectedId }: { onSelect: (id: number) => void; selectedId: number | null }) {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) return <div className="text-red-500">Error loading blogs.</div>;

  return (
    <ScrollArea className="h-[calc(100vh-160px)] pr-4">
      <div className="space-y-4">
        {blogs?.map((blog: any) => (
          <Card
            key={blog.id}
            onClick={() => onSelect(blog.id)}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedId === blog.id ? "border-blue-600 bg-blue-50/50" : "border-slate-200"
            }`}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                  {blog.category[0]}
                </span>
                <span className="text-[10px] text-slate-400">
                  {new Date(blog.date).toLocaleDateString()}
                </span>
              </div>
              <CardTitle className="text-md font-bold leading-tight line-clamp-2">
                {blog.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-slate-500 line-clamp-2">{blog.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}