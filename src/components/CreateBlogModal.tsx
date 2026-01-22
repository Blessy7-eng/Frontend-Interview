import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../lib/api"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CreateBlogModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  
  mutation.mutate({
    title: formData.get("title") as string,
    category: [formData.get("category") as string],
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    date: new Date().toISOString(),
    // Allow custom image URL or use a professional default
    coverImage: formData.get("coverImage") as string || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e", 
  });
};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] bg-white rounded-[2rem] border-none shadow-2xl p-10">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">
            Create New Post
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium mt-2">
            Share your insights with the CA Monk community.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Title</label>
              <Input name="title" placeholder="Future of Fintech" className="rounded-xl border-slate-100 bg-slate-50/50 h-12 focus:ring-blue-600" required />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Cover Image URL</label>
              <Input name="coverImage" placeholder="https://images.unsplash.com/..." className="rounded-xl border-slate-100 bg-slate-50/50 h-12" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Short Description</label>
            <Input name="description" placeholder="A brief summary for the card view..." className="rounded-xl border-slate-100 bg-slate-50/50 h-12" required />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Article Content</label>
            <Textarea name="content" placeholder="Write your full article here..." className="rounded-xl border-slate-100 bg-slate-50/50 min-h-[180px] p-4 text-lg" required />
          </div>

          <div className="flex gap-4 pt-6">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1 rounded-xl font-bold text-slate-400 hover:bg-slate-50">
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 py-6 transition-all active:scale-95">
              {mutation.isPending ? "Publishing..." : "Publish Article"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}