import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, MoreVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CommentsProps {
  taskId: string;
}

export function Comments({ taskId }: CommentsProps) {
  const [newComment, setNewComment] = useState("");
  
  // In a real app, this would come from an API
  const [comments, setComments] = useState([
    { 
      id: "1", 
      user: { id: "u1", name: "John Doe", initials: "JD" },
      content: "I've started working on the API documentation. Planning to finish by tomorrow.",
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    { 
      id: "2", 
      user: { id: "u2", name: "Alice Miller", initials: "AM" },
      content: "Great! Make sure to include authentication details in the documentation.",
      created_at: new Date(Date.now() - 20 * 60 * 60 * 1000) // 20 hours ago
    },
    { 
      id: "3", 
      user: { id: "u1", name: "John Doe", initials: "JD" },
      content: "Will do. I'll also add examples for request and response formats.",
      created_at: new Date(Date.now() - 18 * 60 * 60 * 1000) // 18 hours ago
    }
  ]);

  const addComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now().toString(),
      user: { id: "u1", name: "John Doe", initials: "JD" }, // Current user
      content: newComment.trim(),
      created_at: new Date()
    };
    
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      addComment();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 group">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                {comment.user.initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-sm">{comment.user.name}</span>
                  <span className="text-gray-500 text-xs ml-2">
                    {formatDistanceToNow(comment.created_at, { addSuffix: true })}
                  </span>
                </div>
                
                <button className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mt-1 text-gray-800 text-sm">
                {comment.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
              JD
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-grow flex flex-col">
            <Textarea 
              placeholder="Add your comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-24 resize-none"
            />
            
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Press Ctrl+Enter to submit</span>
              <Button 
                onClick={addComment} 
                size="sm"
                className="bg-primary hover:bg-primary/90"
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
