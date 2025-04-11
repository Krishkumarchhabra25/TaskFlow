import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CalendarIcon, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Users,
  MessageSquare,
  ListChecks
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TodoList } from "./TodoList";
import { Comments } from "./comments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: any; // In a real app this would be strongly typed
}

export function TaskDialog({ open, onOpenChange, task }: TaskDialogProps) {
  const [activeTab, setActiveTab] = useState("details");
  
  // If there's a task, we're in view/edit mode, otherwise we're in create mode
  const isCreateMode = !task;
  
  // Create mode form state
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: "",
  });

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    console.log("Creating task:", newTask);
    onOpenChange(false);
  };

  // Status badge helper
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle2 className="h-3 w-3 mr-1" /> Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Clock className="h-3 w-3 mr-1" /> In Progress</Badge>;
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pending</Badge>;
      default:
        return null;
    }
  };

  // Priority badge helper
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><AlertTriangle className="h-3 w-3 mr-1" /> High</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto">
        {isCreateMode ? (
          <>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleCreateSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Task Title</label>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="Enter task title" 
                  value={newTask.title}
                  onChange={handleCreateChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder="Describe your task" 
                  rows={3}
                  value={newTask.description}
                  onChange={handleCreateChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">Status</label>
                  <Select 
                    name="status" 
                    value={newTask.status}
                    onValueChange={(value) => setNewTask(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                  <Select 
                    name="priority" 
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="due_date" className="text-sm font-medium">Due Date</label>
                  <Input 
                    id="due_date" 
                    name="due_date"
                    type="date" 
                    value={newTask.due_date}
                    onChange={handleCreateChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Create Task
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">{task.title}</DialogTitle>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="todos">
                  Todos
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
                    {task.todos}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="comments">
                  Comments
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
                    {task.comments}
                  </span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                    <p className="text-gray-800">{task.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {getStatusBadge(task.status)}
                    {getPriorityBadge(task.priority)}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Progress</h3>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Completion</span>
                      <span>{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Due Date</h3>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{new Date(task.due_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Collaborators</h3>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <div className="flex -space-x-2">
                          {task.collaborators.map((collab: string, i: number) => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-white">
                              <AvatarFallback className="text-[10px] bg-purple-100 text-purple-600">{collab}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 justify-end pt-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Delete
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="todos" className="mt-4">
                <TodoList taskId={task.id} />
              </TabsContent>
              
              <TabsContent value="comments" className="mt-4">
                <Comments taskId={task.id} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
