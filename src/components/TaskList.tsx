import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  MoreVertical, 
  MessageSquare, 
  ListChecks
} from "lucide-react";
import { TaskDialog } from "./TaskDialog";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface TaskListProps {
  filter: string;
}

export function TaskList({ filter }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data - in a real app this would come from an API
  const tasks = [
    {
      id: "1",
      title: "Design API Documentation",
      description: "Create comprehensive API docs for the project.",
      status: "in-progress",
      priority: "high",
      due_date: "2025-05-01",
      progress: 25,
      todos: 8,
      todos_completed: 2,
      comments: 3,
      collaborators: ["JD", "TS", "AM"],
    },
    {
      id: "2",
      title: "Implement User Authentication",
      description: "Set up JWT authentication for the API.",
      status: "pending",
      priority: "high",
      due_date: "2025-04-20",
      progress: 0,
      todos: 5,
      todos_completed: 0,
      comments: 1,
      collaborators: ["JD", "BK"],
    },
    {
      id: "3",
      title: "Create Database Schema",
      description: "Design and implement the database schema for the project.",
      status: "completed",
      priority: "medium",
      due_date: "2025-04-10",
      progress: 100,
      todos: 4,
      todos_completed: 4,
      comments: 2,
      collaborators: ["JD"],
    },
    {
      id: "4",
      title: "Develop Frontend Components",
      description: "Build reusable UI components for the application.",
      status: "in-progress",
      priority: "medium",
      due_date: "2025-05-05",
      progress: 60,
      todos: 10,
      todos_completed: 6,
      comments: 4,
      collaborators: ["TS", "AM"],
    },
  ];

  // Filter tasks based on the active filter
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "in-progress") return task.status === "in-progress";
    if (filter === "completed") return task.status === "completed";
    if (filter === "high") return task.priority === "high";
    // Additional filters would be implemented here
    return true;
  });

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

  const openTaskDetails = (task: any) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {filter === "all" ? "All Tasks" : 
           filter === "in-progress" ? "In Progress Tasks" : 
           filter === "completed" ? "Completed Tasks" : 
           filter === "high" ? "High Priority Tasks" : "Tasks"}
        </h2>
        <p className="text-sm text-gray-500">{filteredTasks.length} tasks</p>
      </div>

      {filteredTasks.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-200">
          <CardContent className="py-10 flex flex-col items-center justify-center text-gray-500">
            <ListChecks className="h-12 w-12 mb-4 text-gray-400" />
            <p className="text-center">No tasks found for the selected filter</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 
                      className="font-medium text-gray-900 hover:text-purple-600 cursor-pointer"
                      onClick={() => openTaskDetails(task)}
                    >
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-md hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openTaskDetails(task)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Task</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete Task</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {getStatusBadge(task.status)}
                  {getPriorityBadge(task.priority)}
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-1" />
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {task.collaborators.map((collab, i) => (
                      <Avatar key={i} className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-[10px] bg-purple-100 text-purple-600">{collab}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <ListChecks className="h-3 w-3 mr-1" />
                      <span>{task.todos_completed}/{task.todos}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span>{task.comments}</span>
                    </div>
                    <div>
                      <p className="text-xs">Due {new Date(task.due_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTask && (
        <TaskDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
          task={selectedTask}
        />
      )}
    </div>
  );
}
