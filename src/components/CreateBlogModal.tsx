import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../lib/api"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CreateBlogModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      // TASK 3: This refreshes the 'blogs' query so the new post appears!
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    mutation.mutate({
      title: formData.get("title"),
      category: [formData.get("category")],
      description: formData.get("description"),
      content: formData.get("content"),
      date: new Date().toISOString(),
      coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" placeholder="Title" required />
          <Input name="category" placeholder="Category" required />
          <Input name="description" placeholder="Short Summary" required />
          <Textarea name="content" placeholder="Content" rows={4} required />
          <Button type="submit" className="w-full bg-blue-600" disabled={mutation.isPending}>
            {mutation.isPending ? "Publishing..." : "Publish"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}